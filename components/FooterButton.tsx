'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Footer.module.css';
import type { FooterButton } from '../types/footer';

export interface FooterButtonProps extends FooterButton {
  onButtonClick: (command: string, url: string | null) => void;
}

const FooterButton: React.FC<FooterButtonProps> = ({
  id,
  image,
  command,
  alt,
  url,
  tooltip,
  onButtonClick,
}) => {
  const handleClick = () => {
    onButtonClick(command, url);
  };

  return (
    <button
      className={styles.iconButton}
      onClick={handleClick}
      aria-label={alt}
      title={tooltip}
      data-testid={`footer-button-${id}`}
      type="button"
    >
      <Image
        src={image}
        alt={alt}
        width={40}
        height={40}
        className={styles.iconImage}
      />
    </button>
  );
};

export default FooterButton;
