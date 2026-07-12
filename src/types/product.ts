import { StaticImageData } from "next/image";

export interface ProductSpecification {
  title: string;
  value: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;

  title: string;

  slug: string;

  shortDescription: string;

  description: string;

  thumbnail: StaticImageData;

  images: StaticImageData[];

  price: number;

  oldPrice?: number;

  discount?: number;

  rating: number;

  reviewCount: number;

  stock: number;

  sku: string;

  brand: string;

  category: ProductCategory;

  tags: string[];

  colors: string[];

  specifications: ProductSpecification[];
}
