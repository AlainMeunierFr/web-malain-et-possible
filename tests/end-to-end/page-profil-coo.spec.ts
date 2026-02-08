import { test, expect } from '@playwright/test';

test.describe('Navigation depuis /profil/coo', () => {
  test('vers /detournement-video (En savoir plus...)', async ({ page }) => {
    await page.goto('/profil/coo');
    await page.getByTestId('e2eid-c28').click();
    await expect(page).toHaveURL(new RegExp('\\/detournement-video(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/profil\\/coo(?:\\?.*)?$'));
  });

  test('vers /plan-du-site (Plan du site)', async ({ page }) => {
    await page.goto('/profil/coo');
    await page.getByTestId('e2eid-b51').click();
    await expect(page).toHaveURL(new RegExp('\\/plan-du-site(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/profil\\/coo(?:\\?.*)?$'));
  });

  test('vers / (Logo)', async ({ page }) => {
    await page.goto('/profil/coo');
    await page.getByTestId('e2eid-h1').click();
    await expect(page).toHaveURL(new RegExp('\\/(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/profil\\/coo(?:\\?.*)?$'));
  });

});
