/**
 * Spec canonique : ordre de rendu, type hiérarchique, container parent et container layout par nom canonique.
 * 4 colonnes : nomCanonique, typeHierarchique, containerParent, containerLayout.
 * Convention : suffixe .cont pour les identifiants de container.
 */

/** Entrée de spec : 5 colonnes alignées sur le tableau canonique. */
export interface CanonicalSpecEntry {
  nomCanonique: string;
  typeHierarchique: string;
  /** Container parent ; null ou vide = racine (ex. page a containerParent "body"). */
  containerParent: string | null;
  /** Container layout (référence du container .cont) ; vide pour le contenu non container. */
  containerLayout: string | null;
  /** Attribut data-layout pour le CSS (grilles, colonnes, etc.) ; null si aucun. */
  dataLayout?: string | null;
}

/**
 * Liste de base : ordre logique sans containers implicites.
 * Chaque propriété (non --c) reçoit un container implicite [nomCanonique].cont via expandWithImplicitContainers.
 */
const CANONICAL_SPEC_ORDER_BASE: CanonicalSpecEntry[] = [
  { nomCanonique: 'header', typeHierarchique: '--c', containerParent: 'boby.count', containerLayout: 'header' },
  { nomCanonique: 'titreDePage.texte', typeHierarchique: '--h1', containerParent: 'header', containerLayout: null },
  { nomCanonique: 'page', typeHierarchique: '--c', containerParent: 'body', containerLayout: 'boby.count' },
  { nomCanonique: 'listeDesPages', typeHierarchique: '--c', containerParent: 'boby.count', containerLayout: 'listeDesPages.cont', dataLayout: 'draw with page properties' },
  { nomCanonique: 'listeDesPages.page', typeHierarchique: '--l1', containerParent: 'listeDesPages', containerLayout: null },
  { nomCanonique: 'hero', typeHierarchique: '--c', containerParent: 'boby.count', containerLayout: 'hero.cont', dataLayout: '2 columns' },
  { nomCanonique: 'hero.gauche', typeHierarchique: '--c', containerParent: 'hero.cont', containerLayout: 'hero.gauche.cont' },
  { nomCanonique: 'hero.titre', typeHierarchique: '--h1', containerParent: 'hero.gauche.cont', containerLayout: null },
  { nomCanonique: 'hero.sousTitre', typeHierarchique: '--st', containerParent: 'hero.gauche.cont', containerLayout: null },
  { nomCanonique: 'hero.description', typeHierarchique: '--p', containerParent: 'hero.gauche.cont', containerLayout: null },
  { nomCanonique: 'hero.callToAction', typeHierarchique: '--b', containerParent: 'hero.gauche.cont', containerLayout: null },
  { nomCanonique: 'hero.ensavoirplus', typeHierarchique: '--lk', containerParent: 'hero.gauche.cont', containerLayout: null },
  { nomCanonique: 'hero.droite', typeHierarchique: '--c', containerParent: 'hero.cont', containerLayout: 'hero.droite.cont' },
  { nomCanonique: 'hero.video', typeHierarchique: '--v', containerParent: 'hero.droite.cont', containerLayout: null },
  { nomCanonique: 'listeDeProfils', typeHierarchique: '--c', containerParent: 'boby.count', containerLayout: 'listeDeProfils.cont', dataLayout: '4 columns x 1 row' },
  { nomCanonique: 'profil', typeHierarchique: '--c', containerParent: 'listeDeProfils.cont', containerLayout: 'profil.cont' },
  { nomCanonique: 'profil.titre', typeHierarchique: '--h2', containerParent: 'profil.cont', containerLayout: null },
  { nomCanonique: 'profil.jobTitles', typeHierarchique: '--n', containerParent: 'profil.cont', containerLayout: null },
  { nomCanonique: 'profil.jobTitle', typeHierarchique: '--l1', containerParent: 'profil.cont', containerLayout: null },
  { nomCanonique: 'profil.slug', typeHierarchique: '--m', containerParent: 'profil.cont', containerLayout: null },
  { nomCanonique: 'profil.route', typeHierarchique: '--b', containerParent: 'profil.cont', containerLayout: null },
  { nomCanonique: 'profil.cvPath', typeHierarchique: '--lk', containerParent: 'profil.cont', containerLayout: null },
  { nomCanonique: 'titre.texte', typeHierarchique: '--h2', containerParent: 'boby.count', containerLayout: null },
  { nomCanonique: 'video.urlYouTube', typeHierarchique: '--v', containerParent: 'boby.count', containerLayout: null },
  { nomCanonique: 'listeDeTemoignages', typeHierarchique: '--c', containerParent: 'boby.count', containerLayout: 'listeDeTemoignages.cont', dataLayout: '2 columns x N rows' },
  { nomCanonique: 'temoignage', typeHierarchique: '--c', containerParent: 'listeDeTemoignages.cont', containerLayout: 'temoignage.cont' },
  { nomCanonique: 'temoignage.temoin', typeHierarchique: '--c', containerParent: 'temoignage.cont', containerLayout: 'temoignage.temoin.cont' },
  { nomCanonique: 'temoignage.temoin.photo', typeHierarchique: '--c', containerParent: 'temoignage.temoin.cont', containerLayout: 'temoignage.temoin.photo.cont' },
  { nomCanonique: 'temoignage.photo', typeHierarchique: '--photo', containerParent: 'temoignage.temoin.photo.cont', containerLayout: null },
  { nomCanonique: 'temoignage.temoin.texte', typeHierarchique: '--c', containerParent: 'temoignage.temoin.cont', containerLayout: 'temoignage.temoin.texte.cont' },
  { nomCanonique: 'temoignage.nom', typeHierarchique: '--h3', containerParent: 'temoignage.temoin.texte.cont', containerLayout: null },
  { nomCanonique: 'temoignage.fonction', typeHierarchique: '--n', containerParent: 'temoignage.temoin.texte.cont', containerLayout: null },
  { nomCanonique: 'temoignage.temoignage', typeHierarchique: '--p', containerParent: 'temoignage.cont', containerLayout: null },
  { nomCanonique: 'domaineDeCompetence', typeHierarchique: '--c', containerParent: 'boby.count', containerLayout: 'domaineDeCompetence.cont' },
  { nomCanonique: 'domaineDeCompetence.header', typeHierarchique: '--c', containerParent: 'domaineDeCompetence.cont', containerLayout: 'domaineDeCompetence.header.cont' },
  { nomCanonique: 'domaineDeCompetence.titre', typeHierarchique: '--h2', containerParent: 'domaineDeCompetence.header.cont', containerLayout: null },
  { nomCanonique: 'domaineDeCompetence.contenu', typeHierarchique: '--p', containerParent: 'domaineDeCompetence.header.cont', containerLayout: null },
  { nomCanonique: 'domaineDeCompetence.auteur', typeHierarchique: '--a', containerParent: 'domaineDeCompetence.header.cont', containerLayout: null },
  { nomCanonique: 'domaineDeCompetence.competences', typeHierarchique: '--c', containerParent: 'domaineDeCompetence.cont', containerLayout: 'domaineDeCompetence.competences.cont', dataLayout: '3 columns x 1 row' },
  { nomCanonique: 'competence', typeHierarchique: '--c', containerParent: 'domaineDeCompetence.competences.cont', containerLayout: 'competence.cont' },
  { nomCanonique: 'competence.titre', typeHierarchique: '--h3', containerParent: 'competence.cont', containerLayout: null },
  { nomCanonique: 'competence.image.src', typeHierarchique: '--img', containerParent: 'competence.cont', containerLayout: null },
  { nomCanonique: 'competence.image.alt', typeHierarchique: '--n', containerParent: 'competence.cont', containerLayout: null },
  { nomCanonique: 'competence.description', typeHierarchique: '--p', containerParent: 'competence.cont', containerLayout: null },
  { nomCanonique: 'competence.auteur', typeHierarchique: '--a', containerParent: 'competence.cont', containerLayout: null },
  { nomCanonique: 'competence.bouton.action', typeHierarchique: '--lk', containerParent: 'competence.cont', containerLayout: null },
  { nomCanonique: 'listeDesExperiencesEtApprentissages', typeHierarchique: '--c', containerParent: 'boby.count', containerLayout: 'listeDesExperiencesEtApprentissages.cont', dataLayout: 'accordeon, X rows' },
  { nomCanonique: 'listeDesExperiencesEtApprentissages.titre', typeHierarchique: '--h4', containerParent: 'listeDesExperiencesEtApprentissages.cont', containerLayout: null },
  { nomCanonique: 'experienceEtApprentissage', typeHierarchique: '--c', containerParent: 'listeDesExperiencesEtApprentissages.cont', containerLayout: 'experienceEtApprentissage.cont' },
  { nomCanonique: 'experienceEtApprentissage.categorie', typeHierarchique: '--m', containerParent: 'experienceEtApprentissage.cont', containerLayout: null },
  { nomCanonique: 'experienceEtApprentissage.description', typeHierarchique: '--n', containerParent: 'experienceEtApprentissage.cont', containerLayout: null },
  { nomCanonique: 'experienceEtApprentissage.periode', typeHierarchique: '--m', containerParent: 'experienceEtApprentissage.cont', containerLayout: null },
  { nomCanonique: 'texteLarge.texte', typeHierarchique: '--p', containerParent: 'boby.count', containerLayout: null },
  { nomCanonique: 'callToAction.action', typeHierarchique: '--b', containerParent: 'boby.count', containerLayout: null },
  { nomCanonique: 'groupeDeBoutons', typeHierarchique: '--c', containerParent: 'boby.count', containerLayout: 'groupeDeBoutons.cont', dataLayout: '1 column, centered' },
  { nomCanonique: 'bouton', typeHierarchique: '--c', containerParent: 'groupeDeBoutons.cont', containerLayout: 'bouton.cont' },
  { nomCanonique: 'bouton.command', typeHierarchique: '--lk', containerParent: 'bouton.cont', containerLayout: null },
  { nomCanonique: 'listeDeDetournementsVideo', typeHierarchique: '--c', containerParent: 'boby.count', containerLayout: 'listeDeDetournementsVideo.cont', dataLayout: 'X rows' },
  { nomCanonique: 'detournementVideo', typeHierarchique: '--c', containerParent: 'listeDeDetournementsVideo.cont', containerLayout: 'detournementVideo.cont' },
  { nomCanonique: 'detournementVideo.header', typeHierarchique: '--c', containerParent: 'detournementVideo.cont', containerLayout: 'detournementVideo.header.cont' },
  { nomCanonique: 'detournementVideo.titre', typeHierarchique: '--h2', containerParent: 'detournementVideo.header.cont', containerLayout: null },
  { nomCanonique: 'detournementVideo.pitch', typeHierarchique: '--p', containerParent: 'detournementVideo.header.cont', containerLayout: null },
  { nomCanonique: 'detournementVideo.date', typeHierarchique: '--n', containerParent: 'detournementVideo.header.cont', containerLayout: null },
  { nomCanonique: 'detournementVideo.videos', typeHierarchique: '--c', containerParent: 'detournementVideo.cont', containerLayout: 'detournementVideo.videos.cont' },
  { nomCanonique: 'detournementVideo.videoDetournee', typeHierarchique: '--c', containerParent: 'detournementVideo.videos.cont', containerLayout: 'detournementVideo.videoDetournee.cont' },
  { nomCanonique: 'detournementVideo.titreVideoDetournee', typeHierarchique: '--h3', containerParent: 'detournementVideo.videoDetournee.cont', containerLayout: null },
  { nomCanonique: 'detournementVideo.sourceVideoDetournee', typeHierarchique: '--p', containerParent: 'detournementVideo.videoDetournee.cont', containerLayout: null },
  { nomCanonique: 'detournementVideo.videoDetournee', typeHierarchique: '--v', containerParent: 'detournementVideo.videoDetournee.cont', containerLayout: null },
  { nomCanonique: 'detournementVideo.droitsAuteur', typeHierarchique: '--n', containerParent: 'detournementVideo.videoDetournee.cont', containerLayout: null },
  { nomCanonique: 'detournementVideo.linkedin', typeHierarchique: '--n', containerParent: 'detournementVideo.videoDetournee.cont', containerLayout: null },
  { nomCanonique: 'detournementVideo.videoOriginale', typeHierarchique: '--c', containerParent: 'detournementVideo.videos.cont', containerLayout: 'detournementVideo.videoOriginale.cont' },
  { nomCanonique: 'detournementVideo.titreVideoOriginale', typeHierarchique: '--h3', containerParent: 'detournementVideo.videoOriginale.cont', containerLayout: null },
  { nomCanonique: 'detournementVideo.sourceVideoOriginale', typeHierarchique: '--p', containerParent: 'detournementVideo.videoOriginale.cont', containerLayout: null },
  { nomCanonique: 'detournementVideo.videoOriginale', typeHierarchique: '--v', containerParent: 'detournementVideo.videoOriginale.cont', containerLayout: null },
];

