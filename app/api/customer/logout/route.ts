import { NextRequest, NextResponse } from "next/server";
import { CUSTOMER_COOKIE, revokeCustomerSession } from "@/src/lib/customer-auth";
export async function POST(request: NextRequest) { await revokeCustomerSession(request); const response = NextResponse.json({ success: true }); response.cookies.set(CUSTOMER_COOKIE, "", { httpOnly: true, expires: new Date(0), path: "/", sameSite: "lax" }); return response; }
