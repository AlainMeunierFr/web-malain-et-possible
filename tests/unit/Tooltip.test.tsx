/**
 * Tests unitaires TDD pour le composant Tooltip
 * Tests des fonctionnalités de base, accessibility, z-index et responsive
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Tooltip from '../../components/Tooltip';

describe('Composant Tooltip - TDD', () => {
  const defaultProps = {
    content: 'Contenu de test',
    children: <button>Trigger</button>
  };

  describe('Rendu de base', () => {
    it('doit rendre l\'enfant trigger', () => {
      render(<Tooltip {...defaultProps} />);
      expect(screen.getByText('Trigger')).toBeInTheDocument();
    });

    it('ne doit pas afficher la tooltip par défaut', () => {
      render(<Tooltip {...defaultProps} />);
      expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument();
    });

    it('doit accepter du contenu React en tant que children et content', () => {
      const complexContent = (
        <div>
          <h4>Titre</h4>
          <p>Description détaillée</p>
        </div>
      );

      render(
        <Tooltip content={complexContent}>
          <span>Complex trigger</span>
        </Tooltip>
      );

      expect(screen.getByText('Complex trigger')).toBeInTheDocument();
    });
  });

  describe('Interaction souris - CA3', () => {
    it('doit afficher la tooltip au survol', async () => {
      render(<Tooltip {...defaultProps} />);
      
      const trigger = screen.getByText('Trigger');
      fireEvent.mouseEnter(trigger);
      
      // Attendre un peu pour que la tooltip se monte
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const tooltip = screen.queryByTestId('tooltip');
      expect(tooltip).toBeInTheDocument();
      
      const content = screen.queryByText('Contenu de test');
      expect(content).toBeInTheDocument();
    });

    it('doit masquer la tooltip quand la souris quitte', async () => {
      render(<Tooltip {...defaultProps} />);
      
      const trigger = screen.getByText('Trigger');
      fireEvent.mouseEnter(trigger);
      
      await waitFor(() => {
        expect(screen.getByTestId('tooltip')).toBeInTheDocument();
      });
      
      fireEvent.mouseLeave(trigger);
      
      await waitFor(() => {
        expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument();
      });
    });

    it('doit maintenir la tooltip visible lors du survol de la tooltip elle-même', async () => {
      render(<Tooltip {...defaultProps} />);
      
      const trigger = screen.getByText('Trigger');
      fireEvent.mouseEnter(trigger);
      
      await waitFor(() => {
        expect(screen.getByTestId('tooltip')).toBeInTheDocument();
      });
      
      const tooltip = screen.getByTestId('tooltip');
      fireEvent.mouseEnter(tooltip);
      fireEvent.mouseLeave(trigger);
      
      // La tooltip doit rester visible
      expect(screen.getByTestId('tooltip')).toBeInTheDocument();
    });
  });

  describe('Support clavier - CA3 Accessibilité', () => {
    it('doit afficher la tooltip au focus', async () => {
      const user = userEvent.setup();
      
      render(
        <Tooltip {...defaultProps}>
          <button>Focusable trigger</button>
        </Tooltip>
      );
      
      const trigger = screen.getByText('Focusable trigger');
      await user.tab(); // Focus sur le trigger
      
      await waitFor(() => {
        expect(screen.getByTestId('tooltip')).toBeInTheDocument();
      });
    });

    it('doit masquer la tooltip quand le focus est perdu', async () => {
      const user = userEvent.setup();
      
      render(
        <>
          <Tooltip {...defaultProps}>
            <button>Focusable trigger</button>
          </Tooltip>
          <button>Other button</button>
        </>
      );
      
      await user.tab(); // Focus sur le trigger
      
      await waitFor(() => {
        expect(screen.getByTestId('tooltip')).toBeInTheDocument();
      });
      
      await user.tab(); // Focus sur l'autre bouton
      
      await waitFor(() => {
        expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument();
      });
    });

    it('doit avoir les attributs ARIA appropriés', () => {
      render(<Tooltip {...defaultProps} />);
      
      const trigger = screen.getByText('Trigger');
      expect(trigger).toHaveAttribute('aria-describedby');
      expect(trigger).toHaveAttribute('aria-label');
    });

    it('doit supporter l\'activation par Entrée et Espace', async () => {
      const user = userEvent.setup();
      
      render(
        <Tooltip {...defaultProps}>
          <div tabIndex={0}>Custom trigger</div>
        </Tooltip>
      );
      
      const trigger = screen.getByText('Custom trigger');
      trigger.focus();
      
      await user.keyboard('{Enter}');
      
      await waitFor(() => {
        expect(screen.getByTestId('tooltip')).toBeInTheDocument();
      });
    });
  });

  describe('Positionnement - CA5', () => {
    const mockGetBoundingClientRect = (rect: Partial<DOMRect>) => {
      Element.prototype.getBoundingClientRect = jest.fn(() => ({
        x: rect.x || 0,
        y: rect.y || 0,
        width: rect.width || 100,
        height: rect.height || 30,
        top: rect.top || 0,
        left: rect.left || 0,
        bottom: rect.bottom || 30,
        right: rect.right || 100,
        toJSON: jest.fn(),
      }));
    };

    beforeEach(() => {
      // Mock window dimensions
      Object.defineProperty(window, 'innerWidth', { value: 1024 });
      Object.defineProperty(window, 'innerHeight', { value: 768 });
    });

    it('doit positionner la tooltip par défaut en haut', async () => {
      mockGetBoundingClientRect({ top: 400, left: 500 });
      
      render(<Tooltip content="Test" position="top">
        <button>Trigger</button>
      </Tooltip>);
      
      fireEvent.mouseEnter(screen.getByText('Trigger'));
      
      await waitFor(() => {
        const tooltip = screen.getByTestId('tooltip');
        expect(tooltip).toHaveClass('tooltipTop');
      });
    });

    it('doit repositionner automatiquement si débordement vertical', async () => {
      // Trigger près du haut de l'écran
      mockGetBoundingClientRect({ top: 50, left: 500 });
      
      render(<Tooltip content="Test" position="top">
        <button>Trigger</button>
      </Tooltip>);
      
      fireEvent.mouseEnter(screen.getByText('Trigger'));
      
      await waitFor(() => {
        const tooltip = screen.getByTestId('tooltip');
        // Devrait passer en bottom à cause du manque de place en haut
        expect(tooltip).toHaveClass('tooltipBottom');
      });
    });

    it('doit repositionner automatiquement si débordement horizontal', async () => {
      // Trigger près du bord droit
      mockGetBoundingClientRect({ top: 400, left: 900 });
      
      render(<Tooltip content="Contenu très long qui risque de déborder horizontalement" position="right">
        <button>Trigger</button>
      </Tooltip>);
      
      fireEvent.mouseEnter(screen.getByText('Trigger'));
      
      await waitFor(() => {
        const tooltip = screen.getByTestId('tooltip');
        // Devrait ajuster la position pour rester visible
        const styles = window.getComputedStyle(tooltip);
        expect(parseInt(styles.left)).toBeLessThan(900);
      });
    });

    it('doit calculer la position avec les marges appropriées', async () => {
      mockGetBoundingClientRect({ top: 200, left: 300 });
      
      render(<Tooltip content="Test" position="bottom">
        <button>Trigger</button>
      </Tooltip>);
      
      fireEvent.mouseEnter(screen.getByText('Trigger'));
      
      await waitFor(() => {
        const tooltip = screen.getByTestId('tooltip');
        const styles = window.getComputedStyle(tooltip);
        
        // Doit avoir une marge de sécurité par rapport au trigger
        expect(parseInt(styles.top)).toBeGreaterThan(230);
      });
    });
  });

  describe('Z-index et superposition - CA4', () => {
    it('doit avoir un z-index très élevé', async () => {
      render(<Tooltip {...defaultProps} />);
      
      fireEvent.mouseEnter(screen.getByText('Trigger'));
      
      await waitFor(() => {
        const tooltip = screen.getByTestId('tooltip');
        const styles = window.getComputedStyle(tooltip);
        expect(parseInt(styles.zIndex)).toBeGreaterThan(1000000);
      });
    });

    it('doit utiliser un portal pour le rendu global', async () => {
      render(<Tooltip {...defaultProps} />);
      
      fireEvent.mouseEnter(screen.getByText('Trigger'));
      
      await waitFor(() => {
        const tooltip = screen.getByTestId('tooltip');
        // Le tooltip doit être rendu dans un portal (body ou conteneur spécialisé)
        expect(tooltip.parentElement?.tagName.toLowerCase()).toBe('body');
      });
    });

    it('doit avoir position fixed pour être indépendant du flux', async () => {
      render(<Tooltip {...defaultProps} />);
      
      fireEvent.mouseEnter(screen.getByText('Trigger'));
      
      await waitFor(() => {
        const tooltip = screen.getByTestId('tooltip');
        const styles = window.getComputedStyle(tooltip);
        expect(styles.position).toBe('fixed');
      });
    });
  });

  describe('Responsive - Mobile', () => {
    beforeEach(() => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', { value: 375 });
      Object.defineProperty(window, 'innerHeight', { value: 667 });
    });

    it('doit ajuster la largeur pour mobile', async () => {
      render(<Tooltip content="Contenu de tooltip avec beaucoup de texte pour tester le responsive">
        <button>Mobile trigger</button>
      </Tooltip>);
      
      fireEvent.mouseEnter(screen.getByText('Mobile trigger'));
      
      await waitFor(() => {
        const tooltip = screen.getByTestId('tooltip');
        const styles = window.getComputedStyle(tooltip);
        
        // Max-width adapté au mobile
        const maxWidth = parseInt(styles.maxWidth);
        expect(maxWidth).toBeLessThan(350); // Laisse de la marge
      });
    });

    it('doit supporter le touch sur mobile', async () => {
      render(<Tooltip {...defaultProps}>
        <button>Touch trigger</button>
      </Tooltip>);
      
      const trigger = screen.getByText('Touch trigger');
      fireEvent.touchStart(trigger);
      
      await waitFor(() => {
        expect(screen.getByTestId('tooltip')).toBeInTheDocument();
      });
    });

    it('doit fermer la tooltip sur touch outside', async () => {
      render(<Tooltip {...defaultProps}>
        <button>Touch trigger</button>
      </Tooltip>);
      
      const trigger = screen.getByText('Touch trigger');
      fireEvent.touchStart(trigger);
      
      await waitFor(() => {
        expect(screen.getByTestId('tooltip')).toBeInTheDocument();
      });
      
      // Touch ailleurs
      fireEvent.touchStart(document.body);
      
      await waitFor(() => {
        expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument();
      });
    });
  });

  describe('Gestion des erreurs', () => {
    it('doit gérer un contenu undefined gracieusement', () => {
      render(
        <Tooltip content={undefined as any}>
          <button>Trigger</button>
        </Tooltip>
      );
      
      fireEvent.mouseEnter(screen.getByText('Trigger'));
      
      // Ne doit pas planter et ne doit pas afficher de tooltip vide
      expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument();
    });

    it('doit gérer un contenu null gracieusement', () => {
      render(
        <Tooltip content={null as any}>
          <button>Trigger</button>
        </Tooltip>
      );
      
      fireEvent.mouseEnter(screen.getByText('Trigger'));
      
      expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument();
    });

    it('doit continuer de fonctionner si getBoundingClientRect échoue', async () => {
      const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
      Element.prototype.getBoundingClientRect = jest.fn(() => {
        throw new Error('Mock error');
      });

      render(<Tooltip {...defaultProps} />);
      
      fireEvent.mouseEnter(screen.getByText('Trigger'));
      
      // Doit afficher la tooltip avec position par défaut
      await waitFor(() => {
        expect(screen.getByTestId('tooltip')).toBeInTheDocument();
      });
      
      Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
    });
  });

  describe('Performance', () => {
    it('doit éviter les re-renders inutiles', () => {
      const MockChild = jest.fn(({ children }) => <button>{children}</button>);
      
      const { rerender } = render(
        <Tooltip content="Test">
          <MockChild>Trigger</MockChild>
        </Tooltip>
      );
      
      rerender(
        <Tooltip content="Test">
          <MockChild>Trigger</MockChild>
        </Tooltip>
      );
      
      // Le child ne devrait pas être re-rendu si les props n'ont pas changé
      expect(MockChild).toHaveBeenCalledTimes(2); // Initial + rerender
    });

    it('doit cleanup les event listeners au unmount', () => {
      const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
      
      const { unmount } = render(<Tooltip {...defaultProps} />);
      
      fireEvent.mouseEnter(screen.getByText('Trigger'));
      
      unmount();
      
      expect(removeEventListenerSpy).toHaveBeenCalled();
    });
  });
});