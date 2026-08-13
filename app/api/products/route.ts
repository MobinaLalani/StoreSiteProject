import { NextRequest, NextResponse } from "next/server";
import { DuplicateProductSlugError, productRepository } from "@/src/repositories/product.repository";
import { errorResponse, jsonBody, requireAdmin } from "@/src/lib/api";
import type { Product } from "@/src/types/product";
import { filterProduct, validateProduct } from "@/src/lib/product-input";
import { categoryRepository } from "@/src/repositories/category.repository";

export async function GET(request: NextRequest) {
  const products = await productRepository.getAll();
  if (request.nextUrl.searchParams.get("scope") === "admin") {
    const auth = await requireAdmin(request);
    return auth.response ?? NextResponse.json(products);
  }
  return NextResponse.json(products.filter((product) => product.status === "active"));
}
export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request); if (auth.response) return auth.response;
  const body = await jsonBody(request); if (!body) return NextResponse.json({ message: "Request body must be valid JSON" }, { status: 400 });
  const data = filterProduct(body); const errors = validateProduct(data, true);
  if (typeof data.categoryId === "number" && !(await categoryRepository.getById(data.categoryId))) errors.categoryId = "دسته‌بندی انتخاب‌شده وجود ندارد.";
  if (Object.keys(errors).length) return NextResponse.json({ message: "Validation failed", errors }, { status: 422 });
  try {
    const defaults = { rating: 0, reviewCount: 0, tags: [], colors: [], specifications: [], isFeatured: false };
    const newProduct = { ...defaults, ...data, status: "active" as const };
    return NextResponse.json(await productRepository.create(newProduct as Omit<Product, "id" | "createdAt" | "updatedAt">), { status: 201 });
  } catch (error) {
    if (error instanceof DuplicateProductSlugError) return NextResponse.json({ message: error.message, errors: { slug: error.message } }, { status: 409 });
    return errorResponse(error, "خطا در ایجاد محصول");
  }
}
