/**
 * titreToAnchorId : génération d'id HTML pour ancres (titres → sommaire)
 */
import { titreToAnchorId } from '../../utils';

describe('titreToAnchorId', () => {
  it('retourne une chaîne vide pour titre vide ou non string', () => {
    expect(titreToAnchorId('')).toBe('');
    expect(titreToAnchorId('   ')).toBe('');
  });

  it('convertit en minuscules et remplace espaces par tirets', () => {
    expect(titreToAnchorId('Product Goal')).toBe('product-goal');
    expect(titreToAnchorId('1. Introduction')).toBe('1-introduction');
  });

  it('normalise les accents', () => {
    expect(titreToAnchorId('Présentation')).toBe('presentation');
    expect(titreToAnchorId('Contrôle qualité')).toBe('controle-qualite');
  });

  it('supprime la ponctuation et garde chiffres et lettres', () => {
    expect(titreToAnchorId('21. Annexes')).toBe('21-annexes');
    expect(titreToAnchorId('Back-End Métier')).toBe('back-end-metier');
  });

  it('ne laisse pas de tirets en début ou fin', () => {
    expect(titreToAnchorId('  Introduction  ')).toBe('introduction');
  });
});
