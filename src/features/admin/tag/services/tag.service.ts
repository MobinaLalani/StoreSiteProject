import {TagType} from "@/src/types/tag";

const BASE_URL = "/api/tag";

async function tagError(response: Response, fallback: string) {
  const body = await response.json().catch(() => null) as { message?: string } | null;
  return new Error(body?.message || fallback);
}

export async function getTags(): Promise<TagType[]> {
  const response = await fetch(BASE_URL);  
   if (!response.ok) {
    throw new Error("Failed to fetch tags.");
  }
  return response.json();
}

export async function createTag(
  data: Omit<TagType, "value">,
): Promise<TagType> {
    const response = await fetch(BASE_URL, {    
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw await tagError(response, "Failed to create tag.");
    }
    return response.json();
}

export async function updateTag(
  value: number,
  data: Partial<Omit<TagType, "value">>,
): Promise<TagType | null> {
  const response = await fetch(`${BASE_URL}/${value}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw await tagError(response, "Failed to update tag.");
  }
  return response.json();
}

export async function deleteTag(value: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/${value}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw await tagError(response, "Failed to delete tag.");
  }
}