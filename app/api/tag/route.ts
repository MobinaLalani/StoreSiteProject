import { NextRequest, NextResponse } from "next/server";

import { tagRepository } from "@/src/repositories/tag.repository";
import type { TagType } from "@/src/types/tag";

import { jsonBody, requireAdmin } from "@/src/lib/api";
import { tagErrors, tagInput } from "@/src/lib/tag-input";

export async function GET() {
  return NextResponse.json(await tagRepository.getAll());
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);

  if (auth.response) {
    return auth.response;
  }

  const body = await jsonBody(request);

  if (!body) {
    return NextResponse.json(
      { message: "Request body must be valid JSON" },
      { status: 400 },
    );
  }

  const data = tagInput(body);
  const errors = tagErrors(data, true);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      {
        message: "Validation failed",
        errors,
      },
      { status: 422 },
    );
  }

  const tag = await tagRepository.create(data as Omit<TagType, "value">);

  return NextResponse.json(tag, { status: 201 });
}
