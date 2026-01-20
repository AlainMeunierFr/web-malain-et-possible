### Clarification : Utilité de l'utilitaire de génération pour le plan du site

#### Contexte

Avec les modifications apportées à US-3.10a, le **test d'intégration** met maintenant à jour automatiquement le JSON :
- ✅ Pages obsolètes → supprimées automatiquement
- ✅ Liens obsolètes → supprimés automatiquement  
- ✅ Nouvelles pages → ajoutées automatiquement
- ✅ Nouveaux liens → ajoutés automatiquement

#### Question

**À quoi sert "l'utilitaire de génération" mentionné dans les critères ?**

#### Analyse des besoins potentiels

##### Cas d'usage 1 : Initialisation initiale
**Besoin** : Créer le fichier JSON `data/site-map.json` la première fois (quand il n'existe pas encore)

**Solution actuelle** : Le test peut détecter l'absence du fichier et le créer automatiquement

**Question** : Est-ce que le test doit gérer ce cas, ou préférons-nous un utilitaire séparé ?

##### Cas d'usage 2 : Régénération complète (reset des emplacements)
**Besoin** : Effacer tous les emplacements (x, y) existants pour repartir de zéro pour le placement

**Solution actuelle** : Non couvert par le test (le test ne modifie que pages/liens, pas les emplacements)

**Question** : Est-ce utile ? Aura-t-on besoin de réinitialiser les emplacements ?

##### Cas d'usage 3 : Génération d'un JSON "propre" (sans emplacements)
**Besoin** : Générer un nouveau JSON avec toutes les pages/liens détectés mais sans emplacements existants

**Solution actuelle** : Le test conserve les emplacements existants quand il ajoute de nouvelles pages

**Question** : Est-ce utile de pouvoir régénérer sans conserver les anciens emplacements ?

##### Cas d'usage 4 : Script CLI manuel
**Besoin** : Pouvoir exécuter une commande manuelle (`npm run generate-sitemap`) pour régénérer le JSON

**Solution actuelle** : Non nécessaire si le test fait tout automatiquement

**Question** : Est-ce qu'on veut un script CLI séparé, ou le test suffit ?

#### Options proposées

##### Option A : Supprimer l'utilitaire de génération
**Si** : Le test gère tout (détection, mise à jour automatique, création initiale)

**Pros** :
- Plus simple, une seule source de vérité (le test)
- Moins de code à maintenir

**Cons** :
- Pas de moyen de régénérer manuellement sans exécuter le test

##### Option B : Utilitaire minimal pour l'initialisation
**Si** : On veut séparer l'initialisation (script CLI) de la validation (test)

**Pros** :
- Séparation claire des responsabilités
- Permet d'initialiser le JSON avant d'avoir des tests

**Cons** :
- Duplication potentielle de logique

##### Option C : Utilitaire complet pour régénération
**Si** : On veut pouvoir régénérer complètement (effacer emplacements, etc.)

**Pros** :
- Flexibilité maximale
- Permet de "reset" le JSON si besoin

**Cons** :
- Plus complexe
- Risque de conflit avec le test (qui met aussi à jour)

#### Recommandation

**Option A : Supprimer l'utilitaire** car :
1. Le test met déjà à jour automatiquement le JSON (pages/liens)
2. Le test peut créer le fichier initial s'il n'existe pas
3. Les emplacements (x, y) ne sont jamais modifiés automatiquement (seulement validés)
4. Plus simple = moins de maintenance

**Alternativement**, si on veut garder quelque chose :
- **Uniquement** pour l'initialisation initiale (première fois)
- Le test prend ensuite le relais pour toutes les mises à jour

#### Questions à trancher

1. **Le test doit-il créer le fichier JSON s'il n'existe pas ?** (Oui/Non)
2. **Aura-t-on besoin de régénérer les emplacements (x, y) ?** (Oui/Non)
3. **Veut-on un script CLI séparé ?** (Oui/Non)
4. **L'utilitaire est-il vraiment nécessaire ?** (Oui/Non - si Non, on le supprime)
