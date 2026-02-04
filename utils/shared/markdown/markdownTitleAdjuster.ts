/**
 * Backend pur : Ajuster les niveaux de titres dans les fichiers markdown
 * Cette logique est réutilisable et testable en ligne de commande
 *
 * Principe : Séparation backend pur (logique métier) / backend Next.js (génération HTML)
 * Ces fonctions sont utilisables partout : ligne de commande, tests, composants React
 * 
 * APPROCHE TDD : Code fait émerger progressivement du simple au complexe
 * 
 * ⚠️ OBSOLÈTE : Cette fonction était utilisée pour ajuster les niveaux avant le nouveau système.
 * Avec US-5.5, les fichiers MD utilisent directement les niveaux standards (#, ##, ###, etc.)
 * et le décalage +2 est appliqué lors du rendu HTML.
 * Cette fonction est conservée pour compatibilité avec d'anciens scripts et fichiers.
 */

/**
 * Ajuste les niveaux de titres dans un contenu markdown (ANCIEN SYSTÈME)
 * Ajoute un # devant chaque niveau de titre existant
 * Exemple : ## Section devient ### Section
 * 
 * ⚠️ OBSOLÈTE : Utilisée uniquement pour migration d'anciens fichiers.
 * Les nouveaux fichiers doivent utiliser directement #, ##, ###, etc.
 */
export const adjustMarkdownTitleLevels = (content: string): string => {
  const lines = content.split('\n');
  return lines.map((line) => {
    const trimmedLine = line.trim();
    
    // ITÉRATION 1 : H2 → H3
    if (trimmedLine.startsWith('## ')) {
      return line.replace(/^(\s*)## /, '$1### ');
    }
    
    // ITÉRATION 2 : H1 → H2
    if (trimmedLine.startsWith('# ')) {
      return line.replace(/^(\s*)# /, '$1## ');
    }
    
    // ITÉRATION 3 : H3 → H4
    if (trimmedLine.startsWith('### ')) {
      return line.replace(/^(\s*)### /, '$1#### ');
    }
    
    // ITÉRATION 4 : H4 → H5, H5 → H6, H6 reste H6
    if (trimmedLine.startsWith('#### ')) {
      return line.replace(/^(\s*)#### /, '$1##### ');
    }
    if (trimmedLine.startsWith('##### ')) {
      return line.replace(/^(\s*)##### /, '$1###### ');
    }
    // H6 reste H6 (on ne va pas plus loin)
    
    // Ligne inchangée si ce n'est pas un titre
    return line;
  }).join('\n');
};
