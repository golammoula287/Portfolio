import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { verifyAccessToken } from "./jwt";

// Data Access Layer: the real authorization check, done close to the data —
// not just the optimistic slug-gate in proxy.ts. Full login/refresh/logout
// flow lands in Phase 5; this gives that phase a verified session helper to
// build on.
export const verifySession = cache(async () => {
  const token = (await cookies()).get("session")?.value;
  if (!token) {
    return null;
  }

  try {
    const payload = verifyAccessToken(token);
    return { userId: payload.userId, role: payload.role };
  } catch {
    return null;
  }
});
