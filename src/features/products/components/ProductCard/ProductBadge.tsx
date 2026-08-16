import { Building2, Sparkles } from "lucide-react";

export default function ProductBadge({ featured, wholesale }: { featured: boolean; wholesale?: boolean }) {
  if (!featured && !wholesale) return null;

  return (
    <div className="absolute inset-x-3 top-3 z-20 flex items-start justify-between gap-2">
      {featured ? <span className="inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-[11px] font-black text-red-600 shadow-sm backdrop-blur"><Sparkles size={14} />پیشنهاد ویژه</span> : <span />}
      {wholesale && <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1.5 text-[11px] font-black text-white shadow-sm"><Building2 size={14} />فروش عمده</span>}
    </div>
  );
}
