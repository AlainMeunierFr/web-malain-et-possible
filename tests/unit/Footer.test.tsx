/**
 * Tests pour Footer - TDD
 */

import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import Footer from '../../components/Footer';

// Mock next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock FooterButton
jest.mock('../../components/FooterButton', () => ({
  __esModule: true,
  default: ({ id, onButtonClick }: any) => (
    <button data-e2eid={`footer-button-${id}`} onClick={() => onButtonClick('cmd-test', null)}>
      {id}
    </button>
  ),
}));

describe('Footer', () => {
  beforeEach(() => {
    mockPush.mockClear();
    jest.clearAllMocks();
    
    // Mock fetch global
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ version: '1.0.0' }),
      })
    ) as jest.Mock;
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('devrait afficher le footer', async () => {
    let container: HTMLElement;
    await act(async () => {
      const result = render(<Footer />);
      container = result.container;
    });
    
    expect(container!.querySelector('footer')).toBeInTheDocument();
  });

  it('devrait afficher des boutons', async () => {
    await act(async () => {
      render(<Footer />);
    });
    
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('devrait avoir la classe CSS footer', async () => {
    let container: HTMLElement;
    await act(async () => {
      const result = render(<Footer />);
      container = result.container;
    });
    
    expect(container!.querySelector('footer')).toHaveClass('footer');
  });
});
