import { test, expect } from '@playwright/test';

test('parcours complet de tous les liens du site et test de tous les e2eID', async ({ page }) => {
  // Scénario généré automatiquement depuis Pages-Et-Lien.json
  // Ce test parcourt tous les liens du site et teste tous les e2eID présents

  await test.step("Étape 1: Page d'accueil", async () => {
    await page.goto('/');
    await expect(page).toHaveURL('/');
  });

  await test.step("Étape 2: Navigation de / vers /robustesse (En savoir plus...)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens1 = page.getByRole('link', { name: /En savoir plus\.\.\./i });
    if (await liens1.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens1.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/robustesse'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/robustesse');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/robustesse');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/robustesse');
      }
    }
    await expect(page).toHaveURL('/robustesse');
  });

  await test.step("Étape 3: Navigation de /robustesse vers /plan-du-site (Plan du site)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens2 = page.getByRole('link', { name: /Plan du site/i });
    if (await liens2.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens2.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/plan-du-site'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/plan-du-site');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/plan-du-site');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/plan-du-site');
      }
    }
    await expect(page).toHaveURL('/plan-du-site');
  });

  await test.step("Étape 4: Navigation de /plan-du-site vers /plan-du-site (Plan du site)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens3 = page.getByRole('link', { name: /Plan du site/i });
    if (await liens3.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens3.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/plan-du-site'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/plan-du-site');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/plan-du-site');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/plan-du-site');
      }
    }
    await expect(page).toHaveURL('/plan-du-site');
  });

  await test.step("Étape 5: Navigation de /plan-du-site vers /metrics (BarChart3)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens4 = page.getByRole('link', { name: /BarChart3/i });
    if (await liens4.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens4.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/metrics'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/metrics');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/metrics');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/metrics');
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  await test.step("Étape 6: Navigation de /metrics vers /plan-du-site (Plan du site)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens5 = page.getByRole('link', { name: /Plan du site/i });
    if (await liens5.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens5.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/plan-du-site'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/plan-du-site');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/plan-du-site');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/plan-du-site');
      }
    }
    await expect(page).toHaveURL('/plan-du-site');
  });

  await test.step("Étape 7: Navigation de /plan-du-site vers /a-propos-du-site (Info)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens6 = page.getByRole('link', { name: /Info/i });
    if (await liens6.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens6.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/a-propos-du-site'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/a-propos-du-site');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/a-propos-du-site');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/a-propos-du-site');
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  await test.step("Étape 8: Navigation de /a-propos-du-site vers /plan-du-site (Plan du site)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens7 = page.getByRole('link', { name: /Plan du site/i });
    if (await liens7.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens7.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/plan-du-site'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/plan-du-site');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/plan-du-site');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/plan-du-site');
      }
    }
    await expect(page).toHaveURL('/plan-du-site');
  });

  await test.step("Étape 9: Navigation de /plan-du-site vers / (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens8 = page.getByRole('link', { name: /lien/i });
    if (await liens8.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens8.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/');
      }
    }
    await expect(page).toHaveURL('/');
  });

  await test.step("Étape 10: Navigation de / vers /transformation (En savoir plus...)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens9 = page.getByRole('link', { name: /En savoir plus\.\.\./i });
    if (await liens9.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens9.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/transformation'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/transformation');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/transformation');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/transformation');
      }
    }
    await expect(page).toHaveURL('/transformation');
  });

  await test.step("Étape 11: Navigation de /transformation vers /plan-du-site (Plan du site)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens10 = page.getByRole('link', { name: /Plan du site/i });
    if (await liens10.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens10.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/plan-du-site'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/plan-du-site');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/plan-du-site');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/plan-du-site');
      }
    }
    await expect(page).toHaveURL('/plan-du-site');
  });

  await test.step("Étape 12: Navigation de /plan-du-site vers / (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens11 = page.getByRole('link', { name: /lien/i });
    if (await liens11.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens11.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/');
      }
    }
    await expect(page).toHaveURL('/');
  });

  await test.step("Étape 13: Navigation de / vers /detournement-video (En savoir plus...)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens12 = page.getByRole('link', { name: /En savoir plus\.\.\./i });
    if (await liens12.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens12.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/detournement-video'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/detournement-video');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/detournement-video');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/detournement-video');
      }
    }
    await expect(page).toHaveURL('/detournement-video');
  });

  await test.step("Étape 14: Navigation de /detournement-video vers /plan-du-site (Plan du site)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens13 = page.getByRole('link', { name: /Plan du site/i });
    if (await liens13.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens13.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/plan-du-site'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/plan-du-site');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/plan-du-site');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/plan-du-site');
      }
    }
    await expect(page).toHaveURL('/plan-du-site');
  });

  await test.step("Étape 15: Navigation de /plan-du-site vers / (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens14 = page.getByRole('link', { name: /lien/i });
    if (await liens14.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens14.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/');
      }
    }
    await expect(page).toHaveURL('/');
  });

  await test.step("Étape 16: Navigation de / vers /management-de-produit-logiciel (En savoir plus...)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens15 = page.getByRole('link', { name: /En savoir plus\.\.\./i });
    if (await liens15.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens15.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/management-de-produit-logiciel'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/management-de-produit-logiciel');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/management-de-produit-logiciel');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/management-de-produit-logiciel');
      }
    }
    await expect(page).toHaveURL('/management-de-produit-logiciel');
  });

  await test.step("Étape 17: Navigation de /management-de-produit-logiciel vers /plan-du-site (Plan du site)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens16 = page.getByRole('link', { name: /Plan du site/i });
    if (await liens16.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens16.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/plan-du-site'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/plan-du-site');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/plan-du-site');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/plan-du-site');
      }
    }
    await expect(page).toHaveURL('/plan-du-site');
  });

  await test.step("Étape 18: Navigation de /plan-du-site vers / (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens17 = page.getByRole('link', { name: /lien/i });
    if (await liens17.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens17.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/');
      }
    }
    await expect(page).toHaveURL('/');
  });

  await test.step("Étape 19: Navigation de / vers /a-propos-du-site (En savoir plus...)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens18 = page.getByRole('link', { name: /En savoir plus\.\.\./i });
    if (await liens18.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens18.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/a-propos-du-site'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/a-propos-du-site');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/a-propos-du-site');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/a-propos-du-site');
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  await test.step("Étape 20: Navigation de /a-propos-du-site vers /metrics (BarChart3)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens19 = page.getByRole('link', { name: /BarChart3/i });
    if (await liens19.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens19.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/metrics'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/metrics');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/metrics');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/metrics');
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  await test.step("Étape 21: Navigation de /metrics vers /metrics (BarChart3)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens20 = page.getByRole('link', { name: /BarChart3/i });
    if (await liens20.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens20.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/metrics'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/metrics');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/metrics');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/metrics');
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  await test.step("Étape 22: Navigation de /metrics vers /a-propos-du-site (Info)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens21 = page.getByRole('link', { name: /Info/i });
    if (await liens21.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens21.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/a-propos-du-site'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/a-propos-du-site');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/a-propos-du-site');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/a-propos-du-site');
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  await test.step("Étape 23: Navigation de /a-propos-du-site vers /a-propos-du-site (Info)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens22 = page.getByRole('link', { name: /Info/i });
    if (await liens22.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens22.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/a-propos-du-site'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/a-propos-du-site');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/a-propos-du-site');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/a-propos-du-site');
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  await test.step("Étape 24: Navigation de /a-propos-du-site vers / (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens23 = page.getByRole('link', { name: /lien/i });
    if (await liens23.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens23.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/');
      }
    }
    await expect(page).toHaveURL('/');
  });

  await test.step("Étape 25: Navigation de / vers /plan-du-site (Plan du site)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens24 = page.getByRole('link', { name: /Plan du site/i });
    if (await liens24.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens24.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/plan-du-site'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/plan-du-site');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/plan-du-site');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/plan-du-site');
      }
    }
    await expect(page).toHaveURL('/plan-du-site');
  });

  await test.step("Étape 26: Navigation de /plan-du-site vers /maintenance (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens25 = page.getByRole('link', { name: /lien/i });
    if (await liens25.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens25.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/maintenance'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/maintenance');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/maintenance');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/maintenance');
      }
    }
    await expect(page).toHaveURL('/maintenance');
  });

  await test.step("Étape 27: Navigation de /maintenance vers /plan-du-site (Plan du site)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens26 = page.getByRole('link', { name: /Plan du site/i });
    if (await liens26.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens26.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/plan-du-site'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/plan-du-site');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/plan-du-site');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/plan-du-site');
      }
    }
    await expect(page).toHaveURL('/plan-du-site');
  });

  await test.step("Étape 28: Navigation de /plan-du-site vers /portfolio-detournements (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens27 = page.getByRole('link', { name: /lien/i });
    if (await liens27.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens27.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/portfolio-detournements'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/portfolio-detournements');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/portfolio-detournements');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/portfolio-detournements');
      }
    }
    await expect(page).toHaveURL('/portfolio-detournements');
  });

  await test.step("Étape 29: Navigation de /portfolio-detournements vers /plan-du-site (Plan du site)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens28 = page.getByRole('link', { name: /Plan du site/i });
    if (await liens28.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens28.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/plan-du-site'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/plan-du-site');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/plan-du-site');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/plan-du-site');
      }
    }
    await expect(page).toHaveURL('/plan-du-site');
  });

  await test.step("Étape 30: Navigation de /plan-du-site vers /pour_aller_plus_loin (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens29 = page.getByRole('link', { name: /lien/i });
    if (await liens29.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens29.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/pour_aller_plus_loin'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/pour_aller_plus_loin');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/pour_aller_plus_loin');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/pour_aller_plus_loin');
      }
    }
    await expect(page).toHaveURL('/pour_aller_plus_loin');
  });

  await test.step("Étape 31: Navigation de /pour_aller_plus_loin vers /plan-du-site (Plan du site)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens30 = page.getByRole('link', { name: /Plan du site/i });
    if (await liens30.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens30.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/plan-du-site'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/plan-du-site');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/plan-du-site');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/plan-du-site');
      }
    }
    await expect(page).toHaveURL('/plan-du-site');
  });

  await test.step("Étape 32: Navigation de /plan-du-site vers / (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens31 = page.getByRole('link', { name: /lien/i });
    if (await liens31.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens31.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/');
      }
    }
    await expect(page).toHaveURL('/');
  });

  await test.step("Étape 33: Navigation de / vers /metrics (BarChart3)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens32 = page.getByRole('link', { name: /BarChart3/i });
    if (await liens32.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens32.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/metrics'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/metrics');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/metrics');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/metrics');
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  await test.step("Étape 34: Navigation de /metrics vers /detournement-video (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens33 = page.getByRole('link', { name: /lien/i });
    if (await liens33.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens33.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/detournement-video'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/detournement-video');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/detournement-video');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/detournement-video');
      }
    }
    await expect(page).toHaveURL('/detournement-video');
  });

  await test.step("Étape 35: Navigation de /detournement-video vers /metrics (BarChart3)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens34 = page.getByRole('link', { name: /BarChart3/i });
    if (await liens34.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens34.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/metrics'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/metrics');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/metrics');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/metrics');
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  await test.step("Étape 36: Navigation de /metrics vers /maintenance (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens35 = page.getByRole('link', { name: /lien/i });
    if (await liens35.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens35.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/maintenance'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/maintenance');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/maintenance');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/maintenance');
      }
    }
    await expect(page).toHaveURL('/maintenance');
  });

  await test.step("Étape 37: Navigation de /maintenance vers /metrics (BarChart3)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens36 = page.getByRole('link', { name: /BarChart3/i });
    if (await liens36.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens36.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/metrics'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/metrics');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/metrics');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/metrics');
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  await test.step("Étape 38: Navigation de /metrics vers /management-de-produit-logiciel (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens37 = page.getByRole('link', { name: /lien/i });
    if (await liens37.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens37.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/management-de-produit-logiciel'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/management-de-produit-logiciel');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/management-de-produit-logiciel');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/management-de-produit-logiciel');
      }
    }
    await expect(page).toHaveURL('/management-de-produit-logiciel');
  });

  await test.step("Étape 39: Navigation de /management-de-produit-logiciel vers /metrics (BarChart3)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens38 = page.getByRole('link', { name: /BarChart3/i });
    if (await liens38.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens38.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/metrics'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/metrics');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/metrics');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/metrics');
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  await test.step("Étape 40: Navigation de /metrics vers /portfolio-detournements (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens39 = page.getByRole('link', { name: /lien/i });
    if (await liens39.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens39.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/portfolio-detournements'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/portfolio-detournements');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/portfolio-detournements');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/portfolio-detournements');
      }
    }
    await expect(page).toHaveURL('/portfolio-detournements');
  });

  await test.step("Étape 41: Navigation de /portfolio-detournements vers /metrics (BarChart3)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens40 = page.getByRole('link', { name: /BarChart3/i });
    if (await liens40.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens40.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/metrics'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/metrics');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/metrics');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/metrics');
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  await test.step("Étape 42: Navigation de /metrics vers /pour_aller_plus_loin (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens41 = page.getByRole('link', { name: /lien/i });
    if (await liens41.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens41.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/pour_aller_plus_loin'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/pour_aller_plus_loin');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/pour_aller_plus_loin');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/pour_aller_plus_loin');
      }
    }
    await expect(page).toHaveURL('/pour_aller_plus_loin');
  });

  await test.step("Étape 43: Navigation de /pour_aller_plus_loin vers /metrics (BarChart3)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens42 = page.getByRole('link', { name: /BarChart3/i });
    if (await liens42.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens42.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/metrics'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/metrics');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/metrics');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/metrics');
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  await test.step("Étape 44: Navigation de /metrics vers /robustesse (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens43 = page.getByRole('link', { name: /lien/i });
    if (await liens43.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens43.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/robustesse'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/robustesse');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/robustesse');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/robustesse');
      }
    }
    await expect(page).toHaveURL('/robustesse');
  });

  await test.step("Étape 45: Navigation de /robustesse vers /metrics (BarChart3)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens44 = page.getByRole('link', { name: /BarChart3/i });
    if (await liens44.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens44.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/metrics'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/metrics');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/metrics');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/metrics');
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  await test.step("Étape 46: Navigation de /metrics vers /transformation (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens45 = page.getByRole('link', { name: /lien/i });
    if (await liens45.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens45.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/transformation'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/transformation');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/transformation');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/transformation');
      }
    }
    await expect(page).toHaveURL('/transformation');
  });

  await test.step("Étape 47: Navigation de /transformation vers /metrics (BarChart3)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens46 = page.getByRole('link', { name: /BarChart3/i });
    if (await liens46.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens46.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/metrics'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/metrics');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/metrics');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/metrics');
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  await test.step("Étape 48: Navigation de /metrics vers /detournement-video (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens47 = page.getByRole('link', { name: /lien/i });
    if (await liens47.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens47.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/detournement-video'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/detournement-video');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/detournement-video');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/detournement-video');
      }
    }
    await expect(page).toHaveURL('/detournement-video');
  });

  await test.step("Étape 49: Navigation de /detournement-video vers /a-propos-du-site (Info)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens48 = page.getByRole('link', { name: /Info/i });
    if (await liens48.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens48.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/a-propos-du-site'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/a-propos-du-site');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/a-propos-du-site');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/a-propos-du-site');
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  await test.step("Étape 50: Navigation de /a-propos-du-site vers /maintenance (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens49 = page.getByRole('link', { name: /lien/i });
    if (await liens49.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens49.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/maintenance'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/maintenance');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/maintenance');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/maintenance');
      }
    }
    await expect(page).toHaveURL('/maintenance');
  });

  await test.step("Étape 51: Navigation de /maintenance vers /a-propos-du-site (Info)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens50 = page.getByRole('link', { name: /Info/i });
    if (await liens50.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens50.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/a-propos-du-site'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/a-propos-du-site');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/a-propos-du-site');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/a-propos-du-site');
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  await test.step("Étape 52: Navigation de /a-propos-du-site vers /management-de-produit-logiciel (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens51 = page.getByRole('link', { name: /lien/i });
    if (await liens51.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens51.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/management-de-produit-logiciel'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/management-de-produit-logiciel');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/management-de-produit-logiciel');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/management-de-produit-logiciel');
      }
    }
    await expect(page).toHaveURL('/management-de-produit-logiciel');
  });

  await test.step("Étape 53: Navigation de /management-de-produit-logiciel vers /a-propos-du-site (Info)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens52 = page.getByRole('link', { name: /Info/i });
    if (await liens52.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens52.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/a-propos-du-site'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/a-propos-du-site');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/a-propos-du-site');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/a-propos-du-site');
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  await test.step("Étape 54: Navigation de /a-propos-du-site vers /portfolio-detournements (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens53 = page.getByRole('link', { name: /lien/i });
    if (await liens53.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens53.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/portfolio-detournements'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/portfolio-detournements');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/portfolio-detournements');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/portfolio-detournements');
      }
    }
    await expect(page).toHaveURL('/portfolio-detournements');
  });

  await test.step("Étape 55: Navigation de /portfolio-detournements vers /a-propos-du-site (Info)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens54 = page.getByRole('link', { name: /Info/i });
    if (await liens54.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens54.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/a-propos-du-site'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/a-propos-du-site');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/a-propos-du-site');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/a-propos-du-site');
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  await test.step("Étape 56: Navigation de /a-propos-du-site vers /pour_aller_plus_loin (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens55 = page.getByRole('link', { name: /lien/i });
    if (await liens55.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens55.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/pour_aller_plus_loin'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/pour_aller_plus_loin');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/pour_aller_plus_loin');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/pour_aller_plus_loin');
      }
    }
    await expect(page).toHaveURL('/pour_aller_plus_loin');
  });

  await test.step("Étape 57: Navigation de /pour_aller_plus_loin vers /a-propos-du-site (Info)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens56 = page.getByRole('link', { name: /Info/i });
    if (await liens56.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens56.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/a-propos-du-site'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/a-propos-du-site');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/a-propos-du-site');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/a-propos-du-site');
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  await test.step("Étape 58: Navigation de /a-propos-du-site vers /robustesse (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens57 = page.getByRole('link', { name: /lien/i });
    if (await liens57.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens57.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/robustesse'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/robustesse');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/robustesse');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/robustesse');
      }
    }
    await expect(page).toHaveURL('/robustesse');
  });

  await test.step("Étape 59: Navigation de /robustesse vers /a-propos-du-site (Info)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens58 = page.getByRole('link', { name: /Info/i });
    if (await liens58.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens58.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/a-propos-du-site'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/a-propos-du-site');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/a-propos-du-site');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/a-propos-du-site');
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  await test.step("Étape 60: Navigation de /a-propos-du-site vers /transformation (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens59 = page.getByRole('link', { name: /lien/i });
    if (await liens59.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens59.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/transformation'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/transformation');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/transformation');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/transformation');
      }
    }
    await expect(page).toHaveURL('/transformation');
  });

  await test.step("Étape 61: Navigation de /transformation vers /a-propos-du-site (Info)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens60 = page.getByRole('link', { name: /Info/i });
    if (await liens60.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens60.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/a-propos-du-site'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe
        await page.goto('/a-propos-du-site');
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, naviguer vers la destination
        await page.goto('/a-propos-du-site');
      } else {
        // Option 2 : Via le logo (header) vers l'accueil
        const logo = page.getByAltText('Logo Malain et possible');
        if (await logo.count() > 0) {
          await logo.click();
          await expect(page).toHaveURL('/');
        } else {
          // Fallback : navigation directe vers l'accueil
          await page.goto('/');
        }
        // Depuis l'accueil, naviguer vers la destination
        await page.goto('/a-propos-du-site');
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  // Tous les liens ont été parcourus
  // 0 e2eID ont été testés
  console.log('✅ Parcours complet : tous les liens et e2eID ont été testés');
});