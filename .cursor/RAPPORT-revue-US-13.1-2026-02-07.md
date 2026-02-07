# Revue Lead Dev — US-13.1 Menu header remplaçant le logo (7 février 2026)

## Contexte

- **GO NEXT** : revue après livraison TDD-front-end (et rattrapage backend réalisé en amont).
- **Périmètre** : US-13.1 (menu header, logo footer, fichier plan + API menu).

---

## Vérifications (lead-dev-revue.mdc)

| Critère | Statut |
|--------|--------|
| DoD / CA US-13.1 | CA1–CA4 (affichage, menu, mobile, logo footer) couverts par le front. CA5–CA7 (fichier, menus, intégrité) couverts par le backend. |
| Plan de tests baby steps | Les 9 steps ont été suivis ; couverture unitaire Header + Footer en place. |
| Tests TDD | 23 tests unitaires Header + Footer passent (logo retiré, menu, liens, sous-items, titre zone, hamburger, panneau mobile, logo footer). |
| BDD | Steps menu-header définis et alignés (libellés, regex pour URLs, sous-menu sans `.headerDropdown`). Scénarios non exécutés en CI car `bddgen` exige tous les steps du projet (413 manquants ailleurs). |
| Clean Code / cohérence | Reader menu, types partagés, e2eID sur liens et hamburger. Pas de duplication constatée. |

---

## Livrables constatés

### Backend (rattrapage)
- Un seul fichier généré : `_Pages-Liens-Et-Menus.json` (pages + liens + `menus`).
- Références à l’ancien fichier remplacées dans le code (scripts, API, sitemap, tests).
- API REST `GET /api/vitrine/menu` + documentation OpenAPI (tag Menu, schéma MenuItemAPI).
- Migration one-shot : copie de `_Pages-Et-Lien.json` vers le nouveau fichier si besoin.

### Front-end
- **Header** : pas de logo ; menu avec `menuEntries` (readHeaderMenu), groupes `.headerNavGroup` (parent + sous-liens), zone `.pageTitleZone`, hamburger & panneau mobile (< 768px), e2eID sur liens et hamburger.
- **Footer** : bouton logo entre Plan du site et À propos (taille 24×24, sans navigation).
- **Tests** : Header.test.tsx (baby steps 1, 3–9), Footer.test.tsx (baby step 2 + ordre).

### BDD
- `menu-header-remplacant-logo.feature` + `menu-header-remplacant-logo.steps.ts` à jour (libellés « Détournement vidéo », « A propos » ; steps avec `/` en regex pour éviter Cucumber Expressions).

---

## Réserves

1. **BDD** : les scénarios menu-header ne sont pas exécutés via `npm run test:bdd` tant que les 413 steps manquants des autres features ne sont pas implémentés ou exclus. Les steps de menu-header sont complets et cohérents avec le code.
2. **Warning** : `priority` sur le mock next/image dans Header.test (attribut non-booléen en DOM) — mineur, à nettoyer en passant.

---

## Verdict

**Validé** — US-13.1 est livrable (backend + front + tests unitaires verts, BDD définis). Les réserves sont documentées pour la suite (exécution BDD ciblée ou complétion des steps des autres features).

---

## Suite

- **Option A** : Clôturer l’US (done) et passer à la suivante.
- **Option B** : Au prochain GO NEXT, corriger le warning `priority` dans Header.test puis clôturer.

Lead Dev — 7 février 2026
