import "./globals.css";

import type { Metadata, Viewport } from "next";
import ReactQueryProvider from "@/src/providers/ReactQueryProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://etesalgostarr.ir"),
  manifest: "/manifest.webmanifest",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ef4444",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body suppressHydrationWarning className="antialiased">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
