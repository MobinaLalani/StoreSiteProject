import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  count?: number;
}

export default function ProductGridSkeleton({ count = 8 }: Props) {
  return (
    <div
      className="
      grid
      grid-cols-1
      gap-8
      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
    "
    >
      {Array.from({
        length: count,
      }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
