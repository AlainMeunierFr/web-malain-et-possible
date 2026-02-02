/**
 * Rendu « mode lecture » : 4 colonnes (type, nom canonique, parent, contenu).
 * Vue client : seulement parent + contenu ; option pour afficher les colonnes d’audit (type, nom canonique).
 */

'use client';

import React, { useState, useEffect, useRef, useLayoutEffect, useId } from 'react';
import type { ElementContenu } from '../utils/indexReader';
import {
  getSpecEntriesForType,
  getRepeaterSpec,
  getPageContainerSpecEntries,
  getContainerParentMap,
  isContainerType,
  typeHierarchiqueToDisplay,
  getValueForNomCanonique,
  isMarkdownContent,
} from '../constants/canonicalSpec';
import SimpleMarkdownRenderer from './SimpleMarkdownRenderer';
import { getJsonImagePath } from '../utils/imagePath';

export interface ModeLecturePage {
  pageTitle: string;
  contenu: ElementContenu[];
}

/** Page du plan du site (pour liste des pages). */
export interface SiteMapPageItem {
  url: string;
  titre: string;
  zone?: string;
  dessiner?: string;
}

export interface ModeLectureRendererProps {
  pages: ModeLecturePage[];
  /** Liste des pages du plan du site (fournie par le serveur pour affichage immédiat). */
  siteMapPages?: SiteMapPageItem[];
}

/** Ligne 4 colonnes : type, nom canonique, parent (résolu depuis le DOM pour debug), contenu */
function Row({
  displayType,
  nomCanonique,
  content,
  dataSemantic,
}: {
  displayType: string;
  nomCanonique: string;
  content: React.ReactNode;
  dataSemantic: string;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [containerPereFromDom, setContainerPereFromDom] = useState<string | null>(null);

  useLayoutEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const wrapper = el.parentElement?.closest('[data-container-id]');
    const id = wrapper?.getAttribute('data-container-id') ?? null;
    setContainerPereFromDom(id);
  }, []);

  return (
    <div ref={rowRef} className="mode-lecture-row" data-semantic={dataSemantic}>
      <div className="mode-lecture-col-type" aria-hidden>{displayType}</div>
      <div className="mode-lecture-col-canonical" aria-hidden>{nomCanonique}</div>
      <div className="mode-lecture-col-container-pere" aria-hidden>{containerPereFromDom ?? '—'}</div>
      <div className="mode-lecture-col-content" data-semantic={dataSemantic}>
        {content}
      </div>
    </div>
  );
}

/** Fallback quand le type n'a pas d'entrées dans la spec ni dans REPEATER_SPEC */
const FALLBACK_SEMANTIC: Record<string, string> = {
  video: 'p',
};

/** Container qui enveloppe les enfants (pour la colonne container père). Aligné sur la spec .cont. */
const CONTAINER_FOR_CHILDREN: Record<string, string> = {
  hero: 'hero.gauche.cont',
  listeDeProfils: 'listeDeProfils.cont',
  listeDeTemoignages: 'listeDeTemoignages.cont',
  domaineDeCompetence: 'domaineDeCompetence.cont',
  competence: 'competence.cont',
  listeDesExperiencesEtApprentissage: 'listeDesExperiencesEtApprentissages.cont',
  listeDeDetournementsVideo: 'listeDeDetournementsVideo.cont',
  groupeDeBoutons: 'groupeDeBoutons.cont',
  listeDesPages: 'listeDesPages.cont',
};

