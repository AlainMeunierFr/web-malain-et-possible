/**
 * Générateur de la hiérarchie du site (ASCII) à partir de la spec canonique.
 * Produit la structure des pages (containers et propriétés), sans "page Row".
 */

import type { CanonicalSpecEntry } from '../../../constants/canonicalSpec';
import { CANONICAL_SPEC_ORDER, getSpecEntriesForType, REPEATER_SPEC } from '../../../constants/canonicalSpec';

/** Alias : type JSON → type spec (pour getSpecEntriesForType) */
const TYPE_TO_SPEC: Record<string, string> = {
  listeDesExperiencesEtApprentissage: 'listeDesExperiencesEtApprentissages',
};

/** Types enfants implicites : si la page a le parent, inclure aussi l'enfant pour la spec */
const IMPLIED_CHILD_TYPES: Record<string, string[]> = {
  listeDeProfils: ['profil'],
  listeDeTemoignages: ['temoignage'],
  domaineDeCompetence: ['competence'],
  listeDesExperiencesEtApprentissages: ['experienceEtApprentissage'],
  listeDeDetournementsVideo: ['detournementVideo'],
  groupeDeBoutons: ['bouton'],
};

/** Type racine (branche sous main-content-cont) pour tri selon l'ordre du contenu. */
const ROOT_TYPE_BY_PREFIX: Record<string, string> = {
  titreDePage: 'titreDePage',
  header: 'titreDePage',
  listeDesPages: 'listeDesPages',
  hero: 'hero',
  listeDeProfils: 'listeDeProfils',
  profil: 'listeDeProfils',
  titre: 'titre',
  video: 'video',
  listeDeTemoignages: 'listeDeTemoignages',
  temoignage: 'listeDeTemoignages',
  domaineDeCompetence: 'domaineDeCompetence',
  competence: 'domaineDeCompetence',
  listeDesExperiencesEtApprentissages: 'listeDesExperiencesEtApprentissages',
  experienceEtApprentissage: 'listeDesExperiencesEtApprentissages',
  texteLarge: 'texteLarge',
  callToAction: 'callToAction',
  groupeDeBoutons: 'groupeDeBoutons',
  bouton: 'groupeDeBoutons',
  listeDeDetournementsVideo: 'listeDeDetournementsVideo',
  detournementVideo: 'listeDeDetournementsVideo',
};

function getRootTypeForEntry(entry: CanonicalSpecEntry): string {
  const base = entry.nomCanonique.split('.')[0];
  return ROOT_TYPE_BY_PREFIX[base] ?? base;
}

/** Nœud container (dossier) avec enfants. */
export interface TreeContainer {
  type: 'container';
  id: string;
  label: string;
  children: TreeNode[];
  /** Attribut data-layout CSS (grilles, colonnes, etc.) */
  dataLayout?: string | null;
}

/** Nœud feuille (propriété). */
export interface TreeLeaf {
  type: 'leaf';
  label: string;
  /** Type hiérarchique (--h1, --h2, --p, --lk, etc.) */
  typeHierarchique?: string;
}

export type TreeNode = TreeContainer | TreeLeaf;

/** Annotation optionnelle pour un container (ex. "page" pour #main-content). */
const CONTAINER_ANNOTATIONS: Record<string, string> = {
  'main-content-cont': 'page',
};

/** Containers exclus du mode "containers only" : templates de répétition, pas des containers de layout. */
const CONTAINERS_ONLY_EXCLUDE = new Set(['listeDesPages.page.cont']);

/** Libellé affiché pour un container : #main-content (DOM), ou on retire .cont (hero.cont → hero). */
function displayLabel(idOrLabel: string): string {
  if (idOrLabel === 'main-content-cont') return '.main-content-cont';
  return idOrLabel.endsWith('.cont') ? idOrLabel.slice(0, -5) : idOrLabel;
}

const ROOT_ID = 'body';

/**
 * Construit la map nomCanonique (container) → containerLayout pour résoudre les parent.
 */
function buildLayoutIdByNom(entries: CanonicalSpecEntry[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const e of entries) {
    if (e.typeHierarchique === '--c' && e.containerLayout != null) {
      map.set(e.nomCanonique, e.containerLayout);
      map.set(e.containerLayout, e.containerLayout);
    }
  }
  map.set(ROOT_ID, ROOT_ID);
  return map;
}

