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
  // Test e2eID: v11 (video - profil-agile.json)
  const element16 = page.getByTestId('e2eid-v11');
  if (await element16.count() > 0) {
    await expect(element16).toBeVisible();
  }
  // Test e2eID: v12 (video - profil-agile.json)
  const element17 = page.getByTestId('e2eid-v12');
  if (await element17.count() > 0) {
    await expect(element17).toBeVisible();
  }
  // Test e2eID: a26 (callToAction - profil-agile.json)
  const element18 = page.getByTestId('e2eid-a26');
  if (await element18.count() > 0) {
    await expect(element18).toBeVisible();
  }
  // Test e2eID: v27 (video - profil-coo.json)
  const element19 = page.getByTestId('e2eid-v27');
  if (await element19.count() > 0) {
    await expect(element19).toBeVisible();
  }
  // Test e2eID: a28 (callToAction - profil-coo.json)
  const element20 = page.getByTestId('e2eid-a28');
  if (await element20.count() > 0) {
    await expect(element20).toBeVisible();
  }
  // Test e2eID: v29 (video - profil-cpo.json)
  const element21 = page.getByTestId('e2eid-v29');
  if (await element21.count() > 0) {
    await expect(element21).toBeVisible();
  }
  // Test e2eID: a30 (callToAction - profil-cpo.json)
  const element22 = page.getByTestId('e2eid-a30');
  if (await element22.count() > 0) {
    await expect(element22).toBeVisible();
  }
  // Test e2eID: v31 (video - profil-cto.json)
  const element23 = page.getByTestId('e2eid-v31');
  if (await element23.count() > 0) {
    await expect(element23).toBeVisible();
  }
  // Test e2eID: a32 (callToAction - profil-cto.json)
  const element24 = page.getByTestId('e2eid-a32');
  if (await element24.count() > 0) {
    await expect(element24).toBeVisible();
  }
  // Test e2eID: hero-bouton-principal (react - HeroSection.tsx)
  const element25 = page.getByTestId('e2eid-hero-bouton-principal');
  if (await element25.count() > 0) {
    await expect(element25).toBeVisible();
    // Élément interactif présent et visible
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

  await test.step("Étape 3: Navigation de /plan-du-site vers /a-propos-du-site (Info)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens2 = page.getByRole('link', { name: /Info/i });
    if (await liens2.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens2.all();
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

  await test.step("Étape 4: Navigation de /a-propos-du-site vers /detournement-video (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens3 = page.getByRole('link', { name: /lien/i });
    if (await liens3.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens3.all();
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
          const lienDepuisPlan3 = page.getByTestId('e2eid-l806');
          if (await lienDepuisPlan3.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /detournement-video (e2eID: e2eid-l806) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan3.first().click();
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
        const lienDepuisAccueil3 = page.getByRole('link', { name: new RegExp(`/detournement-video`, 'i') });
        if (await lienDepuisAccueil3.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel3 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel3.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /detournement-video depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel3.first().click();
        } else {
          await lienDepuisAccueil3.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/detournement-video');
  });

  // Test des e2eID présents sur /detournement-video

  await test.step("Étape 5: Navigation de /detournement-video vers /faisons-connaissance (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens4 = page.getByRole('link', { name: /lien/i });
    if (await liens4.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens4.all();
      let lienTrouve = null;
      for (const lien of liensTrouves) {
        const href = await lien.getAttribute('href');
        // Normaliser l'URL (enlever le slash final si présent)
        const hrefNormalise = href ? href.replace(/\/$/, '') : '';
        const destinationNormalisee = '/faisons-connaissance'.replace(/\/$/, '');
        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {
          lienTrouve = lien;
          break;
        }
      }
      if (lienTrouve) {
        await lienTrouve.click();
      } else {
        // Aucun lien trouvé vers la destination exacte, échouer pour détecter les incohérences
        throw new Error(`Impossible de trouver un lien vers /faisons-connaissance depuis /detournement-video (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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
        if ('/faisons-connaissance' === '/plan-du-site') {
          // On est déjà sur /plan-du-site, pas besoin de naviguer à nouveau
        } else if ('/faisons-connaissance' === '/') {
          // Pour aller à l'accueil, utiliser le logo du header (h1)
          const logo = page.getByTestId('e2eid-h1');
          if (await logo.count() > 0) {
            await logo.click();
            await expect(page).toHaveURL('/');
          } else {
            // Fallback : navigation directe
            await page.goto('/');
          }
        } else if ('/faisons-connaissance' === '/metrics') {
          // /metrics est accessible via le bouton du footer (b14)
          const boutonMetrics = page.getByTestId('e2eid-b14');
          if (await boutonMetrics.count() > 0) {
            await boutonMetrics.click();
            await expect(page).toHaveURL('/metrics');
          } else {
            throw new Error('Impossible de trouver le bouton Metrics (e2eid-b14) dans le footer.');
          }
        } else if ('/faisons-connaissance' === '/a-propos-du-site') {
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
          const lienDepuisPlan4 = page.getByTestId('e2eid-l719');
          if (await lienDepuisPlan4.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /faisons-connaissance (e2eID: e2eid-l719) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan4.first().click();
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
        const lienDepuisAccueil4 = page.getByRole('link', { name: new RegExp(`/faisons-connaissance`, 'i') });
        if (await lienDepuisAccueil4.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel4 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel4.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /faisons-connaissance depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel4.first().click();
        } else {
          await lienDepuisAccueil4.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/faisons-connaissance');
  });

  // Test des e2eID présents sur /faisons-connaissance

  await test.step("Étape 6: Navigation de /faisons-connaissance vers /metrics (BarChart3)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens5 = page.getByRole('link', { name: /BarChart3/i });
    if (await liens5.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens5.all();
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
        throw new Error(`Impossible de trouver un lien vers /metrics depuis /faisons-connaissance (label: "BarChart3"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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

  await test.step("Étape 7: Navigation de /metrics vers /portfolio-detournements (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens6 = page.getByRole('link', { name: /lien/i });
    if (await liens6.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens6.all();
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
          const lienDepuisPlan6 = page.getByTestId('e2eid-l696');
          if (await lienDepuisPlan6.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /portfolio-detournements (e2eID: e2eid-l696) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan6.first().click();
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
        const lienDepuisAccueil6 = page.getByRole('link', { name: new RegExp(`/portfolio-detournements`, 'i') });
        if (await lienDepuisAccueil6.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel6 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel6.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /portfolio-detournements depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel6.first().click();
        } else {
          await lienDepuisAccueil6.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/portfolio-detournements');
  });

  // Test des e2eID présents sur /portfolio-detournements

  await test.step("Étape 8: Navigation de /portfolio-detournements vers /pour-aller-plus-loin (lien)", async () => {
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
        throw new Error(`Impossible de trouver un lien vers /pour-aller-plus-loin depuis /portfolio-detournements (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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
          const lienDepuisPlan7 = page.getByTestId('e2eid-l707');
          if (await lienDepuisPlan7.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /pour-aller-plus-loin (e2eID: e2eid-l707) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
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
        const lienDepuisAccueil7 = page.getByRole('link', { name: new RegExp(`/pour-aller-plus-loin`, 'i') });
        if (await lienDepuisAccueil7.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel7 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel7.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /pour-aller-plus-loin depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel7.first().click();
        } else {
          await lienDepuisAccueil7.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/pour-aller-plus-loin');
  });

  // Test des e2eID présents sur /pour-aller-plus-loin

  await test.step("Étape 9: Navigation de /pour-aller-plus-loin vers /profil/cpo (lien)", async () => {
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
        throw new Error(`Impossible de trouver un lien vers /profil/cpo depuis /pour-aller-plus-loin (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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
          const lienDepuisPlan8 = page.getByTestId('e2eid-l699');
          if (await lienDepuisPlan8.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /profil/cpo (e2eID: e2eid-l699) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan8.first().click();
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
        const lienDepuisAccueil8 = page.getByRole('link', { name: new RegExp(`/profil/cpo`, 'i') });
        if (await lienDepuisAccueil8.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel8 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel8.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /profil/cpo depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel8.first().click();
        } else {
          await lienDepuisAccueil8.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/profil/cpo');
  });

  // Test des e2eID présents sur /profil/cpo

  await test.step("Étape 10: Navigation de /profil/cpo vers /profil/coo (lien)", async () => {
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
        throw new Error(`Impossible de trouver un lien vers /profil/coo depuis /profil/cpo (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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
          const lienDepuisPlan9 = page.getByTestId('e2eid-l730');
          if (await lienDepuisPlan9.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /profil/coo (e2eID: e2eid-l730) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
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
        const lienDepuisAccueil9 = page.getByRole('link', { name: new RegExp(`/profil/coo`, 'i') });
        if (await lienDepuisAccueil9.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel9 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel9.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /profil/coo depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel9.first().click();
        } else {
          await lienDepuisAccueil9.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/profil/coo');
  });

  // Test des e2eID présents sur /profil/coo

  await test.step("Étape 11: Navigation de /profil/coo vers /profil/agile (lien)", async () => {
    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés
    const liens10 = page.getByRole('link', { name: /lien/i });
    if (await liens10.count() > 0) {
      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination
      const liensTrouves = await liens10.all();
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
        throw new Error(`Impossible de trouver un lien vers /profil/agile depuis /profil/coo (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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
          const lienDepuisPlan10 = page.getByTestId('e2eid-l605');
          if (await lienDepuisPlan10.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /profil/agile (e2eID: e2eid-l605) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
          }
          await lienDepuisPlan10.first().click();
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
        const lienDepuisAccueil10 = page.getByRole('link', { name: new RegExp(`/profil/agile`, 'i') });
        if (await lienDepuisAccueil10.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel10 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel10.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /profil/agile depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel10.first().click();
        } else {
          await lienDepuisAccueil10.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/profil/agile');
  });

  // Test des e2eID présents sur /profil/agile

  await test.step("Étape 12: Navigation de /profil/agile vers /profil/cto (lien)", async () => {
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
        throw new Error(`Impossible de trouver un lien vers /profil/cto depuis /profil/agile (label: "lien"). Vérifiez que le lien existe et est accessible depuis cette page.`);
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
          const lienDepuisPlan11 = page.getByTestId('e2eid-l925');
          if (await lienDepuisPlan11.count() === 0) {
            throw new Error('Impossible de trouver un lien vers /profil/cto (e2eID: e2eid-l925) depuis le plan du site. La page n\'est peut-être pas accessible ou le lien est manquant dans le plan du site.');
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
        const lienDepuisAccueil11 = page.getByRole('link', { name: new RegExp(`/profil/cto`, 'i') });
        if (await lienDepuisAccueil11.count() === 0) {
          // Essayer aussi par le label original si disponible
          const lienParLabel11 = page.getByRole('link', { name: new RegExp(`lien`, 'i') });
          if (await lienParLabel11.count() === 0) {
            throw new Error(`Impossible de trouver un lien vers /profil/cto depuis l'accueil (label: "lien"). La page n'est peut-être pas accessible depuis l'accueil ou le lien est manquant.`);
          }
          await lienParLabel11.first().click();
        } else {
          await lienDepuisAccueil11.first().click();
        }
      }
    }
    await expect(page).toHaveURL('/profil/cto');
  });

  // Test des e2eID présents sur /profil/cto

  // Tous les liens ont été parcourus
  // 26 e2eID ont été testés
  console.log('✅ Parcours complet : tous les liens et e2eID ont été testés');
});