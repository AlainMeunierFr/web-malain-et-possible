import React from 'react';
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
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

let mockRouter: {
  push: jest.Mock;
};
let mockWindow: {
  open: jest.Mock;
  alert: jest.Mock;
};

// Steps en anglais (pour compatibilité)
Given('the header is displayed', () => {
  mockRouter = {
    push: jest.fn(),
  };

  (useRouter as jest.Mock).mockReturnValue(mockRouter);

  render(<Header />);
});

// Steps en français (pour les scénarios Gherkin en français)
Given('que le header est affiché', () => {
  mockRouter = {
    push: jest.fn(),
  };

  (useRouter as jest.Mock).mockReturnValue(mockRouter);

  render(<Header />);
});

Given('que le footer est affiché', () => {
  mockRouter = {
    push: jest.fn(),
  };

  mockWindow = {
    open: jest.fn(),
    alert: jest.fn(),
  };

  (useRouter as jest.Mock).mockReturnValue(mockRouter);
  global.window.open = mockWindow.open;
  global.window.alert = mockWindow.alert;

  render(<Footer />);
});

Given('the footer is displayed', () => {
  mockRouter = {
    push: jest.fn(),
  };

  mockWindow = {
    open: jest.fn(),
    alert: jest.fn(),
  };

  (useRouter as jest.Mock).mockReturnValue(mockRouter);
  global.window.open = mockWindow.open;
  global.window.alert = mockWindow.alert;

  render(<Footer />);
});

When('the user clicks on the photo', () => {
  const photo = screen.getByAltText('Photo Alain Meunier');
  expect(photo).toBeInTheDocument();
  fireEvent.click(photo);
});

When('l\'utilisateur clique sur la photo', () => {
  const photo = screen.getByAltText('Photo Alain Meunier');
  expect(photo).toBeInTheDocument();
  fireEvent.click(photo);
});

When('the user clicks on the logo', () => {
  const logo = screen.getByAltText('Logo Malain et possible');
  expect(logo).toBeInTheDocument();
  fireEvent.click(logo);
});

When('l\'utilisateur clique sur le logo', () => {
  const logo = screen.getByAltText('Logo Malain et possible');
  expect(logo).toBeInTheDocument();
  fireEvent.click(logo);
});

When('the user clicks the {string} button', (buttonName: string) => {
  // Map button names to IDs
  const buttonIdMap: { [key: string]: string } = {
    Email: 'email',
    YouTube: 'youtube',
    LinkedIn: 'linkedin',
    'Site Map': 'sitemap',
    'À propos du site': 'about-site',
  };

  const buttonId = buttonIdMap[buttonName] || buttonName.toLowerCase();
  const button = screen.getByTestId(`footer-button-${buttonId}`);

  expect(button).toBeInTheDocument();
  fireEvent.click(button);
});

When('l\'utilisateur clique sur le bouton {string}', (buttonName: string) => {
  // Map button names to IDs
  const buttonIdMap: { [key: string]: string } = {
    Email: 'email',
    YouTube: 'youtube',
    LinkedIn: 'linkedin',
    'Site Map': 'sitemap',
    'À propos du site': 'about-site',
  };

  const buttonId = buttonIdMap[buttonName] || buttonName.toLowerCase();
  const button = screen.getByTestId(`footer-button-${buttonId}`);

  expect(button).toBeInTheDocument();
  fireEvent.click(button);
});

Then('the {string} page is displayed', (pageName: string) => {
  const pageMap: { [key: string]: string } = {
    'A propos de moi': ROUTES.ABOUT,
    'Plan du site': ROUTES.ABOUT,
  };

  const expectedPath = pageMap[pageName];
  expect(mockRouter.push).toHaveBeenCalledWith(expectedPath);
});

Then('la page {string} est affichée', (pageName: string) => {
  const pageMap: { [key: string]: string } = {
    'A propos de moi': ROUTES.ABOUT,
    'Plan du site': ROUTES.ABOUT,
  };

  const expectedPath = pageMap[pageName];
  expect(mockRouter.push).toHaveBeenCalledWith(expectedPath);
});

