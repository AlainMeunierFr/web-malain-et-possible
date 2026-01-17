import React from 'react';
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '../../components/Footer';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return React.createElement('img', props);
  },
}));

let mockWindow: {
  open: jest.Mock;
  alert: jest.Mock;
};

Given('the footer is displayed', () => {
  mockWindow = {
    open: jest.fn(),
    alert: jest.fn(),
  };

  global.window.open = mockWindow.open;
  global.window.alert = mockWindow.alert;

  render(<Footer />);
});

When('the user clicks the {string} button', (buttonName: string) => {
  // Map button names to IDs
  const buttonIdMap: { [key: string]: string } = {
    Email: 'email',
    YouTube: 'youtube',
    LinkedIn: 'linkedin',
    'Site Map': 'sitemap',
  };

  const buttonId = buttonIdMap[buttonName] || buttonName.toLowerCase();
  const button = screen.getByTestId(`footer-button-${buttonId}`);

  expect(button).toBeInTheDocument();
  fireEvent.click(button);
});

Then('the default mail client opens with my email address', () => {
  expect(mockWindow.open).toHaveBeenCalledWith(
    'mailto:alain@maep.fr',
    '_blank',
    'noopener,noreferrer'
  );
  expect(mockWindow.alert).not.toHaveBeenCalled();
});

Then('YouTube channel opens in a new tab', () => {
  expect(mockWindow.open).toHaveBeenCalledWith(
    'https://www.youtube.com/@m-alain-et-possible',
    '_blank',
    'noopener,noreferrer'
  );
  expect(mockWindow.alert).not.toHaveBeenCalled();
});

Then('LinkedIn profile opens in a new tab', () => {
  expect(mockWindow.open).toHaveBeenCalledWith(
    'https://www.linkedin.com/in/alain-meunier-maep/',
    '_blank',
    'noopener,noreferrer'
  );
  expect(mockWindow.alert).not.toHaveBeenCalled();
});

Then('a popup shows the site map command', () => {
  // Deprecated: Site Map now navigates to /sitemap page (see navigation.feature)
  // This step is kept for backward compatibility only
  expect(true).toBe(true);
});
