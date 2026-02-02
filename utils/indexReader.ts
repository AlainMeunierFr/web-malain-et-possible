/**
 * Backend pur : Lecture du fichier JSON index.json
 * Cette logique est réutilisable et testable en ligne de commande
 */

import fs from 'fs';
import path from 'path';
import { readCompetences, readDomaines, readAutres } from './bibliothequeReader';
import { resolvePageReferences } from './profilBuilder';

/**
 * Types d'éléments de contenu de page (ordre aligné avec les interfaces ci-dessous)
 */
export type TypeElementContenu = 'titre' | 'titreDePage' | 'video' | 'texteLarge' | 'domaineDeCompetence' | 'competence' | 'experienceEtApprentissage' | 'listeDesExperiencesEtApprentissage' | 'callToAction' | 'groupeDeBoutons' | 'bouton' | 'listeDesPages' | 'listeDeDetournementsVideo' | 'detournementVideo' | 'listeDeTemoignages' | 'temoignage' | 'hero' | 'profil' | 'listeDeProfils';

/** titre */
export interface ElementTitre {
  type: 'titre';
  texte: string;
}

/** titreDePage */
export interface ElementTitreDePage {
  type: 'titreDePage';
  texte: string;
}

/** video */
export interface ElementVideo {
  type: 'video';
  urlYouTube: string;
  lancementAuto: boolean;
}

/** texteLarge */
export interface ElementTexteLarge {
  type: 'texteLarge';
  texte: string;
}

/** competence (item dans domaineDeCompetence.items) */
export interface ElementCompetence {
  type: 'competence';
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
    e2eID?: string | null;
  } | null;
}

/** experienceEtApprentissage (item dans domaineDeCompetence.experiences ; même relation que competence pour domaineDeCompetence) */
export interface ExperienceEtApprentissage {
  type: 'experienceEtApprentissage';
  id: string;
  /** Libellé métier (ex. "Expériences et apprentissages"), issu du JSON "type" */
  categorie?: string;
  description: string;
  periode: string | null;
}

/** Liste d’expériences et apprentissages (type pour domaineDeCompetence.experiences) */
export type ListeDeExperiencesEtApprentissages = ExperienceEtApprentissage[];

/** listeDesExperiencesEtApprentissage (conteneur logique pour domaineDeCompetence.experiences ; utilisé en mode lecture) */
export interface ElementListeDesExperiencesEtApprentissage {
  type: 'listeDesExperiencesEtApprentissage';
  experiences: ExperienceEtApprentissage[];
}

/** domaineDeCompetence */
export interface ElementDomaineDeCompetence {
  type: 'domaineDeCompetence';
  titre: string;
  contenu: string;
  auteur?: string; // Auteur optionnel de la citation/contenu
  items: ElementCompetence[];
  /** Expériences et apprentissages associés au domaine */
  experiences?: ListeDeExperiencesEtApprentissages;
}

/** callToAction */
export interface ElementCallToAction {
  type: 'callToAction';
  action: string; // Texte du bouton
  e2eID?: string | null; // e2eID optionnel depuis le JSON
}

/** bouton (item dans groupeDeBoutons.boutons) */
export interface ElementBoutonDeGroupe {
  type: 'bouton';
  id: string;
  icone: string; // Nom de l'icône lucide-react (ex: "Mail", "Youtube")
  texte: string | null; // Texte optionnel (null pour taille "petite")
  url: string | null;
  command: string | null; // Commande optionnelle pour navigation interne
  e2eID?: string | null; // e2eID optionnel depuis le JSON (ex: "b4", "b5")
}

/** groupeDeBoutons */
export interface ElementGroupeDeBoutons {
  type: 'groupeDeBoutons';
  taille: 'petite' | 'grande';
  boutons: ElementBoutonDeGroupe[];
}

/** Élément page dans la liste (plan-du-site.json), rempli par le script update-site-map. */
export interface PagePlanDuSite {
  url: string;
  titre: string;
  zone?: string;
  dessiner?: string;
}

/** listeDesPages — les pages viennent du JSON (plan-du-site.json), rempli par le script update-site-map. */
export interface ElementListeDesPages {
  type: 'listeDesPages';
  /** Liste des pages à afficher (injectée par le script qui met à jour le plan du site). */
  pages?: PagePlanDuSite[];
}

/** detournementVideo (item dans listeDeDetournementsVideo.items ; contient videoDetournee + videoOriginale) */
export interface ElementDetournementVideo {
  type: 'detournementVideo';
  /** Titre du client / pour le compte de (affiché en tête de chaque détournement) */
  titre: string;
  id?: number;
  titreVideoDetournee: string;
  videoDetournee: string; // ID ou URL YouTube
  titreVideoOriginale: string;
  videoOriginale: string; // ID ou URL YouTube
  date: string; // ex: "30/3/2023"
  pitch?: string;
  droitsAuteur?: string;
  linkedin?: string;
}

/** listeDeDetournementsVideo */
export interface ElementListeDeDetournementsVideo {
  type: 'listeDeDetournementsVideo';
  items: ElementDetournementVideo[];
}

/** temoignage (item dans listeDeTemoignages.items) */
export interface ElementTemoignage {
  type: 'temoignage';
  nom: string;
  fonction: string;
  photo: string;
  temoignage: string;
}

