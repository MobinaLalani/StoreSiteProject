import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/api";
import { readJson } from "@/src/lib/json-store";
export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request); if (auth.response) return auth.response;
  const items = await readJson<unknown[]>("auth-activity.json", []); return NextResponse.json(items.reverse().slice(0, 20));
}
