// Simple in-memory fixed-window rate limiter, keyed by an identifier (IP).
// Best-effort only: on Vercel each serverless instance has its own memory, so
// limits aren't shared across instances. That's acceptable for a personal
// portfolio — it stops casual abuse of the LLM endpoint without needing Redis.
type Window = { count: number; resetAt: number };

const buckets = new Map<string, Window>();

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now >= existing.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (existing.count >= limit) {
    return { allowed: false, remaining: 0, retryAfterMs: existing.resetAt - now };
  }

  existing.count += 1;
  return { allowed: true, remaining: limit - existing.count };
}
