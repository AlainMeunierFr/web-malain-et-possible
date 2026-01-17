import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FooterButton from '../../components/FooterButton';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return React.createElement('img', props);
  },
}));

describe('FooterButton', () => {
  const mockProps = {
    id: 'email',
    image: '/images/Bouton - email.JPG',
    command: 'cmd-email',
    alt: 'Email',
    url: 'mailto:test@example.com',
    tooltip: "M'envoyer un email",
  };

  it('should render button with correct attributes', () => {
    render(<FooterButton {...mockProps} />);

    const button = screen.getByTestId('footer-button-email');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Email');
    expect(button).toHaveAttribute('title', "M'envoyer un email");
  });

  it('should render image with correct src and alt', () => {
    render(<FooterButton {...mockProps} />);

    const image = screen.getByAltText('Email');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/Bouton - email.JPG');
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
