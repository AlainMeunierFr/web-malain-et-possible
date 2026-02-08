import { test, expect } from '@playwright/test';

test.describe('Navigation depuis /profil/cto', () => {
  test('vers /profil/cpo (En savoir plus...)', async ({ page }) => {
    await page.goto('/profil/cto');
    await page.getByTestId('e2eid-c31').click();
    await expect(page).toHaveURL(new RegExp('\\/profil\\/cpo(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/profil\\/cto(?:\\?.*)?$'));
  });

  test('vers /a-propos (En savoir plus...)', async ({ page }) => {
    await page.goto('/profil/cto');
    await page.getByTestId('e2eid-c33').click();
    await expect(page).toHaveURL(new RegExp('\\/a-propos(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/profil\\/cto(?:\\?.*)?$'));
  });

  test('vers /profil/coo (En savoir plus...)', async ({ page }) => {
    await page.goto('/profil/cto');
    await page.getByTestId('e2eid-c34').click();
    await expect(page).toHaveURL(new RegExp('\\/profil\\/coo(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/profil\\/cto(?:\\?.*)?$'));
  });

  test('vers /plan-du-site (Plan du site)', async ({ page }) => {
    await page.goto('/profil/cto');
    await page.getByTestId('e2eid-b51').click();
    await expect(page).toHaveURL(new RegExp('\\/plan-du-site(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/profil\\/cto(?:\\?.*)?$'));
  });

  test('vers / (Logo)', async ({ page }) => {
    await page.goto('/profil/cto');
    await page.getByTestId('e2eid-h1').click();
    await expect(page).toHaveURL(new RegExp('\\/(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/profil\\/cto(?:\\?.*)?$'));
  });

});
