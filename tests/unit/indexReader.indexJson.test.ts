/**
 * Tests US-7.11 (Home Hero) : vérification de la structure du fichier data/index.json existant.
 * index.json : hero avec hero.video (vidéo à droite) ; pas de bloc video standalone. Profils et texteLarge dans mes-profils.json (US-7.12).
 */

import { readPageData } from '../../utils/server';
import type { PageData, ElementHero } from '../../utils';

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

  it('devrait contenir un élément hero avec titre, sousTitre, description, callToAction, ensavoirplus', () => {
    const hero = pageData.contenu.find((el) => el.type === 'hero') as ElementHero | undefined;
    expect(hero).toBeDefined();
    expect(hero!.titre).toBeDefined();
    expect(hero!.sousTitre).toBeDefined();
    expect(hero!.description).toBeDefined();
    expect(hero!.callToAction).toBeDefined();
    expect(hero!.callToAction.texte).toBeDefined();
    expect(hero!.callToAction.action).toBeDefined();
    expect(typeof hero!.ensavoirplus).toBe('string');
    expect(hero!.ensavoirplus.length).toBeGreaterThan(0);
  });

  it('devrait avoir un hero avec le titre "Alain Meunier"', () => {
    const hero = pageData.contenu.find((el) => el.type === 'hero') as ElementHero | undefined;
    expect(hero).toBeDefined();
    expect(hero!.titre).toBe('Alain Meunier');
  });

  it('devrait avoir un hero avec callToAction.action vers faisons-connaissance', () => {
    const hero = pageData.contenu.find((el) => el.type === 'hero') as ElementHero | undefined;
    expect(hero).toBeDefined();
    expect(hero!.callToAction.action).toBe('/faisons-connaissance');
  });

  it('devrait avoir un hero avec ensavoirplus (URL interne vers Mes profils)', () => {
    const hero = pageData.contenu.find((el) => el.type === 'hero') as ElementHero | undefined;
    expect(hero).toBeDefined();
    expect(hero!.ensavoirplus).toBe('/mes-profils');
  });

  it('devrait avoir un hero avec video (hero.video : urlYouTube, lancementAuto ; nom canonique hero.video)', () => {
    const hero = pageData.contenu.find((el) => el.type === 'hero') as ElementHero | undefined;
    expect(hero).toBeDefined();
    expect(hero!.video).toBeDefined();
    expect(hero!.video!.urlYouTube).toBeDefined();
    expect(typeof hero!.video!.lancementAuto).toBe('boolean');
  });

  it('devrait avoir un seul élément hero dans contenu (pas de bloc video standalone)', () => {
    const types = pageData.contenu.map((el) => el.type);
    expect(types).toContain('hero');
    expect(types).not.toContain('video');
    expect(types).not.toContain('texteLarge');
  });
});
