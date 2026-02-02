/**
 * Tests pour constants/canonicalSpec.ts
 * CANONICAL_SPEC_ORDER (4 colonnes : nomCanonique, typeHierarchique, containerParent, containerLayout), getPageContainerSpecEntries, isContainerType.
 */

import {
  CANONICAL_SPEC_ORDER,
  REPEATER_SPEC,
  getRepeaterSpec,
  getPageContainerSpecEntries,
  getContainerParentMap,
  isContainerType,
  typeHierarchiqueToDisplay,
  getSpecEntriesForType,
  getValueForNomCanonique,
  isMarkdownContent,
} from '../../constants/canonicalSpec';

describe('canonicalSpec', () => {
  describe('REPEATER_SPEC', () => {
    it('devrait contenir tous les répétiteurs avec libelle et typeHierarchique', () => {
      expect(REPEATER_SPEC.listeDeDetournementsVideo).toEqual({
        libelle: 'Détournements vidéo',
        typeHierarchique: '--m',
      });
      expect(REPEATER_SPEC.listeDeTemoignages).toEqual({
        libelle: 'Témoignages',
        typeHierarchique: '--h2',
      });
      expect(REPEATER_SPEC.listeDeProfils).toEqual({
        libelle: 'liste de profils',
        typeHierarchique: '--m',
      });
      expect(REPEATER_SPEC.listeDesExperiencesEtApprentissage).toEqual({
        libelle: 'Expériences et apprentissages',
        typeHierarchique: '--h4',
      });
      expect(REPEATER_SPEC.groupeDeBoutons).toEqual({
        libelle: 'Groupe de bouton',
        typeHierarchique: '--m',
      });
      expect(REPEATER_SPEC.listeDesPages).toEqual({
        libelle: 'Liste des pages',
        typeHierarchique: '--m',
      });
    });
  });

  describe('getRepeaterSpec', () => {
    it('devrait retourner la spec pour un type répétiteur connu', () => {
      expect(getRepeaterSpec('listeDeTemoignages')).toEqual({
        libelle: 'Témoignages',
        typeHierarchique: '--h2',
      });
      expect(getRepeaterSpec('listeDesPages')).toEqual({
        libelle: 'Liste des pages',
        typeHierarchique: '--m',
      });
    });

    it('devrait retourner undefined pour un type inconnu', () => {
      expect(getRepeaterSpec('hero')).toBeUndefined();
      expect(getRepeaterSpec('inconnu')).toBeUndefined();
    });
  });

  describe('CANONICAL_SPEC_ORDER et containers (--c)', () => {
    it('devrait contenir header puis container implicite titreDePage.texte.cont puis titreDePage.texte et page (--c)', () => {
      expect(CANONICAL_SPEC_ORDER[0]).toMatchObject({ nomCanonique: 'header', typeHierarchique: '--c', containerLayout: 'header' });
      expect(CANONICAL_SPEC_ORDER[1]).toMatchObject({ nomCanonique: 'titreDePage.texte.cont', typeHierarchique: '--c', containerParent: 'header' });
      const titreDePageTexte = CANONICAL_SPEC_ORDER.find((e) => e.nomCanonique === 'titreDePage.texte');
      expect(titreDePageTexte).toBeDefined();
      expect(titreDePageTexte).toMatchObject({ typeHierarchique: '--h1', containerParent: 'titreDePage.texte.cont' });
      const pageEntry = CANONICAL_SPEC_ORDER.find((e) => e.nomCanonique === 'page');
      expect(pageEntry).toBeDefined();
      expect(pageEntry).toMatchObject({ typeHierarchique: '--c', containerParent: 'body', containerLayout: 'boby.count' });
    });

    it('devrait contenir hero, hero.gauche, containers implicites (.cont), hero.droite en ordre', () => {
      const heroEntries = CANONICAL_SPEC_ORDER.filter((e) => e.nomCanonique === 'hero' || e.nomCanonique.startsWith('hero.'));
      const cont = heroEntries.filter((e) => e.typeHierarchique === '--c').map((e) => e.nomCanonique);
      expect(cont).toContain('hero');
      expect(cont).toContain('hero.gauche');
      expect(cont).toContain('hero.droite');
      expect(cont).toContain('hero.titre.cont');
      expect(cont).toContain('hero.sousTitre.cont');
      const idxHero = heroEntries.findIndex((e) => e.nomCanonique === 'hero');
      const idxGauche = heroEntries.findIndex((e) => e.nomCanonique === 'hero.gauche');
      const idxDroite = heroEntries.findIndex((e) => e.nomCanonique === 'hero.droite');
      expect(idxGauche).toBeGreaterThan(idxHero);
      expect(idxDroite).toBeGreaterThan(idxGauche);
    });

    it('getPageContainerSpecEntries devrait retourner l\'entrée page', () => {
      const entries = getPageContainerSpecEntries();
      expect(entries).toHaveLength(1);
      expect(entries[0]).toMatchObject({ nomCanonique: 'page', typeHierarchique: '--c', containerLayout: 'boby.count' });
    });

    it('isContainerType devrait retourner true pour --c uniquement', () => {
      expect(isContainerType('--c')).toBe(true);
      expect(isContainerType('--h1')).toBe(false);
      expect(isContainerType('--p')).toBe(false);
    });

    it('listeDesPages et listeDesPages.page devraient avoir containerParent et container implicite pour .page', () => {
      const listeDesPagesCont = CANONICAL_SPEC_ORDER.find((e) => e.nomCanonique === 'listeDesPages');
      const listeDesPagesPageCont = CANONICAL_SPEC_ORDER.find((e) => e.nomCanonique === 'listeDesPages.page.cont');
      const listeDesPagesPage = CANONICAL_SPEC_ORDER.find((e) => e.nomCanonique === 'listeDesPages.page');
      expect(listeDesPagesCont).toBeDefined();
      expect(listeDesPagesCont).toMatchObject({ containerParent: 'boby.count', containerLayout: 'listeDesPages.cont' });
      expect(listeDesPagesPageCont).toBeDefined();
      expect(listeDesPagesPageCont).toMatchObject({ containerParent: 'listeDesPages', typeHierarchique: '--c', containerLayout: 'listeDesPages.page.cont' });
      expect(listeDesPagesPage).toBeDefined();
      expect(listeDesPagesPage).toMatchObject({ containerParent: 'listeDesPages.page.cont' });
    });
  });

  describe('typeHierarchiqueToDisplay', () => {
    it('devrait retourner "m" pour --m (affiché en gris en mode lecture)', () => {
      expect(typeHierarchiqueToDisplay('--m')).toBe('m');
    });

    it('devrait retourner "c" pour --c (container)', () => {
      expect(typeHierarchiqueToDisplay('--c')).toBe('c');
    });

    it('devrait retourner les types attendus pour les autres entrées', () => {
      expect(typeHierarchiqueToDisplay('--h1')).toBe('h1');
      expect(typeHierarchiqueToDisplay('--h2')).toBe('h2');
      expect(typeHierarchiqueToDisplay('--p')).toBe('p');
      expect(typeHierarchiqueToDisplay('--v')).toBe('v');
      expect(typeHierarchiqueToDisplay('--img')).toBe('img');
    });
  });

  describe('getSpecEntriesForType', () => {
    it('devrait retourner les entrées detournementVideo dans l\'ordre (container puis contenu)', () => {
      const entries = getSpecEntriesForType('detournementVideo');
      expect(entries.length).toBeGreaterThan(0);
      expect(entries[0].nomCanonique).toBe('detournementVideo');
      expect(entries[0].typeHierarchique).toBe('--c');
      expect(entries.some((e) => e.nomCanonique === 'detournementVideo.titre')).toBe(true);
      expect(entries.some((e) => e.nomCanonique === 'detournementVideo.videoOriginale')).toBe(true);
    });

    it('devrait placer competence.image.src avant competence.image.alt', () => {
      const entries = getSpecEntriesForType('competence');
      const idxSrc = entries.findIndex((e) => e.nomCanonique === 'competence.image.src');
      const idxAlt = entries.findIndex((e) => e.nomCanonique === 'competence.image.alt');
      expect(idxSrc).toBeGreaterThanOrEqual(0);
      expect(idxAlt).toBeGreaterThanOrEqual(0);
      expect(idxSrc).toBeLessThan(idxAlt);
    });
  });

  describe('getValueForNomCanonique', () => {
    it('devrait extraire une propriété simple', () => {
      const el = { type: 'detournementVideo', titre: 'Client X' };
      expect(getValueForNomCanonique(el, 'detournementVideo.titre')).toBe('Client X');
    });
  });

  describe('isMarkdownContent', () => {
    it('devrait retourner true pour les noms canoniques markdown', () => {
      expect(isMarkdownContent('hero.description')).toBe(true);
      expect(isMarkdownContent('texteLarge.texte')).toBe(true);
      expect(isMarkdownContent('detournementVideo.pitch')).toBe(true);
    });

    it('devrait retourner false pour les autres', () => {
      expect(isMarkdownContent('hero.titre')).toBe(false);
      expect(isMarkdownContent('detournementVideo.titre')).toBe(false);
    });
  });

  describe('getContainerParentMap', () => {
    it('devrait mapper containerLayout vers containerParent pour les wrappers DOM', () => {
      const map = getContainerParentMap();
      expect(map.get('header')).toBe('boby.count');
      expect(map.get('hero.cont')).toBe('boby.count');
      expect(map.get('hero.gauche.cont')).toBe('hero.cont');
      expect(map.get('hero.droite.cont')).toBe('hero.cont');
      expect(map.get('listeDesPages.cont')).toBe('boby.count');
    });
  });
});
