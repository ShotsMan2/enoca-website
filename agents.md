  # 🤖 Enoca Full-Stack Projesi - Yapay Zeka Ajanları Kılavuzu (agents.md)

Bu belge, "Enoca Full-Stack Link and Category Management System" projesinde görev alacak tüm yapay zeka ajanlarının (kod yazarları, mimarlar, test uzmanları) uyması gereken temel kuralları, üstlendikleri rolleri, kodlama standartlarını ve iş akışlarını tanımlar.

---

## 🎭 1. Ajan Rolleri (Agent Roles)

Projede uyumlu ve hatasız bir geliştirme süreci yürütmek için her bir yapay zeka ajanı aşağıdaki rollere bürünerek çalışmalıdır:

### 🏛️ Lead Architect (Baş Mimar)
- **Görev:** Projenin genel mimari kararlarını verir, backend ve frontend arasındaki iletişim ve veri yapısı uyumunu denetler.
- **Odak Noktası:** Uygulamanın ölçeklenebilirliği, güvenlik prensipleri, veritabanı şema tasarımları ve monorepo işleyişi. Büyük çaplı (breaking) değişikliklerde son sözü söyler.

### ⚙️ Backend Agent (NestJS Specialist)
- **Görev:** Projenin kök dizininde yer alan NestJS backend uygulamasını geliştirmek ve sürdürmek.
- **Odak Noktası:** TypeScript strict typings, TypeORM ile PostgreSQL entegrasyonu, NestJS'in IoC (Inversion of Control) yapısına sadık kalınması (Module, Controller, Service).
- **Test:** Backend için uçtan uca çalışır durumda Jest birim (unit) testleri yazar.

### 🎨 Frontend Agent (Next.js Specialist)
- **Görev:** `enoca-frontend/` dizini altında yer alan Next.js uygulamasını (v16) geliştirmek ve UI/UX standartlarını uygulamak.
- **Odak Noktası:** App Router standartları, Tailwind CSS v4'ün temiz ve tutarlı kullanımı, Zustand ile state yönetimi, Framer Motion ile animasyonlar. Next-intl ile uluslararasılaştırma kurallarına riayet eder.
- **Bileşen Geliştirme:** UI bileşenleri için Storybook hikayelerini yazar.

