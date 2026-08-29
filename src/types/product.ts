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

  /** Manufacturer or brand name used in product structured data. */
  brand?: string;

  /** Manufacturer part number used in product structured data. */
  mpn?: string;

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

  tags: number[] ;

  colors: string[];

  specifications: ProductSpecification[];

  status: "active" | "draft" | "archived";

  isFeatured: boolean;

  /** Whether direct wholesale contact details should be shown on this product. */
  isWholesaleAvailable?: boolean;

  createdAt: string;

  updatedAt: string;
}
