# Guide pour des Prompts Efficaces

*Synthèse des patterns efficaces et des pièges à éviter, basée sur l'analyse de nos échanges.*

---

## Règle d'Or

**Un prompt efficace = Action + Contexte + Critères + Exemple**

---

## 1. Patterns Efficaces ✅

### 1.1 Demandes Techniques Précises avec Contexte

**Efficace** :
```
Dans 'index.json' remonte 'Développement informatique' sous 'Engager les équipes' 
et avant 'Interactions humaines'
```
**Pourquoi** : Action claire, fichier identifié, résultat attendu explicite.

### 1.2 Demandes avec Exemples Concrets

**Efficace** :
```
Sur le metric 'Complexité cyclomatique' ajoute une info bulle avec ce tableau :
Complexité | Interprétation
1–10      | Excellente : Code simple...
```
**Pourquoi** : Format attendu montré, pas d'ambiguïté.

### 1.3 Corrections Ciblées avec Localisation

**Efficace** :
```
Les 5 blocs supérieurs de metrics ne sont pas responsives. 
Si SmartPhone, les empiler les uns sous les autres.
```
**Pourquoi** : Problème localisé, solution attendue claire.

### 1.4 Lettres pour les Options

**Efficace** :
```
Propose moi des options avec une lettre :
A) Corriger le test
B) Supprimer le test
C) Refactoriser le composant
```
**Pourquoi** : Réponse rapide avec "A", "B" ou "C".

---

## 2. Pièges à Éviter ❌

### 2.1 Ambiguïté Terminologique

**Problématique** :
```
L'info bulle est sous les icônes
```
**Confusion** : Position verticale (Y) ou z-index (couches) ?

**Mieux** :
```
L'info bulle est sous les icônes EN TERMES DE Z-INDEX (couches), 
pas en position verticale
```

### 2.2 Scope Implicite

**Problématique** :
```
Sur le metric 'Complexité cyclomatique' ajoute une info bulle
```
**Confusion** : Juste cette métrique ou les 19 ?

**Mieux** :
```
Sur TOUTES les 19 métriques de la page, ajoute une info bulle 
avec le contenu approprié
```

### 2.3 Critères de Qualité Non Définis

**Problématique** :
```
C'est illisible. Vas tu pouvoir corriger ?
```
**Confusion** : Qu'est-ce qui est lisible pour vous ?

**Mieux** :
```
Le fichier est illisible. Je veux un format chronologique :
- Une demande de ma part
- L'image illustrative juste au dessus ou en dessous
- Un résumé de ta réponse
Format factuel, pas de titres excessifs
```

### 2.4 Stratégie de Correction Non Précisée

**Problématique** :
```
Le fichier contient un titre H2. Les fichiers MD doivent commencer au H3.
```
**Confusion** : Remplacer tous les H2 ? Dans quel ordre ?

**Mieux** :
```
Corrige en remontant progressivement depuis le bas :
1. H6 → H5
2. H5 → H4
3. H4 → H3
4. Garde les 3 H2 originaux (lignes 231, 389, 471) en H3
```

### 2.5 Contexte Manquant

**Problématique** :
```
Les images n'apparaissent pas
```
**Manque** : Le dossier images a été déplacé.

**Mieux** :
```
Les images n'apparaissent pas.
Contexte : Le dossier images a été déplacé de 
'data/A propos de ce site/images/' vers 'data/images/' à la racine.
```

---

## 3. Formats Recommandés

### 3.1 Correction Technique

```
Dans [fichier], [problème identifié].
[Explication de la cause si connue].
Solution attendue : [description claire].
```

**Exemple** :
```
Dans 'content-styles.css', les boutons débordent de leur conteneur.
Solution attendue : Ajouter max-width: 100% et box-sizing: border-box.
```

### 3.2 Nouvelle Fonctionnalité

```
[Contexte : où, quand, pourquoi]
[Action souhaitée]
[Comportement attendu avec exemples]
[Contraintes ou exceptions]
```

**Exemple** :
```
Contexte : Page plan-du-site, besoin d'organiser visuellement.
Action : Grouper les pages par zones (HomePage, Profils, Autres, Footer).
Comportement :
- Ligne 1 : HomePage (centré)
- Ligne 2 : Profils (tous côte à côte)
- Ligne 3 gauche : Autres (colonne)
- Ligne 3 droite : Footer (colonne)
Contrainte : Boutons de 270x60px, centrés dans leur zone.
```

### 3.3 Demande Multi-étapes

```
Plusieurs actions à faire :
1. [Première action]
2. [Deuxième action]
3. [Troisième action]
Fais-les dans cet ordre et valide chaque étape.
```

