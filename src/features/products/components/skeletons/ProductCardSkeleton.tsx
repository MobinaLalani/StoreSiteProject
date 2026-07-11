import Skeleton from "@/src/components/ui/Skeleton/Skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <Skeleton className="h-72 w-full rounded-none" />

      <div className="space-y-5 p-5">
        <div className="space-y-3">
          <Skeleton className="h-5 w-2/3" />

          <Skeleton className="h-4 w-full" />

          <Skeleton className="h-4 w-3/4" />
        </div>

        <div className="flex justify-between">
          <Skeleton className="h-5 w-16" />

          <Skeleton className="h-5 w-12" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />

          <Skeleton className="h-6 w-36" />
        </div>

        <Skeleton className="h-12 w-full rounded-2xl" />
      </div>
    </div>
  );
}
