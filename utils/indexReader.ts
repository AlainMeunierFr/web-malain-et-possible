/**
 * Backend pur : Lecture du fichier JSON index.json
 * Cette logique est réutilisable et testable en ligne de commande
 */

import fs from 'fs';
import path from 'path';
import { readCompetences, readDomaines, readAutres, type AutreElement } from './bibliothequeReader';
import { resolvePageReferences } from './profilBuilder';

/**
 * Interface pour une Compétence
 */
export interface Competence {
  titre: string;
  image?: {
    src: string;
    alt: string;
  };
  icon?: string; // Nom de l'icône lucide-react (ex: "Rocket", "Globe")
  description: string;
  auteur?: string; // Auteur optionnel de la citation
  bouton: {
    texte: string;
    action: string;
  } | null;
}

/**
 * Interface pour un Domaine de compétences
 */
export interface DomaineDeCompetences {
  titre: string;
  contenu: string;
  auteur?: string; // Auteur optionnel de la citation/contenu
  items: Competence[];
  experiences?: AutreElement[]; // Expériences associées au domaine
}

/**
 * Types d'éléments de contenu de page
 */
export type TypeElementContenu = 'titre' | 'titreDePage' | 'video' | 'texteLarge' | 'domaineDeCompetence' | 'callToAction' | 'groupeBoutons' | 'listeDesPages' | 'videoDetournement' | 'temoignages' | 'hero' | 'profil';

/**
 * Interface pour un élément de type "Titre"
 */
export interface ElementTitre {
  type: 'titre';
  texte: string;
}

/**
 * Interface pour un élément de type "Titre de Page" (affiché dans le header)
 */
export interface ElementTitreDePage {
  type: 'titreDePage';
  texte: string;
}

/**
 * Interface pour un élément de type "Vidéo"
 */
export interface ElementVideo {
  type: 'video';
  urlYouTube: string;
  lancementAuto: boolean;
}

/**
 * Interface pour un élément de type "Texte large"
 */
export interface ElementTexteLarge {
  type: 'texteLarge';
  texte: string;
}

/**
 * Interface pour un élément de type "Domaine de compétences"
 */
export interface ElementDomaineDeCompetence {
  type: 'domaineDeCompetence';
  titre: string;
  contenu: string;
  auteur?: string; // Auteur optionnel de la citation/contenu
  items: Competence[];
  experiences?: AutreElement[]; // Expériences associées au domaine
}

/**
 * Interface pour un élément de type "Call to Action"
 */
export interface ElementCallToAction {
  type: 'callToAction';
  action: string; // Texte du bouton
  e2eID?: string | null; // e2eID optionnel depuis le JSON
}

/**
 * Interface pour un bouton dans un groupe de boutons
 */
export interface BoutonGroupe {
  id: string;
  icone: string; // Nom de l'icône lucide-react (ex: "Mail", "Youtube")
  texte: string | null; // Texte optionnel (null pour taille "petite")
  url: string | null;
  command: string | null; // Commande optionnelle pour navigation interne
}

/**
 * Interface pour un élément de type "Groupe de boutons"
 */
export interface ElementGroupeBoutons {
  type: 'groupeBoutons';
  taille: 'petite' | 'grande';
  boutons: BoutonGroupe[];
}

/**
 * Interface pour un élément de type "Liste des pages"
 */
export interface ElementListeDesPages {
  type: 'listeDesPages';
}

/**
 * Interface pour un élément de type "Vidéo détournement"
 */
export interface ElementVideoDetournement {
  type: 'videoDetournement';
  items: any[]; // Structure flexible pour les détournements
}

/**
 * Interface pour un témoignage
 */
export interface Temoignage {
  nom: string;
  fonction: string;
  photo: string;
  temoignage: string;
}

/**
 * Interface pour un élément de type "Témoignages"
 */
export interface ElementTemoignages {
  type: 'temoignages';
  items: Temoignage[];
}

/**
 * Interface pour un profil dans la HERO
 */
export interface Profil {
  type: 'profil';
  titre: string;
  jobTitles: string[];
  slug: string;
  route: string;
  cvPath: string;
}

/**
 * Interface pour un élément de type "Hero"
 */
export interface ElementHero {
  type: 'hero';
  titre: string;
  sousTitre: string;
  description: string;
  boutonPrincipal: {
    texte: string;
    action: string;
  };
  profils: Profil[];
}

/**
 * Union type pour tous les éléments de contenu
 */
export type ElementContenu = 
  | ElementTitre 
  | ElementTitreDePage
  | ElementVideo 
  | ElementTexteLarge 
  | ElementDomaineDeCompetence
  | ElementCallToAction
  | ElementGroupeBoutons
  | ElementListeDesPages
  | ElementVideoDetournement
  | ElementTemoignages
  | ElementHero
  | Profil;

/**
 * Interface pour la structure "contenu de page"
 */
export interface ContenuPage {
  contenu: ElementContenu[];
}

/**
 * Interface pour la structure complète du fichier index.json (ancienne structure pour compatibilité)
 */
