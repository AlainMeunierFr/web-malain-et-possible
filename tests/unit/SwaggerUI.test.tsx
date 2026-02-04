/**
 * Tests unitaires pour le composant SwaggerUI
 * US-12.6 - CA6 : Documentation Swagger
 */

import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock swagger-ui-react car il n'est pas compatible avec jsdom
jest.mock('swagger-ui-react', () => {
  return function MockSwaggerUI({ url }: { url: string }) {
    return <div data-testid="swagger-ui" data-url={url}>Swagger UI Mock</div>;
  };
});

jest.mock('swagger-ui-react/swagger-ui.css', () => ({}));

// Mock next/dynamic pour les tests
jest.mock('next/dynamic', () => {
  return function mockDynamic(
    importFn: () => Promise<{ default: React.ComponentType<{ url: string }> }>,
  ) {
    // Retourne un composant qui mocke le comportement de dynamic
    const MockedComponent = ({ url }: { url: string }) => {
      return <div e2eid="swagger-ui" data-url={url}>Swagger UI Mock</div>;
    };
    MockedComponent.displayName = 'DynamicSwaggerUI';
    return MockedComponent;
  };
});

import SwaggerUIWrapper from '../../components/SwaggerUIWrapper';

describe('SwaggerUIWrapper', () => {
  it('rend le composant Swagger UI', () => {
    render(<SwaggerUIWrapper specUrl="/api/vitrine/openapi.json" />);
    
    expect(screen.getByTestId('swagger-ui')).toBeInTheDocument();
  });

  it('passe l\'URL de la spec au composant Swagger UI', () => {
    render(<SwaggerUIWrapper specUrl="/api/vitrine/openapi.json" />);
    
    const swaggerUI = screen.getByTestId('swagger-ui');
    expect(swaggerUI).toHaveAttribute('data-url', '/api/vitrine/openapi.json');
  });

  it('affiche un titre', () => {
    render(<SwaggerUIWrapper specUrl="/api/vitrine/openapi.json" />);
    
    expect(screen.getByRole('heading', { name: /API Vitrine/i })).toBeInTheDocument();
  });
});