/**
 * Insère un container implicite [nomCanonique].cont avant chaque entrée qui n'est pas déjà un container (--c).
 * Chaque propriété (h1, h2, p, --lk, etc.) est ainsi enveloppée dans un container dédié.
 */
function expandWithImplicitContainers(entries: CanonicalSpecEntry[]): CanonicalSpecEntry[] {
  const result: CanonicalSpecEntry[] = [];
  for (const e of entries) {
    if (e.typeHierarchique === '--c') {
      result.push({ ...e });
    } else {
      const contName = e.nomCanonique + '.cont';
      result.push({
        nomCanonique: contName,
        typeHierarchique: '--c',
        containerParent: e.containerParent,
        containerLayout: contName,
        dataLayout: e.dataLayout, // Préserver le dataLayout sur le container implicite
      });
      result.push({
        ...e,
        containerParent: contName,
        containerLayout: null,
        dataLayout: undefined, // Le dataLayout est sur le container, pas sur le contenu
      });
    }
  }
  return result;
}

/** Liste ordonnée : spec pour l'ordre du rendu (avec containers implicites [nom].cont pour chaque propriété). */
export const CANONICAL_SPEC_ORDER: CanonicalSpecEntry[] = expandWithImplicitContainers(CANONICAL_SPEC_ORDER_BASE);

