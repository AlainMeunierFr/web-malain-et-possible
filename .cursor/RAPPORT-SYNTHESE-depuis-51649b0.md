# Synthèse : depuis le commit 51649b0 (dernier déploiement Vercel réussi)

**Référence :** commit `51649b0` — *Publication automatique - Tests OK, métriques à jour* (2026-02-07 09:57)  
**État actuel :** working tree (aucun commit après 51649b0). Toutes les modifications depuis 2 jours sont **locales et non commitées**.  
**Diff global :** 263 fichiers, +2490 / -15544 lignes (vs 51649b0).

---

## 1. Ce que nous avons fait (journal) mais qui n’est plus dans le code actuel

| Élément | Journal | État dans le code |
|--------|--------|--------------------|
| **Fichier `data/_Pages-Liens-Et-Menus.json`** | 2026-02-07 : génération du fichier, comportement de repli dans `headerMenuReader` si absent, fichier versionné. | **Supprimé** dans le working tree (−572 lignes). Tout le code (layout, menu, sitemap, API, scripts, BDD) attend ce fichier. En local il n’existe plus → erreur « Fichier plan introuvable » ou menu par défaut selon le lecteur. |
| **Dossier `data/A propos de ce site/`** | Référencé partout avant refacto (Sprints, Configuration IA, Documentation technique, menu, etc.). | **Supprimé** (remplacé par `data/A propos/`). Cohérent avec la migration « A propos du site » → « A propos », mais tout lien ou doc pointant encore vers l’ancien chemin est en décalage. |
| **Ancien test E2E monolithique** | Journal : suppression de `parcours-complet-liens.spec.ts` et remplacement par tests modulaires. | Fichier bien **supprimé**. Les nouveaux specs sont dans `tests/end-to-end/` (page-*.spec.ts, etc.) mais en **untracked** → pas encore versionnés. |
| **Route `/charte` en dehors de A propos** | À 51649b0 la charte était sous « A propos » (US-13.1). | Dans le working tree : routes sous `app/(main)/a-propos/` (dont charte). Donc toujours « dans » A propos. Pas de contradiction. |

**Point bloquant pour la publication :** l’absence de `_Pages-Liens-Et-Menus.json` fait que le site (et le script de publication qui s’appuie sur ce plan) ne peut pas fonctionner correctement en l’état. Il doit être régénéré (`npx ts-node --project tsconfig.node.json scripts/update-site-map.ts`) ou restauré depuis 51649b0.

---

## 2. Ce que nous avons fait (journal) et qui est bien dans le code actuel

- **Migration « A propos du site » → « A propos »** : `data/A propos/`, routes `app/(main)/a-propos/`, constantes `ABOUT_SITE_DATA_DIR`, refactoring BDD (features + steps), `sync-agents-json.ts`.
- **Restauration des Sprints** : contenu dans `data/A propos/Sprints/` (dossiers 2025-01-17, 2025-01-19, 2026-01-19, …, US en cours.md).
- **Path « A propos » — affichage direct sans accordéon** : un seul document → rendu direct (aboutSiteReader, AboutSiteContent).
- **Retours à la ligne MD** : `.paragraph { white-space: pre-line }` dans `a-propos-du-site.css`.
- **Ancres et sommaire** : `titreToAnchorId`, `uniqueAnchorId`, sommaire conditionnel (Plan de l’article / Sommaire / Table des matières), styles `.sommaire` / `.sommaireLink`.
- **Suppression assistant scénario E2E** : `AssistantScenario.tsx`, `assistantScenario.ts`, `e2eScenarioBuilder`, route `generate-e2e-scenario`, scripts `generate-e2e-scenario.ts` / `pre-commit-generate-e2e`, tests associés et `parcours-complet-liens.spec.ts` supprimés ; barrel exports nettoyés.
- **Refonte script de publication** : `cleanNextCache()`, suppression étape `generateE2EScenario`, `checkPreviousCoverage()` en amont, pipeline 5 étapes, seuils couverture différenciés.
- **Stratégie E2E modulaire** : TI `generate-e2e-navigation.integration.test.ts`, génération de specs dans `tests/end-to-end/` (page-accueil, page-*-profil, footer, menu-header, menu-a-propos, etc.), validation e2eID, regex échappées.
- **Pipeline publication — BDD/E2E bloquants** : dans `collect-metrics-simple.ts`, échecs BDD et E2E → `hasError` + `process.exit(1)`.
- **Refactoring BDD « A propos »** : 6 features + 6 steps mis à jour (a-propos, charte, reorganisation-menu, navigation-pages, etc.), chemins et URLs alignés.
- **Phase 1 réduction step definitions** : suppression `assistant-scenario-maintenance.feature`, création `markdown-heading-levels.steps.ts`, corrections typo/variantes « que »/parenthèses dans plusieurs steps ; 420 → 285 missing.
- **defineBddConfig() conditionnel** : `playwright.config.ts` — chargement BDD uniquement quand nécessaire, `SKIP_BDD_GEN=1` pour E2E, scripts `test:e2e` vs `test:bdd` séparés, Chromium seul en local, timeout 60s.
- **Résilience headerMenuReader** : si `_Pages-Liens-Et-Menus.json` absent → menu par défaut (pas d’erreur levée) ; TU mis à jour en conséquence.
- **Convention -cont, main-content-cont** : ID → classe, containers migrés (hero-cont, profil-cont, etc.), spec/hierarchy alignés.
- **US-13.1 / US-13.2** : menu header, titre dans header, API menu, déplacement Charte, réorganisation menu A propos, double marge supprimée, style bouton contour, boutons hero même largeur, post-it « Prendre un café ».
- **Couverture** : nouveaux/ajouts de tests (e2eIdFromUrl, e2eIdMapping, journalMarkdownParser, siteHierarchyGenerator, etc.), adaptation `e2e-ids-coverage.integration.test.ts` aux specs modulaires.
- **Fichiers BDD renommés** : a-propos-du-site-* → a-propos-* (tableau-de-bord, board-kanban, modal-us, charte-graphique) dans le journal ; dans le diff, les anciens noms sont **supprimés** et des versions « a-propos » existent (colonnes-board, menu-header, reorganisation-menu, etc.). À confirmer que tous les renommages sont cohérents partout.

