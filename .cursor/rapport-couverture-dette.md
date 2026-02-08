# Rapport couverture : dette ancienne vs nouveau code

**Seuils DoD :** statements 80 %, functions 80 %, lines 80 %, branches 65 %.  
**Couverture globale actuelle :** ~87 % / 87 % / 88 % / 75 % → seuils respectés, mais la marge peut fondre à chaque nouveau code non testé.

---

## 1. Fichiers sous les seuils (qui tirent la moyenne vers le bas)

### Dette très forte (tous indicateurs sous seuils)

| Fichier | Stmts | Funcs | Lines | Branches | Dernière modif |
|---------|-------|-------|-------|----------|----------------|
| `components/AboutSiteContentRenderer.tsx` | 47 % | 55 % | 49 % | 41 % | 2026-02-05 |
| `utils/shared/e2eIdFromUrl.ts` | 53 % | 33 % | 53 % | 50 % | 2026-02-04 |
| `utils/shared/e2eIdMapping.ts` | 51 % | 53 % | 53 % | 43 % | 2026-02-05 |
| `utils/shared/planDuSiteTypes.ts` | 40 % | **0 %** | 44 % | **0 %** | 2026-02-05 |

### Dette partielle (au moins un indicateur sous seuil)

| Fichier | Stmts | Funcs | Lines | Branches | Dernière modif |
|---------|-------|-------|-------|----------|----------------|
| `utils/projet/aboutSiteReader.ts` | 71 % | 91 % | 72 % | **60 %** | 2026-02-05 |
| `components/Header.tsx` | 82 % | **57 %** | 88 % | 85 % | **2026-02-07** |
| `components/SwaggerUIWrapper.tsx` | **75 %** | **25 %** | 86 % | - | 2026-02-04 |
| `utils/backoffice/generators/siteMapGenerator.ts` | 82 % | **78 %** | 83 % | 67 % | **2026-02-07** |
| `utils/server.ts` | 100 % | **77 %** | 100 % | - | - |
| `utils/vitrine/openApiSpec.ts` | 80 % | **75 %** | 80 % | - | - |
| `components/GroupeBoutons.tsx` | 85 % | **67 %** | 85 % | 93 % | - |
| `components/HeroSection.tsx` | 93 % | **50 %** | 93 % | **64 %** | - |

---

## 2. Nouveau code récent (modifié récemment, encore peu couvert)

Fichiers **modifiés depuis le 2026-02-04** et **sous les seuils** sur au moins un indicateur :

- **Header.tsx** (07/02) — functions 57 % → beaucoup de handlers / chemins non testés.
- **siteMapGenerator.ts** (07/02) — functions 78 % → branches et cas métier récents non couverts.
- **AboutSiteContentRenderer.tsx** (05/02) — très faible partout → rendu wiki / blocs peu testés.
- **aboutSiteReader.ts** (05/02) — statements/lines/branches sous seuils → lecture / parsing récents.
- **e2eIdMapping.ts** (05/02) — très faible → mapping / backoffice récents.
- **planDuSiteTypes.ts** (05/02) — 0 % functions/branches → helpers purs (`getLiensAParcourirInitial`, `getPagesAccessiblesDepuis`, etc.) jamais appelés dans les tests.
- **e2eIdFromUrl.ts** (04/02) — très faible → logique URL / e2e non couverte.

Donc oui : il y a à la fois **dette ancienne** (Header, HeroSection, GroupeBoutons, SwaggerUIWrapper, server, openApiSpec) et **nouveau code récent non couvert** (Header, siteMapGenerator, AboutSiteContentRenderer, aboutSiteReader, e2eId*, planDuSiteTypes).

---

## 3. Priorités recommandées

1. **Nouveau code en priorité** (pour ne plus dégrader la marge)  
   - **Header.tsx** — ajouter tests sur les handlers et chemins (menu, liens).  
   - **siteMapGenerator.ts** — ajouter tests sur les branches récemment ajoutées / modifiées.  
   - **AboutSiteContentRenderer.tsx** — scénarios de rendu (parties, sous-parties, blocs Prompt/Résultat).

2. **Quick wins (petits fichiers, fort impact)**  
   - **planDuSiteTypes.ts** — tests unitaires des 4 fonctions pures (`pageAccueil`, `getLiensAParcourirInitial`, `getPagesAccessiblesDepuis`, `retirerLienUtilise`).  
   - **e2eIdFromUrl.ts** — tests sur les cas d’URL (avec/sans hash, query, etc.).

3. **Dette ancienne à traiter ensuite**  
   - **e2eIdMapping.ts**, **aboutSiteReader.ts** (branches), **SwaggerUIWrapper**, **GroupeBoutons**, **HeroSection**, **server.ts**, **openApiSpec.ts**.

---

## 4. Commande pour recalculer ce rapport

```bash
npm test -- --coverage --coverageReporters=json-summary --silent
# Puis comparer coverage/coverage-summary.json avec les seuils (80/80/80/65).
```

Pour voir les lignes non couvertes par fichier :

```bash
npm test -- --coverage
# Consulter coverage/lcov-report/index.html
```
