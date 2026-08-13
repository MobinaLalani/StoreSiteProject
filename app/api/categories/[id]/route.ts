import { NextRequest, NextResponse } from "next/server";
import { categoryRepository } from "@/src/repositories/category.repository";
import { jsonBody, requireAdmin } from "@/src/lib/api";
import { categoryErrors, categoryInput } from "@/src/lib/category-input";

type Context = { params: Promise<{ id: string }> };
export async function GET(_request: NextRequest, { params }: Context) {
  const item = await categoryRepository.getById(Number((await params).id));
  return item ? NextResponse.json(item) : NextResponse.json({ message: "Category not found" }, { status: 404 });
}
async function update(request: NextRequest, { params }: Context) {
  const auth = await requireAdmin(request); if (auth.response) return auth.response;
  const body = await jsonBody(request); if (!body) return NextResponse.json({ message: "Request body must be valid JSON" }, { status: 400 });
  const data = categoryInput(body); const errors = categoryErrors(data, false);
  if (!Object.keys(data).length) errors.body = "At least one field is required";
  if (Object.keys(errors).length) return NextResponse.json({ message: "Validation failed", errors }, { status: 422 });
  const item = await categoryRepository.update(Number((await params).id), data);
  return item ? NextResponse.json(item) : NextResponse.json({ message: "Category not found" }, { status: 404 });
}
export const PUT = update;
export const PATCH = update;
export async function DELETE(request: NextRequest, { params }: Context) {
  const auth = await requireAdmin(request); if (auth.response) return auth.response;
  const id = Number((await params).id);
  if (await categoryRepository.hasProducts(id)) return NextResponse.json({ message: "این دسته‌بندی دارای محصول است و قابل حذف نیست." }, { status: 409 });
  return (await categoryRepository.delete(id)) ? new NextResponse(null, { status: 204 }) : NextResponse.json({ message: "Category not found" }, { status: 404 });
}
