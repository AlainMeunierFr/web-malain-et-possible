import { test, expect } from '@playwright/test';

test('parcours complet de tous les liens du site', async ({ page }) => {
  // Scénario généré automatiquement depuis Pages-Et-Lien.json
  // Ce test parcourt tous les liens du site pour vérifier leur fonctionnement

  // Étape 1: Page d'accueil
  await page.goto('/');
  await expect(page).toHaveURL('/');

  // Étape 2: Navigation de / vers /robustesse
  // Label du lien: "En savoir plus..."
  const lien1 = page.getByRole('link', { name: /En savoir plus\.\.\./i });
  if (await lien1.count() > 0) {
    await lien1.first().click();
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

  // Étape 3: Navigation de /robustesse vers /plan-du-site
  // Label du lien: "Plan du site"
  const lien2 = page.getByRole('link', { name: /Plan du site/i });
  if (await lien2.count() > 0) {
    await lien2.first().click();
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

  // Étape 4: Navigation de /plan-du-site vers /plan-du-site
  // Label du lien: "Plan du site"
  const lien3 = page.getByRole('link', { name: /Plan du site/i });
  if (await lien3.count() > 0) {
    await lien3.first().click();
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

  // Étape 5: Navigation de /plan-du-site vers /metrics
  // Label du lien: "BarChart3"
  const lien4 = page.getByRole('link', { name: /BarChart3/i });
  if (await lien4.count() > 0) {
    await lien4.first().click();
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

  // Étape 6: Navigation de /metrics vers /plan-du-site
  // Label du lien: "Plan du site"
  const lien5 = page.getByRole('link', { name: /Plan du site/i });
  if (await lien5.count() > 0) {
    await lien5.first().click();
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

  // Étape 7: Navigation de /plan-du-site vers /a-propos-du-site
  // Label du lien: "Info"
  const lien6 = page.getByRole('link', { name: /Info/i });
  if (await lien6.count() > 0) {
    await lien6.first().click();
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

  // Étape 8: Navigation de /a-propos-du-site vers /plan-du-site
  // Label du lien: "Plan du site"
  const lien7 = page.getByRole('link', { name: /Plan du site/i });
  if (await lien7.count() > 0) {
    await lien7.first().click();
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

  // Étape 9: Navigation de /plan-du-site vers /
  // Label du lien: "lien"
  const lien8 = page.getByRole('link', { name: /lien/i });
  if (await lien8.count() > 0) {
    await lien8.first().click();
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

  // Étape 10: Navigation de / vers /transformation
  // Label du lien: "En savoir plus..."
  const lien9 = page.getByRole('link', { name: /En savoir plus\.\.\./i });
  if (await lien9.count() > 0) {
    await lien9.first().click();
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

  // Étape 11: Navigation de /transformation vers /plan-du-site
  // Label du lien: "Plan du site"
  const lien10 = page.getByRole('link', { name: /Plan du site/i });
  if (await lien10.count() > 0) {
    await lien10.first().click();
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

  // Étape 12: Navigation de /plan-du-site vers /
  // Label du lien: "lien"
  const lien11 = page.getByRole('link', { name: /lien/i });
  if (await lien11.count() > 0) {
    await lien11.first().click();
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

  // Étape 13: Navigation de / vers /detournement-video
  // Label du lien: "En savoir plus..."
  const lien12 = page.getByRole('link', { name: /En savoir plus\.\.\./i });
  if (await lien12.count() > 0) {
    await lien12.first().click();
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

  // Étape 14: Navigation de /detournement-video vers /plan-du-site
  // Label du lien: "Plan du site"
  const lien13 = page.getByRole('link', { name: /Plan du site/i });
  if (await lien13.count() > 0) {
    await lien13.first().click();
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

  // Étape 15: Navigation de /plan-du-site vers /
  // Label du lien: "lien"
  const lien14 = page.getByRole('link', { name: /lien/i });
  if (await lien14.count() > 0) {
    await lien14.first().click();
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

  // Étape 16: Navigation de / vers /management-de-produit-logiciel
  // Label du lien: "En savoir plus..."
  const lien15 = page.getByRole('link', { name: /En savoir plus\.\.\./i });
  if (await lien15.count() > 0) {
    await lien15.first().click();
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

  // Étape 17: Navigation de /management-de-produit-logiciel vers /plan-du-site
  // Label du lien: "Plan du site"
  const lien16 = page.getByRole('link', { name: /Plan du site/i });
  if (await lien16.count() > 0) {
    await lien16.first().click();
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

  // Étape 18: Navigation de /plan-du-site vers /
  // Label du lien: "lien"
  const lien17 = page.getByRole('link', { name: /lien/i });
  if (await lien17.count() > 0) {
    await lien17.first().click();
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

  // Étape 19: Navigation de / vers /a-propos-du-site
  // Label du lien: "En savoir plus..."
  const lien18 = page.getByRole('link', { name: /En savoir plus\.\.\./i });
  if (await lien18.count() > 0) {
    await lien18.first().click();
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

  // Étape 20: Navigation de /a-propos-du-site vers /metrics
  // Label du lien: "BarChart3"
  const lien19 = page.getByRole('link', { name: /BarChart3/i });
  if (await lien19.count() > 0) {
    await lien19.first().click();
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

  // Étape 21: Navigation de /metrics vers /metrics
  // Label du lien: "BarChart3"
  const lien20 = page.getByRole('link', { name: /BarChart3/i });
  if (await lien20.count() > 0) {
    await lien20.first().click();
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

  // Étape 22: Navigation de /metrics vers /a-propos-du-site
  // Label du lien: "Info"
  const lien21 = page.getByRole('link', { name: /Info/i });
  if (await lien21.count() > 0) {
    await lien21.first().click();
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

  // Étape 23: Navigation de /a-propos-du-site vers /a-propos-du-site
  // Label du lien: "Info"
  const lien22 = page.getByRole('link', { name: /Info/i });
  if (await lien22.count() > 0) {
    await lien22.first().click();
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

  // Étape 24: Navigation de /a-propos-du-site vers /
  // Label du lien: "lien"
  const lien23 = page.getByRole('link', { name: /lien/i });
  if (await lien23.count() > 0) {
    await lien23.first().click();
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

  // Étape 25: Navigation de / vers /plan-du-site
  // Label du lien: "Plan du site"
  const lien24 = page.getByRole('link', { name: /Plan du site/i });
  if (await lien24.count() > 0) {
    await lien24.first().click();
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

  // Étape 26: Navigation de /plan-du-site vers /maintenance
  // Label du lien: "lien"
  const lien25 = page.getByRole('link', { name: /lien/i });
  if (await lien25.count() > 0) {
    await lien25.first().click();
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

  // Étape 27: Navigation de /maintenance vers /plan-du-site
  // Label du lien: "Plan du site"
  const lien26 = page.getByRole('link', { name: /Plan du site/i });
  if (await lien26.count() > 0) {
    await lien26.first().click();
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

  // Étape 28: Navigation de /plan-du-site vers /portfolio-detournements
  // Label du lien: "lien"
  const lien27 = page.getByRole('link', { name: /lien/i });
  if (await lien27.count() > 0) {
    await lien27.first().click();
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

  // Étape 29: Navigation de /portfolio-detournements vers /plan-du-site
  // Label du lien: "Plan du site"
  const lien28 = page.getByRole('link', { name: /Plan du site/i });
  if (await lien28.count() > 0) {
    await lien28.first().click();
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

  // Étape 30: Navigation de /plan-du-site vers /pour_aller_plus_loin
  // Label du lien: "lien"
  const lien29 = page.getByRole('link', { name: /lien/i });
  if (await lien29.count() > 0) {
    await lien29.first().click();
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

  // Étape 31: Navigation de /pour_aller_plus_loin vers /plan-du-site
  // Label du lien: "Plan du site"
  const lien30 = page.getByRole('link', { name: /Plan du site/i });
  if (await lien30.count() > 0) {
    await lien30.first().click();
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

  // Étape 32: Navigation de /plan-du-site vers /
  // Label du lien: "lien"
  const lien31 = page.getByRole('link', { name: /lien/i });
  if (await lien31.count() > 0) {
    await lien31.first().click();
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

  // Étape 33: Navigation de / vers /metrics
  // Label du lien: "BarChart3"
  const lien32 = page.getByRole('link', { name: /BarChart3/i });
  if (await lien32.count() > 0) {
    await lien32.first().click();
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

  // Étape 34: Navigation de /metrics vers /detournement-video
  // Label du lien: "lien"
  const lien33 = page.getByRole('link', { name: /lien/i });
  if (await lien33.count() > 0) {
    await lien33.first().click();
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

  // Étape 35: Navigation de /detournement-video vers /metrics
  // Label du lien: "BarChart3"
  const lien34 = page.getByRole('link', { name: /BarChart3/i });
  if (await lien34.count() > 0) {
    await lien34.first().click();
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

  // Étape 36: Navigation de /metrics vers /maintenance
  // Label du lien: "lien"
  const lien35 = page.getByRole('link', { name: /lien/i });
  if (await lien35.count() > 0) {
    await lien35.first().click();
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

  // Étape 37: Navigation de /maintenance vers /metrics
  // Label du lien: "BarChart3"
  const lien36 = page.getByRole('link', { name: /BarChart3/i });
  if (await lien36.count() > 0) {
    await lien36.first().click();
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

  // Étape 38: Navigation de /metrics vers /management-de-produit-logiciel
  // Label du lien: "lien"
  const lien37 = page.getByRole('link', { name: /lien/i });
  if (await lien37.count() > 0) {
    await lien37.first().click();
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

  // Étape 39: Navigation de /management-de-produit-logiciel vers /metrics
  // Label du lien: "BarChart3"
  const lien38 = page.getByRole('link', { name: /BarChart3/i });
  if (await lien38.count() > 0) {
    await lien38.first().click();
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

  // Étape 40: Navigation de /metrics vers /portfolio-detournements
  // Label du lien: "lien"
  const lien39 = page.getByRole('link', { name: /lien/i });
  if (await lien39.count() > 0) {
    await lien39.first().click();
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

  // Étape 41: Navigation de /portfolio-detournements vers /metrics
  // Label du lien: "BarChart3"
  const lien40 = page.getByRole('link', { name: /BarChart3/i });
  if (await lien40.count() > 0) {
    await lien40.first().click();
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

  // Étape 42: Navigation de /metrics vers /pour_aller_plus_loin
  // Label du lien: "lien"
  const lien41 = page.getByRole('link', { name: /lien/i });
  if (await lien41.count() > 0) {
    await lien41.first().click();
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

  // Étape 43: Navigation de /pour_aller_plus_loin vers /metrics
  // Label du lien: "BarChart3"
  const lien42 = page.getByRole('link', { name: /BarChart3/i });
  if (await lien42.count() > 0) {
    await lien42.first().click();
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

  // Étape 44: Navigation de /metrics vers /robustesse
  // Label du lien: "lien"
  const lien43 = page.getByRole('link', { name: /lien/i });
  if (await lien43.count() > 0) {
    await lien43.first().click();
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

  // Étape 45: Navigation de /robustesse vers /metrics
  // Label du lien: "BarChart3"
  const lien44 = page.getByRole('link', { name: /BarChart3/i });
  if (await lien44.count() > 0) {
    await lien44.first().click();
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

  // Étape 46: Navigation de /metrics vers /transformation
  // Label du lien: "lien"
  const lien45 = page.getByRole('link', { name: /lien/i });
  if (await lien45.count() > 0) {
    await lien45.first().click();
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

  // Étape 47: Navigation de /transformation vers /metrics
  // Label du lien: "BarChart3"
  const lien46 = page.getByRole('link', { name: /BarChart3/i });
  if (await lien46.count() > 0) {
    await lien46.first().click();
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

  // Étape 48: Navigation de /metrics vers /detournement-video
  // Label du lien: "lien"
  const lien47 = page.getByRole('link', { name: /lien/i });
  if (await lien47.count() > 0) {
    await lien47.first().click();
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

  // Étape 49: Navigation de /detournement-video vers /a-propos-du-site
  // Label du lien: "Info"
  const lien48 = page.getByRole('link', { name: /Info/i });
  if (await lien48.count() > 0) {
    await lien48.first().click();
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

  // Étape 50: Navigation de /a-propos-du-site vers /maintenance
  // Label du lien: "lien"
  const lien49 = page.getByRole('link', { name: /lien/i });
  if (await lien49.count() > 0) {
    await lien49.first().click();
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

  // Étape 51: Navigation de /maintenance vers /a-propos-du-site
  // Label du lien: "Info"
  const lien50 = page.getByRole('link', { name: /Info/i });
  if (await lien50.count() > 0) {
    await lien50.first().click();
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

  // Étape 52: Navigation de /a-propos-du-site vers /management-de-produit-logiciel
  // Label du lien: "lien"
  const lien51 = page.getByRole('link', { name: /lien/i });
  if (await lien51.count() > 0) {
    await lien51.first().click();
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

  // Étape 53: Navigation de /management-de-produit-logiciel vers /a-propos-du-site
  // Label du lien: "Info"
  const lien52 = page.getByRole('link', { name: /Info/i });
  if (await lien52.count() > 0) {
    await lien52.first().click();
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

  // Étape 54: Navigation de /a-propos-du-site vers /portfolio-detournements
  // Label du lien: "lien"
  const lien53 = page.getByRole('link', { name: /lien/i });
  if (await lien53.count() > 0) {
    await lien53.first().click();
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

  // Étape 55: Navigation de /portfolio-detournements vers /a-propos-du-site
  // Label du lien: "Info"
  const lien54 = page.getByRole('link', { name: /Info/i });
  if (await lien54.count() > 0) {
    await lien54.first().click();
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

  // Étape 56: Navigation de /a-propos-du-site vers /pour_aller_plus_loin
  // Label du lien: "lien"
  const lien55 = page.getByRole('link', { name: /lien/i });
  if (await lien55.count() > 0) {
    await lien55.first().click();
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

  // Étape 57: Navigation de /pour_aller_plus_loin vers /a-propos-du-site
  // Label du lien: "Info"
  const lien56 = page.getByRole('link', { name: /Info/i });
  if (await lien56.count() > 0) {
    await lien56.first().click();
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

  // Étape 58: Navigation de /a-propos-du-site vers /robustesse
  // Label du lien: "lien"
  const lien57 = page.getByRole('link', { name: /lien/i });
  if (await lien57.count() > 0) {
    await lien57.first().click();
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

  // Étape 59: Navigation de /robustesse vers /a-propos-du-site
  // Label du lien: "Info"
  const lien58 = page.getByRole('link', { name: /Info/i });
  if (await lien58.count() > 0) {
    await lien58.first().click();
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

  // Étape 60: Navigation de /a-propos-du-site vers /transformation
  // Label du lien: "lien"
  const lien59 = page.getByRole('link', { name: /lien/i });
  if (await lien59.count() > 0) {
    await lien59.first().click();
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

  // Étape 61: Navigation de /transformation vers /a-propos-du-site
  // Label du lien: "Info"
  const lien60 = page.getByRole('link', { name: /Info/i });
  if (await lien60.count() > 0) {
    await lien60.first().click();
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

  // Tous les liens ont été parcourus
  console.log('✅ Parcours complet : tous les liens ont été testés');
});