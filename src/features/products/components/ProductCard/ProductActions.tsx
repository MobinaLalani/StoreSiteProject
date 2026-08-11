"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { MessageCircle, PhoneCall, X } from "lucide-react";
import { usePublicSettings } from "@/src/features/admin/settings/hooks/useSettings";
import InquiryRequestForm from "@/src/features/admin/inquiries/components/InquiryRequestForm";

export default function ProductActions({ productId, productTitle, variant = "card" }: { productId?: number; productTitle?: string; variant?: "card" | "detail" }) {
  const [open, setOpen] = useState(false); const { data: settings } = usePublicSettings();
  const landline = settings?.store.landline || "021-12345678"; const mobile = settings?.store.mobile || "0912-123-4567"; const whatsapp = settings?.store.whatsapp || "989121234567";
  const message = (settings?.inquiry.whatsappMessage || "سلام، برای استعلام محصول «{product}» پیام می‌دهم.").replace("{product}", productTitle || "محصول");
  const whatsappUrl = `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
  return <><motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} onClick={() => setOpen(true)} className={`flex w-full items-center justify-center gap-3 rounded-2xl bg-red-500 font-semibold text-white transition hover:bg-red-600 ${variant === "detail" ? "min-h-14 px-6 py-4" : "py-4"}`}><PhoneCall size={20} />{settings?.inquiry.buttonText || "استعلام"}</motion.button>
    {open && typeof document !== "undefined" && createPortal(<AnimatePresence><motion.div className="fixed inset-0 z-[9999] flex items-end justify-center sm:items-center sm:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><button aria-label="بستن" className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} /><motion.div initial={{ scale: .95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} className="relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-6"><div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-bold">استعلام محصول</h2><button onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-gray-100"><X size={20} /></button></div><p className="mb-5 text-sm text-gray-500">برای دریافت اطلاعات «{productTitle || "محصول"}» تماس بگیرید یا درخواست تماس ثبت کنید.</p><div className="space-y-3">{settings?.inquiry.phoneEnabled !== false && <><a href={`tel:${landline.replace(/[^\d+]/g, "")}`} className="flex items-center gap-3 rounded-xl border p-4"><PhoneCall className="text-red-500" /><span dir="ltr">{landline}</span></a><a href={`tel:${mobile.replace(/[^\d+]/g, "")}`} className="flex items-center gap-3 rounded-xl border p-4"><PhoneCall className="text-red-500" /><span dir="ltr">{mobile}</span></a></>}{settings?.inquiry.whatsappEnabled !== false && <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex min-h-14 items-center justify-center gap-3 rounded-xl bg-emerald-500 p-4 font-bold text-white"><MessageCircle />استعلام در واتساپ</a>}<div className="border-t pt-4"><p className="mb-3 text-sm font-bold text-slate-700">یا درخواست تماس ثبت کنید</p><InquiryRequestForm productId={productId} productTitle={productTitle || "محصول"} /></div></div></motion.div></motion.div></AnimatePresence>, document.body)}
  </>;
}
