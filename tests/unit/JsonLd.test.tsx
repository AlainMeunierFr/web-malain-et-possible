/**
 * Tests unitaires pour components/JsonLd.tsx
 * Couvre le composant d'injection JSON-LD
 */

import React from 'react';
import { render } from '@testing-library/react';
import JsonLd from '../../components/JsonLd';

describe('JsonLd', () => {
  it('devrait rendre un script JSON-LD pour un objet simple', () => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Test Person',
    };

    const { container } = render(<JsonLd data={data} />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    expect(scripts).toHaveLength(1);
    expect(scripts[0].innerHTML).toBe(JSON.stringify(data));
  });

  it('devrait rendre plusieurs scripts pour un tableau d\'objets', () => {
    const data = [
      { '@type': 'Person', name: 'Person 1' },
      { '@type': 'WebSite', name: 'Site 1' },
    ];

    const { container } = render(<JsonLd data={data} />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    expect(scripts).toHaveLength(2);
    expect(scripts[0].innerHTML).toBe(JSON.stringify(data[0]));
    expect(scripts[1].innerHTML).toBe(JSON.stringify(data[1]));
  });

  it('devrait gérer un tableau vide', () => {
    const { container } = render(<JsonLd data={[]} />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    expect(scripts).toHaveLength(0);
  });

  it('devrait gérer des données complexes imbriquées', () => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home' },
        { '@type': 'ListItem', position: 2, name: 'Products' },
      ],
    };

    const { container } = render(<JsonLd data={data} />);
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script).not.toBeNull();
    expect(script!.innerHTML).toContain('BreadcrumbList');
    expect(script!.innerHTML).toContain('ListItem');
  });
});
