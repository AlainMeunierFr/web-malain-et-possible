/**
 * Backend pur : Logique métier pour lire les dossiers dans "data/A propos de ce site"
 * Cette logique est réutilisable et testable en ligne de commande
 *
 * Principe : Séparation backend pur (logique métier) / backend Next.js (génération HTML)
 * Ces fonctions sont utilisables partout : ligne de commande, tests, composants React
 * 
 * APPROCHE TDD : Code fait émerger progressivement du simple au complexe
 * 
 * Structure hiérarchique :
 * - Dossier = Chapitre = h1
 * - Fichiers MD dans chaque dossier = Section = h2
 * - Ligne ### dans les fichiers MD = Partie = h3
 * - Ligne #### dans les fichiers MD = Sous partie = h4
 * 
 * Règles métier de validation :
 * - Un fichier MD contenant au moins un titre 1 ou 2 (# ou ##) doit déclencher une erreur
 * - Un fichier MD contenant au moins un titre 4 (####) sans titre 3 (###) doit déclencher une erreur
 * - Les fichiers MD vides sont considérés comme inexistants
 * - Un dossier ne contenant aucun fichier MD valide n'est pas affiché
 * - Un dossier contenant un seul fichier MD valide doit déclencher une erreur (au moins 2 sections requises)
 */

import fs from 'fs';
import path from 'path';

/**
 * Valide qu'un chemin relatif ne sort pas du répertoire autorisé (prévention path traversal).
 * @param relativePath Chemin relatif à valider
 * @param allowedBase Répertoire de base autorisé (par défaut: 'data')
 * @returns Le chemin absolu résolu si valide
 * @throws Error si le chemin tente de sortir du répertoire autorisé
 */
