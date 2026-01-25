### Sujets d'articles sur les pratiques architecturales originales

Ce document liste les choix architecturaux et pratiques peu courantes identifiés dans le projet, qui pourraient faire l'objet d'articles de blog ou de publications LinkedIn.

---

#### 1. Tests d'intégration qui modifient automatiquement le code source

**Statut** : ✅ Article rédigé (`Stratégie couverture liens tests E2E.md`)

**Pratique originale** : Les tests d'intégration ne se contentent pas de vérifier : ils modifient automatiquement le code source (génération d'identifiants dans les fichiers JSON et React), créent une boucle fermée complète (détection → arbitrage → correction automatique → vérification), et forcent systématiquement la décision du développeur.

**Intérêt** : Cette combinaison est peu courante dans les projets standards, où les tests restent généralement en lecture seule.

---

#### 2. Architecture hexagonale appliquée à Next.js : séparation Backend Pur / Backend Next.js

**Statut** : ✅ Article rédigé (`Architecture hexagonale appliquée à Next.js.md`)

**Pratique originale** : Application des principes de l'architecture hexagonale à Next.js en séparant clairement :
- **Backend pur** (`utils/`) : Logique métier réutilisable, testable en ligne de commande, sans dépendance à React/Next.js
- **Backend Next.js** (`app/`, `components/`) : Génération HTML, Server Components, Client Components pour l'interactivité

**Intérêt** : Cette séparation permet de tester la logique métier indépendamment de Next.js, de réutiliser le code dans différents contextes (ligne de commande, tests, composants), et de maintenir une architecture claire et testable.

**Points clés à développer** :
- Pourquoi séparer backend pur et backend Next.js ?
- Comment structurer le code pour cette séparation ?
- Avantages en termes de testabilité et réutilisabilité
- Exemples concrets dans le projet

---

#### 3. Validation des fichiers Markdown avec règles métier qui font échouer le build

**Statut** : ✅ Article rédigé (`Validation Markdown avec règles métier au build.md`)

**Pratique originale** : Les fichiers Markdown sont validés avec des règles métier strictes (pas de H1/H2, H4 sans H3, etc.) qui font échouer le build si non respectées. Ces règles sont appliquées via des tests d'intégration qui lancent des `ValidationError` synchrones, forçant l'échec du build.

**Intérêt** : Transformer des règles de documentation en contraintes techniques qui empêchent les erreurs avant même qu'elles n'atteignent la production.

**Points clés à développer** :
- Pourquoi valider les fichiers Markdown au build plutôt qu'au runtime ?
- Comment forcer l'échec du build avec des erreurs de validation ?
- Avantages : détection précoce, cohérence garantie, documentation vivante
- Exemples de règles métier et leur implémentation

---

#### 4. Architecture unifiée pour parsing Markdown : un seul parser pour tous les types de fichiers

**Statut** : ⏳ À rédiger

**Pratique originale** : Un seul parser Markdown générique (`parseMarkdown()`) pour tous les types de fichiers MD (journaux, "A propos de ce site", cours), avec une structure JSON unifiée (`ParsedFolder`) et gestion des spécificités via attributs (`typeDeContenu`, `estPrompt`, etc.) plutôt que parsers spécialisés.

**Intérêt** : Éviter la duplication de code, garantir la cohérence, faciliter l'extensibilité, et permettre un CSS uniforme basé sur la hiérarchie HTML.

**Points clés à développer** :
- Pourquoi un parser unique plutôt que des parsers spécialisés ?
- Comment gérer les spécificités sans dupliquer le code ?
- Structure hiérarchique unifiée (h1 → h2 → h3 → h4 → h5)
- Avantages en termes de maintenance et d'extensibilité

---

#### 5. TDD strict avec progression visible : les tests racontent l'histoire du code

**Statut** : ✅ Article rédigé (`TDD strict avec progression visible.md`)

**Pratique originale** : Les tests montrent explicitement la progression du simple au complexe avec des commentaires "ITÉRATION 1", "ITÉRATION 2", etc. La structure des tests raconte l'histoire de l'émergence du code, rendant la démarche TDD authentique visible et pédagogique.

**Intérêt** : Cette approche transforme les tests en documentation vivante qui explique non seulement ce que fait le code, mais aussi comment il a émergé. C'est particulièrement utile pour l'onboarding et la compréhension de l'évolution du code.

**Points clés à développer** :
- Pourquoi rendre la progression TDD visible dans les tests ?
- Comment structurer les tests pour montrer la progression ?
- Avantages pédagogiques et de maintenance
- Exemples concrets avec commentaires d'itérations

---

#### 6. Tests d'intégration qui corrigent automatiquement les fichiers tout en préservant les métadonnées

**Statut** : ✅ Article rédigé (`Tests d'intégration qui corrigent automatiquement.md`)

**Pratique originale** : Les tests d'intégration auditent et corrigent automatiquement les fichiers (ex: `Pages-Et-Lien.json`) en détectant les incohérences (pages manquantes, liens obsolètes, titres à jour) et en les corrigeant, tout en préservant les métadonnées existantes (coordonnées x/y, numéros, etc.) qui sont utiles au développeur.

**Intérêt** : Cette approche combine audit automatique et correction intelligente qui respecte le travail manuel du développeur, créant une collaboration harmonieuse entre automatisation et intervention humaine.

**Points clés à développer** :
- Comment détecter les incohérences automatiquement ?
- Comment préserver les métadonnées utiles lors de la correction ?
- Avantages : synchronisation automatique sans perte d'informations
- Exemples concrets de détection et correction

