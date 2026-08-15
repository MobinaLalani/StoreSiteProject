import { NextRequest, NextResponse } from "next/server";
import { customerFromRequest } from "@/src/lib/customer-auth";
import { orderRepository } from "@/src/repositories/order.repository";
export async function GET(request: NextRequest) { const customer = await customerFromRequest(request); if (!customer) return NextResponse.json({ message: "وارد حساب نشده‌اید." }, { status: 401 }); const orders = (await orderRepository.getAll()).filter((order) => order.customerId === customer.id).map(({ accessToken, paymentAuthority, ...order }) => { void accessToken; void paymentAuthority; return order; }); return NextResponse.json(orders); }
