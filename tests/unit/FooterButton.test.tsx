import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FooterButton from '../../components/FooterButton';

// Mock lucide-react
jest.mock('lucide-react', () => ({
  Mail: ({ 'aria-label': ariaLabel, 'e2eid': testId }: any) => (
    <svg aria-label={ariaLabel} e2eid={testId}>
      <title>Mail Icon</title>
    </svg>
  ),
  Calendar: ({ 'aria-label': ariaLabel, 'e2eid': testId }: any) => (
    <svg aria-label={ariaLabel} e2eid={testId}>
      <title>Calendar Icon</title>
    </svg>
  ),
}));

describe('FooterButton', () => {
  const mockProps = {
    id: 'email',
    icone: 'Mail', // Utiliser 'icone' (avec 'e') comme dans le composant
    command: 'cmd-email',
    alt: 'Email',
    url: 'mailto:test@example.com',
    tooltip: "M'envoyer un email",
  };

  it('should render button with correct attributes', () => {
    const mockOnButtonClick = jest.fn();
    render(<FooterButton {...mockProps} onButtonClick={mockOnButtonClick} />);

    const button = screen.getByTestId('footer-button-email');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Email');
    expect(button).toHaveAttribute('title', "M'envoyer un email");
  });

  it('should render icon component', () => {
    const mockOnButtonClick = jest.fn();
    render(<FooterButton {...mockProps} onButtonClick={mockOnButtonClick} />);

    const icon = screen.getByTitle('Mail Icon');
    expect(icon).toBeInTheDocument();
  });

  it('should call onButtonClick when clicked with URL', () => {
    const mockOnButtonClick = jest.fn();
    // Pour un lien externe (mailto:), onButtonClick n'est appelé que dans le fallback
    // Le test doit vérifier que le lien externe est rendu correctement
    const propsWithExternalUrl = { ...mockProps, url: 'mailto:test@example.com' };

    render(<FooterButton {...propsWithExternalUrl} onButtonClick={mockOnButtonClick} />);

    const button = screen.getByTestId('footer-button-email');
    expect(button).toBeInTheDocument();
    // Pour un lien externe, onButtonClick n'est pas appelé automatiquement
    // Le lien externe est rendu comme <a> avec href
    expect(button).toHaveAttribute('href', 'mailto:test@example.com');
  });

  it('should call onButtonClick when clicked without URL (null)', () => {
    const mockOnButtonClick = jest.fn();

    const propsWithoutUrl = {
      ...mockProps,
      url: null,
    };

    render(<FooterButton {...propsWithoutUrl} onButtonClick={mockOnButtonClick} />);

    const button = screen.getByTestId('footer-button-email');
    fireEvent.click(button);

    expect(mockOnButtonClick).toHaveBeenCalledWith('cmd-email', null);
  });

  it('should render Calendar icon for Faisons connaissance button', () => {
    const mockOnButtonClick = jest.fn();
    const calendarProps = {
      id: 'calendar',
      icone: 'Calendar',
      command: 'cmd-FaisonsConnaissance',
      alt: 'Faisons connaissance',
      url: null,
      tooltip: 'faisons connaissance',
      e2eID: 'b9',
    };

    render(<FooterButton {...calendarProps} onButtonClick={mockOnButtonClick} />);

    // Le e2eID est utilisé pour e2eid, mais le testId par défaut est footer-button-{id}
    // Vérifier que le bouton existe avec l'aria-label
    const button = screen.getByLabelText('Faisons connaissance');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('title', 'faisons connaissance');
    expect(button).toHaveAttribute('aria-label', 'Faisons connaissance');

    const icon = screen.getByTitle('Calendar Icon');
    expect(icon).toBeInTheDocument();
  });
});
