## US-3.8a : Création du type de contenu "témoignage"
- Tests unitaires pour le composant `Temoignages`
- Tests pour la lecture du JSON avec type "temoignages"

## US-3.8b : Création du type de contenu "portfolio détournements"
- Tests unitaires pour le composant `VideoDetournement`
- Tests pour la lecture du JSON avec type "videoDetournement"
- Test d'intégration pour vérifier la conformité de tous les JSON avec les types de contenu connus.


## US-3.10 : Création de la page "Plan du site"
**Statut** : ❌ Non commencée

- ❌ Fichier JSON décrivant le plan du site
- ❌ Objets de type "Page" avec titre et URL
- ❌ Objets de type "Lien" avec page source et destination
- ❌ Test d'intégration vérifiant toutes les pages listées
- ❌ Test d'intégration vérifiant tous les liens entre pages
- ❌ Visualisation SVG avec rectangles et flèches
- ❌ Rectangles cliquables vers pages correspondantes
- ❌ Bibliothèque SVG explorée et choisie
- ❌ Solution de placement des rectangles arbitrée

**Note** : Page `/site-map` existe mais n'affiche qu'un titre, toute l'implémentation reste à faire

# Résumé des critères à vérifier/abandonner

## Critères probablement à abandonner (non critiques)

1. **US-3.8a - Tests** :
   - Tests unitaires pour composant `Temoignages` : Non critique si satisfaction fonctionnelle
   - Tests lecture JSON "temoignages" : Non critique si satisfaction fonctionnelle

2. **US-3.8b - Tests** :
   - Tests unitaires pour composant `VideoDetournement` : Non critique si satisfaction fonctionnelle
   - Tests lecture JSON "videoDetournement" : Non critique si satisfaction fonctionnelle

3. **US-3.8b - Structure initiale** :
   - Structure avec `image`, `videoUrl` mentionnée dans critères initiaux : Déjà abandonnée au profit de structure finale
   - Grille responsive et effet hover : Déjà abandonnés au profit de structure avec 2 vidéos

4. **US-3.9 - Redirections 301** :
   - Redirections pour routes renommées : Abandonné car en pré-prod (décision utilisateur)

5. **US-3.9 - Pages "En construction"** :
   - Pages "En construction" avec message : Modifié en pages avec titre uniquement (meilleure solution)

## Critères méritant attention (à confirmer)

1. **US-3.9 - Vérification HTTP 301** :
   - Une seule redirection 301 en place (`/a-propos` → `/`)
   - À vérifier si test HTTP 301 nécessaire ou si satisfaction suffisante

2. **US-3.1 - Données mockup** :
   - Critère mentionne "données mockup réalistes mais factices"
   - Actuellement données réelles de l'ancien site
   - À confirmer si critère à abandonner ou si référence historique

3. **US-3.10 - Plan du site** :
   - **Tous les critères non implémentés** : US complète à faire si souhaitée

# Recommandation

**À abandonner définitivement** :
- Tests manquants US-3.8a et US-3.8b (si satisfaction fonctionnelle)
- Critères de structure initiale US-3.8b (déjà remplacés par structure finale)
- Redirections 301 pour routes renommées (décision pré-prod)

**À confirmer avec l'utilisateur** :
- Tests manquants : nécessaires ou pas ?
- Vérification HTTP 301 : nécessaire ou satisfaction actuelle suffisante ?
- US-3.10 : à implémenter ou à reporter au prochain sprint ?

**Note finale** : Le sprint est fonctionnellement complet sauf US-3.10. Les critères non implémentés sont principalement des tests (non critiques si satisfaction) et la page Plan du site (US dédiée).
