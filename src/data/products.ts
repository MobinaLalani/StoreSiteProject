import { Product } from "@/src/types/product";

export const products: Product[] = [
  {
    id: 1,
    title: "iPhone 16 Pro",
    slug: "iphone-16-pro",
    description: "جدیدترین گوشی اپل",

    image: "/images/products/phone1.jpg",

    price: 82000000,

    oldPrice: 87000000,

    discount: 8,

    rating: 4.8,

    stock: 15,

    category: "mobile",
  },

  {
    id: 2,
    title: "MacBook Air M4",

    slug: "macbook-air",

    description: "قدرت و سبکی",

    image: "/images/products/laptop1.jpg",

    price: 112000000,

    oldPrice: 118000000,

    discount: 5,

    rating: 4.9,

    stock: 6,

    category: "laptop",
  },

  {
    id: 3,
    title: "Sony WH-1000XM5",

    slug: "sony-headphone",

    description: "Noise Cancelling",

    image: "/images/products/headphone2.jpg",

    price: 18900000,

    oldPrice: 21400000,

    discount: 12,

    rating: 4.7,

    stock: 20,

    category: "headphone",
  },

  {
    id: 4,
    title: "Apple Watch Ultra",

    slug: "watch-ultra",

    description: "Smart Watch",

    image: "/images/products/phone2.jpg",

    price: 49500000,

    oldPrice: 52000000,

    discount: 6,

    rating: 4.8,

    stock: 10,

    category: "mobile",
  },
];
