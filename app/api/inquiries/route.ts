import { NextRequest, NextResponse } from "next/server";
import { jsonBody } from "@/src/lib/api";
import { inquiryRepository } from "@/src/repositories/inquiry.repository";
export async function POST(request: NextRequest) {
  const body = await jsonBody(request); if (!body) return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  const errors: Record<string, string> = {}; for (const field of ["name", "mobile", "productTitle"]) if (typeof body[field] !== "string" || !(body[field] as string).trim()) errors[field] = `${field} is required`;
  if (Object.keys(errors).length) return NextResponse.json({ message: "Validation failed", errors }, { status: 422 });
  const allowed = Object.fromEntries(["name", "mobile", "productId", "productTitle", "quantity", "description", "preferredContact"].filter((key) => key in body).map((key) => [key, body[key]]));
  return NextResponse.json(await inquiryRepository.create(allowed as never), { status: 201 });
}
