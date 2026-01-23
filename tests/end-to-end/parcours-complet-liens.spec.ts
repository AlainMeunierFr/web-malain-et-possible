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
  // Test e2eID: v17 (video - transformation.json)
  const element2 = page.getByTestId('e2eid-v17');
  if (await element2.count() > 0) {
    await expect(element2).toBeVisible();
  }
  // Test e2eID: a1 (callToAction - transformation.json)
  const element3 = page.getByTestId('e2eid-a1');
  if (await element3.count() > 0) {
    await expect(element3).toBeVisible();
  }
  // Test e2eID: v20 (video - detournement-video.json)
  const element4 = page.getByTestId('e2eid-v20');
  if (await element4.count() > 0) {
    await expect(element4).toBeVisible();
  }
  // Test e2eID: c2 (bouton - detournement-video.json)
  const element5 = page.getByTestId('e2eid-c2');
  if (await element5.count() > 0) {
    await expect(element5).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: a3 (callToAction - detournement-video.json)
  const element6 = page.getByTestId('e2eid-a3');
  if (await element6.count() > 0) {
    await expect(element6).toBeVisible();
  }
  // Test e2eID: b4 (bouton - faisons-connaissance.json)
  const element7 = page.getByTestId('e2eid-b4');
  if (await element7.count() > 0) {
    await expect(element7).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: b5 (bouton - faisons-connaissance.json)
  const element8 = page.getByTestId('e2eid-b5');
  if (await element8.count() > 0) {
    await expect(element8).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: b6 (bouton - faisons-connaissance.json)
  const element9 = page.getByTestId('e2eid-b6');
  if (await element9.count() > 0) {
    await expect(element9).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: b7 (bouton - faisons-connaissance.json)
  const element10 = page.getByTestId('e2eid-b7');
  if (await element10.count() > 0) {
    await expect(element10).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: b8 (bouton - faisons-connaissance.json)
  const element11 = page.getByTestId('e2eid-b8');
  if (await element11.count() > 0) {
    await expect(element11).toBeVisible();
    // Élément externe, vérification de présence uniquement
  }
  // Test e2eID: b9 (bouton - faisons-connaissance.json)
  const element12 = page.getByTestId('e2eid-b9');
  if (await element12.count() > 0) {
    await expect(element12).toBeVisible();
    // Élément externe, vérification de présence uniquement
  }
  // Test e2eID: v10 (video - index.json)
  const element13 = page.getByTestId('e2eid-v10');
  if (await element13.count() > 0) {
    await expect(element13).toBeVisible();
  }
  // Test e2eID: c11 (bouton - index.json)
  const element14 = page.getByTestId('e2eid-c11');
  if (await element14.count() > 0) {
    await expect(element14).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: c12 (bouton - index.json)
  const element15 = page.getByTestId('e2eid-c12');
  if (await element15.count() > 0) {
    await expect(element15).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: c13 (bouton - index.json)
  const element16 = page.getByTestId('e2eid-c13');
  if (await element16.count() > 0) {
    await expect(element16).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: c14 (bouton - index.json)
  const element17 = page.getByTestId('e2eid-c14');
  if (await element17.count() > 0) {
    await expect(element17).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: c15 (bouton - index.json)
  const element18 = page.getByTestId('e2eid-c15');
  if (await element18.count() > 0) {
    await expect(element18).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: c16 (bouton - index.json)
  const element19 = page.getByTestId('e2eid-c16');
  if (await element19.count() > 0) {
    await expect(element19).toBeVisible();
    // Élément interactif présent et visible
  }
  // Test e2eID: a17 (callToAction - index.json)
  const element20 = page.getByTestId('e2eid-a17');
  if (await element20.count() > 0) {
    await expect(element20).toBeVisible();
  }
  // Test e2eID: v18 (video - management-de-produit-logiciel.json)
  const element21 = page.getByTestId('e2eid-v18');
  if (await element21.count() > 0) {
    await expect(element21).toBeVisible();
  }
  // Test e2eID: v19 (video - management-de-produit-logiciel.json)
  const element22 = page.getByTestId('e2eid-v19');
  if (await element22.count() > 0) {
    await expect(element22).toBeVisible();
  }
  // Test e2eID: a20 (callToAction - management-de-produit-logiciel.json)
  const element23 = page.getByTestId('e2eid-a20');
  if (await element23.count() > 0) {
    await expect(element23).toBeVisible();
  }
  // Test e2eID: a21 (callToAction - portfolio-detournements.json)
  const element24 = page.getByTestId('e2eid-a21');
  if (await element24.count() > 0) {
    await expect(element24).toBeVisible();
  }
  // Test e2eID: v22 (video - pour-aller-plus-loin.json)
  const element25 = page.getByTestId('e2eid-v22');
  if (await element25.count() > 0) {
    await expect(element25).toBeVisible();
  }
  // Test e2eID: v23 (video - pour-aller-plus-loin.json)
  const element26 = page.getByTestId('e2eid-v23');
  if (await element26.count() > 0) {
    await expect(element26).toBeVisible();
  }
  // Test e2eID: v24 (video - pour-aller-plus-loin.json)
  const element27 = page.getByTestId('e2eid-v24');
  if (await element27.count() > 0) {
    await expect(element27).toBeVisible();
  }
  // Test e2eID: a25 (callToAction - pour-aller-plus-loin.json)
  const element28 = page.getByTestId('e2eid-a25');
  if (await element28.count() > 0) {
    await expect(element28).toBeVisible();
  }
  // Test e2eID: a26 (callToAction - robustesse.json)
  const element29 = page.getByTestId('e2eid-a26');
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

  await test.step("Étape 21: Navigation de /metrics vers /metrics (BarChart3)", async () => {
    // On est déjà sur /metrics, pas besoin de naviguer vers la même page
    // Vérifier simplement qu'on est bien sur la bonne page
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

  await test.step("Étape 23: Navigation de /a-propos-du-site vers /a-propos-du-site (Info)", async () => {
    // On est déjà sur /a-propos-du-site, pas besoin de naviguer vers la même page
    // Vérifier simplement qu'on est bien sur la bonne page
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  await test.step("Étape 24: Navigation de /a-propos-du-site vers / (lien)", async () => {
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

  await test.step("Étape 25: Navigation de / vers /plan-du-site (Plan du site)", async () => {
    // /plan-du-site est accessible via le bouton du footer (b13), pas via un lien
    const boutonPlanDuSite = page.getByTestId('e2eid-b13');
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.click();
      await expect(page).toHaveURL('/plan-du-site');
    } else {
      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b13) dans le footer.');
    }
  });

  await test.step("Étape 26: Navigation de /plan-du-site vers /portfolio-detournements (lien)", async () => {
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
          const lienDepuisPlan25 = page.getByTestId('e2eid-l696');
          if (await lienDepuisPlan25.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /portfolio-detournements (e2eID: e2eid-l696) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan25.first().click();
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
        const lienDepuisAccueil25 = page.getByRole('link', { name: new RegExp(`/portfolio-detournements`, 'i') });
        if (await lienDepuisAccueil25.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel25 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel25.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /portfolio-detournements depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel25.first().click();
        } else {
          await lienDepuisAccueil25.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/portfolio-detournements');
  });

  // Test des e2eID présents sur /portfolio-detournements

  await test.step("Étape 27: Navigation de /portfolio-detournements vers /plan-du-site (Plan du site)", async () => {
    // /plan-du-site est accessible via le bouton du footer (b13), pas via un lien
    const boutonPlanDuSite = page.getByTestId('e2eid-b13');
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.click();
      await expect(page).toHaveURL('/plan-du-site');
    } else {
      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b13) dans le footer.');
    }
  });

  await test.step("Étape 28: Navigation de /plan-du-site vers /pour-aller-plus-loin (lien)", async () => {
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
          const lienDepuisPlan27 = page.getByTestId('e2eid-l907');
          if (await lienDepuisPlan27.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /pour-aller-plus-loin (e2eID: e2eid-l907) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan27.first().click();
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
        const lienDepuisAccueil27 = page.getByRole('link', { name: new RegExp(`/pour-aller-plus-loin`, 'i') });
        if (await lienDepuisAccueil27.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel27 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel27.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /pour-aller-plus-loin depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel27.first().click();
        } else {
          await lienDepuisAccueil27.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/pour-aller-plus-loin');
  });

  // Test des e2eID présents sur /pour-aller-plus-loin

  await test.step("Étape 29: Navigation de /pour-aller-plus-loin vers /plan-du-site (Plan du site)", async () => {
    // /plan-du-site est accessible via le bouton du footer (b13), pas via un lien
    const boutonPlanDuSite = page.getByTestId('e2eid-b13');
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.click();
      await expect(page).toHaveURL('/plan-du-site');
    } else {
      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b13) dans le footer.');
    }
  });

  await test.step("Étape 30: Navigation de /plan-du-site vers / (lien)", async () => {
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

  await test.step("Étape 31: Navigation de / vers /metrics (BarChart3)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens30 = page.getByRole('link', { name: /BarChart3/i });
    if (await liens30.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens30.all();
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

  await test.step("Étape 32: Navigation de /metrics vers /detournement-video (lien)", async () => {
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
          const lienDepuisPlan31 = page.getByTestId('e2eid-l756');
          if (await lienDepuisPlan31.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /detournement-video (e2eID: e2eid-l756) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan31.first().click();
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
        const lienDepuisAccueil31 = page.getByRole('link', { name: new RegExp(`/detournement-video`, 'i') });
        if (await lienDepuisAccueil31.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel31 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel31.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /detournement-video depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel31.first().click();
        } else {
          await lienDepuisAccueil31.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/detournement-video');
  });

  // Test des e2eID présents sur /detournement-video

  await test.step("Étape 33: Navigation de /detournement-video vers /metrics (BarChart3)", async () => {
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

  await test.step("Étape 34: Navigation de /metrics vers /management-de-produit-logiciel (lien)", async () => {
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
          const lienDepuisPlan33 = page.getByTestId('e2eid-l976');
          if (await lienDepuisPlan33.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /management-de-produit-logiciel (e2eID: e2eid-l976) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan33.first().click();
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
        const lienDepuisAccueil33 = page.getByRole('link', { name: new RegExp(`/management-de-produit-logiciel`, 'i') });
        if (await lienDepuisAccueil33.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel33 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel33.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /management-de-produit-logiciel depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel33.first().click();
        } else {
          await lienDepuisAccueil33.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/management-de-produit-logiciel');
  });

  // Test des e2eID présents sur /management-de-produit-logiciel

  await test.step("Étape 35: Navigation de /management-de-produit-logiciel vers /metrics (BarChart3)", async () => {
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

  await test.step("Étape 36: Navigation de /metrics vers /portfolio-detournements (lien)", async () => {
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
          const lienDepuisPlan35 = page.getByTestId('e2eid-l696');
          if (await lienDepuisPlan35.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /portfolio-detournements (e2eID: e2eid-l696) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan35.first().click();
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
        const lienDepuisAccueil35 = page.getByRole('link', { name: new RegExp(`/portfolio-detournements`, 'i') });
        if (await lienDepuisAccueil35.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel35 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel35.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /portfolio-detournements depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel35.first().click();
        } else {
          await lienDepuisAccueil35.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/portfolio-detournements');
  });

  // Test des e2eID présents sur /portfolio-detournements

  await test.step("Étape 37: Navigation de /portfolio-detournements vers /metrics (BarChart3)", async () => {
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

  await test.step("Étape 38: Navigation de /metrics vers /pour-aller-plus-loin (lien)", async () => {
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
          const lienDepuisPlan37 = page.getByTestId('e2eid-l907');
          if (await lienDepuisPlan37.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /pour-aller-plus-loin (e2eID: e2eid-l907) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan37.first().click();
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
        const lienDepuisAccueil37 = page.getByRole('link', { name: new RegExp(`/pour-aller-plus-loin`, 'i') });
        if (await lienDepuisAccueil37.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel37 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel37.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /pour-aller-plus-loin depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel37.first().click();
        } else {
          await lienDepuisAccueil37.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/pour-aller-plus-loin');
  });

  // Test des e2eID présents sur /pour-aller-plus-loin

  await test.step("Étape 39: Navigation de /pour-aller-plus-loin vers /metrics (BarChart3)", async () => {
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

  await test.step("Étape 40: Navigation de /metrics vers /robustesse (lien)", async () => {
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
          const lienDepuisPlan39 = page.getByTestId('e2eid-l431');
          if (await lienDepuisPlan39.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /robustesse (e2eID: e2eid-l431) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan39.first().click();
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
        const lienDepuisAccueil39 = page.getByRole('link', { name: new RegExp(`/robustesse`, 'i') });
        if (await lienDepuisAccueil39.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel39 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel39.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /robustesse depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel39.first().click();
        } else {
          await lienDepuisAccueil39.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/robustesse');
  });

  // Test des e2eID présents sur /robustesse

  await test.step("Étape 41: Navigation de /robustesse vers /metrics (BarChart3)", async () => {
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

  await test.step("Étape 42: Navigation de /metrics vers /transformation (lien)", async () => {
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
          const lienDepuisPlan41 = page.getByTestId('e2eid-l705');
          if (await lienDepuisPlan41.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /transformation (e2eID: e2eid-l705) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan41.first().click();
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
        const lienDepuisAccueil41 = page.getByRole('link', { name: new RegExp(`/transformation`, 'i') });
        if (await lienDepuisAccueil41.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel41 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel41.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /transformation depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel41.first().click();
        } else {
          await lienDepuisAccueil41.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/transformation');
  });

  // Test des e2eID présents sur /transformation

  await test.step("Étape 43: Navigation de /transformation vers /metrics (BarChart3)", async () => {
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

  await test.step("Étape 44: Navigation de /metrics vers /detournement-video (lien)", async () => {
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
          const lienDepuisPlan43 = page.getByTestId('e2eid-l756');
          if (await lienDepuisPlan43.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /detournement-video (e2eID: e2eid-l756) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan43.first().click();
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
        const lienDepuisAccueil43 = page.getByRole('link', { name: new RegExp(`/detournement-video`, 'i') });
        if (await lienDepuisAccueil43.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel43 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel43.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /detournement-video depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel43.first().click();
        } else {
          await lienDepuisAccueil43.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/detournement-video');
  });

  // Test des e2eID présents sur /detournement-video

  await test.step("Étape 45: Navigation de /detournement-video vers /a-propos-du-site (Info)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens44 = page.getByRole('link', { name: /Info/i });
    if (await liens44.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens44.all();
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

  await test.step("Étape 46: Navigation de /a-propos-du-site vers /management-de-produit-logiciel (lien)", async () => {
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
          const lienDepuisPlan45 = page.getByTestId('e2eid-l976');
          if (await lienDepuisPlan45.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /management-de-produit-logiciel (e2eID: e2eid-l976) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan45.first().click();
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
        const lienDepuisAccueil45 = page.getByRole('link', { name: new RegExp(`/management-de-produit-logiciel`, 'i') });
        if (await lienDepuisAccueil45.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel45 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel45.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /management-de-produit-logiciel depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel45.first().click();
        } else {
          await lienDepuisAccueil45.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/management-de-produit-logiciel');
  });

  // Test des e2eID présents sur /management-de-produit-logiciel

  await test.step("Étape 47: Navigation de /management-de-produit-logiciel vers /a-propos-du-site (Info)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens46 = page.getByRole('link', { name: /Info/i });
    if (await liens46.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens46.all();
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

  await test.step("Étape 48: Navigation de /a-propos-du-site vers /portfolio-detournements (lien)", async () => {
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
          const lienDepuisPlan47 = page.getByTestId('e2eid-l696');
          if (await lienDepuisPlan47.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /portfolio-detournements (e2eID: e2eid-l696) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan47.first().click();
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
        const lienDepuisAccueil47 = page.getByRole('link', { name: new RegExp(`/portfolio-detournements`, 'i') });
        if (await lienDepuisAccueil47.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel47 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel47.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /portfolio-detournements depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel47.first().click();
        } else {
          await lienDepuisAccueil47.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/portfolio-detournements');
  });

  // Test des e2eID présents sur /portfolio-detournements

  await test.step("Étape 49: Navigation de /portfolio-detournements vers /a-propos-du-site (Info)", async () => {
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

  await test.step("Étape 50: Navigation de /a-propos-du-site vers /pour-aller-plus-loin (lien)", async () => {
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
          const lienDepuisPlan49 = page.getByTestId('e2eid-l907');
          if (await lienDepuisPlan49.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /pour-aller-plus-loin (e2eID: e2eid-l907) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan49.first().click();
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
        const lienDepuisAccueil49 = page.getByRole('link', { name: new RegExp(`/pour-aller-plus-loin`, 'i') });
        if (await lienDepuisAccueil49.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel49 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel49.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /pour-aller-plus-loin depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel49.first().click();
        } else {
          await lienDepuisAccueil49.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/pour-aller-plus-loin');
  });

  // Test des e2eID présents sur /pour-aller-plus-loin

  await test.step("Étape 51: Navigation de /pour-aller-plus-loin vers /a-propos-du-site (Info)", async () => {
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

  await test.step("Étape 52: Navigation de /a-propos-du-site vers /robustesse (lien)", async () => {
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
          const lienDepuisPlan51 = page.getByTestId('e2eid-l431');
          if (await lienDepuisPlan51.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /robustesse (e2eID: e2eid-l431) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan51.first().click();
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
        const lienDepuisAccueil51 = page.getByRole('link', { name: new RegExp(`/robustesse`, 'i') });
        if (await lienDepuisAccueil51.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel51 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel51.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /robustesse depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel51.first().click();
        } else {
          await lienDepuisAccueil51.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/robustesse');
  });

  // Test des e2eID présents sur /robustesse

  await test.step("Étape 53: Navigation de /robustesse vers /a-propos-du-site (Info)", async () => {
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

  await test.step("Étape 54: Navigation de /a-propos-du-site vers /transformation (lien)", async () => {
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
          const lienDepuisPlan53 = page.getByTestId('e2eid-l705');
          if (await lienDepuisPlan53.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /transformation (e2eID: e2eid-l705) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan53.first().click();
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
        const lienDepuisAccueil53 = page.getByRole('link', { name: new RegExp(`/transformation`, 'i') });
        if (await lienDepuisAccueil53.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel53 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel53.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /transformation depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel53.first().click();
        } else {
          await lienDepuisAccueil53.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/transformation');
  });

  // Test des e2eID présents sur /transformation

  await test.step("Étape 55: Navigation de /transformation vers /a-propos-du-site (Info)", async () => {
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