import type { MetadataRoute } from "next";
import type { SiteSettings } from "@/src/features/admin/settings/types";
import { settingsRepository } from "@/src/repositories/settings.repository";

export const dynamic = "force-dynamic";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const settings = await settingsRepository.getPublic() as unknown as SiteSettings;
  return { name: settings.store.name, short_name: settings.store.name, description: settings.store.shortDescription, start_url: "/", display: "standalone", background_color: "#f8fafc", theme_color: settings.appearance.primaryColor, lang: "fa", dir: "rtl" };
}
