import { NextRequest, NextResponse } from "next/server";

import { tagRepository } from "@/src/repositories/tag.repository";

import type { TagType } from "@/src/types/tag";

import { jsonBody, requireAdmin } from "@/src/lib/api";

import { tagErrors, tagInput } from "@/src/lib/tag-input";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  const auth = await requireAdmin(request);

  if (auth.response) {
    return auth.response;
  }

  const { id } = await params;

  const tagId = Number(id);

  if (!Number.isInteger(tagId) || tagId <= 0) {
    return NextResponse.json({ message: "Invalid tag id" }, { status: 400 });
  }

  const body = await jsonBody(request);

  if (!body) {
    return NextResponse.json(
      { message: "Request body must be valid JSON" },
      { status: 400 },
    );
  }

  const data = tagInput(body);

  const errors = tagErrors(data, false);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      {
        message: "Validation failed",
        errors,
      },
      { status: 422 },
    );
  }

  const tag = await tagRepository.update(
    tagId,
    data as Partial<Omit<TagType, "value">>,
  );

  if (!tag) {
    return NextResponse.json({ message: "Tag not found" }, { status: 404 });
  }

  return NextResponse.json(tag);
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const auth = await requireAdmin(request);

  if (auth.response) {
    return auth.response;
  }

  const { id } = await params;

  const tagId = Number(id);

  if (!Number.isInteger(tagId) || tagId <= 0) {
    return NextResponse.json({ message: "Invalid tag id" }, { status: 400 });
  }

  const deleted = await tagRepository.delete(tagId);

  if (!deleted) {
    return NextResponse.json({ message: "Tag not found" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
  });
}
