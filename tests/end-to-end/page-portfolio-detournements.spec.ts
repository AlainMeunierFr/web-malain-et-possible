import { test, expect } from '@playwright/test';

test.describe('Navigation depuis /portfolio-detournements', () => {
  test('vers /plan-du-site (Plan du site)', async ({ page }) => {
    await page.goto('/portfolio-detournements');
    await page.getByTestId('e2eid-b51').click();
    await expect(page).toHaveURL(new RegExp('\\/plan-du-site(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/portfolio-detournements(?:\\?.*)?$'));
  });

  test('vers / (Logo)', async ({ page }) => {
    await page.goto('/portfolio-detournements');
    await page.getByTestId('e2eid-h1').click();
    await expect(page).toHaveURL(new RegExp('\\/(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/portfolio-detournements(?:\\?.*)?$'));
  });

});
