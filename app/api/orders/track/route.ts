import { NextResponse } from "next/server";
import { orderRepository } from "@/src/repositories/order.repository";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const trackingCode = url.searchParams.get("trackingCode")?.trim() || "";
  const mobile = url.searchParams.get("mobile")?.trim();
  const token = url.searchParams.get("token")?.trim();
  const order = await orderRepository.getByTrackingCode(trackingCode);
  if (!order || (token !== order.accessToken && mobile !== order.customer.mobile)) return NextResponse.json({ message: "سفارشی با این مشخصات پیدا نشد." }, { status: 404 });
  const { accessToken: _secret, paymentAuthority: _authority, ...safeOrder } = order;
  void _secret; void _authority;
  return NextResponse.json(safeOrder);
}
