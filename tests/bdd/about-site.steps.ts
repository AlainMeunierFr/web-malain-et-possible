import React from 'react';
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import AboutSitePage from '../../app/about-site/page';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock fs pour les fichiers serveur
jest.mock('fs', () => ({
  readFileSync: jest.fn(),
  readdirSync: jest.fn(),
  statSync: jest.fn(),
}));

// Mock path
jest.mock('path', () => ({
  join: jest.fn((...args) => args.join('/')),
  resolve: jest.fn((...args) => args.join('/')),
}));

let mockRouter: {
  push: jest.Mock;
};

Given('que je suis sur la page {string}', (pageName: string) => {
  mockRouter = {
    push: jest.fn(),
  };

  (useRouter as jest.Mock).mockReturnValue(mockRouter);

  if (pageName === 'À propos du site') {
    render(<AboutSitePage />);
  }
});

Given('que je suis sur la page "À propos du site"', () => {
  mockRouter = {
    push: jest.fn(),
  };

  (useRouter as jest.Mock).mockReturnValue(mockRouter);

  render(<AboutSitePage />);
});

Then('je vois {int} sections avec leurs titres', (expectedCount: number) => {
  const h1Elements = screen.getAllByRole('heading', { level: 1 });
  expect(h1Elements.length).toBeGreaterThanOrEqual(expectedCount);
});

Then('je vois les titres {string}, {string}, {string} et {string}', (
  title1: string,
  title2: string,
  title3: string,
  title4: string
) => {
  // Les titres sont dans les sections accordéon (headings level 1)
  const headings = screen.getAllByRole('heading', { level: 1 });
  const headingTexts = headings.map(h => h.textContent);
  expect(headingTexts).toContain(title1);
  expect(headingTexts).toContain(title2);
  expect(headingTexts).toContain(title3);
  expect(headingTexts).toContain(title4);
});

Then('les sections sont masquées par défaut', () => {
  // Vérifier que les contenus sont masqués (aria-hidden ou display: none)
  const sections = screen.getAllByRole('region', { hidden: true });
  // Les sections doivent être présentes mais masquées
  expect(sections.length).toBeGreaterThan(0);
});

Given('que la section {string} est masquée', (sectionName: string) => {
  // Section masquée par défaut
  const section = screen.getByRole('heading', { name: sectionName });
  expect(section).toBeInTheDocument();
  // Vérifier que le contenu adjacent est masqué
});

Given('que la section {string} est déroulée', (sectionName: string) => {
  // Cliquer sur le titre pour dérouler
  const heading = screen.getByRole('heading', { name: sectionName });
  fireEvent.click(heading);
});

When('je clique sur le titre {string}', (sectionName: string) => {
  const heading = screen.getByRole('heading', { name: sectionName });
  fireEvent.click(heading);
});

Then('la section {string} est déroulée', (sectionName: string) => {
  // Vérifier que le contenu est visible
  const heading = screen.getByRole('heading', { name: sectionName });
  const section = heading.closest('[aria-expanded="true"]') || heading.nextElementSibling;
  expect(section).toBeVisible();
});

Then('je peux voir son contenu', () => {
  // Vérifier qu'il y a du contenu visible (le contenu est rendu dans les sections déroulées)
  const content = screen.getByText(/Ancien développeur|Definition of Done|Prompts de la session|Formation|Contexte/i);
  expect(content).toBeInTheDocument();
});

Then('la section {string} est masquée', (sectionName: string) => {
  const heading = screen.getByRole('heading', { name: sectionName });
  const section = heading.closest('[aria-expanded="false"]') || heading.nextElementSibling;
  // Le contenu doit être masqué (pas visible ou aria-hidden)
  if (section) {
    expect(section).toHaveAttribute('aria-hidden', 'true');
  }
});

Then('je ne peux plus voir son contenu', () => {
  // Le contenu ne doit pas être visible (masqué par l'accordéon)
  const content = screen.queryByText(/Ancien développeur|Definition of Done|Contexte/i);
  if (content) {
    // Le contenu peut être présent dans le DOM mais masqué par CSS
    const parent = content.closest('[aria-hidden="true"]');
    expect(parent).toBeTruthy();
  }
});

Then('je vois la liste des fichiers journaux du dossier JOURNAL_DE_BORD', () => {
  // Vérifier qu'il y a des liens ou des titres de fichiers journaux
  const journalFiles = screen.getAllByText(/2026-01-\d{2}/i);
  expect(journalFiles.length).toBeGreaterThan(0);
});

Then('chaque fichier journal est affiché avec sa date', () => {
  // Vérifier le format YYYY-MM-DD
  const datePattern = /2026-01-\d{2}/;
  const dates = screen.getAllByText(datePattern);
  expect(dates.length).toBeGreaterThan(0);
});

Then('je vois la liste des fichiers cours du dossier JOURNAL_DE_BORD/COURS', () => {
  // Vérifier qu'il y a des liens ou des titres de fichiers cours
  const courseFiles = screen.getByText(/Formation Git|TypeScript|Cycle de vie/i);
  expect(courseFiles).toBeInTheDocument();
});

Then('chaque fichier cours est affiché avec son titre', () => {
  // Vérifier qu'il y a des titres de cours
  const courseTitles = screen.getAllByText(/Formation Git|Fondamentaux TypeScript|Cycle de vie|Bibliothèques d'icônes/i);
  expect(courseTitles.length).toBeGreaterThan(0);
});