/**
 * Résout containerParent (nom base ou layout) vers l'id de layout utilisé dans l'arbre.
 */
function resolveParentId(containerParent: string | null, layoutIdByNom: Map<string, string>): string {
  const key = containerParent ?? ROOT_ID;
  return layoutIdByNom.get(key) ?? key;
}

/** Type d'un enfant dans la map. */
type ChildItem = 
  | { type: 'container'; id: string; label: string; dataLayout?: string | null }
  | { type: 'leaf'; label: string; typeHierarchique?: string };

/**
 * Construit la map parentId (layout) → liste ordonnée d'enfants (container ou feuille).
 */
function buildChildrenMap(
  entries: CanonicalSpecEntry[],
  layoutIdByNom: Map<string, string>
): Map<string, ChildItem[]> {
  const map = new Map<string, ChildItem[]>();
  const containersWithTitle = new Set<string>();
  
  for (const e of entries) {
    const parent = resolveParentId(e.containerParent, layoutIdByNom);
    if (!map.has(parent)) map.set(parent, []);
    if (e.typeHierarchique === '--c' && e.containerLayout != null) {
      map.get(parent)!.push({ type: 'container', id: e.containerLayout, label: e.containerLayout, dataLayout: e.dataLayout });
      
      const repeaterSpec = REPEATER_SPEC[e.nomCanonique];
      if (repeaterSpec && !containersWithTitle.has(e.containerLayout)) {
        containersWithTitle.add(e.containerLayout);
        if (!map.has(e.containerLayout)) map.set(e.containerLayout, []);
        map.get(e.containerLayout)!.unshift({
          type: 'leaf',
          label: `${e.nomCanonique}.titre: "${repeaterSpec.libelle}"`,
          typeHierarchique: repeaterSpec.typeHierarchique
        });
      }
    } else {
      map.get(parent)!.push({ type: 'leaf', label: e.nomCanonique, typeHierarchique: e.typeHierarchique });
    }
  }
  return map;
}

/**
 * Construit l'arbre à partir de la map des enfants, en partant du nœud donné.
 */
function buildTreeFrom(
  parentId: string,
  childrenMap: Map<string, ChildItem[]>,
  visited: Set<string> = new Set()
): TreeNode[] {
  const list = childrenMap.get(parentId) ?? [];
  return list.map((item) => {
    if (item.type === 'container') {
      if (visited.has(item.id)) return { type: 'container' as const, id: item.id, label: item.label, children: [], dataLayout: item.dataLayout };
      visited.add(item.id);
      const children = buildTreeFrom(item.id, childrenMap, visited);
      return { type: 'container' as const, id: item.id, label: item.label, children, dataLayout: item.dataLayout };
    }
    return { type: 'leaf' as const, label: item.label, typeHierarchique: item.typeHierarchique };
  });
}

/**
 * Extrait les types d'éléments du contenu d'une page (contenu JSON).
 */
function extractTypesFromContenu(contenu: Array<{ type?: string }>): Set<string> {
  const types = new Set<string>();
  for (const el of contenu ?? []) {
    if (el?.type) types.add(el.type);
  }
  return types;
}

/**
 * Filtre la spec canonique pour ne garder que les entrées correspondant aux types de la page.
 * Inclut page, main-content-cont et tous les ancêtres nécessaires.
 * Respecte l'ordre des types dans contenu (comme sur la page web).
 */
