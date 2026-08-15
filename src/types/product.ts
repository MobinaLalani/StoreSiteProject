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

  thumbnail: string;

  images: string[];

  rating: number;

  reviewCount: number;

  stock: number;

  /** Price in toman. */
  price?: number;

  /** Optional sale price in toman. */
  salePrice?: number | null;

  categoryId: number;

  tags: string[];

  colors: string[];

  specifications: ProductSpecification[];

  status: "active" | "draft" | "archived";

  isFeatured: boolean;

  createdAt: string;

  updatedAt: string;
}
