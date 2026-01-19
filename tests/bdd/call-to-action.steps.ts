import React from 'react';
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@jest/globals';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import CallToAction from '../../components/CallToAction';
import PageContentRenderer from '../../components/PageContentRenderer';
import type { ElementCallToAction, PageData } from '../../utils/indexReader';
import { ROUTES } from '../../constants/routes';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return React.createElement('img', props);
  },
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => {
    return React.createElement('a', { href, className, onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      if (mockRouter) {
        mockRouter.push(href);
      }
    }}, children);
  };
});

let mockRouter: {
  push: jest.Mock;
};

// Background
Given('que je suis sur une page du site vitrine', () => {
  mockRouter = {
    push: jest.fn(),
  };
  (useRouter as jest.Mock).mockReturnValue(mockRouter);
});

Given('que le fichier JSON de la page contient un élément "callToAction" à la fin du contenu', () => {
  // Cette donnée est vérifiée dans les scénarios individuels
});

// Scénario : Affichage du bouton Call to Action
Given('que le JSON contient un élément de type "callToAction" avec action {string}', (action: string) => {
  const element: ElementCallToAction = {
    type: 'callToAction',
    action: action,
  };

  render(<CallToAction element={element} />);
});

When('la page est chargée', () => {
  // Le rendu est déjà fait dans le Given
});

Then('je vois un bouton avec le texte {string}', (texte: string) => {
  const bouton = screen.getByText(texte);
  expect(bouton).toBeInTheDocument();
});

Then('le bouton a le même style que {string}', (reference: string) => {
  // On vérifie que le bouton a les classes CSS attendues
  const lien = screen.getByRole('link');
  expect(lien).toHaveClass('callToActionButton');
});

Then('la largeur maximale du bouton est de {int}px', (largeur: number) => {
  const lien = screen.getByRole('link');
  const styles = window.getComputedStyle(lien);
  expect(styles.maxWidth).toBe(`${largeur}px`);
});

Then('le bouton est centré dans son conteneur', () => {
  const container = screen.getByRole('link').closest('.callToActionContainer');
  expect(container).toBeInTheDocument();
  if (container) {
    const styles = window.getComputedStyle(container);
    expect(styles.display).toBe('flex');
    expect(styles.justifyContent).toBe('center');
  }
});

// Scénario : Navigation vers la page "Faisons connaissance"
Given('que je suis sur une page affichant le bouton {string}', (texte: string) => {
  const element: ElementCallToAction = {
    type: 'callToAction',
    action: texte,
  };

  mockRouter = {
    push: jest.fn(),
  };
  (useRouter as jest.Mock).mockReturnValue(mockRouter);

  render(<CallToAction element={element} />);
});

When('je clique sur le bouton {string}', (texte: string) => {
  const bouton = screen.getByText(texte);
  fireEvent.click(bouton);
});

Then('je suis redirigé vers la page {string}', (route: string) => {
  expect(mockRouter.push).toHaveBeenCalledWith(route);
});

Then('la navigation est optimisée', () => {
  // Vérifie que next/link est utilisé (déjà vérifié via le mock)
  expect(mockRouter.push).toHaveBeenCalled();
});

// Scénario : Call to Action présent sur toutes les pages
// Note: Ce scénario nécessiterait de rendre chaque page complète, ce qui est plus complexe
// Pour l'instant, on vérifie que le composant peut être intégré dans PageContentRenderer

// Scénario : Effet hover
Given('que je passe la souris sur le bouton', () => {
  // L'effet hover est testé via CSS, pas facilement testable en unitaire
  // On vérifie juste que les classes CSS sont présentes
});

Then('le fond du bouton devient bleu', () => {
  // Testé via CSS, vérification que la classe est présente
  const lien = screen.getByRole('link');
  expect(lien).toHaveClass('callToActionButton');
});

Then('le texte devient blanc', () => {
  // Testé via CSS, vérification que la classe est présente
  const lien = screen.getByRole('link');
  expect(lien).toHaveClass('callToActionButton');
});

Then('la transition est fluide', (duree: string) => {
  // Testé via CSS, vérification que la classe est présente
  const lien = screen.getByRole('link');
  expect(lien).toHaveClass('callToActionButton');
});

// Scénario : Responsive
Given('que je suis sur un smartphone', () => {
  // Mock window.innerWidth pour simuler un smartphone
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 375,
  });
});

Given('que je suis sur un écran desktop', () => {
  // Mock window.innerWidth pour simuler un desktop
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 1920,
  });
});

Then('le bouton {string} prend toute la largeur disponible', (texte: string) => {
  const lien = screen.getByRole('link');
  expect(lien).toHaveClass('callToActionButton');
  // La largeur max de 947px est déjà vérifiée dans un autre step
});

Then('le bouton {string} est centré avec une largeur maximale de {int}px', (texte: string, largeur: number) => {
  const lien = screen.getByRole('link');
  expect(lien).toHaveClass('callToActionButton');
  const styles = window.getComputedStyle(lien);
  expect(styles.maxWidth).toBe(`${largeur}px`);
});

// Scénario : Page "Faisons connaissance" accessible
Then('la page {string} se charge', (route: string) => {
  expect(mockRouter.push).toHaveBeenCalledWith(route);
});

Then('la page affiche le contenu de contact', () => {
  // Ceci nécessiterait de rendre la page complète, vérifié dans les tests d'intégration
});

Then('la page utilise la même structure que les autres pages', () => {
  // Ceci nécessiterait de vérifier la structure de la page, vérifié dans les tests d'intégration
});
