import { NextRequest, NextResponse } from "next/server";
import { productRepository } from "@/src/repositories/product.repository";
import { errorResponse, jsonBody, requireAdmin } from "@/src/lib/api";
import type { Product } from "@/src/types/product";
import { filterProduct, validateProduct } from "@/src/lib/product-input";

export async function GET() { return NextResponse.json(await productRepository.getAll()); }
export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request); if (auth.response) return auth.response;
  const body = await jsonBody(request); if (!body) return NextResponse.json({ message: "Request body must be valid JSON" }, { status: 400 });
  const data = filterProduct(body); const errors = validateProduct(data, true);
  if (Object.keys(errors).length) return NextResponse.json({ message: "Validation failed", errors }, { status: 422 });
  try {
    const defaults = { rating: 0, reviewCount: 0, tags: [], colors: [], specifications: [], status: "active" as const, isFeatured: false };
    return NextResponse.json(await productRepository.create({ ...defaults, ...data } as Omit<Product, "id" | "createdAt" | "updatedAt">), { status: 201 });
  } catch (error) { return errorResponse(error, "خطا در ایجاد محصول"); }
}
