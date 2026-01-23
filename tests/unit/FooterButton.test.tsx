import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FooterButton from '../../components/FooterButton';

// Mock lucide-react
jest.mock('lucide-react', () => ({
  Mail: ({ 'aria-label': ariaLabel, 'data-e2eid': testId }: any) => (
    <svg aria-label={ariaLabel} data-e2eid={testId}>
      <title>Mail Icon</title>
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

    render(<FooterButton {...mockProps} onButtonClick={mockOnButtonClick} />);

    const button = screen.getByTestId('footer-button-email');
    fireEvent.click(button);

    expect(mockOnButtonClick).toHaveBeenCalledWith('cmd-email', 'mailto:test@example.com');
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
});
