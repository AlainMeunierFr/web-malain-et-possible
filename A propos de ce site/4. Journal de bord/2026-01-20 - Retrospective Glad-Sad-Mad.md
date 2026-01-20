### Rétrospective Glad-Sad-Mad - Amélioration du DOD

**Date** : 2026-01-20

---

#### Glad : Ce qui s'est bien passé

##### Points communs
- **US bien structurées** : La première US "Hello World" a été fluide. Les User Stories avec critères d'acceptation clairs facilitent grandement l'implémentation.
- **Exemples visuels efficaces** : Les captures d'écran de l'ancien site Bubble ont permis une compréhension rapide des attentes. Le remplacement des images par du vectoriel a été rapide.
- **Efficacité de l'implémentation** : Le composant "Témoignages" a été créé (JSON + page) en une seule itération avec seulement un petit ajustement d'alignement.
- **Structure du projet** : Site Bubble entièrement transféré en 3 jours avec tout le contenu sous forme JSON. CSM maison fonctionnel.
- **Tests TDD productifs** : Une fois lancés, les séances TDD ont été très productives et constructives.

##### Points spécifiques
- **Responsive par défaut** : Le comportement responsive est assez bon par défaut (contrairement à Bubble où c'était laborieux).
- **Page Metrics** : L'ajout de la page "Metrics" a été complètement bluffant.
- **Choix autonome intelligent** : Utilisation de l'icône "Réseau" pour "Plan du site" (visuellement adapté, mais surprise sur l'autonomie du choix).
- **Correction de bugs** : Efficace quand les symptômes sont clairs et les informations précises.

---

#### Sad : Frustrant mais gérable

##### Point majeur commun
- **Ajustements CSS longs et laborieux** : Les ajustements CSS prennent beaucoup de temps avec de nombreux aller-retours. Difficile à cibler précisément sans voir le résultat en temps réel.

##### Points spécifiques
- **Perte de prompts** : Peur constante de perdre des prompts car ils ne sont pas toujours enregistrés en temps réel. Besoin de conserver la conversation pour le blog.
- **Contraintes implicites** : Certaines règles (DOD, conventions) n'étaient pas toujours évidentes au départ.
- **Fichiers longs** : Difficiles à modifier avec précision, surtout pour les ajustements CSS répétitifs.
- **Communication visuelle limitée** : Impossible de voir directement le résultat, d'où des aller-retours fréquents.

---

#### Mad : Points bloquants / critiques

##### Points majeurs communs (à prioriser)

1. **Non-respect systématique de la DOD** ⚠️ **CRITIQUE**
   - Journal de bord pas toujours rempli pour les US
   - Codage parfois commencé avant validation complète des besoins
   - DOD pas toujours respectée de manière systématique

2. **Codage prématuré** ⚠️ **CRITIQUE**
   - Commencement du codage avant confirmation OK sur la demande
   - Causant parfois de la reprise et de la frustration

3. **Tests négligés** ⚠️ **CRITIQUE**
   - TDD mentionné régulièrement mais couverture de tests à 50% avant contrôle
   - Tests pas une priorité dès le début malgré les rappels constants

4. **Complexité inutile** ⚠️ **IMPORTANT**
   - Parfois des solutions trop complexes pour des demandes simples
   - Longues minutes perdues sur des solutions élaborées alors qu'une solution simple suffisait

##### Points spécifiques
- **Difficile d'interrompre** : Quand l'IA se lance dans des modifications complexes, difficile d'interrompre car les fichiers sont déjà modifiés.
- **Choix autonome inattendu** : L'icône "Réseau" pour "Plan du site" était visuellement correct mais le choix a été fait sans consultation.

---

#### Actions proposées pour améliorer le DOD

##### Actions CRITIQUES (à implémenter en priorité)

###### A1 : Respect systématique du journal de bord
- **Difficulté pour l'IA** : 🟢 **FACILE**
  - **Raison** : C'est une action automatique qui peut être ajoutée comme étape finale de chaque US
  - **Implémentation** : Ajouter systématiquement la mise à jour du journal en fin de traitement d'une US
  - **Rappel** : Utiliser un système de checklist ou de todo

