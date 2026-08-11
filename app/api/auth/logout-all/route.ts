import { NextRequest, NextResponse } from "next/server";
import { revokeAllTokens } from "@/src/lib/auth";
import { requireAdmin } from "@/src/lib/api";
export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request); if (auth.response) return auth.response;
  await revokeAllTokens(); const response = NextResponse.json({ success: true }); response.cookies.delete("admin_token"); return response;
}
