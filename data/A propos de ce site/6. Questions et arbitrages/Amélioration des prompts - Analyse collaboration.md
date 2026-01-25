### Analyse de notre collaboration : Moments d'efficacité vs moments de friction

#### Moments d'efficacité ✅

**Patterns identifiés :**

1. **Demandes techniques précises avec contexte**
   - Exemple : "Dans 'index.json' remonte 'Développement informatique' sous 'Engager les équipes' et avant 'Interactions humaines'"
   - ✅ **Pourquoi ça marche** : Action claire, fichier identifié, résultat attendu explicite
   - ✅ **Résultat** : Exécution directe sans reformulation

2. **Demandes avec exemples concrets**
   - Exemple : "Sur le metric 'Complexité cyclotimque' ajoute une info bulle avec ce tableau : [tableau fourni]"
   - ✅ **Pourquoi ça marche** : Format attendu montré, pas d'ambiguïté
   - ✅ **Résultat** : Implémentation conforme dès le premier essai

3. **Corrections ciblées avec localisation précise**
   - Exemple : "Les 5 blocs supérieurs de metrics ne sont pas responsives. Si SmartPhone les empiler les uns sous les autres."
   - ✅ **Pourquoi ça marche** : Problème localisé, solution attendue claire
   - ✅ **Résultat** : Correction rapide et efficace

4. **Demandes de documentation/analyse**
   - Exemple : "Va lire ce fichier [chemin]"
   - ✅ **Pourquoi ça marche** : Objectif clair, ressource identifiée
   - ✅ **Résultat** : Compréhension immédiate et action appropriée

---

#### Moments de friction ❌

**Patterns identifiés :**

1. **Malentendu terminologique (z-index vs position verticale)**
   - **Votre prompt** : "L'info bulle FLOTE sous les icônes"
   - **Mon interprétation** : Position verticale (Y)
   - **Votre intention** : Z-index (couches)
   - ❌ **Cause** : Ambiguïté du mot "dessous" (2 sens possibles)
   - ❌ **Résultat** : 5+ tentatives, frustration maximale ("AAAAARRRRGGGGG !!!")

2. **Demande implicite non exprimée**
   - **Votre prompt** : "Sur le metric 'Complexité cyclotimque' ajoute une info bulle"
   - **Mon interprétation** : Une seule tooltip
   - **Votre intention** : Toutes les 19 tooltips
   - ❌ **Cause** : Scope non précisé (1 vs 19)
   - ❌ **Résultat** : Découverte tardive, correction nécessaire

3. **Correction de format sans spécification précise**
   - **Votre prompt** : "C'est illisible. Vas tu pouvoir corriger ?"
   - **Mon interprétation** : Format actuel à améliorer
   - **Votre intention** : Format chronologique factuel spécifique
   - ❌ **Cause** : Critère de qualité non défini
   - ❌ **Résultat** : Plusieurs itérations nécessaires

4. **Correction technique avec stratégie erronée**
   - **Votre prompt** : "Le fichier contient un titre de niveau 2 (##). Les fichiers MD doivent commencer au niveau 3 (###)."
   - **Mon action** : Remplacement global `##` → `###`
   - **Problème** : Transformation en cascade de tous les niveaux
   - ❌ **Cause** : Stratégie de correction non précisée (ordre de remontée)
   - ❌ **Résultat** : Corruption du fichier, correction complexe

5. **Contexte manquant sur les changements récents**
   - **Votre prompt** : "Les images n'apparaissent pas"
   - **Contexte manquant** : Dossier images déplacé récemment
   - ❌ **Cause** : Information contextuelle non communiquée
   - ❌ **Résultat** : Diagnostic incorrect initialement

---

#### Causes racines identifiées

**1. Ambiguïté terminologique**
- **Problème** : Mots avec plusieurs sens (dessous = position Y OU z-index)
- **Impact** : Malentendus systémiques, perte de temps
- **Fréquence** : Élevée dans les domaines techniques (CSS, UI/UX)

**2. Scope implicite**
- **Problème** : Portée de la demande non précisée (1 élément vs tous)
- **Impact** : Travail partiel, découverte tardive
- **Fréquence** : Moyenne, surtout pour les tâches répétitives

**3. Critères de qualité non définis**
- **Problème** : "C'est illisible" sans spécification du format attendu
- **Impact** : Itérations multiples, frustration
- **Fréquence** : Faible mais impact fort

**4. Stratégie de correction non précisée**
- **Problème** : "Corriger les H2" sans dire comment (ordre, méthode)
- **Impact** : Corruption de données, correction complexe
- **Fréquence** : Faible mais critique