###### A2 : Validation avant codage
- **Difficulté pour l'IA** : 🟡 **MOYENNE**
  - **Raison** : Nécessite de résister à l'impulsion de coder immédiatement et de poser des questions de clarification
  - **Implémentation** : Toujours reformuler la demande, identifier les ambiguïtés, et demander validation avant de toucher au code
  - **Défi** : L'IA a tendance à vouloir "aider" en faisant directement, mais doit apprendre à "attendre"

###### A3 : Tests dès le départ (TDD)
- **Difficulté pour l'IA** : 🟡 **MOYENNE**
  - **Raison** : Nécessite un changement de mentalité : tests d'abord, code ensuite
  - **Implémentation** : Quand TDD/BDD est mentionné, commencer systématiquement par écrire les tests, puis le code
  - **Défi** : L'IA doit résister à l'envie de coder directement la fonctionnalité

##### Actions IMPORTANTES (à implémenter ensuite)

###### A4 : Éviter la complexité inutile
- **Difficulté pour l'IA** : 🔴 **COMPLEXE**
  - **Raison** : Difficile pour l'IA de juger si une solution est "trop complexe" sans connaître le contexte complet
  - **Implémentation** : Quand une demande semble simple, proposer d'abord la solution la plus simple possible
  - **Défi** : L'IA a tendance à vouloir gérer tous les cas possibles, même si non demandés

###### A5 : Améliorer les ajustements CSS
- **Difficulté pour l'IA** : 🔴 **COMPLEXE**
  - **Raison** : Sans voir le résultat, difficile de comprendre précisément l'écart visuel
  - **Implémentation** : Demander plus de précisions (screenshots, mesures, descriptions détaillées)
  - **Alternative** : Suggérer d'utiliser les outils de développement du navigateur pour identifier précisément les styles

###### A6 : Sauvegarde des prompts
- **Difficulté pour l'IA** : 🟢 **FACILE**
  - **Raison** : Action automatique, peut être ajoutée comme étape après chaque session importante
  - **Implémentation** : Après chaque US ou session importante, proposer explicitement de mettre à jour le journal

##### Actions AMÉLIORATION (bonus)

###### A7 : Clarifier les choix autonomes
- **Difficulté pour l'IA** : 🟡 **MOYENNE**
  - **Raison** : Nécessite de distinguer ce qui peut être choisi automatiquement vs ce qui nécessite validation
  - **Implémentation** : Pour les choix de design/structure importants, proposer plusieurs options ou demander validation

###### A8 : Permettre l'interruption facile
- **Difficulté pour l'IA** : 🟡 **MOYENNE**
  - **Raison** : L'IA doit apprendre à faire des modifications incrémentales plutôt que tout changer d'un coup
  - **Implémentation** : Faire des changements par petits pas, avec pauses entre chaque étape pour permettre feedback

---

#### Classification par difficulté d'implémentation pour l'IA

##### 🟢 FACILE (Actions automatiques/processuelles)
1. ✅ Respect systématique du journal de bord (A1)
2. ✅ Sauvegarde des prompts (A6)

##### 🟡 MOYENNE (Changement de comportement/mentalité)
3. ⚠️ Validation avant codage (A2)
4. ⚠️ Tests dès le départ - TDD (A3)
5. ⚠️ Clarifier les choix autonomes (A7)
6. ⚠️ Permettre l'interruption facile (A8)

##### 🔴 COMPLEXE (Dépend de la compréhension/context)
7. ❌ Éviter la complexité inutile (A4)
8. ❌ Améliorer les ajustements CSS (A5)

---

#### Prochaines étapes

1. **Intégrer dans le DOD** : Ajouter les actions FACILES et MOYENNES comme règles obligatoires
2. **Créer des checklists** : Pour les actions MOYENNES, créer des rappels dans le processus
3. **Surveiller et ajuster** : Pour les actions COMPLEXES, identifier des indicateurs de progression

---

#### Notes

- **Coût différencié** : Les actions FACILES ont un coût très faible pour l'IA (automatisation), mais peuvent avoir un impact important.
- **Actions MOYENNES** : Nécessitent un changement de comportement, mais sont réalisables avec discipline.
- **Actions COMPLEXES** : Nécessitent soit plus de contexte (CSS), soit une meilleure compréhension des besoins implicites (complexité).
