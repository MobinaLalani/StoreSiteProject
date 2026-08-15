import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { checkoutSchema, freeShippingMinimum, shippingCost } from "@/src/lib/checkout";
import { effectivePrice } from "@/src/lib/money";
import { orderRepository } from "@/src/repositories/order.repository";
import { productRepository } from "@/src/repositories/product.repository";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const parsed = checkoutSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "اطلاعات سفارش کامل یا معتبر نیست.", errors: parsed.error.flatten().fieldErrors }, { status: 422 });

  const products = await productRepository.getAll();
  const items = [];
  for (const requested of parsed.data.items) {
    const product = products.find((item) => item.id === requested.productId && item.status === "active");
    if (!product) return NextResponse.json({ message: "یکی از محصولات انتخاب‌شده دیگر موجود نیست." }, { status: 409 });
    if (product.stock < requested.quantity) return NextResponse.json({ message: `موجودی «${product.title}» کافی نیست.` }, { status: 409 });
    const unitPrice = effectivePrice(product);
    if (unitPrice <= 0) return NextResponse.json({ message: `قیمت «${product.title}» هنوز تعیین نشده است.` }, { status: 409 });
    items.push({ productId: product.id, title: product.title, slug: product.slug, thumbnail: product.thumbnail, unitPrice, quantity: requested.quantity });
  }

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const delivery = freeShippingMinimum > 0 && subtotal >= freeShippingMinimum ? 0 : shippingCost;
  const authority = randomBytes(18).toString("hex");
  const order = await orderRepository.create({
    items,
    customer: parsed.data.customer,
    subtotal,
    shippingCost: delivery,
    total: subtotal + delivery,
    status: "pending_payment",
    paymentAuthority: authority,
    paymentReference: null,
  });

  return NextResponse.json({ paymentUrl: `/payment/mock?authority=${authority}`, trackingCode: order.trackingCode });
}
