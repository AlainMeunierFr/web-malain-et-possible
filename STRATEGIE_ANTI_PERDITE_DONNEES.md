# Stratégies pour éviter la perte de données lors d'un "Undo All"

## Problème rencontré

Un "Undo All" dans Cursor a supprimé tout le travail de la matinée (journal `2026-01-19.md` et modifications non committées).

## Stratégies préventives

### 1. **Commits Git fréquents** (RECOMMANDÉ)

**Principe** : Commit régulièrement après chaque tâche terminée, même si elle n'est pas parfaite.

**Avantages** :
- L'historique Git permet de récupérer les modifications perdues
- Possibilité de revenir à une version antérieure
- Traçabilité complète du travail

**Actions** :
```bash
# Après chaque tâche terminée
git add .
git commit -m "feat: description de la tâche"
```

**Règle DOD** : Ajouter une règle dans la DOD : "Commit Git après chaque tâche terminée ou changement significatif"

### 2. **Branches Git pour chaque session**

**Principe** : Créer une branche pour chaque session de travail.

**Avantages** :
- Isolation des modifications
- Possibilité de revenir à la branche principale
- Historique clair par session

**Actions** :
```bash
# Au début de chaque session
git checkout -b session-2026-01-19
# Travail...
# À la fin de la session ou avant undo
git add .
git commit -m "WIP: travail en cours"
# Si undo accidentel
git checkout session-2026-01-19
```

### 3. **Stash Git avant undo**

**Principe** : Utiliser `git stash` pour sauvegarder les modifications avant tout undo.

**Avantages** :
- Sauvegarde rapide sans commit
- Récupération immédiate avec `git stash pop`

**Actions** :
```bash
# Avant undo
git stash push -m "Sauvegarde avant undo"
# Si perte
git stash pop
```

### 4. **Journal dans un fichier séparé et auto-sauvegarde**

**Principe** : Le journal est toujours créé/mis à jour immédiatement et committé.

**Actions** :
- Créer le journal au début de la session
- Commit immédiat après création
- Mettre à jour régulièrement et commit après chaque mise à jour importante

### 5. **Utilisation de l'historique Cursor**

**Principe** : Cursor garde un historique local des fichiers (mais limité).

**Limites** :
- L'historique local peut être perdu
- Non fiable pour récupération longue

## Stratégie recommandée pour ce projet

### Combinaison des stratégies 1, 2 et 4 :

1. **Au début de chaque session** :
   - Créer une branche Git : `git checkout -b session-YYYY-MM-DD`
   - Créer le journal du jour
   - Commit immédiat : `git commit -m "docs: création journal YYYY-MM-DD"`

2. **Pendant la session** :
   - Commit après chaque tâche terminée
   - Mettre à jour le journal et commit régulièrement

3. **Avant tout undo important** :
   - `git stash push -m "Sauvegarde avant undo"`
   - OU commit de travail en cours : `git commit -m "WIP: travail en cours"`

4. **En cas de perte** :
   ```bash
   # Récupérer depuis Git
   git reflog  # Voir l'historique
   git checkout <commit-hash>  # Revenir à un commit
   # OU depuis stash
   git stash list
   git stash apply <stash-index>
   ```

## Ajout à la DOD

**Règle à ajouter dans "1. Règles générales.md"** :

### Gestion Git et sauvegarde
- Commit Git après chaque tâche terminée ou changement significatif
- Le journal doit être committé immédiatement après création
- Utiliser des branches Git pour les sessions de travail importantes
- En cas de doute avant un undo, faire `git stash` ou un commit WIP

## Leçon apprise

**Cause** : Modifications non committées + "Undo All" = perte de données

**Solution** : Git comme sauvegarde systématique, pas seulement pour la collaboration.
