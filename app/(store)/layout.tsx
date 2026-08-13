import type { Metadata } from "next";
import "../globals.css";
import Header from "@/src/components/layout/Header";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import PublicSettingsEffects from "@/src/features/admin/settings/PublicSettingsEffects";
import { settingsRepository } from "@/src/repositories/settings.repository";
import type { SiteSettings } from "@/src/features/admin/settings/types";
import { baseMetadata, safeJsonLd, absoluteUrl } from "@/src/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await settingsRepository.getPublic() as unknown as SiteSettings;
  return baseMetadata(settings);
}

export default async function StoreLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await settingsRepository.getPublic() as unknown as SiteSettings;
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization", settings),
    name: settings.store.name,
    url: absoluteUrl("/", settings),
    description: settings.store.shortDescription,
    logo: settings.store.logo ? absoluteUrl(settings.store.logo, settings) : undefined,
    email: settings.store.email || undefined,
    telephone: settings.store.landline || settings.store.mobile || undefined,
    address: settings.store.address ? { "@type": "PostalAddress", streetAddress: settings.store.address, addressCountry: "IR" } : undefined,
    sameAs: Object.values(settings.social).filter(Boolean),
  };
  return <div className="bg-gray-50 pb-[calc(4.25rem+env(safe-area-inset-bottom))] text-slate-900 lg:pb-0"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(organization) }} /><PublicSettingsEffects /><Header /><Navbar /><main id="main-content">{children}</main><Footer /></div>;
}
