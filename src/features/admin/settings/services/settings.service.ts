import type { SiteSettings } from "../types";

async function parse(response: Response) {
  const body = await response.json();
  if (!response.ok) throw new Error(body.message ?? "خطا در دریافت تنظیمات");
  return body as SiteSettings;
}

export const settingsService = {
  getPublic: () => fetch("/api/settings/public").then(parse),
  getAdmin: () => fetch("/api/admin/settings").then(parse),
  update: (data: SiteSettings) => fetch("/api/admin/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(parse),
};
