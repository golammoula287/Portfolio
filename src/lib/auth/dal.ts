import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { verifyAccessToken } from "./jwt";
import { ACCESS_COOKIE } from "./session";

// Data Access Layer: the real authorization check, done close to the data —
// not just the optimistic slug-gate in proxy.ts.
export const verifySession = cache(async () => {
  const token = (await cookies()).get(ACCESS_COOKIE)?.value;
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