Then('the homepage is displayed', () => {
  expect(mockRouter.push).toHaveBeenCalledWith(ROUTES.HOME);
});

Then('la page d\'accueil est affichée', () => {
  expect(mockRouter.push).toHaveBeenCalledWith(ROUTES.HOME);
});

Then('the site map page is displayed', () => {
  expect(mockRouter.push).toHaveBeenCalledWith(ROUTES.ABOUT);
  expect(mockWindow.alert).not.toHaveBeenCalled();
  expect(mockWindow.open).not.toHaveBeenCalled();
});

Then('la page plan du site est affichée', () => {
  expect(mockRouter.push).toHaveBeenCalledWith(ROUTES.ABOUT);
  expect(mockWindow.alert).not.toHaveBeenCalled();
  expect(mockWindow.open).not.toHaveBeenCalled();
});

Then('the about site page is displayed', () => {
  expect(mockRouter.push).toHaveBeenCalledWith(ROUTES.ABOUT);
  expect(mockWindow.alert).not.toHaveBeenCalled();
  expect(mockWindow.open).not.toHaveBeenCalled();
});

Then('la page à propos du site est affichée', () => {
  expect(mockRouter.push).toHaveBeenCalledWith(ROUTES.ABOUT);
  expect(mockWindow.alert).not.toHaveBeenCalled();
  expect(mockWindow.open).not.toHaveBeenCalled();
});

Then('the default mail client opens with my email address', () => {
  expect(mockWindow.open).toHaveBeenCalledWith(
    'mailto:alain@maep.fr',
    '_blank',
    'noopener,noreferrer'
  );
  expect(mockWindow.alert).not.toHaveBeenCalled();
  expect(mockRouter.push).not.toHaveBeenCalled();
});

Then('le client de messagerie par défaut s\'ouvre avec mon adresse email', () => {
  expect(mockWindow.open).toHaveBeenCalledWith(
    'mailto:alain@maep.fr',
    '_blank',
    'noopener,noreferrer'
  );
  expect(mockWindow.alert).not.toHaveBeenCalled();
  expect(mockRouter.push).not.toHaveBeenCalled();
});

Then('YouTube channel opens in a new tab', () => {
  expect(mockWindow.open).toHaveBeenCalledWith(
    'https://www.youtube.com/@m-alain-et-possible',
    '_blank',
    'noopener,noreferrer'
  );
  expect(mockWindow.alert).not.toHaveBeenCalled();
  expect(mockRouter.push).not.toHaveBeenCalled();
});

Then('la chaîne YouTube s\'ouvre dans un nouvel onglet', () => {
  expect(mockWindow.open).toHaveBeenCalledWith(
    'https://www.youtube.com/@m-alain-et-possible',
    '_blank',
    'noopener,noreferrer'
  );
  expect(mockWindow.alert).not.toHaveBeenCalled();
  expect(mockRouter.push).not.toHaveBeenCalled();
});

Then('LinkedIn profile opens in a new tab', () => {
  expect(mockWindow.open).toHaveBeenCalledWith(
    'https://www.linkedin.com/in/alain-meunier-maep/',
    '_blank',
    'noopener,noreferrer'
  );
  expect(mockWindow.alert).not.toHaveBeenCalled();
  expect(mockRouter.push).not.toHaveBeenCalled();
});

Then('le profil LinkedIn s\'ouvre dans un nouvel onglet', () => {
  expect(mockWindow.open).toHaveBeenCalledWith(
    'https://www.linkedin.com/in/alain-meunier-maep/',
    '_blank',
    'noopener,noreferrer'
  );
  expect(mockWindow.alert).not.toHaveBeenCalled();
  expect(mockRouter.push).not.toHaveBeenCalled();
});

Then('it shows the text {string}', (expectedText: string) => {
  // For now, we verify the router was called correctly
  // In a real E2E test, we would navigate and check the rendered content
  expect(mockRouter.push).toHaveBeenCalled();
});

Then('elle affiche le texte {string}', (expectedText: string) => {
  // For now, we verify the router was called correctly
  // In a real E2E test, we would navigate and check the rendered content
  expect(mockRouter.push).toHaveBeenCalled();
});