/** Liste des pages en mode lecture : source = bloc listeDesPages du JSON (plan-du-site.json) ; secours = prop ou /api/site-map. */
function ListeDesPagesItems({
  RowComponent,
  pagesFromJson,
  siteMapPagesFallback,
}: {
  RowComponent: typeof Row;
  /** Données du bloc listeDesPages (plan-du-site.json) — source de vérité. */
  pagesFromJson?: { url: string; titre: string }[];
  /** Secours si pagesFromJson absent (ex. avant exécution du script update-site-map). */
  siteMapPagesFallback?: SiteMapPageItem[];
}) {
  const [fetchedPages, setFetchedPages] = useState<SiteMapPageItem[]>([]);
  const pages =
    pagesFromJson && pagesFromJson.length > 0
      ? pagesFromJson
      : (siteMapPagesFallback && siteMapPagesFallback.length > 0 ? siteMapPagesFallback : fetchedPages);

  useEffect(() => {
    if (pagesFromJson?.length ?? siteMapPagesFallback?.length) return;
    fetch('/api/site-map')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('site-map'))))
      .then((data: { pages?: SiteMapPageItem[] }) => {
        const raw = data.pages ?? [];
        const filtered = raw.filter(
          (p) => p.zone !== 'Masqué' && p.dessiner !== 'Non'
        );
        setFetchedPages(filtered);
      })
      .catch(() => setFetchedPages([]));
  }, [pagesFromJson?.length, siteMapPagesFallback?.length]);

  return (
    <>
      {pages.map((p, i) => (
        <RowComponent
          key={p.url || i}
          displayType="li"
          nomCanonique="listeDesPages.page"
          dataSemantic="li"
          content={<div className="mode-lecture-text">{p.titre}</div>}
        />
      ))}
    </>
  );
}

function getChildren(el: ElementContenu): ElementContenu[] {
  const anyEl = el as unknown as Record<string, unknown>;
  if (el.type === 'hero' && Array.isArray(anyEl.profils)) return anyEl.profils as ElementContenu[];
  if (el.type === 'domaineDeCompetence') {
    const items = Array.isArray(anyEl.items) ? (anyEl.items as ElementContenu[]) : [];
    const experiences = Array.isArray(anyEl.experiences) ? (anyEl.experiences as ElementContenu[]) : [];
    if (experiences.length > 0) {
      return [...items, { type: 'listeDesExperiencesEtApprentissage', experiences } as unknown as ElementContenu];
    }
    return [...items, ...experiences];
  }
  if (el.type === 'listeDesExperiencesEtApprentissage' && Array.isArray(anyEl.experiences)) {
    return anyEl.experiences as ElementContenu[];
  }
  if (el.type === 'listeDeProfils' && Array.isArray(anyEl.profils)) return anyEl.profils as ElementContenu[];
  if (el.type === 'listeDeTemoignages' && Array.isArray(anyEl.items)) return anyEl.items as ElementContenu[];
  if (el.type === 'listeDeDetournementsVideo' && Array.isArray(anyEl.items)) return anyEl.items as ElementContenu[];
  if (el.type === 'groupeDeBoutons' && Array.isArray(anyEl.boutons)) return anyEl.boutons as ElementContenu[];
  return [];
}

function getTextContentFallback(el: ElementContenu): string {
  const anyEl = el as unknown as Record<string, unknown>;
  if ('texte' in anyEl && typeof anyEl.texte === 'string') return anyEl.texte;
  if ('titre' in anyEl && typeof anyEl.titre === 'string') {
    const parts: string[] = [anyEl.titre];
    if ('sousTitre' in anyEl && typeof anyEl.sousTitre === 'string') parts.push(anyEl.sousTitre);
    if ('description' in anyEl && typeof anyEl.description === 'string') parts.push(anyEl.description);
    if ('contenu' in anyEl && typeof anyEl.contenu === 'string') parts.push(anyEl.contenu);
    return parts.join('\n');
  }
  const elType = el.type as string;
  if (elType === 'competence') return [(anyEl.titre as string), (anyEl.description as string)].filter(Boolean).join('\n');
  if (elType === 'experienceEtApprentissage') return [(anyEl.categorie as string), (anyEl.description as string)].filter(Boolean).join('\n');
  if (elType === 'temoignage') return [(anyEl.nom as string), (anyEl.fonction as string), (anyEl.temoignage as string)].filter(Boolean).join('\n');
  if (elType === 'detournementVideo') return [(anyEl.titre as string), (anyEl.titreVideoDetournee as string), (anyEl.titreVideoOriginale as string), (anyEl.pitch as string)].filter(Boolean).join('\n');
  if (elType === 'profil') return [(anyEl.titre as string), (anyEl.jobTitles as string[])?.join(', ')].filter(Boolean).join('\n');
  if (elType === 'callToAction') return (anyEl.action as string) ?? '';
  if (elType === 'bouton') return [(anyEl.texte as string), (anyEl.url as string)].filter(Boolean).join(' ');
  return '';
}

