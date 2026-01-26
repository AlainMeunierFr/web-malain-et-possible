# Sprint Goal
Mettre en place un système de protection par mot de passe et une page de maintenance pour sécuriser l'accès aux fonctionnalités d'administration et de maintenance du site.

---

## US-6.2 : Protection par mot de passe pour pages sensibles ✅ COMPLÉTÉ

- **En tant que** Product Owner
- **Je souhaite** Protéger certaines pages du site par un mot de passe
- **Afin de** Limiter l'accès aux fonctionnalités de maintenance et d'administration

- **Critères d'acceptation** :
- **Modal de mot de passe** : Composant `PasswordModal.tsx` qui affiche un modal de saisie de mot de passe
- **Vérification côté serveur** : API `/api/verify-password` qui vérifie le mot de passe contre `data/motdepasse.json`
- **Contexte d'authentification** : Contexte React `EditingContext.tsx` qui gère l'état d'authentification
- **Protection des routes** : Les pages protégées redirigent vers la page d'accueil si l'utilisateur n'est pas authentifié
- **Sécurité** : Le mot de passe est vérifié côté serveur, jamais côté client
- **Styles** : Fichier `PasswordModal.module.css` avec styles cohérents avec le reste du site
- **Expérience utilisateur** : 
  - Affichage d'un message d'erreur en cas de mot de passe incorrect
  - Indicateur de chargement pendant la vérification
  - Fermeture du modal après authentification réussie
- **Utilitaires** : Fonction `utils/passwordUtils.ts` pour la gestion du mot de passe (hachage, vérification)

## US-6.3 : Page de maintenance ✅ COMPLÉTÉ

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

## US-6.4 : Cadeau pour les curieux ✅ COMPLÉTÉ

- **En tant que** Visiteur curieux
- **Je souhaite** Découvrir un message caché sur la page de maintenance après avoir trouvé le mot de passe
- **Afin de** Recevoir une récompense pour ma curiosité

- **Critères d'acceptation** :
- **Mot de passe** : Le mot de passe "OeufDePaques" est calculé en MD5 et stocké dans `data/motdepasse.json`
- **Message de félicitation** : Affichage d'un message centré sur la page de maintenance :
  - "Bravo ! Tu as été curieux en lisant la fameuse User Storie qui donne le mot de passe pour arriver ici.
  Clique sur le bouton "Faisons connaissance" car tu viens (on se tutoie du coup...) de gagner un restaurant près de Lyon avec moi !!"
- **Mise en page** : Design sympa et centré avec une icône d'oeuf de Pâques
- **Bouton** : Bouton vers la page "Faisons connaissance" (`/faisons-connaissance`)
- **Styles** : Mise en page attrayante et cohérente avec le reste du site
