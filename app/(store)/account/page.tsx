"use client";

import Link from "next/link";
import {
  Pencil,
  Wallet,
  Bell,
  Heart,
  MapPin,
  MessageCircle,
  Gift,
  ChevronLeft,
  ShoppingBag,
  Truck,
  RotateCcw,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";

import { useCustomer } from "@/src/features/customer/useCustomer";
import type { Order, OrderStatus } from "@/src/types/order";

const labels: Record<OrderStatus, string> = {
  pending_payment: "در انتظار پرداخت",
  paid: "پرداخت‌شده",
  processing: "در حال آماده‌سازی",
  shipped: "ارسال‌شده",
  delivered: "تحویل‌شده",
  cancelled: "لغوشده",
  payment_failed: "پرداخت ناموفق",
};

type AccountMenuItem = {
  title: string;
  icon: React.ElementType;
  href: string;
};

const accountMenuItems: AccountMenuItem[] = [
  {
    title: "پلاس",
    icon: Gift,
    href: "#",
  },
  {
    title: "سفارش‌ها",
    icon: ShoppingBag,
    href: "/account/orders",
  },
  {
    title: "لیست‌های من",
    icon: Heart,
    href: "#",
  },
  {
    title: "دیدگاه‌ها و پرسش‌ها",
    icon: MessageCircle,
    href: "#",
  },
  {
    title: "آدرس‌ها",
    icon: MapPin,
    href: "#",
  },
  {
    title: "کارت‌های هدیه",
    icon: Gift,
    href: "#",
  },
  {
    title: "پیام‌ها",
    icon: Bell,
    href: "#",
  },
];

async function getOrders(): Promise<Order[]> {
  const response = await fetch("/api/customer/orders");

  if (!response.ok) {
    throw new Error();
  }

  return response.json();
}

export default function AccountPage() {
  const { data: customer, isLoading } = useCustomer();

  const orders = useQuery({
    queryKey: ["customer", "orders"],
    queryFn: getOrders,
    enabled: Boolean(customer),
  });

  if (isLoading) {
    return <div className="p-20 text-center">در حال دریافت حساب...</div>;
  }

  if (!customer) {
    return (
      <main className="p-20 text-center">
        <h1 className="text-2xl font-black">برای مشاهده حساب وارد شوید</h1>

        <Link
          href="/login?next=/account"
          className="
            mt-5
            inline-flex
            rounded-xl
            bg-red-600
            px-6
            py-3
            text-white
          "
        >
          ورود
        </Link>
      </main>
    );
  }

  return (
    <main
      className="
        mx-auto
        min-h-screen
        max-w-xl
        bg-white
        px-4
        py-6
        text-right
      "
    >
      {/* Profile */}

      <section className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="
              grid
              h-14
              w-14
              place-items-center
              rounded-full
              bg-slate-100
              text-xl
            "
          >
            👤
          </div>

          <div>
            <h1 className="font-black">{customer.fullName}</h1>

            <p dir="ltr" className="text-sm text-slate-400">
              {customer.mobile}
            </p>
          </div>
        </div>

        <button type="button">
          <Pencil size={20} />
        </button>
      </section>

      {/* Wallet Cards */}

      <section
        className="
          mt-8
          grid
          grid-cols-3
          divide-x
          rounded-2xl
          border
          py-5
        "
      >
        <div className="text-center">
          <Wallet className="mx-auto text-purple-500" />

          <p className="mt-2 text-xs">کیف پول</p>

          <strong>۰ تومان</strong>
        </div>

        <div className="text-center">
          <span className="text-2xl">🪙</span>

          <p className="text-xs">امتیاز</p>

          <strong>۰</strong>
        </div>

        <div className="text-center">
          <span className="text-2xl">🏆</span>

          <p className="text-xs">طلا و نقره دیجیتال</p>
        </div>
      </section>

      {/* Verify */}

      <div
        className="
          mt-6
          rounded-2xl
          border
          p-5
        "
      >
        <p className="text-orange-500">
          ⚠️ با تایید هویت می‌توانید امنیت حساب کاربری را افزایش دهید
        </p>

        <button
          className="
            mt-4
            font-bold
            text-blue-600
          "
        >
          تایید هویت
        </button>
      </div>

      {/* Orders */}

      <section className="mt-8">
        <div className="mb-5 flex justify-between">
          <h2 className="font-black">سفارش‌های من</h2>

          <Link href="/account/orders" className="text-sm text-blue-600">
            مشاهده همه
          </Link>
        </div>

        <div
          className="
            grid
            grid-cols-3
            divide-x
            rounded-2xl
            border
            py-5
          "
        >
          <OrderStatusBox icon={<Truck />} title="جاری" />

          <OrderStatusBox icon={<ShoppingBag />} title="تحویل شده" />

          <OrderStatusBox icon={<RotateCcw />} title="مرجوع شده" />
        </div>
      </section>

      {/* Menu */}

      <section
        className="
          mt-6
          divide-y
          rounded-2xl
          border
        "
      >
        {accountMenuItems.map(({ title, icon: Icon, href }) => (
          <Link
            key={title}
            href={href}
            className="
                  flex
                  h-14
                  items-center
                  justify-between
                  px-4
                "
          >
            <ChevronLeft size={18} />

            <div className="flex items-center gap-3">
              <Icon size={20} />

              <span>{title}</span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}

function OrderStatusBox({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto w-fit text-slate-500">{icon}</div>

      <p className="mt-2 text-sm">{title}</p>
    </div>
  );
}
