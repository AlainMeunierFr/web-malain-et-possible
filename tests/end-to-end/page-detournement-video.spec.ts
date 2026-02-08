import { test, expect } from '@playwright/test';

test.describe('Navigation depuis /detournement-video', () => {
  test('vers /portfolio-detournements (Voir le portfolio)', async ({ page }) => {
    await page.goto('/detournement-video');
    await page.getByTestId('e2eid-c35').click();
    await expect(page).toHaveURL(new RegExp('\\/portfolio-detournements(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/detournement-video(?:\\?.*)?$'));
  });

  test('vers /plan-du-site (Plan du site)', async ({ page }) => {
    await page.goto('/detournement-video');
    await page.getByTestId('e2eid-b51').click();
    await expect(page).toHaveURL(new RegExp('\\/plan-du-site(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/detournement-video(?:\\?.*)?$'));
  });

  test('vers / (Logo)', async ({ page }) => {
    await page.goto('/detournement-video');
    await page.getByTestId('e2eid-h1').click();
    await expect(page).toHaveURL(new RegExp('\\/(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/detournement-video(?:\\?.*)?$'));
  });

});
