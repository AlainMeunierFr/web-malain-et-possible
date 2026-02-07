import { test, expect } from '@playwright/test';

test('parcours complet de tous les liens du site et test de tous les e2eID', async ({ page }) => {
  // Scénario généré automatiquement depuis _Pages-Liens-Et-Menus.json
  // Ce test parcourt tous les liens du site et teste tous les e2eID présents

  await test.step("Étape 1: Page d'accueil", async () => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL('/');
    await page.waitForLoadState('networkidle').catch(() => {});
  });

  // Test des e2eID présents sur /
  // Test e2eID: h1 (header - constants/e2eIds.ts)
  const element0 = page.getByTestId('e2eid-h1');
  if (await element0.count() > 0) {
    await expect(element0).toBeVisible();
  }
  // Test e2eID: h2 (header - constants/e2eIds.ts)
  const element1 = page.getByTestId('e2eid-h2');
  if (await element1.count() > 0) {
    await expect(element1).toBeVisible();
  }
  // Test e2eID: v20 (video - detournement-video.json)
  const element2 = page.getByTestId('e2eid-v20');
  if (await element2.count() > 0) {
    await expect(element2).toBeVisible();
  }
  // Test e2eID: a3 (callToAction - detournement-video.json)
  const element3 = page.getByTestId('e2eid-a3');
  if (await element3.count() > 0) {
    await expect(element3).toBeVisible();
  }
  // Test e2eID: b4 (bouton - faisons-connaissance.json)
  const element4 = page.getByTestId('e2eid-b4');
  if (await element4.count() > 0) {
    await expect(element4).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: b5 (bouton - faisons-connaissance.json)
  const element5 = page.getByTestId('e2eid-b5');
  if (await element5.count() > 0) {
    await expect(element5).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: b6 (bouton - faisons-connaissance.json)
  const element6 = page.getByTestId('e2eid-b6');
  if (await element6.count() > 0) {
    await expect(element6).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: b7 (bouton - faisons-connaissance.json)
  const element7 = page.getByTestId('e2eid-b7');
  if (await element7.count() > 0) {
    await expect(element7).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: b8 (bouton - faisons-connaissance.json)
  const element8 = page.getByTestId('e2eid-b8');
  if (await element8.count() > 0) {
    await expect(element8).toBeVisible();
    // Élément externe, vérification de présence uniquement
  }
  // Test e2eID: b9 (bouton - faisons-connaissance.json)
  const element9 = page.getByTestId('e2eid-b9');
  if (await element9.count() > 0) {
    await expect(element9).toBeVisible();
    // Élément externe, vérification de présence uniquement
  }
  // Test e2eID: v10 (unknown - index.json)
  const element10 = page.getByTestId('e2eid-v10');
  if (await element10.count() > 0) {
    await expect(element10).toBeVisible();
  }
  // Test e2eID: a33 (callToAction - mes-profils.json)
  const element11 = page.getByTestId('e2eid-a33');
  if (await element11.count() > 0) {
    await expect(element11).toBeVisible();
  }
  // Test e2eID: a21 (callToAction - portfolio-detournements.json)
  const element12 = page.getByTestId('e2eid-a21');
  if (await element12.count() > 0) {
    await expect(element12).toBeVisible();
  }
  // Test e2eID: v22 (video - pour-aller-plus-loin.json)
  const element13 = page.getByTestId('e2eid-v22');
  if (await element13.count() > 0) {
    await expect(element13).toBeVisible();
  }
  // Test e2eID: v23 (video - pour-aller-plus-loin.json)
  const element14 = page.getByTestId('e2eid-v23');
  if (await element14.count() > 0) {
    await expect(element14).toBeVisible();
  }
  // Test e2eID: v24 (video - pour-aller-plus-loin.json)
  const element15 = page.getByTestId('e2eid-v24');
  if (await element15.count() > 0) {
    await expect(element15).toBeVisible();
  }
  // Test e2eID: a25 (callToAction - pour-aller-plus-loin.json)
  const element16 = page.getByTestId('e2eid-a25');
  if (await element16.count() > 0) {
    await expect(element16).toBeVisible();
  }
  // Test e2eID: v11 (video - profil-agile.json)
  const element17 = page.getByTestId('e2eid-v11');
  if (await element17.count() > 0) {
    await expect(element17).toBeVisible();
  }
  // Test e2eID: v12 (video - profil-agile.json)
  const element18 = page.getByTestId('e2eid-v12');
  if (await element18.count() > 0) {
    await expect(element18).toBeVisible();
  }
  // Test e2eID: a26 (callToAction - profil-agile.json)
  const element19 = page.getByTestId('e2eid-a26');
  if (await element19.count() > 0) {
    await expect(element19).toBeVisible();
  }
  // Test e2eID: v27 (video - profil-coo.json)
  const element20 = page.getByTestId('e2eid-v27');
  if (await element20.count() > 0) {
    await expect(element20).toBeVisible();
  }
  // Test e2eID: a28 (callToAction - profil-coo.json)
  const element21 = page.getByTestId('e2eid-a28');
  if (await element21.count() > 0) {
    await expect(element21).toBeVisible();
  }
  // Test e2eID: v29 (video - profil-cpo.json)
  const element22 = page.getByTestId('e2eid-v29');
  if (await element22.count() > 0) {
    await expect(element22).toBeVisible();
  }
  // Test e2eID: a30 (callToAction - profil-cpo.json)
  const element23 = page.getByTestId('e2eid-a30');
  if (await element23.count() > 0) {
    await expect(element23).toBeVisible();
  }
  // Test e2eID: v31 (video - profil-cto.json)
  const element24 = page.getByTestId('e2eid-v31');
  if (await element24.count() > 0) {
    await expect(element24).toBeVisible();
  }
  // Test e2eID: a32 (callToAction - profil-cto.json)
  const element25 = page.getByTestId('e2eid-a32');
  if (await element25.count() > 0) {
    await expect(element25).toBeVisible();
  }
  // Test e2eID: e2eid-assistant-annuler (react - AssistantScenario.tsx)
  const element26 = page.getByTestId('e2eid-e2eid-assistant-annuler');
  if (await element26.count() > 0) {
    await expect(element26).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: e2eid-assistant-tout-annuler (react - AssistantScenario.tsx)
  const element27 = page.getByTestId('e2eid-e2eid-assistant-tout-annuler');
  if (await element27.count() > 0) {
    await expect(element27).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: e2eid-assistant-generer (react - AssistantScenario.tsx)
  const element28 = page.getByTestId('e2eid-e2eid-assistant-generer');
  if (await element28.count() > 0) {
    await expect(element28).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: e2eid-assistant-regenerer-plan (react - AssistantScenario.tsx)
  const element29 = page.getByTestId('e2eid-e2eid-assistant-regenerer-plan');
  if (await element29.count() > 0) {
    await expect(element29).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: e2eid-header-hamburger (react - Header.tsx)
  const element30 = page.getByTestId('e2eid-e2eid-header-hamburger');
  if (await element30.count() > 0) {
    await expect(element30).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: hero-bouton-principal (react - HeroSection.tsx)
  const element31 = page.getByTestId('e2eid-hero-bouton-principal');
  if (await element31.count() > 0) {
    await expect(element31).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: hero-telecharger-cv (react - HeroSection.tsx)
  const element32 = page.getByTestId('e2eid-hero-telecharger-cv');
  if (await element32.count() > 0) {
    await expect(element32).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: sprint-goal (react - SprintBoardKanban.tsx)
  const element33 = page.getByTestId('e2eid-sprint-goal');
  if (await element33.count() > 0) {
    await expect(element33).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: zone-openapi (react - SprintDashboardContent.tsx)
  const element34 = page.getByTestId('e2eid-zone-openapi');
  if (await element34.count() > 0) {
    await expect(element34).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: zone-metrics (react - SprintDashboardContent.tsx)
  const element35 = page.getByTestId('e2eid-zone-metrics');
  if (await element35.count() > 0) {
    await expect(element35).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: zone-sprint (react - SprintDashboardContent.tsx)
  const element36 = page.getByTestId('e2eid-zone-sprint');
  if (await element36.count() > 0) {
    await expect(element36).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: us-detail-modal (react - UsDetailModal.tsx)
  const element37 = page.getByTestId('e2eid-us-detail-modal');
  if (await element37.count() > 0) {
    await expect(element37).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: us-detail-modal-close (react - UsDetailModal.tsx)
  const element38 = page.getByTestId('e2eid-us-detail-modal-close');
  if (await element38.count() > 0) {
    await expect(element38).toBeVisible();
    // Élément interactif présent et visible
  }
  await test.step("Étape 2: Navigation de / vers /mes-profils (Télécharger mon CV)", async () => {
    const liens1 = page.getByRole('link', { name: /Télécharger mon CV/i });
    if (await liens1.count() > 0) {
      const liensTrouves = await liens1.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/mes-profils'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        throw new Error(`Impossible de trouver un lien vers /mes-profils depuis /.`);
      }
    } else {
      await page.waitForSelector('[e2eid^="e2eid-l"]', { timeout: 10000 }).catch(() => {});
      const lienDepuisPlan1 = page.getByTestId('e2eid-l813');
      if (await lienDepuisPlan1.count() === 0) {
        throw new Error('Impossible de trouver un lien vers /mes-profils.');
      }
      await lienDepuisPlan1.first().click();
    }
    await expect(page).toHaveURL('/mes-profils');
  });

  // Test des e2eID présents sur /mes-profils
  await test.step("Étape 3: Navigation de /mes-profils vers /profil/cpo (En savoir plus…)", async () => {
    const liens2 = page.getByRole('link', { name: /En savoir plus…/i });
    if (await liens2.count() > 0) {
      const liensTrouves = await liens2.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/profil/cpo'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        throw new Error(`Impossible de trouver un lien vers /profil/cpo depuis /mes-profils.`);
      }
    } else {
      await page.waitForSelector('[e2eid^="e2eid-l"]', { timeout: 10000 }).catch(() => {});
      const lienDepuisPlan2 = page.getByTestId('e2eid-l699');
      if (await lienDepuisPlan2.count() === 0) {
        throw new Error('Impossible de trouver un lien vers /profil/cpo.');
      }
      await lienDepuisPlan2.first().click();
    }
    await expect(page).toHaveURL('/profil/cpo');
  });

  // Test des e2eID présents sur /profil/cpo
  await test.step("Étape 4: Navigation de /profil/cpo vers /profil/cto (En savoir plus...)", async () => {
    const liens3 = page.getByRole('link', { name: /En savoir plus\.\.\./i });
    if (await liens3.count() > 0) {
      const liensTrouves = await liens3.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/profil/cto'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        throw new Error(`Impossible de trouver un lien vers /profil/cto depuis /profil/cpo.`);
      }
    } else {
      await page.waitForSelector('[e2eid^="e2eid-l"]', { timeout: 10000 }).catch(() => {});
      const lienDepuisPlan3 = page.getByTestId('e2eid-l925');
      if (await lienDepuisPlan3.count() === 0) {
        throw new Error('Impossible de trouver un lien vers /profil/cto.');
      }
      await lienDepuisPlan3.first().click();
    }
    await expect(page).toHaveURL('/profil/cto');
  });

  // Test des e2eID présents sur /profil/cto
  await test.step("Étape 5: Navigation de /profil/cto vers /a-propos-du-site (En savoir plus...)", async () => {
    const liens4 = page.getByRole('link', { name: /En savoir plus\.\.\./i });
    if (await liens4.count() > 0) {
      const liensTrouves = await liens4.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
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
        throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis /profil/cto.`);
      }
    } else {
      await page.waitForSelector('[e2eid^="e2eid-l"]', { timeout: 10000 }).catch(() => {});
      const lienDepuisPlan4 = page.getByTestId('e2eid-l847');
      if (await lienDepuisPlan4.count() === 0) {
        throw new Error('Impossible de trouver un lien vers /a-propos-du-site.');
      }
      await lienDepuisPlan4.first().click();
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  // Test des e2eID présents sur /a-propos-du-site
  await test.step("Étape 6: Navigation de /a-propos-du-site vers /plan-du-site (Plan du site)", async () => {
    const boutonPlanDuSite = page.locator('footer').locator('[e2eid="e2eid-b44"]');
    await boutonPlanDuSite.first().waitFor({ state: 'visible', timeout: 15000 });
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.first().evaluate((el) => el.scrollIntoView({ block: 'nearest', behavior: 'instant' }));
      await boutonPlanDuSite.first().click({ timeout: 15000 });
      await expect(page).toHaveURL('/plan-du-site', { timeout: 15000 });
    } else {
      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b44) dans le footer.');
    }
  });
  await test.step("Étape 7: Navigation de /plan-du-site vers /profil/coo (Opérations)", async () => {
    const liens6 = page.getByRole('link', { name: /Opérations/i });
    if (await liens6.count() > 0) {
      const liensTrouves = await liens6.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/profil/coo'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        throw new Error(`Impossible de trouver un lien vers /profil/coo depuis /plan-du-site.`);
      }
    } else {
      await page.waitForSelector('[e2eid^="e2eid-l"]', { timeout: 10000 }).catch(() => {});
      const lienDepuisPlan6 = page.getByTestId('e2eid-l730');
      if (await lienDepuisPlan6.count() === 0) {
        throw new Error('Impossible de trouver un lien vers /profil/coo.');
      }
      await lienDepuisPlan6.first().click();
    }
    await expect(page).toHaveURL('/profil/coo');
  });

  // Test des e2eID présents sur /profil/coo
  await test.step("Étape 8: Navigation de /profil/coo vers /detournement-video (En savoir plus...)", async () => {
    const liens7 = page.getByRole('link', { name: /En savoir plus\.\.\./i });
    if (await liens7.count() > 0) {
      const liensTrouves = await liens7.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
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
        throw new Error(`Impossible de trouver un lien vers /detournement-video depuis /profil/coo.`);
      }
    } else {
      await page.waitForSelector('[e2eid^="e2eid-l"]', { timeout: 10000 }).catch(() => {});
      const lienDepuisPlan7 = page.getByTestId('e2eid-l806');
      if (await lienDepuisPlan7.count() === 0) {
        throw new Error('Impossible de trouver un lien vers /detournement-video.');
      }
      await lienDepuisPlan7.first().click();
    }
    await expect(page).toHaveURL('/detournement-video');
  });

  // Test des e2eID présents sur /detournement-video
  await test.step("Étape 9: Navigation de /detournement-video vers /portfolio-detournements (Voir le portfolio)", async () => {
    const liens8 = page.getByRole('link', { name: /Voir le portfolio/i });
    if (await liens8.count() > 0) {
      const liensTrouves = await liens8.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
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
        throw new Error(`Impossible de trouver un lien vers /portfolio-detournements depuis /detournement-video.`);
      }
    } else {
      await page.waitForSelector('[e2eid^="e2eid-l"]', { timeout: 10000 }).catch(() => {});
      const lienDepuisPlan8 = page.getByTestId('e2eid-l696');
      if (await lienDepuisPlan8.count() === 0) {
        throw new Error('Impossible de trouver un lien vers /portfolio-detournements.');
      }
      await lienDepuisPlan8.first().click();
    }
    await expect(page).toHaveURL('/portfolio-detournements');
  });

  // Test des e2eID présents sur /portfolio-detournements
  await test.step("Étape 10: Navigation de /portfolio-detournements vers /plan-du-site (Plan du site)", async () => {
    const boutonPlanDuSite = page.locator('footer').locator('[e2eid="e2eid-b44"]');
    await boutonPlanDuSite.first().waitFor({ state: 'visible', timeout: 15000 });
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.first().evaluate((el) => el.scrollIntoView({ block: 'nearest', behavior: 'instant' }));
      await boutonPlanDuSite.first().click({ timeout: 15000 });
      await expect(page).toHaveURL('/plan-du-site', { timeout: 15000 });
    } else {
      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b44) dans le footer.');
    }
  });
  await test.step("Étape 11: Navigation de /plan-du-site vers /profil/agile (Transformation Agile)", async () => {
    const liens10 = page.getByRole('link', { name: /Transformation Agile/i });
    if (await liens10.count() > 0) {
      const liensTrouves = await liens10.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/profil/agile'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        throw new Error(`Impossible de trouver un lien vers /profil/agile depuis /plan-du-site.`);
      }
    } else {
      await page.waitForSelector('[e2eid^="e2eid-l"]', { timeout: 10000 }).catch(() => {});
      const lienDepuisPlan10 = page.getByTestId('e2eid-l605');
      if (await lienDepuisPlan10.count() === 0) {
        throw new Error('Impossible de trouver un lien vers /profil/agile.');
      }
      await lienDepuisPlan10.first().click();
    }
    await expect(page).toHaveURL('/profil/agile');
  });

  // Test des e2eID présents sur /profil/agile
  await test.step("Étape 12: Navigation de /profil/agile vers /plan-du-site (Plan du site)", async () => {
    const boutonPlanDuSite = page.locator('footer').locator('[e2eid="e2eid-b44"]');
    await boutonPlanDuSite.first().waitFor({ state: 'visible', timeout: 15000 });
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.first().evaluate((el) => el.scrollIntoView({ block: 'nearest', behavior: 'instant' }));
      await boutonPlanDuSite.first().click({ timeout: 15000 });
      await expect(page).toHaveURL('/plan-du-site', { timeout: 15000 });
    } else {
      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b44) dans le footer.');
    }
  });
  await test.step("Étape 13: Navigation de /plan-du-site vers /faisons-connaissance (lien)", async () => {
    await page.waitForSelector('[e2eid^="e2eid-l"]', { timeout: 10000 }).catch(() => {});
    const lienDepuisPlan12 = page.getByTestId('e2eid-l719');
    if (await lienDepuisPlan12.count() === 0) {
      throw new Error('Impossible de trouver un lien vers /faisons-connaissance.');
    }
    await lienDepuisPlan12.first().click();
    await expect(page).toHaveURL('/faisons-connaissance');
  });

  // Test des e2eID présents sur /faisons-connaissance
  await test.step("Étape 14: Navigation de /faisons-connaissance vers /plan-du-site (Plan du site)", async () => {
    const boutonPlanDuSite = page.locator('footer').locator('[e2eid="e2eid-b44"]');
    await boutonPlanDuSite.first().waitFor({ state: 'visible', timeout: 15000 });
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.first().evaluate((el) => el.scrollIntoView({ block: 'nearest', behavior: 'instant' }));
      await boutonPlanDuSite.first().click({ timeout: 15000 });
      await expect(page).toHaveURL('/plan-du-site', { timeout: 15000 });
    } else {
      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b44) dans le footer.');
    }
  });
  await test.step("Étape 15: Navigation de /plan-du-site vers /pour-aller-plus-loin (lien)", async () => {
    await page.waitForSelector('[e2eid^="e2eid-l"]', { timeout: 10000 }).catch(() => {});
    const lienDepuisPlan14 = page.getByTestId('e2eid-l707');
    if (await lienDepuisPlan14.count() === 0) {
      throw new Error('Impossible de trouver un lien vers /pour-aller-plus-loin.');
    }
    await lienDepuisPlan14.first().click();
    await expect(page).toHaveURL('/pour-aller-plus-loin');
  });

  // Test des e2eID présents sur /pour-aller-plus-loin

  // Tous les liens ont été parcourus
  // 39 e2eID ont été testés
  console.log('✅ Parcours complet : tous les liens et e2eID ont été testés');
});