---

#### 7. Validation des JSON avec détection de types inconnus qui force l'implémentation ou la suppression

**Statut** : ⏳ À rédiger

**Pratique originale** : Les tests d'intégration parcourent tous les fichiers JSON et détectent les types inconnus (types présents dans les JSON mais non gérés dans le code). Le test échoue avec un message détaillé qui force le développeur à soit implémenter le type, soit le supprimer du JSON. Aucun type inconnu ne peut rester dans le projet.

**Intérêt** : Cette approche garantit que tous les types de contenu sont explicitement gérés, évitant les erreurs runtime et forçant une décision claire pour chaque type.

**Points clés à développer** :
- Pourquoi détecter les types inconnus au build plutôt qu'au runtime ?
- Comment forcer la décision (implémenter ou supprimer) ?
- Avantages : cohérence garantie, pas de code mort, documentation vivante
- Exemples de détection et messages d'erreur

---

#### 8. Système de métriques automatiques avec historique et tendances

**Statut** : ⏳ À rédiger

**Pratique originale** : Collecte automatique de métriques de qualité (tests, couverture, qualité de code, taille, dépendances, performance) avec historique (100 snapshots), calcul automatique des tendances (up, down, stable), et affichage dans un dashboard visuel accessible via une route dédiée.

**Intérêt** : Cette approche transforme les métriques en outil de pilotage continu, permettant de suivre l'évolution de la qualité du code dans le temps et de détecter les dérives.

**Points clés à développer** :
- Pourquoi automatiser la collecte de métriques ?
- Comment gérer l'historique et les tendances ?
- Avantages : visibilité continue, détection précoce des problèmes
- Exemples de métriques collectées et leur utilisation

---

#### 9. Journal de bord structuré avec parsing automatique pour génération de pages

**Statut** : ⏳ À rédiger

**Pratique originale** : Le journal de bord est un ensemble de fichiers Markdown structurés (format `YYYY-MM-DD.md`) qui sont parsés automatiquement pour générer des pages web. La structure est unifiée avec les autres contenus Markdown, permettant un rendu cohérent et une maintenance facilitée.

**Intérêt** : Cette approche transforme la documentation en contenu dynamique, permettant de générer automatiquement des pages à partir de fichiers Markdown structurés, tout en maintenant la cohérence avec le reste du site.

**Points clés à développer** :
- Pourquoi parser automatiquement le journal de bord ?
- Comment structurer les fichiers MD pour le parsing ?
- Avantages : documentation vivante, génération automatique, cohérence
- Exemples de structure et de rendu

---

#### 10. Pre-commit hooks pour régénération automatique des artefacts

**Statut** : ⏳ À rédiger (partiellement couvert dans l'article E2E)

**Pratique originale** : Utilisation de hooks pre-commit pour régénérer automatiquement les artefacts (scénarios E2E, plan de site) avant chaque commit, garantissant que ces fichiers sont toujours synchronisés avec le code source.

**Intérêt** : Cette approche élimine le risque d'oublier de régénérer les artefacts et garantit que le dépôt contient toujours des fichiers à jour.

**Points clés à développer** :
- Pourquoi régénérer automatiquement avant chaque commit ?
- Comment configurer les hooks pre-commit ?
- Avantages : synchronisation garantie, charge mentale réduite
- Exemples de régénération automatique

---

### Priorisation des articles à rédiger

**Articles prioritaires** (pratiques les plus originales et impactantes) :

1. ✅ **Tests d'intégration qui modifient le code source** - DÉJÀ RÉDIGÉ (`Stratégie couverture liens tests E2E.md`)
2. ✅ **Architecture hexagonale appliquée à Next.js** - DÉJÀ RÉDIGÉ (`Architecture hexagonale appliquée à Next.js.md`)
3. ✅ **Validation des fichiers Markdown avec règles métier** - DÉJÀ RÉDIGÉ (`Validation Markdown avec règles métier au build.md`)
4. ✅ **TDD strict avec progression visible** - DÉJÀ RÉDIGÉ (`TDD strict avec progression visible.md`)
5. ✅ **Tests d'intégration qui corrigent automatiquement** - DÉJÀ RÉDIGÉ (`Tests d'intégration qui corrigent automatiquement.md`)

**Articles secondaires** (intéressants mais moins originaux) :

6. ✅ **Architecture unifiée pour parsing Markdown** - DÉJÀ RÉDIGÉ (`Architecture unifiée pour parsing Markdown.md`)
7. ✅ **Validation des JSON avec détection de types inconnus** - DÉJÀ RÉDIGÉ (`Validation JSON avec détection types inconnus.md`)
8. ✅ **Système de métriques automatiques** - DÉJÀ RÉDIGÉ (`Système de métriques automatiques avec historique.md`)
9. ✅ **Journal de bord structuré avec parsing automatique** - DÉJÀ RÉDIGÉ (`Journal de bord structuré avec parsing automatique.md`)
10. ✅ **Pre-commit hooks pour régénération automatique** - DÉJÀ RÉDIGÉ (`Pre-commit hooks pour régénération automatique.md`)

---

### Format des articles

Chaque article doit suivre le format de "Stratégie couverture liens tests E2E.md" :
- Introduction avec contexte et besoin
- Résumé avec points importants (sans omettre le côté créatif, de manière subtile)
- Structure en phases/étapes claires
- Focus sur l'intention stratégique plutôt que les détails techniques
- Conclusion qui met en valeur l'approche peu courante