**5. Contexte manquant**
- **Problème** : Changements récents non mentionnés (déplacement fichiers)
- **Impact** : Diagnostic incorrect, perte de temps
- **Fréquence** : Moyenne

**6. Assumptions sur ma compréhension**
- **Problème** : "Tu aurais dû savoir que..." (règles implicites)
- **Impact** : Reproches, frustration mutuelle
- **Fréquence** : Faible mais frustrante

---

#### Conseils pour améliorer vos prompts

**🎯 Règle d'or : Un prompt efficace = Action + Contexte + Critères + Exemple**

##### 1. Désambiguïser les termes techniques

**❌ À éviter :**
```
"L'info bulle est sous les icônes"
```

**✅ À privilégier :**
```
"L'info bulle est sous les icônes EN TERMES DE Z-INDEX (couches), pas en position verticale"
```
ou
```
"L'info bulle a un z-index insuffisant : elle apparaît sous les icônes dans l'ordre d'empilement"
```

**💡 Principe** : Pour les concepts techniques avec plusieurs sens, préciser explicitement lequel vous utilisez.

---

##### 2. Spécifier le scope explicitement

**❌ À éviter :**
```
"Sur le metric 'Complexité cyclotimque' ajoute une info bulle"
```

**✅ À privilégier :**
```
"Sur le metric 'Complexité cyclotimque' ajoute une info bulle avec ce tableau. 
Ensuite, applique la même logique aux 18 autres métriques de la page."
```
ou
```
"Sur TOUTES les métriques de la page metrics, ajoute une info bulle avec le contenu approprié"
```

**💡 Principe** : Toujours préciser si c'est "un seul" ou "tous les".

---

##### 3. Définir les critères de qualité attendus

**❌ À éviter :**
```
"C'est illisible. Vas tu pouvoir corriger ?"
```

**✅ À privilégier :**
```
"Le fichier est illisible. Je veux un format chronologique :
- Une demande de ma part
- L'image illustrative juste au dessus ou en dessous
- Un résumé de ta réponse
- Et ainsi de suite
Format factuel, pas de titres excessifs, personnages : Alain et L'IA"
```

**💡 Principe** : Si vous critiquez un format, décrivez le format attendu.

---

##### 4. Préciser la stratégie de correction

**❌ À éviter :**
```
"Le fichier contient un titre de niveau 2 (##). Les fichiers MD doivent commencer au niveau 3 (###)."
```

**✅ À privilégier :**
```
"Le fichier contient un titre de niveau 2 (##). Les fichiers MD doivent commencer au niveau 3 (###).
Corrige en remontant progressivement depuis le bas : H6→H5→H4→H3, puis garde les 3 H2 originaux en H3."
```

**💡 Principe** : Pour les corrections structurelles, indiquer l'ordre et la méthode.

---

##### 5. Communiquer le contexte récent

**❌ À éviter :**
```
"Les images n'apparaissent pas"
```

**✅ À privilégier :**
```
"Les images n'apparaissent pas. Ne pas oublier que le dossier images a été rangé à la racine de '.\data' 
et qu'il faut adapter le code."
```

**💡 Principe** : Mentionner les changements récents qui affectent la demande.

---

##### 6. Utiliser des exemples concrets

**❌ À éviter :**
```
"Refais le fichier dans un format plus lisible"
```

**✅ À privilégier :**
```
"Refais le fichier dans un format chronologique factuel :
- Demande d'Alain → Image → Réponse de l'IA
- Pas de titres excessifs, seulement H3 pour les phases
- Personnages : Alain et L'IA
- Utiliser [image:filename] pour les images"
```

**💡 Principe** : Montrer le format attendu avec un exemple ou une structure.

---

##### 7. Valider les assumptions

**❌ À éviter :**
```
"Tu aurais dû savoir que le hook pre-commit régénère automatiquement"
```

**✅ À privilégier :**
```
"Ce que tu viens de faire manuellement aurait dû être fait par le TI. 
Va lire ce fichier [chemin] pour comprendre la stratégie automatique."
```

**💡 Principe** : Si je n'ai pas suivi une règle, me diriger vers la documentation plutôt que supposer que je la connais.

---

##### 8. Structurer les demandes complexes

**❌ À éviter :**
```
"Corrige le fichier markdown, les images, et adapte le code pour le nouveau chemin"
```

**✅ À privilégier :**
```
"Plusieurs corrections à faire :
1. Corriger le fichier markdown (H2→H3, en remontant depuis le bas)
2. Vérifier que les images sont bien référencées avec [image:filename]
3. Adapter le code API pour le nouveau chemin data/images/
Fais-les dans cet ordre et valide chaque étape."
```