function filterSpecForPageTypes(types: Set<string>, contenuOrder: string[]): CanonicalSpecEntry[] {
  const resolved = new Set<string>();
  for (const t of types) {
    resolved.add(TYPE_TO_SPEC[t] ?? t);
    for (const child of IMPLIED_CHILD_TYPES[t] ?? []) {
      resolved.add(TYPE_TO_SPEC[child] ?? child);
    }
  }
  const byNom = new Map<string, CanonicalSpecEntry>();
  for (const type of resolved) {
    for (const e of getSpecEntriesForType(type)) {
      byNom.set(e.nomCanonique, e);
    }
  }
  const pageEntry = CANONICAL_SPEC_ORDER.find((e) => e.nomCanonique === 'page');
  if (pageEntry) byNom.set('page', pageEntry);

  const needAncestors = new Set<string>();
  for (const e of byNom.values()) {
    const parent = e.containerParent;
    if (parent && parent !== ROOT_ID) {
      const hasParent = [...byNom.values()].some(
        (x) => x.nomCanonique === parent || x.containerLayout === parent
      );
      if (!hasParent) needAncestors.add(parent);
    }
  }
  while (needAncestors.size > 0) {
    let added = false;
    for (const parentId of needAncestors) {
      const e = CANONICAL_SPEC_ORDER.find(
        (x) => x.nomCanonique === parentId || x.containerLayout === parentId
      );
      if (e) {
        byNom.set(e.nomCanonique, e);
        needAncestors.delete(parentId);
        if (e.containerParent && e.containerParent !== ROOT_ID) {
          const hasParent = [...byNom.values()].some(
            (x) => x.nomCanonique === e.containerParent || x.containerLayout === e.containerParent
          );
          if (!hasParent) needAncestors.add(e.containerParent!);
        }
        added = true;
        break;
      }
    }
    if (!added) needAncestors.clear();
  }

  const contenuOrderIndex = new Map(contenuOrder.map((t, i) => [t, i]));
  const specOrderIndex = new Map(CANONICAL_SPEC_ORDER.map((e, i) => [e.nomCanonique, i]));

  return Array.from(byNom.values()).sort((a, b) => {
    const rootA = getRootTypeForEntry(a);
    const rootB = getRootTypeForEntry(b);
    const idxA = contenuOrderIndex.get(rootA) ?? 999;
    const idxB = contenuOrderIndex.get(rootB) ?? 999;
    if (idxA !== idxB) return idxA - idxB;
    return (specOrderIndex.get(a.nomCanonique) ?? 999) - (specOrderIndex.get(b.nomCanonique) ?? 999);
  });
}

/**
 * Extrait l'ordre des types tel qu'ils apparaissent dans le contenu (pour respecter l'ordre de la page).
 */
function extractContenuOrder(contenu: Array<{ type?: string }>): string[] {
  const order: string[] = [];
  const seen = new Set<string>();
  for (const el of contenu ?? []) {
    const t = el?.type;
    if (t && !seen.has(t)) {
      seen.add(t);
      order.push(TYPE_TO_SPEC[t] ?? t);
    }
  }
  return order;
}

/**
 * Construit l'arbre de hiérarchie à partir du contenu réel d'une page (JSON).
 * Chaque page a ainsi sa propre structure ASCII selon ses TypeDeContenu.
 * Respecte l'ordre des blocs tel qu'affiché sur la page web.
 */
export function buildHierarchyFromPageContenu(contenu: Array<{ type?: string }>): TreeContainer {
  const types = extractTypesFromContenu(contenu);
  const contenuOrder = extractContenuOrder(contenu);
  const filtered = filterSpecForPageTypes(types, contenuOrder);
  return buildHierarchyTree(filtered);
}

/**
 * Transformation pure : contenu (JSON résolu) → ASCII Art (containers uniquement).
 * Consomme le même JSON que le serveur web, mais produit de l'ASCII au lieu du HTML.
 */
export function contenuToAsciiArt(contenu: Array<{ type?: string }>): string {
  const tree = buildHierarchyFromPageContenu(contenu);
  return renderContainersOnlyToAscii(tree);
}

/**
 * Construit l'arbre complet de la hiérarchie (racine = body).
 */
export function buildHierarchyTree(entries: CanonicalSpecEntry[]): TreeContainer {
  const layoutIdByNom = buildLayoutIdByNom(entries);
  const childrenMap = buildChildrenMap(entries, layoutIdByNom);
  const children = buildTreeFrom(ROOT_ID, childrenMap);
  return { type: 'container', id: ROOT_ID, label: ROOT_ID, children };
}

/**
 * Rend un nœud (et ses enfants) en lignes ASCII (├──, └──, │).
 */
function renderNodeToLines(node: TreeNode, prefix: string, isLast: boolean): string[] {
  const lines: string[] = [];
  const branch = isLast ? '└── ' : '├── ';
  if (node.type === 'leaf') {
    const typeAnnotation = node.typeHierarchique ? ` (${node.typeHierarchique})` : '';
    lines.push(prefix + branch + node.label + typeAnnotation);
    return lines;
  }
  const shown = displayLabel(node.label);
  const annotations: string[] = [];
  if (CONTAINER_ANNOTATIONS[node.label]) {
    annotations.push(CONTAINER_ANNOTATIONS[node.label]);
  }
  if (node.dataLayout) {
    annotations.push(`data-layout="${node.dataLayout}"`);
  }
  const annotationStr = annotations.length > 0 ? ` (${annotations.join(', ')})` : '';
  lines.push(prefix + branch + shown + '/' + annotationStr);
  const childPrefix = prefix + (isLast ? '    ' : '│   ');
  node.children.forEach((child, i) => {
    const childIsLast = i === node.children.length - 1;
    lines.push(...renderNodeToLines(child, childPrefix, childIsLast));
  });
  return lines;
}

