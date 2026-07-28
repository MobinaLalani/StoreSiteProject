import { NextRequest, NextResponse } from "next/server";

import { categoryRepository } from "@/src/repositories/category.repository";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const includeProducts = searchParams.get("includeProducts") === "true";

    const categories = includeProducts
      ? await categoryRepository.getAllWithProducts()
      : await categoryRepository.getAll();

    return NextResponse.json(categories);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "خطا در دریافت دسته‌بندی‌ها",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newCategory = await categoryRepository.create({
      title: body.title,
      slug: body.slug,
      image: body.image,
      description: body.description,
    });

    return NextResponse.json(newCategory, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "خطا در ایجاد دسته‌بندی",
      },
      {
        status: 500,
      },
    );
  }
}
