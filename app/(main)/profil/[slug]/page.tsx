import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { readPageData, buildProfilMetadata, buildProfilPageJsonLd } from '../../../../utils/server';
import PageContentRenderer from '../../../../components/PageContentRenderer';
import JsonLd from '../../../../components/JsonLd';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const validSlugs = ['cpo', 'coo', 'agile', 'cto'];
  
  if (!validSlugs.includes(slug)) {
    return { title: 'Profil introuvable' };
  }
  
  return buildProfilMetadata(slug);
}

/**
 * Page de profil dynamique
 * Server Component : Charge le JSON depuis le backend pur et affiche le contenu de la page
 *
 * Routes supportées :
 * - /profil/cpo -> profil-cpo.json
 * - /profil/coo -> profil-coo.json
 * - /profil/agile -> profil-agile.json
 * - /profil/cto -> profil-cto.json
 */
export default async function ProfilPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const validSlugs = ['cpo', 'coo', 'agile', 'cto'];
  if (!validSlugs.includes(slug)) {
    notFound();
  }

  const filename = `profil-${slug}.json`;

  // Lecture des données en dehors du JSX
  let pageData;
  try {
    pageData = readPageData(filename);
  } catch (error) {
    console.error(`Erreur lors de la lecture de ${filename}:`, error);
    notFound();
  }

  if (!pageData || !pageData.contenu || pageData.contenu.length === 0) {
    console.error(`Page data vide pour ${filename}:`, pageData);
    notFound();
  }

  // Mapping slug → titre pour le fil d'Ariane
  const titresParSlug: Record<string, string> = {
    cpo: 'Produit logiciel',
    coo: 'Opérations',
    agile: 'Transformation Agile',
    cto: 'Technologie',
  };

  return (
    <>
      <JsonLd data={buildProfilPageJsonLd(titresParSlug[slug] || slug, slug)} />
      <main className="main-cont">
        <PageContentRenderer contenu={pageData.contenu} />
      </main>
    </>
  );
}
