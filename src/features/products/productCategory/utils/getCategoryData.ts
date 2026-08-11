import { products } from "@/src/data/products";
import { categories } from "@/src/data/categories";

export function getCategoryData(slug: string) {
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return null;
  }

  const categoryProducts = products.filter(
    (product) => product.categoryId === category.id,
  );

  const brands = [...new Set(categoryProducts.map((item) => item.brand))];

  const averageRating =
    categoryProducts.length > 0
      ? Number(
          (
            categoryProducts.reduce((sum, item) => sum + item.rating, 0) /
            categoryProducts.length
          ).toFixed(1),
        )
      : 0;

  return {
    category,
    products: categoryProducts,
    productCount: categoryProducts.length,
    brandCount: brands.length,
    brands,
    averageRating,
  };
}
