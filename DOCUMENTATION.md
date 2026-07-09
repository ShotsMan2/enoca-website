# Enoca Full-Stack Link and Category Management System - Proje Dokümantasyonu

Bu doküman, Enoca Link ve Kategori Yönetim Sistemi projesinin mimarisini, kullanılan teknolojilerini, veritabanı yapısını ve kurulum adımlarını detaylandırmak amacıyla hazırlanmıştır. Projeye yeni katılacak geliştiriciler (veya yapay zeka ajanları) için kapsamlı bir başvuru kaynağıdır.

---

## 1. Projeye Genel Bakış

**Enoca Full-Stack Projesi**, kullanıcıların dinamik olarak kategoriler oluşturabilmesine ve bu kategoriler altına yönlendirilebilir bağlantılar (linkler) ekleyebilmesine olanak tanıyan modern bir web uygulamasıdır. Proje, kurumsal seviyede ölçeklenebilirlik ve performans göz önünde bulundurularak iki ana bağımsız katmandan (Backend ve Frontend) oluşacak şekilde tasarlanmıştır.

### 1.1. Mimari Yaklaşım
Proje dizin yapısı, Backend ve Frontend'i aynı çatı altında barındıran ancak servis düzeyinde birbirinden ayrıştıran monorepo benzeri bir yaklaşım sergiler:
- **Root (Kök) Dizin:** Backend servislerini (NestJS) ve projenin genel yapılandırma dosyalarını barındırır.
- **`enoca-frontend/` Dizini:** İstemci tarafı (Next.js) uygulamasıdır.

---

## 2. Backend (NestJS & PostgreSQL)

Backend, katı tip güvenliği (strict typings) ve modüler mimarisi sayesinde bakımı kolay ve ölçeklenebilir bir yapı sunan **NestJS** çerçevesi üzerine inşa edilmiştir.

### 2.1. Teknoloji Yığını
- **Framework:** NestJS
- **Dil:** TypeScript
- **Veritabanı:** PostgreSQL (`enoca_db`)
- **ORM:** TypeORM
- **Test:** Jest (Birim ve E2E Testleri)

### 2.2. Modüller ve İş Mantığı
Uygulama, temel olarak iki bağımsız (ancak birbiriyle ilişkili) alana (domain) bölünmüştür:

1. **CategoriesModule (`src/categories`):**
   - Kategori oluşturma, listeleme, güncelleme ve silme operasyonlarından sorumludur.
   - Kategorilerin menüdeki sırası (`order`) ve benzersiz adres yapıları (`slug`) buradan yönetilir.

2. **LinksModule (`src/links`):**
   - Belirli bir kategoriye ait dış bağlantıların yönetilmesinden sorumludur.
   - Her link bir başlığa (`title`) ve hedef adrese (`url`) sahiptir.

### 2.3. Veritabanı Şeması (TypeORM Entities)

Veritabanı ilişkisi `Category` (One-to-Many) -> `Link` (Many-to-One) şeklinde kurulmuştur:

- **Category Entity:**
  - `id`: Benzersiz Kimlik (Primary Key)
  - `name`: Kategori Adı
  - `slug`: URL Dostu İsim (Örn: `yazilim-cozumleri` - Benzersiz/Unique)
  - `order`: Menü Sıralaması
  - İlişki: Bir kategorinin birden fazla linki olabilir (`links: Link[]`).

- **Link Entity:**
  - `id`: Benzersiz Kimlik (Primary Key)
  - `title`: Bağlantı Başlığı
  - `url`: Hedef Adres
  - İlişki: Bir link tek bir kategoriye aittir (`category: Category`). Kategori silindiğinde linkler de otomatik silinir (`onDelete: 'CASCADE'`).

---

## 3. Frontend (Next.js & Tailwind CSS)

Frontend uygulaması, en son modern web standartlarına uygun olarak hızlı, reaktif ve kullanıcı dostu bir arayüz sunmak için geliştirilmiştir.

### 3.1. Teknoloji Yığını
- **Framework:** Next.js (App Router ile - v16)
- **Dil:** TypeScript
- **Stil & Tasarım:** Tailwind CSS v4, Framer Motion (Mikro etkileşim ve animasyonlar)
- **Durum Yönetimi (State):** Zustand
- **BFF / API Katmanı:** Prisma (Next.js üzerinden backend'i destekleyici API Route'ları veya okuma işlemleri için)
- **Bileşen Kütüphanesi:** Storybook
- **Uluslararasılaştırma:** Next-intl (Çoklu dil desteği)
- **İkonografi & Görselleştirme:** Lucide React, Recharts
- **Test:** Playwright (Uçtan uca - E2E), Vitest (Birim Testleri)

