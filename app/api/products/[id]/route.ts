import { NextRequest, NextResponse } from "next/server";
import { DuplicateProductSlugError, productRepository } from "@/src/repositories/product.repository";
import { jsonBody, requireAdmin } from "@/src/lib/api";
import { filterProduct, validateProduct } from "@/src/lib/product-input";
import { categoryRepository } from "@/src/repositories/category.repository";

type Context = { params: Promise<{ id: string }> };
export async function GET(_request: NextRequest, { params }: Context) {
  const item = await productRepository.getById(Number((await params).id));
  return item ? NextResponse.json(item) : NextResponse.json({ message: "Product not found" }, { status: 404 });
}
async function update(request: NextRequest, { params }: Context) {
  const auth = await requireAdmin(request); if (auth.response) return auth.response;
  const body = await jsonBody(request); if (!body) return NextResponse.json({ message: "Request body must be valid JSON" }, { status: 400 });
  const data = filterProduct(body); const errors = validateProduct(data, false);
  if (typeof data.categoryId === "number" && !(await categoryRepository.getById(data.categoryId))) errors.categoryId = "دسته‌بندی انتخاب‌شده وجود ندارد.";
  if (!Object.keys(data).length) errors.body = "At least one field is required";
  if (Object.keys(errors).length) return NextResponse.json({ message: "Validation failed", errors }, { status: 422 });
  try {
    const item = await productRepository.update(Number((await params).id), data);
    return item ? NextResponse.json(item) : NextResponse.json({ message: "Product not found" }, { status: 404 });
  } catch (error) {
    if (error instanceof DuplicateProductSlugError) return NextResponse.json({ message: error.message, errors: { slug: error.message } }, { status: 409 });
    throw error;
  }
}
export const PUT = update;
export const PATCH = update;
export async function DELETE(request: NextRequest, { params }: Context) {
  const auth = await requireAdmin(request); if (auth.response) return auth.response;
  return (await productRepository.delete(Number((await params).id)))
    ? new NextResponse(null, { status: 204 })
    : NextResponse.json({ message: "Product not found" }, { status: 404 });
}
