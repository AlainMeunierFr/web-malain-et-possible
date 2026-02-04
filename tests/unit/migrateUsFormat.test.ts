/**
 * Tests unitaires pour le script de migration des US vers format Markdown standard
 * TDD Baby Steps - US-12.8
 */

import {
  convertUsToStandardFormat,
  detectUsPattern,
  parseEnTantQueJeSouhaiteAfinDe,
  detectLineType,
  parseContentLineByLine,
  MigrationResult,
  MigrationReport,
  migrateUsFile,
  generateMigrationReport,
} from '../../scripts/migrate-us-format';

describe('migrate-us-format', () => {
  describe('detectUsPattern', () => {
    it('détecte un fichier US valide (pattern US-X.Y)', () => {
      expect(detectUsPattern('US-12.8 - Migration US vers format Markdown standard.md')).toBe(true);
    });

    it('détecte un fichier US avec statut COMPLÉTÉ', () => {
      expect(detectUsPattern('US-11.6 - Clic post-it affichage detaille US en modal ✅ COMPLÉTÉ.md')).toBe(true);
    });

    it('détecte un fichier US avec statut COMPLETE sans accent', () => {
      expect(detectUsPattern('US-12.3 - Indicateur visuel en revue sur board Kanban COMPLETE.md')).toBe(true);
    });

    it('rejette un fichier non-US', () => {
      expect(detectUsPattern('README.md')).toBe(false);
    });

    it('rejette un fichier US en cours', () => {
      expect(detectUsPattern('US en cours.md')).toBe(false);
    });
  });

  describe('parseEnTantQueJeSouhaiteAfinDe', () => {
    it('parse le format à puces avec tiret et gras (format 1)', () => {
      const content = `# US-12.8 : Titre

- **En tant que** développeur du projet
- **Je souhaite** disposer d'un script
- **Afin de** simplifier le parsing`;

      const result = parseEnTantQueJeSouhaiteAfinDe(content);
      
      expect(result.enTantQue).toBe('développeur du projet');
      expect(result.jeSouhaite).toBe("disposer d'un script");
      expect(result.afinDe).toBe('simplifier le parsing');
    });

    it('parse le format avec paragraphes et gras sans tiret (format 2)', () => {
      const content = `# US-12.3 : Titre

**En tant que** utilisateur du board Kanban Sprint

**Je souhaite** voir un indicateur visuel

**Afin de** comprendre immédiatement`;

      const result = parseEnTantQueJeSouhaiteAfinDe(content);
      
      expect(result.enTantQue).toBe('utilisateur du board Kanban Sprint');
      expect(result.jeSouhaite).toBe('voir un indicateur visuel');
      expect(result.afinDe).toBe('comprendre immédiatement');
    });

    it('préserve le contenu sur plusieurs lignes', () => {
      const content = `# US-1.0 : Titre

- **En tant que** développeur
qui travaille sur le projet
- **Je souhaite** avoir un outil
performant et fiable
- **Afin de** gagner du temps`;

      const result = parseEnTantQueJeSouhaiteAfinDe(content);
      
      expect(result.enTantQue).toContain('développeur');
    });

    it('parse le format avec "Je veux" au lieu de "Je souhaite"', () => {
      const content = `# US-4.6 : Titre

- **En tant que** décideur
- **Je veux** disposer d'explications
- **Afin de** comprendre`;

      const result = parseEnTantQueJeSouhaiteAfinDe(content);
      
      expect(result.enTantQue).toBe('décideur');
      expect(result.jeSouhaite).toBe("disposer d'explications");
      expect(result.afinDe).toBe('comprendre');
    });

    it('parse les CA sans titre de section explicite', () => {
      const content = `# US-6.2 : Titre

- **En tant que** PO
- **Je souhaite** Protéger certaines pages
- **Afin de** Limiter l'accès

- **Critères d'acceptation** :
- **Modal de mot de passe** : description`;

      const result = parseEnTantQueJeSouhaiteAfinDe(content);
      
      expect(result.enTantQue).toBe('PO');
    });
  });

  describe('detectLineType', () => {
    it('détecte un titre US', () => {
      const result = detectLineType('# US-12.8 : Titre de l\'US');
      expect(result.type).toBe('titre-us');
      expect(result.content).toBe("US-12.8 : Titre de l'US");
    });

    it('détecte "En tant que" avec tiret', () => {
      const result = detectLineType('- **En tant que** développeur');
      expect(result.type).toBe('en-tant-que');
      expect(result.content).toBe('développeur');
    });

    it('détecte "En tant que" sans tiret', () => {
      const result = detectLineType('**En tant que** développeur');
      expect(result.type).toBe('en-tant-que');
      expect(result.content).toBe('développeur');
    });

    it('détecte "Je souhaite"', () => {
      const result = detectLineType('- **Je souhaite** avoir un script');
      expect(result.type).toBe('je-souhaite');
      expect(result.content).toBe('avoir un script');
    });

    it('détecte "Je veux" comme variante de "Je souhaite"', () => {
      const result = detectLineType('- **Je veux** avoir un script');
      expect(result.type).toBe('je-souhaite');
      expect(result.content).toBe('avoir un script');
    });

    it('détecte "Afin de"', () => {
      const result = detectLineType('- **Afin de** simplifier');
      expect(result.type).toBe('afin-de');
      expect(result.content).toBe('simplifier');
    });

    it('détecte le titre des critères', () => {
      const result = detectLineType("- **Critères d'acceptation** :");
      expect(result.type).toBe('criteres-titre');
    });

    it('détecte un titre de CA', () => {
      const result = detectLineType('- **Script fonctionnel** :');
      expect(result.type).toBe('ca-titre');
      expect(result.content).toBe('Script fonctionnel');
    });

    it('détecte un sous-élément indenté', () => {
      const result = detectLineType('  - Le script lit tous les fichiers');
      expect(result.type).toBe('sous-element');
      expect(result.content).toBe('Le script lit tous les fichiers');
    });

    it('détecte un élément simple', () => {
      const result = detectLineType('- élément sans gras');
      expect(result.type).toBe('element-simple');
      expect(result.content).toBe('élément sans gras');
    });

    it('détecte une ligne vide', () => {
      const result = detectLineType('');
      expect(result.type).toBe('vide');
    });

    it('détecte un paragraphe', () => {
      const result = detectLineType('Texte libre quelconque');
      expect(result.type).toBe('paragraphe');
      expect(result.content).toBe('Texte libre quelconque');
    });
  });

  describe('parseContentLineByLine', () => {
    it('parse un contenu complet', () => {
      const content = `# US-1.0 : Test
- **En tant que** dev
- **Je souhaite** tester
- **Afin de** valider`;

      const lines = parseContentLineByLine(content);
      
      expect(lines[0].type).toBe('titre-us');
      expect(lines[1].type).toBe('en-tant-que');
      expect(lines[2].type).toBe('je-souhaite');
      expect(lines[3].type).toBe('afin-de');
    });
  });

  describe('convertUsToStandardFormat', () => {
    it('convertit le format à puces complet vers le format standard', () => {
      const input = `# US-12.8 : Titre de l'US

- **En tant que** développeur du projet
- **Je souhaite** disposer d'un script
- **Afin de** simplifier le parsing

- **Critères d'acceptation** :
- **Script fonctionnel** :
  - Le script lit tous les fichiers
  - Le script détecte les fichiers US
- **Format cible** :
  - Le titre reste en H1`;

      const result = convertUsToStandardFormat(input);

      expect(result).toContain("# US-12.8 : Titre de l'US");
      expect(result).toContain('## En tant que');
      expect(result).toContain('développeur du projet');
      expect(result).toContain('## Je souhaite');
      expect(result).toContain("disposer d'un script");
      expect(result).toContain('## Afin de');
      expect(result).toContain('simplifier le parsing');
      expect(result).toContain("# Critères d'acceptation");
      expect(result).toContain('## CA1 - Script fonctionnel');
      expect(result).toContain('- Le script lit tous les fichiers');
    });

    it('préserve le titre H1 original', () => {
      const input = `# US-11.6 : Clic post-it – affichage détaillé ✅ COMPLÉTÉ

- **En tant que** visiteur
- **Je souhaite** cliquer
- **Afin de** voir`;

      const result = convertUsToStandardFormat(input);

      expect(result.startsWith('# US-11.6 : Clic post-it – affichage détaillé ✅ COMPLÉTÉ')).toBe(true);
    });

    it('gère le format avec H4 comme titre', () => {
      const input = `#### US-11.6 : Titre

- **En tant que** visiteur
- **Je souhaite** cliquer
- **Afin de** voir`;

      const result = convertUsToStandardFormat(input);

      // Le titre devient H1
      expect(result).toContain('# US-11.6 : Titre');
      expect(result).not.toContain('####');
    });

    it('supprime les séparateurs horizontaux inutiles', () => {
      const input = `# US-12.3 : Titre

**En tant que** utilisateur

**Je souhaite** voir

**Afin de** comprendre

---

### Critères d'acceptation

- **Titre** :
  - élément`;

      const result = convertUsToStandardFormat(input);

      expect(result).not.toContain('---');
    });

    it('préserve les sections additionnelles après les CA', () => {
      const input = `# US-12.3 : Titre

- **En tant que** utilisateur
- **Je souhaite** voir
- **Afin de** comprendre

- **Critères d'acceptation** :
- **Titre** :
  - élément

### Fichiers concernés

- fichier1.ts
- fichier2.ts`;

      const result = convertUsToStandardFormat(input);

      expect(result).toContain('### Fichiers concernés');
      expect(result).toContain('- fichier1.ts');
    });

    it('retourne le contenu inchangé si déjà au format standard', () => {
      const input = `# US-12.8 : Titre

## En tant que
développeur du projet

## Je souhaite
disposer d'un script

## Afin de
simplifier le parsing

# Critères d'acceptation

## CA1 - Script fonctionnel
- Le script lit tous les fichiers
- Le script détecte les fichiers US`;

      const result = convertUsToStandardFormat(input);

      expect(result).toBe(input);
    });
  });

  describe('MigrationResult', () => {
    it('structure correcte pour un résultat de migration', () => {
      const result: MigrationResult = {
        filePath: 'path/to/file.md',
        success: true,
        converted: true,
        originalContent: 'original',
        newContent: 'new',
      };

      expect(result.filePath).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.converted).toBe(true);
    });

    it('structure correcte pour une erreur', () => {
      const result: MigrationResult = {
        filePath: 'path/to/file.md',
        success: false,
        converted: false,
        error: 'Erreur de parsing',
      };

      expect(result.success).toBe(false);
      expect(result.error).toBe('Erreur de parsing');
    });

    it('structure correcte pour un fichier déjà au bon format', () => {
      const result: MigrationResult = {
        filePath: 'path/to/file.md',
        success: true,
        converted: false,
        skippedReason: 'already-standard-format',
      };

      expect(result.converted).toBe(false);
      expect(result.skippedReason).toBe('already-standard-format');
    });
  });

  describe('migrateUsFile', () => {
    it('retourne un résultat de conversion réussi', () => {
      const content = `# US-1.0 : Test

- **En tant que** dev
- **Je souhaite** tester
- **Afin de** valider

- **Critères d'acceptation** :
- **Test** :
  - élément`;

      const result = migrateUsFile('US-1.0 - Test.md', content, true);

      expect(result.success).toBe(true);
      expect(result.converted).toBe(true);
      expect(result.newContent).toContain('## En tant que');
    });

    it('retourne skipped pour un fichier non-US', () => {
      const result = migrateUsFile('README.md', '# README', true);

      expect(result.success).toBe(true);
      expect(result.converted).toBe(false);
      expect(result.skippedReason).toBe('not-us-file');
    });

    it('retourne skipped pour un fichier déjà au format standard', () => {
      const content = `# US-1.0 : Test

## En tant que
dev

## Je souhaite
tester

## Afin de
valider`;

      const result = migrateUsFile('US-1.0 - Test.md', content, true);

      expect(result.success).toBe(true);
      expect(result.converted).toBe(false);
      expect(result.skippedReason).toBe('already-standard-format');
    });

    it('en mode dry-run, ne modifie pas le contenu original', () => {
      const content = `# US-1.0 : Test

- **En tant que** dev
- **Je souhaite** tester
- **Afin de** valider`;

      const result = migrateUsFile('US-1.0 - Test.md', content, true);

      expect(result.originalContent).toBe(content);
      expect(result.newContent).not.toBe(content);
    });
  });

  describe('generateMigrationReport', () => {
    it('génère un rapport avec les statistiques correctes', () => {
      const results: MigrationResult[] = [
        { filePath: 'US-1.0.md', success: true, converted: true },
        { filePath: 'US-2.0.md', success: true, converted: true },
        { filePath: 'US-3.0.md', success: true, converted: false, skippedReason: 'already-standard-format' },
        { filePath: 'README.md', success: true, converted: false, skippedReason: 'not-us-file' },
        { filePath: 'US-4.0.md', success: false, converted: false, error: 'Parse error' },
      ];

      const report = generateMigrationReport(results);

      expect(report.totalFiles).toBe(5);
      expect(report.convertedFiles).toBe(2);
      expect(report.skippedFiles).toBe(2);
      expect(report.errorFiles).toBe(1);
      expect(report.errors).toHaveLength(1);
      expect(report.errors[0]).toContain('US-4.0.md');
    });

    it('génère un rapport vide pour une liste vide', () => {
      const report = generateMigrationReport([]);

      expect(report.totalFiles).toBe(0);
      expect(report.convertedFiles).toBe(0);
      expect(report.skippedFiles).toBe(0);
      expect(report.errorFiles).toBe(0);
    });

    it('inclut les fichiers convertis dans la liste', () => {
      const results: MigrationResult[] = [
        { filePath: 'US-1.0 - Premier.md', success: true, converted: true },
        { filePath: 'US-2.0 - Second.md', success: true, converted: true },
      ];

      const report = generateMigrationReport(results);

      expect(report.convertedList).toContain('US-1.0 - Premier.md');
      expect(report.convertedList).toContain('US-2.0 - Second.md');
    });
  });

  describe('MigrationReport', () => {
    it('structure correcte pour un rapport', () => {
      const report: MigrationReport = {
        totalFiles: 10,
        convertedFiles: 5,
        skippedFiles: 3,
        errorFiles: 2,
        errors: ['error1', 'error2'],
        convertedList: ['file1.md', 'file2.md'],
      };

      expect(report.totalFiles).toBe(10);
      expect(report.errors).toHaveLength(2);
    });
  });

  describe('formatMigrationReport', () => {
    it('formate un rapport en texte lisible', () => {
      const report: MigrationReport = {
        totalFiles: 5,
        convertedFiles: 2,
        skippedFiles: 2,
        errorFiles: 1,
        errors: ['US-4.0.md: Parse error'],
        convertedList: ['US-1.0 - Premier.md', 'US-2.0 - Second.md'],
      };

      const { formatMigrationReport } = require('../../scripts/migrate-us-format');
      const output = formatMigrationReport(report);

      expect(output).toContain('Fichiers traités : 5');
      expect(output).toContain('Convertis : 2');
      expect(output).toContain('Ignorés : 2');
      expect(output).toContain('Erreurs : 1');
      expect(output).toContain('US-1.0 - Premier.md');
    });

    it('affiche un message de succès si aucune erreur', () => {
      const report: MigrationReport = {
        totalFiles: 3,
        convertedFiles: 3,
        skippedFiles: 0,
        errorFiles: 0,
        errors: [],
        convertedList: ['US-1.0.md', 'US-2.0.md', 'US-3.0.md'],
      };

      const { formatMigrationReport } = require('../../scripts/migrate-us-format');
      const output = formatMigrationReport(report);

      expect(output).toContain('Migration terminée avec succès');
      expect(output).not.toContain('ERREURS');
    });

    it('affiche les erreurs si présentes', () => {
      const report: MigrationReport = {
        totalFiles: 2,
        convertedFiles: 1,
        skippedFiles: 0,
        errorFiles: 1,
        errors: ['US-2.0.md: Format non reconnu'],
        convertedList: ['US-1.0.md'],
      };

      const { formatMigrationReport } = require('../../scripts/migrate-us-format');
      const output = formatMigrationReport(report);

      expect(output).toContain('ERREURS');
      expect(output).toContain('US-2.0.md: Format non reconnu');
    });
  });

  describe('cas réels de conversion', () => {
    it('convertit le fichier US-4.6 correctement', () => {
      const input = `# US-4.6 : Tooltips informatifs pour les métriques ✅ COMPLÉTÉ
- **En tant que** décideur consultant la page Métriques
- **Je veux** disposer d'explications pédagogiques sur chaque métrique via des info-bulles
- **Afin de** comprendre la signification business de chaque indicateur technique sans connaissances préalables en développement

- **Critères d'acceptation** :

- **Paramétrage externe des contenus** :
  - Un fichier JSON contient les explications
  - Le contenu est modifiable sans toucher au code

- **Indicateur visuel** :
  - Chaque bloc affiche une icône`;

      const result = convertUsToStandardFormat(input);

      expect(result).toContain('# US-4.6 : Tooltips informatifs pour les métriques ✅ COMPLÉTÉ');
      expect(result).toContain('## En tant que');
      expect(result).toContain('décideur consultant la page Métriques');
      expect(result).toContain('## Je souhaite');
      expect(result).toContain("disposer d'explications pédagogiques");
      expect(result).toContain('## CA1 - Paramétrage externe des contenus');
      expect(result).toContain('- Un fichier JSON contient les explications');
    });

    it('convertit le fichier US-12.3 avec format paragraphes', () => {
      const input = `# US-12.3 : Indicateur visuel "en revue" sur le board Kanban ✅ COMPLÉTÉ

**En tant que** utilisateur du board Kanban Sprint

**Je souhaite** voir un indicateur visuel sur la carte US

**Afin de** comprendre immédiatement que l'US est entre deux étapes

---

### Critères d'acceptation

- **Marquage de l'état** :
  - Le fichier accepte un suffixe
  - Le suffixe est reconnu`;

      const result = convertUsToStandardFormat(input);

      expect(result).toContain('## En tant que');
      expect(result).toContain('utilisateur du board Kanban Sprint');
      expect(result).not.toContain('---');
      expect(result).toContain("# Critères d'acceptation");
      expect(result).toContain("## CA1 - Marquage de l'état");
    });

    it('gère un fichier sans section En tant que valide', () => {
      const input = `# README

Ceci est un readme`;

      const result = convertUsToStandardFormat(input);

      // Le fichier n'est pas un fichier US valide, retourne tel quel
      expect(result).toBe(input);
    });

    it('gère un fichier US sans critères d\'acceptation', () => {
      const input = `# US-1.0 : Titre simple

- **En tant que** dev
- **Je souhaite** tester
- **Afin de** valider`;

      const result = convertUsToStandardFormat(input);

      expect(result).toContain('## En tant que');
      expect(result).toContain('dev');
      expect(result).not.toContain("# Critères d'acceptation");
    });

    it('préserve la section Contexte en fin de fichier', () => {
      const input = `# US-1.0 : Titre

- **En tant que** dev
- **Je souhaite** tester
- **Afin de** valider

- **Critères d'acceptation** :
- **Test** :
  - élément

**Contexte** : Ceci est le contexte de l'US.`;

      const result = convertUsToStandardFormat(input);

      expect(result).toContain('**Contexte** : Ceci est le contexte');
    });

    it('préserve la section Fichiers concernés', () => {
      const input = `# US-1.0 : Titre

- **En tant que** dev
- **Je souhaite** tester
- **Afin de** valider

- **Critères d'acceptation** :
- **Test** :
  - élément

### Fichiers concernés

- file1.ts
- file2.ts`;

      const result = convertUsToStandardFormat(input);

      expect(result).toContain('### Fichiers concernés');
      expect(result).toContain('- file1.ts');
    });
  });

  describe('scanMdFiles', () => {
    it('est exportée par le module', () => {
      const { scanMdFiles } = require('../../scripts/migrate-us-format');
      expect(typeof scanMdFiles).toBe('function');
    });

    it('retourne un tableau vide pour un répertoire inexistant', () => {
      const { scanMdFiles } = require('../../scripts/migrate-us-format');
      const result = scanMdFiles('path/inexistant/');
      expect(result).toEqual([]);
    });
  });

  describe('main', () => {
    it('est exportée par le module', () => {
      const { main } = require('../../scripts/migrate-us-format');
      expect(typeof main).toBe('function');
    });
  });
});
