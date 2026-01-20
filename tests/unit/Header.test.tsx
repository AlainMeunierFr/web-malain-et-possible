/**
 * Tests pour Header - TDD
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../components/Header';

// Mock next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('Header', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('devrait afficher le header', () => {
    const { container } = render(<Header />);
    
    expect(container.querySelector('header')).toBeInTheDocument();
  });

  it('devrait afficher le logo', () => {
    render(<Header />);
    
    const logo = screen.getByRole('button');
    expect(logo).toBeInTheDocument();
  });

  it('devrait naviguer vers HOME au clic sur le logo', () => {
    render(<Header />);
    
    const logo = screen.getByRole('button');
    fireEvent.click(logo);
    
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('devrait naviguer vers HOME avec Enter sur le logo', () => {
    render(<Header />);
    
    const logo = screen.getByRole('button');
    fireEvent.keyDown(logo, { key: 'Enter' });
    
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('devrait naviguer vers HOME avec Space sur le logo', () => {
    render(<Header />);
    
    const logo = screen.getByRole('button');
    fireEvent.keyDown(logo, { key: ' ' });
    
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('ne devrait pas naviguer avec une autre touche', () => {
    render(<Header />);
    
    const logo = screen.getByRole('button');
    fireEvent.keyDown(logo, { key: 'a' });
    
    expect(mockPush).not.toHaveBeenCalled();
  });
});