/** Spec des répétiteurs : libellé à afficher + type hiérarchique (mode lecture). */
export interface RepeaterSpecEntry {
  libelle: string;
  typeHierarchique: string;
}

export const REPEATER_SPEC: Record<string, RepeaterSpecEntry> = {
  listeDeDetournementsVideo: { libelle: 'Détournements vidéo', typeHierarchique: '--h2' },
  listeDeTemoignages: { libelle: 'Témoignages', typeHierarchique: '--h2' },
  listeDeProfils: { libelle: 'Mes profils professionnels', typeHierarchique: '--m' },
  listeDesExperiencesEtApprentissage: { libelle: 'Expériences et apprentissages', typeHierarchique: '--h4' },
  groupeDeBoutons: { libelle: 'Actions', typeHierarchique: '--m' },
  listeDesPages: { libelle: 'Liste des pages', typeHierarchique: '--m' },
};

/**
 * Retourne la spec d'un répétiteur (libellé + type hiérarchique) ou undefined.
 */
export function getRepeaterSpec(type: string): RepeaterSpecEntry | undefined {
  return REPEATER_SPEC[type];
}

/**
 * Retourne les entrées de la spec qui sont des containers de page (à émettre en tête de chaque page en mode lecture).
 */
export function getPageContainerSpecEntries(): CanonicalSpecEntry[] {
  return CANONICAL_SPEC_ORDER.filter((e) => e.nomCanonique === 'page');
}

