import { StaticImageData } from "next/image";

export interface Category {
  id: number;
  title: string;
  slug: string;
  image: StaticImageData;
}
