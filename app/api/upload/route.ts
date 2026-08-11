import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/src/lib/api";

const extensions: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" };
export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request); if (auth.response) return auth.response;
  const file = (await request.formData()).get("file");
  if (!(file instanceof File)) return NextResponse.json({ message: "No valid file was uploaded" }, { status: 422 });
  if (file.size > 5 * 1024 * 1024) return NextResponse.json({ message: "Image must be smaller than 5 MB" }, { status: 422 });
  const extension = extensions[file.type];
  if (!extension) return NextResponse.json({ message: "Only JPG, PNG, WEBP and GIF images are allowed" }, { status: 422 });
  const filename = `${randomBytes(16).toString("hex")}.${extension}`;
  const directory = path.join(process.cwd(), "public", "uploads", "products");
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, filename), Buffer.from(await file.arrayBuffer()));
  return NextResponse.json({ url: `/uploads/products/${filename}` }, { status: 201 });
}
