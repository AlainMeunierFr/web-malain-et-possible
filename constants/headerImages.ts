/**
 * Configuration des images du Header
 * Séparée du composant pour respecter la séparation des préoccupations
 */

import { getStaticImagePath } from '../utils';

export const HEADER_IMAGES = {
  logo: {
    src: getStaticImagePath('Logo.png'),
    alt: 'Logo Malain et possible',
    title: 'Accueil',
    width: 150,
    height: 150,
  },
  photo: {
    src: getStaticImagePath('Photo.png'),
    alt: 'Photo Alain Meunier',
    title: 'À propos de moi',
    width: 150,
    height: 150,
  },
} as const;
