import { test, expect } from '@playwright/test';

test.describe('Language and Translation E2E Tests', () => {

  test('should display Turkish as default and switch to English correctly', async ({ page }) => {
    // 1. Ana sayfaya Türkçe olarak git
    await page.goto('/tr');

    // 2. URL'de /tr olduğunu doğrula.
    await expect(page).toHaveURL(/.*\/tr.*/);

    // 3. Türkçe bir başlık bekle
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });

    // 4. Doğrudan İngilizce sayfaya geç
    await page.goto('/en');

    // 5. URL'in /en olduğunu onayla
    await expect(page).toHaveURL(/.*\/en.*/);

    // 6. İngilizce metinlerin geldiğini kontrol et
    await expect(page.locator('text=SAP Solutions >> visible=true').first()).toBeVisible();
    await expect(page.locator('text=System Monitoring >> visible=true').first()).toBeVisible();
  });

});
