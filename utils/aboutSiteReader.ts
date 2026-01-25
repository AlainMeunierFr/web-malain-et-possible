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
 * Interface pour le JSON retourné avec la structure complète
 */
export interface AboutSiteStructure {
  chapitres: Chapitre[];
}

/**
 * Interface pour le JSON retourné avec les noms des chapitres (ancienne version, conservée pour compatibilité)
 */
export interface AboutSiteFolders {
  chapitres: string[];
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
    
    // ITÉRATION 1 : Détecter un titre H1
    if (trimmed.startsWith('# ')) {
      throw new ValidationError(
        `Le fichier "${filePath}" contient un titre de niveau 1 (#). Les fichiers MD doivent commencer au niveau 3 (###).`,
        filePath
      );
    }
    
    // ITÉRATION 2 : Détecter un titre H2 (mais pas H3 ou plus)
    if (trimmed.startsWith('## ') && !trimmed.startsWith('### ')) {
      throw new ValidationError(
        `Le fichier "${filePath}" contient un titre de niveau 2 (##). Les fichiers MD doivent commencer au niveau 3 (###).`,
        filePath
      );
    }
    
    // ITÉRATION 3 : Tracker H3 et H4
    if (trimmed.startsWith('### ') && !trimmed.startsWith('#### ')) {
      hasH3 = true;
    } else if (trimmed.startsWith('#### ')) {
      hasH4 = true;
    }
  }
  
  // ITÉRATION 3 : Vérifier si H4 existe sans H3
  if (hasH4 && !hasH3) {
    throw new ValidationError(
      `Le fichier "${filePath}" contient un titre de niveau 4 (####) sans titre de niveau 3 (###). Les sous-parties (####) doivent être dans une partie (###).`,
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
const detecterUserStory = (elements: ContenuElement[], contenuBrut?: string): ContenuElement[] => {
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
      // Si l'URL commence par /api/images/, extraire le nom de fichier
      // Sinon, utiliser l'URL complète
      let imageFilename: string;
      let imageUrl: string | undefined;
      if (url.startsWith('/api/images/')) {
        imageFilename = decodeURIComponent(url.replace(/^\/api\/images\//, ''));
        imageUrl = url; // Garder l'URL complète pour le renderer
      } else if (url.startsWith('/images/')) {
        imageFilename = decodeURIComponent(url.replace(/^\/images\//, ''));
        imageUrl = url.replace('/images/', '/api/images/'); // Convertir en route API
      } else {
        // URL externe ou autre format
        imageFilename = url;
        imageUrl = url;
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

    // Détecter une partie (###) - mais pas ####, #####, ######
    if (trimmedLine.startsWith('### ') && !trimmedLine.startsWith('#### ')) {
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
      const titre = trimmedLine.substring(4).trim(); // Enlever "### "
      partieCourante = {
        titre,
        contenu: '',
        contenuParse: [],
        sousParties: []
      };
      sousPartieCourante = null;
      blocCourant = null;
    }
    // Détecter une sous-partie (####) - mais pas #####, ######
    else if (trimmedLine.startsWith('#### ') && !trimmedLine.startsWith('##### ')) {
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
        const titre = trimmedLine.substring(5).trim(); // Enlever "#### "
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
    // Détecter un bloc (#####) - mais pas ######
    else if (trimmedLine.startsWith('##### ') && !trimmedLine.startsWith('###### ')) {
      if (sousPartieCourante) {
        // Finaliser le bloc précédent si il existe
        if (blocCourant) {
          blocCourant.contenuParse = parseMarkdownContent(blocCourant.contenu.trim());
          sousPartieCourante.blocs.push(blocCourant);
        }

        // Créer un nouveau bloc
        const titre = trimmedLine.substring(6).trim(); // Enlever "##### "
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
 * Lit la structure complète de "A propos de ce site"
 * Retourne un objet JSON avec les chapitres et leurs sections
 * 
 * @throws ValidationError Si les règles métier ne sont pas respectées
 * @returns Objet JSON avec les chapitres et sections
 */
export const readAboutSiteStructure = (): AboutSiteStructure => {
  const aboutSiteDir = path.join(process.cwd(), 'data', 'A propos de ce site');
  
  // Lire les dossiers (chapitres)
  const entries = fs.readdirSync(aboutSiteDir, { withFileTypes: true });
  
  const chapitres: Chapitre[] = [];
  
  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue; // Ignorer les fichiers à la racine
    }

    const chapitreNom = entry.name;
    const chapitreDir = path.join(aboutSiteDir, chapitreNom);
    
    // Lire les fichiers MD (sections) dans ce chapitre
    let sections: Section[] = [];
    
    try {
      const sectionEntries = fs.readdirSync(chapitreDir, { withFileTypes: true });
      
      // Filtrer uniquement les fichiers MD et valider leur contenu
      for (const sectionEntry of sectionEntries) {
        // Ignorer les fichiers non-MD
        if (!sectionEntry.isFile() || !sectionEntry.name.endsWith('.md')) {
          continue;
        }

        const sectionPath = path.join(chapitreDir, sectionEntry.name);
        const contenu = fs.readFileSync(sectionPath, 'utf8');
        
        // Règle 4 : Fichiers MD vides sont considérés comme inexistants
        if (!contenu.trim()) {
          continue; // Ignorer les fichiers vides
        }

        // Règle 1, 2, 3 : Valider le contenu du fichier
        validerContenuMarkdown(contenu, sectionPath);
        
        const nom = sectionEntry.name.replace(/\.md$/, ''); // Enlever l'extension .md
        
        // Parser le contenu pour extraire les parties (###) et sous-parties (####)
        const contenuParse = parseSectionContent(contenu);
        
        sections.push({ 
          nom, 
          contenu,
          parties: contenuParse.parties
        });
      }
      
      // Trier les sections par ordre alphabétique
      sections.sort((a, b) => a.nom.localeCompare(b.nom));
      
      // Règle 6 : Un dossier contenant un seul fichier MD valide doit déclencher une erreur
      if (sections.length === 1) {
        throw new ValidationError(
          `Le chapitre "${chapitreNom}" ne contient qu'une seule section ("${sections[0].nom}"). Un chapitre doit contenir au moins 2 sections. Veuillez créer au moins une deuxième section dans ce chapitre.`,
          chapitreDir
        );
      }
    } catch (error) {
      // Si c'est une ValidationError, la propager
      if (error instanceof ValidationError) {
        throw error;
      }
      // Sinon, ignorer les erreurs de lecture (dossier vide ou inaccessible)
      sections = [];
    }
    
    // Règle 5 : Un dossier ne contenant aucun fichier MD valide n'est pas affiché
    if (sections.length > 0) {
      chapitres.push({
        nom: chapitreNom,
        sections
      });
    }
  }
  
  // Trier les chapitres par ordre alphabétique
  chapitres.sort((a, b) => a.nom.localeCompare(b.nom));
  
  return { chapitres };
};

/**
 * Lit les dossiers contenus dans "A propos de ce site"
 * Retourne un objet JSON avec les noms de chapitres triés par ordre alphabétique
 * 
 * @deprecated Utiliser readAboutSiteStructure() à la place
 * @returns Objet JSON avec les noms des chapitres
 */
export const readAboutSiteFolders = (): AboutSiteFolders => {
  const aboutSiteDir = path.join(process.cwd(), 'data', 'A propos de ce site');
  
  const entries = fs.readdirSync(aboutSiteDir, { withFileTypes: true });
  
  const chapitres = entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort();
  
  return { chapitres };
};
