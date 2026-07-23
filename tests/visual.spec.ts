import { test, expect } from '@playwright/test';

/**
 * Visual regression test suite.
 *
 * Routes are verified against the Astro production preview build
 * (started automatically by playwright.config.ts webServer).
 *
 * To add more routes, discover valid slugs from src/content/pages/
 * and append them to the routes array below.
 */
const routes = [
  { name: 'home', path: '/' },
  { name: 'contact', path: '/contacto' },
  // TODO: add hub/spoke route slugs discovered from src/content/pages/
];

for (const { name, path } of routes) {
  test(`visual snapshot: ${name} [${path}]`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true });
  });
}