### 3.4 Bug à Investiguer

```
Symptôme : [ce qui se passe]
Attendu : [ce qui devrait se passer]
Contexte : [changements récents, fichiers concernés]
Pistes : [hypothèses si vous en avez]
```

---

## 4. Commandes Rapides

| Commande | Signification |
|----------|---------------|
| `GO US` | Lancer une nouvelle User Story |
| `GO NEXT` | Passer à l'étape suivante (revue Lead Dev) |
| `A` | Approuver l'action proposée |
| `B` | Demander plus d'explications |
| `0` | Passer/Ignorer cette action |
| `C puis A` | Commit d'abord, puis faire l'action |

---

## 5. Checklist Avant d'Envoyer

Avant d'envoyer un prompt, vérifiez :

- [ ] **Action claire** : Qu'est-ce que je veux exactement ?
- [ ] **Scope défini** : Un seul élément ou tous ?
- [ ] **Contexte fourni** : Y a-t-il des changements récents à mentionner ?
- [ ] **Critères précisés** : Comment juger que c'est bon ?
- [ ] **Termes désambiguïsés** : Les mots techniques ont-ils plusieurs sens ?
- [ ] **Stratégie indiquée** : Comment procéder (ordre, méthode) ?
- [ ] **Exemple fourni** : Format attendu montré ?

---

## 6. Économiser des Tokens

### 6.1 Éviter les Allers-Retours

**Coûteux** :
```
Prompt 1: "Corrige le problème"
IA: "Quel problème ?"
Prompt 2: "L'info bulle"
IA: "Quelle info bulle ?"
Prompt 3: "Celle de Complexité"
```

**Économique** :
```
Corrige l'info bulle "Complexité Cyclomatique" qui ne flotte pas au-dessus 
des cartes bleues (problème de z-index, pas de position verticale).
```

### 6.2 Grouper les Demandes Liées

**Coûteux** : 5 prompts pour 5 corrections CSS indépendantes.

**Économique** :
```
5 corrections CSS à faire :
1. Bouton trop large → max-width: 270px
2. Texte sur 2 lignes → white-space: nowrap
3. Pas de rollover → :hover { background: var(--BleuClair) }
4. Titre en noir → color: var(--BleuFonce)
5. Marge droite → padding-right: 0
```

### 6.3 Donner le Contexte une Fois

**Coûteux** : Répéter le contexte à chaque prompt.

**Économique** : 
```
Contexte pour cette session : 
- On travaille sur la page Metrics
- Les tooltips utilisent React Portal
- Le thème des boutons est "Fond BleuFoncé / Texte blanc"
---
[Puis vos demandes sans répéter le contexte]
```

### 6.4 Utiliser les Références

**Coûteux** : Redonner tout le contenu d'un fichier.

**Économique** :
```
Dans le fichier qu'on vient de créer (_site-identity.json), 
ajoute le champ "phone".
```

---

## 7. Quand l'IA Se Trompe

### 7.1 Feedback Constructif

**Peu efficace** :
```
Tu fais n'importe quoi !
```

**Efficace** :
```
C'est quoi cette stratégie ? Si tu corriges d'abord les H2 en H3, 
comment vas-tu corriger les H3 en H4 ? Il faut commencer par le niveau le plus bas.
```

### 7.2 Réorienter vers la Documentation

**Peu efficace** :
```
Tu aurais dû savoir que le hook pre-commit régénère automatiquement
```

**Efficace** :
```
Ce que tu viens de faire manuellement aurait dû être fait par le TI.
Va lire le fichier 'data/journaux/4. Architecture/Pre-commit hooks...' 
pour comprendre la stratégie automatique.
```

### 7.3 Demander une Analyse Systémique

**Quand** : Après plusieurs corrections inefficaces.

**Comment** :
```
Prend de la hauteur. Oublie tout et repars des fondamentaux.
N'essaie pas d'appliquer un correctif mais fais une analyse 
plus systémique de la construction de la page et du CSS associé.
```

---

## 8. Les 3 Règles d'Or

### 1. Spécificité > Généralité
- Préciser plutôt que généraliser
- Montrer plutôt que décrire
- Exemple plutôt qu'abstraction

### 2. Contexte > Assumptions
- Mentionner les changements récents
- Fournir les informations contextuelles
- Diriger vers la documentation si nécessaire

### 3. Structure > Flux de conscience
- Lister les actions
- Ordonner les étapes
- Définir les critères de succès

---

*Ce guide est basé sur l'analyse de notre historique de collaboration, notamment la "bataille des tooltips" qui illustre parfaitement les patterns de friction et d'efficacité.*