---

## 3. Ce que nous avons commencé puis abandonné et qui n’est pas dans le code source

- **Mode lecture** : à 51649b0 existaient `app/(main)/mode-lecture/` (layout, page, CSS) et `ModeLectureRenderer.tsx`. Le journal ne décrit pas explicitement l’abandon. Dans le working tree ils sont **supprimés**. Donc fonctionnalité abandonnée et retirée du code.
- **Docs/agents dans l’ancien chemin** : `data/A propos de ce site/Configuration IA/`, `A propos du projet/`, `Documentation technique/` sont supprimés ; les équivalents sont sous `data/A propos/`. Rien ne suggère qu’une autre fonctionnalité « commencée puis abandonnée » reste uniquement en doc.
- **playwright.config.metrics-only.ts** : supprimé (47 lignes). Probablement fusionné ou obsolète après refonte config Playwright.

---

## 4. Ce que nous avons commencé puis abandonné mais qui est encore dans le code source

- **Références à l’ancien path « A propos du site »** : si des commentaires, noms de variables ou messages d’erreur mentionnent encore « a-propos-du-site » ou l’ancien dossier, ils sont des résidus à nettoyer (à vérifier par grep ciblé).
- **Fichier plan** : le code suppose toujours un `_Pages-Liens-Et-Menus.json` versionné et présent. La « résilience » (repli si absent) était prévue pour cas rares ; dans l’état actuel le fichier est absent alors qu’il est la source de vérité du menu et du plan → on est dans un état non prévu (abandon partiel de la stratégie « fichier versionné » tant que le fichier n’est pas régénéré ou restauré).

---

## 5. Synthèse des écarts (journal vs code)

| Thème | Écart |
|-------|--------|
| **Source de vérité du menu / plan** | Journal : fichier généré, versionné, repli si absent. Code : fichier **absent** en local, tout le reste dépend de lui. **Action :** régénérer ou `git checkout 51649b0 -- data/_Pages-Liens-Et-Menus.json` puis relancer `update-site-map` si besoin. |
| **Tests E2E** | Nouvelle stratégie (specs modulaires générés par TI) est en place mais les fichiers dans `tests/end-to-end/` sont **untracked**. Pour publier et avoir une base stable, il faut les ajouter au dépôt. |
| **Dossier data** | Migration `A propos de ce site` → `A propos` reflétée dans le code et les données. L’ancien dossier n’existe plus ; les ajouts sous `data/A propos/` (dont Sprints, menu, Configuration IA) sont partiellement **untracked** (??). |
| **BDD** | Beaucoup de steps manquants (285 restants), config conditionnelle BDD, scripts séparés E2E vs BDD. Le journal reflète bien l’état (dette connue, Phase 1 faite). Aucun écart majeur. |
| **Publication** | Le script `publie.ts` et la collecte de métriques ont été refactorisés ; les échecs BDD/E2E bloquent. La non-publication depuis 2 jours est cohérente avec : fichier plan manquant + éventuels échecs de tests ou couverture. |

---

## 6. Actions recommandées pour repartir sur une base saine

1. **Restaurer ou régénérer `data/_Pages-Liens-Et-Menus.json`**  
   - Soit : `git checkout 51649b0 -- data/_Pages-Liens-Et-Menus.json`  
   - Soit : `npx ts-node --project tsconfig.node.json scripts/update-site-map.ts` (si les dépendances du script sont OK sans ce fichier).

2. **Versionner les changements cohérents**  
   - Ajouter les nouveaux specs E2E (`tests/end-to-end/*.spec.ts`), le TI `generate-e2e-navigation.integration.test.ts`, et les fichiers sous `data/A propos/` qui doivent être versionnés.

3. **Vérifier que le pipeline de publication passe**  
   - `npm run build` (ou équivalent)  
   - Lancer le script de publication (ex. `scripts/publie.ts`) et corriger les échecs (tests, couverture, BDD/E2E) un par un.

4. **Nettoyer les résidus**  
   - Rechercher toute référence à `a-propos-du-site` ou à l’ancien chemin dans le code et la doc, et les aligner sur `A propos` et `/a-propos`.

---

*Rapport généré par comparaison `git diff 51649b0` (working tree) et lecture des journaux 2026-02-05 à 2026-02-08.*
