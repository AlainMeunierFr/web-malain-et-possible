/**
 * Génère les données structurées JSON-LD pour le SEO.
 * Schémas Schema.org : Person, WebSite, BreadcrumbList
 * 
 * Les données sont lues depuis data/_site-identity.json (CMS)
 */

import fs from 'fs';
import path from 'path';

interface SiteIdentity {
  person: {
    name: string;
    jobTitle: string;
    description: string;
    knowsAbout: string[];
    sameAs: string[];
  };
  website: {
    name: string;
    url: string;
    description: string;
    language: string;
  };
}

/**
 * Lit les données d'identité du site depuis le fichier CMS
 */
const readSiteIdentity = (): SiteIdentity => {
  const filePath = path.join(process.cwd(), 'data', '_site-identity.json');
  const content = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(content);
};

/**
 * Schéma Person pour l'auteur du site
 */
export const buildPersonJsonLd = () => {
  const identity = readSiteIdentity();
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: identity.person.name,
    url: identity.website.url,
    jobTitle: identity.person.jobTitle,
    description: identity.person.description,
    knowsAbout: identity.person.knowsAbout,
    sameAs: identity.person.sameAs,
  };
};

/**
 * Schéma WebSite pour le site
 */
export const buildWebSiteJsonLd = () => {
  const identity = readSiteIdentity();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: identity.website.name,
    url: identity.website.url,
    description: identity.website.description,
    author: {
      '@type': 'Person',
      name: identity.person.name,
    },
    inLanguage: identity.website.language,
  };
};

/**
 * Schéma BreadcrumbList pour le fil d'Ariane
 * @param items Liste des éléments du fil d'Ariane [{name, url}]
 */
export const buildBreadcrumbJsonLd = (items: Array<{ name: string; url: string }>) => {
  const identity = readSiteIdentity();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${identity.website.url}${item.url}`,
    })),
  };
};

/**
 * Génère le JSON-LD complet pour la page d'accueil
 */
export const buildHomePageJsonLd = () => [
  buildPersonJsonLd(),
  buildWebSiteJsonLd(),
];

/**
 * Génère le JSON-LD pour une page de profil
 * @param profilTitre Titre du profil (ex: "Produit logiciel")
 * @param profilSlug Slug du profil (ex: "cpo")
 */
export const buildProfilPageJsonLd = (profilTitre: string, profilSlug: string) => [
  buildBreadcrumbJsonLd([
    { name: 'Accueil', url: '/' },
    { name: 'Mes profils', url: '/mes-profils' },
    { name: profilTitre, url: `/profil/${profilSlug}` },
  ]),
];

/**
 * Génère le JSON-LD pour une page standard avec fil d'Ariane
 * @param pageName Nom de la page
 * @param pageUrl URL de la page
 */
export const buildStandardPageJsonLd = (pageName: string, pageUrl: string) => [
  buildBreadcrumbJsonLd([
    { name: 'Accueil', url: '/' },
    { name: pageName, url: pageUrl },
  ]),
];
