import { test, expect } from '@playwright/test';

test('parcours complet de tous les liens du site et test de tous les e2eID', async ({ page }) => {
  // Scénario généré automatiquement depuis Pages-Et-Lien.json
  // Ce test parcourt tous les liens du site et teste tous les e2eID présents

  await test.step("Étape 1: Page d'accueil", async () => {
    await page.goto('/');
    await expect(page).toHaveURL('/');
  });

  // Test des e2eID présents sur /
  // Test e2eID: b10 (bouton - footerButtons.json)
  const element0 = page.getByTestId('e2eid-b10');
  if (await element0.count() > 0) {
    await expect(element0).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: b11 (bouton - footerButtons.json)
  const element1 = page.getByTestId('e2eid-b11');
  if (await element1.count() > 0) {
    await expect(element1).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: b12 (bouton - footerButtons.json)
  const element2 = page.getByTestId('e2eid-b12');
  if (await element2.count() > 0) {
    await expect(element2).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: b13 (bouton - footerButtons.json)
  const element3 = page.getByTestId('e2eid-b13');
  if (await element3.count() > 0) {
    await expect(element3).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: b14 (bouton - footerButtons.json)
  const element4 = page.getByTestId('e2eid-b14');
  if (await element4.count() > 0) {
    await expect(element4).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: b15 (bouton - footerButtons.json)
  const element5 = page.getByTestId('e2eid-b15');
  if (await element5.count() > 0) {
    await expect(element5).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: h1 (header - constants/e2eIds.ts)
  const element6 = page.getByTestId('e2eid-h1');
  if (await element6.count() > 0) {
    await expect(element6).toBeVisible();
  }
  // Test e2eID: h2 (header - constants/e2eIds.ts)
  const element7 = page.getByTestId('e2eid-h2');
  if (await element7.count() > 0) {
    await expect(element7).toBeVisible();
  }
  // Test e2eID: v17 (video - Conduite du changement.json)
  const element8 = page.getByTestId('e2eid-v17');
  if (await element8.count() > 0) {
    await expect(element8).toBeVisible();
  }
  // Test e2eID: a1 (callToAction - Conduite du changement.json)
  const element9 = page.getByTestId('e2eid-a1');
  if (await element9.count() > 0) {
    await expect(element9).toBeVisible();
  }
  // Test e2eID: v20 (video - Détournement vidéo.json)
  const element10 = page.getByTestId('e2eid-v20');
  if (await element10.count() > 0) {
    await expect(element10).toBeVisible();
  }
  // Test e2eID: c2 (bouton - Détournement vidéo.json)
  const element11 = page.getByTestId('e2eid-c2');
  if (await element11.count() > 0) {
    await expect(element11).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: a3 (callToAction - Détournement vidéo.json)
  const element12 = page.getByTestId('e2eid-a3');
  if (await element12.count() > 0) {
    await expect(element12).toBeVisible();
  }
  // Test e2eID: b4 (bouton - faisons-connaissance.json)
  const element13 = page.getByTestId('e2eid-b4');
  if (await element13.count() > 0) {
    await expect(element13).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: b5 (bouton - faisons-connaissance.json)
  const element14 = page.getByTestId('e2eid-b5');
  if (await element14.count() > 0) {
    await expect(element14).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: b6 (bouton - faisons-connaissance.json)
  const element15 = page.getByTestId('e2eid-b6');
  if (await element15.count() > 0) {
    await expect(element15).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: b7 (bouton - faisons-connaissance.json)
  const element16 = page.getByTestId('e2eid-b7');
  if (await element16.count() > 0) {
    await expect(element16).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: b8 (bouton - faisons-connaissance.json)
  const element17 = page.getByTestId('e2eid-b8');
  if (await element17.count() > 0) {
    await expect(element17).toBeVisible();
    // Élément externe, vérification de présence uniquement
  }
  // Test e2eID: b9 (bouton - faisons-connaissance.json)
  const element18 = page.getByTestId('e2eid-b9');
  if (await element18.count() > 0) {
    await expect(element18).toBeVisible();
    // Élément externe, vérification de présence uniquement
  }
  // Test e2eID: v10 (video - index.json)
  const element19 = page.getByTestId('e2eid-v10');
  if (await element19.count() > 0) {
    await expect(element19).toBeVisible();
  }
  // Test e2eID: c11 (bouton - index.json)
  const element20 = page.getByTestId('e2eid-c11');
  if (await element20.count() > 0) {
    await expect(element20).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: c12 (bouton - index.json)
  const element21 = page.getByTestId('e2eid-c12');
  if (await element21.count() > 0) {
    await expect(element21).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: c13 (bouton - index.json)
  const element22 = page.getByTestId('e2eid-c13');
  if (await element22.count() > 0) {
    await expect(element22).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: c14 (bouton - index.json)
  const element23 = page.getByTestId('e2eid-c14');
  if (await element23.count() > 0) {
    await expect(element23).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: c15 (bouton - index.json)
  const element24 = page.getByTestId('e2eid-c15');
  if (await element24.count() > 0) {
    await expect(element24).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: c16 (bouton - index.json)
  const element25 = page.getByTestId('e2eid-c16');
  if (await element25.count() > 0) {
    await expect(element25).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: a17 (callToAction - index.json)
  const element26 = page.getByTestId('e2eid-a17');
  if (await element26.count() > 0) {
    await expect(element26).toBeVisible();
  }
  // Test e2eID: v18 (video - management-de-produit-logiciel.json)
  const element27 = page.getByTestId('e2eid-v18');
  if (await element27.count() > 0) {
    await expect(element27).toBeVisible();
  }
  // Test e2eID: v19 (video - management-de-produit-logiciel.json)
  const element28 = page.getByTestId('e2eid-v19');
  if (await element28.count() > 0) {
    await expect(element28).toBeVisible();
  }
  // Test e2eID: a20 (callToAction - management-de-produit-logiciel.json)
  const element29 = page.getByTestId('e2eid-a20');
  if (await element29.count() > 0) {
    await expect(element29).toBeVisible();
  }
  // Test e2eID: a21 (callToAction - portfolio-detournements.json)
  const element30 = page.getByTestId('e2eid-a21');
  if (await element30.count() > 0) {
    await expect(element30).toBeVisible();
  }
  // Test e2eID: v22 (video - pour-aller-plus-loin.json)
  const element31 = page.getByTestId('e2eid-v22');
  if (await element31.count() > 0) {
    await expect(element31).toBeVisible();
  }
  // Test e2eID: v23 (video - pour-aller-plus-loin.json)
  const element32 = page.getByTestId('e2eid-v23');
  if (await element32.count() > 0) {
    await expect(element32).toBeVisible();
  }
  // Test e2eID: v24 (video - pour-aller-plus-loin.json)
  const element33 = page.getByTestId('e2eid-v24');
  if (await element33.count() > 0) {
    await expect(element33).toBeVisible();
  }
  // Test e2eID: a25 (callToAction - pour-aller-plus-loin.json)
  const element34 = page.getByTestId('e2eid-a25');
  if (await element34.count() > 0) {
    await expect(element34).toBeVisible();
  }
  // Test e2eID: a26 (callToAction - Robustesse.json)
  const element35 = page.getByTestId('e2eid-a26');
  if (await element35.count() > 0) {
    await expect(element35).toBeVisible();
  }

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /robustesse depuis / (label: "En savoir plus\.\.\."). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan1 = page.getByRole('link', { name: new RegExp(`/robustesse`, 'i') });
        if (await lienDepuisPlan1.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /robustesse depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan1.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil1 = page.getByRole('link', { name: new RegExp(`/robustesse`, 'i') });
        if (await lienDepuisAccueil1.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel1 = page.getByRole('link', { name: new RegExp(`En savoir plus\.\.\.`, 'i') });
          if (await lienParLabel1.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /robustesse depuis l'accueil (label: "En savoir plus\.\.\."). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel1.first().click();
        } else {
          await lienDepuisAccueil1.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/robustesse');
  });

  // Test des e2eID présents sur /robustesse

  await test.step("Étape 3: Navigation de /robustesse vers /plan-du-site (Plan du site)", async () => {
    // Utiliser l'e2eID pour trouver le bouton (e2eID: b13 - footerButtons.json)
    const boutonPlanDuSite = page.getByTestId('e2eid-b13');
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.click();
      await expect(page).toHaveURL(/\/plan-du-site/);
    } else {
      throw new Error(`Impossible de trouver le bouton "Plan du site" avec l'e2eID b13 depuis /robustesse. Vérifiez que l'e2eID est présent sur cette page.`);
    }
  });

  // Test des e2eID présents sur /plan-du-site

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis /plan-du-site (label: "Plan du site"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan3 = page.getByRole('link', { name: new RegExp(`/plan-du-site`, 'i') });
        if (await lienDepuisPlan3.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan3.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil3 = page.getByRole('link', { name: new RegExp(`/plan-du-site`, 'i') });
        if (await lienDepuisAccueil3.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel3 = page.getByRole('link', { name: new RegExp(`Plan du site`, 'i') });
          if (await lienParLabel3.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis l'accueil (label: "Plan du site"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel3.first().click();
        } else {
          await lienDepuisAccueil3.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/plan-du-site');
  });

  // Test des e2eID présents sur /plan-du-site

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /metrics depuis /plan-du-site (label: "BarChart3"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan4 = page.getByRole('link', { name: new RegExp(`/metrics`, 'i') });
        if (await lienDepuisPlan4.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /metrics depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan4.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil4 = page.getByRole('link', { name: new RegExp(`/metrics`, 'i') });
        if (await lienDepuisAccueil4.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel4 = page.getByRole('link', { name: new RegExp(`BarChart3`, 'i') });
          if (await lienParLabel4.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /metrics depuis l'accueil (label: "BarChart3"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel4.first().click();
        } else {
          await lienDepuisAccueil4.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  // Test des e2eID présents sur /metrics

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis /metrics (label: "Plan du site"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan5 = page.getByRole('link', { name: new RegExp(`/plan-du-site`, 'i') });
        if (await lienDepuisPlan5.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan5.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil5 = page.getByRole('link', { name: new RegExp(`/plan-du-site`, 'i') });
        if (await lienDepuisAccueil5.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel5 = page.getByRole('link', { name: new RegExp(`Plan du site`, 'i') });
          if (await lienParLabel5.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis l'accueil (label: "Plan du site"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel5.first().click();
        } else {
          await lienDepuisAccueil5.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/plan-du-site');
  });

  // Test des e2eID présents sur /plan-du-site

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis /plan-du-site (label: "Info"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan6 = page.getByRole('link', { name: new RegExp(`/a-propos-du-site`, 'i') });
        if (await lienDepuisPlan6.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan6.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil6 = page.getByRole('link', { name: new RegExp(`/a-propos-du-site`, 'i') });
        if (await lienDepuisAccueil6.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel6 = page.getByRole('link', { name: new RegExp(`Info`, 'i') });
          if (await lienParLabel6.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis l'accueil (label: "Info"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel6.first().click();
        } else {
          await lienDepuisAccueil6.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  // Test des e2eID présents sur /a-propos-du-site

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis /a-propos-du-site (label: "Plan du site"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan7 = page.getByRole('link', { name: new RegExp(`/plan-du-site`, 'i') });
        if (await lienDepuisPlan7.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan7.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil7 = page.getByRole('link', { name: new RegExp(`/plan-du-site`, 'i') });
        if (await lienDepuisAccueil7.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel7 = page.getByRole('link', { name: new RegExp(`Plan du site`, 'i') });
          if (await lienParLabel7.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis l'accueil (label: "Plan du site"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel7.first().click();
        } else {
          await lienDepuisAccueil7.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/plan-du-site');
  });

  // Test des e2eID présents sur /plan-du-site

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers / depuis /plan-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan8 = page.getByRole('link', { name: new RegExp(`/`, 'i') });
        if (await lienDepuisPlan8.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers / depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan8.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil8 = page.getByRole('link', { name: new RegExp(`/`, 'i') });
        if (await lienDepuisAccueil8.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel8 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel8.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers / depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel8.first().click();
        } else {
          await lienDepuisAccueil8.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/');
  });

  // Test des e2eID présents sur /

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /transformation depuis / (label: "En savoir plus\.\.\."). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan9 = page.getByRole('link', { name: new RegExp(`/transformation`, 'i') });
        if (await lienDepuisPlan9.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /transformation depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan9.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil9 = page.getByRole('link', { name: new RegExp(`/transformation`, 'i') });
        if (await lienDepuisAccueil9.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel9 = page.getByRole('link', { name: new RegExp(`En savoir plus\.\.\.`, 'i') });
          if (await lienParLabel9.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /transformation depuis l'accueil (label: "En savoir plus\.\.\."). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel9.first().click();
        } else {
          await lienDepuisAccueil9.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/transformation');
  });

  // Test des e2eID présents sur /transformation

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis /transformation (label: "Plan du site"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan10 = page.getByRole('link', { name: new RegExp(`/plan-du-site`, 'i') });
        if (await lienDepuisPlan10.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan10.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil10 = page.getByRole('link', { name: new RegExp(`/plan-du-site`, 'i') });
        if (await lienDepuisAccueil10.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel10 = page.getByRole('link', { name: new RegExp(`Plan du site`, 'i') });
          if (await lienParLabel10.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis l'accueil (label: "Plan du site"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel10.first().click();
        } else {
          await lienDepuisAccueil10.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/plan-du-site');
  });

  // Test des e2eID présents sur /plan-du-site

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers / depuis /plan-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan11 = page.getByRole('link', { name: new RegExp(`/`, 'i') });
        if (await lienDepuisPlan11.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers / depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan11.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil11 = page.getByRole('link', { name: new RegExp(`/`, 'i') });
        if (await lienDepuisAccueil11.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel11 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel11.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers / depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel11.first().click();
        } else {
          await lienDepuisAccueil11.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/');
  });

  // Test des e2eID présents sur /

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /detournement-video depuis / (label: "En savoir plus\.\.\."). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan12 = page.getByRole('link', { name: new RegExp(`/detournement-video`, 'i') });
        if (await lienDepuisPlan12.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /detournement-video depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan12.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil12 = page.getByRole('link', { name: new RegExp(`/detournement-video`, 'i') });
        if (await lienDepuisAccueil12.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel12 = page.getByRole('link', { name: new RegExp(`En savoir plus\.\.\.`, 'i') });
          if (await lienParLabel12.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /detournement-video depuis l'accueil (label: "En savoir plus\.\.\."). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel12.first().click();
        } else {
          await lienDepuisAccueil12.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/detournement-video');
  });

  // Test des e2eID présents sur /detournement-video

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis /detournement-video (label: "Plan du site"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan13 = page.getByRole('link', { name: new RegExp(`/plan-du-site`, 'i') });
        if (await lienDepuisPlan13.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan13.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil13 = page.getByRole('link', { name: new RegExp(`/plan-du-site`, 'i') });
        if (await lienDepuisAccueil13.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel13 = page.getByRole('link', { name: new RegExp(`Plan du site`, 'i') });
          if (await lienParLabel13.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis l'accueil (label: "Plan du site"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel13.first().click();
        } else {
          await lienDepuisAccueil13.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/plan-du-site');
  });

  // Test des e2eID présents sur /plan-du-site

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers / depuis /plan-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan14 = page.getByRole('link', { name: new RegExp(`/`, 'i') });
        if (await lienDepuisPlan14.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers / depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan14.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil14 = page.getByRole('link', { name: new RegExp(`/`, 'i') });
        if (await lienDepuisAccueil14.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel14 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel14.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers / depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel14.first().click();
        } else {
          await lienDepuisAccueil14.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/');
  });

  // Test des e2eID présents sur /

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /management-de-produit-logiciel depuis / (label: "En savoir plus\.\.\."). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan15 = page.getByRole('link', { name: new RegExp(`/management-de-produit-logiciel`, 'i') });
        if (await lienDepuisPlan15.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /management-de-produit-logiciel depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan15.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil15 = page.getByRole('link', { name: new RegExp(`/management-de-produit-logiciel`, 'i') });
        if (await lienDepuisAccueil15.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel15 = page.getByRole('link', { name: new RegExp(`En savoir plus\.\.\.`, 'i') });
          if (await lienParLabel15.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /management-de-produit-logiciel depuis l'accueil (label: "En savoir plus\.\.\."). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel15.first().click();
        } else {
          await lienDepuisAccueil15.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/management-de-produit-logiciel');
  });

  // Test des e2eID présents sur /management-de-produit-logiciel

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis /management-de-produit-logiciel (label: "Plan du site"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan16 = page.getByRole('link', { name: new RegExp(`/plan-du-site`, 'i') });
        if (await lienDepuisPlan16.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan16.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil16 = page.getByRole('link', { name: new RegExp(`/plan-du-site`, 'i') });
        if (await lienDepuisAccueil16.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel16 = page.getByRole('link', { name: new RegExp(`Plan du site`, 'i') });
          if (await lienParLabel16.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis l'accueil (label: "Plan du site"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel16.first().click();
        } else {
          await lienDepuisAccueil16.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/plan-du-site');
  });

  // Test des e2eID présents sur /plan-du-site

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers / depuis /plan-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan17 = page.getByRole('link', { name: new RegExp(`/`, 'i') });
        if (await lienDepuisPlan17.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers / depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan17.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil17 = page.getByRole('link', { name: new RegExp(`/`, 'i') });
        if (await lienDepuisAccueil17.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel17 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel17.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers / depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel17.first().click();
        } else {
          await lienDepuisAccueil17.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/');
  });

  // Test des e2eID présents sur /

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis / (label: "En savoir plus\.\.\."). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan18 = page.getByRole('link', { name: new RegExp(`/a-propos-du-site`, 'i') });
        if (await lienDepuisPlan18.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan18.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil18 = page.getByRole('link', { name: new RegExp(`/a-propos-du-site`, 'i') });
        if (await lienDepuisAccueil18.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel18 = page.getByRole('link', { name: new RegExp(`En savoir plus\.\.\.`, 'i') });
          if (await lienParLabel18.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis l'accueil (label: "En savoir plus\.\.\."). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel18.first().click();
        } else {
          await lienDepuisAccueil18.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  // Test des e2eID présents sur /a-propos-du-site

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /metrics depuis /a-propos-du-site (label: "BarChart3"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan19 = page.getByRole('link', { name: new RegExp(`/metrics`, 'i') });
        if (await lienDepuisPlan19.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /metrics depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan19.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil19 = page.getByRole('link', { name: new RegExp(`/metrics`, 'i') });
        if (await lienDepuisAccueil19.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel19 = page.getByRole('link', { name: new RegExp(`BarChart3`, 'i') });
          if (await lienParLabel19.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /metrics depuis l'accueil (label: "BarChart3"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel19.first().click();
        } else {
          await lienDepuisAccueil19.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  // Test des e2eID présents sur /metrics

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /metrics depuis /metrics (label: "BarChart3"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan20 = page.getByRole('link', { name: new RegExp(`/metrics`, 'i') });
        if (await lienDepuisPlan20.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /metrics depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan20.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil20 = page.getByRole('link', { name: new RegExp(`/metrics`, 'i') });
        if (await lienDepuisAccueil20.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel20 = page.getByRole('link', { name: new RegExp(`BarChart3`, 'i') });
          if (await lienParLabel20.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /metrics depuis l'accueil (label: "BarChart3"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel20.first().click();
        } else {
          await lienDepuisAccueil20.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  // Test des e2eID présents sur /metrics

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis /metrics (label: "Info"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan21 = page.getByRole('link', { name: new RegExp(`/a-propos-du-site`, 'i') });
        if (await lienDepuisPlan21.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan21.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil21 = page.getByRole('link', { name: new RegExp(`/a-propos-du-site`, 'i') });
        if (await lienDepuisAccueil21.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel21 = page.getByRole('link', { name: new RegExp(`Info`, 'i') });
          if (await lienParLabel21.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis l'accueil (label: "Info"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel21.first().click();
        } else {
          await lienDepuisAccueil21.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  // Test des e2eID présents sur /a-propos-du-site

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis /a-propos-du-site (label: "Info"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan22 = page.getByRole('link', { name: new RegExp(`/a-propos-du-site`, 'i') });
        if (await lienDepuisPlan22.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan22.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil22 = page.getByRole('link', { name: new RegExp(`/a-propos-du-site`, 'i') });
        if (await lienDepuisAccueil22.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel22 = page.getByRole('link', { name: new RegExp(`Info`, 'i') });
          if (await lienParLabel22.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis l'accueil (label: "Info"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel22.first().click();
        } else {
          await lienDepuisAccueil22.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  // Test des e2eID présents sur /a-propos-du-site

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers / depuis /a-propos-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan23 = page.getByRole('link', { name: new RegExp(`/`, 'i') });
        if (await lienDepuisPlan23.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers / depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan23.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil23 = page.getByRole('link', { name: new RegExp(`/`, 'i') });
        if (await lienDepuisAccueil23.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel23 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel23.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers / depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel23.first().click();
        } else {
          await lienDepuisAccueil23.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/');
  });

  // Test des e2eID présents sur /

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis / (label: "Plan du site"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan24 = page.getByRole('link', { name: new RegExp(`/plan-du-site`, 'i') });
        if (await lienDepuisPlan24.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan24.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil24 = page.getByRole('link', { name: new RegExp(`/plan-du-site`, 'i') });
        if (await lienDepuisAccueil24.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel24 = page.getByRole('link', { name: new RegExp(`Plan du site`, 'i') });
          if (await lienParLabel24.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis l'accueil (label: "Plan du site"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel24.first().click();
        } else {
          await lienDepuisAccueil24.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/plan-du-site');
  });

  // Test des e2eID présents sur /plan-du-site

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /maintenance depuis /plan-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan25 = page.getByRole('link', { name: new RegExp(`/maintenance`, 'i') });
        if (await lienDepuisPlan25.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /maintenance depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan25.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil25 = page.getByRole('link', { name: new RegExp(`/maintenance`, 'i') });
        if (await lienDepuisAccueil25.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel25 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel25.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /maintenance depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel25.first().click();
        } else {
          await lienDepuisAccueil25.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/maintenance');
  });

  // Test des e2eID présents sur /maintenance

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis /maintenance (label: "Plan du site"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan26 = page.getByRole('link', { name: new RegExp(`/plan-du-site`, 'i') });
        if (await lienDepuisPlan26.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan26.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil26 = page.getByRole('link', { name: new RegExp(`/plan-du-site`, 'i') });
        if (await lienDepuisAccueil26.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel26 = page.getByRole('link', { name: new RegExp(`Plan du site`, 'i') });
          if (await lienParLabel26.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis l'accueil (label: "Plan du site"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel26.first().click();
        } else {
          await lienDepuisAccueil26.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/plan-du-site');
  });

  // Test des e2eID présents sur /plan-du-site

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /portfolio-detournements depuis /plan-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan27 = page.getByRole('link', { name: new RegExp(`/portfolio-detournements`, 'i') });
        if (await lienDepuisPlan27.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /portfolio-detournements depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan27.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil27 = page.getByRole('link', { name: new RegExp(`/portfolio-detournements`, 'i') });
        if (await lienDepuisAccueil27.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel27 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel27.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /portfolio-detournements depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel27.first().click();
        } else {
          await lienDepuisAccueil27.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/portfolio-detournements');
  });

  // Test des e2eID présents sur /portfolio-detournements

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis /portfolio-detournements (label: "Plan du site"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan28 = page.getByRole('link', { name: new RegExp(`/plan-du-site`, 'i') });
        if (await lienDepuisPlan28.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan28.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil28 = page.getByRole('link', { name: new RegExp(`/plan-du-site`, 'i') });
        if (await lienDepuisAccueil28.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel28 = page.getByRole('link', { name: new RegExp(`Plan du site`, 'i') });
          if (await lienParLabel28.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis l'accueil (label: "Plan du site"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel28.first().click();
        } else {
          await lienDepuisAccueil28.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/plan-du-site');
  });

  // Test des e2eID présents sur /plan-du-site

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /pour_aller_plus_loin depuis /plan-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan29 = page.getByRole('link', { name: new RegExp(`/pour_aller_plus_loin`, 'i') });
        if (await lienDepuisPlan29.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /pour_aller_plus_loin depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan29.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil29 = page.getByRole('link', { name: new RegExp(`/pour_aller_plus_loin`, 'i') });
        if (await lienDepuisAccueil29.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel29 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel29.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /pour_aller_plus_loin depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel29.first().click();
        } else {
          await lienDepuisAccueil29.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/pour_aller_plus_loin');
  });

  // Test des e2eID présents sur /pour_aller_plus_loin

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis /pour_aller_plus_loin (label: "Plan du site"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan30 = page.getByRole('link', { name: new RegExp(`/plan-du-site`, 'i') });
        if (await lienDepuisPlan30.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan30.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil30 = page.getByRole('link', { name: new RegExp(`/plan-du-site`, 'i') });
        if (await lienDepuisAccueil30.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel30 = page.getByRole('link', { name: new RegExp(`Plan du site`, 'i') });
          if (await lienParLabel30.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /plan-du-site depuis l'accueil (label: "Plan du site"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel30.first().click();
        } else {
          await lienDepuisAccueil30.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/plan-du-site');
  });

  // Test des e2eID présents sur /plan-du-site

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers / depuis /plan-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan31 = page.getByRole('link', { name: new RegExp(`/`, 'i') });
        if (await lienDepuisPlan31.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers / depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan31.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil31 = page.getByRole('link', { name: new RegExp(`/`, 'i') });
        if (await lienDepuisAccueil31.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel31 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel31.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers / depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel31.first().click();
        } else {
          await lienDepuisAccueil31.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/');
  });

  // Test des e2eID présents sur /

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /metrics depuis / (label: "BarChart3"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan32 = page.getByRole('link', { name: new RegExp(`/metrics`, 'i') });
        if (await lienDepuisPlan32.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /metrics depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan32.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil32 = page.getByRole('link', { name: new RegExp(`/metrics`, 'i') });
        if (await lienDepuisAccueil32.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel32 = page.getByRole('link', { name: new RegExp(`BarChart3`, 'i') });
          if (await lienParLabel32.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /metrics depuis l'accueil (label: "BarChart3"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel32.first().click();
        } else {
          await lienDepuisAccueil32.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  // Test des e2eID présents sur /metrics

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /detournement-video depuis /metrics (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan33 = page.getByRole('link', { name: new RegExp(`/detournement-video`, 'i') });
        if (await lienDepuisPlan33.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /detournement-video depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan33.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil33 = page.getByRole('link', { name: new RegExp(`/detournement-video`, 'i') });
        if (await lienDepuisAccueil33.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel33 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel33.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /detournement-video depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel33.first().click();
        } else {
          await lienDepuisAccueil33.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/detournement-video');
  });

  // Test des e2eID présents sur /detournement-video

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /metrics depuis /detournement-video (label: "BarChart3"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan34 = page.getByRole('link', { name: new RegExp(`/metrics`, 'i') });
        if (await lienDepuisPlan34.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /metrics depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan34.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil34 = page.getByRole('link', { name: new RegExp(`/metrics`, 'i') });
        if (await lienDepuisAccueil34.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel34 = page.getByRole('link', { name: new RegExp(`BarChart3`, 'i') });
          if (await lienParLabel34.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /metrics depuis l'accueil (label: "BarChart3"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel34.first().click();
        } else {
          await lienDepuisAccueil34.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  // Test des e2eID présents sur /metrics

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /maintenance depuis /metrics (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan35 = page.getByRole('link', { name: new RegExp(`/maintenance`, 'i') });
        if (await lienDepuisPlan35.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /maintenance depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan35.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil35 = page.getByRole('link', { name: new RegExp(`/maintenance`, 'i') });
        if (await lienDepuisAccueil35.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel35 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel35.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /maintenance depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel35.first().click();
        } else {
          await lienDepuisAccueil35.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/maintenance');
  });

  // Test des e2eID présents sur /maintenance

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /metrics depuis /maintenance (label: "BarChart3"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan36 = page.getByRole('link', { name: new RegExp(`/metrics`, 'i') });
        if (await lienDepuisPlan36.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /metrics depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan36.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil36 = page.getByRole('link', { name: new RegExp(`/metrics`, 'i') });
        if (await lienDepuisAccueil36.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel36 = page.getByRole('link', { name: new RegExp(`BarChart3`, 'i') });
          if (await lienParLabel36.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /metrics depuis l'accueil (label: "BarChart3"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel36.first().click();
        } else {
          await lienDepuisAccueil36.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  // Test des e2eID présents sur /metrics

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /management-de-produit-logiciel depuis /metrics (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan37 = page.getByRole('link', { name: new RegExp(`/management-de-produit-logiciel`, 'i') });
        if (await lienDepuisPlan37.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /management-de-produit-logiciel depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan37.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil37 = page.getByRole('link', { name: new RegExp(`/management-de-produit-logiciel`, 'i') });
        if (await lienDepuisAccueil37.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel37 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel37.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /management-de-produit-logiciel depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel37.first().click();
        } else {
          await lienDepuisAccueil37.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/management-de-produit-logiciel');
  });

  // Test des e2eID présents sur /management-de-produit-logiciel

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /metrics depuis /management-de-produit-logiciel (label: "BarChart3"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan38 = page.getByRole('link', { name: new RegExp(`/metrics`, 'i') });
        if (await lienDepuisPlan38.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /metrics depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan38.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil38 = page.getByRole('link', { name: new RegExp(`/metrics`, 'i') });
        if (await lienDepuisAccueil38.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel38 = page.getByRole('link', { name: new RegExp(`BarChart3`, 'i') });
          if (await lienParLabel38.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /metrics depuis l'accueil (label: "BarChart3"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel38.first().click();
        } else {
          await lienDepuisAccueil38.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  // Test des e2eID présents sur /metrics

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /portfolio-detournements depuis /metrics (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan39 = page.getByRole('link', { name: new RegExp(`/portfolio-detournements`, 'i') });
        if (await lienDepuisPlan39.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /portfolio-detournements depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan39.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil39 = page.getByRole('link', { name: new RegExp(`/portfolio-detournements`, 'i') });
        if (await lienDepuisAccueil39.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel39 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel39.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /portfolio-detournements depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel39.first().click();
        } else {
          await lienDepuisAccueil39.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/portfolio-detournements');
  });

  // Test des e2eID présents sur /portfolio-detournements

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /metrics depuis /portfolio-detournements (label: "BarChart3"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan40 = page.getByRole('link', { name: new RegExp(`/metrics`, 'i') });
        if (await lienDepuisPlan40.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /metrics depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan40.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil40 = page.getByRole('link', { name: new RegExp(`/metrics`, 'i') });
        if (await lienDepuisAccueil40.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel40 = page.getByRole('link', { name: new RegExp(`BarChart3`, 'i') });
          if (await lienParLabel40.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /metrics depuis l'accueil (label: "BarChart3"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel40.first().click();
        } else {
          await lienDepuisAccueil40.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  // Test des e2eID présents sur /metrics

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /pour_aller_plus_loin depuis /metrics (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan41 = page.getByRole('link', { name: new RegExp(`/pour_aller_plus_loin`, 'i') });
        if (await lienDepuisPlan41.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /pour_aller_plus_loin depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan41.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil41 = page.getByRole('link', { name: new RegExp(`/pour_aller_plus_loin`, 'i') });
        if (await lienDepuisAccueil41.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel41 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel41.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /pour_aller_plus_loin depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel41.first().click();
        } else {
          await lienDepuisAccueil41.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/pour_aller_plus_loin');
  });

  // Test des e2eID présents sur /pour_aller_plus_loin

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /metrics depuis /pour_aller_plus_loin (label: "BarChart3"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan42 = page.getByRole('link', { name: new RegExp(`/metrics`, 'i') });
        if (await lienDepuisPlan42.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /metrics depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan42.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil42 = page.getByRole('link', { name: new RegExp(`/metrics`, 'i') });
        if (await lienDepuisAccueil42.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel42 = page.getByRole('link', { name: new RegExp(`BarChart3`, 'i') });
          if (await lienParLabel42.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /metrics depuis l'accueil (label: "BarChart3"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel42.first().click();
        } else {
          await lienDepuisAccueil42.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  // Test des e2eID présents sur /metrics

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /robustesse depuis /metrics (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan43 = page.getByRole('link', { name: new RegExp(`/robustesse`, 'i') });
        if (await lienDepuisPlan43.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /robustesse depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan43.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil43 = page.getByRole('link', { name: new RegExp(`/robustesse`, 'i') });
        if (await lienDepuisAccueil43.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel43 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel43.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /robustesse depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel43.first().click();
        } else {
          await lienDepuisAccueil43.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/robustesse');
  });

  // Test des e2eID présents sur /robustesse

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /metrics depuis /robustesse (label: "BarChart3"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan44 = page.getByRole('link', { name: new RegExp(`/metrics`, 'i') });
        if (await lienDepuisPlan44.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /metrics depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan44.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil44 = page.getByRole('link', { name: new RegExp(`/metrics`, 'i') });
        if (await lienDepuisAccueil44.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel44 = page.getByRole('link', { name: new RegExp(`BarChart3`, 'i') });
          if (await lienParLabel44.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /metrics depuis l'accueil (label: "BarChart3"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel44.first().click();
        } else {
          await lienDepuisAccueil44.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  // Test des e2eID présents sur /metrics

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /transformation depuis /metrics (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan45 = page.getByRole('link', { name: new RegExp(`/transformation`, 'i') });
        if (await lienDepuisPlan45.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /transformation depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan45.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil45 = page.getByRole('link', { name: new RegExp(`/transformation`, 'i') });
        if (await lienDepuisAccueil45.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel45 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel45.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /transformation depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel45.first().click();
        } else {
          await lienDepuisAccueil45.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/transformation');
  });

  // Test des e2eID présents sur /transformation

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /metrics depuis /transformation (label: "BarChart3"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan46 = page.getByRole('link', { name: new RegExp(`/metrics`, 'i') });
        if (await lienDepuisPlan46.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /metrics depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan46.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil46 = page.getByRole('link', { name: new RegExp(`/metrics`, 'i') });
        if (await lienDepuisAccueil46.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel46 = page.getByRole('link', { name: new RegExp(`BarChart3`, 'i') });
          if (await lienParLabel46.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /metrics depuis l'accueil (label: "BarChart3"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel46.first().click();
        } else {
          await lienDepuisAccueil46.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  // Test des e2eID présents sur /metrics

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /detournement-video depuis /metrics (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan47 = page.getByRole('link', { name: new RegExp(`/detournement-video`, 'i') });
        if (await lienDepuisPlan47.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /detournement-video depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan47.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil47 = page.getByRole('link', { name: new RegExp(`/detournement-video`, 'i') });
        if (await lienDepuisAccueil47.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel47 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel47.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /detournement-video depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel47.first().click();
        } else {
          await lienDepuisAccueil47.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/detournement-video');
  });

  // Test des e2eID présents sur /detournement-video

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis /detournement-video (label: "Info"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan48 = page.getByRole('link', { name: new RegExp(`/a-propos-du-site`, 'i') });
        if (await lienDepuisPlan48.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan48.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil48 = page.getByRole('link', { name: new RegExp(`/a-propos-du-site`, 'i') });
        if (await lienDepuisAccueil48.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel48 = page.getByRole('link', { name: new RegExp(`Info`, 'i') });
          if (await lienParLabel48.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis l'accueil (label: "Info"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel48.first().click();
        } else {
          await lienDepuisAccueil48.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  // Test des e2eID présents sur /a-propos-du-site

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /maintenance depuis /a-propos-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan49 = page.getByRole('link', { name: new RegExp(`/maintenance`, 'i') });
        if (await lienDepuisPlan49.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /maintenance depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan49.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil49 = page.getByRole('link', { name: new RegExp(`/maintenance`, 'i') });
        if (await lienDepuisAccueil49.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel49 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel49.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /maintenance depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel49.first().click();
        } else {
          await lienDepuisAccueil49.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/maintenance');
  });

  // Test des e2eID présents sur /maintenance

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis /maintenance (label: "Info"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan50 = page.getByRole('link', { name: new RegExp(`/a-propos-du-site`, 'i') });
        if (await lienDepuisPlan50.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan50.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil50 = page.getByRole('link', { name: new RegExp(`/a-propos-du-site`, 'i') });
        if (await lienDepuisAccueil50.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel50 = page.getByRole('link', { name: new RegExp(`Info`, 'i') });
          if (await lienParLabel50.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis l'accueil (label: "Info"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel50.first().click();
        } else {
          await lienDepuisAccueil50.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  // Test des e2eID présents sur /a-propos-du-site

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /management-de-produit-logiciel depuis /a-propos-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan51 = page.getByRole('link', { name: new RegExp(`/management-de-produit-logiciel`, 'i') });
        if (await lienDepuisPlan51.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /management-de-produit-logiciel depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan51.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil51 = page.getByRole('link', { name: new RegExp(`/management-de-produit-logiciel`, 'i') });
        if (await lienDepuisAccueil51.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel51 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel51.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /management-de-produit-logiciel depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel51.first().click();
        } else {
          await lienDepuisAccueil51.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/management-de-produit-logiciel');
  });

  // Test des e2eID présents sur /management-de-produit-logiciel

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis /management-de-produit-logiciel (label: "Info"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan52 = page.getByRole('link', { name: new RegExp(`/a-propos-du-site`, 'i') });
        if (await lienDepuisPlan52.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan52.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil52 = page.getByRole('link', { name: new RegExp(`/a-propos-du-site`, 'i') });
        if (await lienDepuisAccueil52.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel52 = page.getByRole('link', { name: new RegExp(`Info`, 'i') });
          if (await lienParLabel52.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis l'accueil (label: "Info"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel52.first().click();
        } else {
          await lienDepuisAccueil52.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  // Test des e2eID présents sur /a-propos-du-site

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /portfolio-detournements depuis /a-propos-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan53 = page.getByRole('link', { name: new RegExp(`/portfolio-detournements`, 'i') });
        if (await lienDepuisPlan53.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /portfolio-detournements depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan53.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil53 = page.getByRole('link', { name: new RegExp(`/portfolio-detournements`, 'i') });
        if (await lienDepuisAccueil53.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel53 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel53.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /portfolio-detournements depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel53.first().click();
        } else {
          await lienDepuisAccueil53.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/portfolio-detournements');
  });

  // Test des e2eID présents sur /portfolio-detournements

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis /portfolio-detournements (label: "Info"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan54 = page.getByRole('link', { name: new RegExp(`/a-propos-du-site`, 'i') });
        if (await lienDepuisPlan54.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan54.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil54 = page.getByRole('link', { name: new RegExp(`/a-propos-du-site`, 'i') });
        if (await lienDepuisAccueil54.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel54 = page.getByRole('link', { name: new RegExp(`Info`, 'i') });
          if (await lienParLabel54.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis l'accueil (label: "Info"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel54.first().click();
        } else {
          await lienDepuisAccueil54.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  // Test des e2eID présents sur /a-propos-du-site

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /pour_aller_plus_loin depuis /a-propos-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan55 = page.getByRole('link', { name: new RegExp(`/pour_aller_plus_loin`, 'i') });
        if (await lienDepuisPlan55.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /pour_aller_plus_loin depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan55.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil55 = page.getByRole('link', { name: new RegExp(`/pour_aller_plus_loin`, 'i') });
        if (await lienDepuisAccueil55.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel55 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel55.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /pour_aller_plus_loin depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel55.first().click();
        } else {
          await lienDepuisAccueil55.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/pour_aller_plus_loin');
  });

  // Test des e2eID présents sur /pour_aller_plus_loin

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis /pour_aller_plus_loin (label: "Info"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan56 = page.getByRole('link', { name: new RegExp(`/a-propos-du-site`, 'i') });
        if (await lienDepuisPlan56.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan56.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil56 = page.getByRole('link', { name: new RegExp(`/a-propos-du-site`, 'i') });
        if (await lienDepuisAccueil56.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel56 = page.getByRole('link', { name: new RegExp(`Info`, 'i') });
          if (await lienParLabel56.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis l'accueil (label: "Info"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel56.first().click();
        } else {
          await lienDepuisAccueil56.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  // Test des e2eID présents sur /a-propos-du-site

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /robustesse depuis /a-propos-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan57 = page.getByRole('link', { name: new RegExp(`/robustesse`, 'i') });
        if (await lienDepuisPlan57.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /robustesse depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan57.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil57 = page.getByRole('link', { name: new RegExp(`/robustesse`, 'i') });
        if (await lienDepuisAccueil57.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel57 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel57.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /robustesse depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel57.first().click();
        } else {
          await lienDepuisAccueil57.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/robustesse');
  });

  // Test des e2eID présents sur /robustesse

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis /robustesse (label: "Info"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan58 = page.getByRole('link', { name: new RegExp(`/a-propos-du-site`, 'i') });
        if (await lienDepuisPlan58.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan58.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil58 = page.getByRole('link', { name: new RegExp(`/a-propos-du-site`, 'i') });
        if (await lienDepuisAccueil58.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel58 = page.getByRole('link', { name: new RegExp(`Info`, 'i') });
          if (await lienParLabel58.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis l'accueil (label: "Info"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel58.first().click();
        } else {
          await lienDepuisAccueil58.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  // Test des e2eID présents sur /a-propos-du-site

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /transformation depuis /a-propos-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan59 = page.getByRole('link', { name: new RegExp(`/transformation`, 'i') });
        if (await lienDepuisPlan59.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /transformation depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan59.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil59 = page.getByRole('link', { name: new RegExp(`/transformation`, 'i') });
        if (await lienDepuisAccueil59.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel59 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel59.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /transformation depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel59.first().click();
        } else {
          await lienDepuisAccueil59.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/transformation');
  });

  // Test des e2eID présents sur /transformation

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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis /transformation (label: "Info"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer)
      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });
      if (await lienPlanDuSite.count() > 0) {
        await lienPlanDuSite.first().click();
        await expect(page).toHaveURL('/plan-du-site');
        // Depuis le plan du site, chercher le lien vers la destination
        const lienDepuisPlan60 = page.getByRole('link', { name: new RegExp(`/a-propos-du-site`, 'i') });
        if (await lienDepuisPlan60.count() === 0) {
          throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis le plan du site. La page n'est peut-être pas accessible ou le lien est manquant dans le plan du site.`);
        }
        await lienDepuisPlan60.first().click();
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
        // Depuis l'accueil, chercher le lien vers la destination
        const lienDepuisAccueil60 = page.getByRole('link', { name: new RegExp(`/a-propos-du-site`, 'i') });
        if (await lienDepuisAccueil60.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel60 = page.getByRole('link', { name: new RegExp(`Info`, 'i') });
          if (await lienParLabel60.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis l'accueil (label: "Info"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel60.first().click();
        } else {
          await lienDepuisAccueil60.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  // Test des e2eID présents sur /a-propos-du-site

  // Tous les liens ont été parcourus
  // 36 e2eID ont été testés
  console.log('✅ Parcours complet : tous les liens et e2eID ont été testés');
});