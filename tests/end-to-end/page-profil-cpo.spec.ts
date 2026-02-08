import { test, expect } from '@playwright/test';

test.describe('Navigation depuis /profil/cpo', () => {
  test('vers /profil/cto (En savoir plus...)', async ({ page }) => {
    await page.goto('/profil/cpo');
    await page.getByTestId('e2eid-c24').click();
    await expect(page).toHaveURL(new RegExp('\\/profil\\/cto(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/profil\\/cpo(?:\\?.*)?$'));
  });

  test('vers /profil/coo (En savoir plus...)', async ({ page }) => {
    await page.goto('/profil/cpo');
    await page.getByTestId('e2eid-c25').click();
    await expect(page).toHaveURL(new RegExp('\\/profil\\/coo(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/profil\\/cpo(?:\\?.*)?$'));
  });

  test('vers /detournement-video (En savoir plus...)', async ({ page }) => {
    await page.goto('/profil/cpo');
    await page.getByTestId('e2eid-c26').click();
    await expect(page).toHaveURL(new RegExp('\\/detournement-video(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/profil\\/cpo(?:\\?.*)?$'));
  });

  test('vers /plan-du-site (Plan du site)', async ({ page }) => {
    await page.goto('/profil/cpo');
    await page.getByTestId('e2eid-b51').click();
    await expect(page).toHaveURL(new RegExp('\\/plan-du-site(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/profil\\/cpo(?:\\?.*)?$'));
  });

  test('vers / (Logo)', async ({ page }) => {
    await page.goto('/profil/cpo');
    await page.getByTestId('e2eid-h1').click();
    await expect(page).toHaveURL(new RegExp('\\/(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/profil\\/cpo(?:\\?.*)?$'));
  });

});
