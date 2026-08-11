import { NextRequest, NextResponse } from "next/server";
import { categoryRepository } from "@/src/repositories/category.repository";
import { jsonBody, requireAdmin } from "@/src/lib/api";
import type { Category } from "@/src/types/category";
import { categoryErrors, categoryInput } from "@/src/lib/category-input";
export async function GET(request: NextRequest) {
  return NextResponse.json(request.nextUrl.searchParams.get("includeProducts") === "true" ? await categoryRepository.getAllWithProducts() : await categoryRepository.getAll());
}
export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request); if (auth.response) return auth.response;
  const body = await jsonBody(request); if (!body) return NextResponse.json({ message: "Request body must be valid JSON" }, { status: 400 });
  const data = categoryInput(body); const errors = categoryErrors(data, true);
  if (Object.keys(errors).length) return NextResponse.json({ message: "Validation failed", errors }, { status: 422 });
  return NextResponse.json(await categoryRepository.create({ image: "", description: "", ...data } as Omit<Category, "id">), { status: 201 });
}
