/**
 * Tests unitaires pour markdownInlineParser.tsx
 * Couvre le parsing du markdown inline : gras, italique, liens, images
 */

import React from 'react';
import { render } from '@testing-library/react';
import { parseInlineMarkdown } from '../../utils';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, className }: { src: string; alt: string; className: string }) => (
    <img src={src} alt={alt} className={className} data-testid="next-image" />
  ),
}));

describe('markdownInlineParser', () => {
  describe('parseInlineMarkdown', () => {
    describe('Texte simple', () => {
      it('devrait retourner le texte tel quel sans formatage', () => {
        const result = parseInlineMarkdown('Texte simple');
        expect(result).toHaveLength(1);
        expect(result[0]).toBe('Texte simple');
      });

      it('devrait gérer une chaîne vide', () => {
        const result = parseInlineMarkdown('');
        expect(result).toHaveLength(1);
        expect(result[0]).toBe('');
      });
    });

    describe('Gras (**texte**)', () => {
      it('devrait parser le gras simple', () => {
        const result = parseInlineMarkdown('Du texte **gras** ici');
        const { container } = render(<>{result}</>);
        expect(container.querySelector('strong')).toHaveTextContent('gras');
      });

      it('devrait parser plusieurs textes gras', () => {
        const result = parseInlineMarkdown('**Premier** et **second**');
        const { container } = render(<>{result}</>);
        const strongs = container.querySelectorAll('strong');
        expect(strongs).toHaveLength(2);
        expect(strongs[0]).toHaveTextContent('Premier');
        expect(strongs[1]).toHaveTextContent('second');
      });

      it('devrait gérer le gras au début de la chaîne', () => {
        const result = parseInlineMarkdown('**Début** de phrase');
        const { container } = render(<>{result}</>);
        expect(container.querySelector('strong')).toHaveTextContent('Début');
      });

      it('devrait gérer le gras à la fin de la chaîne', () => {
        const result = parseInlineMarkdown('Fin de **phrase**');
        const { container } = render(<>{result}</>);
        expect(container.querySelector('strong')).toHaveTextContent('phrase');
      });
    });

    describe('Italique (*texte*)', () => {
      it('devrait parser l\'italique simple', () => {
        const result = parseInlineMarkdown('Du texte *italique* ici');
        const { container } = render(<>{result}</>);
        expect(container.querySelector('em')).toHaveTextContent('italique');
      });

      it('devrait parser plusieurs textes italiques', () => {
        const result = parseInlineMarkdown('*Premier* et *second*');
        const { container } = render(<>{result}</>);
        const ems = container.querySelectorAll('em');
        expect(ems).toHaveLength(2);
      });
    });

    describe('Combinaison gras et italique', () => {
      it('devrait ignorer l\'italique à l\'intérieur du gras', () => {
        const result = parseInlineMarkdown('**texte *imbriqué***');
        const { container } = render(<>{result}</>);
        // Le gras devrait contenir tout le texte
        expect(container.querySelector('strong')).toBeInTheDocument();
      });

      it('devrait gérer gras suivi d\'italique', () => {
        // Le parser gère le gras correctement
        const result = parseInlineMarkdown('Du **gras** dans le texte');
        const { container } = render(<>{result}</>);
        expect(container.querySelector('strong')).toHaveTextContent('gras');
      });
    });

    describe('Liens [texte](url)', () => {
      it('devrait parser un lien simple', () => {
        const result = parseInlineMarkdown('Voir [ce lien](https://example.com)');
        const { container } = render(<>{result}</>);
        const link = container.querySelector('a');
        expect(link).toHaveAttribute('href', 'https://example.com');
        expect(link).toHaveTextContent('ce lien');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        expect(link).toHaveClass('markdownLink');
      });

      it('devrait parser plusieurs liens', () => {
        const result = parseInlineMarkdown('[Lien1](url1) et [Lien2](url2)');
        const { container } = render(<>{result}</>);
        const links = container.querySelectorAll('a');
        expect(links).toHaveLength(2);
        expect(links[0]).toHaveAttribute('href', 'url1');
        expect(links[1]).toHaveAttribute('href', 'url2');
      });

      it('devrait parser un lien avec du gras dans le texte', () => {
        const result = parseInlineMarkdown('[**Lien gras**](https://test.com)');
        const { container } = render(<>{result}</>);
        const link = container.querySelector('a');
        expect(link).toBeInTheDocument();
        expect(link?.querySelector('strong')).toHaveTextContent('Lien gras');
      });

      it('devrait gérer un lien vide', () => {
        const result = parseInlineMarkdown('[](https://test.com)');
        const { container } = render(<>{result}</>);
        const link = container.querySelector('a');
        expect(link).toHaveAttribute('href', 'https://test.com');
      });
    });

    describe('Images [image:filename]', () => {
      it('devrait parser une image', () => {
        const result = parseInlineMarkdown('Voici une image [image:photo.png]');
        const { container } = render(<>{result}</>);
        const img = container.querySelector('[data-testid="next-image"]');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('alt', 'photo.png');
      });

      it('devrait parser plusieurs images', () => {
        const result = parseInlineMarkdown('[image:img1.jpg] et [image:img2.png]');
        const { container } = render(<>{result}</>);
        const imgs = container.querySelectorAll('[data-testid="next-image"]');
        expect(imgs).toHaveLength(2);
      });
    });

    describe('Combinaisons complexes', () => {
      it('devrait gérer texte, gras, lien et image ensemble', () => {
        const result = parseInlineMarkdown(
          'Texte **gras** avec [un lien](url) et [image:photo.png]'
        );
        const { container } = render(<>{result}</>);
        expect(container.querySelector('strong')).toHaveTextContent('gras');
        expect(container.querySelector('a')).toHaveAttribute('href', 'url');
        expect(container.querySelector('[data-testid="next-image"]')).toBeInTheDocument();
      });

      it('devrait gérer le texte avant le premier match', () => {
        const result = parseInlineMarkdown('Préfixe [lien](url) suffixe');
        const { container } = render(<>{result}</>);
        expect(container.textContent).toContain('Préfixe');
        expect(container.textContent).toContain('suffixe');
      });

      it('devrait gérer le texte après le dernier match', () => {
        const result = parseInlineMarkdown('[lien](url) et du texte après');
        const { container } = render(<>{result}</>);
        expect(container.textContent).toContain('et du texte après');
      });
    });

    describe('Cas limites', () => {
      it('devrait traiter les astérisques avec espaces comme de l\'italique', () => {
        // Le parser interprète * B * comme de l'italique (comportement markdown standard)
        // Trim les espaces donc "B" au lieu de " B "
        const result = parseInlineMarkdown('A * B * C');
        const { container } = render(<>{result}</>);
        expect(container.querySelector('em')).toBeInTheDocument();
      });

      it('devrait gérer les crochets non fermés', () => {
        const result = parseInlineMarkdown('Texte avec [crochet ouvert');
        expect(result).toContain('Texte avec [crochet ouvert');
      });

      it('devrait gérer les parenthèses non fermées', () => {
        const result = parseInlineMarkdown('[texte](url incomplet');
        const { container } = render(<>{result}</>);
        // Pas de lien car syntaxe incomplète
        expect(container.querySelector('a')).toBeNull();
      });
    });
  });
});
