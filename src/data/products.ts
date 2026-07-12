import { Product } from "@/src/types/product";

import phone1Image from "@/public/Image/products/phone1.jpg";
import phone2Image from "@/public/Image/products/phone2.jpg";
import laptop1Image from "@/public/Image/products/laptop1.jpg";
import headphone2Image from "@/public/Image/products/headphone2.jpg";

export const products: Product[] = [
  {
    id: 1,

    title: "iPhone 16 Pro",

    slug: "iphone-16-pro",

    shortDescription: "جدیدترین گوشی اپل",

    description:
      "آیفون 16 پرو با تراشه A18 Pro، نمایشگر OLED و دوربین حرفه‌ای نسل جدید، تجربه‌ای سریع و روان را ارائه می‌دهد.",

    thumbnail: phone1Image,

    images: [phone1Image, phone2Image, phone1Image, phone2Image],

    price: 82000000,

    oldPrice: 87000000,

    discount: 8,

    rating: 4.8,

    reviewCount: 248,

    stock: 15,

    sku: "APL-IP16PRO",

    brand: "Apple",

    category: {
      id: 1,
      name: "موبایل",
      slug: "mobile",
    },

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
  },

  {
    id: 2,

    title: "MacBook Air M4",

    slug: "macbook-air-m4",

    shortDescription: "قدرت و سبکی",

    description:
      "مک‌بوک ایر M4 با طراحی فوق‌العاده سبک، عمر باتری طولانی و پردازنده قدرتمند Apple Silicon.",

    thumbnail: laptop1Image,

    images: [laptop1Image, laptop1Image, laptop1Image],

    price: 112000000,

    oldPrice: 118000000,

    discount: 5,

    rating: 4.9,

    reviewCount: 103,

    stock: 6,

    sku: "APL-MBA-M4",

    brand: "Apple",

    category: {
      id: 2,
      name: "لپ تاپ",
      slug: "laptop",
    },

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
        value: '13.6"',
      },
    ],
  },

  {
    id: 3,

    title: "Sony WH-1000XM5",

    slug: "sony-wh1000xm5",

    shortDescription: "هدفون نویز کنسلینگ",

    description:
      "هدفون پرچمدار سونی با حذف نویز هوشمند و کیفیت صدای فوق‌العاده.",

    thumbnail: headphone2Image,

    images: [headphone2Image, headphone2Image],

    price: 18900000,

    oldPrice: 21400000,

    discount: 12,

    rating: 4.7,

    reviewCount: 184,

    stock: 20,

    sku: "SONY-XM5",

    brand: "Sony",

    category: {
      id: 3,
      name: "هدفون",
      slug: "headphone",
    },

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
  },

  {
    id: 4,

    title: "Apple Watch Ultra",

    slug: "apple-watch-ultra",

    shortDescription: "ساعت هوشمند اپل",

    description:
      "Apple Watch Ultra مناسب ورزشکاران و کاربران حرفه‌ای با GPS دقیق و بدنه مقاوم.",

    thumbnail: phone2Image,

    images: [phone2Image, phone2Image],

    price: 49500000,

    oldPrice: 52000000,

    discount: 6,

    rating: 4.8,

    reviewCount: 74,

    stock: 10,

    sku: "APL-WATCH-ULTRA",

    brand: "Apple",

    category: {
      id: 4,
      name: "ساعت هوشمند",
      slug: "smart-watch",
    },

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
  },
];
