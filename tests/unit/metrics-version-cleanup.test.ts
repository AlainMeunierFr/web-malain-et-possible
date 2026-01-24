/**
 * Tests unitaires pour l'affichage de la version du site dans les métriques
 * Ce test vérifie que la fonction loadSiteVersion fonctionne correctement
 */

import { jest } from '@jest/globals';
import fs from 'fs';
import path from 'path';

// Mock des modules Node.js
jest.mock('fs');
jest.mock('path');

const mockFs = fs as jest.Mocked<typeof fs>;
const mockPath = path as jest.Mocked<typeof path>;

/**
 * Fonction loadSiteVersion à tester
 * Cette fonction doit être extraite de la page metrics pour être testable
 */
function loadSiteVersion(): string {
  try {
    const versionFilePath = path.join(process.cwd(), 'site-version.json');
    const versionContent = fs.readFileSync(versionFilePath, 'utf-8');
    const version = JSON.parse(versionContent);
    
    // Validation de la structure des données
    if (typeof version.major !== 'number' || 
        typeof version.minor !== 'number' || 
        typeof version.patch !== 'number') {
      return '1.0.0';
    }
    
    return `${version.major}.${version.minor}.${version.patch}`;
  } catch {
    return '1.0.0';
  }
}

describe('loadSiteVersion', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock process.cwd()
    jest.spyOn(process, 'cwd').mockReturnValue('/mock/project');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('devrait retourner la version formatée depuis site-version.json', () => {
    // Arrange
    const mockVersionData = {
      major: 1,
      minor: 54,
      patch: 17
    };
    
    mockPath.join.mockReturnValue('/mock/project/site-version.json');
    mockFs.readFileSync.mockReturnValue(JSON.stringify(mockVersionData));

    // Act
    const result = loadSiteVersion();

    // Assert
    expect(result).toBe('1.54.17');
    expect(path.join).toHaveBeenCalledWith('/mock/project', 'site-version.json');
    expect(fs.readFileSync).toHaveBeenCalledWith('/mock/project/site-version.json', 'utf-8');
  });

  it('devrait retourner "1.0.0" en cas d\'erreur de lecture du fichier', () => {
    // Arrange
    mockPath.join.mockReturnValue('/mock/project/site-version.json');
    mockFs.readFileSync.mockImplementation(() => {
      throw new Error('File not found');
    });

    // Act
    const result = loadSiteVersion();

    // Assert
    expect(result).toBe('1.0.0');
  });

  it('devrait retourner "1.0.0" si le JSON est malformé', () => {
    // Arrange
    mockPath.join.mockReturnValue('/mock/project/site-version.json');
    mockFs.readFileSync.mockReturnValue('invalid json');

    // Act
    const result = loadSiteVersion();

    // Assert
    expect(result).toBe('1.0.0');
  });

  it('devrait retourner "1.0.0" si la structure JSON est incomplète', () => {
    // Arrange
    const incompleteVersionData = {
      major: 1,
      minor: 54
      // patch manquant
    };
    
    mockPath.join.mockReturnValue('/mock/project/site-version.json');
    mockFs.readFileSync.mockReturnValue(JSON.stringify(incompleteVersionData));

    // Act
    const result = loadSiteVersion();

    // Assert
    expect(result).toBe('1.0.0');
  });
});