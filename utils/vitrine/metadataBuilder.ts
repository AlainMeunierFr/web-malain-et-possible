/**
 * Backend pur : Génération des metadata Next.js à partir des JSON
 * Centralise la logique de création des balises meta SEO
 */

import type { Metadata } from 'next';
import { readPageData, type PageMetadata } from './pageReader';

const BASE_URL = 'https://web-malain-et-possible.vercel.app';
const SITE_NAME = 'Malain et possible';
const DEFAULT_LOCALE = 'fr_FR';

/**
 * Génère les metadata Next.js à partir d'un fichier JSON de page
 * @param filename Nom du fichier JSON (ex: 'index.json', 'mes-profils.json')
 * @param url URL relative de la page (ex: '/', '/mes-profils')
 */
export function buildPageMetadata(filename: string, url: string): Metadata {
  const pageData = readPageData(filename);
  const meta = pageData.metadata;

  // Fallback si pas de metadata dans le JSON
  if (!meta) {
    return {
      title: SITE_NAME,
      description: 'Conduite du changement, transformation, coaching agile.',
    };
  }

  const fullUrl = url === '/' ? BASE_URL : `${BASE_URL}${url}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: fullUrl,
      siteName: SITE_NAME,
      locale: DEFAULT_LOCALE,
      type: meta.ogType || 'website',
    },
    twitter: {
      card: 'summary',
      title: meta.title,
      description: meta.description,
    },
  };
}

/**
 * Génère les metadata Next.js pour une page de profil dynamique
 * @param slug Slug du profil (ex: 'cpo', 'coo', 'agile', 'cto')
 */
export function buildProfilMetadata(slug: string): Metadata {
  const filename = `profil-${slug}.json`;
  const url = `/profil/${slug}`;
  return buildPageMetadata(filename, url);
}