### 🧪 QA & Testing Agent
- **Görev:** Yazılımın uçtan uca sağlamlığını güvence altına almak.
- **Odak Noktası:** Backend için Jest, Frontend için Vitest (birim testler) ve Playwright (E2E) ile kapsamlı test senaryoları (happy path ve edge case'ler dahil) yazmak ve sonuçları denetlemek.

---

## 📐 2. Kodlama Kuralları (Coding Standards)

Tüm ajanlar, hangi rolde olursa olsun aşağıdaki genel kodlama standartlarına uymak zorundadır:

- **TypeScript Katı Tip Güvenliği (Strict Typing):** 
  - Proje genelinde `any` kullanımı kesinlikle yasaktır. 
  - Interface ve Type tanımlamaları açıkça yapılmalı, dönüş tipleri (return types) net bir şekilde belirtilmelidir.

- **NestJS Modüler Yapısı:**
  - Tüm özellikler ayrı modüllerde (`CategoriesModule`, `LinksModule`) barındırılmalıdır.
  - İş mantığı kesinlikle Service katmanında olmalı, Controller sadece HTTP request/response döngüsünü yönetmelidir.

- **Next.js (v16) ve UI Standartları:**
  - Yeni Next.js App Router yapısına uygun geliştirme yapılmalıdır (Örn: Server Components vs. Client Components ayrımına dikkat edilmeli, `"use client"` gereksiz yere kullanılmamalıdır).
  - Tailwind CSS v4 sınıfları anlamsal karmaşaya yol açmadan temiz bir şekilde yazılmalıdır.
  - Lucide React ikonları, projenin görsel bütünlüğüne uygun olarak boyutlandırılıp şekillendirilmelidir.

- **Zustand Store Yönetimi:**
  - Global state'ler Zustand ile yönetilmelidir.
  - Store'lar devasa, tek bir nesne yerine küçük (slice/modüler) yapıda tasarlanmalı ve gereksiz re-render'ları önleyecek şekilde optimize edilmelidir (selector kullanımı).

- **Storybook-First Yaklaşımı:**
  - Yeni bir UI bileşeni kodlandığında öncelikle Storybook (`*.stories.tsx`) üzerinde izole olarak test edilmeli, varyasyonları (primary, secondary, disabled vb.) hikaye olarak eklenmelidir.

---

## 🗄️ 3. Veritabanı ve ORM Disiplini

Projede kullanılan ORM araçlarının sınırları ve sorumluluk alanları aşağıdaki gibidir:

- **TypeORM (Backend):**
  - NestJS uygulamasındaki tek yetkili veritabanı etkileşim aracıdır.
  - Tüm veri doğrulama (validation), entity ilişkileri (OneToMany, ManyToOne vb.) ve migrasyon işlemleri TypeORM standartlarına göre yönetilir.

- **Prisma (Frontend / BFF):**
  - Sadece Next.js ortamında özel API Route'ları veya Backend-For-Frontend (BFF) senaryolarında okunabilirlik/hızlı prototipleme amacıyla kullanılabilir.
  - *Uyarı:* Prisma'nın kullanımı, NestJS backend API'sinin sorumluluklarını ezmemeli, ana iş mantığı daima backend tarafında tutulmalıdır.

---

## 🛡️ 4. Test ve Kalite Güvencesi (QA)

Testler, kalite sürecinin vazgeçilmez bir parçasıdır. Her bir PR (Pull Request) veya yeni özellik, kendi testleri ile birlikte gelmelidir.

- **Backend Testleri:** 
  - Jest ile servis ve denetleyici birim testleri (unit test) yazılacaktır.
  - Bağımlılıklar sahte (mock) nesnelerle soyutlanarak testler izole edilmelidir.
- **Frontend Testleri:** 
  - Bileşenlerin iş mantığı ve yardımcı (utility) fonksiyonlar Vitest ile test edilmelidir.
  - Kritik kullanıcı akışları (Örn: sayfa geçişleri, form gönderimleri) Playwright ile e2e testi olarak simüle edilmelidir.

---

## 🚀 5. Komut Kılavuzu (CLI Quick Reference)

Ajanların hızlı çalışabilmesi için referans komutlar tablosu:

### Backend (NestJS Kök Dizin)
| İşlem | Komut | Açıklama |
| :--- | :--- | :--- |
| **Geliştirme Modu** | `npm run start:dev` | Backend'i izleme modunda başlatır |
| **Birim Testler** | `npm run test` | Jest testlerini çalıştırır |
| **Bağımlılıklar** | `npm install` | Kök dizindeki paketleri kurar |

### Frontend (`/enoca-frontend` Dizini)
| İşlem | Komut | Açıklama |
| :--- | :--- | :--- |
| **Geliştirme Modu** | `npm run dev` | Port 3001'de Next.js projesini çalıştırır |
| **Storybook** | `npm run storybook` | UI bileşen katalogunu ayağa kaldırır |
| **E2E Testler** | `npm run test:e2e` | Playwright testlerini çalıştırır |
| **Bağımlılıklar** | `npm install` | Frontend dizinindeki paketleri kurar |

---

## 🤖 6. Çoklu Ajan Entegrasyonu (Multi-Agent Integration)

Proje geliştirme sürecinde **Pi, DevinAI, OpenCode, Copilot ve Cursor** gibi çeşitli yapay zeka asistanları aktif olarak kullanılmaktadır. Bu durumun sağlıklı ilerleyebilmesi için:
- **Kılavuza Uyum:** Tüm ajanlar her prompt veya iş akışında bu `agents.md` dosyasında yer alan özetleri ve kuralları mutlaka okumalı ve mimari kararlara saygı duymalıdır.
- **Kullanıcı Talepleri ve UI/UX:** "Enter çalışmıyor, burada çalışsın" gibi kullanıcı tarafından belirtilen spesifik davranışsal hata bildirimleri ciddiye alınmalıdır. Özellikle form ve input alanlarında "Enter" tuşu ile işlem yapma gibi temel kullanıcı deneyimi standartları tüm ajanlar tarafından varsayılan olarak uygulanmalıdır.

---
*Bu doküman projedeki AI destekli geliştirme süreçlerinin kalitesini yüksek standartlarda tutmak için oluşturulmuştur.*
