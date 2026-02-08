import { test, expect } from '@playwright/test';

test.describe('Navigation depuis /plan-du-site', () => {
  test('vers / (Home)', async ({ page }) => {
    await page.goto('/plan-du-site');
    await page.getByTestId('e2eid-l2').click();
    await expect(page).toHaveURL(new RegExp('\\/(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/plan-du-site(?:\\?.*)?$'));
  });

  test('vers /mes-profils (Mes Profils)', async ({ page }) => {
    await page.goto('/plan-du-site');
    await page.getByTestId('e2eid-l3').click();
    await expect(page).toHaveURL(new RegExp('\\/mes-profils(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/plan-du-site(?:\\?.*)?$'));
  });

  test('vers /profil/cpo (Produit logiciel)', async ({ page }) => {
    await page.goto('/plan-du-site');
    await page.getByTestId('e2eid-l4').click();
    await expect(page).toHaveURL(new RegExp('\\/profil\\/cpo(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/plan-du-site(?:\\?.*)?$'));
  });

  test('vers /profil/coo (Opérations)', async ({ page }) => {
    await page.goto('/plan-du-site');
    await page.getByTestId('e2eid-l5').click();
    await expect(page).toHaveURL(new RegExp('\\/profil\\/coo(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/plan-du-site(?:\\?.*)?$'));
  });

  test('vers /profil/agile (Transformation Agile)', async ({ page }) => {
    await page.goto('/plan-du-site');
    await page.getByTestId('e2eid-l6').click();
    await expect(page).toHaveURL(new RegExp('\\/profil\\/agile(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/plan-du-site(?:\\?.*)?$'));
  });

  test('vers /profil/cto (Technologie)', async ({ page }) => {
    await page.goto('/plan-du-site');
    await page.getByTestId('e2eid-l7').click();
    await expect(page).toHaveURL(new RegExp('\\/profil\\/cto(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/plan-du-site(?:\\?.*)?$'));
  });

  test('vers /detournement-video (Détournement de scènes cultes du cinéma)', async ({ page }) => {
    await page.goto('/plan-du-site');
    await page.getByTestId('e2eid-l8').click();
    await expect(page).toHaveURL(new RegExp('\\/detournement-video(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/plan-du-site(?:\\?.*)?$'));
  });

  test('vers /portfolio-detournements (Portfolio de detournements vidéos)', async ({ page }) => {
    await page.goto('/plan-du-site');
    await page.getByTestId('e2eid-l9').click();
    await expect(page).toHaveURL(new RegExp('\\/portfolio-detournements(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/plan-du-site(?:\\?.*)?$'));
  });

  test('vers /a-propos (a-propos)', async ({ page }) => {
    await page.goto('/plan-du-site');
    await page.getByTestId('e2eid-l11').click();
    await expect(page).toHaveURL(new RegExp('\\/a-propos(?:\\?.*)?$'));
    await page.goBack();
    await expect(page).toHaveURL(new RegExp('\\/plan-du-site(?:\\?.*)?$'));
  });

});
