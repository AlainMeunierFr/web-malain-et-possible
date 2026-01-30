# US-3.12 : Composant ListeDesPages pour affichage du plan du site ✅ COMPLÉTÉ

- **En tant que** Visiteur du site
- **Je souhaite** Voir une liste structurée de toutes les pages disponibles sur le site
- **Afin de** Naviguer facilement et découvrir tout le contenu disponible

- **Critères d'acceptation** :
- **Nouveau composant** : Création du composant `ListeDesPages.tsx` qui affiche la liste des pages depuis `Pages-Et-Lien.json`
- **Filtrage** : Seules les pages avec `dessiner="Oui"` sont affichées
- **Tri** : Les pages sont triées par `numero` (si présent), sinon par ordre alphabétique du titre
- **API** : Endpoint `/api/site-map` qui retourne le plan du site au format JSON
- **Génération automatique** : Endpoint `/api/site-map/generate` pour régénérer le plan du site
- **Renommage** : Le fichier `plan-du-site.json` est renommé en `Pages-Et-Lien.json` pour plus de clarté
- **Page dédiée** : Route `/plan-du-site` qui affiche le composant `ListeDesPages`
- **Responsive** : Le composant s'adapte aux différentes tailles d'écran
- **Styles CSS** : Fichier `ListeDesPages.module.css` avec styles cohérents avec le reste du site