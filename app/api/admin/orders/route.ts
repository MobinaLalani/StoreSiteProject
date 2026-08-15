import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/api";
import { orderRepository } from "@/src/repositories/order.repository";

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request); if (auth.response) return auth.response;
  const orders = await orderRepository.getAll();
  return NextResponse.json(orders.map((order) => ({ ...order, accessToken: undefined, paymentAuthority: undefined })));
}
