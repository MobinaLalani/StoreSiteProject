import { Category } from "@/src/types/category";

import mobileImage from "@/public/Image/categories/mobile.jpg";
import laptopImage from "@/public/Image/categories/laptop.png";
import headphoneImage from "@/public/Image/categories/headphone.jpg";
// import watchImage from "@/public/Image/categories/watch.png";
// import cameraImage from "@/public/Image/categories/camera.png";
// import gamingImage from "@/public/Image/categories/gaming.png";

export const categories: Category[] = [
  {
    id: 1,
    title: "موبایل",
    slug: "mobile",
    image: mobileImage,
  },
  {
    id: 2,
    title: "لپ تاپ",
    slug: "laptop",
    image: laptopImage,
  },
  {
    id: 3,
    title: "هدفون",
    slug: "headphone",
    image: headphoneImage,
  },
  {
    id: 4,
    title: "ساعت",
    slug: "watch",
    image: laptopImage,
  },
  {
    id: 5,
    title: "دوربین",
    slug: "camera",
    image: laptopImage,
  },
  {
    id: 6,
    title: "کنسول",
    slug: "gaming",
    image: laptopImage,
  },
];