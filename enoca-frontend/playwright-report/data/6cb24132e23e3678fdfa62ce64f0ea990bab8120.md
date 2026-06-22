# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: language.spec.ts >> Language and Translation E2E Tests >> should display Turkish as default and switch to English correctly
- Location: tests\e2e\language.spec.ts:5:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('text=SAP Solutions').first()
Expected: visible
Received: hidden
Timeout:  5000ms

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=SAP Solutions').first()
    13 × locator resolved to <span class="flex-1 uppercase tracking-wide">SAP SOLUTIONS</span>
       - unexpected value "hidden"

```

```yaml
- banner:
  - link "contact@enoca.com":
    - /url: mailto:contact@enoca.com
  - link "+90 850 221 73 54":
    - /url: tel:+90 850 221 73 54
  - link "PRIVACY":
    - /url: /en/gizlilik
  - link "TERMS OF USE":
    - /url: /en/kullanim-kosullari
  - link "LinkedIn":
    - /url: https://linkedin.com/company/enoca
    - img
  - link "Twitter":
    - /url: https://twitter.com/enoca_
    - img
  - navigation:
    - link "enoca ™":
      - /url: /en
      - text: enoca
      - superscript: ™
    - link "SOLUTIONS":
      - /url: /en/cozumler
    - link "CONSULTING":
      - /url: /en/danismanlik
    - link "PROJECTS":
      - /url: /en/projeler
    - link "TECHNOLOGY":
      - /url: /en/teknoloji
    - link "NEWS":
      - /url: /en/haberler
    - link "CORPORATE":
      - /url: /en/kurumsal
    - link "CONTACT":
      - /url: /en/iletisim
    - link "Admin":
      - /url: /en/admin
    - button "ENGLISH"
    - button "Karanlık Mod"
    - button "Arama ⌘K"
- main:
  - text: ENOCA™ TECHNOLOGY
  - heading "WE DO SAP CX HYBRIS" [level=1]:
    - text: WE DO SAP CX HYBRIS
    - img
  - paragraph: Experienced In SAP CX Hybris Delivery
  - button "SAP CX Hybris B2C E-Commerce":
    - link "SAP CX Hybris B2C E-Commerce":
      - /url: /en/cozumler/hybris-cozumleri/hybris-b2c-ticaret
  - button "SAP CX Hybris B2B E-Commerce":
    - link "SAP CX Hybris B2B E-Commerce":
      - /url: /en/cozumler/hybris-cozumleri/hybris-b2b-ticaret
  - text: "01"
  - heading "Global Standard Quality" [level=3]
  - paragraph: We apply international software development standards and best practices at every stage of your project.
  - text: "02"
  - heading "Scalable Architecture" [level=3]
  - paragraph: We design systems that can grow with you as your business grows, working seamlessly under high traffic and load.
  - text: "03"
  - heading "Agile Development" [level=3]
  - paragraph: We offer a transparent, fast process that instantly responds to feedback with Scrum and Kanban methodologies.
  - text: "04"
  - heading "24/7 Uninterrupted Support" [level=3]
  - paragraph: We stand by you even after project delivery. We instantly intervene against possible problems and ensure your systems stay up.
  - text: 0 +
  - paragraph: Years of Experience
  - text: 0 +
  - paragraph: Successful Projects
  - text: 0 +
  - paragraph: Expert Team
  - text: 0 +
  - paragraph: Business Partners
  - heading "OUR STRONG REFERENCES" [level=3]
  - text: Adese AGT Avansas Carrefour EAE Ebebek G2M Gratis Hasçelik İpragaz İGA Koton LC Waikiki Nitori Penti Teknosa Turkcell Türk Telekom
  - heading "Our Services & Solutions" [level=2]
  - paragraph: The following structure is fed in real time from our NestJS backend service.
  - text: ↗
  - heading "SAP CX Hybris" [level=3]
  - link "> SAP CX Hybris B2C E-Commerce":
    - /url: /en/cozumler/hybris-cozumleri/hybris-b2c-ticaret
  - link "> SAP CX Hybris B2B E-Commerce":
    - /url: /en/cozumler/hybris-cozumleri/hybris-b2b-ticaret
  - text: ↗
  - heading "SAP Solutions" [level=3]
  - link "> SAP Mobility":
    - /url: /en/cozumler/sap-cozumleri/sap-mobility
  - link "> SAP HANA":
    - /url: /en/cozumler/sap-cozumleri/sap-hana
  - text: ↗
  - heading "System Monitoring" [level=3]
  - link "> vFabric Hyperic":
    - /url: /en/cozumler/sistem-izleme-cozumleri/vfabric-hyperic
  - link "> Nagios":
    - /url: /en/cozumler/sistem-izleme-cozumleri/nagios
  - text: ↗
  - heading "elpriöo" [level=3]
  - link "> New Link":
    - /url: /en
  - link "> New Link":
    - /url: /en
  - heading "Projenizi Şekillendirin" [level=2]
  - paragraph: İhtiyaçlarınıza en uygun teknoloji yığınını ve çözüm mimarisini interaktif aracımızla saniyeler içinde oluşturun.
  - heading "Proje Konfigüratörü" [level=2]
  - heading "İhtiyaçlarınızı Belirleyin" [level=3]
  - paragraph: Şirket büyüklüğünüz nedir?
  - button "Girişim / KOBİ 1-50 Çalışan":
    - heading "Girişim / KOBİ" [level=4]
    - paragraph: 1-50 Çalışan
  - button "Orta Ölçekli 51-500 Çalışan":
    - heading "Orta Ölçekli" [level=4]
    - paragraph: 51-500 Çalışan
  - button "Enterprise 500+ Çalışan":
    - heading "Enterprise" [level=4]
    - paragraph: 500+ Çalışan
  - button "Global / Çok Uluslu Birden fazla ülkede operasyon":
    - heading "Global / Çok Uluslu" [level=4]
    - paragraph: Birden fazla ülkede operasyon
  - heading "SAP CX Hybris ROI Analizi" [level=2]
  - paragraph: Mevcut altyapı maliyetlerinizi ve büyüme hedeflerinizi girerek SAP Commerce Cloud dönüşümünün size 5 yılda ne kadar tasarruf sağlayacağını anında öğrenin.
  - heading "Enterprise ROI / TCO Hesaplayıcı" [level=2]
  - paragraph: SAP Commerce Cloud (Hybris) Dönüşüm Getirisi
  - text: Aylık Mevcut Altyapı Maliyeti ($)
  - spinbutton: "100000"
  - text: Yıllık Büyüme Beklentisi (%)
  - slider: "15"
  - text: "%15"
  - button "Detaylı ROI Raporu Oluştur"
  - heading "Contact Us" [level=2]
  - paragraph: Fill in the form to get consulting services for your projects or to learn more about our solutions.
  - text: Full Name *
  - textbox "Your Full Name"
  - text: Email *
  - textbox "Your email address"
  - text: Comment or Message *
  - textbox "Your message..."
  - button "Send"