/** Noms canoniques dont la valeur est du markdown (paragraphes, listes, gras, italique). */
const NOM_CANONIQUES_MARKDOWN = new Set([
  'hero.description',
  'texteLarge.texte',
  'competence.description',
  'experienceEtApprentissage.description',
  'temoignage.temoignage',
  'detournementVideo.pitch',
  'domaineDeCompetence.contenu',
]);

export function isMarkdownContent(nomCanonique: string): boolean {
  return NOM_CANONIQUES_MARKDOWN.has(nomCanonique);
}

/**
 * Préfixe ou nom exact pour filtrer la spec par type d'élément.
 * Pour un type "hero", on matche les entrées dont nomCanonique === 'hero' ou nomCanonique.startsWith('hero.').
 */
const SPEC_PREFIX_BY_TYPE: Record<string, string> = {
  titreDePage: 'titreDePage.',
  page: 'page',
  listeDesPages: 'listeDesPages',
  hero: 'hero',
  listeDeProfils: 'listeDeProfils',
  profil: 'profil',
  titre: 'titre.',
  video: 'video.',
  listeDeTemoignages: 'listeDeTemoignages',
  temoignage: 'temoignage',
  domaineDeCompetence: 'domaineDeCompetence',
  competence: 'competence',
  listeDesExperiencesEtApprentissage: 'listeDesExperiencesEtApprentissage.',
  experienceEtApprentissage: 'experienceEtApprentissage.',
  texteLarge: 'texteLarge.',
  callToAction: 'callToAction.',
  groupeDeBoutons: 'groupeDeBoutons',
  bouton: 'bouton',
  listeDeDetournementsVideo: 'listeDeDetournementsVideo',
  detournementVideo: 'detournementVideo',
};

