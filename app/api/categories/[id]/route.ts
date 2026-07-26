import { NextRequest, NextResponse } from "next/server";
import { categoryRepository } from "@/src/repositories/category.repository";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const body = await request.json();

  const category = await categoryRepository.update(Number(id), body);

  if (!category) {
    return NextResponse.json(
      {
        message: "Category not found",
      },
      {
        status: 404,
      },
    );
  }

  return NextResponse.json(category);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  await categoryRepository.delete(Number(id));

  return NextResponse.json({
    success: true,
  });
}
