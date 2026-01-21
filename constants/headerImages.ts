/**
 * Configuration des images du Header
 * Séparée du composant pour respecter la séparation des préoccupations
 */

export const HEADER_IMAGES = {
  logo: {
    src: '/images/Logo.png',
    alt: 'Logo Malain et possible',
    title: 'Accueil',
    width: 150,
    height: 150,
  },
  photo: {
    src: '/images/Photo.png',
    alt: 'Photo Alain Meunier',
    title: 'À propos de moi',
    width: 150,
    height: 150,
  },
} as const;
