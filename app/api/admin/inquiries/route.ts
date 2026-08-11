import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/api";
import { inquiryRepository } from "@/src/repositories/inquiry.repository";
export async function GET(request: NextRequest) { const auth = await requireAdmin(request); return auth.response ?? NextResponse.json(await inquiryRepository.getAll()); }
