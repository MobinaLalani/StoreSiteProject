import type { Metadata } from "next";

import Header from "@/src/components/layout/Header";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import PublicSettingsEffects from "@/src/features/admin/settings/PublicSettingsEffects";

import { settingsRepository } from "@/src/repositories/settings.repository";

import type { SiteSettings } from "@/src/features/admin/settings/types";

import { absoluteUrl, baseMetadata, safeJsonLd } from "@/src/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings =
    (await settingsRepository.getPublic()) as unknown as SiteSettings;

  return baseMetadata(settings);
}

export default async function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings =
    (await settingsRepository.getPublic()) as unknown as SiteSettings;

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",

    "@id": absoluteUrl("/#organization", settings),

    name: settings.store.name,

    url: absoluteUrl("/", settings),

    description: settings.store.shortDescription,

    logo: settings.store.logo
      ? absoluteUrl(settings.store.logo, settings)
      : undefined,

    email: settings.store.email || undefined,

    telephone: settings.store.landline || settings.store.mobile || undefined,

    address: settings.store.address
      ? {
          "@type": "PostalAddress",
          streetAddress: settings.store.address,
          addressCountry: "IR",
        }
      : undefined,

    sameAs: Object.values(settings.social).filter(Boolean),
  };

  return (
    <div className="bg-gray-50 pb-[calc(4.25rem+env(safe-area-inset-bottom))] text-slate-900 lg:pb-0">
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(organization),
        }}
      />

      <PublicSettingsEffects />

      <Header />

      <Navbar />

      <main id="main-content">{children}</main>

      {/* Enamad */}
      <div className="flex justify-center bg-slate-950 py-4">
        <div className="flex justify-center bg-slate-950 py-4">
          <div className="flex justify-center bg-slate-950 py-4">
            <a
              referrerPolicy="origin"
              target="_blank"
              href="https://trustseal.enamad.ir/?id=7431140&Code=L5smg5ZRztT8xlOVWlWUAFbjYBg0JiZr"
            >
              <img
                referrerPolicy="origin"
                src="https://trustseal.enamad.ir/logo.aspx?id=7431140&Code=L5smg5ZRztT8xlOVWlWUAFbjYBg0JiZr"
                alt="نماد اعتماد الکترونیکی"
                style={{ cursor: "pointer" }}
              />
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
