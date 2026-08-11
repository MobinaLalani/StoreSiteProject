import { NextResponse } from "next/server";
import { settingsRepository } from "@/src/repositories/settings.repository";
export async function GET() { return NextResponse.json(await settingsRepository.getPublic()); }
