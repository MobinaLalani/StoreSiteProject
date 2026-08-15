import { NextRequest, NextResponse } from "next/server";
import { customerFromRequest, publicCustomer } from "@/src/lib/customer-auth";
export async function GET(request: NextRequest) { const customer = await customerFromRequest(request); return customer ? NextResponse.json({ user: publicCustomer(customer) }) : NextResponse.json({ message: "وارد حساب نشده‌اید." }, { status: 401 }); }