function validateAndResolvePath(relativePath: string, allowedBase: string = 'data'): string {
  const normalizedPath = relativePath.replace(/^\.\//, '').split('/').join(path.sep);
  const resolvedPath = path.resolve(process.cwd(), normalizedPath);
  const allowedDir = path.resolve(process.cwd(), allowedBase);
  
  // Vérifier que le chemin résolu reste dans le répertoire autorisé
  if (!resolvedPath.startsWith(allowedDir + path.sep) && resolvedPath !== allowedDir) {
    throw new Error(`Accès interdit: le chemin "${relativePath}" sort du répertoire autorisé "${allowedBase}"`);
  }
  
  return resolvedPath;
}

/**
 * Erreurs de validation métier
 * APPROCHE TDD : Classe créée progressivement pour répondre aux tests
 */
export class ValidationError extends Error {
  constructor(message: string, public filePath?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * Interface pour un élément de contenu parsé
 */
export interface ContenuElement {
  type: 'paragraph' | 'ul' | 'ol' | 'image';
  content?: string; // Pour les paragraphes
  items?: string[]; // Pour les listes
  imageFilename?: string; // Pour les images (nom de fichier ou URL complète)
  imageUrl?: string; // Pour les images (URL complète depuis le markdown)
  typeDeContenu?: string; // "En tant que", "Je souhaite", "Afin de", "Critères d'acceptation" (pour User Stories)
}

/**
 * Interface pour un bloc (##### dans le fichier MD)
 */
export interface Bloc {
  titre: string; // Titre du bloc (texte après #####)
  contenu: string; // Contenu brut du bloc jusqu'à la prochaine sous-partie/bloc ou fin
  contenuParse: ContenuElement[]; // Contenu parsé en éléments (paragraphes, listes)
  typeDeContenu?: string; // "Prompt", "Résultat technique", etc. (pour style CSS spécial)
}

/**
 * Interface pour une sous-partie (#### dans le fichier MD)
 */
export interface SousPartie {
  titre: string; // Titre de la sous-partie (texte après ####)
  contenu: string; // Contenu brut de la sous-partie jusqu'à la prochaine partie/sous-partie ou fin
  contenuParse: ContenuElement[]; // Contenu parsé en éléments (paragraphes, listes)
  typeDeContenu?: string; // "Prompt", "Résultat technique", etc. (pour masquer le titre en affichage, mais garder pour SEO)
  blocs: Bloc[]; // Blocs (#####) dans cette sous-partie
}

/**
 * Interface pour une partie (### dans le fichier MD)
 */
export interface Partie {
  titre: string; // Titre de la partie (texte après ###)
  contenu: string; // Contenu brut de la partie jusqu'à la prochaine partie ou fin
  contenuParse: ContenuElement[]; // Contenu parsé en éléments (paragraphes, listes)
  sousParties: SousPartie[]; // Sous-parties (####) dans cette partie
}

/**
 * Interface pour le contenu parsé d'une section
 */
export interface SectionContent {
  contenuInitial: string; // Contenu avant la première partie
  parties: Partie[]; // Parties (###) dans cette section
}

/**
 * Interface pour une section (fichier MD)
 */
export interface Section {
  nom: string; // Nom du fichier sans l'extension .md
  contenu: string; // Contenu complet du fichier MD
  parties: Partie[]; // Parties (###) dans cette section
}

/**
 * Interface pour un chapitre (dossier)
 */
export interface Chapitre {
  nom: string; // Nom du dossier
  sections: Section[]; // Fichiers MD dans ce dossier
}

/**
 * Entrée dossier à la racine d'un Path (US-11.4).
 * path = chemin relatif complet pour appeler readChapitreByPath(path) au dépliage.
 */
export interface DossierRacine {
  nom: string;
  path: string;
}

/**
 * Contenu à la racine d'un Path : fichiers MD (H1) et dossiers (H1 accordéon) (US-11.4).
 */
export interface PathContentAtRoot {
  fichiers: Section[];
  dossiers: DossierRacine[];
}

/**
 * Interface pour le JSON retourné avec la structure complète
 */
export interface AboutSiteStructure {
  chapitres: Chapitre[];
}

/**
 * Valide le contenu d'un fichier MD selon les règles métier
 * APPROCHE TDD : Code fait émerger progressivement du simple au complexe
 * 
 * ITÉRATION 1 (GREEN) : Détecter un titre H1 - code minimal pour faire passer le test
 * ITÉRATION 2 (GREEN) : Détecter un titre H2 - extension du code
 * ITÉRATION 3 (GREEN) : Détecter H4 sans H3 - nécessite de tracker H3 et H4
 * ITÉRATION 4 (GREEN) : Ignorer les blocs de code markdown - nécessite de tracker l'état dans/dansBlocCode
 * ITÉRATION 5 (GREEN) : Fichier vide ne doit pas lever d'erreur - cas limite
 * 
 * @param contenu Contenu du fichier MD
 * @param filePath Chemin du fichier (pour les messages d'erreur)
 * @throws ValidationError Si le fichier ne respecte pas les règles métier
 */
export const validerContenuMarkdown = (contenu: string, filePath: string): void => {
  // ITÉRATION 5 : Fichier vide = inexistant (pas d'erreur, juste ignoré)
  if (!contenu.trim()) {
    return; // Fichier vide : considéré comme inexistant (pas d'erreur)
  }

  const lignes = contenu.split('\n');
  let hasH3 = false;
  let hasH4 = false;
  let dansBlocCode = false;
  
  for (const ligne of lignes) {
    const trimmed = ligne.trim();
    
    // ITÉRATION 4 : Détecter les blocs de code markdown (``` ou ````)
    // Gérer les blocs avec 3 ou 4 backticks
    if (trimmed.startsWith('```')) {
      // Compter le nombre de backticks consécutifs
      let backtickCount = 0;
      for (let j = 0; j < trimmed.length && trimmed[j] === '`'; j++) {
        backtickCount++;
      }
      // Si c'est un nombre pair de backticks (4, 6, etc.), c'est un bloc de code imbriqué
      // Sinon (3, 5, etc.), c'est un bloc de code normal
      if (backtickCount >= 3) {
        dansBlocCode = !dansBlocCode;
      }
      continue; // Ignorer la ligne de délimitation
    }
    
    // ITÉRATION 4 : Ignorer les lignes dans les blocs de code
    if (dansBlocCode) {
      continue;
    }
    
    // ITÉRATION 3 : Tracker H1 et H2 (pour validation hiérarchique)
    if (trimmed.startsWith('# ') && !trimmed.startsWith('## ')) {
      hasH3 = true; // H1 dans MD
    } else if (trimmed.startsWith('## ') && !trimmed.startsWith('### ')) {
      hasH4 = true; // H2 dans MD
    }
  }
  
  // ITÉRATION 3 : Vérifier si H2 existe sans H1
  if (hasH4 && !hasH3) {
    throw new ValidationError(
      `Le fichier "${filePath}" contient un titre de niveau 2 (##) sans titre de niveau 1 (#). Les sous-parties (##) doivent être dans une partie (#).`,
      filePath
    );
  }
};

/**
 * Détecte si une sous-partie est une User Story et attribue les typeDeContenu
 */
const detecterUserStory = (elements: ContenuElement[], _contenuBrut?: string): ContenuElement[] => {
  const patterns = {
    'En tant que': /^\*\*En tant que\*\*\s*(.+)$/i,
    'Je souhaite': /^\*\*Je souhaite\*\*\s*(.+)$/i,
    'Afin de': /^\*\*Afin de\*\*\s*(.+)$/i,
    'Critères d\'acceptation': /^\*\*Critères d'acceptation\*\*\s*:?\s*(.*)$/i
  };

  const foundPatterns: Set<string> = new Set();
  const elementsAvecType: ContenuElement[] = [];

  for (const element of elements) {
    if (element.type === 'ul' && element.items) {
      for (const item of element.items) {
        for (const [typeDeContenu, pattern] of Object.entries(patterns)) {
          if (pattern.test(item.trim())) {
            foundPatterns.add(typeDeContenu);
          }
        }
      }
    }
  }

  const estUserStory = foundPatterns.size === 4;
  let dansCriteresAcceptation = false;
  
  for (const element of elements) {
    if (element.type === 'ul' && element.items && estUserStory) {
      for (const item of element.items) {
        const itemTrimmed = item.trim();
        let typeDeContenuTrouve: string | undefined = undefined;
        
        for (const [typeDeContenu, pattern] of Object.entries(patterns)) {
          if (pattern.test(itemTrimmed)) {
            typeDeContenuTrouve = typeDeContenu;
            if (typeDeContenu === "Critères d'acceptation") {
              dansCriteresAcceptation = true;
            } else {
              dansCriteresAcceptation = false;
            }
            break;
          }
        }
        
        if (dansCriteresAcceptation && !typeDeContenuTrouve) {
          if (/^\*\*/.test(itemTrimmed) && !/^\*\*Critères d'acceptation\*\*/i.test(itemTrimmed)) {
            typeDeContenuTrouve = 'themeCritere';
          } else {
            typeDeContenuTrouve = 'critere';
          }
        }
        
        elementsAvecType.push({
          type: 'ul',
          items: [item],
          typeDeContenu: typeDeContenuTrouve
        });
      }
    } else {
      if (element.type !== 'ul' && element.type !== 'ol') {
        dansCriteresAcceptation = false;
      }
      elementsAvecType.push({ ...element });
    }
  }

  return elementsAvecType;
};

/**
 * Parse le contenu markdown en éléments (paragraphes, listes)
 */
export const parseMarkdownContent = (contenu: string): ContenuElement[] => {
  const lignes = contenu.split('\n');
  const elements: ContenuElement[] = [];
  let paragrapheCourant: string[] = [];
  let listeCourante: string[] = [];
  let typeListeCourante: 'ul' | 'ol' | null = null;

  const finaliserParagraphe = () => {
    if (paragrapheCourant.length > 0) {
      const texte = paragrapheCourant.join(' ').trim();
      if (texte) {
        elements.push({ type: 'paragraph', content: texte });
      }
      paragrapheCourant = [];
    }
  };

  const finaliserListe = () => {
    if (listeCourante.length > 0 && typeListeCourante) {
      elements.push({ type: typeListeCourante, items: listeCourante });
      listeCourante = [];
      typeListeCourante = null;
    }
  };

  for (const ligne of lignes) {
    const trimmed = ligne.trim();

    if (!trimmed) {
      finaliserParagraphe();
      finaliserListe();
      continue;
    }

    if (trimmed.startsWith('- ')) {
      finaliserParagraphe();
      if (typeListeCourante !== 'ul') {
        finaliserListe();
        typeListeCourante = 'ul';
      }
      listeCourante.push(trimmed.substring(2).trim());
      continue;
    }

    const matchNumero = trimmed.match(/^(\d+)\.\s+(.+)$/);
    if (matchNumero) {
      finaliserParagraphe();
      if (typeListeCourante !== 'ol') {
        finaliserListe();
        typeListeCourante = 'ol';
      }
      listeCourante.push(matchNumero[2].trim());
      continue;
    }

    const imageMatchOld = trimmed.match(/^\[image:([^\]]+)\]$/);
    if (imageMatchOld) {
      finaliserParagraphe();
      finaliserListe();
      elements.push({ type: 'image', imageFilename: imageMatchOld[1] });
      continue;
    }

    const imageMatchMarkdown = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatchMarkdown) {
      finaliserParagraphe();
      finaliserListe();
      const url = imageMatchMarkdown[2];
      let imageFilename: string;
      let imageUrl: string | undefined;
      if (url.startsWith('/api/images/')) {
        const pathParts = url.replace(/^\/api\/images\//, '').split('/');
        if (pathParts.length > 1) {
          imageFilename = decodeURIComponent(pathParts[1]);
          imageUrl = url;
        } else {
          imageFilename = decodeURIComponent(pathParts[0]);
          imageUrl = `/api/images/md/${pathParts[0]}`;
        }
      } else if (url.startsWith('/images/')) {
        imageFilename = decodeURIComponent(url.replace(/^\/images\//, ''));
        imageUrl = `/api/images/md/${imageFilename}`;
      } else if (url.startsWith('http://') || url.startsWith('https://')) {
        imageFilename = url;
        imageUrl = url;
      } else {
        imageFilename = url;
        imageUrl = `/api/images/md/${encodeURIComponent(url)}`;
      }
      elements.push({ type: 'image', imageFilename, imageUrl });
      continue;
    }

    finaliserListe();
    paragrapheCourant.push(trimmed);
  }

  finaliserParagraphe();
  finaliserListe();

  return elements;
};

/**
 * Parse le contenu d'une section pour extraire les parties et sous-parties
 */
export const parseSectionContent = (contenu: string): SectionContent => {
  const lignes = contenu.split('\n');
  const parties: Partie[] = [];
  let contenuInitial = '';
  let partieCourante: Partie | null = null;
  let sousPartieCourante: SousPartie | null = null;
  let blocCourant: Bloc | null = null;
  let dansContenuInitial = true;

  for (let i = 0; i < lignes.length; i++) {
    const ligne = lignes[i];
    const trimmedLine = ligne.trim();

    if (trimmedLine.startsWith('# ') && !trimmedLine.startsWith('## ')) {
      dansContenuInitial = false;
      
      if (partieCourante) {
        if (blocCourant) {
          blocCourant.contenuParse = parseMarkdownContent(blocCourant.contenu.trim());
          if (sousPartieCourante) {
            sousPartieCourante.blocs.push(blocCourant);
          }
          blocCourant = null;
        }
        if (sousPartieCourante) {
          if (sousPartieCourante.blocs.length === 0) {
            const contenuBrut = sousPartieCourante.contenu.trim();
            const contenuParse = parseMarkdownContent(contenuBrut);
            sousPartieCourante.contenuParse = detecterUserStory(contenuParse, contenuBrut);
          }
          partieCourante.sousParties.push(sousPartieCourante);
          sousPartieCourante = null;
        }
        partieCourante.contenuParse = parseMarkdownContent(partieCourante.contenu.trim());
        parties.push(partieCourante);
      }

      const titre = trimmedLine.substring(2).trim();
      partieCourante = { titre, contenu: '', contenuParse: [], sousParties: [] };
      sousPartieCourante = null;
      blocCourant = null;
    }
    else if (trimmedLine.startsWith('## ') && !trimmedLine.startsWith('### ')) {
      if (partieCourante) {
        if (blocCourant) {
          blocCourant.contenuParse = parseMarkdownContent(blocCourant.contenu.trim());
          if (sousPartieCourante) {
            sousPartieCourante.blocs.push(blocCourant);
          }
          blocCourant = null;
        }
        if (sousPartieCourante) {
          if (sousPartieCourante.blocs.length === 0) {
            const contenuBrut = sousPartieCourante.contenu.trim();
            const contenuParse = parseMarkdownContent(contenuBrut);
            sousPartieCourante.contenuParse = detecterUserStory(contenuParse, contenuBrut);
          }
          partieCourante.sousParties.push(sousPartieCourante);
        }

        const titre = trimmedLine.substring(3).trim();
        const titreLower = titre.toLowerCase();
        const typeDeContenu = (titreLower === 'prompt' || titreLower === 'résultat technique' || titreLower === 'resultat technique') 
          ? (titreLower === 'prompt' ? 'Prompt' : 'Résultat technique')
          : undefined;
        
        sousPartieCourante = { titre, contenu: '', contenuParse: [], typeDeContenu, blocs: [] };
        blocCourant = null;
      }
    }
    else if (trimmedLine.startsWith('### ') && !trimmedLine.startsWith('#### ')) {
      if (sousPartieCourante) {
        if (blocCourant) {
          blocCourant.contenuParse = parseMarkdownContent(blocCourant.contenu.trim());
          sousPartieCourante.blocs.push(blocCourant);
        }

        const titre = trimmedLine.substring(4).trim();
        const titreLower = titre.toLowerCase();
        const typeDeContenu = (titreLower === 'prompt' || titreLower === 'résultat technique' || titreLower === 'resultat technique') 
          ? (titreLower === 'prompt' ? 'Prompt' : 'Résultat technique')
          : undefined;
        
        blocCourant = { titre, contenu: '', contenuParse: [], typeDeContenu };
      }
    }
    else {
      if (dansContenuInitial) {
        contenuInitial += ligne + '\n';
      } else if (partieCourante) {
        if (blocCourant) {
          blocCourant.contenu += ligne + '\n';
        } else if (sousPartieCourante) {
          sousPartieCourante.contenu += ligne + '\n';
        } else {
          partieCourante.contenu += ligne + '\n';
        }
      }
    }
  }

  if (partieCourante) {
    if (blocCourant) {
      blocCourant.contenuParse = parseMarkdownContent(blocCourant.contenu.trim());
      if (sousPartieCourante) {
        sousPartieCourante.blocs.push(blocCourant);
      }
    }
    if (sousPartieCourante) {
      if (sousPartieCourante.blocs.length === 0) {
        const contenuParse = parseMarkdownContent(sousPartieCourante.contenu.trim());
        sousPartieCourante.contenuParse = detecterUserStory(contenuParse);
      }
      partieCourante.sousParties.push(sousPartieCourante);
    }
    partieCourante.contenuParse = parseMarkdownContent(partieCourante.contenu.trim());
    parties.push(partieCourante);
  }

  return { contenuInitial: contenuInitial.trim(), parties };
};

/**
 * Lit un dossier (chapitre) à partir d'un chemin relatif
 */
export const readChapitreByPath = (relativePath: string): Chapitre | null => {
  let chapitreDir: string;
  try {
    chapitreDir = validateAndResolvePath(relativePath);
  } catch {
    return null;
  }
  
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(chapitreDir, { withFileTypes: true });
  } catch {
    return null;
  }
  const chapitreNom = path.basename(chapitreDir);
  const sections: Section[] = [];
  for (const entry of entries) {
    if (!entry.isFile() || (!entry.name.endsWith('.md') && !entry.name.endsWith('.mdc'))) continue;
    const sectionPath = path.join(chapitreDir, entry.name);
    let contenu: string;
    try {
      contenu = fs.readFileSync(sectionPath, 'utf8');
    } catch {
      continue;
    }
    if (!contenu.trim()) continue;
    try {
      validerContenuMarkdown(contenu, sectionPath);
    } catch {
      continue;
    }
    const nom = entry.name.replace(/\.mdc?$/, '');
    const contenuParse = parseSectionContent(contenu);
    sections.push({ nom, contenu, parties: contenuParse.parties });
  }
  sections.sort((a, b) => a.nom.localeCompare(b.nom));
  if (sections.length === 0) return null;
  return { nom: chapitreNom, sections };
};

/**
 * Lit le contenu à la racine d'un Path
 */
export const readPathContentAtRoot = (relativePath: string): PathContentAtRoot | null => {
  let dirAbsolu: string;
  try {
    dirAbsolu = validateAndResolvePath(relativePath);
  } catch {
    return null;
  }
  
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dirAbsolu, { withFileTypes: true });
  } catch {
    return null;
  }
  const fichiers: Section[] = [];
  const dossiers: DossierRacine[] = [];
  const normalizedPathSlash = relativePath.replace(/^\.\//, '').split(path.sep).join('/').split('\\').join('/');

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const dossierPath = normalizedPathSlash + (normalizedPathSlash ? '/' : '') + entry.name;
      dossiers.push({ nom: entry.name, path: dossierPath });
    } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdc'))) {
      const sectionPath = path.join(dirAbsolu, entry.name);
      let contenu: string;
      try {
        contenu = fs.readFileSync(sectionPath, 'utf8');
      } catch {
        continue;
      }
      if (!contenu.trim()) continue;
      try {
        validerContenuMarkdown(contenu, sectionPath);
      } catch {
        continue;
      }
      const nom = entry.name.replace(/\.mdc?$/, '');
      const contenuParse = parseSectionContent(contenu);
      fichiers.push({ nom, contenu, parties: contenuParse.parties });
    }
  }

  fichiers.sort((a, b) => a.nom.localeCompare(b.nom));
  dossiers.sort((a, b) => a.nom.localeCompare(b.nom));
  return { fichiers, dossiers };
};
