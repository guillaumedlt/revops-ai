import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { apiError, type AuthContext } from "@/types/api";

const JWT_SECRET = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Missing JWT_SECRET");
  return new TextEncoder().encode(secret);
};

const COOKIE_NAME = "auth_token";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days

interface TokenPayload extends JWTPayload {
  tenant_id: string;
  user_id: string;
  email: string;
}

export async function signToken(payload: {
  tenantId: string;
  userId: string;
  email: string;
}): Promise<string> {
  return new SignJWT({
    tenant_id: payload.tenantId,
    user_id: payload.userId,
    email: payload.email,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET());
}

export async function verifyToken(
  token: string
): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET());
    return payload as TokenPayload;
  } catch {
    return null;
  }
}

export async function getAuthFromRequest(
  request: NextRequest
): Promise<AuthContext | null> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload) return null;

  return {
    tenantId: payload.tenant_id,
    userId: payload.user_id,
    email: payload.email,
  };
}

export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

export function clearAuthCookie(response: NextResponse) {
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}

export function requireAuth(
  handler: (
    request: NextRequest,
    auth: AuthContext
  ) => Promise<NextResponse>
) {
  return async (request: NextRequest) => {
    const auth = await getAuthFromRequest(request);
    if (!auth) {
      return NextResponse.json(apiError("Unauthorized"), { status: 401 });
    }
    return handler(request, auth);
  };
}

export function requireCronSecret(
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  return async (request: NextRequest) => {
    const secret = request.headers.get("x-cron-secret");
    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json(apiError("Invalid cron secret"), {
        status: 403,
      });
    }
    return handler(request);
  };
}