export interface IndexData {
  domainesDeCompetences: DomaineDeCompetences[];
}

/**
 * Interface pour la nouvelle structure "contenu de page"
 */
export interface PageData {
  contenu: ElementContenu[];
}

/**
 * Convertit l'ancienne structure (IndexData) en nouvelle structure (PageData) pour compatibilité ascendante
 */
export const convertirIndexDataEnPageData = (indexData: IndexData): PageData => {
  const contenu: ElementContenu[] = indexData.domainesDeCompetences.map(domaine => ({
    type: 'domaineDeCompetence',
    titre: domaine.titre,
    contenu: domaine.contenu,
    items: domaine.items,
  }));

  return { contenu };
};

/**
 * Lit le fichier index.json et retourne les données (ancienne structure pour compatibilité)
 */
export const readIndexData = (): IndexData => {
  const indexPath = path.join(process.cwd(), 'data', 'index.json');
  
  if (!fs.existsSync(indexPath)) {
    throw new Error(`Le fichier index.json n'existe pas dans le dossier data/`);
  }

  const fileContent = fs.readFileSync(indexPath, 'utf8');
  const data: IndexData = JSON.parse(fileContent);

  return data;
};

/**
 * Lit le fichier JSON et retourne les données en structure "contenu de page"
 * Supporte à la fois l'ancienne structure (domainesDeCompetences) et la nouvelle (contenu)
 */
export const readPageData = (filename: string = 'index.json'): PageData => {
  const filePath = path.join(process.cwd(), 'data', filename);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`Le fichier ${filename} n'existe pas dans le dossier data/`);
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContent);

  // Si c'est l'ancienne structure (domainesDeCompetences), on la convertit
  if ('domainesDeCompetences' in data && !('contenu' in data)) {
    return convertirIndexDataEnPageData(data as IndexData);
  }

  // Normaliser la nouvelle structure : convertir "competences" en "items" pour les domaines de compétences
  const pageData = data as PageData;
  if (pageData.contenu && Array.isArray(pageData.contenu)) {
    pageData.contenu = pageData.contenu.map((element) => {
      const elementAny = element as any;
      
      if (element.type === 'domaineDeCompetence') {
        // Si l'élément a "competences" au lieu de "items", le mapper
        if ('competences' in elementAny && !('items' in elementAny) && !('ref' in elementAny)) {
          return {
            ...element,
            items: elementAny.competences,
          } as ElementDomaineDeCompetence;
        }
      }
      
      // Si l'élément a une propriété "source" (ex: temoignages), charger le fichier externe
      if ('source' in elementAny && typeof elementAny.source === 'string') {
        const sourceFile = elementAny.source;
        const sourcePath = path.join(process.cwd(), 'data', sourceFile);
        
        if (fs.existsSync(sourcePath)) {
          const sourceContent = fs.readFileSync(sourcePath, 'utf8');
          const sourceData = JSON.parse(sourceContent);
          
          // Si le fichier source contient un élément du même type, utiliser ses items
          if (sourceData.contenu && Array.isArray(sourceData.contenu)) {
            const sourceElement = sourceData.contenu.find((el: any) => el.type === element.type);
            if (sourceElement && sourceElement.items) {
              return {
                ...element,
                items: sourceElement.items,
              };
            }
          }
        }
      }
      
      return element;
    });
  }

  // Détecter si la page contient des références vers la bibliothèque
  const hasReferences = pageData.contenu && pageData.contenu.some((element) => {
    if (element.type === 'domaineDeCompetence') {
      const elementAny = element as any;
      return 'ref' in elementAny && typeof elementAny.ref === 'string';
    }
    return false;
  });

  // Si la page contient des références, les résoudre
  if (hasReferences) {
    try {
      const competences = readCompetences();
      const domaines = readDomaines();
      const autres = readAutres();
      const resolved = resolvePageReferences(pageData, competences, domaines, autres);
      // Vérifier que les références ont bien été résolues
      const stillHasRefs = resolved.contenu.some((element) => {
        if (element.type === 'domaineDeCompetence') {
          const elementAny = element as any;
          return 'ref' in elementAny && typeof elementAny.ref === 'string';
        }
        return false;
      });
      if (stillHasRefs) {
        console.error(`Des références n'ont pas été résolues pour ${filename}`);
      }
      return resolved;
    } catch (error) {
      // Si la bibliothèque n'existe pas encore, continuer sans résolution (compatibilité ascendante)
      console.error(`Impossible de résoudre les références pour ${filename}:`, error);
      // Ne pas retourner pageData avec des refs non résolues, cela rendrait la page vide
      throw error;
    }
  }

  return pageData;
};

/**
 * Lit un fichier JSON de domaine de compétences et retourne les données
 * @param filename Nom du fichier JSON (ex: "transformation.json")
 */
export const readDomaineData = (filename: string): IndexData => {
  const filePath = path.join(process.cwd(), 'data', filename);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`Le fichier ${filename} n'existe pas dans le dossier data/`);
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const data: IndexData = JSON.parse(fileContent);

  return data;
};
