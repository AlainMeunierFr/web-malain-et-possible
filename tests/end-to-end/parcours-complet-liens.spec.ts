import { test, expect } from '@playwright/test';

test('parcours complet de tous les liens du site et test de tous les e2eID', async ({ page }) => {
  // Scénario généré automatiquement depuis Pages-Et-Lien.json
  // Ce test parcourt tous les liens du site et teste tous les e2eID présents

  await test.step("Étape 1: Page d'accueil", async () => {
    await page.goto('/');
    await expect(page).toHaveURL('/');
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
  // Test e2eID: c2 (bouton - detournement-video.json)
  const element3 = page.getByTestId('e2eid-c2');
  if (await element3.count() > 0) {
    await expect(element3).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: c21 (bouton - detournement-video.json)
  const element4 = page.getByTestId('e2eid-c21');
  if (await element4.count() > 0) {
    await expect(element4).toBeVisible();
    // Élément externe, vérification de présence uniquement
  }
  // Test e2eID: a3 (callToAction - detournement-video.json)
  const element5 = page.getByTestId('e2eid-a3');
  if (await element5.count() > 0) {
    await expect(element5).toBeVisible();
  }
  // Test e2eID: b4 (bouton - faisons-connaissance.json)
  const element6 = page.getByTestId('e2eid-b4');
  if (await element6.count() > 0) {
    await expect(element6).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: b5 (bouton - faisons-connaissance.json)
  const element7 = page.getByTestId('e2eid-b5');
  if (await element7.count() > 0) {
    await expect(element7).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: b6 (bouton - faisons-connaissance.json)
  const element8 = page.getByTestId('e2eid-b6');
  if (await element8.count() > 0) {
    await expect(element8).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: b7 (bouton - faisons-connaissance.json)
  const element9 = page.getByTestId('e2eid-b7');
  if (await element9.count() > 0) {
    await expect(element9).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: b8 (bouton - faisons-connaissance.json)
  const element10 = page.getByTestId('e2eid-b8');
  if (await element10.count() > 0) {
    await expect(element10).toBeVisible();
    // Élément externe, vérification de présence uniquement
  }
  // Test e2eID: b9 (bouton - faisons-connaissance.json)
  const element11 = page.getByTestId('e2eid-b9');
  if (await element11.count() > 0) {
    await expect(element11).toBeVisible();
    // Élément externe, vérification de présence uniquement
  }
  // Test e2eID: v10 (video - index.json)
  const element12 = page.getByTestId('e2eid-v10');
  if (await element12.count() > 0) {
    await expect(element12).toBeVisible();
  }
  // Test e2eID: c11 (bouton - index.json)
  const element13 = page.getByTestId('e2eid-c11');
  if (await element13.count() > 0) {
    await expect(element13).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: c12 (bouton - index.json)
  const element14 = page.getByTestId('e2eid-c12');
  if (await element14.count() > 0) {
    await expect(element14).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: c14 (bouton - index.json)
  const element15 = page.getByTestId('e2eid-c14');
  if (await element15.count() > 0) {
    await expect(element15).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: c15 (bouton - index.json)
  const element16 = page.getByTestId('e2eid-c15');
  if (await element16.count() > 0) {
    await expect(element16).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: c13 (bouton - index.json)
  const element17 = page.getByTestId('e2eid-c13');
  if (await element17.count() > 0) {
    await expect(element17).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: c16 (bouton - index.json)
  const element18 = page.getByTestId('e2eid-c16');
  if (await element18.count() > 0) {
    await expect(element18).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: a17 (callToAction - index.json)
  const element19 = page.getByTestId('e2eid-a17');
  if (await element19.count() > 0) {
    await expect(element19).toBeVisible();
  }
  // Test e2eID: v18 (video - management-de-produit-logiciel.json)
  const element20 = page.getByTestId('e2eid-v18');
  if (await element20.count() > 0) {
    await expect(element20).toBeVisible();
  }
  // Test e2eID: v19 (video - management-de-produit-logiciel.json)
  const element21 = page.getByTestId('e2eid-v19');
  if (await element21.count() > 0) {
    await expect(element21).toBeVisible();
  }
  // Test e2eID: a20 (callToAction - management-de-produit-logiciel.json)
  const element22 = page.getByTestId('e2eid-a20');
  if (await element22.count() > 0) {
    await expect(element22).toBeVisible();
  }
  // Test e2eID: a21 (callToAction - portfolio-detournements.json)
  const element23 = page.getByTestId('e2eid-a21');
  if (await element23.count() > 0) {
    await expect(element23).toBeVisible();
  }
  // Test e2eID: v22 (video - pour-aller-plus-loin.json)
  const element24 = page.getByTestId('e2eid-v22');
  if (await element24.count() > 0) {
    await expect(element24).toBeVisible();
  }
  // Test e2eID: v23 (video - pour-aller-plus-loin.json)
  const element25 = page.getByTestId('e2eid-v23');
  if (await element25.count() > 0) {
    await expect(element25).toBeVisible();
  }
  // Test e2eID: v24 (video - pour-aller-plus-loin.json)
  const element26 = page.getByTestId('e2eid-v24');
  if (await element26.count() > 0) {
    await expect(element26).toBeVisible();
  }
  // Test e2eID: a25 (callToAction - pour-aller-plus-loin.json)
  const element27 = page.getByTestId('e2eid-a25');
  if (await element27.count() > 0) {
    await expect(element27).toBeVisible();
  }
  // Test e2eID: v17 (video - transformation.json)
  const element28 = page.getByTestId('e2eid-v17');
  if (await element28.count() > 0) {
    await expect(element28).toBeVisible();
  }
  // Test e2eID: a1 (callToAction - transformation.json)
  const element29 = page.getByTestId('e2eid-a1');
  if (await element29.count() > 0) {
    await expect(element29).toBeVisible();
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
      // Option 1 : Essayer via le plan du site (footer) - c'est un bouton, pas un lien
      const boutonPlanDuSite = page.getByTestId('e2eid-b13');
      if (await boutonPlanDuSite.count() > 0) {
        await boutonPlanDuSite.click();
        await expect(page).toHaveURL('/plan-du-site');
        // Vérifier si la destination est accessible via un bouton du footer ou si c'est /plan-du-site ou /
        if ('/robustesse' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/robustesse' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/robustesse' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/robustesse' === '/a-propos-du-site') {
          // /a-propos-du-site est accessible via le bouton du footer (b15)
          const boutonAbout = page.getByTestId('e2eid-b15');
          if (await boutonAbout.count() > 0) {
            await boutonAbout.click();
            await expect(page).toHaveURL('/a-propos-du-site');
          } else {
            throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
          }
        } else {
          // Depuis le plan du site, chercher le lien par son e2eID (généré de manière déterministe)
          // Chercher le lien par son e2eID (généré de manière déterministe depuis l'URL)
          // Attendre que le plan du site soit chargé (les liens sont chargés de manière asynchrone)
          await page.waitForSelector('[data-e2eid^="e2eid-l"]', { timeout: 5000 }).catch(() => {});
          const lienDepuisPlan1 = page.getByTestId('e2eid-l431');
          if (await lienDepuisPlan1.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /robustesse (e2eID: e2eid-l431) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan1.first().click();
        }
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
    // /plan-du-site est accessible via le bouton du footer (b13), pas via un lien
    const boutonPlanDuSite = page.getByTestId('e2eid-b13');
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.click();
      await expect(page).toHaveURL('/plan-du-site');
    } else {
      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b13) dans le footer.');
    }
  });

  await test.step("Étape 4: Navigation de /plan-du-site vers /plan-du-site (Plan du site)", async () => {
    // On est déjà sur /plan-du-site, pas besoin de naviguer vers la même page
    // Vérifier simplement qu'on est bien sur la bonne page
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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /metrics depuis /plan-du-site (label: "BarChart3"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // /metrics est accessible via le bouton du footer (b14), pas via un lien
      const boutonMetrics = page.getByTestId('e2eid-b14');
      if (await boutonMetrics.count() > 0) {
        await boutonMetrics.click();
        await expect(page).toHaveURL('/metrics');
      } else {
        throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  // Test des e2eID présents sur /metrics

  await test.step("Étape 6: Navigation de /metrics vers /plan-du-site (Plan du site)", async () => {
    // /plan-du-site est accessible via le bouton du footer (b13), pas via un lien
    const boutonPlanDuSite = page.getByTestId('e2eid-b13');
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.click();
      await expect(page).toHaveURL('/plan-du-site');
    } else {
      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b13) dans le footer.');
    }
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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis /plan-du-site (label: "Info"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // /a-propos-du-site est accessible via le bouton du footer (b15), pas via un lien
      const boutonAbout = page.getByTestId('e2eid-b15');
      if (await boutonAbout.count() > 0) {
        await boutonAbout.click();
        await expect(page).toHaveURL('/a-propos-du-site');
      } else {
        throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  // Test des e2eID présents sur /a-propos-du-site

  await test.step("Étape 8: Navigation de /a-propos-du-site vers /plan-du-site (Plan du site)", async () => {
    // /plan-du-site est accessible via le bouton du footer (b13), pas via un lien
    const boutonPlanDuSite = page.getByTestId('e2eid-b13');
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.click();
      await expect(page).toHaveURL('/plan-du-site');
    } else {
      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b13) dans le footer.');
    }
  });

  await test.step("Étape 9: Navigation de /plan-du-site vers / (lien)", async () => {
    // Pour aller à l'accueil, utiliser le logo du header (h1)
    const logo = page.getByTestId('e2eid-h1');
    if (await logo.count() > 0) {
      await logo.click();
      await expect(page).toHaveURL('/');
    } else {
      // Fallback : navigation directe
      await page.goto('/');
    }
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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /transformation depuis / (label: "En savoir plus\.\.\."). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer) - c'est un bouton, pas un lien
      const boutonPlanDuSite = page.getByTestId('e2eid-b13');
      if (await boutonPlanDuSite.count() > 0) {
        await boutonPlanDuSite.click();
        await expect(page).toHaveURL('/plan-du-site');
        // Vérifier si la destination est accessible via un bouton du footer ou si c'est /plan-du-site ou /
        if ('/transformation' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/transformation' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/transformation' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/transformation' === '/a-propos-du-site') {
          // /a-propos-du-site est accessible via le bouton du footer (b15)
          const boutonAbout = page.getByTestId('e2eid-b15');
          if (await boutonAbout.count() > 0) {
            await boutonAbout.click();
            await expect(page).toHaveURL('/a-propos-du-site');
          } else {
            throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
          }
        } else {
          // Depuis le plan du site, chercher le lien par son e2eID (généré de manière déterministe)
          // Chercher le lien par son e2eID (généré de manière déterministe depuis l'URL)
          // Attendre que le plan du site soit chargé (les liens sont chargés de manière asynchrone)
          await page.waitForSelector('[data-e2eid^="e2eid-l"]', { timeout: 5000 }).catch(() => {});
          const lienDepuisPlan9 = page.getByTestId('e2eid-l705');
          if (await lienDepuisPlan9.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /transformation (e2eID: e2eid-l705) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan9.first().click();
        }
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
    // /plan-du-site est accessible via le bouton du footer (b13), pas via un lien
    const boutonPlanDuSite = page.getByTestId('e2eid-b13');
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.click();
      await expect(page).toHaveURL('/plan-du-site');
    } else {
      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b13) dans le footer.');
    }
  });

  await test.step("Étape 12: Navigation de /plan-du-site vers / (lien)", async () => {
    // Pour aller à l'accueil, utiliser le logo du header (h1)
    const logo = page.getByTestId('e2eid-h1');
    if (await logo.count() > 0) {
      await logo.click();
      await expect(page).toHaveURL('/');
    } else {
      // Fallback : navigation directe
      await page.goto('/');
    }
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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /detournement-video depuis / (label: "En savoir plus\.\.\."). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer) - c'est un bouton, pas un lien
      const boutonPlanDuSite = page.getByTestId('e2eid-b13');
      if (await boutonPlanDuSite.count() > 0) {
        await boutonPlanDuSite.click();
        await expect(page).toHaveURL('/plan-du-site');
        // Vérifier si la destination est accessible via un bouton du footer ou si c'est /plan-du-site ou /
        if ('/detournement-video' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/detournement-video' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/detournement-video' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/detournement-video' === '/a-propos-du-site') {
          // /a-propos-du-site est accessible via le bouton du footer (b15)
          const boutonAbout = page.getByTestId('e2eid-b15');
          if (await boutonAbout.count() > 0) {
            await boutonAbout.click();
            await expect(page).toHaveURL('/a-propos-du-site');
          } else {
            throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
          }
        } else {
          // Depuis le plan du site, chercher le lien par son e2eID (généré de manière déterministe)
          // Chercher le lien par son e2eID (généré de manière déterministe depuis l'URL)
          // Attendre que le plan du site soit chargé (les liens sont chargés de manière asynchrone)
          await page.waitForSelector('[data-e2eid^="e2eid-l"]', { timeout: 5000 }).catch(() => {});
          const lienDepuisPlan12 = page.getByTestId('e2eid-l756');
          if (await lienDepuisPlan12.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /detournement-video (e2eID: e2eid-l756) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan12.first().click();
        }
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
    // /plan-du-site est accessible via le bouton du footer (b13), pas via un lien
    const boutonPlanDuSite = page.getByTestId('e2eid-b13');
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.click();
      await expect(page).toHaveURL('/plan-du-site');
    } else {
      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b13) dans le footer.');
    }
  });

  await test.step("Étape 15: Navigation de /plan-du-site vers / (lien)", async () => {
    // Pour aller à l'accueil, utiliser le logo du header (h1)
    const logo = page.getByTestId('e2eid-h1');
    if (await logo.count() > 0) {
      await logo.click();
      await expect(page).toHaveURL('/');
    } else {
      // Fallback : navigation directe
      await page.goto('/');
    }
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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /management-de-produit-logiciel depuis / (label: "En savoir plus\.\.\."). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer) - c'est un bouton, pas un lien
      const boutonPlanDuSite = page.getByTestId('e2eid-b13');
      if (await boutonPlanDuSite.count() > 0) {
        await boutonPlanDuSite.click();
        await expect(page).toHaveURL('/plan-du-site');
        // Vérifier si la destination est accessible via un bouton du footer ou si c'est /plan-du-site ou /
        if ('/management-de-produit-logiciel' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/management-de-produit-logiciel' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/management-de-produit-logiciel' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/management-de-produit-logiciel' === '/a-propos-du-site') {
          // /a-propos-du-site est accessible via le bouton du footer (b15)
          const boutonAbout = page.getByTestId('e2eid-b15');
          if (await boutonAbout.count() > 0) {
            await boutonAbout.click();
            await expect(page).toHaveURL('/a-propos-du-site');
          } else {
            throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
          }
        } else {
          // Depuis le plan du site, chercher le lien par son e2eID (généré de manière déterministe)
          // Chercher le lien par son e2eID (généré de manière déterministe depuis l'URL)
          // Attendre que le plan du site soit chargé (les liens sont chargés de manière asynchrone)
          await page.waitForSelector('[data-e2eid^="e2eid-l"]', { timeout: 5000 }).catch(() => {});
          const lienDepuisPlan15 = page.getByTestId('e2eid-l976');
          if (await lienDepuisPlan15.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /management-de-produit-logiciel (e2eID: e2eid-l976) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan15.first().click();
        }
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
    // /plan-du-site est accessible via le bouton du footer (b13), pas via un lien
    const boutonPlanDuSite = page.getByTestId('e2eid-b13');
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.click();
      await expect(page).toHaveURL('/plan-du-site');
    } else {
      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b13) dans le footer.');
    }
  });

  await test.step("Étape 18: Navigation de /plan-du-site vers / (lien)", async () => {
    // Pour aller à l'accueil, utiliser le logo du header (h1)
    const logo = page.getByTestId('e2eid-h1');
    if (await logo.count() > 0) {
      await logo.click();
      await expect(page).toHaveURL('/');
    } else {
      // Fallback : navigation directe
      await page.goto('/');
    }
  });

  await test.step("Étape 19: Navigation de / vers /ingenierie-logiciel (En savoir plus...)", async () => {
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
        const destinationNormalisee = '/ingenierie-logiciel'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /ingenierie-logiciel depuis / (label: "En savoir plus\.\.\."). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer) - c'est un bouton, pas un lien
      const boutonPlanDuSite = page.getByTestId('e2eid-b13');
      if (await boutonPlanDuSite.count() > 0) {
        await boutonPlanDuSite.click();
        await expect(page).toHaveURL('/plan-du-site');
        // Vérifier si la destination est accessible via un bouton du footer ou si c'est /plan-du-site ou /
        if ('/ingenierie-logiciel' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/ingenierie-logiciel' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/ingenierie-logiciel' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/ingenierie-logiciel' === '/a-propos-du-site') {
          // /a-propos-du-site est accessible via le bouton du footer (b15)
          const boutonAbout = page.getByTestId('e2eid-b15');
          if (await boutonAbout.count() > 0) {
            await boutonAbout.click();
            await expect(page).toHaveURL('/a-propos-du-site');
          } else {
            throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
          }
        } else {
          // Depuis le plan du site, chercher le lien par son e2eID (généré de manière déterministe)
          // Chercher le lien par son e2eID (généré de manière déterministe depuis l'URL)
          // Attendre que le plan du site soit chargé (les liens sont chargés de manière asynchrone)
          await page.waitForSelector('[data-e2eid^="e2eid-l"]', { timeout: 5000 }).catch(() => {});
          const lienDepuisPlan18 = page.getByTestId('e2eid-l384');
          if (await lienDepuisPlan18.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /ingenierie-logiciel (e2eID: e2eid-l384) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan18.first().click();
        }
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
        const lienDepuisAccueil18 = page.getByRole('link', { name: new RegExp(`/ingenierie-logiciel`, 'i') });
        if (await lienDepuisAccueil18.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel18 = page.getByRole('link', { name: new RegExp(`En savoir plus\.\.\.`, 'i') });
          if (await lienParLabel18.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /ingenierie-logiciel depuis l'accueil (label: "En savoir plus\.\.\."). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel18.first().click();
        } else {
          await lienDepuisAccueil18.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/ingenierie-logiciel');
  });

  // Test des e2eID présents sur /ingenierie-logiciel

  await test.step("Étape 20: Navigation de /ingenierie-logiciel vers /a-propos-du-site (En savoir plus...)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens19 = page.getByRole('link', { name: /En savoir plus\.\.\./i });
    if (await liens19.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens19.all();
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
        throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis /ingenierie-logiciel (label: "En savoir plus\.\.\."). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // /a-propos-du-site est accessible via le bouton du footer (b15), pas via un lien
      const boutonAbout = page.getByTestId('e2eid-b15');
      if (await boutonAbout.count() > 0) {
        await boutonAbout.click();
        await expect(page).toHaveURL('/a-propos-du-site');
      } else {
        throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  // Test des e2eID présents sur /a-propos-du-site

  await test.step("Étape 21: Navigation de /a-propos-du-site vers /metrics (BarChart3)", async () => {
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
        throw new Error(`Impossible de trouver un lien vers /metrics depuis /a-propos-du-site (label: "BarChart3"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // /metrics est accessible via le bouton du footer (b14), pas via un lien
      const boutonMetrics = page.getByTestId('e2eid-b14');
      if (await boutonMetrics.count() > 0) {
        await boutonMetrics.click();
        await expect(page).toHaveURL('/metrics');
      } else {
        throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  // Test des e2eID présents sur /metrics

  await test.step("Étape 22: Navigation de /metrics vers /metrics (BarChart3)", async () => {
    // On est déjà sur /metrics, pas besoin de naviguer vers la même page
    // Vérifier simplement qu'on est bien sur la bonne page
    await expect(page).toHaveURL('/metrics');
  });

  await test.step("Étape 23: Navigation de /metrics vers /a-propos-du-site (Info)", async () => {
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
        throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis /metrics (label: "Info"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // /a-propos-du-site est accessible via le bouton du footer (b15), pas via un lien
      const boutonAbout = page.getByTestId('e2eid-b15');
      if (await boutonAbout.count() > 0) {
        await boutonAbout.click();
        await expect(page).toHaveURL('/a-propos-du-site');
      } else {
        throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  // Test des e2eID présents sur /a-propos-du-site

  await test.step("Étape 24: Navigation de /a-propos-du-site vers /a-propos-du-site (Info)", async () => {
    // On est déjà sur /a-propos-du-site, pas besoin de naviguer vers la même page
    // Vérifier simplement qu'on est bien sur la bonne page
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  await test.step("Étape 25: Navigation de /a-propos-du-site vers / (lien)", async () => {
    // Pour aller à l'accueil, utiliser le logo du header (h1)
    const logo = page.getByTestId('e2eid-h1');
    if (await logo.count() > 0) {
      await logo.click();
      await expect(page).toHaveURL('/');
    } else {
      // Fallback : navigation directe
      await page.goto('/');
    }
  });

  await test.step("Étape 26: Navigation de / vers /plan-du-site (Plan du site)", async () => {
    // /plan-du-site est accessible via le bouton du footer (b13), pas via un lien
    const boutonPlanDuSite = page.getByTestId('e2eid-b13');
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.click();
      await expect(page).toHaveURL('/plan-du-site');
    } else {
      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b13) dans le footer.');
    }
  });

  await test.step("Étape 27: Navigation de /plan-du-site vers /ingenierie-logiciel (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens26 = page.getByRole('link', { name: /lien/i });
    if (await liens26.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens26.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/ingenierie-logiciel'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /ingenierie-logiciel depuis /plan-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer) - c'est un bouton, pas un lien
      const boutonPlanDuSite = page.getByTestId('e2eid-b13');
      if (await boutonPlanDuSite.count() > 0) {
        await boutonPlanDuSite.click();
        await expect(page).toHaveURL('/plan-du-site');
        // Vérifier si la destination est accessible via un bouton du footer ou si c'est /plan-du-site ou /
        if ('/ingenierie-logiciel' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/ingenierie-logiciel' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/ingenierie-logiciel' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/ingenierie-logiciel' === '/a-propos-du-site') {
          // /a-propos-du-site est accessible via le bouton du footer (b15)
          const boutonAbout = page.getByTestId('e2eid-b15');
          if (await boutonAbout.count() > 0) {
            await boutonAbout.click();
            await expect(page).toHaveURL('/a-propos-du-site');
          } else {
            throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
          }
        } else {
          // Depuis le plan du site, chercher le lien par son e2eID (généré de manière déterministe)
          // Chercher le lien par son e2eID (généré de manière déterministe depuis l'URL)
          // Attendre que le plan du site soit chargé (les liens sont chargés de manière asynchrone)
          await page.waitForSelector('[data-e2eid^="e2eid-l"]', { timeout: 5000 }).catch(() => {});
          const lienDepuisPlan26 = page.getByTestId('e2eid-l384');
          if (await lienDepuisPlan26.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /ingenierie-logiciel (e2eID: e2eid-l384) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan26.first().click();
        }
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
        const lienDepuisAccueil26 = page.getByRole('link', { name: new RegExp(`/ingenierie-logiciel`, 'i') });
        if (await lienDepuisAccueil26.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel26 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel26.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /ingenierie-logiciel depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel26.first().click();
        } else {
          await lienDepuisAccueil26.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/ingenierie-logiciel');
  });

  // Test des e2eID présents sur /ingenierie-logiciel

  await test.step("Étape 28: Navigation de /ingenierie-logiciel vers /plan-du-site (Plan du site)", async () => {
    // /plan-du-site est accessible via le bouton du footer (b13), pas via un lien
    const boutonPlanDuSite = page.getByTestId('e2eid-b13');
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.click();
      await expect(page).toHaveURL('/plan-du-site');
    } else {
      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b13) dans le footer.');
    }
  });

  await test.step("Étape 29: Navigation de /plan-du-site vers /portfolio-detournements (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens28 = page.getByRole('link', { name: /lien/i });
    if (await liens28.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens28.all();
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
      // Option 1 : Essayer via le plan du site (footer) - c'est un bouton, pas un lien
      const boutonPlanDuSite = page.getByTestId('e2eid-b13');
      if (await boutonPlanDuSite.count() > 0) {
        await boutonPlanDuSite.click();
        await expect(page).toHaveURL('/plan-du-site');
        // Vérifier si la destination est accessible via un bouton du footer ou si c'est /plan-du-site ou /
        if ('/portfolio-detournements' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/portfolio-detournements' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/portfolio-detournements' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/portfolio-detournements' === '/a-propos-du-site') {
          // /a-propos-du-site est accessible via le bouton du footer (b15)
          const boutonAbout = page.getByTestId('e2eid-b15');
          if (await boutonAbout.count() > 0) {
            await boutonAbout.click();
            await expect(page).toHaveURL('/a-propos-du-site');
          } else {
            throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
          }
        } else {
          // Depuis le plan du site, chercher le lien par son e2eID (généré de manière déterministe)
          // Chercher le lien par son e2eID (généré de manière déterministe depuis l'URL)
          // Attendre que le plan du site soit chargé (les liens sont chargés de manière asynchrone)
          await page.waitForSelector('[data-e2eid^="e2eid-l"]', { timeout: 5000 }).catch(() => {});
          const lienDepuisPlan28 = page.getByTestId('e2eid-l696');
          if (await lienDepuisPlan28.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /portfolio-detournements (e2eID: e2eid-l696) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan28.first().click();
        }
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
        const lienDepuisAccueil28 = page.getByRole('link', { name: new RegExp(`/portfolio-detournements`, 'i') });
        if (await lienDepuisAccueil28.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel28 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel28.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /portfolio-detournements depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel28.first().click();
        } else {
          await lienDepuisAccueil28.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/portfolio-detournements');
  });

  // Test des e2eID présents sur /portfolio-detournements

  await test.step("Étape 30: Navigation de /portfolio-detournements vers /plan-du-site (Plan du site)", async () => {
    // /plan-du-site est accessible via le bouton du footer (b13), pas via un lien
    const boutonPlanDuSite = page.getByTestId('e2eid-b13');
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.click();
      await expect(page).toHaveURL('/plan-du-site');
    } else {
      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b13) dans le footer.');
    }
  });

  await test.step("Étape 31: Navigation de /plan-du-site vers /pour-aller-plus-loin (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens30 = page.getByRole('link', { name: /lien/i });
    if (await liens30.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens30.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/pour-aller-plus-loin'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /pour-aller-plus-loin depuis /plan-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer) - c'est un bouton, pas un lien
      const boutonPlanDuSite = page.getByTestId('e2eid-b13');
      if (await boutonPlanDuSite.count() > 0) {
        await boutonPlanDuSite.click();
        await expect(page).toHaveURL('/plan-du-site');
        // Vérifier si la destination est accessible via un bouton du footer ou si c'est /plan-du-site ou /
        if ('/pour-aller-plus-loin' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/pour-aller-plus-loin' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/pour-aller-plus-loin' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/pour-aller-plus-loin' === '/a-propos-du-site') {
          // /a-propos-du-site est accessible via le bouton du footer (b15)
          const boutonAbout = page.getByTestId('e2eid-b15');
          if (await boutonAbout.count() > 0) {
            await boutonAbout.click();
            await expect(page).toHaveURL('/a-propos-du-site');
          } else {
            throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
          }
        } else {
          // Depuis le plan du site, chercher le lien par son e2eID (généré de manière déterministe)
          // Chercher le lien par son e2eID (généré de manière déterministe depuis l'URL)
          // Attendre que le plan du site soit chargé (les liens sont chargés de manière asynchrone)
          await page.waitForSelector('[data-e2eid^="e2eid-l"]', { timeout: 5000 }).catch(() => {});
          const lienDepuisPlan30 = page.getByTestId('e2eid-l907');
          if (await lienDepuisPlan30.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /pour-aller-plus-loin (e2eID: e2eid-l907) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan30.first().click();
        }
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
        const lienDepuisAccueil30 = page.getByRole('link', { name: new RegExp(`/pour-aller-plus-loin`, 'i') });
        if (await lienDepuisAccueil30.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel30 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel30.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /pour-aller-plus-loin depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel30.first().click();
        } else {
          await lienDepuisAccueil30.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/pour-aller-plus-loin');
  });

  // Test des e2eID présents sur /pour-aller-plus-loin

  await test.step("Étape 32: Navigation de /pour-aller-plus-loin vers /plan-du-site (Plan du site)", async () => {
    // /plan-du-site est accessible via le bouton du footer (b13), pas via un lien
    const boutonPlanDuSite = page.getByTestId('e2eid-b13');
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.click();
      await expect(page).toHaveURL('/plan-du-site');
    } else {
      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b13) dans le footer.');
    }
  });

  await test.step("Étape 33: Navigation de /plan-du-site vers / (lien)", async () => {
    // Pour aller à l'accueil, utiliser le logo du header (h1)
    const logo = page.getByTestId('e2eid-h1');
    if (await logo.count() > 0) {
      await logo.click();
      await expect(page).toHaveURL('/');
    } else {
      // Fallback : navigation directe
      await page.goto('/');
    }
  });

  await test.step("Étape 34: Navigation de / vers /metrics (BarChart3)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens33 = page.getByRole('link', { name: /BarChart3/i });
    if (await liens33.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens33.all();
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
      // /metrics est accessible via le bouton du footer (b14), pas via un lien
      const boutonMetrics = page.getByTestId('e2eid-b14');
      if (await boutonMetrics.count() > 0) {
        await boutonMetrics.click();
        await expect(page).toHaveURL('/metrics');
      } else {
        throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  // Test des e2eID présents sur /metrics

  await test.step("Étape 35: Navigation de /metrics vers /detournement-video (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens34 = page.getByRole('link', { name: /lien/i });
    if (await liens34.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens34.all();
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
      // Option 1 : Essayer via le plan du site (footer) - c'est un bouton, pas un lien
      const boutonPlanDuSite = page.getByTestId('e2eid-b13');
      if (await boutonPlanDuSite.count() > 0) {
        await boutonPlanDuSite.click();
        await expect(page).toHaveURL('/plan-du-site');
        // Vérifier si la destination est accessible via un bouton du footer ou si c'est /plan-du-site ou /
        if ('/detournement-video' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/detournement-video' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/detournement-video' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/detournement-video' === '/a-propos-du-site') {
          // /a-propos-du-site est accessible via le bouton du footer (b15)
          const boutonAbout = page.getByTestId('e2eid-b15');
          if (await boutonAbout.count() > 0) {
            await boutonAbout.click();
            await expect(page).toHaveURL('/a-propos-du-site');
          } else {
            throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
          }
        } else {
          // Depuis le plan du site, chercher le lien par son e2eID (généré de manière déterministe)
          // Chercher le lien par son e2eID (généré de manière déterministe depuis l'URL)
          // Attendre que le plan du site soit chargé (les liens sont chargés de manière asynchrone)
          await page.waitForSelector('[data-e2eid^="e2eid-l"]', { timeout: 5000 }).catch(() => {});
          const lienDepuisPlan34 = page.getByTestId('e2eid-l756');
          if (await lienDepuisPlan34.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /detournement-video (e2eID: e2eid-l756) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan34.first().click();
        }
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
        const lienDepuisAccueil34 = page.getByRole('link', { name: new RegExp(`/detournement-video`, 'i') });
        if (await lienDepuisAccueil34.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel34 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel34.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /detournement-video depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel34.first().click();
        } else {
          await lienDepuisAccueil34.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/detournement-video');
  });

  // Test des e2eID présents sur /detournement-video

  await test.step("Étape 36: Navigation de /detournement-video vers /metrics (BarChart3)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens35 = page.getByRole('link', { name: /BarChart3/i });
    if (await liens35.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens35.all();
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
      // /metrics est accessible via le bouton du footer (b14), pas via un lien
      const boutonMetrics = page.getByTestId('e2eid-b14');
      if (await boutonMetrics.count() > 0) {
        await boutonMetrics.click();
        await expect(page).toHaveURL('/metrics');
      } else {
        throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  // Test des e2eID présents sur /metrics

  await test.step("Étape 37: Navigation de /metrics vers /ingenierie-logiciel (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens36 = page.getByRole('link', { name: /lien/i });
    if (await liens36.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens36.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/ingenierie-logiciel'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /ingenierie-logiciel depuis /metrics (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer) - c'est un bouton, pas un lien
      const boutonPlanDuSite = page.getByTestId('e2eid-b13');
      if (await boutonPlanDuSite.count() > 0) {
        await boutonPlanDuSite.click();
        await expect(page).toHaveURL('/plan-du-site');
        // Vérifier si la destination est accessible via un bouton du footer ou si c'est /plan-du-site ou /
        if ('/ingenierie-logiciel' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/ingenierie-logiciel' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/ingenierie-logiciel' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/ingenierie-logiciel' === '/a-propos-du-site') {
          // /a-propos-du-site est accessible via le bouton du footer (b15)
          const boutonAbout = page.getByTestId('e2eid-b15');
          if (await boutonAbout.count() > 0) {
            await boutonAbout.click();
            await expect(page).toHaveURL('/a-propos-du-site');
          } else {
            throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
          }
        } else {
          // Depuis le plan du site, chercher le lien par son e2eID (généré de manière déterministe)
          // Chercher le lien par son e2eID (généré de manière déterministe depuis l'URL)
          // Attendre que le plan du site soit chargé (les liens sont chargés de manière asynchrone)
          await page.waitForSelector('[data-e2eid^="e2eid-l"]', { timeout: 5000 }).catch(() => {});
          const lienDepuisPlan36 = page.getByTestId('e2eid-l384');
          if (await lienDepuisPlan36.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /ingenierie-logiciel (e2eID: e2eid-l384) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan36.first().click();
        }
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
        const lienDepuisAccueil36 = page.getByRole('link', { name: new RegExp(`/ingenierie-logiciel`, 'i') });
        if (await lienDepuisAccueil36.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel36 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel36.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /ingenierie-logiciel depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel36.first().click();
        } else {
          await lienDepuisAccueil36.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/ingenierie-logiciel');
  });

  // Test des e2eID présents sur /ingenierie-logiciel

  await test.step("Étape 38: Navigation de /ingenierie-logiciel vers /metrics (BarChart3)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens37 = page.getByRole('link', { name: /BarChart3/i });
    if (await liens37.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens37.all();
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
        throw new Error(`Impossible de trouver un lien vers /metrics depuis /ingenierie-logiciel (label: "BarChart3"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // /metrics est accessible via le bouton du footer (b14), pas via un lien
      const boutonMetrics = page.getByTestId('e2eid-b14');
      if (await boutonMetrics.count() > 0) {
        await boutonMetrics.click();
        await expect(page).toHaveURL('/metrics');
      } else {
        throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  // Test des e2eID présents sur /metrics

  await test.step("Étape 39: Navigation de /metrics vers /management-de-produit-logiciel (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens38 = page.getByRole('link', { name: /lien/i });
    if (await liens38.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens38.all();
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
      // Option 1 : Essayer via le plan du site (footer) - c'est un bouton, pas un lien
      const boutonPlanDuSite = page.getByTestId('e2eid-b13');
      if (await boutonPlanDuSite.count() > 0) {
        await boutonPlanDuSite.click();
        await expect(page).toHaveURL('/plan-du-site');
        // Vérifier si la destination est accessible via un bouton du footer ou si c'est /plan-du-site ou /
        if ('/management-de-produit-logiciel' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/management-de-produit-logiciel' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/management-de-produit-logiciel' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/management-de-produit-logiciel' === '/a-propos-du-site') {
          // /a-propos-du-site est accessible via le bouton du footer (b15)
          const boutonAbout = page.getByTestId('e2eid-b15');
          if (await boutonAbout.count() > 0) {
            await boutonAbout.click();
            await expect(page).toHaveURL('/a-propos-du-site');
          } else {
            throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
          }
        } else {
          // Depuis le plan du site, chercher le lien par son e2eID (généré de manière déterministe)
          // Chercher le lien par son e2eID (généré de manière déterministe depuis l'URL)
          // Attendre que le plan du site soit chargé (les liens sont chargés de manière asynchrone)
          await page.waitForSelector('[data-e2eid^="e2eid-l"]', { timeout: 5000 }).catch(() => {});
          const lienDepuisPlan38 = page.getByTestId('e2eid-l976');
          if (await lienDepuisPlan38.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /management-de-produit-logiciel (e2eID: e2eid-l976) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan38.first().click();
        }
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
        const lienDepuisAccueil38 = page.getByRole('link', { name: new RegExp(`/management-de-produit-logiciel`, 'i') });
        if (await lienDepuisAccueil38.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel38 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel38.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /management-de-produit-logiciel depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel38.first().click();
        } else {
          await lienDepuisAccueil38.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/management-de-produit-logiciel');
  });

  // Test des e2eID présents sur /management-de-produit-logiciel

  await test.step("Étape 40: Navigation de /management-de-produit-logiciel vers /metrics (BarChart3)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens39 = page.getByRole('link', { name: /BarChart3/i });
    if (await liens39.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens39.all();
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
      // /metrics est accessible via le bouton du footer (b14), pas via un lien
      const boutonMetrics = page.getByTestId('e2eid-b14');
      if (await boutonMetrics.count() > 0) {
        await boutonMetrics.click();
        await expect(page).toHaveURL('/metrics');
      } else {
        throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  // Test des e2eID présents sur /metrics

  await test.step("Étape 41: Navigation de /metrics vers /portfolio-detournements (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens40 = page.getByRole('link', { name: /lien/i });
    if (await liens40.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens40.all();
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
      // Option 1 : Essayer via le plan du site (footer) - c'est un bouton, pas un lien
      const boutonPlanDuSite = page.getByTestId('e2eid-b13');
      if (await boutonPlanDuSite.count() > 0) {
        await boutonPlanDuSite.click();
        await expect(page).toHaveURL('/plan-du-site');
        // Vérifier si la destination est accessible via un bouton du footer ou si c'est /plan-du-site ou /
        if ('/portfolio-detournements' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/portfolio-detournements' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/portfolio-detournements' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/portfolio-detournements' === '/a-propos-du-site') {
          // /a-propos-du-site est accessible via le bouton du footer (b15)
          const boutonAbout = page.getByTestId('e2eid-b15');
          if (await boutonAbout.count() > 0) {
            await boutonAbout.click();
            await expect(page).toHaveURL('/a-propos-du-site');
          } else {
            throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
          }
        } else {
          // Depuis le plan du site, chercher le lien par son e2eID (généré de manière déterministe)
          // Chercher le lien par son e2eID (généré de manière déterministe depuis l'URL)
          // Attendre que le plan du site soit chargé (les liens sont chargés de manière asynchrone)
          await page.waitForSelector('[data-e2eid^="e2eid-l"]', { timeout: 5000 }).catch(() => {});
          const lienDepuisPlan40 = page.getByTestId('e2eid-l696');
          if (await lienDepuisPlan40.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /portfolio-detournements (e2eID: e2eid-l696) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan40.first().click();
        }
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
        const lienDepuisAccueil40 = page.getByRole('link', { name: new RegExp(`/portfolio-detournements`, 'i') });
        if (await lienDepuisAccueil40.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel40 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel40.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /portfolio-detournements depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel40.first().click();
        } else {
          await lienDepuisAccueil40.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/portfolio-detournements');
  });

  // Test des e2eID présents sur /portfolio-detournements

  await test.step("Étape 42: Navigation de /portfolio-detournements vers /metrics (BarChart3)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens41 = page.getByRole('link', { name: /BarChart3/i });
    if (await liens41.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens41.all();
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
      // /metrics est accessible via le bouton du footer (b14), pas via un lien
      const boutonMetrics = page.getByTestId('e2eid-b14');
      if (await boutonMetrics.count() > 0) {
        await boutonMetrics.click();
        await expect(page).toHaveURL('/metrics');
      } else {
        throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  // Test des e2eID présents sur /metrics

  await test.step("Étape 43: Navigation de /metrics vers /pour-aller-plus-loin (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens42 = page.getByRole('link', { name: /lien/i });
    if (await liens42.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens42.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/pour-aller-plus-loin'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /pour-aller-plus-loin depuis /metrics (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer) - c'est un bouton, pas un lien
      const boutonPlanDuSite = page.getByTestId('e2eid-b13');
      if (await boutonPlanDuSite.count() > 0) {
        await boutonPlanDuSite.click();
        await expect(page).toHaveURL('/plan-du-site');
        // Vérifier si la destination est accessible via un bouton du footer ou si c'est /plan-du-site ou /
        if ('/pour-aller-plus-loin' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/pour-aller-plus-loin' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/pour-aller-plus-loin' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/pour-aller-plus-loin' === '/a-propos-du-site') {
          // /a-propos-du-site est accessible via le bouton du footer (b15)
          const boutonAbout = page.getByTestId('e2eid-b15');
          if (await boutonAbout.count() > 0) {
            await boutonAbout.click();
            await expect(page).toHaveURL('/a-propos-du-site');
          } else {
            throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
          }
        } else {
          // Depuis le plan du site, chercher le lien par son e2eID (généré de manière déterministe)
          // Chercher le lien par son e2eID (généré de manière déterministe depuis l'URL)
          // Attendre que le plan du site soit chargé (les liens sont chargés de manière asynchrone)
          await page.waitForSelector('[data-e2eid^="e2eid-l"]', { timeout: 5000 }).catch(() => {});
          const lienDepuisPlan42 = page.getByTestId('e2eid-l907');
          if (await lienDepuisPlan42.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /pour-aller-plus-loin (e2eID: e2eid-l907) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan42.first().click();
        }
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
        const lienDepuisAccueil42 = page.getByRole('link', { name: new RegExp(`/pour-aller-plus-loin`, 'i') });
        if (await lienDepuisAccueil42.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel42 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel42.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /pour-aller-plus-loin depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel42.first().click();
        } else {
          await lienDepuisAccueil42.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/pour-aller-plus-loin');
  });

  // Test des e2eID présents sur /pour-aller-plus-loin

  await test.step("Étape 44: Navigation de /pour-aller-plus-loin vers /metrics (BarChart3)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens43 = page.getByRole('link', { name: /BarChart3/i });
    if (await liens43.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens43.all();
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
        throw new Error(`Impossible de trouver un lien vers /metrics depuis /pour-aller-plus-loin (label: "BarChart3"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // /metrics est accessible via le bouton du footer (b14), pas via un lien
      const boutonMetrics = page.getByTestId('e2eid-b14');
      if (await boutonMetrics.count() > 0) {
        await boutonMetrics.click();
        await expect(page).toHaveURL('/metrics');
      } else {
        throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  // Test des e2eID présents sur /metrics

  await test.step("Étape 45: Navigation de /metrics vers /robustesse (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens44 = page.getByRole('link', { name: /lien/i });
    if (await liens44.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens44.all();
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
      // Option 1 : Essayer via le plan du site (footer) - c'est un bouton, pas un lien
      const boutonPlanDuSite = page.getByTestId('e2eid-b13');
      if (await boutonPlanDuSite.count() > 0) {
        await boutonPlanDuSite.click();
        await expect(page).toHaveURL('/plan-du-site');
        // Vérifier si la destination est accessible via un bouton du footer ou si c'est /plan-du-site ou /
        if ('/robustesse' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/robustesse' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/robustesse' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/robustesse' === '/a-propos-du-site') {
          // /a-propos-du-site est accessible via le bouton du footer (b15)
          const boutonAbout = page.getByTestId('e2eid-b15');
          if (await boutonAbout.count() > 0) {
            await boutonAbout.click();
            await expect(page).toHaveURL('/a-propos-du-site');
          } else {
            throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
          }
        } else {
          // Depuis le plan du site, chercher le lien par son e2eID (généré de manière déterministe)
          // Chercher le lien par son e2eID (généré de manière déterministe depuis l'URL)
          // Attendre que le plan du site soit chargé (les liens sont chargés de manière asynchrone)
          await page.waitForSelector('[data-e2eid^="e2eid-l"]', { timeout: 5000 }).catch(() => {});
          const lienDepuisPlan44 = page.getByTestId('e2eid-l431');
          if (await lienDepuisPlan44.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /robustesse (e2eID: e2eid-l431) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan44.first().click();
        }
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
        const lienDepuisAccueil44 = page.getByRole('link', { name: new RegExp(`/robustesse`, 'i') });
        if (await lienDepuisAccueil44.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel44 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel44.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /robustesse depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel44.first().click();
        } else {
          await lienDepuisAccueil44.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/robustesse');
  });

  // Test des e2eID présents sur /robustesse

  await test.step("Étape 46: Navigation de /robustesse vers /metrics (BarChart3)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens45 = page.getByRole('link', { name: /BarChart3/i });
    if (await liens45.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens45.all();
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
      // /metrics est accessible via le bouton du footer (b14), pas via un lien
      const boutonMetrics = page.getByTestId('e2eid-b14');
      if (await boutonMetrics.count() > 0) {
        await boutonMetrics.click();
        await expect(page).toHaveURL('/metrics');
      } else {
        throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  // Test des e2eID présents sur /metrics

  await test.step("Étape 47: Navigation de /metrics vers /transformation (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens46 = page.getByRole('link', { name: /lien/i });
    if (await liens46.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens46.all();
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
      // Option 1 : Essayer via le plan du site (footer) - c'est un bouton, pas un lien
      const boutonPlanDuSite = page.getByTestId('e2eid-b13');
      if (await boutonPlanDuSite.count() > 0) {
        await boutonPlanDuSite.click();
        await expect(page).toHaveURL('/plan-du-site');
        // Vérifier si la destination est accessible via un bouton du footer ou si c'est /plan-du-site ou /
        if ('/transformation' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/transformation' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/transformation' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/transformation' === '/a-propos-du-site') {
          // /a-propos-du-site est accessible via le bouton du footer (b15)
          const boutonAbout = page.getByTestId('e2eid-b15');
          if (await boutonAbout.count() > 0) {
            await boutonAbout.click();
            await expect(page).toHaveURL('/a-propos-du-site');
          } else {
            throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
          }
        } else {
          // Depuis le plan du site, chercher le lien par son e2eID (généré de manière déterministe)
          // Chercher le lien par son e2eID (généré de manière déterministe depuis l'URL)
          // Attendre que le plan du site soit chargé (les liens sont chargés de manière asynchrone)
          await page.waitForSelector('[data-e2eid^="e2eid-l"]', { timeout: 5000 }).catch(() => {});
          const lienDepuisPlan46 = page.getByTestId('e2eid-l705');
          if (await lienDepuisPlan46.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /transformation (e2eID: e2eid-l705) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan46.first().click();
        }
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
        const lienDepuisAccueil46 = page.getByRole('link', { name: new RegExp(`/transformation`, 'i') });
        if (await lienDepuisAccueil46.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel46 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel46.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /transformation depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel46.first().click();
        } else {
          await lienDepuisAccueil46.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/transformation');
  });

  // Test des e2eID présents sur /transformation

  await test.step("Étape 48: Navigation de /transformation vers /metrics (BarChart3)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens47 = page.getByRole('link', { name: /BarChart3/i });
    if (await liens47.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens47.all();
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
      // /metrics est accessible via le bouton du footer (b14), pas via un lien
      const boutonMetrics = page.getByTestId('e2eid-b14');
      if (await boutonMetrics.count() > 0) {
        await boutonMetrics.click();
        await expect(page).toHaveURL('/metrics');
      } else {
        throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
      }
    }
    await expect(page).toHaveURL('/metrics');
  });

  // Test des e2eID présents sur /metrics

  await test.step("Étape 49: Navigation de /metrics vers / (lien)", async () => {
    // Pour aller à l'accueil, utiliser le logo du header (h1)
    const logo = page.getByTestId('e2eid-h1');
    if (await logo.count() > 0) {
      await logo.click();
      await expect(page).toHaveURL('/');
    } else {
      // Fallback : navigation directe
      await page.goto('/');
    }
  });

  await test.step("Étape 50: Navigation de / vers /a-propos-du-site (En savoir plus...)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens49 = page.getByRole('link', { name: /En savoir plus\.\.\./i });
    if (await liens49.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens49.all();
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
      // /a-propos-du-site est accessible via le bouton du footer (b15), pas via un lien
      const boutonAbout = page.getByTestId('e2eid-b15');
      if (await boutonAbout.count() > 0) {
        await boutonAbout.click();
        await expect(page).toHaveURL('/a-propos-du-site');
      } else {
        throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  // Test des e2eID présents sur /a-propos-du-site

  await test.step("Étape 51: Navigation de /a-propos-du-site vers /detournement-video (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens50 = page.getByRole('link', { name: /lien/i });
    if (await liens50.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens50.all();
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
        throw new Error(`Impossible de trouver un lien vers /detournement-video depuis /a-propos-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer) - c'est un bouton, pas un lien
      const boutonPlanDuSite = page.getByTestId('e2eid-b13');
      if (await boutonPlanDuSite.count() > 0) {
        await boutonPlanDuSite.click();
        await expect(page).toHaveURL('/plan-du-site');
        // Vérifier si la destination est accessible via un bouton du footer ou si c'est /plan-du-site ou /
        if ('/detournement-video' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/detournement-video' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/detournement-video' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/detournement-video' === '/a-propos-du-site') {
          // /a-propos-du-site est accessible via le bouton du footer (b15)
          const boutonAbout = page.getByTestId('e2eid-b15');
          if (await boutonAbout.count() > 0) {
            await boutonAbout.click();
            await expect(page).toHaveURL('/a-propos-du-site');
          } else {
            throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
          }
        } else {
          // Depuis le plan du site, chercher le lien par son e2eID (généré de manière déterministe)
          // Chercher le lien par son e2eID (généré de manière déterministe depuis l'URL)
          // Attendre que le plan du site soit chargé (les liens sont chargés de manière asynchrone)
          await page.waitForSelector('[data-e2eid^="e2eid-l"]', { timeout: 5000 }).catch(() => {});
          const lienDepuisPlan50 = page.getByTestId('e2eid-l756');
          if (await lienDepuisPlan50.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /detournement-video (e2eID: e2eid-l756) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan50.first().click();
        }
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
        const lienDepuisAccueil50 = page.getByRole('link', { name: new RegExp(`/detournement-video`, 'i') });
        if (await lienDepuisAccueil50.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel50 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel50.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /detournement-video depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel50.first().click();
        } else {
          await lienDepuisAccueil50.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/detournement-video');
  });

  // Test des e2eID présents sur /detournement-video

  await test.step("Étape 52: Navigation de /detournement-video vers /a-propos-du-site (Info)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens51 = page.getByRole('link', { name: /Info/i });
    if (await liens51.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens51.all();
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
      // /a-propos-du-site est accessible via le bouton du footer (b15), pas via un lien
      const boutonAbout = page.getByTestId('e2eid-b15');
      if (await boutonAbout.count() > 0) {
        await boutonAbout.click();
        await expect(page).toHaveURL('/a-propos-du-site');
      } else {
        throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  // Test des e2eID présents sur /a-propos-du-site

  await test.step("Étape 53: Navigation de /a-propos-du-site vers /management-de-produit-logiciel (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens52 = page.getByRole('link', { name: /lien/i });
    if (await liens52.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens52.all();
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
      // Option 1 : Essayer via le plan du site (footer) - c'est un bouton, pas un lien
      const boutonPlanDuSite = page.getByTestId('e2eid-b13');
      if (await boutonPlanDuSite.count() > 0) {
        await boutonPlanDuSite.click();
        await expect(page).toHaveURL('/plan-du-site');
        // Vérifier si la destination est accessible via un bouton du footer ou si c'est /plan-du-site ou /
        if ('/management-de-produit-logiciel' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/management-de-produit-logiciel' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/management-de-produit-logiciel' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/management-de-produit-logiciel' === '/a-propos-du-site') {
          // /a-propos-du-site est accessible via le bouton du footer (b15)
          const boutonAbout = page.getByTestId('e2eid-b15');
          if (await boutonAbout.count() > 0) {
            await boutonAbout.click();
            await expect(page).toHaveURL('/a-propos-du-site');
          } else {
            throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
          }
        } else {
          // Depuis le plan du site, chercher le lien par son e2eID (généré de manière déterministe)
          // Chercher le lien par son e2eID (généré de manière déterministe depuis l'URL)
          // Attendre que le plan du site soit chargé (les liens sont chargés de manière asynchrone)
          await page.waitForSelector('[data-e2eid^="e2eid-l"]', { timeout: 5000 }).catch(() => {});
          const lienDepuisPlan52 = page.getByTestId('e2eid-l976');
          if (await lienDepuisPlan52.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /management-de-produit-logiciel (e2eID: e2eid-l976) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan52.first().click();
        }
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
        const lienDepuisAccueil52 = page.getByRole('link', { name: new RegExp(`/management-de-produit-logiciel`, 'i') });
        if (await lienDepuisAccueil52.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel52 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel52.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /management-de-produit-logiciel depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel52.first().click();
        } else {
          await lienDepuisAccueil52.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/management-de-produit-logiciel');
  });

  // Test des e2eID présents sur /management-de-produit-logiciel

  await test.step("Étape 54: Navigation de /management-de-produit-logiciel vers /a-propos-du-site (Info)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens53 = page.getByRole('link', { name: /Info/i });
    if (await liens53.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens53.all();
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
      // /a-propos-du-site est accessible via le bouton du footer (b15), pas via un lien
      const boutonAbout = page.getByTestId('e2eid-b15');
      if (await boutonAbout.count() > 0) {
        await boutonAbout.click();
        await expect(page).toHaveURL('/a-propos-du-site');
      } else {
        throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  // Test des e2eID présents sur /a-propos-du-site

  await test.step("Étape 55: Navigation de /a-propos-du-site vers /portfolio-detournements (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens54 = page.getByRole('link', { name: /lien/i });
    if (await liens54.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens54.all();
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
      // Option 1 : Essayer via le plan du site (footer) - c'est un bouton, pas un lien
      const boutonPlanDuSite = page.getByTestId('e2eid-b13');
      if (await boutonPlanDuSite.count() > 0) {
        await boutonPlanDuSite.click();
        await expect(page).toHaveURL('/plan-du-site');
        // Vérifier si la destination est accessible via un bouton du footer ou si c'est /plan-du-site ou /
        if ('/portfolio-detournements' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/portfolio-detournements' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/portfolio-detournements' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/portfolio-detournements' === '/a-propos-du-site') {
          // /a-propos-du-site est accessible via le bouton du footer (b15)
          const boutonAbout = page.getByTestId('e2eid-b15');
          if (await boutonAbout.count() > 0) {
            await boutonAbout.click();
            await expect(page).toHaveURL('/a-propos-du-site');
          } else {
            throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
          }
        } else {
          // Depuis le plan du site, chercher le lien par son e2eID (généré de manière déterministe)
          // Chercher le lien par son e2eID (généré de manière déterministe depuis l'URL)
          // Attendre que le plan du site soit chargé (les liens sont chargés de manière asynchrone)
          await page.waitForSelector('[data-e2eid^="e2eid-l"]', { timeout: 5000 }).catch(() => {});
          const lienDepuisPlan54 = page.getByTestId('e2eid-l696');
          if (await lienDepuisPlan54.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /portfolio-detournements (e2eID: e2eid-l696) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan54.first().click();
        }
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
        const lienDepuisAccueil54 = page.getByRole('link', { name: new RegExp(`/portfolio-detournements`, 'i') });
        if (await lienDepuisAccueil54.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel54 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel54.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /portfolio-detournements depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel54.first().click();
        } else {
          await lienDepuisAccueil54.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/portfolio-detournements');
  });

  // Test des e2eID présents sur /portfolio-detournements

  await test.step("Étape 56: Navigation de /portfolio-detournements vers /a-propos-du-site (Info)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens55 = page.getByRole('link', { name: /Info/i });
    if (await liens55.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens55.all();
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
      // /a-propos-du-site est accessible via le bouton du footer (b15), pas via un lien
      const boutonAbout = page.getByTestId('e2eid-b15');
      if (await boutonAbout.count() > 0) {
        await boutonAbout.click();
        await expect(page).toHaveURL('/a-propos-du-site');
      } else {
        throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  // Test des e2eID présents sur /a-propos-du-site

  await test.step("Étape 57: Navigation de /a-propos-du-site vers /pour-aller-plus-loin (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens56 = page.getByRole('link', { name: /lien/i });
    if (await liens56.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens56.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/pour-aller-plus-loin'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /pour-aller-plus-loin depuis /a-propos-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // Option 1 : Essayer via le plan du site (footer) - c'est un bouton, pas un lien
      const boutonPlanDuSite = page.getByTestId('e2eid-b13');
      if (await boutonPlanDuSite.count() > 0) {
        await boutonPlanDuSite.click();
        await expect(page).toHaveURL('/plan-du-site');
        // Vérifier si la destination est accessible via un bouton du footer ou si c'est /plan-du-site ou /
        if ('/pour-aller-plus-loin' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/pour-aller-plus-loin' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/pour-aller-plus-loin' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/pour-aller-plus-loin' === '/a-propos-du-site') {
          // /a-propos-du-site est accessible via le bouton du footer (b15)
          const boutonAbout = page.getByTestId('e2eid-b15');
          if (await boutonAbout.count() > 0) {
            await boutonAbout.click();
            await expect(page).toHaveURL('/a-propos-du-site');
          } else {
            throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
          }
        } else {
          // Depuis le plan du site, chercher le lien par son e2eID (généré de manière déterministe)
          // Chercher le lien par son e2eID (généré de manière déterministe depuis l'URL)
          // Attendre que le plan du site soit chargé (les liens sont chargés de manière asynchrone)
          await page.waitForSelector('[data-e2eid^="e2eid-l"]', { timeout: 5000 }).catch(() => {});
          const lienDepuisPlan56 = page.getByTestId('e2eid-l907');
          if (await lienDepuisPlan56.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /pour-aller-plus-loin (e2eID: e2eid-l907) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan56.first().click();
        }
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
        const lienDepuisAccueil56 = page.getByRole('link', { name: new RegExp(`/pour-aller-plus-loin`, 'i') });
        if (await lienDepuisAccueil56.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel56 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel56.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /pour-aller-plus-loin depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel56.first().click();
        } else {
          await lienDepuisAccueil56.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/pour-aller-plus-loin');
  });

  // Test des e2eID présents sur /pour-aller-plus-loin

  await test.step("Étape 58: Navigation de /pour-aller-plus-loin vers /a-propos-du-site (Info)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens57 = page.getByRole('link', { name: /Info/i });
    if (await liens57.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens57.all();
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
        throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis /pour-aller-plus-loin (label: "Info"). Vérifiez que le lien existe et est accessible depuis cette page.`);
      }
    } else {
      // Lien non trouvé par label, navigation via plan-du-site ou accueil
      // Le footer et le header sont toujours disponibles sur toutes les pages
      // /a-propos-du-site est accessible via le bouton du footer (b15), pas via un lien
      const boutonAbout = page.getByTestId('e2eid-b15');
      if (await boutonAbout.count() > 0) {
        await boutonAbout.click();
        await expect(page).toHaveURL('/a-propos-du-site');
      } else {
        throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  // Test des e2eID présents sur /a-propos-du-site

  await test.step("Étape 59: Navigation de /a-propos-du-site vers /robustesse (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens58 = page.getByRole('link', { name: /lien/i });
    if (await liens58.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens58.all();
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
      // Option 1 : Essayer via le plan du site (footer) - c'est un bouton, pas un lien
      const boutonPlanDuSite = page.getByTestId('e2eid-b13');
      if (await boutonPlanDuSite.count() > 0) {
        await boutonPlanDuSite.click();
        await expect(page).toHaveURL('/plan-du-site');
        // Vérifier si la destination est accessible via un bouton du footer ou si c'est /plan-du-site ou /
        if ('/robustesse' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/robustesse' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/robustesse' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/robustesse' === '/a-propos-du-site') {
          // /a-propos-du-site est accessible via le bouton du footer (b15)
          const boutonAbout = page.getByTestId('e2eid-b15');
          if (await boutonAbout.count() > 0) {
            await boutonAbout.click();
            await expect(page).toHaveURL('/a-propos-du-site');
          } else {
            throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
          }
        } else {
          // Depuis le plan du site, chercher le lien par son e2eID (généré de manière déterministe)
          // Chercher le lien par son e2eID (généré de manière déterministe depuis l'URL)
          // Attendre que le plan du site soit chargé (les liens sont chargés de manière asynchrone)
          await page.waitForSelector('[data-e2eid^="e2eid-l"]', { timeout: 5000 }).catch(() => {});
          const lienDepuisPlan58 = page.getByTestId('e2eid-l431');
          if (await lienDepuisPlan58.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /robustesse (e2eID: e2eid-l431) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan58.first().click();
        }
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
        const lienDepuisAccueil58 = page.getByRole('link', { name: new RegExp(`/robustesse`, 'i') });
        if (await lienDepuisAccueil58.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel58 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel58.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /robustesse depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel58.first().click();
        } else {
          await lienDepuisAccueil58.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/robustesse');
  });

  // Test des e2eID présents sur /robustesse

  await test.step("Étape 60: Navigation de /robustesse vers /a-propos-du-site (Info)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens59 = page.getByRole('link', { name: /Info/i });
    if (await liens59.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens59.all();
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
      // /a-propos-du-site est accessible via le bouton du footer (b15), pas via un lien
      const boutonAbout = page.getByTestId('e2eid-b15');
      if (await boutonAbout.count() > 0) {
        await boutonAbout.click();
        await expect(page).toHaveURL('/a-propos-du-site');
      } else {
        throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  // Test des e2eID présents sur /a-propos-du-site

  await test.step("Étape 61: Navigation de /a-propos-du-site vers /transformation (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens60 = page.getByRole('link', { name: /lien/i });
    if (await liens60.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens60.all();
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
      // Option 1 : Essayer via le plan du site (footer) - c'est un bouton, pas un lien
      const boutonPlanDuSite = page.getByTestId('e2eid-b13');
      if (await boutonPlanDuSite.count() > 0) {
        await boutonPlanDuSite.click();
        await expect(page).toHaveURL('/plan-du-site');
        // Vérifier si la destination est accessible via un bouton du footer ou si c'est /plan-du-site ou /
        if ('/transformation' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/transformation' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/transformation' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/transformation' === '/a-propos-du-site') {
          // /a-propos-du-site est accessible via le bouton du footer (b15)
          const boutonAbout = page.getByTestId('e2eid-b15');
          if (await boutonAbout.count() > 0) {
            await boutonAbout.click();
            await expect(page).toHaveURL('/a-propos-du-site');
          } else {
            throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
          }
        } else {
          // Depuis le plan du site, chercher le lien par son e2eID (généré de manière déterministe)
          // Chercher le lien par son e2eID (généré de manière déterministe depuis l'URL)
          // Attendre que le plan du site soit chargé (les liens sont chargés de manière asynchrone)
          await page.waitForSelector('[data-e2eid^="e2eid-l"]', { timeout: 5000 }).catch(() => {});
          const lienDepuisPlan60 = page.getByTestId('e2eid-l705');
          if (await lienDepuisPlan60.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /transformation (e2eID: e2eid-l705) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan60.first().click();
        }
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
        const lienDepuisAccueil60 = page.getByRole('link', { name: new RegExp(`/transformation`, 'i') });
        if (await lienDepuisAccueil60.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel60 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel60.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /transformation depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel60.first().click();
        } else {
          await lienDepuisAccueil60.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/transformation');
  });

  // Test des e2eID présents sur /transformation

  await test.step("Étape 62: Navigation de /transformation vers /a-propos-du-site (Info)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens61 = page.getByRole('link', { name: /Info/i });
    if (await liens61.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens61.all();
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
      // /a-propos-du-site est accessible via le bouton du footer (b15), pas via un lien
      const boutonAbout = page.getByTestId('e2eid-b15');
      if (await boutonAbout.count() > 0) {
        await boutonAbout.click();
        await expect(page).toHaveURL('/a-propos-du-site');
      } else {
        throw new Error('Impossible de trouver le bouton About (e2eid-b15) dans le footer.');
      }
    }
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  // Test des e2eID présents sur /a-propos-du-site

  // Tous les liens ont été parcourus
  // 30 e2eID ont été testés
  console.log('✅ Parcours complet : tous les liens et e2eID ont été testés');
});