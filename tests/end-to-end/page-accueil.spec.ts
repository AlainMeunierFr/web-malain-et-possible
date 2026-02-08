import { test, expect } from '@playwright/test';

test.describe('Navigation depuis /', () => {
  test('vers /mes-profils (Télécharger mon CV)', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('e2eid-l1').click();
    await expect(page).toHaveURL(new RegExp('\\/mes-profils(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/?(?:\\?.*)?$'));
  });

  test('vers /plan-du-site (Plan du site)', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('e2eid-b51').click();
    await expect(page).toHaveURL(new RegExp('\\/plan-du-site(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/?(?:\\?.*)?$'));
  });

  test('vers /faisons-connaissance (Discutons)', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('e2eid-a10').click();
    await expect(page).toHaveURL(new RegExp('\\/faisons-connaissance(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/?(?:\\?.*)?$'));
  });

});
