### État des lieux des tests en échec - 2026-01-27

**Contexte** : 17 suites de tests échouent sur 63 totales (62 tests en échec sur 513)

#### Tests unitaires (TU) en échec

1. **tests/unit/tooltip-config.test.ts**
   - Problème : Fichier de configuration manquant ou structure incorrecte
   - À investiguer

2. **tests/unit/tooltip-integration.test.ts**
   - Problème : Interprétations doivent couvrir différents niveaux de qualité
   - Métriques sans % doivent avoir "excellent/bon" ET "critique/insuffisant"
   - Métriques avec % sont exclues (OK)
   - **Métriques en échec** (sans les mots requis) :
     - `totalFiles` : "Petit projet, Projet moyen, Projet important, Très gros projet"
     - `sourceLines` : "Code compact, Taille standard, Code volumineux, Très volumineux"
     - `components` : "Interface simple, Interface riche, Interface complexe, Très complexe"
     - `pages` : "Site simple, Site standard, Site riche, Très riche"
     - `dependenciesTotal` : "Léger, Standard, Nombreuses, Très nombreuses"
     - `bundleSize` : "Très léger, Léger, Moyen, Lourd"
     - `buildTime` : "Ultra-rapide, Rapide, Lent, Très lent"
   - **Métriques OK** : `vulnerabilities` (a "Parfaite" et "Critique")
   - **Action** : supprimer les tests sur les toolstips. prochainement (pas tout de suite nous allons refaire toute la page "metrics")

3. **tests/unit/temoignagesJson.test.ts**
   - À investiguer

4. **tests/unit/profilPages.test.ts**
   - Problème : Résolution des références competences.json
   - Erreur : "Le fichier competences.json doit contenir un objet 'competences'"
   - **Action** : le fichier ".\data\bibliothèque\competences.json" contient bien une liste de compétences (sinon le site ne fonctionnait pas)


5. **tests/unit/Video.test.tsx**
   - À investiguer

6. **tests/unit/PageContentRenderer.test.tsx**
   - À investiguer

7. **tests/unit/GroupeBoutons.test.tsx**
   - À investiguer

8. **tests/unit/Temoignages.test.tsx**
   - À investiguer

9. **tests/unit/CallToAction.test.tsx**
   - À investiguer

10. **tests/unit/TexteLarge.test.tsx**
    - À investiguer

11. **tests/unit/Titre.test.tsx**
    - À investiguer

12. **tests/unit/Header.test.tsx**
    - À investiguer

13. **tests/unit/VideoDetournement.test.tsx**
    - À investiguer

14. **tests/unit/Tooltip.test.tsx**
    - Problème : Event listeners cleanup au unmount
    - Erreur : `removeEventListenerSpy` n'est pas appelé
   - **Action** : supprimer les tests sur les toolstips. prochainement (pas tout de suite nous allons refaire toute la page "metrics")

#### Tests d'intégration en échec

15. **tests/integration/e2e-ids-detection.integration.test.ts**
    - Problème : Format e2eID invalide dans profil-agile.json
    - Erreur : "v10-profil-agile-1" ne respecte pas le format [lettre][chiffres]
    - **CORRIGÉ** : Changé en "v11" et "v12"

16. **tests/integration/e2e-ids-coverage.integration.test.ts**
    - Problème : 1 e2eID non testé : hero-bouton-principal
    - Action : Ajouter test dans parcours-complet-liens.spec.ts
   - **Action** : oui, à corriger

17. **tests/integration/pageRendering.test.ts**
    - Problème : Fichier ingenierie-logiciel.json n'existe pas
    - Erreur : Le fichier est dans "avant migration/" mais le test cherche dans "data/"
   - **Action** : c'est normal. Cette page n'existe plus. Supprimer le test.

#### Plan d'action

**Priorité 1 - Tests unitaires (TU) - Ordre de traitement** :
1. tooltip-config.test.ts et tooltip-integration.test.ts (déjà en cours)
2. profilPages.test.ts (résolution competences.json)
3. Tooltip.test.tsx (cleanup event listeners)
4. Autres tests unitaires (à investiguer un par un)

**Priorité 2 - Tests d'intégration** :
1. e2e-ids-detection.integration.test.ts (CORRIGÉ)
2. e2e-ids-coverage.integration.test.ts (ajouter test hero-bouton-principal)
3. pageRendering.test.ts (corriger chemin ou créer fichier)

**Méthode** :
- Pour chaque test en échec, déterminer si c'est le code ou le test qui est incorrect
- Si refactorisation récente → le test doit être corrigé
- Si bug réel → corriger le code
- Objectif : 100% de tests qui passent