**💡 Principe** : Pour les demandes multiples, lister et ordonner les étapes.

---

##### 9. Utiliser des formats structurés

**✅ Format efficace :**
```
"Dans [fichier], [action] :
- [détail 1]
- [détail 2]
- [résultat attendu]
```

**Exemple concret :**
```
"Dans 'index.json', remonte 'Développement informatique' :
- Sous 'Engager les équipes'
- Avant 'Interactions humaines'
- Résultat : Nouvel ordre logique des sections"
```

**💡 Principe** : Structure claire = compréhension immédiate.

---

##### 10. Donner du feedback constructif

**❌ À éviter :**
```
"Tu fais n'importe quoi !"
```

**✅ À privilégier :**
```
"C'est quoi cette stratégie ? Si tu corriges d'abord les H2 en H3, comment vas-tu corriger les H3 en H4 ? 
Il faut commencer par le niveau le plus bas."
```

**💡 Principe** : Expliquer pourquoi c'est incorrect plutôt que juste critiquer.

---

#### Checklist pour un prompt efficace

Avant d'envoyer un prompt, vérifiez :

- [ ] **Action claire** : Qu'est-ce que je veux exactement ?
- [ ] **Scope défini** : Un seul élément ou tous ?
- [ ] **Contexte fourni** : Y a-t-il des changements récents à mentionner ?
- [ ] **Critères précisés** : Comment juger que c'est bon ?
- [ ] **Termes désambiguïsés** : Les mots techniques ont-ils plusieurs sens ?
- [ ] **Stratégie indiquée** : Comment procéder (ordre, méthode) ?
- [ ] **Exemple fourni** : Format attendu montré ?
- [ ] **Feedback constructif** : Si correction, expliquer pourquoi

---

#### Exemples de prompts optimisés

**Exemple 1 : Correction technique**

**❌ Avant :**
```
"Corrige les headers dans le fichier markdown"
```

**✅ Après :**
```
"Le fichier '2026-01-24-bataille-des-tooltips.md' contient des H2 (##) alors qu'il doit commencer au niveau H3 (###).
Corrige en remontant progressivement depuis le bas :
1. H6 → H5 (niveau 5 libre)
2. H5 → H4 (niveau 4 libre)  
3. H4 → H3 (niveau 3 libre)
4. Garde les 3 H2 originaux (lignes 231, 389, 471) en H3
Ne pas utiliser replace_all qui transformerait tous les niveaux en cascade."
```

---

**Exemple 2 : Format de fichier**

**❌ Avant :**
```
"C'est illisible. Corrige-le"
```

**✅ Après :**
```
"Le fichier '2026-01-24-bataille-des-tooltips.md' est illisible. 
Je veux un format chronologique factuel :
- Demande d'Alain → Image illustrative → Résumé réponse de l'IA
- Pas de titres excessifs, seulement H3 (###) pour les phases
- Personnages : Alain (moi) et L'IA (toi)
- Utiliser [image:filename] pour les images
- Pas de date (tout s'est passé aujourd'hui), mais mettre l'heure si possible
- Utiliser ****réponse technique**** pour le code
Refais tout en partant du chat, du début (ajout tooltip) jusqu'à la fin (validation US + 4 tooltips manquants)."
```

---

**Exemple 3 : Correction de bug**

**❌ Avant :**
```
"Les images n'apparaissent pas"
```

**✅ Après :**
```
"Les images n'apparaissent pas dans le fichier markdown.
Contexte : Le dossier images a été déplacé de 'data/A propos de ce site/images/' vers 'data/images/' à la racine.
Actions à faire :
1. Vérifier que l'API route pointe vers 'data/images/'
2. Vérifier que les images sont bien référencées avec [image:filename]
3. Tester que les images s'affichent correctement"
```

---

#### Résumé : Les 3 règles d'or

**1. Spécificité > Généralité**
   - Préciser plutôt que généraliser
   - Montrer plutôt que décrire
   - Exemple plutôt qu'abstraction

**2. Contexte > Assumptions**
   - Mentionner les changements récents
   - Fournir les informations contextuelles
   - Diriger vers la documentation si nécessaire

**3. Structure > Flux de conscience**
   - Lister les actions
   - Ordonner les étapes
   - Définir les critères de succès

---

**Cette analyse est basée sur notre historique de collaboration, notamment la "bataille des tooltips" qui illustre parfaitement les patterns de friction et d'efficacité.**