### 3.2. Mimari Prensipler
- **Modüler State:** Zustand store'ları global tek bir nesne yerine modüler (slice) yapıda, selector'lar kullanılarak gereksiz render'ları önleyecek şekilde tasarlanmıştır.
- **Storybook-First:** Yeni bir UI bileşeni (Button, Card vs.) geliştirildiğinde doğrudan ana projeye entegre edilmeden önce Storybook ortamında (`*.stories.tsx`) test edilir ve dokümante edilir.
- **Dinamik Tasarım:** Sadece statik sayfalar yerine; Framer Motion kullanılarak akıcı sayfa geçişleri, hover/focus durumlarında mikro-animasyonlar ile desteklenmiş premium hissiyat veren modern bir UI tercih edilir.

---

## 4. Geliştirme Ortamı ve Kurulum Kılavuzu

Projenin yerel ortamda (local) çalıştırılabilmesi için sisteminizde **Node.js** (v18+ önerilir) ve **PostgreSQL** kurulu olmalıdır.

### Adım 1: Veritabanı Hazırlığı
PostgreSQL üzerinde `enoca_db` adında boş bir veritabanı oluşturun.
Varsayılan bağlantı ayarları: Kullanıcı (`postgres`), Şifre (`src/app.module.ts` veya `.env` üzerinden ayarlanabilir).

### Adım 2: Backend'i Başlatma
1. Kök dizine gidin:
   ```bash
   cd path/to/enoca-backend
   ```
2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
3. Uygulamayı geliştirme modunda çalıştırın:
   ```bash
   npm run start:dev
   ```
   *Backend sunucusu (varsayılan ayarlarda) `http://localhost:3000` adresinde çalışacaktır.*

### Adım 3: Frontend'i Başlatma
1. Yeni bir terminal açarak frontend dizinine gidin:
   ```bash
   cd path/to/enoca-backend/enoca-frontend
   ```
2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
3. İstemci uygulamasını geliştirme modunda çalıştırın:
   ```bash
   npm run dev
   ```
   *Frontend sunucusu varsayılan olarak `http://localhost:3001` adresinde ayağa kalkacaktır.*

4. **Bileşen Geliştirme (Opsiyonel):** Storybook'u açmak için:
   ```bash
   npm run storybook
   ```

---

## 5. Test Yaklaşımı (Kalite Güvencesi)

Projenin güvenilirliği ve kod kalitesi için kapsamlı bir test stratejisi benimsenmiştir:

- **Backend (Jest):**
  - Tüm Service metodları ve Controller işlevleri için mock nesneler kullanılarak izole birim (unit) testler.
  ```bash
  # Kök dizinde:
  npm run test
  ```

- **Frontend (Vitest & Playwright):**
  - **Birim Testler (Vitest):** UI iş mantığı, yardımcı (utility) fonksiyonlar ve hook'lar için.
  - **E2E Testler (Playwright):** Kullanıcının uygulamadaki kritik akışlarını (Kategori oluşturma, linke tıklama, form doğrulama vs.) simüle eden uçtan uca testler.
  ```bash
  # enoca-frontend dizininde:
  npm run test:e2e
  ```

---

## 6. Geliştirici & AI Ajanı Prensipleri (Özet)

Daha detaylı kurallar için kök dizindeki `agents.md` dosyasına başvurulmalıdır. Temel beklentiler şunlardır:
1. **Tip Güvenliği:** TypeScript'te `any` kullanımı kesinlikle yasaktır.
2. **Mimari Sadakat:** Backend'de NestJS modül/servis mimarisine, Frontend'de Next.js v16 App Router standartlarına (%100) sadık kalınmalıdır.
3. **Sorumluluk Ayrımı:** Prisma (Frontend) yalnızca okunabilirlik/BFF amacı taşır; asıl iş mantığı, veri doğrulama ve veri bütünlüğü TypeORM (Backend) üzerinden sağlanır.
4. **Estetik ve UX:** UI tasarımlarında sıradanlıktan kaçınılır; renk paletleri özenle seçilir, Tailwind ve Framer Motion ile canlı ve kullanıcı dostu bir arayüz geliştirilir.
