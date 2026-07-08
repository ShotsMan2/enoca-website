# Enoca Full-Stack Projesi

Bu proje, backend tarafında **NestJS** ve **PostgreSQL**, frontend tarafında ise **Next.js**, **Tailwind CSS** ve **Prisma** kullanılarak geliştirilmiş modern bir full-stack web uygulamasıdır. Proje, "Kategoriler" (Categories) ve "Bağlantılar" (Links) yönetimi üzerine odaklanmıştır.

---

## 📂 Proje Yapısı

Proje temel olarak iki ana bölümden oluşmaktadır:

- **Root (Kök) Dizin (`/src` vd.):** NestJS tabanlı backend uygulaması.
- **`enoca-frontend/` Dizini:** Next.js tabanlı frontend (kullanıcı arayüzü) uygulaması.

---

## 🛠️ Backend (NestJS)

Backend uygulaması güçlü ve ölçeklenebilir bir mimari sunan NestJS framework'ü ile geliştirilmiştir.

### Kullanılan Teknolojiler
- **Framework:** NestJS
- **ORM:** TypeORM
- **Veritabanı:** PostgreSQL (Varsayılan DB: `enoca_db`)
- **Test:** Jest

### Ana Modüller
- `CategoriesModule`: Kategori işlemlerinin yürütüldüğü modül.
- `LinksModule`: Bağlantı/Link işlemlerinin yürütüldüğü modül.

### Kurulum ve Çalıştırma

1. **Veritabanı Hazırlığı:** PostgreSQL sunucunuzun çalıştığından ve `enoca_db` adında bir veritabanı oluşturulduğundan emin olun (kullanıcı adı: `postgres`, şifre ayarlarına `src/app.module.ts` içerisinden bakabilirsiniz).
2. **Bağımlılıkları Yükleme:**
   ```bash
   npm install
   ```
3. **Uygulamayı Çalıştırma (Geliştirme Modu):**
   ```bash
   npm run start:dev
   ```
4. **Testleri Çalıştırma:**
   ```bash
   npm run test
   ```

---

## 💻 Frontend (Next.js)

Kullanıcı arayüzü modern, hızlı ve SEO dostu bir yapı sunan Next.js ile geliştirilmiştir. Frontend klasörü `enoca-frontend` dizininde bulunur.

### Kullanılan Teknolojiler
- **Framework:** Next.js (v16)
- **Stil & Tasarım:** Tailwind CSS v4, Framer Motion (Animasyonlar), Lucide React (İkonlar)
- **Durum Yönetimi (State):** Zustand
- **ORM (API Route/BFF):** Prisma
- **UI Geliştirme:** Storybook
- **Test:** Playwright (E2E Testleri), Vitest (Birim Testleri)
- **Diğer:** Next-intl (Çoklu dil), Recharts (Grafikler)

### Kurulum ve Çalıştırma

1. **Klasöre Geçiş:**
   ```bash
   cd enoca-frontend
   ```
2. **Bağımlılıkları Yükleme:**
   ```bash
   npm install
   ```
3. **Uygulamayı Çalıştırma (Geliştirme Modu):**
   Next.js uygulaması varsayılan olarak `3001` portunda ayağa kalkacaktır.
   ```bash
   npm run dev
   ```
4. **Storybook'u Çalıştırma (Bileşen Geliştirme):**
   ```bash
   npm run storybook
   ```
5. **E2E Testlerini Çalıştırma:**
   ```bash
   npm run test:e2e
   ```

---

## 🚀 Deployment (Canlıya Alma)

- **Backend** tarafı derlenip (`npm run build`) Node.js sunucusunda (`npm run start:prod`) çalıştırılabilir.
- **Frontend** tarafı standart Next.js yapısında derlenip (`npm run build` ve ardından `npm run start`) sunulabilir.

## 📄 Lisans

Bu projenin özel kısımları `UNLICENSED` olarak ayarlanmış durumdadır.
