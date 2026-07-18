import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/auth/session";
import type { ApiResponse } from "@/types";

export async function POST() {
  await deleteSession();
  return NextResponse.json<ApiResponse<{ success: true }>>({ data: { success: true } });
}