- contentinfo:
  - heading "SOLUTIONS" [level=4]:
    - link "SOLUTIONS":
      - /url: /en/cozumler
  - link "SAP CX HYBRIS SOLUTIONS":
    - /url: /en/cozumler/hybris-cozumleri
  - link "SAP CX Hybris B2C E-Ticaret":
    - /url: /en/cozumler/hybris-cozumleri/hybris-b2c-ticaret
  - link "SAP CX Hybris B2B E-Ticaret":
    - /url: /en/cozumler/hybris-cozumleri/hybris-b2b-ticaret
  - link "SAP CX Hybris Mobil E-Ticaret":
    - /url: /en/cozumler/hybris-cozumleri/hybris-mobil-ticaret
  - link "SAP CX Hybris MDM":
    - /url: /en/cozumler/hybris-cozumleri/hybris-mdm
  - link "SAP SOLUTIONS":
    - /url: /en/cozumler/sap-cozumleri
  - link "SAP Mobility":
    - /url: /en/cozumler/sap-cozumleri/sap-mobility
  - link "SAP HANA":
    - /url: /en/cozumler/sap-cozumleri/sap-hana
  - link "SAP Uygulama Yönetimi":
    - /url: /en/cozumler/sap-cozumleri/sap-uygulama-yonetimi
  - link "SAP Bulut":
    - /url: /en/cozumler/sap-cozumleri/sap-bulut
  - link "SYSTEM MONITORING SOLUTIONS":
    - /url: /en/cozumler/sistem-izleme-cozumleri
  - link "vFabric Hyperic":
    - /url: /en/cozumler/sistem-izleme-cozumleri/vfabric-hyperic
  - link "Nagios":
    - /url: /en/cozumler/sistem-izleme-cozumleri/nagios
  - heading "CONSULTING" [level=4]:
    - link "CONSULTING":
      - /url: /en/danismanlik
  - link "SAP CX HYBRIS CONSULTING":
    - /url: /en/danismanlik/hybris-danismanligi
  - link "SAP TECHNICAL CONSULTING":
    - /url: /en/danismanlik/sap-teknik-danismanlik
  - link "SAP FUNCTIONAL CONSULTING":
    - /url: /en/danismanlik/sap-fonksiyonel-danismanlik
  - link "DEVELOPMENT CONSULTING":
    - /url: /en/danismanlik/gelistirme-danismanligi
  - link "QUALITY MANAGEMENT":
    - /url: /en/danismanlik/kalite-yonetimi
  - link "OUTSOURCING SERVICES":
    - /url: /en/danismanlik/diskaynak-hizmetleri
  - heading "PROJECTS" [level=4]:
    - link "PROJECTS":
      - /url: /en/projeler
  - link "METHODOLOGY":
    - /url: /en/projeler/metodoloji
  - link "REFERENCES":
    - /url: /en/projeler/referanslar
  - heading "TECHNOLOGY" [level=4]:
    - link "TECHNOLOGY":
      - /url: /en/teknoloji
  - link "ARCHITECTURE":
    - /url: /en/teknoloji/mimari
  - link "Modularity":
    - /url: /en/teknoloji/mimari/modulerlik
  - link "Design Based":
    - /url: /en/teknoloji/mimari/tasarim-tabanli
  - link "INNOVATION":
    - /url: /en/teknoloji/inovasyon
  - link "RESEARCH & DEVELOPMENT":
    - /url: /en/teknoloji/arastirma-gelistirme
  - link "Modeling and Simulation":
    - /url: /en/teknoloji/arastirma-gelistirme/modelleme-ve-simulasyon
  - heading "NEWS" [level=4]:
    - link "NEWS":
      - /url: /en/haberler
  - link "LATEST NEWS FROM ENOCA™":
    - /url: /en/haberler/enocadan-son-haberler
  - heading "CORPORATE" [level=4]:
    - link "CORPORATE":
      - /url: /en/kurumsal
  - link "ABOUT US":
    - /url: /en/kurumsal/hakkimizda
  - link "CAREER":
    - /url: /en/kariyer
  - link "LEGAL INFORMATION":
    - /url: /en/kurumsal/yasal-bilgiler
  - link "INFORMATION SECURITY POLICY":
    - /url: /en/bilgi-guvenligi-politikasi
  - link "PERSONAL DATA PROTECTION AND PROCESSING POLICY":
    - /url: /en/kisisel-verilerin-korunmasi-ve-islenmesi-politikasi
  - link "CONTACT":
    - /url: /en/iletisim
  - link "LinkedIn":
    - /url: https://linkedin.com/company/enoca
    - img
  - link "Twitter":
    - /url: https://twitter.com/enoca_
    - img
  - link "PRIVACY":
    - /url: /en/gizlilik
  - link "TERMS OF USE":
    - /url: /en/kullanim-kosullari
  - heading "E-Bülten Kayıt" [level=4]
  - paragraph: Sektörel gelişmelerden haberdar olmak için e-bültenimize kayıt olun.
  - textbox "E-posta adresiniz"
  - button "Kayıt Ol"
  - text: enoca
  - superscript: ™
  - text: © 2013 - 2025 enoca™
