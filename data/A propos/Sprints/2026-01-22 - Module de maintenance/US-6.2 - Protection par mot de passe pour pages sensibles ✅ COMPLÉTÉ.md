# US-6.2 : Protection par mot de passe pour pages sensibles ✅ COMPLÉTÉ

## En tant que Product Owner

## Je souhaite Protéger certaines pages du site par un mot de passe

## Afin de Limiter l'accès aux fonctionnalités de maintenance et d'administration

# Critères d'acceptation

## CA1 - Modal de mot de passe : Composant `PasswordModal.tsx` qui affiche un modal de saisie de mot de passe
## CA2 - Vérification côté serveur : API `/api/verify-password` qui vérifie le mot de passe contre `data/motdepasse.json`
## CA3 - Contexte d'authentification : Contexte React `EditingContext.tsx` qui gère l'état d'authentification
## CA4 - Protection des routes : Les pages protégées redirigent vers la page d'accueil si l'utilisateur n'est pas authentifié
## CA5 - Sécurité : Le mot de passe est vérifié côté serveur, jamais côté client
## CA6 - Styles : Fichier `PasswordModal.module.css` avec styles cohérents avec le reste du site
## CA7 - Expérience utilisateur
- Affichage d'un message d'erreur en cas de mot de passe incorrect
- Indicateur de chargement pendant la vérification
- Fermeture du modal après authentification réussie
## CA8 - Utilitaires : Fonction `utils/passwordUtils.ts` pour la gestion du mot de passe (hachage, vérification)