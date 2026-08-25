import type { TagType } from "@/src/types/tag";

export function tagInput(body: Record<string, unknown>) {
  return Object.fromEntries(
    ["label"].filter((key) => key in body).map((key) => [key, body[key]]),
  ) as Partial<TagType>;
}

export function tagErrors(data: Partial<TagType>, creating: boolean) {
  const errors: Record<string, string> = {};

  if (
    (creating || "label" in data) &&
    (typeof data.label !== "string" || !data.label.trim())
  ) {
    errors.label = "label is required";
  }

  return errors;
}