/**
 * Rend un nœud container uniquement (sans les feuilles) en lignes ASCII.
 * Utilisé pour le mode GO CSS (containers seulement).
 */
function renderContainerNodeToLines(node: TreeContainer, prefix: string, isLast: boolean): string[] {
  const lines: string[] = [];
  const branch = isLast ? '└── ' : '├── ';
  const shown = displayLabel(node.label);
  const annotations: string[] = [];
  if (CONTAINER_ANNOTATIONS[node.label]) {
    annotations.push(CONTAINER_ANNOTATIONS[node.label]);
  }
  if (node.dataLayout) {
    annotations.push(`data-layout="${node.dataLayout}"`);
  }
  const annotationStr = annotations.length > 0 ? ` (${annotations.join(', ')})` : '';
  lines.push(prefix + branch + shown + '/' + annotationStr);
  const containerChildren = node.children
    .filter((c): c is TreeContainer => c.type === 'container')
    .filter((c) => !CONTAINERS_ONLY_EXCLUDE.has(c.id));
  const childPrefix = prefix + (isLast ? '    ' : '│   ');
  containerChildren.forEach((child, i) => {
    const childIsLast = i === containerChildren.length - 1;
    lines.push(...renderContainerNodeToLines(child, childPrefix, childIsLast));
  });
  return lines;
}

/**
 * Rend l'arbre en bloc ASCII **containers uniquement** (pas de propriétés/feuilles).
 * Pour GO CSS : copier-coller dans l'agent Designer.
 */
export function renderContainersOnlyToAscii(root: TreeContainer): string {
  const lines: string[] = [displayLabel(root.label) + '/'];
  const containerChildren = root.children.filter((c): c is TreeContainer => c.type === 'container');
  containerChildren.forEach((child, i) => {
    const isLast = i === containerChildren.length - 1;
    lines.push(...renderContainerNodeToLines(child, '', isLast));
  });
  return lines.join('\n');
}

/**
 * Rend l'arbre complet en bloc ASCII (sans le titre ni la racine "body" répétée).
 */
export function renderHierarchyToAscii(root: TreeContainer): string {
  const lines: string[] = [displayLabel(root.label) + '/'];
  root.children.forEach((child, i) => {
    const isLast = i === root.children.length - 1;
    lines.push(...renderNodeToLines(child, '', isLast));
  });
  return lines.join('\n');
}

/**
 * Génère le contenu complet du fichier Markdown "Hiérarchie du site".
 */
export function generateHierarchyMarkdown(entries?: CanonicalSpecEntry[]): string {
  const order = entries ?? CANONICAL_SPEC_ORDER;
  const tree = buildHierarchyTree(order);
  const ascii = renderHierarchyToAscii(tree);
  return `# Hiérarchie du site (ASCII Art)

Un **dossier** par container, une **ligne** par propriété.  
Chaque propriété a un container implicite \`[nomCanonique].cont\` (spec canonique).  
Source : spec canonique (\`constants/canonicalSpec.ts\`).  
Généré par \`utils/siteHierarchyGenerator.ts\` (sans IA).

\`\`\`
${ascii}
\`\`\`

## Légende

| Symbole | Signification |
|--------|----------------|
| \`xxx/\` | **Container** (dossier) — élément de type \`--c\` avec enfants ; inclut les containers implicites \`[nom].cont\` |
| \`xxx.yyy\` | **Propriété** (ligne) — champ affiché (h1, h2, p, lien, etc.), enfant de son container \`xxx.yyy.cont\` |
| \`(data-layout="...")\` | **Attribut CSS** — layout du container (grilles, colonnes, accordéon, etc.) |
| \`└──\` | Dernier enfant du parent |
| \`├──\` | Enfant suivi d'autres frères |
| \`│\`   | Suite du parent (enfants imbriqués) |

## Racine

- **body** : racine de la page (layout).
- **.main-content-cont** : zone d'affichage entre header et footer (DOM : \`main.main-content-cont\`).
`;
}
