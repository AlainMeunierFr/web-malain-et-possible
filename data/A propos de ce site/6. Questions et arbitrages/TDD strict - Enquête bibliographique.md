### Enquête bibliographique : TDD strict et bonnes pratiques

**Date** : 2026-01-20
**Objectif** : Documenter les bonnes pratiques du TDD strict (un test à la fois, code minimal, refactoring systématique) pour justifier leur intégration dans le DOD.

---

#### Résumé exécutif

**TDD ≠ couverture de code**. Le TDD est une **discipline de développement** qui vise à faire émerger le code le plus simple possible en écrivant les tests d'abord. L'approche stricte consiste à :
1. Écrire **un seul test** à la fois (le plus simple possible)
2. Écrire le **code minimal** pour faire passer ce test
3. **Refactoriser** après chaque test vert
4. **Ensuite seulement** passer au test suivant

---

#### Outils open source qui forcent le TDD strict

##### TDD Guard (nizos/tdd-guard)
**GitHub** : https://github.com/nizos/tdd-guard

**Description** : Outil open source conçu spécifiquement pour **Claude Code** qui empêche :
- De commencer à coder avant d'avoir un test qui échoue (**"Test-First Enforcement"**)
- D'implémenter plus que ce que le test exige (**"Minimal Implementation"**)

**Fonctionnement** :
- Reporters pour plusieurs langages : TypeScript, JavaScript, Python, PHP, Go, Rust
- S'intègre avec Jest, Vitest, PHPUnit, pytest, etc.
- Via des hooks (pré-commit ou CI), des reporters de tests
- Bloque certaines actions si elles violent les principes du TDD

**Citation clé** : *"Il empêche notamment de commencer à coder avant d'avoir un test qui échoue"* et *"D'implémenter plus que ce que le test exige"*

**Conclusion** : Outil concret qui démontre qu'un **enforcement technique** du TDD strict est possible.

---

##### TDD.sh
**Site** : https://tdd.sh/

**Description** : Outil CLI open source pour pratiquer le TDD selon **Kent Beck** : red → green → refactor.

**Fonctionnement** :
- Force l'utilisateur à démarrer une session TDD
- Écrit des tests d'abord
- Exécute tous les tests
- Commit automatiquement si tous passent, sinon affiche une TODO
- Intègre des **timers pour limiter le temps dans la phase "red"**

**Citation clé** : *"Force l'utilisateur à démarrer une session TDD, écrit des tests d'abord, exécute tous les tests"*

**Conclusion** : Outil qui **guide** et **structure** le cycle red-green-refactor strict.

---

#### Articles et études académiques

##### 1. "Best practices in test-driven development" (Opensource.com)
**Source** : https://opensource.com/article/19/10/test-driven-development-best-practices

**Points clés** :
- **TDD est une discipline stricte** : écrire le test qui échoue, puis juste assez de code pour le faire passer, puis refactorer
- Principe **FIRST** : Fast, Independent, Repeatable, Self-validating, Thorough
- Importance des tests **indépendants, clairs, rapides, bien structurés**

**Citation** : *"TDD is a strict discipline: write the failing test, then just enough code to make it pass, then refactor"*

**Conclusion** : Confirme que TDD = discipline stricte, pas juste couverture.

---

##### 2. "Towards a TDD maturity model through an anti-patterns framework"
**Source** : ArXiv (2023) - https://arxiv.org/abs/2307.11534

**Points clés** :
- Identifie les **anti-patterns** autour du TDD :
  - Appeler "réorganisation" sans tests
  - Addition de fonctionnalités sans tests
  - Tests dépendants entre eux
  - Tests peu clairs
- Permet de définir un **niveau de maturité** et les pièges à éviter

**Conclusion** : Démontre qu'il existe des **anti-patterns** clairs à éviter, ce qui implique des **bonnes pratiques** opposées (one test at a time, minimal code, etc.).

---

##### 3. "A Longitudinal Cohort Study on the Retainment of Test-Driven Development"
**Source** : ArXiv (2018) - https://arxiv.org/abs/1807.02971

**Points clés** :
- Sur **5 mois**, les praticiens novices de TDD écrivent **beaucoup plus de tests** que les non-TDD
- Les développeurs **conservent cette pratique dans le temps** si elle est bien encadrée
- Conclusion : TDD favorise une **couverture test significative** et devient une habitude durable

**Conclusion** : Le TDD strict peut devenir une **discipline durable** si bien encadrée.

