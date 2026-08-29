"use client";

import { motion } from "framer-motion";
import {
  Star,
  CheckCircle2,
  Truck,
  ShieldCheck,
  Building2,
  MessageCircle,
  PhoneCall,
} from "lucide-react";

import { Product } from "@/src/types/product";

import ProductActions from "./ProductActions";
import AddToCartButton from "@/src/features/cart/AddToCartButton";
import { effectivePrice, formatToman } from "@/src/lib/money";
import { usePublicSettings } from "@/src/features/admin/settings/hooks/useSettings";
import { useTags } from "@/src/features/admin/tag";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { data: settings } = usePublicSettings();
  const { data: allTags = [] } = useTags();

  const landline = settings?.store.landline || "";
  const mobile = settings?.store.mobile || "";
  const whatsapp = settings?.store.whatsapp || "";

  const whatsappMessage = `سلام، برای خرید عمده محصول «${product.title}» پیام می‌دهم.`;

  const productTags = allTags.filter((tag) => product.tags.includes(tag.value));

  return (
    <div className="flex flex-col space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-black leading-tight text-gray-900"
      >
        {product.title}
      </motion.h1>

      <p className="leading-8 text-gray-500">{product.shortDescription}</p>

      <div className="rounded-2xl bg-slate-50 p-4">
        <strong className="text-2xl text-red-600">
          {effectivePrice(product) > 0
            ? formatToman(effectivePrice(product))
            : "برای قیمت تماس بگیرید"}
        </strong>

        {product.salePrice != null &&
          product.salePrice < Number(product.price) && (
            <del className="mr-3 text-sm text-slate-400">
              {formatToman(Number(product.price))}
            </del>
          )}
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <Star size={20} className="fill-yellow-400 text-yellow-400" />

          <span className="font-bold">{product.rating}</span>

          <span className="text-gray-400">({product.reviewCount} نظر)</span>
        </div>

        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle2 size={18} />

          <span>{product.stock > 0 ? "موجود در انبار" : "ناموجود"}</span>
        </div>
      </div>

      {product.colors.length > 0 && (
        <div>
          <h3 className="mb-4 font-bold">رنگ‌بندی</h3>

          <div className="flex flex-wrap gap-3">
            {product.colors.map((color) => (
              <span
                key={color}
                className="rounded-full border border-gray-200 px-4 py-2 text-sm"
              >
                {color}
              </span>
            ))}
          </div>
        </div>
      )}

      {productTags.length > 0 && (
        <div>
          <h3 className="mb-4 font-bold">ویژگی‌ها</h3>

          <div className="flex flex-wrap gap-2">
            {productTags.map((tag) => (
              <span
                key={tag.value}
                className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700"
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <AddToCartButton product={product} />

        <ProductActions productId={product.id} productTitle={product.title} />
      </div>

      {product.isWholesaleAvailable && (
        <section
          className="rounded-3xl border border-amber-200 bg-amber-50 p-5"
          aria-label="خرید عمده"
        >
          <div className="flex items-start gap-3">
            <span className="rounded-xl bg-amber-200 p-2 text-amber-900">
              <Building2 size={22} />
            </span>

            <div>
              <h2 className="font-black text-amber-950">امکان خرید عمده</h2>

              <p className="mt-1 text-sm leading-6 text-amber-900">
                برای دریافت قیمت همکاری و شرایط خرید عمده، مستقیم با ما در تماس
                باشید.
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {settings?.inquiry.phoneEnabled !== false && landline && (
              <a
                href={`tel:${landline.replace(/[^\d+]/g, "")}`}
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-3 font-bold text-slate-800 shadow-sm"
              >
                <PhoneCall size={18} className="text-amber-700" />

                <span dir="ltr">{landline}</span>
              </a>
            )}

            {settings?.inquiry.phoneEnabled !== false && mobile && (
              <a
                href={`tel:${mobile.replace(/[^\d+]/g, "")}`}
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-3 font-bold text-slate-800 shadow-sm"
              >
                <PhoneCall size={18} className="text-amber-700" />

                <span dir="ltr">{mobile}</span>
              </a>
            )}

            {settings?.inquiry.whatsappEnabled !== false && whatsapp && (
              <a
                href={`https://wa.me/${whatsapp.replace(
                  /\D/g,
                  "",
                )}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-3 font-bold text-white sm:col-span-2"
              >
                <MessageCircle size={18} />
                درخواست خرید عمده در واتساپ
              </a>
            )}
          </div>
        </section>
      )}

      <div className="grid gap-4 rounded-3xl border border-gray-200 p-5 md:grid-cols-2">
        <div className="flex items-center gap-3">
          <Truck size={22} className="text-red-500" />

          <div>
            <p className="font-semibold">ارسال سریع</p>

            <span className="text-sm text-gray-500">
              تحویل در سریع‌ترین زمان
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ShieldCheck size={22} className="text-green-500" />

          <div>
            <p className="font-semibold">ضمانت اصالت کالا</p>

            <span className="text-sm text-gray-500">تضمین اصل بودن محصول</span>
          </div>
        </div>
      </div>
    </div>
  );
}
