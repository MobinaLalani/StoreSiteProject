import { NextRequest, NextResponse } from "next/server";
import { jsonBody, requireAdmin } from "@/src/lib/api";
import { settingsRepository } from "@/src/repositories/settings.repository";
export async function GET(request: NextRequest) { const auth = await requireAdmin(request); return auth.response ?? NextResponse.json(await settingsRepository.getAll()); }
export async function PUT(request: NextRequest) { const auth = await requireAdmin(request); if (auth.response) return auth.response; const body = await jsonBody(request); return body ? NextResponse.json(await settingsRepository.update(body)) : NextResponse.json({ message: "Invalid JSON body" }, { status: 400 }); }
