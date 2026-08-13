import { ReactNode } from "react";
import type { Metadata } from "next";

import Header from "@/src/components/layout/admin/Header";
import Sidebar from "@/src/components/layout/admin/Sidebar";
import Footer from "@/src/components/layout/admin/Footer";
import '../../globals.css'

export const metadata: Metadata = { title: "مدیریت فروشگاه", robots: { index: false, follow: false, nocache: true } };
interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <div className="flex min-h-dvh bg-slate-50">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header />

        <main className="hide-scrollbar flex-1 overflow-y-auto px-3 py-4 pb-24 sm:px-5 md:p-8 md:pb-8">{children}</main>

        <Footer />
      </div>
    </div>
  );
}
