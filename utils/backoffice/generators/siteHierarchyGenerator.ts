/**
 * Générateur de la hiérarchie du site (ASCII) à partir de la spec canonique.
 * Produit la structure des pages (containers et propriétés), sans "page Row".
 */

import type { CanonicalSpecEntry } from '../../../constants/canonicalSpec';
import { CANONICAL_SPEC_ORDER, REPEATER_SPEC } from '../../../constants/canonicalSpec';

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

/** Annotation optionnelle pour un container (ex. "page" pour boby.count). */
const CONTAINER_ANNOTATIONS: Record<string, string> = {
  'boby.count': 'page',
};

/** Libellé affiché pour un container : on retire le suffixe .cont pour raccourcir (hero.cont → hero). */
function displayLabel(idOrLabel: string): string {
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
- **boby.count** : conteneur principal du contenu (équivalent ancien \`page.cont\`).
`;
}
