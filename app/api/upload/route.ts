import { NextRequest, NextResponse } from "next/server";

import fs from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          message: "فایلی ارسال نشده است.",
        },
        {
          status: 400,
        },
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads", "products");

    await fs.mkdir(uploadDir, {
      recursive: true,
    });

    const extension = file.name.split(".").pop();

    const fileName = `${Date.now()}.${extension}`;

    const filePath = path.join(uploadDir, fileName);

    await fs.writeFile(filePath, buffer);

    const url = `/uploads/products/${fileName}`;

    return NextResponse.json(
      {
        url,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "خطا در آپلود تصویر",
      },
      {
        status: 500,
      },
    );
  }
}
