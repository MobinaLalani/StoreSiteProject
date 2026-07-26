import { NextRequest, NextResponse } from "next/server";

import { productRepository } from "@/src/repositories/product.repository";

export async function PUT(
  request: NextRequest,
  context: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const { id } = await context.params;

    const body = await request.json();

    const updatedProduct = await productRepository.update(Number(id), {
      title: body.title,
      slug: body.slug,

      shortDescription: body.shortDescription,
      description: body.description,

      thumbnail: body.thumbnail,
      images: body.images,

      price: body.price,
      oldPrice: body.oldPrice,
      discount: body.discount,

      rating: body.rating,
      reviewCount: body.reviewCount,

      stock: body.stock,
      sku: body.sku,

      brand: body.brand,
      categoryId: body.categoryId,

      tags: body.tags,
      colors: body.colors,

      specifications: body.specifications,

      status: body.status,
      isFeatured: body.isFeatured,
    });

    if (!updatedProduct) {
      return NextResponse.json(
        {
          message: "محصول پیدا نشد",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "خطا در ویرایش محصول",
      },
      {
        status: 500,
      },
    );
  }
}
