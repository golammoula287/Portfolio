import "server-only";
import { cookies } from "next/headers";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  type SessionPayload,
} from "./jwt";

export const ACCESS_COOKIE = "session";
const REFRESH_COOKIE = "refreshToken";
const ACCESS_MAX_AGE = 15 * 60;
const REFRESH_MAX_AGE = 30 * 24 * 60 * 60;

const baseCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function createSession(payload: SessionPayload) {
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_COOKIE, signAccessToken(payload), {
    ...baseCookieOptions,
    maxAge: ACCESS_MAX_AGE,
  });
  cookieStore.set(REFRESH_COOKIE, signRefreshToken(payload), {
    ...baseCookieOptions,
    maxAge: REFRESH_MAX_AGE,
  });
}

// Issues a fresh access token cookie from a still-valid refresh token cookie.
// Returns false (without touching cookies) if the refresh token is missing or invalid.
export async function refreshSession() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_COOKIE)?.value;
  if (!refreshToken) {
    return false;
  }

  try {
    const payload = verifyRefreshToken(refreshToken);
    cookieStore.set(ACCESS_COOKIE, signAccessToken({ userId: payload.userId, role: payload.role }), {
      ...baseCookieOptions,
      maxAge: ACCESS_MAX_AGE,
    });
    return true;
  } catch {
    return false;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_COOKIE);
  cookieStore.delete(REFRESH_COOKIE);
}
