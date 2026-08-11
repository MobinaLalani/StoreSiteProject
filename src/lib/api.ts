import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { userFromRequest } from "@/src/lib/auth";

export async function requireAdmin(request: NextRequest) {
  const user = await userFromRequest(request);
  return user
    ? { user, response: null }
    : { user: null, response: NextResponse.json({ message: "برای انجام این عملیات باید وارد شوید." }, { status: 401 }) };
}

export function errorResponse(error: unknown, fallback = "خطای داخلی سرور") {
  console.error(error);
  return NextResponse.json({ message: fallback }, { status: 500 });
}

export async function jsonBody(request: NextRequest) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error();
    return body as Record<string, unknown>;
  } catch {
    return null;
  }
}
