import { Product } from "@/src/types/product";

export const products: Product[] = [
  {
    id: 1,
    title: "iPhone 16 Pro",
    slug: "iphone-16-pro",
    shortDescription: "جدیدترین گوشی اپل",
    description:
      "آیفون 16 پرو با تراشه A18 Pro، نمایشگر OLED و دوربین حرفه‌ای نسل جدید، تجربه‌ای سریع و روان را ارائه می‌دهد.",

    thumbnail: "/Image/products/batterycannectorcabel.png",

    images: [
      "/Image/products/phone1.jpg",
      "/Image/products/phone2.jpg",
      "/Image/products/phone1.jpg",
      "/Image/products/phone2.jpg",
    ],

    price: 82000000,
    oldPrice: 87000000,
    discount: 8,

    rating: 4.8,
    reviewCount: 248,

    stock: 15,

    sku: "APL-IP16PRO",

    brand: "Apple",

    categoryId: 1,

    tags: ["5G", "OLED", "A18 Pro", "Face ID"],

    colors: ["Titanium", "Black", "White"],

    specifications: [
      {
        title: "حافظه",
        value: "256GB",
      },
      {
        title: "رم",
        value: "8GB",
      },
      {
        title: "نمایشگر",
        value: "6.3 inch OLED",
      },
      {
        title: "پردازنده",
        value: "Apple A18 Pro",
      },
    ],

    status: "active",

    isFeatured: true,

    createdAt: "2026-07-26T12:00:00Z",

    updatedAt: "2026-07-26T12:00:00Z",
  },

  {
    id: 2,
    title: "MacBook Air M4",
    slug: "macbook-air-m4",
    shortDescription: "قدرت و سبکی",
    description:
      "مک‌بوک ایر M4 با طراحی فوق‌العاده سبک، عمر باتری طولانی و پردازنده قدرتمند Apple Silicon.",

    thumbnail: "/Image/products/cableshoe.png",

    images: [
      "/Image/products/laptop1.jpg",
      "/Image/products/laptop1.jpg",
      "/Image/products/laptop1.jpg",
    ],

    price: 112000000,
    oldPrice: 118000000,
    discount: 5,

    rating: 4.9,
    reviewCount: 103,

    stock: 6,

    sku: "APL-MBA-M4",

    brand: "Apple",

    categoryId: 2,

    tags: ["M4", "Retina", "SSD"],

    colors: ["Silver", "Midnight"],

    specifications: [
      {
        title: "پردازنده",
        value: "Apple M4",
      },
      {
        title: "رم",
        value: "16GB",
      },
      {
        title: "حافظه",
        value: "512GB SSD",
      },
      {
        title: "نمایشگر",
        value: "13.6 اینچ",
      },
    ],

    status: "active",

    isFeatured: true,

    createdAt: "2026-07-26T12:00:00Z",

    updatedAt: "2026-07-26T12:00:00Z",
  },

  {
    id: 3,
    title: "Sony WH-1000XM5",
    slug: "sony-wh1000xm5",
    shortDescription: "هدفون نویز کنسلینگ",
    description:
      "هدفون پرچمدار سونی با حذف نویز هوشمند و کیفیت صدای فوق‌العاده.",

    thumbnail: "/Image/products/gire.png",

    images: [
      "/Image/products/headphone2.jpg",
      "/Image/products/headphone2.jpg",
    ],

    price: 18900000,
    oldPrice: 21400000,
    discount: 12,

    rating: 4.7,
    reviewCount: 184,

    stock: 20,

    sku: "SONY-XM5",

    brand: "Sony",

    categoryId: 3,

    tags: ["Bluetooth", "Noise Cancelling"],

    colors: ["Black", "Silver"],

    specifications: [
      {
        title: "نوع اتصال",
        value: "Bluetooth 5.3",
      },
      {
        title: "شارژدهی",
        value: "30 ساعت",
      },
      {
        title: "وزن",
        value: "250 گرم",
      },
    ],

    status: "active",

    isFeatured: false,

    createdAt: "2026-07-26T12:00:00Z",

    updatedAt: "2026-07-26T12:00:00Z",
  },

  {
    id: 4,
    title: "Apple Watch Ultra",
    slug: "apple-watch-ultra",
    shortDescription: "ساعت هوشمند اپل",
    description:
      "Apple Watch Ultra مناسب ورزشکاران و کاربران حرفه‌ای با GPS دقیق و بدنه مقاوم.",

    thumbnail: "/Image/products/giresoosmari.png",

    images: ["/Image/products/phone2.jpg", "/Image/products/phone2.jpg"],

    price: 49500000,
    oldPrice: 52000000,
    discount: 6,

    rating: 4.8,
    reviewCount: 74,

    stock: 10,

    sku: "APL-WATCH-ULTRA",

    brand: "Apple",

    categoryId: 4,

    tags: ["GPS", "WatchOS"],

    colors: ["Titanium"],

    specifications: [
      {
        title: "نمایشگر",
        value: "49mm Retina",
      },
      {
        title: "باتری",
        value: "36 ساعت",
      },
      {
        title: "مقاومت",
        value: "100 متر",
      },
    ],

    status: "active",

    isFeatured: false,

    createdAt: "2026-07-26T12:00:00Z",

    updatedAt: "2026-07-26T12:00:00Z",
  },
];