- heading "Gizlilik ve Çerez Politikası" [level=3]
- paragraph: Sitemizde size en iyi deneyimi sunabilmek, site trafiğini analiz etmek ve içerikleri kişiselleştirmek için çerezler kullanıyoruz. Tüm çerezleri kabul edebilir veya "Ayarlar" butonuna tıklayarak tercihlerinizi yönetebilirsiniz.
- button "Ayarlar"
- button "Tümünü Kabul Et"
- button
- alert
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Language and Translation E2E Tests', () => {
  4  | 
  5  |   test('should display Turkish as default and switch to English correctly', async ({ page }) => {
  6  |     // 1. Ana sayfaya Türkçe olarak git
  7  |     await page.goto('/tr');
  8  | 
  9  |     // 2. URL'de /tr olduğunu doğrula.
  10 |     await expect(page).toHaveURL(/.*\/tr.*/);
  11 | 
  12 |     // 3. Türkçe bir başlık bekle
  13 |     await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });
  14 | 
  15 |     // 4. Doğrudan İngilizce sayfaya geç
  16 |     await page.goto('/en');
  17 | 
  18 |     // 5. URL'in /en olduğunu onayla
  19 |     await expect(page).toHaveURL(/.*\/en.*/);
  20 | 
  21 |     // 6. İngilizce metinlerin geldiğini kontrol et
> 22 |     await expect(page.locator('text=SAP Solutions').first()).toBeVisible();
     |                                                              ^ Error: expect(locator).toBeVisible() failed
  23 |     await expect(page.locator('text=System Monitoring').first()).toBeVisible();
  24 |   });
  25 | 
  26 | });
  27 | 
```