/**
 * Test d'intégration : Validation des vrais fichiers MD du projet
 * 
 * Ce test lit tous les fichiers MD réels dans "A propos de ce site" et valide qu'ils respectent les règles.
 * Il doit faire échouer le build si un fichier contient un H1/H2, permettant de détecter les erreurs
 * lors des tests plutôt qu'au runtime dans le navigateur.
 * 
 * NOTE : Ce test utilise fs réel (non mocké) pour lire les vrais fichiers du projet.
 */

import fs from 'fs';
import path from 'path';
import { validerContenuMarkdown, ValidationError } from '../../utils/aboutSiteReader';

describe('Test d\'intégration : Validation des fichiers MD réels', () => {
  it('devrait valider tous les fichiers MD dans "A propos de ce site"', () => {
    // ARRANGE : Chemin vers le dossier "A propos de ce site"
    const aboutSiteDir = path.join(process.cwd(), 'A propos de ce site');
    
    // Fonction récursive pour lire tous les fichiers MD
    const lireFichiersMD = (dir: string): string[] => {
      const fichiers: string[] = [];
      try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const cheminComplet = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            // Ignorer node_modules et .next
            if (entry.name !== 'node_modules' && entry.name !== '.next') {
              fichiers.push(...lireFichiersMD(cheminComplet));
            }
          } else if (entry.isFile() && entry.name.endsWith('.md')) {
            fichiers.push(cheminComplet);
          }
        }
      } catch (error) {
        // Ignorer les erreurs de lecture (dossiers inexistants, etc.)
      }
      return fichiers;
    };

    // ACT : Lire tous les fichiers MD et les valider
    const fichiersMD = lireFichiersMD(aboutSiteDir);
    const erreurs: string[] = [];

    for (const fichierPath of fichiersMD) {
      try {
        const contenu = fs.readFileSync(fichierPath, 'utf-8');
        validerContenuMarkdown(contenu, fichierPath);
      } catch (error) {
        if (error instanceof ValidationError) {
          erreurs.push(error.message);
        } else {
          erreurs.push(`Erreur inattendue lors de la validation de ${fichierPath}: ${error}`);
        }
      }
    }

    // ASSERT : Aucune erreur ne doit être trouvée
    if (erreurs.length > 0) {
      const messageErreur = `Erreurs de validation trouvées dans ${erreurs.length} fichier(s):\n${erreurs.join('\n')}`;
      throw new Error(messageErreur);
    }

    // Si on arrive ici, tous les fichiers sont valides
    expect(fichiersMD.length).toBeGreaterThan(0); // Au moins un fichier MD doit exister
  });
});
