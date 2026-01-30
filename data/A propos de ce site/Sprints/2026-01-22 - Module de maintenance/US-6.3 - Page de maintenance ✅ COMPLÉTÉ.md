# US-6.3 : Page de maintenance ✅ COMPLÉTÉ

- **En tant que** Product Owner
- **Je souhaite** Avoir une page de maintenance accessible uniquement aux utilisateurs authentifiés
- **Afin de** Effectuer des opérations de maintenance et d'administration sur le site

- **Critères d'acceptation** :
- **Page dédiée** : Route `/maintenance` avec composant `app/maintenance/page.tsx`
- **Protection par authentification** : La page vérifie l'authentification via `EditingContext` et redirige vers `/` si non authentifié
- **Styles** : Fichier `maintenance.module.css` avec styles cohérents avec le reste du site
- **Structure** : 
  - Header avec titre "Maintenance"
  - Zone de contenu pour les fonctionnalités de maintenance (à implémenter ultérieurement)
- **Client Component** : Composant marqué `'use client'` pour gérer l'authentification côté client
- **Redirection automatique** : Utilisation de `useRouter` pour rediriger automatiquement si non authentifié
- **Note** : Cette page est un placeholder pour les futures fonctionnalités de maintenance