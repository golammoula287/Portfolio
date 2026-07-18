import { NextResponse } from "next/server";
import { refreshSession } from "@/lib/auth/session";
import type { ApiResponse } from "@/types";

export async function POST() {
  const refreshed = await refreshSession();
  if (!refreshed) {
    return NextResponse.json<ApiResponse<never>>(
      { error: { code: "invalid_refresh_token", message: "Session expired, please log in again." } },
      { status: 401 }
    );
  }

  return NextResponse.json<ApiResponse<{ success: true }>>({ data: { success: true } });
}
