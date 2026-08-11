import { NextRequest, NextResponse } from "next/server";
import { changePassword } from "@/src/lib/auth";
import { jsonBody, requireAdmin } from "@/src/lib/api";
export async function PUT(request: NextRequest) {
  const auth = await requireAdmin(request); if (auth.response) return auth.response;
  const body = await jsonBody(request);
  if (!body || typeof body.currentPassword !== "string" || typeof body.newPassword !== "string") return NextResponse.json({ message: "اطلاعات ناقص است." }, { status: 422 });
  if (body.newPassword.length < 10) return NextResponse.json({ message: "رمز جدید باید حداقل ۱۰ کاراکتر باشد." }, { status: 422 });
  if (!(await changePassword(body.currentPassword, body.newPassword))) return NextResponse.json({ message: "رمز فعلی اشتباه است." }, { status: 422 });
  const response = NextResponse.json({ success: true, message: "رمز تغییر کرد؛ دوباره وارد شوید." }); response.cookies.delete("admin_token"); return response;
}
