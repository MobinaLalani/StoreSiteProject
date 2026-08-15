import { randomInt } from "node:crypto";
import { NextResponse } from "next/server";
import { orderRepository } from "@/src/repositories/order.repository";
import { productRepository } from "@/src/repositories/product.repository";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { authority?: string; result?: string } | null;
  if (!body?.authority || !["success", "failed"].includes(body.result || "")) return NextResponse.json({ message: "درخواست نامعتبر است." }, { status: 400 });
  const order = await orderRepository.getByAuthority(body.authority);
  if (!order) return NextResponse.json({ message: "سفارش پیدا نشد." }, { status: 404 });
  if (order.status === "paid") return NextResponse.json({ redirectUrl: `/payment/result?tracking=${order.trackingCode}&token=${order.accessToken}` });

  if (body.result === "failed") {
    await orderRepository.updateStatus(order.id, "payment_failed");
  } else {
    const products = await productRepository.getAll();
    for (const item of order.items) {
      const product = products.find((entry) => entry.id === item.productId);
      if (!product || product.stock < item.quantity) {
        await orderRepository.updateStatus(order.id, "payment_failed");
        return NextResponse.json({ message: "موجودی یکی از محصولات کافی نیست." }, { status: 409 });
      }
    }
    for (const item of order.items) {
      const product = products.find((entry) => entry.id === item.productId)!;
      await productRepository.update(product.id, { stock: product.stock - item.quantity });
    }
    await orderRepository.updateStatus(order.id, "paid", `TEST-${randomInt(10000000, 99999999)}`);
  }
  return NextResponse.json({ redirectUrl: `/payment/result?tracking=${order.trackingCode}&token=${order.accessToken}` });
}