function isContainer(el: ElementContenu): boolean {
  return getChildren(el).length > 0;
}

/** Container père affiché : parent réel (arbre) ou boby.count si racine. */
function resolveContainerPere(containerType: string | null): string | null {
  if (containerType !== null) return containerType;
  return 'boby.count';
}

/** Chemin de containers à ouvrir pour aller de `from` à `to` (ex. boby.count → hero.gauche.cont = [hero.cont, hero.gauche.cont]). */
function getPathFrom(
  parentMap: Map<string, string | null>,
  from: string | null,
  to: string
): string[] {
  if (from === to) return [];
  const path: string[] = [];
  let cur: string | null = to;
  while (cur != null && cur !== from) {
    path.unshift(cur);
    cur = parentMap.get(cur) ?? null;
  }
  return cur === from ? path : [];
}

function Block({
  element,
  level,
  containerType,
  siteMapPages,
}: {
  element: ElementContenu;
  level: number;
  containerType: string | null;
  siteMapPages?: SiteMapPageItem[];
}) {
  const blockId = useId();
  const wrapperKeyRef = useRef(0);
  const anyEl = element as unknown as Record<string, unknown>;
  const specEntries = getSpecEntriesForType(element.type);
  const children = getChildren(element);
  const container = children.length > 0;
  // Répétiteurs (listeDesPages, listeDeTemoignages, etc.) : branche dédiée pour afficher le libellé + ListeDesPagesItems / enfants
  const repeaterSpec = getRepeaterSpec(element.type);
  if (repeaterSpec) {
    const repeaterSpecEntries = getSpecEntriesForType(element.type);
    const containerEntries = repeaterSpecEntries.filter((e) => isContainerType(e.typeHierarchique));
    const displayType = typeHierarchiqueToDisplay(repeaterSpec.typeHierarchique) ?? 'p';
    const lastContainerEntry = containerEntries.length > 0 ? containerEntries[containerEntries.length - 1] : null;
    const repeaterContainerCourant = lastContainerEntry ? (lastContainerEntry.containerLayout ?? lastContainerEntry.nomCanonique) : element.type;
    const containerRowContent = repeaterSpec.libelle;
    return (
      <>
        {containerEntries.map((entry) => (
          <Row
            key={entry.nomCanonique + (entry.containerLayout ?? '')}
            displayType="c"
            nomCanonique={entry.nomCanonique}
            dataSemantic="c"
            content={<div className="mode-lecture-text mode-lecture-cont">{containerRowContent}</div>}
          />
        ))}
        <Row
          displayType={displayType}
          nomCanonique={element.type}
          dataSemantic={displayType}
          content={<div className="mode-lecture-text">{repeaterSpec.libelle}</div>}
        />
        {element.type === 'listeDesPages' ? (
          <div data-container-id="listeDesPages">
            <ListeDesPagesItems
              RowComponent={Row}
              pagesFromJson={'pages' in element && Array.isArray(element.pages) ? element.pages : undefined}
              siteMapPagesFallback={siteMapPages}
            />
          </div>
        ) : (
          <div data-container-id={repeaterContainerCourant}>
            {children.map((child, i) => (
              <Block key={i} element={child} level={level + 1} containerType={repeaterContainerCourant} siteMapPages={siteMapPages} />
            ))}
          </div>
        )}
      </>
    );
  }

  if (specEntries.length > 0) {
    const parentMap = getContainerParentMap();
    const rootContainer = resolveContainerPere(containerType);
    type StackItem = { id: string | null; children: React.ReactNode[] };
    const root: StackItem = { id: null, children: [] };
    const stack: StackItem[] = [root];
    let lastContainerCourant: string | null = rootContainer;

    for (const entry of specEntries) {
      const displayType = typeHierarchiqueToDisplay(entry.typeHierarchique);
      if (displayType === null) continue;
      const targetParent = entry.containerParent ?? rootContainer ?? 'boby.count';

      // Fermer les wrappers jusqu'à être dans targetParent (clé unique pour éviter doublons entre blocs frères)
      while (stack.length > 1 && stack[stack.length - 1].id !== targetParent) {
        const closed = stack.pop()!;
        const wrapperKey = `${closed.id}-${blockId}-${wrapperKeyRef.current++}`;
        const wrapper = (
          <div key={wrapperKey} data-container-id={closed.id!}>
            {closed.children}
          </div>
        );
        stack[stack.length - 1].children.push(wrapper);
      }
      // Ouvrir le chemin vers targetParent si besoin
      const topId = stack[stack.length - 1].id ?? rootContainer;
      const path = getPathFrom(parentMap, topId, targetParent);
      for (const id of path) {
        stack.push({ id, children: [] });
      }

      const top = stack[stack.length - 1];

      if (isContainerType(entry.typeHierarchique)) {
        const containerCourant = entry.containerLayout ?? entry.nomCanonique;
        lastContainerCourant = containerCourant;
        top.children.push(
          <Row
            key={entry.nomCanonique + (entry.containerLayout ?? '')}
            displayType="c"
            nomCanonique={entry.nomCanonique}
            dataSemantic="c"
            content={<div className="mode-lecture-text mode-lecture-cont">{entry.nomCanonique}</div>}
          />
        );
        stack.push({ id: containerCourant, children: [] });
        continue;
      }

      let value = getValueForNomCanonique(anyEl, entry.nomCanonique);
      if (entry.nomCanonique === 'hero.video' && value === undefined) {
        const videoObj = anyEl.video as { urlYouTube?: string } | undefined;
        value = typeof videoObj === 'object' && videoObj?.urlYouTube ? videoObj.urlYouTube : undefined;
      }
      if (typeof value === 'object' && value !== null && 'urlYouTube' in (value as object)) {
        value = (value as { urlYouTube?: string }).urlYouTube ?? '';
      }
      if ((element.type as string) === 'experienceEtApprentissage' && entry.nomCanonique === 'experienceEtApprentissage.description') {
        const periode = String(anyEl.periode ?? '').trim();
        const desc = value ?? '';
        value = periode ? `- [${periode}] - ${desc}` : `- ${desc}`;
      }
      if (entry.nomCanonique === 'competence.bouton.action') {
        const texte = getValueForNomCanonique(anyEl, 'competence.bouton.texte') ?? '';
        const action = value ?? '';
        if (!texte && !action) continue;
        value = texte && action ? `${texte} (${action})` : texte || action;
      }
      if (entry.nomCanonique === 'hero.callToAction') {
        const texte = getValueForNomCanonique(anyEl, 'hero.callToAction.texte') ?? '';
        const action = getValueForNomCanonique(anyEl, 'hero.callToAction.action') ?? '';
        if (!texte && !action) continue;
        value = texte && action ? `${texte} (${action})` : texte || action;
      }
      if (entry.nomCanonique === 'bouton.command') {
        const texte = getValueForNomCanonique(anyEl, 'bouton.texte') ?? '';
        const url = getValueForNomCanonique(anyEl, 'bouton.url') ?? '';
        const command = value ?? '';
        if (!texte && !url && !command) continue;
        const target = command || url || '';
        value = texte && target ? `${texte} (${target})` : texte || target;
      }
      if (value === undefined || value === '' || value === '- ') continue;
      const isButtonOrLink =
        entry.nomCanonique === 'competence.bouton.action' ||
        entry.nomCanonique === 'hero.callToAction' ||
        entry.nomCanonique === 'bouton.command';
      const useMarkdown =
        displayType === 'p' || displayType === 'li' || isMarkdownContent(entry.nomCanonique);
      const contentNode =
        entry.nomCanonique === 'temoignage.photo' ? (
          <div className="mode-lecture-text">
            <img
              src={getJsonImagePath(value)}
              alt={getValueForNomCanonique(anyEl, 'temoignage.nom') ?? ''}
              className="mode-lecture-photo-40"
            />
          </div>
        ) : entry.nomCanonique === 'competence.image.src' ? (
          <div className="mode-lecture-text">
            <img src={getJsonImagePath(value)} alt="" className="mode-lecture-plan-image" />
          </div>
        ) : isButtonOrLink ? (
          <div className="mode-lecture-text">{value}</div>
        ) : useMarkdown ? (
          <div className="mode-lecture-text">
            <SimpleMarkdownRenderer content={value} />
          </div>
        ) : (
          <div className="mode-lecture-text">{value}</div>
        );
      top.children.push(
        <Row
          key={entry.nomCanonique}
          displayType={displayType}
          nomCanonique={entry.nomCanonique}
          dataSemantic={displayType}
          content={contentNode}
        />
      );
    }

    // Fermer tous les wrappers ouverts (clé unique pour éviter doublons entre blocs frères)
    while (stack.length > 1) {
      const closed = stack.pop()!;
      const wrapperKey = `${closed.id}-${blockId}-${wrapperKeyRef.current++}`;
      const wrapper = (
        <div key={wrapperKey} data-container-id={closed.id!}>
          {closed.children}
        </div>
      );
      stack[stack.length - 1].children.push(wrapper);
    }

    const containerForChildren = CONTAINER_FOR_CHILDREN[element.type] ?? lastContainerCourant ?? element.type;
    const childrenWrapperKey = `${containerForChildren}-${blockId}`;
    root.children.push(
      <div key={childrenWrapperKey} data-container-id={containerForChildren}>
        {children.map((child, i) => (
          <Block key={i} element={child} level={level + 1} containerType={containerForChildren} siteMapPages={siteMapPages} />
        ))}
      </div>
    );

    return <>{root.children}</>;
  }

  const fallbackSemantic = FALLBACK_SEMANTIC[element.type] ?? 'p';
  const text = getTextContentFallback(element);

  return (
    <>
      <Row
        displayType={fallbackSemantic}
        nomCanonique={element.type}
        dataSemantic={fallbackSemantic}
        content={
          <>
            {container ? <span className="container-flag">container</span> : null}
            {text ? <div className="mode-lecture-text">{text}</div> : null}
          </>
        }
      />
      {children.length > 0 ? (
        <div data-container-id={element.type}>
          {children.map((child, i) => (
            <Block key={i} element={child} level={level + 1} containerType={element.type} siteMapPages={siteMapPages} />
          ))}
        </div>
      ) : null}
    </>
  );
}

