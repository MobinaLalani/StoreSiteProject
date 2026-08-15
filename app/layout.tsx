import "./globals.css";

import type { Metadata, Viewport } from "next";
import ReactQueryProvider from "@/src/providers/ReactQueryProvider";

export const metadata: Metadata = {
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
      <head>
        <meta
          name="google-site-verification"
          content="mR-wwsjNPHLqyfRj4xjqcLPpzA4yaCEQtGcjlURdOuw"
        />
      </head>

      <body suppressHydrationWarning className="antialiased">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}