import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/connect";
import { UserModel } from "@/models/user";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { loginSchema } from "@/lib/validation/auth";
import type { ApiResponse } from "@/types";

function invalidCredentials() {
  return NextResponse.json<ApiResponse<never>>(
    { error: { code: "invalid_credentials", message: "Invalid email or password." } },
    { status: 401 }
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json<ApiResponse<never>>(
      { error: { code: "invalid_body", message: "Email and password are required." } },
      { status: 400 }
    );
  }

  await connectToDatabase();

  const user = await UserModel.findOne({ email: parsed.data.email.toLowerCase().trim() });
  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return invalidCredentials();
  }

  await createSession({ userId: user._id.toString(), role: user.role });

  return NextResponse.json<ApiResponse<{ email: string; role: string }>>({
    data: { email: user.email, role: user.role },
  });
}
