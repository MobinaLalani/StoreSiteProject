import HomeContent from "@/src/features/home/HomeContent";
import { productRepository } from "@/src/repositories/product.repository";
import { categoryRepository } from "@/src/repositories/category.repository";
export const dynamic = "force-dynamic";
export default async function HomePage() { const [products, categories] = await Promise.all([productRepository.getAll(), categoryRepository.getAll()]); const visibleProducts = products.filter((product) => product.status === "active").sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).slice(0, 8); return <HomeContent products={visibleProducts} categories={categories} />; }
