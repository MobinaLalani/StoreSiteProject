import { NextRequest, NextResponse } from "next/server";
import { attemptLogin, signToken, tokenTtl } from "@/src/lib/auth";
import { updateJson } from "@/src/lib/json-store";

interface Activity { username: string; success: boolean; ip: string; createdAt: string }

export async function POST(request: NextRequest) {
  let body: { username?: unknown; password?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ message: "درخواست نامعتبر است." }, { status: 400 }); }
  const success = await attemptLogin(body.username, body.password);
  const username = typeof body.username === "string" ? body.username : "";
  await updateJson<Activity[]>("auth-activity.json", [], (items) => [
    ...items,
    { username, success, ip: request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown", createdAt: new Date().toISOString() },
  ].slice(-200));
  if (!success) return NextResponse.json({ message: "نام کاربری یا رمز عبور اشتباه است." }, { status: 401 });
  const ttl = await tokenTtl();
  const token = await signToken(username);
  const response = NextResponse.json({ success: true, token, tokenType: "Bearer", expiresIn: ttl, user: { username } });
  const protocol = request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", "");
  response.cookies.set("admin_token", token, { httpOnly: true, secure: protocol === "https", sameSite: "lax", path: "/", maxAge: ttl });
  return response;
}