/**
 * Retourne les entrées de la spec qui s'appliquent à un type d'élément, dans l'ordre.
 * Match : nomCanonique === prefix ou nomCanonique.startsWith(prefix + '.').
 */
export function getSpecEntriesForType(elementType: string): CanonicalSpecEntry[] {
  const prefix = SPEC_PREFIX_BY_TYPE[elementType];
  if (!prefix) return [];
  const hasDot = prefix.endsWith('.');
  return CANONICAL_SPEC_ORDER.filter((e) =>
    hasDot ? e.nomCanonique.startsWith(prefix) : e.nomCanonique === prefix || e.nomCanonique.startsWith(prefix + '.')
  );
}

/**
 * Map containerLayout → containerParent pour ouvrir les bons wrappers DOM (mode lecture).
 * Utilisée pour que chaque ligne soit rendue dans le data-container-id de son containerParent.
 */
export function getContainerParentMap(): Map<string, string | null> {
  const map = new Map<string, string | null>();
  for (const e of CANONICAL_SPEC_ORDER) {
    if (e.containerLayout != null) {
      map.set(e.containerLayout, e.containerParent);
    }
  }
  return map;
}

/**
 * Indique si le type hiérarchique correspond à un container (.cont).
 */
export function isContainerType(typeHierarchique: string): boolean {
  return typeHierarchique === '--c';
}

/**
 * Map type hiérarchique (--h1, --h2, --c, ...) vers type d'affichage pour le mode lecture (h1, h2, p, c, etc.).
 */
export function typeHierarchiqueToDisplay(typeHierarchique: string): string | null {
  const map: Record<string, string | null> = {
    '--h1': 'h1',
    '--h2': 'h2',
    '--h3': 'h3',
    '--h4': 'h4',
    '--p': 'p',
    '--n': 'n',
    '--l1': 'li',
    '--a': 'p',
    '--b': 'p',
    '--lk': 'p',
    '--v': 'v',
    '--m': 'm',
    '--img': 'img',
    '--photo': 'photo',
    '--c': 'c',
  };
  return map[typeHierarchique] ?? 'p';
}

/**
 * Extrait la valeur affichable pour un nom canonique à partir d'un élément.
 * Pour les containers (--c), il n'y a pas de valeur ; retourne undefined.
 */
export function getValueForNomCanonique(element: Record<string, unknown>, nomCanonique: string): string | undefined {
  const parts = nomCanonique.split('.');
  if (parts.length < 2) return undefined;
  const [, ...rest] = parts;
  let current: unknown = element;
  for (const key of rest) {
    if (current == null || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  if (Array.isArray(current)) return current.join(', ');
  if (typeof current === 'string') return current;
  if (typeof current === 'number') return String(current);
  return undefined;
}