---

##### 4. "Improving Development Practices through Experimentation: an Industrial TDD Case"
**Source** : ArXiv (2018) - https://arxiv.org/abs/1809.01828

**Points clés** :
- Étude dans une entreprise (Paf, secteur des jeux) comparant trois approches : TDD, approche classique, "Iterative Test Last"
- Résultat : Le TDD produit une **qualité externe supérieure**
- Un peu plus de coût initial, mais **pas dramatique**

**Conclusion** : Le TDD améliore la qualité des livrables (moins de bugs, meilleur code) avec un coût initial justifié.

---

##### 5. "A Comparative Study on the Impact of Test-Driven Development (TDD) and Behavior-Driven Development (BDD)"
**Source** : ArXiv (2024) - https://arxiv.org/abs/2411.04141

**Points clés** :
- Le TDD augmente la **qualité du code** et réduit les défauts dans les environnements d'entreprise
- Coût initial en terme de temps, mais bénéfices à long terme

**Conclusion** : Confirmation récente (2024) des bénéfices du TDD en entreprise.

---

#### Confrontation des sources : TDD = couverture vs TDD = discipline

##### Vision partielle (TDD = couverture de code)
**Problème identifié** : Beaucoup d'articles et d'outils se concentrent uniquement sur la **couverture de code** comme métrique du TDD.

**Exemples** :
- **SonarQube** : Quality Gates avec seuils de couverture
- **CodeScene** : Code Coverage Gates
- **GitLab** : Seuils de couverture dans les MR

**Limite** : Ces outils mesurent la **résultat** (couverture), pas le **processus** (test-first, minimal code).

##### Vision complète (TDD = discipline d'émergence)
**Vraie nature du TDD** : Le TDD n'est pas une métrique de couverture, mais une **discipline de développement** qui vise à :
1. **Faire émerger le code le plus simple possible**
2. **Clarifier les exigences** avant de coder (via les tests)
3. **Améliorer le design** en pensant à la testabilité dès le départ

**Sources qui le confirment** :
- **TDD Guard** : Force "minimal implementation" (pas juste couverture)
- **TDD.sh** : Guide le cycle red-green-refactor (processus, pas résultat)
- **Articles Opensource.com** : "TDD is a strict discipline: write the failing test, then just enough code"
- **Kent Beck** (mentionné) : Inventeur du TDD, auteur de "Test-Driven Development: By Example"

**Conclusion** : Les outils de **couverture** sont complémentaires mais **ne remplacent pas** la discipline TDD stricte.

---

#### Principes du TDD strict identifiés

##### 1. One test at a time (un test à la fois)
**Sources** :
- TDD Guard empêche d'écrire plusieurs tests en même temps
- Anti-patterns framework : "tests dépendants" = mauvais
- Principe FIRST : tests "Independent" = indépendants

**Justification** : Écrire un seul test à la fois permet de :
- Se concentrer sur **un seul comportement** à la fois
- Éviter la **complexité inutile** (ne pas tester des cas non nécessaires)
- Faciliter le **refactoring** (moins de tests à maintenir simultanément)

---

##### 2. Smallest possible test first (commencer par le cas le plus simple)
**Sources** :
- TDD.sh : Timer pour limiter le temps en phase "red" = incite à commencer simple
- Anti-patterns : "tests peu clairs" = éviter
- Best practices : Tests doivent être "Fast" et "Self-validating"

