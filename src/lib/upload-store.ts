import path from "node:path";

const productUploadDirectory = () => {
  if (process.env.UPLOAD_DIR) return path.resolve(process.env.UPLOAD_DIR);

  const dataDirectory = process.env.DATA_DIR
    ? path.resolve(process.env.DATA_DIR)
    : path.join(process.cwd(), "data");

  return path.join(dataDirectory, "uploads", "products");
};

export function productUploadPath(filename: string) {
  return path.join(productUploadDirectory(), filename);
}

export function legacyProductUploadPath(filename: string) {
  return path.join(process.cwd(), "public", "uploads", "products", filename);
}
