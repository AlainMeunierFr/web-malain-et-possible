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
}

/**
 * Détecte si une sous-partie est une User Story et attribue les typeDeContenu
 * Une User Story est détectée si les 4 éléments suivants sont présents dans des listes à puce :
 * - **En tant que**
 * - **Je souhaite**
 * - **Afin de**
 * - **Critères d'acceptation**
 * 
 * Dans la section "Critères d'acceptation", détecte également :
 * - Les thèmes de critères : lignes commençant par `- **` (sauf `- **Critères d'acceptation**`)
 * - Les critères : lignes commençant par `- ` (sans `**` au début)
 * 
 * La section "Critères d'acceptation" se termine à :
 * - La prochaine User Story (ligne commençant par `#### US-`)
 * - Un séparateur `---`
 * - La fin de la sous-partie (H4)
 * 
 * @param elements Éléments de contenu parsés
 * @param contenuBrut Contenu brut de la sous-partie (pour détecter les fins de section)
 * @returns Éléments avec typeDeContenu attribué si c'est une User Story
 */
const detecterUserStory = (elements: ContenuElement[], _contenuBrut?: string): ContenuElement[] => {
  // Chercher les 4 patterns dans les listes à puce
  const patterns = {
    'En tant que': /^\*\*En tant que\*\*\s*(.+)$/i,
    'Je souhaite': /^\*\*Je souhaite\*\*\s*(.+)$/i,
    'Afin de': /^\*\*Afin de\*\*\s*(.+)$/i,
    'Critères d\'acceptation': /^\*\*Critères d'acceptation\*\*\s*:?\s*(.*)$/i
  };

  const foundPatterns: Set<string> = new Set();
  const elementsAvecType: ContenuElement[] = [];

  // Première passe : détecter les patterns
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

  // Si les 4 patterns sont présents, c'est une User Story
  const estUserStory = foundPatterns.size === 4;

  // Deuxième passe : attribuer les typeDeContenu
  // Même logique simple que pour "En tant que", "Je souhaite", "Afin de", "Critères d'acceptation"
  let dansCriteresAcceptation = false;
  
  for (const element of elements) {
    if (element.type === 'ul' && element.items && estUserStory) {
      // Créer un élément par item de liste pour pouvoir attribuer le typeDeContenu
      for (const item of element.items) {
        const itemTrimmed = item.trim();
        let typeDeContenuTrouve: string | undefined = undefined;
        
        // Vérifier si c'est un pattern standard (En tant que, Je souhaite, etc.)
        for (const [typeDeContenu, pattern] of Object.entries(patterns)) {
          if (pattern.test(itemTrimmed)) {
            typeDeContenuTrouve = typeDeContenu;
            // Si c'est "Critères d'acceptation", on entre dans cette section
            if (typeDeContenu === "Critères d'acceptation") {
              dansCriteresAcceptation = true;
            } else {
              // Si on rencontre un autre pattern standard après "Critères d'acceptation", on sort de la section
              dansCriteresAcceptation = false;
            }
            break;
          }
        }
        
        // Si on est dans la section "Critères d'acceptation" et que ce n'est pas un pattern standard
        if (dansCriteresAcceptation && !typeDeContenuTrouve) {
          // Même logique simple : 
          // - Si ça commence par `**` (mais pas `**Critères d'acceptation**`) → thème de critère
          // - Sinon → critère normal
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
      // Si on rencontre un élément non-UL (paragraphe, autre liste), on sort de la section "Critères d'acceptation"
      if (element.type !== 'ul' && element.type !== 'ol') {
        dansCriteresAcceptation = false;
      }
      // Copier l'élément tel quel
      elementsAvecType.push({ ...element });
    }
  }

  return elementsAvecType;
};

/**
 * Parse le contenu markdown en éléments (paragraphes, listes)
 * 
 * @param contenu Contenu markdown à parser
 * @returns Tableau d'éléments de contenu
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
        elements.push({
          type: 'paragraph',
          content: texte
        });
      }
      paragrapheCourant = [];
    }
  };

  const finaliserListe = () => {
    if (listeCourante.length > 0 && typeListeCourante) {
      elements.push({
        type: typeListeCourante,
        items: listeCourante
      });
      listeCourante = [];
      typeListeCourante = null;
    }
  };

  for (const ligne of lignes) {
    const trimmed = ligne.trim();

    // Ligne vide
    if (!trimmed) {
      finaliserParagraphe();
      finaliserListe();
      continue;
    }

    // Détecter liste à puce (-)
    if (trimmed.startsWith('- ')) {
      finaliserParagraphe();
      if (typeListeCourante !== 'ul') {
        finaliserListe();
        typeListeCourante = 'ul';
      }
      listeCourante.push(trimmed.substring(2).trim());
      continue;
    }

    // Détecter liste numérotée (1. ou 1))
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

    // Détecter image seule sur une ligne [image:filename] (ancien format)
    const imageMatchOld = trimmed.match(/^\[image:([^\]]+)\]$/);
    if (imageMatchOld) {
      finaliserParagraphe();
      finaliserListe();
      elements.push({
        type: 'image',
        imageFilename: imageMatchOld[1]
      });
      continue;
    }

    // Détecter image Markdown standard ![alt](url)
    const imageMatchMarkdown = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatchMarkdown) {
      finaliserParagraphe();
      finaliserListe();
      const url = imageMatchMarkdown[2];
      // Si l'URL commence par /api/images/, extraire le nom de fichier et le type
      // Si l'URL commence par /images/, convertir en /api/images/
      // Sinon, c'est un nom de fichier simple → construire le chemin MD
      let imageFilename: string;
      let imageUrl: string | undefined;
      if (url.startsWith('/api/images/')) {
        // URL complète déjà formatée (compatibilité)
        const pathParts = url.replace(/^\/api\/images\//, '').split('/');
        if (pathParts.length > 1) {
          // Format /api/images/{type}/{filename}
          imageFilename = decodeURIComponent(pathParts[1]);
          imageUrl = url; // Garder l'URL complète
        } else {
          // Ancien format /api/images/{filename} → considérer comme MD
          imageFilename = decodeURIComponent(pathParts[0]);
          imageUrl = `/api/images/md/${pathParts[0]}`;
        }
      } else if (url.startsWith('/images/')) {
        // Ancien format /images/ → convertir en /api/images/md/
        imageFilename = decodeURIComponent(url.replace(/^\/images\//, ''));
        imageUrl = `/api/images/md/${imageFilename}`;
      } else if (url.startsWith('http://') || url.startsWith('https://')) {
        // URL externe
        imageFilename = url;
        imageUrl = url;
      } else {
        // Nom de fichier simple → construire le chemin MD
        imageFilename = url;
        imageUrl = `/api/images/md/${encodeURIComponent(url)}`;
      }
      elements.push({
        type: 'image',
        imageFilename,
        imageUrl
      });
      continue;
    }

    // Texte normal
    finaliserListe();
    paragrapheCourant.push(trimmed);
  }

  // Finaliser les éléments en cours
  finaliserParagraphe();
  finaliserListe();

  return elements;
};

/**
 * Parse le contenu d'une section pour extraire les parties (###) et sous-parties (####)
 * 
 * @param contenu Contenu complet du fichier MD
 * @returns Contenu parsé avec parties et sous-parties
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

    // Détecter une partie (#) - mais pas ##, ###, etc.
    // Avec décalage +2 : # dans MD → h3 en HTML
    if (trimmedLine.startsWith('# ') && !trimmedLine.startsWith('## ')) {
      dansContenuInitial = false;
      
      // Finaliser la partie précédente si elle existe
      if (partieCourante) {
        // Finaliser le bloc courant si il existe
        if (blocCourant) {
          blocCourant.contenuParse = parseMarkdownContent(blocCourant.contenu.trim());
          if (sousPartieCourante) {
            sousPartieCourante.blocs.push(blocCourant);
          }
          blocCourant = null;
        }
        // Finaliser la sous-partie courante si elle existe
        if (sousPartieCourante) {
          // Parser le contenu de la sous-partie si pas de blocs
          if (sousPartieCourante.blocs.length === 0) {
            const contenuBrut = sousPartieCourante.contenu.trim();
            const contenuParse = parseMarkdownContent(contenuBrut);
            // Détecter si c'est une User Story et attribuer les typeDeContenu
            // Passer le contenu brut pour détecter les fins de section
            sousPartieCourante.contenuParse = detecterUserStory(contenuParse, contenuBrut);
          }
          partieCourante.sousParties.push(sousPartieCourante);
          sousPartieCourante = null;
        }
        // Parser le contenu de la partie avant de la sauvegarder
        partieCourante.contenuParse = parseMarkdownContent(partieCourante.contenu.trim());
        parties.push(partieCourante);
      }

      // Créer une nouvelle partie
      const titre = trimmedLine.substring(2).trim(); // Enlever "# "
      partieCourante = {
        titre,
        contenu: '',
        contenuParse: [],
        sousParties: []
      };
      sousPartieCourante = null;
      blocCourant = null;
    }
    // Détecter une sous-partie (##) - mais pas ###, ####, etc.
    // Avec décalage +2 : ## dans MD → h4 en HTML
    else if (trimmedLine.startsWith('## ') && !trimmedLine.startsWith('### ')) {
      if (partieCourante) {
        // Finaliser le bloc courant si il existe
        if (blocCourant) {
          blocCourant.contenuParse = parseMarkdownContent(blocCourant.contenu.trim());
          if (sousPartieCourante) {
            sousPartieCourante.blocs.push(blocCourant);
          }
          blocCourant = null;
        }
        // Finaliser la sous-partie précédente si elle existe
        if (sousPartieCourante) {
          // Parser le contenu de la sous-partie si pas de blocs
          if (sousPartieCourante.blocs.length === 0) {
            const contenuBrut = sousPartieCourante.contenu.trim();
            const contenuParse = parseMarkdownContent(contenuBrut);
            // Détecter si c'est une User Story et attribuer les typeDeContenu
            // Passer le contenu brut pour détecter les fins de section
            sousPartieCourante.contenuParse = detecterUserStory(contenuParse, contenuBrut);
          }
          partieCourante.sousParties.push(sousPartieCourante);
        }

        // Créer une nouvelle sous-partie
        const titre = trimmedLine.substring(3).trim(); // Enlever "## "
        // Détecter si c'est une sous-partie spéciale (Prompt ou Résultat technique)
        const titreLower = titre.toLowerCase();
        const typeDeContenu = (titreLower === 'prompt' || titreLower === 'résultat technique' || titreLower === 'resultat technique') 
          ? (titreLower === 'prompt' ? 'Prompt' : 'Résultat technique')
          : undefined;
        
        sousPartieCourante = {
          titre,
          contenu: '',
          contenuParse: [],
          typeDeContenu, // "Prompt", "Résultat technique", ou undefined
          blocs: []
        };
        blocCourant = null;
      }
    }
    // Détecter un bloc (###) - mais pas ####, #####, etc.
    // Avec décalage +2 : ### dans MD → h5 en HTML
    else if (trimmedLine.startsWith('### ') && !trimmedLine.startsWith('#### ')) {
      if (sousPartieCourante) {
        // Finaliser le bloc précédent si il existe
        if (blocCourant) {
          blocCourant.contenuParse = parseMarkdownContent(blocCourant.contenu.trim());
          sousPartieCourante.blocs.push(blocCourant);
        }

        // Créer un nouveau bloc
        const titre = trimmedLine.substring(4).trim(); // Enlever "### "
        // Détecter si c'est un bloc spécial (Prompt ou Résultat technique)
        const titreLower = titre.toLowerCase();
        const typeDeContenu = (titreLower === 'prompt' || titreLower === 'résultat technique' || titreLower === 'resultat technique') 
          ? (titreLower === 'prompt' ? 'Prompt' : 'Résultat technique')
          : undefined;
        
        blocCourant = {
          titre,
          contenu: '',
          contenuParse: [],
          typeDeContenu // "Prompt", "Résultat technique", ou undefined
        };
      }
    }
    // Contenu normal
    else {
      if (dansContenuInitial) {
        contenuInitial += ligne + '\n';
      } else if (partieCourante) {
        if (blocCourant) {
          // Ajouter au contenu du bloc courant
          blocCourant.contenu += ligne + '\n';
        } else if (sousPartieCourante) {
          // Ajouter au contenu de la sous-partie courante
          sousPartieCourante.contenu += ligne + '\n';
        } else {
          // Ajouter au contenu de la partie courante
          partieCourante.contenu += ligne + '\n';
        }
      }
    }
  }

  // Sauvegarder la dernière partie, sous-partie et bloc
  if (partieCourante) {
    if (blocCourant) {
      blocCourant.contenuParse = parseMarkdownContent(blocCourant.contenu.trim());
      if (sousPartieCourante) {
        sousPartieCourante.blocs.push(blocCourant);
      }
    }
    if (sousPartieCourante) {
      // Parser le contenu de la sous-partie si pas de blocs
      if (sousPartieCourante.blocs.length === 0) {
        const contenuParse = parseMarkdownContent(sousPartieCourante.contenu.trim());
        // Détecter si c'est une User Story et attribuer les typeDeContenu
        sousPartieCourante.contenuParse = detecterUserStory(contenuParse);
      }
      partieCourante.sousParties.push(sousPartieCourante);
    }
    partieCourante.contenuParse = parseMarkdownContent(partieCourante.contenu.trim());
    parties.push(partieCourante);
  }

  return {
    contenuInitial: contenuInitial.trim(),
    parties
  };
};

/**
 * Lit un dossier (chapitre) à partir d'un chemin relatif à la racine du projet (US-11.3 menu.json Parametre).
 * Utilisé pour la page /a-propos-du-site/[parametre] quand le paramètre est un chemin (ex. data/A propos de ce site/md/A propos du projet).
 * @param relativePath Chemin relatif au projet (ex. "data/A propos de ce site/md/A propos du projet")
 * @returns Chapitre avec sections (fichiers MD) ou null si le dossier n'existe pas ou ne contient pas de MD valides
 */
export const readChapitreByPath = (relativePath: string): Chapitre | null => {
  // Validation anti path-traversal
  let chapitreDir: string;
  try {
    chapitreDir = validateAndResolvePath(relativePath);
  } catch {
    return null; // Chemin invalide ou tentative de path traversal
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
 * Lit le contenu à la racine d'un Path : fichiers MD (H1) et dossiers (H1 accordéon) (US-11.4).
 * Les dossiers peuvent être chargés ensuite via readChapitreByPath(dossier.path).
 * @param relativePath Chemin relatif au projet (ex. "data/A propos de ce site/md/A propos du projet")
 * @returns PathContentAtRoot avec fichiers et dossiers, ou null si le chemin n'existe pas ou n'est pas un dossier
 */
export const readPathContentAtRoot = (relativePath: string): PathContentAtRoot | null => {
  // Validation anti path-traversal
  let dirAbsolu: string;
  try {
    dirAbsolu = validateAndResolvePath(relativePath);
  } catch {
    return null; // Chemin invalide ou tentative de path traversal
  }
  
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dirAbsolu, { withFileTypes: true });
  } catch {
    return null;
  }
  const fichiers: Section[] = [];
  const dossiers: DossierRacine[] = [];
  // Normaliser le chemin relatif pour construire les paths des sous-dossiers
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

