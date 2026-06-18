// ============================================================
// src/lib/admin-api.ts
// Mock API Servis Katmanı — NestJS API'ya geçişte sadece bu
// dosyayı gerçek fetch/axios çağrılarıyla güncelleyin.
// ============================================================

export interface Stats {
  totalProjects: number;
  pendingMessages: number;
  activeNews: number;
  weeklyVisitors: number;
}

export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  publishedAt: string;
  status: "published" | "draft";
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  receivedAt: string;
  isRead: boolean;
}

export interface SiteSettings {
  email: string;
  phone: string;
  linkedinUrl: string;
  twitterUrl: string;
  privacyUrl: string;
  termsUrl: string;
}

export interface HeroSettings {
  mainTitle: string;
  subtitle: string;
  highlightedWord: string;
  button1Text: string;
  button1Url: string;
  button2Text: string;
  button2Url: string;
  description: string;
}

export interface ContentPage {
  id: number;
  menuTitle: string;
  slug: string;
  category: string;
  content: string;
  status: "published" | "draft";
  updatedAt: string;
}

// ─── Mock Veriler ───────────────────────────────────────────

const mockStats: Stats = {
  totalProjects: 48,
  pendingMessages: 7,
  activeNews: 12,
  weeklyVisitors: 3240,
};

let mockNews: NewsItem[] = [
  { id: 1, title: "SAP CX Hybris B2C E-Ticaret Çözümümüz Güncellendi", summary: "Yeni versiyon ile performans %40 arttı.", imageUrl: "https://picsum.photos/seed/news1/400/200", publishedAt: "2025-06-10", status: "published" },
  { id: 2, title: "Enoca, LC Waikiki Projesini Başarıyla Teslim Etti", summary: "Proje 6 ay süreyle başarıyla yürütüldü.", imageUrl: "https://picsum.photos/seed/news2/400/200", publishedAt: "2025-06-05", status: "published" },
  { id: 3, title: "SAP HANA Entegrasyonu Hakkında Yeni Makale", summary: "In-memory computing avantajları anlatıldı.", imageUrl: "https://picsum.photos/seed/news3/400/200", publishedAt: "2025-05-28", status: "draft" },
  { id: 4, title: "Adese AVM İle Stratejik Ortaklık", summary: "Yeni e-ticaret altyapısı kuruldu.", imageUrl: "https://picsum.photos/seed/news4/400/200", publishedAt: "2025-05-20", status: "published" },
  { id: 5, title: "Enoca 2025 Teknoloji Raporu Yayınlandı", summary: "Yıllık teknoloji trendleri raporumuz hazır.", imageUrl: "https://picsum.photos/seed/news5/400/200", publishedAt: "2025-05-15", status: "published" },
  { id: 6, title: "Kariyer Fırsatları: SAP Danışmanı Aranıyor", summary: "Yeni pozisyonlar için başvurular başladı.", imageUrl: "https://picsum.photos/seed/news6/400/200", publishedAt: "2025-05-10", status: "draft" },
];

let mockMessages: ContactMessage[] = [
  { id: 1, name: "Ahmet Yılmaz", email: "ahmet@firma.com", message: "SAP CX Hybris çözümleriniz hakkında bilgi almak istiyorum. Firmamız için B2B e-ticaret platformu arıyoruz.", receivedAt: "2025-06-18T10:30:00Z", isRead: false },
  { id: 2, name: "Fatma Kaya", email: "fatma@sirket.com.tr", message: "Danışmanlık hizmetlerinizin fiyatlandırması hakkında bilgi alabilir miyim?", receivedAt: "2025-06-17T14:15:00Z", isRead: false },
  { id: 3, name: "Mehmet Demir", email: "m.demir@holding.com", message: "Referanslarınızı inceledim, benzer bir proje için görüşmek istiyorum.", receivedAt: "2025-06-16T09:00:00Z", isRead: true },
  { id: 4, name: "Zeynep Arslan", email: "zeynep@startup.io", message: "Küçük ölçekli bir işletme için SAP çözümleri uygun mudur?", receivedAt: "2025-06-15T16:45:00Z", isRead: true },
  { id: 5, name: "Can Öztürk", email: "can@teknoloji.com", message: "Sistem izleme çözümleriniz hakkında demo talep ediyorum.", receivedAt: "2025-06-14T11:20:00Z", isRead: true },
  { id: 6, name: "Elif Şahin", email: "elif@arge.net", message: "AR-GE departmanımız için yazılım desteği almak istiyoruz.", receivedAt: "2025-06-13T08:55:00Z", isRead: false },
  { id: 7, name: "Burak Güler", email: "b.guler@perakende.com", message: "Gratis ile yaptığınız projenin detaylarını öğrenebilir miyim?", receivedAt: "2025-06-12T13:10:00Z", isRead: false },
];

let mockSiteSettings: SiteSettings = {
  email: "contact@enoca.com",
  phone: "+90 850 221 73 54",
  linkedinUrl: "https://linkedin.com/company/enoca",
  twitterUrl: "https://twitter.com/enoca_",
  privacyUrl: "/gizlilik",
  termsUrl: "/kullanim-kosullari",
};

let mockHeroSettings: HeroSettings = {
  mainTitle: "WE DO SAP CX",
  highlightedWord: "HYBRIS",
  subtitle: "Experienced In SAP CX Hybris Delivery",
  description: "Enoca olarak SAP CX Hybris platformunda uzmanlaşmış danışmanlık ve geliştirme hizmetleri sunuyoruz.",
  button1Text: "SAP CX Hybris B2C E-Ticaret",
  button1Url: "/cozumler/hybris-cozumleri/hybris-b2c-ticaret",
  button2Text: "SAP CX Hybris B2B E-Ticaret",
  button2Url: "/cozumler/hybris-cozumleri/hybris-b2b-ticaret",
};

