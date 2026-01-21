/**
 * Tests d'intégration pour la validation des fichiers JSON du dossier data/
 * 
 * Objectif : Détecter les types inconnus et les erreurs de structure avant le runtime
 * Direction du contrôle : JSON → App (validation que tous les types dans les JSON sont connus de l'app)
 * 
 * TDD strict : Progression du simple au complexe avec itérations numérotées
 */

import fs from 'fs';
import path from 'path';

// Types de contenu connus par l'application (définis dans utils/indexReader.ts ligne 39)
const TYPES_CONNUS: string[] = [
  'titre',
  'video',
  'texteLarge',
  'domaineDeCompetence',
  'callToAction',
  'groupeBoutons',
  'temoignages',
  'videoDetournement',
];

describe('Validation des fichiers JSON du dossier data/', () => {
  const dataDir = path.join(process.cwd(), 'data');

  // ========================================
  // ITÉRATION 1 : Lire les fichiers JSON du dossier data/
  // ========================================
  describe('ITÉRATION 1 : Lecture des fichiers JSON', () => {
    it('devrait lire tous les fichiers JSON du dossier data/ (au moins 10 fichiers)', () => {
      // Arrange & Act
      const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));

      // Assert
      expect(files.length).toBeGreaterThanOrEqual(10);
    });
  });

  // ========================================
  // ITÉRATION 2 : Parser chaque fichier JSON sans erreur
  // ========================================
  describe('ITÉRATION 2 : Parsing JSON', () => {
    it('devrait parser tous les fichiers JSON sans erreur', () => {
      // Arrange
      const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));

      // Act & Assert
      files.forEach(file => {
        const filePath = path.join(dataDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        try {
          JSON.parse(fileContent);
        } catch (error) {
          throw new Error(`Erreur de parsing dans le fichier ${file}: ${(error as Error).message}`);
        }
      });
    });
  });

  // ========================================
  // ITÉRATION 3 : Vérifier qu'aucun fichier n'est vide
  // ========================================
  describe('ITÉRATION 3 : Fichiers non vides', () => {
    it('ne devrait pas avoir de fichiers JSON vides', () => {
      // Arrange
      const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));

      // Act & Assert
      files.forEach(file => {
        const filePath = path.join(dataDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileContent);

        expect(data).toBeTruthy();
        expect(Object.keys(data).length).toBeGreaterThan(0);
      });
    });
  });

  // ========================================
  // ITÉRATION 4 : Extraire les types des éléments de contenu
  // ========================================
  describe('ITÉRATION 4 : Extraction des types', () => {
    it('devrait extraire tous les types trouvés dans les fichiers JSON avec contenu', () => {
      // Arrange
      const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));

      // Act
      const typesExtraits = new Set<string>();
      files.forEach(file => {
        const filePath = path.join(dataDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileContent);

        // Si le fichier a un champ "contenu" qui est un tableau
        if (data.contenu && Array.isArray(data.contenu)) {
          data.contenu.forEach((element: any) => {
            if (element.type) {
              typesExtraits.add(element.type);
            }
          });
        }
      });

      // Assert
      expect(typesExtraits.size).toBeGreaterThan(0);
    });

    it('devrait compter le nombre total d\'éléments de contenu analysés', () => {
      // Arrange
      const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));

      // Act
      let nombreElementsTotal = 0;
      files.forEach(file => {
        const filePath = path.join(dataDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileContent);

        if (data.contenu && Array.isArray(data.contenu)) {
          nombreElementsTotal += data.contenu.length;
        }
      });

      // Assert
      expect(nombreElementsTotal).toBeGreaterThan(0);
    });
  });

  // ========================================
  // ITÉRATION 5 : Valider que les types sont connus (CŒUR DE L'US)
  // ========================================
  describe('ITÉRATION 5 : Validation des types connus', () => {
    it('devrait valider que tous les types trouvés sont connus de l\'application', () => {
      // Arrange
      const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));

      // Act & Assert
      files.forEach(file => {
        const filePath = path.join(dataDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileContent);

        if (data.contenu && Array.isArray(data.contenu)) {
          data.contenu.forEach((element: any, index: number) => {
            if (element.type) {
              expect(TYPES_CONNUS).toContain(element.type);
            }
          });
        }
      });
    });
  });

  // ========================================
  // ITÉRATION 6 : Gérer les types inconnus avec message explicite
  // ========================================
  describe('ITÉRATION 6 : Détection des types inconnus', () => {
    it('devrait détecter les types inconnus et afficher un message explicite', () => {
      // Arrange
      const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));
      const erreursDetectees: string[] = [];

      // Act
      files.forEach(file => {
        const filePath = path.join(dataDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileContent);

        if (data.contenu && Array.isArray(data.contenu)) {
          data.contenu.forEach((element: any, index: number) => {
            if (element.type && !TYPES_CONNUS.includes(element.type)) {
              erreursDetectees.push(
                `Type inconnu '${element.type}' trouvé dans ${file} à l'index ${index}. ` +
                `Actions possibles : 1) Supprimer l'objet du JSON, 2) Implémenter le type dans PageContentRenderer`
              );
            }
          });
        }
      });

      // Assert
      if (erreursDetectees.length > 0) {
        fail(`Types inconnus détectés:\n${erreursDetectees.join('\n')}`);
      }
      expect(erreursDetectees.length).toBe(0);
    });
  });

  // ========================================
  // ITÉRATION 7 : Valider les structures imbriquées
  // ========================================
  describe('ITÉRATION 7 : Validation des structures imbriquées', () => {
    it('devrait valider les champs obligatoires pour le type domaineDeCompetence', () => {
      // Arrange
      const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));
      const erreursDetectees: string[] = [];

      // Act
      files.forEach(file => {
        const filePath = path.join(dataDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileContent);

        if (data.contenu && Array.isArray(data.contenu)) {
          data.contenu.forEach((element: any, index: number) => {
            if (element.type === 'domaineDeCompetence') {
              if (!element.titre || typeof element.titre !== 'string') {
                erreursDetectees.push(
                  `Champ obligatoire 'titre' manquant ou invalide dans ${file} à l'index ${index} (type: domaineDeCompetence)`
                );
              }
              if (!element.items || !Array.isArray(element.items)) {
                erreursDetectees.push(
                  `Champ obligatoire 'items' manquant ou invalide dans ${file} à l'index ${index} (type: domaineDeCompetence)`
                );
              }
            }
          });
        }
      });

      // Assert
      if (erreursDetectees.length > 0) {
        fail(`Structures imbriquées invalides:\n${erreursDetectees.join('\n')}`);
      }
      expect(erreursDetectees.length).toBe(0);
    });

    it('devrait accepter soit items soit source pour temoignages et videoDetournement', () => {
      // Arrange
      const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));
      const erreursDetectees: string[] = [];

      // Act
      files.forEach(file => {
        const filePath = path.join(dataDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileContent);

        if (data.contenu && Array.isArray(data.contenu)) {
          data.contenu.forEach((element: any, index: number) => {
            if (element.type === 'temoignages' || element.type === 'videoDetournement') {
              if (!element.items && !element.source) {
                erreursDetectees.push(
                  `Le type '${element.type}' dans ${file} à l'index ${index} doit avoir soit 'items' soit 'source'`
                );
              }
            }
          });
        }
      });

      // Assert
      if (erreursDetectees.length > 0) {
        fail(`Structures imbriquées invalides:\n${erreursDetectees.join('\n')}`);
      }
      expect(erreursDetectees.length).toBe(0);
    });
  });

  // ========================================
  // ITÉRATION 8 : Générer le rapport de validation
  // ========================================
  describe('ITÉRATION 8 : Rapport de validation', () => {
    it('devrait afficher un rapport de validation complet', () => {
      // Arrange
      const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));

      // Act
      let nombreElementsTotal = 0;
      const typesFrequence = new Map<string, number>();

      files.forEach(file => {
        const filePath = path.join(dataDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileContent);

        if (data.contenu && Array.isArray(data.contenu)) {
          nombreElementsTotal += data.contenu.length;
          
          data.contenu.forEach((element: any) => {
            if (element.type) {
              const count = typesFrequence.get(element.type) || 0;
              typesFrequence.set(element.type, count + 1);
            }
          });
        }
      });

      // Générer le rapport
      const typesListe = Array.from(typesFrequence.entries())
        .sort((a, b) => b[1] - a[1]) // Trier par fréquence décroissante
        .map(([type, count]) => `${type} (${count})`)
        .join(', ');

      const rapport = `
✓ ${files.length} fichiers JSON validés
✓ ${nombreElementsTotal} éléments de contenu analysés
✓ Types trouvés : ${typesListe}
      `.trim();

      // Afficher le rapport
      console.log('\n' + rapport + '\n');

      // Assert
      expect(files.length).toBeGreaterThanOrEqual(10);
      expect(nombreElementsTotal).toBeGreaterThan(0);
      expect(typesFrequence.size).toBeGreaterThan(0);
    });
  });
});
