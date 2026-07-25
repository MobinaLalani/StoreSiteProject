import { Category } from "@/src/types/category";

import mobileImage from "/Image/categories/mobile.jpg";
import laptopImage from "/Image/categories/laptop.png";
import headphoneImage from "/Image/categories/headphone.jpg";
// import watchImage from "@/public/Image/categories/watch.png";
// import cameraImage from "@/public/Image/categories/camera.png";
// import gamingImage from "@/public/Image/categories/gaming.png";

export const categories: Category[] = [
  {
    id: 1,
    title: "موبایل",
    slug: "mobile",
    image: "/Image/categories/mobile.jpg",
    description:
      "جدیدترین گوشی‌های هوشمند اپل، سامسونگ و شیائومی با بهترین قیمت.",
  },
  {
    id: 2,
    title: "لپ تاپ",
    slug: "laptop",
    image: "/Image/categories/laptop.png",
    description: "انواع لپ‌تاپ‌های دانشجویی، مهندسی و گیمینگ.",
  },
  {
    id: 3,
    title: "هدفون",
    slug: "headphone",
    image: "/Image/categories/headphone.jpg",
    description: "هدفون‌های بی‌سیم و نویزکنسلینگ از برندهای معتبر.",
  },
  {
    id: 4,
    title: "ساعت",
    slug: "watch",
    image: "/Image/categories/headphone.jpg",
    description: "جدیدترین ساعت‌های هوشمند با امکانات سلامتی و ورزشی.",
  },
  {
    id: 5,
    title: "دوربین",
    slug: "camera",
    image: "/Image/categories/headphone.jpg",
    description: "تجربه بهترین خاطرات با بهترین ابزار",
  },
  {
    id: 6,
    title: "کنسول",
    slug: "gaming",
    image: "/Image/categories/headphone.jpg",
    description: "تجربه بهترینو حرفه ای ترین بازی ها",
  },
];