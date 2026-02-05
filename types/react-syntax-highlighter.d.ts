/**
 * Déclarations pour react-syntax-highlighter v16.
 * @types/react-syntax-highlighter ne couvre que la v15 ; la v16 expose dist/cjs et n'est pas typée.
 */
import type { ComponentType, CSSProperties } from 'react';

declare module 'react-syntax-highlighter' {
  export interface SyntaxHighlighterProps {
    language?: string;
    style?: Record<string, CSSProperties>;
    customStyle?: CSSProperties;
    children?: string;
    showLineNumbers?: boolean;
    [key: string]: unknown;
  }

  export const Prism: ComponentType<SyntaxHighlighterProps>;
  export const Light: ComponentType<SyntaxHighlighterProps>;
}

declare module 'react-syntax-highlighter/dist/cjs/styles/prism/one-light' {
  const style: Record<string, CSSProperties>;
  export default style;
}
