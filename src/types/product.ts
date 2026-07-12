import { StaticImageData } from "next/image";

export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: StaticImageData;
  price: number;
  oldPrice: number;
  discount: number;
  rating: number;
  stock: number;
  category: string;
}
