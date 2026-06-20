"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Bell, Sun, Moon, X, User, Settings, LogOut, ChevronDown, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/admin-api";

type NotificationItem = {
  id: string;
  text: string;
  time: string;
  read: boolean;
  icon: string;
};

const SEARCH_ROUTES: Record<string, string> = {
  "Dashboard": "/admin/dashboard",
  "Site Ayarları": "/admin/ayarlar",
  "Hero Yönetimi": "/admin/hero",
  "İçerik / CMS": "/admin/icerik",
  "Haberler": "/admin/haberler",
  "Gelen Kutusu": "/admin/iletisim",
  "Kariyer": "/admin/kariyer"
};

export default function AdminHeader({ title }: { title: string }) {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Dark mode init
  useEffect(() => {
    const stored = localStorage.getItem("admin-theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      // eslint-disable-next-line
      setIsDark(true);
    }
  }, []);

  // Fetch notifications
  useEffect(() => {
    let active = true;
    const fetchNotifs = async () => {
      try {
        const [messages, apps] = await Promise.all([
          adminApi.getMessages(),
          adminApi.getApplications()
        ]);
        if (!active) return;
        
        const unreadMsgs: NotificationItem[] = messages.filter(m => !m.isRead).map(m => ({
          id: `msg-${m.id}`,
          text: `Yeni mesaj: ${m.name}`,
          time: new Date(m.receivedAt).toLocaleDateString("tr-TR"),
          read: false,
          icon: "📩"
        }));
        
        const unreadApps: NotificationItem[] = apps.filter(a => a.status === "new").map(a => ({
          id: `app-${a.id}`,
          text: `Yeni başvuru: ${a.name} — ${a.jobTitle}`,
          time: new Date(a.appliedAt).toLocaleDateString("tr-TR"),
          read: false,
          icon: "📋"
        }));
        
        setNotifications([...unreadMsgs, ...unreadApps]);
      } catch (e) {
        console.error("Notif fetch error", e);
      }
    };

    fetchNotifs();
    const interval = setInterval(fetchNotifs, 5000);
    return () => { active = false; clearInterval(interval); };
  }, []);

  // Dışarı tıklayınca kapat
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("admin-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("admin-theme", "light");
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const markRead = async (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    try {
      if (id.startsWith("msg-")) {
        await adminApi.markAsRead(Number(id.split("-")[1]));
      } else if (id.startsWith("app-")) {
        await adminApi.updateApplicationStatus(Number(id.split("-")[1]), "reviewed");
      }
    } catch {}
  };

  const markAllRead = async () => {
    const currentUnread = notifications.filter(n => !n.read);
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    try {
      for (const n of currentUnread) {
        if (n.id.startsWith("msg-")) await adminApi.markAsRead(Number(n.id.split("-")[1]));
        else if (n.id.startsWith("app-")) await adminApi.updateApplicationStatus(Number(n.id.split("-")[1]), "reviewed");
      }
    } catch {}
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 flex-shrink-0 relative z-40">
      {/* Sol: Sayfa Başlığı */}
      <h1 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h1>

      {/* Sağ: Kontroller */}
      <div className="flex items-center gap-2">

        {/* Arama Kutusu */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            ref={searchRef}
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
            placeholder="Sayfada ara..."
            className="pl-9 pr-8 py-2 text-sm bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-gray-700 rounded-xl outline-none transition-all w-52 text-gray-700 dark:text-gray-300 placeholder-gray-400"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Arama Sonuçları Dropdown */}
          {searchOpen && search.length > 0 && (
            <div className="absolute top-full left-0 mt-1 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {Object.keys(SEARCH_ROUTES)
                .filter(item => item.toLowerCase().includes(search.toLowerCase()))
                .map((item, idx) => (
                  <button
                    key={idx}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                    onMouseDown={() => { 
                      setSearch(""); 
                      setSearchOpen(false); 
                      router.push(SEARCH_ROUTES[item]); 
                    }}
                  >
                    <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-200">{item}</span>
                  </button>
                ))}
              {Object.keys(SEARCH_ROUTES).filter(item => item.toLowerCase().includes(search.toLowerCase())).length === 0 && (
                <p className="px-4 py-3 text-sm text-gray-400 text-center">Sonuç bulunamadı</p>
              )}
            </div>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-yellow-400"
          title={isDark ? "Aydınlık Mod" : "Karanlık Mod"}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Bildirim */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => { setNotifOpen(prev => !prev); setProfileOpen(false); }}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300 relative"
            title="Bildirimler"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Bildirimler</h3>
                  {unreadCount > 0 && (
                    <span className="text-xs bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 font-bold px-1.5 py-0.5 rounded-full">{unreadCount}</span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-xs text-blue-500 hover:text-blue-700 font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" /> Tümünü Okundu İşaretle
                  </button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
                {notifications.map(n => (
                  <button
                    key={n.id}
                    onClick={() => markRead(n.id)}
                    className={`w-full flex items-start gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left ${!n.read ? "bg-blue-50/50 dark:bg-blue-900/10" : ""}`}
                  >
                    <span className="text-lg mt-0.5 flex-shrink-0">{n.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs leading-relaxed ${!n.read ? "text-gray-900 dark:text-white font-medium" : "text-gray-600 dark:text-gray-300"}`}>{n.text}</p>
                      <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                    </div>
                    {!n.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />}
                  </button>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-gray-100 dark:border-gray-700 text-center">
                {notifications.length === 0 && <p className="text-xs text-gray-500">Yeni bildiriminiz yok</p>}
              </div>
            </div>
          )}
        </div>

        {/* Profil */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => { setProfileOpen(prev => !prev); setNotifOpen(false); }}
            className="flex items-center gap-2 pl-3 ml-1 border-l border-gray-200 dark:border-gray-700 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-bold">A</div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-gray-800 dark:text-white leading-none">Admin</p>
              <p className="text-xs text-gray-400 mt-0.5">admin@enoca.com</p>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-400 hidden md:block transition-transform ${profileOpen ? "rotate-180" : ""}`} />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <p className="text-sm font-bold text-gray-900 dark:text-white">Admin Kullanıcı</p>
                <p className="text-xs text-gray-400 mt-0.5">admin@enoca.com</p>
              </div>
              <div className="py-1.5">
                <button onClick={() => { setProfileOpen(false); router.push("/admin/ayarlar"); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <User className="w-4 h-4 text-gray-400" /> Profil Bilgileri
                </button>
                <button onClick={() => { setProfileOpen(false); router.push("/admin/ayarlar"); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Settings className="w-4 h-4 text-gray-400" /> Hesap Ayarları
                </button>
              </div>
              <div className="py-1.5 border-t border-gray-100 dark:border-gray-700">
                <button 
                  onClick={async () => { 
                    setProfileOpen(false); 
                    await fetch("/api/admin/logout", { method: "POST" });
                    router.push("/admin/login"); 
                    router.refresh();
                  }} 
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Çıkış Yap
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
