/**
 * Backend pur : Ajuster les niveaux de titres dans les fichiers markdown
 * Cette logique est réutilisable et testable en ligne de commande
 *
 * Principe : Séparation backend pur (logique métier) / backend Next.js (génération HTML)
 * Ces fonctions sont utilisables partout : ligne de commande, tests, composants React
 */

/**
 * Ajuste les niveaux de titres dans un contenu markdown
 * Ajoute un # devant chaque niveau de titre existant
 * Exemple : ## Section devient ### Section
 */
export const adjustMarkdownTitleLevels = (content: string): string => {
  const lines = content.split('\n');
  const adjustedLines = lines.map((line) => {
    const trimmedLine = line.trim();
    
    // Titre H1 (# Titre)
    if (trimmedLine.startsWith('# ')) {
      return line.replace(/^(\s*)# /, '$1## ');
    }
    
    // Titre H2 (## Titre)
    if (trimmedLine.startsWith('## ')) {
      return line.replace(/^(\s*)## /, '$1### ');
    }
    
    // Titre H3 (### Titre)
    if (trimmedLine.startsWith('### ')) {
      return line.replace(/^(\s*)### /, '$1#### ');
    }
    
    // Titre H4 (#### Titre)
    if (trimmedLine.startsWith('#### ')) {
      return line.replace(/^(\s*)#### /, '$1##### ');
    }
    
    // Titre H5 (##### Titre)
    if (trimmedLine.startsWith('##### ')) {
      return line.replace(/^(\s*)##### /, '$1###### ');
    }
    
    // Titre H6 (###### Titre) - on ne va pas plus loin
    // Ligne inchangée si ce n'est pas un titre
    return line;
  });
  
  return adjustedLines.join('\n');
};
