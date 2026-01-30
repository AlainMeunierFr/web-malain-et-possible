/**
 * Tests US-7.11 (Home Hero) : vérification de la structure du fichier data/index.json existant.
 * index.json allégé : hero (sans profils), video. Profils et texteLarge sont dans mes-profils.json (US-7.12).
 */

import {
  readPageData,
  type PageData,
  type ElementHero,
  type ElementVideo,
} from '../../utils/indexReader';

describe('indexReader – structure index.json (US-7.11)', () => {
  let pageData: PageData;

  beforeAll(() => {
    // Lecture du fichier réel data/index.json (pas de mock fs)
    pageData = readPageData('index.json');
    expect(pageData.contenu).toBeDefined();
    expect(Array.isArray(pageData.contenu)).toBe(true);
  });

  it('devrait contenir au moins un élément de type hero', () => {
    const heroes = pageData.contenu.filter((el) => el.type === 'hero');
    expect(heroes.length).toBeGreaterThanOrEqual(1);
  });

  it('devrait contenir au moins un élément de type video', () => {
    const videos = pageData.contenu.filter((el) => el.type === 'video');
    expect(videos.length).toBeGreaterThanOrEqual(1);
  });

  it('devrait contenir un élément hero avec titre, sousTitre, description, boutonPrincipal, profils', () => {
    const hero = pageData.contenu.find((el) => el.type === 'hero') as ElementHero | undefined;
    expect(hero).toBeDefined();
    expect(hero!.titre).toBeDefined();
    expect(hero!.sousTitre).toBeDefined();
    expect(hero!.description).toBeDefined();
    expect(hero!.boutonPrincipal).toBeDefined();
    expect(hero!.boutonPrincipal.texte).toBeDefined();
    expect(hero!.boutonPrincipal.action).toBeDefined();
    expect(Array.isArray(hero!.profils)).toBe(true);
  });

  it('devrait avoir un hero avec le titre "Alain Meunier"', () => {
    const hero = pageData.contenu.find((el) => el.type === 'hero') as ElementHero | undefined;
    expect(hero).toBeDefined();
    expect(hero!.titre).toBe('Alain Meunier');
  });

  it('devrait avoir un hero avec boutonPrincipal.action vers faisons-connaissance', () => {
    const hero = pageData.contenu.find((el) => el.type === 'hero') as ElementHero | undefined;
    expect(hero).toBeDefined();
    expect(hero!.boutonPrincipal.action).toBe('/faisons-connaissance');
  });

  it('devrait avoir un hero avec profils (tableau vide ; profils dans mes-profils.json)', () => {
    const hero = pageData.contenu.find((el) => el.type === 'hero') as ElementHero | undefined;
    expect(hero).toBeDefined();
    expect(Array.isArray(hero!.profils)).toBe(true);
  });

  it('devrait contenir un élément video avec urlYouTube et lancementAuto', () => {
    const video = pageData.contenu.find((el) => el.type === 'video') as ElementVideo | undefined;
    expect(video).toBeDefined();
    expect(video!.urlYouTube).toBeDefined();
    expect(typeof video!.lancementAuto).toBe('boolean');
  });

  it('devrait avoir l’ordre contenu : hero, puis video (pas de texteLarge dans index)', () => {
    const types = pageData.contenu.map((el) => el.type);
    const indexHero = types.indexOf('hero');
    const indexVideo = types.indexOf('video');
    expect(indexHero).toBeGreaterThanOrEqual(0);
    expect(indexVideo).toBeGreaterThanOrEqual(0);
    expect(indexHero).toBeLessThan(indexVideo);
    expect(types).not.toContain('texteLarge');
  });
});
