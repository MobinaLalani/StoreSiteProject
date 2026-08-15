export function effectivePrice(product: { price?: number; salePrice?: number | null }) {
  const price = Number(product.price) || 0;
  const sale = product.salePrice == null ? null : Number(product.salePrice);
  return sale !== null && sale >= 0 && sale < price ? sale : price;
}

export function formatToman(value: number) {
  return `${Math.round(value).toLocaleString("fa-IR")} تومان`;
}
