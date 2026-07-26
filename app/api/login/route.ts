import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
     console.log("process.env.ADMIN_USERNAME", process.env.ADMIN_USERNAME);
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

    return NextResponse.json({
      success: true,
    });
  } catch {
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
