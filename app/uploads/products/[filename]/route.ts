import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  legacyProductUploadPath,
  productUploadPath,
} from "@/src/lib/upload-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const contentTypes: Record<string, string> = {
  ".gif": "image/gif",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

async function readUploadedImage(filename: string) {
  try {
    return await readFile(productUploadPath(filename));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    return readFile(legacyProductUploadPath(filename));
  }
}

export async function GET(
  _request: Request,
  context: RouteContext<"/uploads/products/[filename]">,
) {
  const { filename } = await context.params;
  const extension = path.extname(filename).toLowerCase();

  if (!/^[a-f0-9]{32}\.(gif|jpe?g|png|webp)$/i.test(filename)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const image = await readUploadedImage(filename);
    return new Response(image, {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": contentTypes[extension] ?? "application/octet-stream",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return new Response("Not found", { status: 404 });
    }
    throw error;
  }
}
