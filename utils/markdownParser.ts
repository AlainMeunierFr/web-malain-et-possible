/**
 * Parse Markdown DOD file into structured data
 */

interface DODTheme {
  theme: string;
  items: string[];
}

export interface ParsedDOD {
  title: string;
  description: string;
  themes: DODTheme[];
}

export const parseMarkdownDOD = (markdownContent: string): ParsedDOD => {
  const lines = markdownContent.split('\n').map((line) => line.trim());

  const titleIndex = lines.findIndex((line) => line.startsWith('# '));
  const title = titleIndex >= 0 ? lines[titleIndex].replace('# ', '') : 'Definition of Done';
  
  // Description is the first non-empty line after the title, before the first theme
  const firstThemeIndex = lines.findIndex((line) => line.startsWith('## '));
  const descriptionStart = titleIndex + 1;
  const descriptionEnd = firstThemeIndex > 0 ? firstThemeIndex : lines.length;
  const description = lines
    .slice(descriptionStart, descriptionEnd)
    .find((line) => line && line.length > 0) || '';

  const themes: DODTheme[] = [];
  let currentTheme: DODTheme | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect theme headers (## 1. Theme Name)
    if (line.startsWith('## ')) {
      if (currentTheme) {
        themes.push(currentTheme);
      }
      currentTheme = {
        theme: line.replace('## ', ''),
        items: [],
      };
    }
    // Detect list items under a theme
    else if (line.startsWith('- ') && currentTheme) {
      const item = line.replace('- ', '').trim();
      currentTheme.items.push(item);
    }
  }

  // Don't forget the last theme
  if (currentTheme) {
    themes.push(currentTheme);
  }

  return {
    title,
    description,
    themes,
  };
};
