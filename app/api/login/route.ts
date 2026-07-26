import { NextRequest, NextResponse } from "next/server";

import { signToken } from "@/src/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (
      body.username !== process.env.ADMIN_USERNAME ||
      body.password !== process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json(
        {
          message: "نام کاربری یا رمز عبور اشتباه است.",
        },
        {
          status: 401,
        },
      );
    }

    // ساخت JWT
    const token = signToken({
      username: body.username,
    });

    // پاسخ
    const response = NextResponse.json({
      success: true,
    });

response.cookies.set("admin_token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
});

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "خطا در ورود",
      },
      {
        status: 500,
      },
    );
  }
}
