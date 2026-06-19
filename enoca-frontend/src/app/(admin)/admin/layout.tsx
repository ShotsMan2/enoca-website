import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Script from "next/script";
import "../../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Enoca Admin Paneli",
  description: "Enoca web sitesi yönetim paneli",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head />
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased`}>
        {/* Dark mode init */}
        <Script id="admin-theme-init" strategy="beforeInteractive">{`
          try{var t=localStorage.getItem('admin-theme');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}
        `}</Script>
        <div className="flex h-screen overflow-hidden">
          <AdminSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
