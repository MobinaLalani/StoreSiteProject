import type { Metadata } from "next";

import "./globals.css";

import Header from "@/src/components/layout/Header";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";

export const metadata: Metadata = {
  title: "Shop",
  description: "Modern Ecommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-gray-50 text-slate-900">
        <Header />

        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
