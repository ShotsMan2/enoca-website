# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> Navigation and Core Pages E2E Tests >> should navigate to Contact page and display the form
- Location: tests\e2e\navigation.spec.ts:5:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "http://localhost:3001/tr/iletisim", waiting until "load"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - link "contact@enoca.com" [ref=e8]:
            - /url: mailto:contact@enoca.com
            - img [ref=e9]
            - text: contact@enoca.com
          - link "+90 850 221 73 54" [ref=e12]:
            - /url: tel:+90 850 221 73 54
            - img [ref=e13]
            - text: +90 850 221 73 54
        - generic [ref=e15]:
          - link "GİZLİLİK" [ref=e16]:
            - /url: /tr/gizlilik
          - link "KULLANIM KOŞULLARI" [ref=e17]:
            - /url: /tr/kullanim-kosullari
          - generic [ref=e18]:
            - link "LinkedIn" [ref=e19]:
              - /url: https://linkedin.com/company/enoca
              - img [ref=e20]
            - link "Twitter" [ref=e24]:
              - /url: https://twitter.com/enoca_
              - img [ref=e25]
      - navigation [ref=e27]:
        - generic [ref=e29]:
          - link "enoca ™" [ref=e31]:
            - /url: /tr
            - generic [ref=e32]:
              - text: enoca
              - superscript [ref=e34]: ™
          - generic [ref=e35]:
            - link "ÇÖZÜMLER" [ref=e37]:
              - /url: /tr/cozumler
              - text: ÇÖZÜMLER
              - img [ref=e38]
            - link "DANIŞMANLIK" [ref=e41]:
              - /url: /tr/danismanlik
              - text: DANIŞMANLIK
              - img [ref=e42]
            - link "PROJELER" [ref=e45]:
              - /url: /tr/projeler
              - text: PROJELER
              - img [ref=e46]
            - link "TEKNOLOJİ" [ref=e49]:
              - /url: /tr/teknoloji
              - text: TEKNOLOJİ
              - img [ref=e50]
            - link "HABERLER" [ref=e53]:
              - /url: /tr/haberler
              - text: HABERLER
              - img [ref=e54]
            - link "KURUMSAL" [ref=e57]:
              - /url: /tr/kurumsal
              - text: KURUMSAL
              - img [ref=e58]
            - link "İLETİŞİM" [ref=e61]:
              - /url: /tr/iletisim
            - link "Yönetici" [ref=e63]:
              - /url: /tr/admin
            - generic [ref=e64]:
              - button "TÜRKÇE" [ref=e65]:
                - img [ref=e66]
                - text: TÜRKÇE
                - img [ref=e70]
              - button "Karanlık Mod" [ref=e72]:
                - img [ref=e73]
              - button "Arama ⌘K" [ref=e76]:
                - img [ref=e77]
                - generic [ref=e80]: Arama
                - generic [ref=e81]: ⌘K
    - main [ref=e82]:
      - generic [ref=e83]:
        - generic [ref=e86]:
          - heading "İletişime Geçin" [level=1] [ref=e87]
          - paragraph [ref=e88]: Projeleriniz, danışmanlık talepleriniz veya sorularınız için bizimle iletişime geçebilirsiniz. Size yardımcı olmaktan memnuniyet duyarız.
        - generic [ref=e89]:
          - generic [ref=e90]:
            - generic [ref=e91]:
              - generic [ref=e92]:
                - heading "İletişim Bilgileri" [level=2] [ref=e93]
                - generic [ref=e94]:
                  - generic [ref=e95]:
                    - img [ref=e97]
                    - generic [ref=e100]:
                      - paragraph [ref=e101]: E-Posta
                      - link "contact@enoca.com" [ref=e102]:
                        - /url: mailto:contact@enoca.com
                  - generic [ref=e103]:
                    - img [ref=e105]
                    - generic [ref=e107]:
                      - paragraph [ref=e108]: Telefon
                      - link "+90 850 221 73 54" [ref=e109]:
                        - /url: tel:+90 850 221 73 54
                  - generic [ref=e110]:
                    - img [ref=e112]
                    - generic [ref=e115]:
                      - paragraph [ref=e116]: Genel Merkez
                      - paragraph [ref=e117]: Bilişim Vadisi, Teknoloji Geliştirme Bölgesi, Kocaeli, Türkiye
              - generic [ref=e118]:
                - heading "Sosyal Medya" [level=3] [ref=e119]
                - generic [ref=e120]:
                  - link [ref=e121]:
                    - /url: https://linkedin.com/company/enoca
                    - img [ref=e122]
                  - link [ref=e124]:
                    - /url: https://twitter.com/enoca_
                    - img [ref=e125]
            - generic [ref=e128]:
              - generic [ref=e129]:
                - generic [ref=e130]:
                  - text: Ad Soyad *
                  - textbox "Adınız Soyadınız" [ref=e131]
                - generic [ref=e132]:
                  - text: Email *
                  - textbox "Mail adresiniz" [ref=e133]
              - generic [ref=e134]:
                - text: Yorum veya Mesaj *
                - textbox "Mesajınız..." [ref=e135]
              - button "Gönder" [ref=e137]
          - iframe [ref=e139]:
            
    - contentinfo [ref=e140]:
      - generic [ref=e141]:
        - generic [ref=e142]:
          - generic [ref=e143]:
            - heading "ÇÖZÜMLER" [level=4] [ref=e144]:
              - link "ÇÖZÜMLER" [ref=e145]:
                - /url: /tr/cozumler
            - generic [ref=e146]:
              - generic [ref=e147]:
                - link "SAP CX HYBRİS ÇÖZÜMLERİ" [ref=e148]:
                  - /url: /tr/cozumler/hybris-cozumleri
                - generic [ref=e149]:
                  - link "SAP CX Hybris B2C E-Ticaret" [ref=e150]:
                    - /url: /tr/cozumler/hybris-cozumleri/hybris-b2c-ticaret
                  - link "SAP CX Hybris B2B E-Ticaret" [ref=e151]:
                    - /url: /tr/cozumler/hybris-cozumleri/hybris-b2b-ticaret
                  - link "SAP CX Hybris Mobil E-Ticaret" [ref=e152]:
                    - /url: /tr/cozumler/hybris-cozumleri/hybris-mobil-ticaret
                  - link "SAP CX Hybris MDM" [ref=e153]:
                    - /url: /tr/cozumler/hybris-cozumleri/hybris-mdm
              - generic [ref=e154]:
                - link "SAP ÇÖZÜMLERİ" [ref=e155]:
                  - /url: /tr/cozumler/sap-cozumleri
                - generic [ref=e156]:
                  - link "SAP Mobility" [ref=e157]:
                    - /url: /tr/cozumler/sap-cozumleri/sap-mobility
                  - link "SAP HANA" [ref=e158]:
                    - /url: /tr/cozumler/sap-cozumleri/sap-hana
                  - link "SAP Uygulama Yönetimi" [ref=e159]:
                    - /url: /tr/cozumler/sap-cozumleri/sap-uygulama-yonetimi
                  - link "SAP Bulut" [ref=e160]:
                    - /url: /tr/cozumler/sap-cozumleri/sap-bulut
              - generic [ref=e161]:
                - link "SİSTEM İZLEME ÇÖZÜMLERİ" [ref=e162]:
                  - /url: /tr/cozumler/sistem-izleme-cozumleri
                - generic [ref=e163]:
                  - link "vFabric Hyperic" [ref=e164]:
                    - /url: /tr/cozumler/sistem-izleme-cozumleri/vfabric-hyperic
                  - link "Nagios" [ref=e165]:
                    - /url: /tr/cozumler/sistem-izleme-cozumleri/nagios
          - generic [ref=e166]:
            - heading "DANIŞMANLIK" [level=4] [ref=e167]:
              - link "DANIŞMANLIK" [ref=e168]:
                - /url: /tr/danismanlik
            - generic [ref=e169]:
              - link "SAP CX HYBRIS DANIŞMANLIĞI" [ref=e170]:
                - /url: /tr/danismanlik/hybris-danismanligi
              - link "SAP TEKNİK DANIŞMANLIĞI" [ref=e171]:
                - /url: /tr/danismanlik/sap-teknik-danismanlik
              - link "SAP FONKSİYONEL DANIŞMANLIĞI" [ref=e172]:
                - /url: /tr/danismanlik/sap-fonksiyonel-danismanlik
              - link "GELİŞTİRME DANIŞMANLIĞI" [ref=e173]:
                - /url: /tr/danismanlik/gelistirme-danismanligi
              - link "KALİTE YÖNETİMİ" [ref=e174]:
                - /url: /tr/danismanlik/kalite-yonetimi
              - link "DIŞ KAYNAK HİZMETLERİ" [ref=e175]:
                - /url: /tr/danismanlik/diskaynak-hizmetleri
          - generic [ref=e176]:
            - heading "PROJELER" [level=4] [ref=e177]:
              - link "PROJELER" [ref=e178]:
                - /url: /tr/projeler
            - generic [ref=e179]:
              - link "METODOLOJİ" [ref=e180]:
                - /url: /tr/projeler/metodoloji
              - link "REFERANSLAR" [ref=e181]:
                - /url: /tr/projeler/referanslar
          - generic [ref=e182]:
            - heading "TEKNOLOJİ" [level=4] [ref=e183]:
              - link "TEKNOLOJİ" [ref=e184]:
                - /url: /tr/teknoloji
            - generic [ref=e185]:
              - generic [ref=e186]:
                - link "MİMARİ" [ref=e187]:
                  - /url: /tr/teknoloji/mimari
                - generic [ref=e188]:
                  - link "Modülerlik" [ref=e189]:
                    - /url: /tr/teknoloji/mimari/modulerlik
                  - link "Tasarım Tabanlı" [ref=e190]:
                    - /url: /tr/teknoloji/mimari/tasarim-tabanli
              - link "İNOVASYON" [ref=e192]:
                - /url: /tr/teknoloji/inovasyon
              - generic [ref=e193]:
                - link "ARAŞTIRMA-GELİŞTİRME" [ref=e194]:
                  - /url: /tr/teknoloji/arastirma-gelistirme
                - link "Modelleme ve Simulasyon" [ref=e196]:
                  - /url: /tr/teknoloji/arastirma-gelistirme/modelleme-ve-simulasyon
          - generic [ref=e197]:
            - heading "HABERLER" [level=4] [ref=e198]:
              - link "HABERLER" [ref=e199]:
                - /url: /tr/haberler
            - link "ENOCA™'DAN SON HABERLER" [ref=e201]:
              - /url: /tr/haberler/enocadan-son-haberler
          - generic [ref=e202]:
            - heading "KURUMSAL" [level=4] [ref=e203]:
              - link "KURUMSAL" [ref=e204]:
                - /url: /tr/kurumsal
            - generic [ref=e205]:
              - link "HAKKIMIZDA" [ref=e206]:
                - /url: /tr/kurumsal/hakkimizda
              - link "KARİYER" [ref=e207]:
                - /url: /tr/kariyer
              - link "YASAL BİLGİLER" [ref=e208]:
                - /url: /tr/kurumsal/yasal-bilgiler
              - link "BİLGİ GÜVENLİĞİ POLİTİKASI" [ref=e209]:
                - /url: /tr/bilgi-guvenligi-politikasi
              - link "KİŞİSEL VERİLERİN KORUNMASI VE İŞLENMESİ POLİTİKASI" [ref=e210]:
                - /url: /tr/kisisel-verilerin-korunmasi-ve-islenmesi-politikasi
              - link "İLETİŞİM" [ref=e211]:
                - /url: /tr/iletisim
        - generic [ref=e212]:
          - generic [ref=e213]:
            - link "LinkedIn" [ref=e214]:
              - /url: https://linkedin.com/company/enoca
              - img [ref=e215]
            - link "Twitter" [ref=e217]:
              - /url: https://twitter.com/enoca_
              - img [ref=e218]
            - link "GİZLİLİK" [ref=e220]:
              - /url: /tr/gizlilik
            - link "KULLANIM KOŞULLARI" [ref=e221]:
              - /url: /tr/kullanim-kosullari
          - generic [ref=e222]:
            - generic [ref=e223]:
              - heading "E-Bülten Kayıt" [level=4] [ref=e225]
              - paragraph [ref=e226]: Sektörel gelişmelerden haberdar olmak için e-bültenimize kayıt olun.
              - generic [ref=e227]:
                - textbox "E-posta adresiniz" [ref=e228]
                - button "Kayıt Ol" [ref=e229]
            - generic [ref=e230]:
              - generic [ref=e231]:
                - text: enoca
                - superscript [ref=e232]: ™
              - generic [ref=e233]: © 2013 - 2025 enoca™
  - generic [ref=e235]:
    - generic [ref=e236]:
      - heading "Gizlilik ve Çerez Politikası" [level=3] [ref=e237]
      - paragraph [ref=e238]: Sitemizde size en iyi deneyimi sunabilmek, site trafiğini analiz etmek ve içerikleri kişiselleştirmek için çerezler kullanıyoruz. Tüm çerezleri kabul edebilir veya "Ayarlar" butonuna tıklayarak tercihlerinizi yönetebilirsiniz.
    - generic [ref=e239]:
      - button "Ayarlar" [ref=e240]:
        - img [ref=e241]
        - text: Ayarlar
      - button "Tümünü Kabul Et" [ref=e244]
  - button [ref=e246]:
    - img [ref=e247]
  - button "Open Next.js Dev Tools" [ref=e254] [cursor=pointer]:
    - img [ref=e255]
  - alert [ref=e259]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Navigation and Core Pages E2E Tests', () => {
  4  | 
  5  |   test('should navigate to Contact page and display the form', async ({ page }) => {
  6  |     await page.goto('/');
  7  |     
  8  |     // Header'da İletişim / Contact butonunu bulup tıklayalım
  9  |     // Butonun ismi dilden bağımsız olarak bir şekilde yakalanmalı, 
  10 |     // biz en güvenli yol olan URL'e doğrudan gitmeyi de test edebiliriz
> 11 |     await page.goto('/tr/iletisim');
     |                ^ Error: page.goto: Test timeout of 30000ms exceeded.
  12 | 
  13 |     // İletişim başlığının göründüğünü kontrol et
  14 |     await expect(page.locator('h1')).toBeVisible();
  15 | 
  16 |     // Form elementlerinin ekranda olduğunu kontrol et (Name, Email vs)
  17 |     await expect(page.locator('input[type="text"]').first()).toBeVisible();
  18 |     await expect(page.locator('input[type="email"]').first()).toBeVisible();
  19 |     await expect(page.locator('button[type="submit"]').first()).toBeVisible();
  20 |   });
  21 | 
  22 |   test('should verify the Admin panel login page renders correctly', async ({ page }) => {
  23 |     // Admin sayfasına git
  24 |     await page.goto('/admin/login');
  25 | 
  26 |     // Admin panelinin başlığı yerine form alanlarını doğrula
  27 |     await expect(page.locator('input[type="password"]')).toBeVisible({ timeout: 10000 });
  28 |     await expect(page.locator('button[type="submit"]')).toBeVisible();
  29 |   });
  30 | 
  31 | });
  32 | 
```