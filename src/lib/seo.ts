import type { Metadata } from "next";

import type { SiteSettings } from "@/src/features/admin/settings/types";

export const DEFAULT_SITE_URL = "http://localhost:3000";

export function getSiteUrl(settings?: Partial<SiteSettings>) {
  const configured = settings?.seo?.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  try {
    return new URL(configured.startsWith("http") ? configured : `https://${configured}`);
  } catch {
    return new URL(DEFAULT_SITE_URL);
  }
}

export function absoluteUrl(path: string, settings?: Partial<SiteSettings>) {
  return new URL(path, getSiteUrl(settings)).toString();
}

export function cleanDescription(value: string | undefined, fallback: string) {
  const text = (value || fallback).replace(/\s+/g, " ").trim();
  return text.length > 160 ? `${text.slice(0, 157).trim()}…` : text;
}

export function baseMetadata(settings: SiteSettings): Metadata {
  const title = settings.seo.title || settings.store.name;
  const description = cleanDescription(settings.seo.description, settings.store.shortDescription);
  const shareImage = settings.seo.shareImage
    ? absoluteUrl(settings.seo.shareImage, settings)
    : undefined;

  return {
    metadataBase: getSiteUrl(settings),
    title: { default: title, template: `%s | ${settings.store.name}` },
    description,
    applicationName: settings.store.name,
    authors: [{ name: settings.store.name }],
    creator: settings.store.name,
    publisher: settings.store.name,
    category: "تجهیزات صنعتی",
    keywords: settings.seo.keywords.split(",").map((item) => item.trim()).filter(Boolean),
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "fa_IR",
      url: "/",
      siteName: settings.store.name,
      title,
      description,
      images: shareImage ? [{ url: shareImage, alt: settings.store.name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: shareImage ? [shareImage] : undefined,
    },
    robots: settings.seo.allowIndexing
      ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }
      : { index: false, follow: false },
    verification: settings.seo.googleSiteVerification
      ? { google: settings.seo.googleSiteVerification }
      : undefined,
  };
}

export function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
