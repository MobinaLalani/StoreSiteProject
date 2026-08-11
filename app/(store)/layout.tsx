import type { Metadata } from "next";
import "../globals.css";
import Header from "@/src/components/layout/Header";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import PublicSettingsEffects from "@/src/features/admin/settings/PublicSettingsEffects";
import { settingsRepository } from "@/src/repositories/settings.repository";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await settingsRepository.getPublic() as { seo?: { title?: string; description?: string; keywords?: string; allowIndexing?: boolean } };
  return { title: settings.seo?.title || "فروشگاه", description: settings.seo?.description, keywords: settings.seo?.keywords?.split(",").map((item) => item.trim()), robots: settings.seo?.allowIndexing === false ? { index: false, follow: false } : { index: true, follow: true } };
}

export default function StoreLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="bg-gray-50 text-slate-900"><PublicSettingsEffects /><Header /><Navbar /><main>{children}</main><Footer /></div>;
}
