import { test, expect } from '@playwright/test';

test.describe('Navigation and Core Pages E2E Tests', () => {

  test('should navigate to Contact page and display the form', async ({ page }) => {
    await page.goto('/');
    
    // Header'da İletişim / Contact butonunu bulup tıklayalım
    // Butonun ismi dilden bağımsız olarak bir şekilde yakalanmalı, 
    // biz en güvenli yol olan URL'e doğrudan gitmeyi de test edebiliriz
    await page.goto('/tr/iletisim');

    // İletişim başlığının göründüğünü kontrol et
    await expect(page.locator('h1')).toBeVisible();

    // Form elementlerinin ekranda olduğunu kontrol et (Name, Email vs)
    await expect(page.locator('input[type="text"]').first()).toBeVisible();
    await expect(page.locator('input[type="email"]').first()).toBeVisible();
    await expect(page.locator('button[type="submit"]').first()).toBeVisible();
  });

  test('should verify the Admin panel login page renders correctly', async ({ page }) => {
    // Admin sayfasına git
    await page.goto('/admin/login');

    // Admin panelinin başlığı yerine form alanlarını doğrula
    await expect(page.locator('input[type="password"]')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

});
