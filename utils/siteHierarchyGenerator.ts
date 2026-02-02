/**
 * Générateur de la hiérarchie du site (ASCII) à partir de la spec canonique.
 * Produit la structure des pages (containers et propriétés), sans "page Row".
 */

import type { CanonicalSpecEntry } from '../constants/canonicalSpec';
import { CANONICAL_SPEC_ORDER } from '../constants/canonicalSpec';

/** Nœud container (dossier) avec enfants. */
export interface TreeContainer {
  type: 'container';
  id: string;
  label: string;
  children: TreeNode[];
}

/** Nœud feuille (propriété). */
export interface TreeLeaf {
  type: 'leaf';
  label: string;
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
 * La spec utilise parfois le nom de base (ex. listeDesPages) comme containerParent alors que les nœuds sont identifiés par containerLayout (listeDesPages.cont).
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

/**
 * Construit la map parentId (layout) → liste ordonnée d'enfants (container ou feuille).
 */
function buildChildrenMap(
  entries: CanonicalSpecEntry[],
  layoutIdByNom: Map<string, string>
): Map<string, Array<{ type: 'container'; id: string; label: string } | { type: 'leaf'; label: string }>> {
  const map = new Map<string, Array<{ type: 'container'; id: string; label: string } | { type: 'leaf'; label: string }>>();
  for (const e of entries) {
    const parent = resolveParentId(e.containerParent, layoutIdByNom);
    if (!map.has(parent)) map.set(parent, []);
    if (e.typeHierarchique === '--c' && e.containerLayout != null) {
      map.get(parent)!.push({ type: 'container', id: e.containerLayout, label: e.containerLayout });
    } else {
      map.get(parent)!.push({ type: 'leaf', label: e.nomCanonique });
    }
  }
  return map;
}

/**
 * Construit l'arbre à partir de la map des enfants, en partant du nœud donné.
 * Évite les cycles en ignorant les containers déjà visités.
 */
function buildTreeFrom(
  parentId: string,
  childrenMap: Map<string, Array<{ type: 'container'; id: string; label: string } | { type: 'leaf'; label: string }>>,
  visited: Set<string> = new Set()
): TreeNode[] {
  const list = childrenMap.get(parentId) ?? [];
  return list.map((item) => {
    if (item.type === 'container') {
      if (visited.has(item.id)) return { type: 'container' as const, id: item.id, label: item.label, children: [] };
      visited.add(item.id);
      const children = buildTreeFrom(item.id, childrenMap, visited);
      return { type: 'container' as const, id: item.id, label: item.label, children };
    }
    return { type: 'leaf' as const, label: item.label };
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
    lines.push(prefix + branch + node.label);
    return lines;
  }
  const shown = displayLabel(node.label);
  const annotation = CONTAINER_ANNOTATIONS[node.label] ? ` (${CONTAINER_ANNOTATIONS[node.label]})` : '';
  lines.push(prefix + branch + shown + '/' + annotation);
  const childPrefix = prefix + (isLast ? '    ' : '│   ');
  node.children.forEach((child, i) => {
    const childIsLast = i === node.children.length - 1;
    lines.push(...renderNodeToLines(child, childPrefix, childIsLast));
  });
  return lines;
}

/**
 * Rend l'arbre complet en bloc ASCII (sans le titre ni la racine "body" répétée).
 * La racine body a un seul enfant (boby.count) ; on affiche "body/" puis les enfants.
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
| \`└──\` | Dernier enfant du parent |
| \`├──\` | Enfant suivi d'autres frères |
| \`│\`   | Suite du parent (enfants imbriqués) |

## Racine

- **body** : racine de la page (layout).
- **boby.count** : conteneur principal du contenu (équivalent ancien \`page.cont\`).
`;
}
