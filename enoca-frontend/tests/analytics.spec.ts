import { test, expect } from '@playwright/test';

test.describe('SEO and Analytics integration', () => {
  test('should have Google Analytics script in the DOM', async ({ page }) => {
    await page.goto('http://localhost:3001');
    const gaScript = page.locator('script[src*="googletagmanager.com/gtag/js"]');
    await expect(gaScript).toBeAttached();
  });

  test('should have semantic HTML tags', async ({ page }) => {
    await page.goto('http://localhost:3001');
    const nav = page.locator('nav');
    await expect(nav.first()).toBeAttached();
    // Further tests for article and section can be added here
  });
});