/** listeDeTemoignages */
export interface ElementListeDeTemoignages {
  type: 'listeDeTemoignages';
  items: ElementTemoignage[];
}

/** profil (item dans hero.profils ou listeDeProfils.profils) */
export interface ElementProfil {
  type: 'profil';
  titre: string;
  jobTitles: string[];
  slug: string;
  route: string;
  cvPath: string;
}

/** Vidéo embarquée (propriété de hero ou bloc standalone). */
export interface HeroVideoData {
  urlYouTube: string;
  lancementAuto?: boolean;
  e2eID?: string;
}

/** hero */
export interface ElementHero {
  type: 'hero';
  titre: string;
  sousTitre: string;
  description: string;
  callToAction: {
    texte: string;
    action: string;
  };
  /** Vidéo affichée à droite (hero.droite) ; nom canonique hero.video. */
  video?: HeroVideoData;
  /** URL interne vers la page "Mes profils" (ex. lien "Télécharger mon CV"). */
  ensavoirplus: string;
}

/** listeDeProfils */
export interface ElementListeDeProfils {
  type: 'listeDeProfils';
  profils: ElementProfil[];
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
  | ElementListeDesExperiencesEtApprentissage
  | ElementCallToAction
  | ElementGroupeDeBoutons
  | ElementListeDesPages
  | ElementListeDeDetournementsVideo
  | ElementListeDeTemoignages
  | ElementHero
  | ElementListeDeProfils
  | ElementProfil;

/**
 * Interface pour la structure "contenu de page"
 */
export interface ContenuPage {
  contenu: ElementContenu[];
}

/**
 * Structure complète du fichier index.json (ancienne structure pour compatibilité).
 * Les domaines n'ont pas le champ discriminant "type" dans le JSON.
 */
export interface IndexData {
  domainesDeCompetences: Omit<ElementDomaineDeCompetence, 'type'>[];
}

/**
 * Metadata SEO pour une page (stockées dans les JSON)
 */
export interface PageMetadata {
  title: string;
  description: string;
  ogType?: 'website' | 'profile' | 'article';
  ogImage?: string;
  keywords?: string[];
}

/**
 * Interface pour la nouvelle structure "contenu de page"
 */
export interface PageData {
  metadata?: PageMetadata;
  contenu: ElementContenu[];
}

/**
 * Convertit l'ancienne structure (IndexData) en nouvelle structure (PageData) pour compatibilité ascendante
 */
export const convertirIndexDataEnPageData = (indexData: IndexData): PageData => {
  const contenu: ElementContenu[] = indexData.domainesDeCompetences.map((domaine): ElementDomaineDeCompetence => ({
    type: 'domaineDeCompetence',
    titre: domaine.titre,
    contenu: domaine.contenu,
    auteur: domaine.auteur,
    items: domaine.items,
    experiences: domaine.experiences,
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
      
      // Portfolio détournements : élément avec clé "detournementVideo" (tableau) sans type → listeDeDetournementsVideo
      if ('detournementVideo' in elementAny && Array.isArray(elementAny.detournementVideo) && elementAny.type !== 'listeDeDetournementsVideo') {
        const items = (elementAny.detournementVideo as any[]).map((d: any) =>
          d.type != null ? d : { type: 'detournementVideo' as const, ...d }
        );
        return { type: 'listeDeDetournementsVideo' as const, items };
      }
      
      if (element.type === 'domaineDeCompetence') {
        // Si l'élément a "competences" au lieu de "items", le mapper
        if ('competences' in elementAny && !('items' in elementAny) && !('ref' in elementAny)) {
          const items = (elementAny.competences as any[]).map((c: any) =>
            c.type != null ? c : { type: 'competence', ...c }
          );
          return {
            ...element,
            items,
          } as ElementDomaineDeCompetence;
        }
        // Si items existe sans type sur les compétences, normaliser
        if ('items' in elementAny && Array.isArray(elementAny.items)) {
          const items = elementAny.items.map((c: any) =>
            c.type != null ? c : { type: 'competence', ...c }
          );
          let out: any = { ...element, items };
          // Normaliser experiences (discriminant experienceEtApprentissage) si présentes
          if ('experiences' in elementAny && Array.isArray(elementAny.experiences)) {
            out.experiences = elementAny.experiences.map((e: any) =>
              e.type === 'experienceEtApprentissage' ? e : { type: 'experienceEtApprentissage', id: e.id ?? '', categorie: e.type ?? e.categorie, description: e.description, periode: e.periode ?? null }
            );
          }
          return out as ElementDomaineDeCompetence;
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
              // Pour listeDeTemoignages / listeDeDetournementsVideo, ajouter le discriminant type si absent (JSON source sans type)
              const items =
                element.type === 'listeDeTemoignages'
                  ? sourceElement.items.map((item: any) => (item.type != null ? item : { type: 'temoignage', ...item }))
                  : element.type === 'listeDeDetournementsVideo'
                    ? sourceElement.items.map((item: any) => (item.type != null ? item : { type: 'detournementVideo', ...item }))
                    : sourceElement.items;
              return {
                ...element,
                items,
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

/**
 * Retourne les données de la page Mes Profils (US-7.12).
 * Source unique : data/mes-profils.json (profils + CTA Discutons + texteLarge).
 * Les profils et texteLarge ont été retirés de index.json (home allégée).
 */
export const buildMesProfilsPageData = (): PageData => {
  return readPageData('mes-profils.json');
};
