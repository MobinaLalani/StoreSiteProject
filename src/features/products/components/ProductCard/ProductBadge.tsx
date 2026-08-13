import { Sparkles } from "lucide-react";

export default function ProductBadge({ featured }: { featured: boolean }) {
  if (!featured) return null;
  return <span className="absolute right-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-[11px] font-black text-red-600 shadow-sm backdrop-blur"><Sparkles size={14} />پیشنهاد ویژه</span>;
}
