import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminCommandPalette from "@/components/admin/AdminCommandPalette";
import { ToastProvider } from "@/components/admin/ToastProvider";
import AIAssistant from "@/components/admin/AIAssistant";
import { ThemeProvider } from "next-themes";
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
      <body className={`${inter.className} antialiased min-h-screen bg-gray-50 dark:bg-gray-950 font-sans selection:bg-blue-500/30`}>
        {/* Dark mode init */}
        <Script id="admin-theme-init" strategy="beforeInteractive">{`
          try{var t=localStorage.getItem('admin-theme');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}
        `}</Script>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="admin-theme">
          <ToastProvider>
            <div className="flex h-screen overflow-hidden">
              <AdminSidebar />
              <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-gray-950">
                {children}
              </div>
            </div>
            <AdminCommandPalette />
            <AIAssistant />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
