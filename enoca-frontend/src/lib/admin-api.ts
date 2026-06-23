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

export interface ActivityLog {
  id: number;
  action: string;
  details: string;
  timestamp: string;
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

export interface HomepageFeature {
  id: number;
  number: string;
  title: string;
  text: string;
}

export interface HomepageCategoryLink {
  id: string | number;
  title: string;
  url: string;
}

export interface HomepageCategory {
  id: string | number;
  name: string;
  links: HomepageCategoryLink[];
}

export interface HomepageSettings {
  features: HomepageFeature[];
  references: string[];
  categories: HomepageCategory[];
}

export interface ContentPage {
  id: number;
  menuTitle: string;
  menuTitleEn?: string;
  slug: string;
  category: string;
  content: string;
  contentEn?: string;
  status: "published" | "draft";
  updatedAt: string;
}

export interface JobPosting {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string; // Tam Zamanlı, Yarı Zamanlı vs.
  description: string;
  requirements: string[];
  status: "active" | "closed";
  postedAt: string;
}

export interface JobApplication {
  id: number;
  jobId: number;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  portfolioUrl?: string;
  status: "new" | "reviewed" | "rejected" | "accepted";
  appliedAt: string;
}

// ─── API Helper Fonksiyonu ────────────────────────────────────
async function fetchEntity(entity: string) {
  const res = await fetch(`/api/admin/${entity}`);
  if (!res.ok) throw new Error('API Hatası');
  return res.json();
}

async function postEntity(entity: string, data: unknown) {
  const res = await fetch(`/api/admin/${entity}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('API Hatası');
  const result = await res.json();
  return result.data;
}

// ─── Servis Fonksiyonları ────────────────────────────────────

export const adminApi = {
  // Activity Logs
  async getLogs(): Promise<ActivityLog[]> {
    try {
      return await fetchEntity('logs');
    } catch {
      return [];
    }
  },
  async logAction(action: string, details: string): Promise<void> {
    try {
      const list = await fetchEntity('logs').catch(() => []);
      const newId = list.length ? Math.max(...list.map((l: ActivityLog) => l.id)) + 1 : 1;
      list.unshift({ id: newId, action, details, timestamp: new Date().toISOString() });
      await postEntity('logs', list);
    } catch (e) {
      console.error("Log kaydı alınamadı", e);
    }
  },

  // Stats
  async getStats(): Promise<Stats> {
    return fetchEntity('stats');
  },

  // News
  async getNews(): Promise<NewsItem[]> {
    return fetchEntity('news');
  },
  async createNews(data: Omit<NewsItem, "id">): Promise<NewsItem> {
    const list = await fetchEntity('news');
    const newId = list.length ? Math.max(...list.map((n: NewsItem) => n.id)) + 1 : 1;
    const newItem = { ...data, id: newId };
    list.unshift(newItem);
    await postEntity('news', list);
    await this.logAction("Haber Eklendi", `"${data.title}" başlıklı haber eklendi.`);
    return newItem;
  },
  async updateNews(data: NewsItem): Promise<NewsItem> {
    const list = await fetchEntity('news');
    const i = list.findIndex((n: NewsItem) => n.id === data.id);
    if (i !== -1) list[i] = data;
    await postEntity('news', list);
    await this.logAction("Haber Güncellendi", `"${data.title}" başlıklı haber güncellendi.`);
    return data;
  },
  async deleteNews(id: number): Promise<void> {
    const list = await fetchEntity('news');
    const item = list.find((n: NewsItem) => n.id === id);
    const filtered = list.filter((n: NewsItem) => n.id !== id);
    await postEntity('news', filtered);
    if (item) await this.logAction("Haber Silindi", `"${item.title}" başlıklı haber silindi.`);
  },

  // Contact
  async getMessages(): Promise<ContactMessage[]> {
    return fetchEntity('messages');
  },
  async createMessage(data: Omit<ContactMessage, "id" | "receivedAt" | "isRead">): Promise<void> {
    const list = await fetchEntity('messages');
    const newId = list.length ? Math.max(...list.map((m: ContactMessage) => m.id)) + 1 : 1;
    list.unshift({ ...data, id: newId, receivedAt: new Date().toISOString(), isRead: false });
    await postEntity('messages', list);
  },
  async markAsRead(id: number): Promise<void> {
    const list = await fetchEntity('messages');
    const msg = list.find((m: ContactMessage) => m.id === id);
    if (msg) msg.isRead = true;
    await postEntity('messages', list);
  },
  async deleteMessage(id: number): Promise<void> {
    const list = await fetchEntity('messages');
    const filtered = list.filter((m: ContactMessage) => m.id !== id);
    await postEntity('messages', filtered);
  },

  // Site Settings
  async getSiteSettings(): Promise<SiteSettings> {
    return fetchEntity('settings');
  },
  async updateSiteSettings(data: SiteSettings): Promise<SiteSettings> {
    const res = await postEntity('settings', data);
    await this.logAction("Ayarlar Güncellendi", "Sistem genel ayarları güncellendi.");
    return res;
  },

  // Hero Settings
  async getHeroSettings(): Promise<HeroSettings> {
    return fetchEntity('hero');
  },
  async updateHeroSettings(data: HeroSettings): Promise<HeroSettings> {
    return postEntity('hero', data);
  },

  // Homepage Settings
  async getHomepageSettings(): Promise<HomepageSettings> {
    return fetchEntity('homepage');
  },
  async updateHomepageSettings(data: HomepageSettings): Promise<HomepageSettings> {
    return postEntity('homepage', data);
  },

  // Content Pages
  async getContentPages(): Promise<ContentPage[]> {
    return fetchEntity('pages');
  },
  async createContentPage(data: Omit<ContentPage, "id" | "updatedAt">): Promise<ContentPage> {
    const list = await fetchEntity('pages');
    const newId = list.length ? Math.max(...list.map((p: ContentPage) => p.id)) + 1 : 1;
    const newItem = { ...data, id: newId, updatedAt: new Date().toISOString() };
    list.push(newItem);
    await postEntity('pages', list);
    return newItem;
  },
  async updateContentPage(data: ContentPage): Promise<ContentPage> {
    const list = await fetchEntity('pages');
    const i = list.findIndex((p: ContentPage) => p.id === data.id);
    if (i !== -1) list[i] = { ...data, updatedAt: new Date().toISOString() };
    await postEntity('pages', list);
    return data;
  },
  async deleteContentPage(id: number): Promise<void> {
    const list = await fetchEntity('pages');
    const filtered = list.filter((p: ContentPage) => p.id !== id);
    await postEntity('pages', filtered);
  },

  // Jobs
  async getJobs(): Promise<JobPosting[]> {
    return fetchEntity('jobs');
  },
  async createJob(data: Omit<JobPosting, "id" | "postedAt">): Promise<JobPosting> {
    const list = await fetchEntity('jobs');
    const newId = list.length ? Math.max(...list.map((j: JobPosting) => j.id)) + 1 : 1;
    const newItem = { ...data, id: newId, postedAt: new Date().toISOString().split("T")[0] };
    list.unshift(newItem);
    await postEntity('jobs', list);
    return newItem;
  },
  async updateJob(data: JobPosting): Promise<JobPosting> {
    const list = await fetchEntity('jobs');
    const i = list.findIndex((j: JobPosting) => j.id === data.id);
    if (i !== -1) list[i] = data;
    await postEntity('jobs', list);
    return data;
  },
  async deleteJob(id: number): Promise<void> {
    const list = await fetchEntity('jobs');
    const filtered = list.filter((j: JobPosting) => j.id !== id);
    await postEntity('jobs', filtered);
  },

  // Applications
  async getApplications(): Promise<JobApplication[]> {
    return fetchEntity('applications');
  },
  async createApplication(data: Omit<JobApplication, "id" | "status" | "appliedAt">): Promise<void> {
    const list = await fetchEntity('applications');
    const newId = list.length ? Math.max(...list.map((a: JobApplication) => a.id)) + 1 : 1;
    list.unshift({ ...data, id: newId, status: "new", appliedAt: new Date().toISOString() });
    await postEntity('applications', list);
  },
  async updateApplicationStatus(id: number, status: JobApplication["status"]): Promise<void> {
    const list = await fetchEntity('applications');
    const app = list.find((a: JobApplication) => a.id === id);
    if (app) app.status = status;
    await postEntity('applications', list);
  }
};
