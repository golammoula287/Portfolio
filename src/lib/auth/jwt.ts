import jwt from "jsonwebtoken";

export type SessionPayload = {
  userId: string;
  role: string;
};

const ACCESS_TOKEN_TTL = "15m";
const REFRESH_TOKEN_TTL = "30d";

function requireSecret(name: "ACCESS_TOKEN_SECRET" | "REFRESH_TOKEN_SECRET") {
  const secret = process.env[name];
  if (!secret) {
    throw new Error(`${name} is not set`);
  }
  return secret;
}

export function signAccessToken(payload: SessionPayload) {
  return jwt.sign(payload, requireSecret("ACCESS_TOKEN_SECRET"), { expiresIn: ACCESS_TOKEN_TTL });
}

export function signRefreshToken(payload: SessionPayload) {
  return jwt.sign(payload, requireSecret("REFRESH_TOKEN_SECRET"), { expiresIn: REFRESH_TOKEN_TTL });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, requireSecret("ACCESS_TOKEN_SECRET")) as SessionPayload & jwt.JwtPayload;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, requireSecret("REFRESH_TOKEN_SECRET")) as SessionPayload & jwt.JwtPayload;
}