**Justification** : Commencer par le cas le plus simple permet de :
- **Valider rapidement** que le test fonctionne
- **Éviter la sur-implémentation** (ne pas gérer tous les cas d'un coup)
- **Progression incrémentale** : du simple au complexe

---

##### 3. Minimal code (code minimal pour faire passer le test)
**Sources** :
- **TDD Guard** : Empêche explicitement "d'implémenter plus que ce que le test exige"
- **Opensource.com** : "then just enough code to make it pass"
- **Anti-patterns** : "over-engineering" = mauvais

**Justification** : Code minimal permet de :
- **Éviter la sur-implémentation** (ne pas gérer tous les cas possibles)
- **Garder le code simple** (YAGNI : You Aren't Gonna Need It)
- **Faciliter le refactoring** (moins de code = moins de complexité)

---

##### 4. Refactor after each green (refactoriser après chaque test vert)
**Sources** :
- **TDD.sh** : Guide le cycle red-green-**refactor** strict
- **Anti-patterns** : "réorganisation sans tests" = mauvais
- **Best practices** : Cycle RED → GREEN → **REFACTOR**

**Justification** : Refactoriser après chaque vert permet de :
- **Maintenir la qualité** du code (pas de dette technique)
- **Améliorer la lisibilité** (DDD : Domain-Driven Design, nommage métier)
- **Éviter l'accumulation** de code "quick hack"

---

#### Outils pour forcer le respect du TDD strict

##### Outils d'enforcement technique

| Outil | Type | Force le TDD strict ? | Comment |
|-------|------|----------------------|---------|
| **TDD Guard** | Extension/Reporter | ✅ OUI | Bloque code sans test, empêche sur-implémentation |
| **TDD.sh** | CLI | ✅ OUI | Guide le cycle red-green-refactor, timer pour phase red |
| **SonarQube** | Quality Gate | ❌ PARTIEL | Mesure couverture, pas le processus |
| **CodeScene** | Quality Gate | ❌ PARTIEL | Mesure couverture, pas le processus |
| **GitLab Coverage** | CI/CD | ❌ PARTIEL | Mesure couverture, pas le processus |

**Conclusion** : **TDD Guard** et **TDD.sh** sont les seuls outils identifiés qui forcent réellement le **processus TDD strict** (pas juste la couverture).

---

#### Recommandations pour intégrer le TDD strict dans le DOD

##### Niveau 1 : Règles processuelles (Facile)
1. **One test at a time** : Chaque US doit commencer par écrire **un seul test** (le plus simple possible)
2. **Minimal code** : Écrire le **code minimal** pour faire passer le test
3. **Refactor after green** : Refactoriser après chaque test vert avant de passer au suivant
4. **Smallest first** : Commencer par le cas le plus simple (fichier vide, puis 1 ligne, etc.)

##### Niveau 2 : Outils d'enforcement (Moyen)
1. **TDD Guard** : Intégrer dans le workflow CI/CD
2. **TDD.sh** : Utiliser pour les sessions de développement critiques
3. **CI/CD strict** : Bloquer les PR sans tests, exiger que tous les tests passent

##### Niveau 3 : Culture et formation (Complexe)
1. **Pair programming** : Aide à respecter la discipline (selon Infoworld)
2. **Code review TDD-focused** : Vérifier que le cycle red-green-refactor a été respecté
3. **Formation interne** : Sessions régulières pour partager les bonnes pratiques

---

#### Bibliographie complète

##### Outils
1. **TDD Guard** : https://github.com/nizos/tdd-guard
2. **TDD.sh** : https://tdd.sh/
3. **SonarQube** : https://www.sonarsource.com/
4. **CodeScene** : https://codescene.io/
5. **GitLab Coverage** : https://docs.gitlab.com/ee/ci/testing/code_coverage/

##### Articles
1. **Best practices in test-driven development** : https://opensource.com/article/19/10/test-driven-development-best-practices
2. **Why Test-Driven Development After All?** : https://www.wwt.com/blog/why-test-driven-development-after-all
3. **Best practices for test-driven development** : https://www.infoworld.com/article/2163948/best-practices-for-test-driven-development.html

##### Études académiques
1. **Towards a TDD maturity model through an anti-patterns framework** (2023) : https://arxiv.org/abs/2307.11534
2. **A Longitudinal Cohort Study on the Retainment of Test-Driven Development** (2018) : https://arxiv.org/abs/1807.02971
3. **Improving Development Practices through Experimentation: an Industrial TDD Case** (2018) : https://arxiv.org/abs/1809.01828
4. **A Comparative Study on the Impact of Test-Driven Development (TDD) and Behavior-Driven Development (BDD)** (2024) : https://arxiv.org/abs/2411.04141

##### Projets open source
1. **FitNesse** : Projet en Java (~50 000 lignes), construit avec TDD, couverture ~90%
2. **OpenFlexure** : Projet Python avec exigence explicite de tests unitaires pour chaque contribution

---

#### Conclusion

**Le TDD strict (one test at a time, minimal code, refactor) est bien documenté** dans la littérature et supporté par des outils concrets (TDD Guard, TDD.sh).

**Distinction importante** : Le TDD n'est **pas** une métrique de couverture, mais une **discipline de développement** qui vise à faire émerger le code le plus simple possible.

**Recommandation** : Intégrer les règles de TDD strict dans le DOD au niveau 1 (processuel), puis envisager les outils d'enforcement (niveau 2) et la culture (niveau 3) selon l'évolution du projet.
