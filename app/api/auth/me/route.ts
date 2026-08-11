import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/api";
export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request); if (auth.response) return auth.response;
  return NextResponse.json({ user: auth.user });
}
