/**
 * Tests US-7.12 : buildMesProfilsPageData (page Mes Profils depuis index.json)
 */

import {
  buildMesProfilsPageData,
  type PageData,
  type ElementProfils,
  type ElementCallToAction,
  type ElementTexteLarge,
} from '../../utils/indexReader';

describe('buildMesProfilsPageData (US-7.12)', () => {
  let pageData: PageData;

  beforeAll(() => {
    pageData = buildMesProfilsPageData();
  });

  it('retourne un PageData avec contenu (profils + Discutons + texteLarge)', () => {
    expect(pageData.contenu).toBeDefined();
    expect(Array.isArray(pageData.contenu)).toBe(true);
    expect(pageData.contenu.length).toBeGreaterThanOrEqual(2);
  });

  it('premier élément est titreDePage (titre de la page Mes Profils)', () => {
    const premier = pageData.contenu[0];
    expect(premier.type).toBe('titreDePage');
  });

  it('deuxième élément est de type profils avec les 4 profils', () => {
    const profilsEl = pageData.contenu[1] as ElementProfils;
    expect(profilsEl.type).toBe('profils');
    expect(profilsEl.profils).toBeDefined();
    expect(profilsEl.profils).toHaveLength(4);
  });

  it('troisième élément est le CTA Discutons', () => {
    const cta = pageData.contenu[2] as ElementCallToAction;
    expect(cta.type).toBe('callToAction');
    expect(cta.action).toBe('Discutons');
  });

  it('quatrième élément est texteLarge (sous les profils)', () => {
    expect(pageData.contenu.length).toBeGreaterThanOrEqual(4);
    const texteLarge = pageData.contenu[3] as ElementTexteLarge;
    expect(texteLarge.type).toBe('texteLarge');
    expect(texteLarge.texte).toBeDefined();
  });
});
