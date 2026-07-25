import { ReactNode } from "react";

import Header from "@/src/components/layout/admin/Header";
import Sidebar from "@/src/components/layout/admin/Sidebar";
import Footer from "@/src/components/layout/admin/Footer";
import '../../globals.css'
interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-8">{children}</main>

        <Footer />
      </div>
    </div>
  );
}