let mockContentPages: ContentPage[] = [
  { id: 1, menuTitle: "SAP CX Hybris B2C E-Ticaret", slug: "/cozumler/hybris-cozumleri/hybris-b2c-ticaret", category: "Çözümler", content: "<h2>SAP CX Hybris B2C E-Ticaret</h2><p>Müşterilerinize benzersiz bir alışveriş deneyimi sunun. SAP CX Hybris B2C platformu ile esnek, ölçeklenebilir ve yüksek performanslı bir e-ticaret altyapısı kurun.</p>", status: "published", updatedAt: "2025-06-10" },
  { id: 2, menuTitle: "SAP CX Hybris B2B E-Ticaret", slug: "/cozumler/hybris-cozumleri/hybris-b2b-ticaret", category: "Çözümler", content: "<h2>SAP CX Hybris B2B E-Ticaret</h2><p>Kurumsal müşterileriniz için güçlü B2B e-ticaret çözümleri. Toplu sipariş, özel fiyatlandırma ve çoklu kullanıcı yönetimi özellikleriyle iş süreçlerinizi dijitalleştirin.</p>", status: "published", updatedAt: "2025-06-08" },
  { id: 3, menuTitle: "Metodoloji", slug: "/projeler/metodoloji", category: "Projeler", content: "<h2>Metodoloji</h2><p>Çevik geliştirme metodolojisi ile projelerinizi zamanında ve bütçe dahilinde teslim ediyoruz.</p>", status: "published", updatedAt: "2025-05-30" },
  { id: 4, menuTitle: "Hakkımızda", slug: "/kurumsal/hakkimizda", category: "Kurumsal", content: "<h2>Hakkımızda</h2><p>Enoca, 2013 yılından bu yana SAP teknolojileri alanında uzmanlaşmış bir teknoloji danışmanlığı firmasıdır.</p>", status: "published", updatedAt: "2025-05-25" },
  { id: 5, menuTitle: "SAP HANA", slug: "/cozumler/sap-cozumleri/sap-hana", category: "Çözümler", content: "<h2>SAP HANA</h2><p>In-memory computing teknolojisi ile gerçek zamanlı veri analizi yapın.</p>", status: "draft", updatedAt: "2025-06-15" },
];

// ─── Servis Fonksiyonları ────────────────────────────────────

export const adminApi = {
  // Stats
  async getStats(): Promise<Stats> {
    await delay(300);
    return { ...mockStats };
  },

  // News
  async getNews(): Promise<NewsItem[]> {
    await delay(400);
    return [...mockNews];
  },
  async createNews(data: Omit<NewsItem, "id">): Promise<NewsItem> {
    await delay(500);
    const newItem = { ...data, id: Date.now() };
    mockNews = [newItem, ...mockNews];
    return newItem;
  },
  async updateNews(id: number, data: Partial<NewsItem>): Promise<NewsItem> {
    await delay(400);
    mockNews = mockNews.map(n => n.id === id ? { ...n, ...data } : n);
    return mockNews.find(n => n.id === id)!;
  },
  async deleteNews(id: number): Promise<void> {
    await delay(300);
    mockNews = mockNews.filter(n => n.id !== id);
  },

  // Messages
  async getMessages(): Promise<ContactMessage[]> {
    await delay(400);
    return [...mockMessages];
  },
  async markAsRead(id: number): Promise<void> {
    await delay(200);
    mockMessages = mockMessages.map(m => m.id === id ? { ...m, isRead: true } : m);
  },
  async deleteMessage(id: number): Promise<void> {
    await delay(300);
    mockMessages = mockMessages.filter(m => m.id !== id);
  },

  // Site Settings
  async getSiteSettings(): Promise<SiteSettings> {
    await delay(300);
    return { ...mockSiteSettings };
  },
  async updateSiteSettings(data: SiteSettings): Promise<SiteSettings> {
    await delay(500);
    mockSiteSettings = { ...data };
    return { ...mockSiteSettings };
  },

  // Hero Settings
  async getHeroSettings(): Promise<HeroSettings> {
    await delay(300);
    return { ...mockHeroSettings };
  },
  async updateHeroSettings(data: HeroSettings): Promise<HeroSettings> {
    await delay(500);
    mockHeroSettings = { ...data };
    return { ...mockHeroSettings };
  },

  // Content Pages
  async getContentPages(): Promise<ContentPage[]> {
    await delay(400);
    return [...mockContentPages];
  },
  async updateContentPage(id: number, data: Partial<ContentPage>): Promise<ContentPage> {
    await delay(500);
    mockContentPages = mockContentPages.map(p => p.id === id ? { ...p, ...data } : p);
    return mockContentPages.find(p => p.id === id)!;
  },
  async createContentPage(data: Omit<ContentPage, "id">): Promise<ContentPage> {
    await delay(500);
    const newPage = { ...data, id: Date.now() };
    mockContentPages = [...mockContentPages, newPage];
    return newPage;
  },
  async deleteContentPage(id: number): Promise<void> {
    await delay(300);
    mockContentPages = mockContentPages.filter(p => p.id !== id);
  },
};

// ─── Yardımcı ────────────────────────────────────────────────
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
