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
  niveauListe?: number; // 1 ou 2 pour indiquer le niveau d'indentation de la liste
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
  niveauBase?: number; // Niveau de base détecté (1, 2, ou 3) pour adapter la hiérarchie HTML
}

/**
 * Interface pour une section (fichier MD)
 */
export interface Section {
  nom: string; // Nom du fichier sans l'extension .md
  contenu: string; // Contenu complet du fichier MD
  parties: Partie[]; // Parties (###) dans cette section
  niveauBase?: number; // Niveau de base détecté (1, 2, ou 3) pour adapter la hiérarchie HTML
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
 * Détecte le premier niveau de titre dans le contenu MD
 * Retourne le décalage (1, 2, ou 3) pour adapter la hiérarchie
 */
function detecterPremierNiveauTitre(lignes: string[]): number {
  for (const ligne of lignes) {
    const trimmed = ligne.trim();
    if (trimmed.startsWith('# ') && !trimmed.startsWith('## ')) {
      return 1; // # = h3
    }
    if (trimmed.startsWith('## ') && !trimmed.startsWith('### ')) {
      return 2; // ## = h3
    }
    if (trimmed.startsWith('### ') && !trimmed.startsWith('#### ')) {
      return 3; // ### = h3
    }
  }
  return 3; // Par défaut, on assume ### comme premier niveau
}

/**
 * Valide le contenu d'un fichier MD selon les règles métier
 * S'adapte au premier niveau de titre trouvé dans le fichier
 * 
 * @param contenu Contenu du fichier MD
 * @param filePath Chemin du fichier (pour les messages d'erreur)
 * @throws ValidationError Si le fichier ne respecte pas les règles métier
 */
export const validerContenuMarkdown = (contenu: string, filePath: string): void => {
  // Fichier vide = inexistant (pas d'erreur, juste ignoré)
  if (!contenu.trim()) {
    return;
  }

  // Normaliser les retours à la ligne Windows (\r\n) en Unix (\n)
  const lignes = contenu.split(/\r?\n/);
  
  // Détecter le premier niveau de titre pour adapter la validation
  const niveauBase = detecterPremierNiveauTitre(lignes);
  
  let hasPartie = false;
  let hasSousPartie = false;
  let dansBlocCode = false;
  
  // Fonctions pour détecter les titres selon le niveau de base
  const estPartie = (trimmed: string): boolean => {
    if (niveauBase === 1) return trimmed.startsWith('# ') && !trimmed.startsWith('## ');
    if (niveauBase === 2) return trimmed.startsWith('## ') && !trimmed.startsWith('### ');
    return trimmed.startsWith('### ') && !trimmed.startsWith('#### ');
  };
  
  const estSousPartie = (trimmed: string): boolean => {
    if (niveauBase === 1) return trimmed.startsWith('## ') && !trimmed.startsWith('### ');
    if (niveauBase === 2) return trimmed.startsWith('### ') && !trimmed.startsWith('#### ');
    return trimmed.startsWith('#### ') && !trimmed.startsWith('##### ');
  };
  
  for (const ligne of lignes) {
    const trimmed = ligne.trim();
    
    // Détecter les blocs de code markdown (``` ou ````)
    if (trimmed.startsWith('```')) {
      let backtickCount = 0;
      for (let j = 0; j < trimmed.length && trimmed[j] === '`'; j++) {
        backtickCount++;
      }
      if (backtickCount >= 3) {
        dansBlocCode = !dansBlocCode;
      }
      continue;
    }
    
    // Ignorer les lignes dans les blocs de code
    if (dansBlocCode) {
      continue;
    }
    
    // Tracker les parties et sous-parties selon le niveau de base
    if (estPartie(trimmed)) {
      hasPartie = true;
    } else if (estSousPartie(trimmed)) {
      hasSousPartie = true;
    }
  }
  
  // Vérifier si sous-partie existe sans partie
  if (hasSousPartie && !hasPartie) {
    const niveauPartie = niveauBase === 1 ? '#' : niveauBase === 2 ? '##' : '###';
    const niveauSousPartie = niveauBase === 1 ? '##' : niveauBase === 2 ? '###' : '####';
    throw new ValidationError(
      `Le fichier "${filePath}" contient un titre de niveau sous-partie (${niveauSousPartie}) sans titre de niveau partie (${niveauPartie}). Les sous-parties doivent être dans une partie.`,
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
    // Traiter les listes de niveau 2 (critères indentés) comme des critères séparés
    // Ces listes apparaissent après un thème dans la section "Critères d'acceptation"
    if (element.type === 'ul' && element.items && element.niveauListe === 2 && estUserStory && dansCriteresAcceptation) {
      // Diviser chaque item de niveau 2 en élément critere séparé
      for (const item of element.items) {
        elementsAvecType.push({
          type: 'ul',
          items: [item],
          typeDeContenu: 'critere'
        });
      }
      // Ne pas ajouter l'élément original, on l'a déjà divisé
      continue;
    }
    
    if (element.type === 'ul' && element.items && estUserStory) {
      // Traiter les listes de niveau 1 (thèmes, éléments de User Story)
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
      // Éléments non-liste : réinitialiser dansCriteresAcceptation seulement si ce n'est pas une liste
      if (element.type !== 'ul' && element.type !== 'ol') {
        dansCriteresAcceptation = false;
      }
      // Ne pas ajouter les listes de niveau 2 qui ont déjà été traitées ci-dessus
      if (!(element.type === 'ul' && element.niveauListe === 2 && estUserStory)) {
        elementsAvecType.push({ ...element });
      }
    }
  }

  return elementsAvecType;
};

/**
 * Parse le contenu markdown en éléments (paragraphes, listes)
 * Conserve l'indentation pour détecter les niveaux de puces
 */
export const parseMarkdownContent = (contenu: string): ContenuElement[] => {
  // Normaliser les retours à la ligne Windows (\r\n) en Unix (\n)
  // Et transformer les mots-clés US (## En tant que XXX -> **En tant que** XXX)
  // Note: "Critères d'acceptation" reste un titre, pas transformé ici
  const lignes = contenu.split(/\r?\n/).map(ligne => {
    const usMatch = ligne.match(/^#{1,2}\s+(En tant que|Je souhaite|Je veux|Afin de)\s+(.*)$/i);
    if (usMatch) {
      return `**${usMatch[1]}** ${usMatch[2]}`;
    }
    const caMatch = ligne.match(/^#{1,2}\s+(CA\d+\s*-\s*.+)$/i);
    if (caMatch) {
      return `**${caMatch[1]}**`;
    }
    return ligne;
  });
  const elements: ContenuElement[] = [];
  let paragrapheCourant: string[] = [];
  let listeCourante: string[] = [];
  let listeNiveau2Courante: string[] = [];
  let typeListeCourante: 'ul' | 'ol' | null = null;
  let dansListeNiveau2 = false;

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
    // Finaliser d'abord la liste de niveau 2 si elle existe
    if (listeNiveau2Courante.length > 0) {
      elements.push({ 
        type: typeListeCourante || 'ul', 
        items: listeNiveau2Courante,
        niveauListe: 2 // Marqueur pour le CSS
      });
      listeNiveau2Courante = [];
      dansListeNiveau2 = false;
    }
    // Puis finaliser la liste de niveau 1
    if (listeCourante.length > 0 && typeListeCourante) {
      elements.push({ 
        type: typeListeCourante, 
        items: listeCourante,
        niveauListe: 1 // Marqueur pour le CSS
      });
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

    // Détecter les headings spéciaux US : ## En tant que, ## Je souhaite, ## Afin de
    const usKeywordMatch = trimmed.match(/^#{1,2}\s+(En tant que|Je souhaite|Je veux|Afin de)\s+(.*)$/i);
    if (usKeywordMatch) {
      finaliserParagraphe();
      finaliserListe();
      const keyword = usKeywordMatch[1];
      const rest = usKeywordMatch[2];
      // Créer un paragraphe avec le mot-clé en gras et le typeDeContenu approprié
      let typeDeContenu = keyword;
      if (keyword.toLowerCase() === 'je veux') {
        typeDeContenu = 'Je souhaite';
      }
      elements.push({ 
        type: 'paragraph', 
        content: `**${keyword}** ${rest}`,
        typeDeContenu: typeDeContenu
      });
      continue;
    }

    // Détecter les headings CA : ## CA1 - Titre ou # Critères d'acceptation
    const caHeaderMatch = trimmed.match(/^#{1,2}\s+(CA\d+\s*-\s*.+|Critères d'acceptation)$/i);
    if (caHeaderMatch) {
      finaliserParagraphe();
      finaliserListe();
      const titre = caHeaderMatch[1];
      if (titre.toLowerCase() === "critères d'acceptation") {
        elements.push({ 
          type: 'paragraph', 
          content: `**${titre}**`,
          typeDeContenu: "Critères d'acceptation"
        });
      } else {
        // CA1 - Titre
        elements.push({ 
          type: 'paragraph', 
          content: `**${titre}**`,
          typeDeContenu: 'themeCritere'
        });
      }
      continue;
    }

    // Détecter les puces avec indentation (niveau 1 = 0 espaces, niveau 2 = 2+ espaces ou tab)
    const matchPuce = ligne.match(/^(\s*)[-*+]\s+(.+)$/);
    if (matchPuce) {
      finaliserParagraphe();
      const indent = matchPuce[1].length;
      const texte = matchPuce[2].trim();
      
      // Niveau 2 : indentation de 2+ espaces ou 1+ tab
      if (indent >= 2 || matchPuce[1].includes('\t')) {
        // Si on est dans une liste de niveau 1, créer une liste de niveau 2 séparée
        if (typeListeCourante === 'ul' && listeCourante.length > 0) {
          finaliserListe();
          typeListeCourante = 'ul';
          listeCourante = [];
        }
        // Créer une liste de niveau 2
        if (listeNiveau2Courante.length === 0) {
          // Nouvelle liste de niveau 2
          listeNiveau2Courante.push(texte);
          dansListeNiveau2 = true;
        } else {
          // Continuer la liste de niveau 2
          listeNiveau2Courante.push(texte);
        }
      } else {
        // Niveau 1 : pas d'indentation ou 1 espace
        // Finaliser seulement si on change de type de liste (de ol à ul)
        if (typeListeCourante !== null && typeListeCourante !== 'ul') {
          finaliserListe();
        }
        // Finaliser la liste de niveau 2 si on revient au niveau 1
        if (listeNiveau2Courante.length > 0) {
          elements.push({ 
            type: 'ul', 
            items: listeNiveau2Courante,
            niveauListe: 2
          });
          listeNiveau2Courante = [];
          dansListeNiveau2 = false;
        }
        typeListeCourante = 'ul';
        listeCourante.push(texte);
      }
      continue;
    }

    // Détecter les listes numérotées avec indentation
    const matchNumero = ligne.match(/^(\s*)(\d+)\.\s+(.+)$/);
    if (matchNumero) {
      finaliserParagraphe();
      const indent = matchNumero[1].length;
      const texte = matchNumero[3].trim();
      
      // Niveau 2 : indentation de 2+ espaces ou 1+ tab
      if (indent >= 2 || matchNumero[1].includes('\t')) {
        // Si on est dans une liste de niveau 1, créer une liste de niveau 2 séparée
        if (typeListeCourante === 'ol' && listeCourante.length > 0) {
          finaliserListe();
          typeListeCourante = 'ol';
          listeCourante = [];
        }
        // Créer une liste de niveau 2
        if (listeNiveau2Courante.length === 0) {
          listeNiveau2Courante.push(texte);
          dansListeNiveau2 = true;
        } else {
          listeNiveau2Courante.push(texte);
        }
      } else {
        // Niveau 1 : pas d'indentation ou 1 espace
        // Finaliser seulement si on change de type de liste (de ul à ol)
        if (typeListeCourante !== null && typeListeCourante !== 'ol') {
          finaliserListe();
        }
        // Finaliser la liste de niveau 2 si on revient au niveau 1
        if (listeNiveau2Courante.length > 0) {
          elements.push({ 
            type: 'ol', 
            items: listeNiveau2Courante,
            niveauListe: 2
          });
          listeNiveau2Courante = [];
          dansListeNiveau2 = false;
        }
        typeListeCourante = 'ol';
        listeCourante.push(texte);
      }
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
 * S'adapte au premier niveau de titre trouvé dans le fichier
 */
export const parseSectionContent = (contenu: string): SectionContent => {
  // Normaliser les retours à la ligne Windows (\r\n) en Unix (\n)
  const lignes = contenu.split(/\r?\n/);
  
  // Détecter le premier niveau de titre pour adapter la hiérarchie
  const niveauBase = detecterPremierNiveauTitre(lignes);
  
  const parties: Partie[] = [];
  let contenuInitial = '';
  let partieCourante: Partie | null = null;
  let sousPartieCourante: SousPartie | null = null;
  let blocCourant: Bloc | null = null;
  let dansContenuInitial = true;

  // Pattern pour les mots-clés US (à exclure des titres de section)
  // Note: "Critères d'acceptation" reste un titre, donc pas exclu
  const usKeywordsPattern = /^#{1,2}\s+(En tant que|Je souhaite|Je veux|Afin de|CA\d+\s*-)/i;
  
  // Fonctions pour détecter les titres selon le niveau de base
  const estPartie = (trimmed: string): boolean => {
    // Exclure les mots-clés US
    if (usKeywordsPattern.test(trimmed)) return false;
    
    if (niveauBase === 1) return trimmed.startsWith('# ') && !trimmed.startsWith('## ');
    if (niveauBase === 2) return trimmed.startsWith('## ') && !trimmed.startsWith('### ');
    return trimmed.startsWith('### ') && !trimmed.startsWith('#### ');
  };
  
  const estSousPartie = (trimmed: string): boolean => {
    // Exclure les mots-clés US
    if (usKeywordsPattern.test(trimmed)) return false;
    
    if (niveauBase === 1) return trimmed.startsWith('## ') && !trimmed.startsWith('### ');
    if (niveauBase === 2) return trimmed.startsWith('### ') && !trimmed.startsWith('#### ');
    return trimmed.startsWith('#### ') && !trimmed.startsWith('##### ');
  };
  
  const estBloc = (trimmed: string): boolean => {
    // Exclure les mots-clés US
    if (usKeywordsPattern.test(trimmed)) return false;
    
    if (niveauBase === 1) return trimmed.startsWith('### ') && !trimmed.startsWith('#### ');
    if (niveauBase === 2) return trimmed.startsWith('#### ') && !trimmed.startsWith('##### ');
    return trimmed.startsWith('##### ');
  };
  
  const extraireTitrePartie = (trimmed: string): string => {
    if (niveauBase === 1) return trimmed.substring(2).trim();
    if (niveauBase === 2) return trimmed.substring(3).trim();
    return trimmed.substring(4).trim();
  };
  
  const extraireTitreSousPartie = (trimmed: string): string => {
    if (niveauBase === 1) return trimmed.substring(3).trim();
    if (niveauBase === 2) return trimmed.substring(4).trim();
    return trimmed.substring(5).trim();
  };
  
  const extraireTitreBloc = (trimmed: string): string => {
    if (niveauBase === 1) return trimmed.substring(4).trim();
    if (niveauBase === 2) return trimmed.substring(5).trim();
    return trimmed.substring(6).trim();
  };

  for (let i = 0; i < lignes.length; i++) {
    const ligne = lignes[i];
    const trimmedLine = ligne.trim();

    if (estPartie(trimmedLine)) {
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
        // Appliquer detecterUserStory sur le contenu de la partie principale aussi
        const contenuPartie = parseMarkdownContent(partieCourante.contenu.trim());
        partieCourante.contenuParse = detecterUserStory(contenuPartie);
        parties.push(partieCourante);
      }

      const titre = extraireTitrePartie(trimmedLine);
      partieCourante = { titre, contenu: '', contenuParse: [], sousParties: [] };
      sousPartieCourante = null;
      blocCourant = null;
    }
    else if (estSousPartie(trimmedLine)) {
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

        const titre = extraireTitreSousPartie(trimmedLine);
        const titreLower = titre.toLowerCase();
        const typeDeContenu = (titreLower === 'prompt' || titreLower === 'résultat technique' || titreLower === 'resultat technique') 
          ? (titreLower === 'prompt' ? 'Prompt' : 'Résultat technique')
          : undefined;
        
        sousPartieCourante = { titre, contenu: '', contenuParse: [], typeDeContenu, blocs: [] };
        blocCourant = null;
      }
    }
    else if (estBloc(trimmedLine)) {
      if (sousPartieCourante) {
        if (blocCourant) {
          blocCourant.contenuParse = parseMarkdownContent(blocCourant.contenu.trim());
          sousPartieCourante.blocs.push(blocCourant);
        }

        const titre = extraireTitreBloc(trimmedLine);
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
    // Appliquer detecterUserStory sur le contenu de la partie principale aussi
    const contenuPartie = parseMarkdownContent(partieCourante.contenu.trim());
    partieCourante.contenuParse = detecterUserStory(contenuPartie);
    parties.push(partieCourante);
  }

  return { contenuInitial: contenuInitial.trim(), parties, niveauBase };
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
    sections.push({ nom, contenu, parties: contenuParse.parties, niveauBase: contenuParse.niveauBase });
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
      fichiers.push({ nom, contenu, parties: contenuParse.parties, niveauBase: contenuParse.niveauBase });
    }
  }

  fichiers.sort((a, b) => a.nom.localeCompare(b.nom));
  dossiers.sort((a, b) => a.nom.localeCompare(b.nom));
  return { fichiers, dossiers };
};
