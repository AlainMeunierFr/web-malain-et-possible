import { test, expect } from '@playwright/test';

test.describe('Navigation depuis /mes-profils', () => {
  test('vers /profil/cpo (En savoir plus…)', async ({ page }) => {
    await page.goto('/mes-profils');
    await page.getByTestId('e2eid-p9').click();
    await expect(page).toHaveURL(new RegExp('\\/profil\\/cpo(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/mes-profils(?:\\?.*)?$'));
  });

  test('vers /profil/coo (En savoir plus…)', async ({ page }) => {
    await page.goto('/mes-profils');
    await page.getByTestId('e2eid-p10').click();
    await expect(page).toHaveURL(new RegExp('\\/profil\\/coo(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/mes-profils(?:\\?.*)?$'));
  });

  test('vers /profil/agile (En savoir plus…)', async ({ page }) => {
    await page.goto('/mes-profils');
    await page.getByTestId('e2eid-p11').click();
    await expect(page).toHaveURL(new RegExp('\\/profil\\/agile(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/mes-profils(?:\\?.*)?$'));
  });

  test('vers /profil/cto (En savoir plus…)', async ({ page }) => {
    await page.goto('/mes-profils');
    await page.getByTestId('e2eid-p12').click();
    await expect(page).toHaveURL(new RegExp('\\/profil\\/cto(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/mes-profils(?:\\?.*)?$'));
  });

  test('vers /plan-du-site (Plan du site)', async ({ page }) => {
    await page.goto('/mes-profils');
    await page.getByTestId('e2eid-b51').click();
    await expect(page).toHaveURL(new RegExp('\\/plan-du-site(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/mes-profils(?:\\?.*)?$'));
  });

  test('vers / (Logo)', async ({ page }) => {
    await page.goto('/mes-profils');
    await page.getByTestId('e2eid-h1').click();
    await expect(page).toHaveURL(new RegExp('\\/(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/mes-profils(?:\\?.*)?$'));
  });

});
