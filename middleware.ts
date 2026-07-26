import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("admin_token")?.value;

  console.log("Path:", pathname);
  console.log("Token:", token);

  // اجازه به صفحه لاگین
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // اگر کوکی وجود نداشت
  if (!token) {
    console.log("No Token");
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  console.log("Token Exists");

  // اگر کوکی وجود داشت، اجازه ورود بده
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
