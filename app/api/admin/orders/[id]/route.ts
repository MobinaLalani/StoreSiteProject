import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/api";
import { orderRepository } from "@/src/repositories/order.repository";
import type { OrderStatus } from "@/src/types/order";

const allowed: OrderStatus[] = ["paid", "processing", "shipped", "delivered", "cancelled"];
export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(request); if (auth.response) return auth.response;
  const body = await request.json().catch(() => null) as { status?: OrderStatus } | null;
  if (!body?.status || !allowed.includes(body.status)) return NextResponse.json({ message: "وضعیت نامعتبر است." }, { status: 422 });
  const updated = await orderRepository.updateStatus(Number((await context.params).id), body.status);
  return updated ? NextResponse.json(updated) : NextResponse.json({ message: "سفارش پیدا نشد." }, { status: 404 });
}
