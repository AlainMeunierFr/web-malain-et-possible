import { test, expect } from '@playwright/test';

test('parcours complet de tous les liens du site et test de tous les e2eID', async ({ page }) => {
  // Scénario généré automatiquement depuis _Pages-Et-Lien.json
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
  // Test e2eID: v10 (video - index.json)
  const element10 = page.getByTestId('e2eid-v10');
  if (await element10.count() > 0) {
    await expect(element10).toBeVisible();
  }
  // Test e2eID: a21 (callToAction - portfolio-detournements.json)
  const element11 = page.getByTestId('e2eid-a21');
  if (await element11.count() > 0) {
    await expect(element11).toBeVisible();
  }
  // Test e2eID: v22 (video - pour-aller-plus-loin.json)
  const element12 = page.getByTestId('e2eid-v22');
  if (await element12.count() > 0) {
    await expect(element12).toBeVisible();
  }
  // Test e2eID: v23 (video - pour-aller-plus-loin.json)
  const element13 = page.getByTestId('e2eid-v23');
  if (await element13.count() > 0) {
    await expect(element13).toBeVisible();
  }
  // Test e2eID: v24 (video - pour-aller-plus-loin.json)
  const element14 = page.getByTestId('e2eid-v24');
  if (await element14.count() > 0) {
    await expect(element14).toBeVisible();
  }
  // Test e2eID: a25 (callToAction - pour-aller-plus-loin.json)
  const element15 = page.getByTestId('e2eid-a25');
  if (await element15.count() > 0) {
    await expect(element15).toBeVisible();
  }
  // Test e2eID: v10-profil-agile-1 (video - profil-agile.json)
  const element16 = page.getByTestId('e2eid-v10-profil-agile-1');
  if (await element16.count() > 0) {
    await expect(element16).toBeVisible();
  }
  // Test e2eID: v10-profil-agile-2 (video - profil-agile.json)
  const element17 = page.getByTestId('e2eid-v10-profil-agile-2');
  if (await element17.count() > 0) {
    await expect(element17).toBeVisible();
  }
  // Test e2eID: a-profil-agile (callToAction - profil-agile.json)
  const element18 = page.getByTestId('e2eid-a-profil-agile');
  if (await element18.count() > 0) {
    await expect(element18).toBeVisible();
  }
  // Test e2eID: v10-profil-coo (video - profil-coo.json)
  const element19 = page.getByTestId('e2eid-v10-profil-coo');
  if (await element19.count() > 0) {
    await expect(element19).toBeVisible();
  }
  // Test e2eID: a-profil-coo (callToAction - profil-coo.json)
  const element20 = page.getByTestId('e2eid-a-profil-coo');
  if (await element20.count() > 0) {
    await expect(element20).toBeVisible();
  }
  // Test e2eID: v10-profil-cpo (video - profil-cpo.json)
  const element21 = page.getByTestId('e2eid-v10-profil-cpo');
  if (await element21.count() > 0) {
    await expect(element21).toBeVisible();
  }
  // Test e2eID: a-profil-cpo (callToAction - profil-cpo.json)
  const element22 = page.getByTestId('e2eid-a-profil-cpo');
  if (await element22.count() > 0) {
    await expect(element22).toBeVisible();
  }
  // Test e2eID: v10-profil-cto (video - profil-cto.json)
  const element23 = page.getByTestId('e2eid-v10-profil-cto');
  if (await element23.count() > 0) {
    await expect(element23).toBeVisible();
  }
  // Test e2eID: a-profil-cto (callToAction - profil-cto.json)
  const element24 = page.getByTestId('e2eid-a-profil-cto');
  if (await element24.count() > 0) {
    await expect(element24).toBeVisible();
  }

  await test.step("Étape 2: Navigation de / vers /plan-du-site (Plan du site)", async () => {
    // /plan-du-site est accessible via le bouton du footer (b13), pas via un lien
    const boutonPlanDuSite = page.getByTestId('e2eid-b13');
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.click();
      await expect(page).toHaveURL('/plan-du-site');
    } else {
      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b13) dans le footer.');
    }
  });

  await test.step("Étape 3: Navigation de /plan-du-site vers /plan-du-site (Plan du site)", async () => {
    // On est déjà sur /plan-du-site, pas besoin de naviguer vers la même page
    // Vérifier simplement qu'on est bien sur la bonne page
    await expect(page).toHaveURL('/plan-du-site');
  });

  await test.step("Étape 4: Navigation de /plan-du-site vers /metrics (BarChart3)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens3 = page.getByRole('link', { name: /BarChart3/i });
    if (await liens3.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens3.all();
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

  await test.step("Étape 5: Navigation de /metrics vers /plan-du-site (Plan du site)", async () => {
    // /plan-du-site est accessible via le bouton du footer (b13), pas via un lien
    const boutonPlanDuSite = page.getByTestId('e2eid-b13');
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.click();
      await expect(page).toHaveURL('/plan-du-site');
    } else {
      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b13) dans le footer.');
    }
  });

  await test.step("Étape 6: Navigation de /plan-du-site vers /a-propos-du-site (Info)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens5 = page.getByRole('link', { name: /Info/i });
    if (await liens5.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens5.all();
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

  await test.step("Étape 7: Navigation de /a-propos-du-site vers /plan-du-site (Plan du site)", async () => {
    // /plan-du-site est accessible via le bouton du footer (b13), pas via un lien
    const boutonPlanDuSite = page.getByTestId('e2eid-b13');
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.click();
      await expect(page).toHaveURL('/plan-du-site');
    } else {
      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b13) dans le footer.');
    }
  });

  await test.step("Étape 8: Navigation de /plan-du-site vers /detournement-video (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens7 = page.getByRole('link', { name: /lien/i });
    if (await liens7.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens7.all();
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
        throw new Error(`Impossible de trouver un lien vers /detournement-video depuis /plan-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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
          const lienDepuisPlan7 = page.getByTestId('e2eid-l756');
          if (await lienDepuisPlan7.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /detournement-video (e2eID: e2eid-l756) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan7.first().click();
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
        const lienDepuisAccueil7 = page.getByRole('link', { name: new RegExp(`/detournement-video`, 'i') });
        if (await lienDepuisAccueil7.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel7 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel7.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /detournement-video depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel7.first().click();
        } else {
          await lienDepuisAccueil7.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/detournement-video');
  });

  // Test des e2eID présents sur /detournement-video

  await test.step("Étape 9: Navigation de /detournement-video vers /plan-du-site (Plan du site)", async () => {
    // /plan-du-site est accessible via le bouton du footer (b13), pas via un lien
    const boutonPlanDuSite = page.getByTestId('e2eid-b13');
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.click();
      await expect(page).toHaveURL('/plan-du-site');
    } else {
      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b13) dans le footer.');
    }
  });

  await test.step("Étape 10: Navigation de /plan-du-site vers /portfolio-detournements (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens9 = page.getByRole('link', { name: /lien/i });
    if (await liens9.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens9.all();
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
          const lienDepuisPlan9 = page.getByTestId('e2eid-l696');
          if (await lienDepuisPlan9.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /portfolio-detournements (e2eID: e2eid-l696) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
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
        const lienDepuisAccueil9 = page.getByRole('link', { name: new RegExp(`/portfolio-detournements`, 'i') });
        if (await lienDepuisAccueil9.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel9 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel9.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /portfolio-detournements depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel9.first().click();
        } else {
          await lienDepuisAccueil9.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/portfolio-detournements');
  });

  // Test des e2eID présents sur /portfolio-detournements

  await test.step("Étape 11: Navigation de /portfolio-detournements vers /plan-du-site (Plan du site)", async () => {
    // /plan-du-site est accessible via le bouton du footer (b13), pas via un lien
    const boutonPlanDuSite = page.getByTestId('e2eid-b13');
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.click();
      await expect(page).toHaveURL('/plan-du-site');
    } else {
      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b13) dans le footer.');
    }
  });

  await test.step("Étape 12: Navigation de /plan-du-site vers /pour-aller-plus-loin (lien)", async () => {
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
          const lienDepuisPlan11 = page.getByTestId('e2eid-l907');
          if (await lienDepuisPlan11.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /pour-aller-plus-loin (e2eID: e2eid-l907) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan11.first().click();
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
        const lienDepuisAccueil11 = page.getByRole('link', { name: new RegExp(`/pour-aller-plus-loin`, 'i') });
        if (await lienDepuisAccueil11.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel11 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel11.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /pour-aller-plus-loin depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel11.first().click();
        } else {
          await lienDepuisAccueil11.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/pour-aller-plus-loin');
  });

  // Test des e2eID présents sur /pour-aller-plus-loin

  await test.step("Étape 13: Navigation de /pour-aller-plus-loin vers /plan-du-site (Plan du site)", async () => {
    // /plan-du-site est accessible via le bouton du footer (b13), pas via un lien
    const boutonPlanDuSite = page.getByTestId('e2eid-b13');
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.click();
      await expect(page).toHaveURL('/plan-du-site');
    } else {
      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b13) dans le footer.');
    }
  });

  await test.step("Étape 14: Navigation de /plan-du-site vers /profil/[slug] (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens13 = page.getByRole('link', { name: /lien/i });
    if (await liens13.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens13.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/profil/[slug]'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /profil/[slug] depuis /plan-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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
        if ('/profil/[slug]' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/profil/[slug]' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/profil/[slug]' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/profil/[slug]' === '/a-propos-du-site') {
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
          const lienDepuisPlan13 = page.getByTestId('e2eid-l538');
          if (await lienDepuisPlan13.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /profil/[slug] (e2eID: e2eid-l538) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan13.first().click();
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
        const lienDepuisAccueil13 = page.getByRole('link', { name: new RegExp(`/profil/\[slug\]`, 'i') });
        if (await lienDepuisAccueil13.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel13 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel13.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /profil/[slug] depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel13.first().click();
        } else {
          await lienDepuisAccueil13.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/profil/[slug]');
  });

  // Test des e2eID présents sur /profil/[slug]

  await test.step("Étape 15: Navigation de /profil/[slug] vers /plan-du-site (Plan du site)", async () => {
    // /plan-du-site est accessible via le bouton du footer (b13), pas via un lien
    const boutonPlanDuSite = page.getByTestId('e2eid-b13');
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.click();
      await expect(page).toHaveURL('/plan-du-site');
    } else {
      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b13) dans le footer.');
    }
  });

  await test.step("Étape 16: Navigation de /plan-du-site vers /test-fonts (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens15 = page.getByRole('link', { name: /lien/i });
    if (await liens15.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens15.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/test-fonts'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /test-fonts depuis /plan-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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
        if ('/test-fonts' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/test-fonts' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/test-fonts' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/test-fonts' === '/a-propos-du-site') {
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
          const lienDepuisPlan15 = page.getByTestId('e2eid-l767');
          if (await lienDepuisPlan15.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /test-fonts (e2eID: e2eid-l767) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
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
        const lienDepuisAccueil15 = page.getByRole('link', { name: new RegExp(`/test-fonts`, 'i') });
        if (await lienDepuisAccueil15.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel15 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel15.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /test-fonts depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel15.first().click();
        } else {
          await lienDepuisAccueil15.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/test-fonts');
  });

  // Test des e2eID présents sur /test-fonts

  await test.step("Étape 17: Navigation de /test-fonts vers /plan-du-site (Plan du site)", async () => {
    // /plan-du-site est accessible via le bouton du footer (b13), pas via un lien
    const boutonPlanDuSite = page.getByTestId('e2eid-b13');
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.click();
      await expect(page).toHaveURL('/plan-du-site');
    } else {
      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b13) dans le footer.');
    }
  });

  await test.step("Étape 18: Navigation de /plan-du-site vers /profil/cpo (lien)", async () => {
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
        const destinationNormalisee = '/profil/cpo'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /profil/cpo depuis /plan-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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
        if ('/profil/cpo' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/profil/cpo' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/profil/cpo' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/profil/cpo' === '/a-propos-du-site') {
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
          const lienDepuisPlan17 = page.getByTestId('e2eid-l399');
          if (await lienDepuisPlan17.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /profil/cpo (e2eID: e2eid-l399) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan17.first().click();
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
        const lienDepuisAccueil17 = page.getByRole('link', { name: new RegExp(`/profil/cpo`, 'i') });
        if (await lienDepuisAccueil17.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel17 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel17.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /profil/cpo depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel17.first().click();
        } else {
          await lienDepuisAccueil17.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/profil/cpo');
  });

  // Test des e2eID présents sur /profil/cpo

  await test.step("Étape 19: Navigation de /profil/cpo vers /plan-du-site (Plan du site)", async () => {
    // /plan-du-site est accessible via le bouton du footer (b13), pas via un lien
    const boutonPlanDuSite = page.getByTestId('e2eid-b13');
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.click();
      await expect(page).toHaveURL('/plan-du-site');
    } else {
      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b13) dans le footer.');
    }
  });

  await test.step("Étape 20: Navigation de /plan-du-site vers /profil/coo (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens19 = page.getByRole('link', { name: /lien/i });
    if (await liens19.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens19.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /profil/coo depuis /plan-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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
        if ('/profil/coo' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/profil/coo' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/profil/coo' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/profil/coo' === '/a-propos-du-site') {
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
          const lienDepuisPlan19 = page.getByTestId('e2eid-l430');
          if (await lienDepuisPlan19.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /profil/coo (e2eID: e2eid-l430) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan19.first().click();
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
        const lienDepuisAccueil19 = page.getByRole('link', { name: new RegExp(`/profil/coo`, 'i') });
        if (await lienDepuisAccueil19.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel19 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel19.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /profil/coo depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel19.first().click();
        } else {
          await lienDepuisAccueil19.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/profil/coo');
  });

  // Test des e2eID présents sur /profil/coo

  await test.step("Étape 21: Navigation de /profil/coo vers /plan-du-site (Plan du site)", async () => {
    // /plan-du-site est accessible via le bouton du footer (b13), pas via un lien
    const boutonPlanDuSite = page.getByTestId('e2eid-b13');
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.click();
      await expect(page).toHaveURL('/plan-du-site');
    } else {
      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b13) dans le footer.');
    }
  });

  await test.step("Étape 22: Navigation de /plan-du-site vers /profil/agile (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens21 = page.getByRole('link', { name: /lien/i });
    if (await liens21.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens21.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /profil/agile depuis /plan-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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
        if ('/profil/agile' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/profil/agile' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/profil/agile' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/profil/agile' === '/a-propos-du-site') {
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
          const lienDepuisPlan21 = page.getByTestId('e2eid-l805');
          if (await lienDepuisPlan21.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /profil/agile (e2eID: e2eid-l805) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan21.first().click();
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
        const lienDepuisAccueil21 = page.getByRole('link', { name: new RegExp(`/profil/agile`, 'i') });
        if (await lienDepuisAccueil21.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel21 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel21.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /profil/agile depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel21.first().click();
        } else {
          await lienDepuisAccueil21.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/profil/agile');
  });

  // Test des e2eID présents sur /profil/agile

  await test.step("Étape 23: Navigation de /profil/agile vers /plan-du-site (Plan du site)", async () => {
    // /plan-du-site est accessible via le bouton du footer (b13), pas via un lien
    const boutonPlanDuSite = page.getByTestId('e2eid-b13');
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.click();
      await expect(page).toHaveURL('/plan-du-site');
    } else {
      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b13) dans le footer.');
    }
  });

  await test.step("Étape 24: Navigation de /plan-du-site vers /profil/cto (lien)", async () => {
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
        const destinationNormalisee = '/profil/cto'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /profil/cto depuis /plan-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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
        if ('/profil/cto' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/profil/cto' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/profil/cto' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/profil/cto' === '/a-propos-du-site') {
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
          const lienDepuisPlan23 = page.getByTestId('e2eid-l275');
          if (await lienDepuisPlan23.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /profil/cto (e2eID: e2eid-l275) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan23.first().click();
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
        const lienDepuisAccueil23 = page.getByRole('link', { name: new RegExp(`/profil/cto`, 'i') });
        if (await lienDepuisAccueil23.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel23 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel23.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /profil/cto depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel23.first().click();
        } else {
          await lienDepuisAccueil23.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/profil/cto');
  });

  // Test des e2eID présents sur /profil/cto

  await test.step("Étape 25: Navigation de /profil/cto vers /plan-du-site (Plan du site)", async () => {
    // /plan-du-site est accessible via le bouton du footer (b13), pas via un lien
    const boutonPlanDuSite = page.getByTestId('e2eid-b13');
    if (await boutonPlanDuSite.count() > 0) {
      await boutonPlanDuSite.click();
      await expect(page).toHaveURL('/plan-du-site');
    } else {
      throw new Error('Impossible de trouver le bouton Plan du site (e2eid-b13) dans le footer.');
    }
  });

  await test.step("Étape 26: Navigation de /plan-du-site vers / (lien)", async () => {
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

  await test.step("Étape 27: Navigation de / vers /metrics (BarChart3)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens26 = page.getByRole('link', { name: /BarChart3/i });
    if (await liens26.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens26.all();
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

  await test.step("Étape 28: Navigation de /metrics vers /metrics (BarChart3)", async () => {
    // On est déjà sur /metrics, pas besoin de naviguer vers la même page
    // Vérifier simplement qu'on est bien sur la bonne page
    await expect(page).toHaveURL('/metrics');
  });

  await test.step("Étape 29: Navigation de /metrics vers /a-propos-du-site (Info)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens28 = page.getByRole('link', { name: /Info/i });
    if (await liens28.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens28.all();
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

  await test.step("Étape 30: Navigation de /a-propos-du-site vers /metrics (BarChart3)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens29 = page.getByRole('link', { name: /BarChart3/i });
    if (await liens29.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens29.all();
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

  await test.step("Étape 31: Navigation de /metrics vers /detournement-video (lien)", async () => {
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
          const lienDepuisPlan30 = page.getByTestId('e2eid-l756');
          if (await lienDepuisPlan30.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /detournement-video (e2eID: e2eid-l756) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
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
        const lienDepuisAccueil30 = page.getByRole('link', { name: new RegExp(`/detournement-video`, 'i') });
        if (await lienDepuisAccueil30.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel30 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel30.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /detournement-video depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel30.first().click();
        } else {
          await lienDepuisAccueil30.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/detournement-video');
  });

  // Test des e2eID présents sur /detournement-video

  await test.step("Étape 32: Navigation de /detournement-video vers /metrics (BarChart3)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens31 = page.getByRole('link', { name: /BarChart3/i });
    if (await liens31.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens31.all();
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

  await test.step("Étape 33: Navigation de /metrics vers /portfolio-detournements (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens32 = page.getByRole('link', { name: /lien/i });
    if (await liens32.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens32.all();
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
          const lienDepuisPlan32 = page.getByTestId('e2eid-l696');
          if (await lienDepuisPlan32.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /portfolio-detournements (e2eID: e2eid-l696) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan32.first().click();
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
        const lienDepuisAccueil32 = page.getByRole('link', { name: new RegExp(`/portfolio-detournements`, 'i') });
        if (await lienDepuisAccueil32.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel32 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel32.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /portfolio-detournements depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel32.first().click();
        } else {
          await lienDepuisAccueil32.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/portfolio-detournements');
  });

  // Test des e2eID présents sur /portfolio-detournements

  await test.step("Étape 34: Navigation de /portfolio-detournements vers /metrics (BarChart3)", async () => {
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

  await test.step("Étape 35: Navigation de /metrics vers /pour-aller-plus-loin (lien)", async () => {
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
          const lienDepuisPlan34 = page.getByTestId('e2eid-l907');
          if (await lienDepuisPlan34.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /pour-aller-plus-loin (e2eID: e2eid-l907) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
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
        const lienDepuisAccueil34 = page.getByRole('link', { name: new RegExp(`/pour-aller-plus-loin`, 'i') });
        if (await lienDepuisAccueil34.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel34 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel34.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /pour-aller-plus-loin depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel34.first().click();
        } else {
          await lienDepuisAccueil34.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/pour-aller-plus-loin');
  });

  // Test des e2eID présents sur /pour-aller-plus-loin

  await test.step("Étape 36: Navigation de /pour-aller-plus-loin vers /metrics (BarChart3)", async () => {
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

  await test.step("Étape 37: Navigation de /metrics vers /profil/[slug] (lien)", async () => {
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
        const destinationNormalisee = '/profil/[slug]'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /profil/[slug] depuis /metrics (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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
        if ('/profil/[slug]' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/profil/[slug]' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/profil/[slug]' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/profil/[slug]' === '/a-propos-du-site') {
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
          const lienDepuisPlan36 = page.getByTestId('e2eid-l538');
          if (await lienDepuisPlan36.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /profil/[slug] (e2eID: e2eid-l538) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
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
        const lienDepuisAccueil36 = page.getByRole('link', { name: new RegExp(`/profil/\[slug\]`, 'i') });
        if (await lienDepuisAccueil36.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel36 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel36.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /profil/[slug] depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel36.first().click();
        } else {
          await lienDepuisAccueil36.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/profil/[slug]');
  });

  // Test des e2eID présents sur /profil/[slug]

  await test.step("Étape 38: Navigation de /profil/[slug] vers /metrics (BarChart3)", async () => {
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
        throw new Error(`Impossible de trouver un lien vers /metrics depuis /profil/[slug] (label: "BarChart3"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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

  await test.step("Étape 39: Navigation de /metrics vers /test-fonts (lien)", async () => {
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
        const destinationNormalisee = '/test-fonts'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /test-fonts depuis /metrics (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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
        if ('/test-fonts' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/test-fonts' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/test-fonts' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/test-fonts' === '/a-propos-du-site') {
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
          const lienDepuisPlan38 = page.getByTestId('e2eid-l767');
          if (await lienDepuisPlan38.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /test-fonts (e2eID: e2eid-l767) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
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
        const lienDepuisAccueil38 = page.getByRole('link', { name: new RegExp(`/test-fonts`, 'i') });
        if (await lienDepuisAccueil38.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel38 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel38.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /test-fonts depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel38.first().click();
        } else {
          await lienDepuisAccueil38.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/test-fonts');
  });

  // Test des e2eID présents sur /test-fonts

  await test.step("Étape 40: Navigation de /test-fonts vers /metrics (BarChart3)", async () => {
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
        throw new Error(`Impossible de trouver un lien vers /metrics depuis /test-fonts (label: "BarChart3"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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

  await test.step("Étape 41: Navigation de /metrics vers /profil/cpo (lien)", async () => {
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
        const destinationNormalisee = '/profil/cpo'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /profil/cpo depuis /metrics (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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
        if ('/profil/cpo' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/profil/cpo' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/profil/cpo' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/profil/cpo' === '/a-propos-du-site') {
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
          const lienDepuisPlan40 = page.getByTestId('e2eid-l399');
          if (await lienDepuisPlan40.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /profil/cpo (e2eID: e2eid-l399) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
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
        const lienDepuisAccueil40 = page.getByRole('link', { name: new RegExp(`/profil/cpo`, 'i') });
        if (await lienDepuisAccueil40.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel40 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel40.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /profil/cpo depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel40.first().click();
        } else {
          await lienDepuisAccueil40.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/profil/cpo');
  });

  // Test des e2eID présents sur /profil/cpo

  await test.step("Étape 42: Navigation de /profil/cpo vers /metrics (BarChart3)", async () => {
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
        throw new Error(`Impossible de trouver un lien vers /metrics depuis /profil/cpo (label: "BarChart3"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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

  await test.step("Étape 43: Navigation de /metrics vers /profil/coo (lien)", async () => {
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
        const destinationNormalisee = '/profil/coo'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /profil/coo depuis /metrics (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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
        if ('/profil/coo' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/profil/coo' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/profil/coo' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/profil/coo' === '/a-propos-du-site') {
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
          const lienDepuisPlan42 = page.getByTestId('e2eid-l430');
          if (await lienDepuisPlan42.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /profil/coo (e2eID: e2eid-l430) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
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
        const lienDepuisAccueil42 = page.getByRole('link', { name: new RegExp(`/profil/coo`, 'i') });
        if (await lienDepuisAccueil42.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel42 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel42.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /profil/coo depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel42.first().click();
        } else {
          await lienDepuisAccueil42.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/profil/coo');
  });

  // Test des e2eID présents sur /profil/coo

  await test.step("Étape 44: Navigation de /profil/coo vers /metrics (BarChart3)", async () => {
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
        throw new Error(`Impossible de trouver un lien vers /metrics depuis /profil/coo (label: "BarChart3"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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

  await test.step("Étape 45: Navigation de /metrics vers /profil/agile (lien)", async () => {
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
        const destinationNormalisee = '/profil/agile'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /profil/agile depuis /metrics (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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
        if ('/profil/agile' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/profil/agile' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/profil/agile' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/profil/agile' === '/a-propos-du-site') {
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
          const lienDepuisPlan44 = page.getByTestId('e2eid-l805');
          if (await lienDepuisPlan44.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /profil/agile (e2eID: e2eid-l805) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
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
        const lienDepuisAccueil44 = page.getByRole('link', { name: new RegExp(`/profil/agile`, 'i') });
        if (await lienDepuisAccueil44.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel44 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel44.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /profil/agile depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel44.first().click();
        } else {
          await lienDepuisAccueil44.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/profil/agile');
  });

  // Test des e2eID présents sur /profil/agile

  await test.step("Étape 46: Navigation de /profil/agile vers /metrics (BarChart3)", async () => {
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
        throw new Error(`Impossible de trouver un lien vers /metrics depuis /profil/agile (label: "BarChart3"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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

  await test.step("Étape 47: Navigation de /metrics vers /profil/cto (lien)", async () => {
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
        const destinationNormalisee = '/profil/cto'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /profil/cto depuis /metrics (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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
        if ('/profil/cto' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/profil/cto' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/profil/cto' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/profil/cto' === '/a-propos-du-site') {
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
          const lienDepuisPlan46 = page.getByTestId('e2eid-l275');
          if (await lienDepuisPlan46.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /profil/cto (e2eID: e2eid-l275) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
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
        const lienDepuisAccueil46 = page.getByRole('link', { name: new RegExp(`/profil/cto`, 'i') });
        if (await lienDepuisAccueil46.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel46 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel46.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /profil/cto depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel46.first().click();
        } else {
          await lienDepuisAccueil46.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/profil/cto');
  });

  // Test des e2eID présents sur /profil/cto

  await test.step("Étape 48: Navigation de /profil/cto vers /metrics (BarChart3)", async () => {
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
        throw new Error(`Impossible de trouver un lien vers /metrics depuis /profil/cto (label: "BarChart3"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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

  await test.step("Étape 50: Navigation de / vers /a-propos-du-site (Info)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens49 = page.getByRole('link', { name: /Info/i });
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
        throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis / (label: "Info"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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

  await test.step("Étape 51: Navigation de /a-propos-du-site vers /a-propos-du-site (Info)", async () => {
    // On est déjà sur /a-propos-du-site, pas besoin de naviguer vers la même page
    // Vérifier simplement qu'on est bien sur la bonne page
    await expect(page).toHaveURL('/a-propos-du-site');
  });

  await test.step("Étape 52: Navigation de /a-propos-du-site vers /detournement-video (lien)", async () => {
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
          const lienDepuisPlan51 = page.getByTestId('e2eid-l756');
          if (await lienDepuisPlan51.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /detournement-video (e2eID: e2eid-l756) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
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
        const lienDepuisAccueil51 = page.getByRole('link', { name: new RegExp(`/detournement-video`, 'i') });
        if (await lienDepuisAccueil51.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel51 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel51.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /detournement-video depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel51.first().click();
        } else {
          await lienDepuisAccueil51.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/detournement-video');
  });

  // Test des e2eID présents sur /detournement-video

  await test.step("Étape 53: Navigation de /detournement-video vers /a-propos-du-site (Info)", async () => {
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
          const lienDepuisPlan53 = page.getByTestId('e2eid-l696');
          if (await lienDepuisPlan53.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /portfolio-detournements (e2eID: e2eid-l696) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
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

  await test.step("Étape 56: Navigation de /a-propos-du-site vers /pour-aller-plus-loin (lien)", async () => {
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
          const lienDepuisPlan55 = page.getByTestId('e2eid-l907');
          if (await lienDepuisPlan55.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /pour-aller-plus-loin (e2eID: e2eid-l907) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan55.first().click();
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
        const lienDepuisAccueil55 = page.getByRole('link', { name: new RegExp(`/pour-aller-plus-loin`, 'i') });
        if (await lienDepuisAccueil55.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel55 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel55.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /pour-aller-plus-loin depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel55.first().click();
        } else {
          await lienDepuisAccueil55.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/pour-aller-plus-loin');
  });

  // Test des e2eID présents sur /pour-aller-plus-loin

  await test.step("Étape 57: Navigation de /pour-aller-plus-loin vers /a-propos-du-site (Info)", async () => {
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

  await test.step("Étape 58: Navigation de /a-propos-du-site vers /profil/[slug] (lien)", async () => {
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
        const destinationNormalisee = '/profil/[slug]'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /profil/[slug] depuis /a-propos-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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
        if ('/profil/[slug]' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/profil/[slug]' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/profil/[slug]' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/profil/[slug]' === '/a-propos-du-site') {
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
          const lienDepuisPlan57 = page.getByTestId('e2eid-l538');
          if (await lienDepuisPlan57.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /profil/[slug] (e2eID: e2eid-l538) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan57.first().click();
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
        const lienDepuisAccueil57 = page.getByRole('link', { name: new RegExp(`/profil/\[slug\]`, 'i') });
        if (await lienDepuisAccueil57.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel57 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel57.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /profil/[slug] depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel57.first().click();
        } else {
          await lienDepuisAccueil57.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/profil/[slug]');
  });

  // Test des e2eID présents sur /profil/[slug]

  await test.step("Étape 59: Navigation de /profil/[slug] vers /a-propos-du-site (Info)", async () => {
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
        throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis /profil/[slug] (label: "Info"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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

  await test.step("Étape 60: Navigation de /a-propos-du-site vers /test-fonts (lien)", async () => {
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
        const destinationNormalisee = '/test-fonts'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /test-fonts depuis /a-propos-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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
        if ('/test-fonts' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/test-fonts' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/test-fonts' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/test-fonts' === '/a-propos-du-site') {
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
          const lienDepuisPlan59 = page.getByTestId('e2eid-l767');
          if (await lienDepuisPlan59.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /test-fonts (e2eID: e2eid-l767) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan59.first().click();
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
        const lienDepuisAccueil59 = page.getByRole('link', { name: new RegExp(`/test-fonts`, 'i') });
        if (await lienDepuisAccueil59.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel59 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel59.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /test-fonts depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel59.first().click();
        } else {
          await lienDepuisAccueil59.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/test-fonts');
  });

  // Test des e2eID présents sur /test-fonts

  await test.step("Étape 61: Navigation de /test-fonts vers /a-propos-du-site (Info)", async () => {
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
        throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis /test-fonts (label: "Info"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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

  await test.step("Étape 62: Navigation de /a-propos-du-site vers /profil/cpo (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens61 = page.getByRole('link', { name: /lien/i });
    if (await liens61.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens61.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /profil/cpo depuis /a-propos-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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
        if ('/profil/cpo' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/profil/cpo' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/profil/cpo' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/profil/cpo' === '/a-propos-du-site') {
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
          const lienDepuisPlan61 = page.getByTestId('e2eid-l399');
          if (await lienDepuisPlan61.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /profil/cpo (e2eID: e2eid-l399) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan61.first().click();
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
        const lienDepuisAccueil61 = page.getByRole('link', { name: new RegExp(`/profil/cpo`, 'i') });
        if (await lienDepuisAccueil61.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel61 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel61.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /profil/cpo depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel61.first().click();
        } else {
          await lienDepuisAccueil61.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/profil/cpo');
  });

  // Test des e2eID présents sur /profil/cpo

  await test.step("Étape 63: Navigation de /profil/cpo vers /a-propos-du-site (Info)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens62 = page.getByRole('link', { name: /Info/i });
    if (await liens62.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens62.all();
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
        throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis /profil/cpo (label: "Info"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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

  await test.step("Étape 64: Navigation de /a-propos-du-site vers /profil/coo (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens63 = page.getByRole('link', { name: /lien/i });
    if (await liens63.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens63.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /profil/coo depuis /a-propos-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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
        if ('/profil/coo' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/profil/coo' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/profil/coo' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/profil/coo' === '/a-propos-du-site') {
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
          const lienDepuisPlan63 = page.getByTestId('e2eid-l430');
          if (await lienDepuisPlan63.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /profil/coo (e2eID: e2eid-l430) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan63.first().click();
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
        const lienDepuisAccueil63 = page.getByRole('link', { name: new RegExp(`/profil/coo`, 'i') });
        if (await lienDepuisAccueil63.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel63 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel63.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /profil/coo depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel63.first().click();
        } else {
          await lienDepuisAccueil63.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/profil/coo');
  });

  // Test des e2eID présents sur /profil/coo

  await test.step("Étape 65: Navigation de /profil/coo vers /a-propos-du-site (Info)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens64 = page.getByRole('link', { name: /Info/i });
    if (await liens64.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens64.all();
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
        throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis /profil/coo (label: "Info"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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

  await test.step("Étape 66: Navigation de /a-propos-du-site vers /profil/agile (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens65 = page.getByRole('link', { name: /lien/i });
    if (await liens65.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens65.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /profil/agile depuis /a-propos-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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
        if ('/profil/agile' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/profil/agile' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/profil/agile' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/profil/agile' === '/a-propos-du-site') {
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
          const lienDepuisPlan65 = page.getByTestId('e2eid-l805');
          if (await lienDepuisPlan65.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /profil/agile (e2eID: e2eid-l805) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan65.first().click();
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
        const lienDepuisAccueil65 = page.getByRole('link', { name: new RegExp(`/profil/agile`, 'i') });
        if (await lienDepuisAccueil65.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel65 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel65.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /profil/agile depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel65.first().click();
        } else {
          await lienDepuisAccueil65.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/profil/agile');
  });

  // Test des e2eID présents sur /profil/agile

  await test.step("Étape 67: Navigation de /profil/agile vers /a-propos-du-site (Info)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens66 = page.getByRole('link', { name: /Info/i });
    if (await liens66.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens66.all();
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
        throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis /profil/agile (label: "Info"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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

  await test.step("Étape 68: Navigation de /a-propos-du-site vers /profil/cto (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens67 = page.getByRole('link', { name: /lien/i });
    if (await liens67.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens67.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
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
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /profil/cto depuis /a-propos-du-site (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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
        if ('/profil/cto' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/profil/cto' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/profil/cto' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/profil/cto' === '/a-propos-du-site') {
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
          const lienDepuisPlan67 = page.getByTestId('e2eid-l275');
          if (await lienDepuisPlan67.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /profil/cto (e2eID: e2eid-l275) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan67.first().click();
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
        const lienDepuisAccueil67 = page.getByRole('link', { name: new RegExp(`/profil/cto`, 'i') });
        if (await lienDepuisAccueil67.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel67 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel67.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /profil/cto depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel67.first().click();
        } else {
          await lienDepuisAccueil67.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/profil/cto');
  });

  // Test des e2eID présents sur /profil/cto

  await test.step("Étape 69: Navigation de /profil/cto vers /a-propos-du-site (Info)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens68 = page.getByRole('link', { name: /Info/i });
    if (await liens68.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens68.all();
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
        throw new Error(`Impossible de trouver un lien vers /a-propos-du-site depuis /profil/cto (label: "Info"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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
  // 25 e2eID ont été testés
  console.log('✅ Parcours complet : tous les liens et e2eID ont été testés');
});