import type { MetadataRoute } from "next";

import type { SiteSettings } from "@/src/features/admin/settings/types";
import { settingsRepository } from "@/src/repositories/settings.repository";
import { absoluteUrl } from "@/src/lib/seo";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await settingsRepository.getPublic() as unknown as SiteSettings;
  const allow = settings.seo.allowIndexing;
  return {
    rules: allow
      ? [{ userAgent: "*", allow: "/", disallow: ["/admin/", "/api/"] }]
      : [{ userAgent: "*", disallow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml", settings),
    host: absoluteUrl("/", settings),
  };
}
