import { NextRequest, NextResponse } from "next/server";

import { productRepository } from "@/src/repositories/product.repository";

export async function GET() {
  try {
    const products = await productRepository.getAll();

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "خطا در دریافت محصولات",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newProduct = await productRepository.create({
      title: body.title,

      slug: body.slug,

      shortDescription: body.shortDescription,

      description: body.description,

      thumbnail: body.thumbnail,

      images: body.images,

      price: body.price,

      oldPrice: body.oldPrice,

      discount: body.discount,

      rating: body.rating ?? 0,

      reviewCount: body.reviewCount ?? 0,

      stock: body.stock,

      sku: body.sku,

      brand: body.brand,

      categoryId: body.categoryId,

      tags: body.tags ?? [],

      colors: body.colors ?? [],

      specifications: body.specifications ?? [],

      status: body.status ?? "active",

      isFeatured: body.isFeatured ?? false,
    });

    return NextResponse.json(newProduct, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "خطا در ایجاد محصول",
      },
      {
        status: 500,
      },
    );
  }
}