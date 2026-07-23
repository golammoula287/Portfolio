import { NextResponse } from "next/server";
import { z } from "zod";
import { buildSystemPrompt } from "@/lib/chatbot/context";
import { rateLimit } from "@/lib/rate-limit";
import type { ApiResponse } from "@/types";

// Groq's chat API is OpenAI-compatible, so we call it with plain fetch — no
// extra dependency. Get a free key at https://console.groq.com and set
// GROQ_API_KEY in the environment.
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

const MAX_MESSAGES = 12;

const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(1000),
      })
    )
    .min(1)
    .max(MAX_MESSAGES),
});

function errorResponse(code: string, message: string, status: number) {
  return NextResponse.json<ApiResponse<never>>({ error: { code, message } }, { status });
}

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return errorResponse("chat_unavailable", "The assistant isn't configured yet.", 503);
  }

  // Rate limit per client IP: 15 messages per 5 minutes.
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const limit = rateLimit(`chat:${ip}`, 15, 5 * 60 * 1000);
  if (!limit.allowed) {
    return errorResponse("rate_limited", "Too many messages — please wait a bit.", 429);
  }

  const body = await request.json().catch(() => null);
  const parsed = chatSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse("invalid_body", "Invalid request.", 400);
  }

  try {
    const groqResponse = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        temperature: 0.4,
        max_tokens: 500,
        messages: [{ role: "system", content: buildSystemPrompt() }, ...parsed.data.messages],
      }),
    });

    if (!groqResponse.ok) {
      return errorResponse("upstream_error", "The assistant is temporarily unavailable.", 502);
    }

    const data = await groqResponse.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return errorResponse("empty_reply", "The assistant had no response.", 502);
    }

    return NextResponse.json<ApiResponse<{ reply: string }>>({ data: { reply } });
  } catch {
    return errorResponse("upstream_error", "The assistant is temporarily unavailable.", 502);
  }
}
