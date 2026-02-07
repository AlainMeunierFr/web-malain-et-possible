# Délégation TDD-front-end — US-13.1

**Invoquer l'agent @TDD-front-end** avec le prompt ci-dessous.

---

## Prompt

US-13.1 — Menu header remplaçant le logo.

**Contexte :**
- Le TDD back-end est livré : `readHeaderMenu()` et `readExclusHeader()` dans `utils/vitrine/headerMenuReader.ts`, exportés via `utils/server.ts`.
- Les scénarios BDD sont dans `tests/bdd/menu-header-remplacant-logo.feature`.
- Le Header actuel affiche un logo à gauche (`components/Header.tsx`), le titre au centre, la photo à droite. Le logo doit être retiré et remplacé par un menu.
- Le Footer affiche des boutons depuis `data/_footerButtons.json` (`components/Footer.tsx`).

**Plan de tests baby steps (VALIDÉ) — suivre strictement, un test à la fois :**

1. **Logo retiré** — Le logo est retiré du header.
2. **Logo footer** — Bouton affichant le logo ajouté dans le footer, visible, sans action.
3. **Reader** — Le Header utilise `readHeaderMenu()` et affiche au moins une entrée (ex. Accueil) en lien.
4. **Liens directs** — Toutes les entrées niveau 1 sont des liens cliquables vers leurs pages.
5. **Dropdown desktop** — Les entrées avec `sousmenuPageUrls` affichent un dropdown au survol.
6. **Clic entrée parente** — Le clic sur le libellé d'une entrée avec sous-menu navigue vers la page mère.
7. **Structure titre** — Le titre de page est rendu dans une zone dédiée sous le header (structure DOM). Le style reste au Designer.
8. **Hamburger mobile** — En dessous de 768px, menu horizontal masqué, icône hamburger visible.
9. **Panneau mobile** — Au clic sur l'icône hamburger, un panneau latéral s'ouvre avec les mêmes entrées.

**Rappels :**
- Ne pas sauter d'étape. RED → GREEN → refactor avant le suivant.
- Implémenter les step definitions pour les scénarios BDD dans `tests/bdd/*.steps.ts` si nécessaire (sans dupliquer les steps existants).
- Respecter les e2eID pour les éléments interactifs (convention `e2eid-convention.mdc`).
- Les titres des pages du menu viennent du plan du site (mapper `pageUrl` → titre via les données pages).