/** Émet les lignes des containers de page (boby.count) en tête de chaque page. */
function PageContainerRows({ RowComponent }: { RowComponent: typeof Row }) {
  const pageContainers = getPageContainerSpecEntries();
  if (pageContainers.length === 0) return null;
  return (
    <>
      {pageContainers.map((entry) => (
        <RowComponent
          key={entry.nomCanonique}
          displayType="c"
          nomCanonique={entry.nomCanonique}
          dataSemantic="c"
          content={<div className="mode-lecture-text mode-lecture-cont">{entry.nomCanonique}</div>}
        />
      ))}
    </>
  );
}

const ModeLectureRenderer: React.FC<ModeLectureRendererProps> = ({ pages, siteMapPages }) => {
  const [showAuditColumns, setShowAuditColumns] = useState(true);

  return (
    <div className={`mode-lecture${showAuditColumns ? '' : ' hide-audit'}`}>
      <div className="mode-lecture-toolbar">
        <button
          type="button"
          className="mode-lecture-toggle-audit"
          onClick={() => setShowAuditColumns((v) => !v)}
          aria-pressed={!showAuditColumns}
        >
          {showAuditColumns ? 'Masquer colonnes d\'audit (1–3)' : 'Afficher colonnes d\'audit'}
        </button>
      </div>
      {pages.map((page, pageIndex) => (
        <section key={pageIndex}>
          <hr className="mode-lecture-page-separator" aria-hidden />
          <div data-container-id="body">
            <PageContainerRows RowComponent={Row} />
            <div data-container-id="boby.count">
              {page.contenu.map((element, i) => (
                <Block key={i} element={element} level={0} containerType="boby.count" siteMapPages={siteMapPages} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ModeLectureRenderer;
