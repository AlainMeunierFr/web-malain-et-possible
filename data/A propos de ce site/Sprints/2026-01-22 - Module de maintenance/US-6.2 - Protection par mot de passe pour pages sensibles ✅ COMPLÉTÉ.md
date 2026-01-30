# US-6.2 : Protection par mot de passe pour pages sensibles ✅ COMPLÉTÉ

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