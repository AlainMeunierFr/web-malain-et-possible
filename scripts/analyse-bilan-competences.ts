/**
 * Script d'analyse pour créer un bilan de compétences et d'expérience
 * 
 * Ce script :
 * 1. Analyse tous les fichiers Markdown dans data/Ressources
 * 2. Extrait les compétences, expériences, réalisations, formations, etc.
 * 3. Fait le rapprochement avec les domaines/compétences existants dans la bibliothèque
 * 4. Identifie les nouvelles compétences et domaines
 * 5. Génère un rapport Markdown structuré
 */

import fs from 'fs';
import path from 'path';

interface Competence {
  id: string;
  titre: string;
  description?: string;
}

interface Domaine {
  id: string;
  titre: string;
  competences: string[];
  contenu?: string;
  auteur?: string;
}

interface Experience {
  texte: string;
  source: string;
  type: 'experience' | 'realisation' | 'formation' | 'certification' | 'competence' | 'softskill' | 'hardskill';
}

interface AnalyseResult {
  competencesTrouvees: Map<string, Experience[]>;
  experiencesParDomaine: Map<string, Experience[]>;
  nouvellesCompetences: Set<string>;
  nouvellesExperiences: Experience[];
  realisations: Experience[];
  formations: Experience[];
  certifications: Experience[];
}

/**
 * Charge les compétences depuis la bibliothèque
 */
const loadCompetences = (): Map<string, Competence> => {
  const competencesPath = path.join(process.cwd(), 'data', 'bibliotheque', 'competences.json');
  const data = JSON.parse(fs.readFileSync(competencesPath, 'utf-8'));
  const competences = new Map<string, Competence>();
  
  for (const [id, comp] of Object.entries(data.competences)) {
    competences.set(id, comp as Competence);
  }
  
  return competences;
};

/**
 * Charge les domaines depuis la bibliothèque
 */
const loadDomaines = (): Map<string, Domaine> => {
  const domainesPath = path.join(process.cwd(), 'data', 'bibliotheque', 'domaines.json');
  const data = JSON.parse(fs.readFileSync(domainesPath, 'utf-8'));
  const domaines = new Map<string, Domaine>();
  
  for (const [id, domaine] of Object.entries(data.domaines)) {
    domaines.set(id, domaine as Domaine);
  }
  
  return domaines;
};

/**
 * Normalise un texte pour la recherche (minuscules, sans accents, etc.)
 */
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Trouve les compétences mentionnées dans un texte
 */
const findCompetencesInText = (text: string, competences: Map<string, Competence>): string[] => {
  const found: string[] = [];
  const normalizedText = normalizeText(text);
  
  for (const [id, comp] of competences.entries()) {
    const normalizedTitre = normalizeText(comp.titre);
    const normalizedDescription = comp.description ? normalizeText(comp.description) : '';
    
    // Recherche du titre de la compétence
    if (normalizedText.includes(normalizedTitre) && normalizedTitre.length > 3) {
      found.push(id);
      continue;
    }
    
    // Recherche de mots-clés dans la description
    if (normalizedDescription) {
      const keywords = normalizedDescription.split(' ').filter(w => w.length > 4);
      for (const keyword of keywords) {
        if (normalizedText.includes(keyword)) {
          found.push(id);
          break;
        }
      }
    }
  }
  
  return [...new Set(found)];
};

/**
 * Trouve les domaines associés à des compétences
 */
const findDomainesForCompetences = (
  competenceIds: string[],
  domaines: Map<string, Domaine>
): string[] => {
  const foundDomaines = new Set<string>();
  
  for (const [domaineId, domaine] of domaines.entries()) {
    for (const compId of competenceIds) {
      if (domaine.competences.includes(compId)) {
        foundDomaines.add(domaineId);
      }
    }
  }
  
  return Array.from(foundDomaines);
};

/**
 * Calcule la similarité entre deux textes (0-1)
 */
const calculateSimilarity = (text1: string, text2: string): number => {
  const normalized1 = normalizeText(text1);
  const normalized2 = normalizeText(text2);
  
  // Si les textes sont identiques après normalisation
  if (normalized1 === normalized2) {
    return 1.0;
  }
  
  // Calculer la similarité basée sur les mots communs
  const words1 = new Set(normalized1.split(' ').filter(w => w.length > 3));
  const words2 = new Set(normalized2.split(' ').filter(w => w.length > 3));
  
  if (words1.size === 0 || words2.size === 0) {
    return 0;
  }
  
  const intersection = new Set([...words1].filter(w => words2.has(w)));
  const union = new Set([...words1, ...words2]);
  
  // Jaccard similarity
  return intersection.size / union.size;
};

/**
 * Extrait les informations clés d'un texte (chiffres, pourcentages, entités)
 */
const extractKeyInfo = (text: string): {
  numbers: string[];
  percentages: string[];
  amounts: string[];
  entities: string[];
  keyPhrases: string[];
} => {
  // Extraire les pourcentages
  const percentages = text.match(/\d+%/g) || [];
  
  // Extraire les montants (€, M€, K€)
  const amounts = text.match(/\d+[.,]?\d*\s*[MK]?€/g) || [];
  
  // Extraire les chiffres significatifs (années, quantités importantes)
  const numbers = text.match(/\b\d{2,}\b/g) || [];
  
  // Extraire les entités (noms propres, technologies)
  const entities = text.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g) || [];
  
  // Extraire les phrases clés (avec chiffres, pourcentages, ou entités importantes)
  const sentences = text.split(/[\.;]/).map(s => s.trim()).filter(s => s.length > 15);
  const keyPhrases = sentences.filter(s => 
    /\d+/.test(s) || // Contient un chiffre
    /%/.test(s) || // Contient un pourcentage
    /€/.test(s) || // Contient un montant
    entities.some(e => s.includes(e)) // Contient une entité
  );
  
  return { numbers, percentages, amounts, entities, keyPhrases };
};

/**
 * Fusionne deux expériences similaires en combinant les informations de manière intelligente
 */
const mergeExperiences = (exp1: Experience, exp2: Experience): Experience => {
  const text1 = exp1.texte;
  const text2 = exp2.texte;
  
  // Si les textes sont très similaires (>80%), garder le plus long
  const similarity = calculateSimilarity(text1, text2);
  if (similarity > 0.8) {
    const longer = text1.length > text2.length ? text1 : text2;
    return {
      texte: longer,
      source: `${exp1.source}, ${exp2.source}`,
      type: exp1.type,
    };
  }
  
  // Extraire les informations clés
  const info1 = extractKeyInfo(text1);
  const info2 = extractKeyInfo(text2);
  
  // Identifier les informations complémentaires de text2
  const missingPercentages = info2.percentages.filter(p => !info1.percentages.includes(p));
  const missingAmounts = info2.amounts.filter(a => !info1.amounts.some(a1 => a1.includes(a) || a.includes(a1)));
  const missingEntities = info2.entities.filter(e => 
    !info1.entities.some(e1 => normalizeText(e1) === normalizeText(e))
  );
  
  // Trouver les phrases clés complémentaires
  const missingKeyPhrases: string[] = [];
  for (const phrase2 of info2.keyPhrases) {
    const normalizedPhrase2 = normalizeText(phrase2);
    const isNew = !info1.keyPhrases.some(phrase1 => {
      const normalizedPhrase1 = normalizeText(phrase1);
      return calculateSimilarity(normalizedPhrase1, normalizedPhrase2) > 0.7;
    });
    
    if (isNew && phrase2.length > 20 && phrase2.length < 150) {
      missingKeyPhrases.push(phrase2);
    }
  }
  
  // Construire le texte fusionné de manière intelligente
  let mergedText = text1;
  
  // Si text1 est plus court et text2 apporte beaucoup d'infos, utiliser text2 comme base
  if (text2.length > text1.length * 1.3 && missingKeyPhrases.length > 0) {
    mergedText = text2;
    // Ajouter les infos manquantes de text1
    const info1Missing = extractKeyInfo(text1);
    missingPercentages.push(...info1Missing.percentages.filter(p => !info2.percentages.includes(p)));
    missingAmounts.push(...info1Missing.amounts.filter(a => !info2.amounts.some(a2 => a2.includes(a) || a.includes(a2))));
  }
  
  // Construire les compléments d'information
  const complements: string[] = [];
  
  // Ajouter les pourcentages manquants
  if (missingPercentages.length > 0) {
    complements.push(missingPercentages.join(', '));
  }
  
  // Ajouter les montants manquants
  if (missingAmounts.length > 0) {
    complements.push(missingAmounts.join(', '));
  }
  
  // Ajouter les entités importantes manquantes (limitées)
  const importantEntities = missingEntities
    .filter(e => e.length > 3 && e.length < 30)
    .slice(0, 3);
  if (importantEntities.length > 0) {
    complements.push(importantEntities.join(', '));
  }
  
  // Ajouter la phrase clé la plus importante (une seule)
  if (missingKeyPhrases.length > 0) {
    // Choisir la phrase la plus informative (avec chiffres ou entités)
    const bestPhrase = missingKeyPhrases
      .sort((a, b) => {
        const scoreA = (a.match(/\d+/g) || []).length + (a.match(/\b[A-Z][a-z]+/g) || []).length;
        const scoreB = (b.match(/\d+/g) || []).length + (b.match(/\b[A-Z][a-z]+/g) || []).length;
        return scoreB - scoreA;
      })[0];
    
    if (bestPhrase && bestPhrase.length < 120) {
      complements.push(bestPhrase);
    }
  }
  
  // Ajouter les compléments si pertinents
  if (complements.length > 0) {
    const additionalInfo = complements
      .filter(c => c.length > 3)
      .slice(0, 2) // Limiter à 2 compléments max
      .join(' - ');
    
    if (additionalInfo && additionalInfo.length < 100) {
      mergedText = `${mergedText} - ${additionalInfo}`;
    }
  }
  
  // Nettoyer le texte final (supprimer les répétitions évidentes)
  mergedText = mergedText
    .replace(/\s+/g, ' ')
    .replace(/\s*-\s*-\s*/g, ' - ')
    .trim();
  
  // Combiner les sources
  const sources = new Set([exp1.source, exp2.source]);
  
  return {
    texte: mergedText,
    source: Array.from(sources).join(', '),
    type: exp1.type,
  };
};

/**
 * Extrait les expériences, réalisations, formations d'un texte
 */
const extractExperiences = (text: string, filename: string): Experience[] => {
  const experiences: Experience[] = [];
  const lines = text.split('\n');
  
  // Patterns pour détecter différents types d'expériences
  const patterns = {
    experience: /(?:expérience|mission|projet|poste|rôle|fonction|emploi|travail)/i,
    realisation: /(?:réalisé|accompli|développé|créé|mis en place|déployé|équipé|acquis|rachat|vente|lancement|innovation)/i,
    formation: /(?:formation|certification|diplôme|école|études|apprentissage|appris)/i,
    certification: /(?:certification|certifié|certificat|diplôme)/i,
    competence: /(?:compétence|expert|expertise|maîtrise|connaissance|savoir-faire)/i,
    softskill: /(?:leadership|communication|collaboration|empathie|écoute|facilitation|mentorat|coaching)/i,
    hardskill: /(?:technique|technologie|outil|logiciel|langage|framework|méthode|processus)/i,
  };
  
  let currentSection = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Détecter les sections (titres)
    if (line.startsWith('##')) {
      currentSection = line;
      continue;
    }
    
    // Ignorer les lignes vides ou trop courtes
    if (line.length < 10) {
      continue;
    }
    
    // Ignorer les lignes qui sont des métadonnées
    if (line.startsWith('>') || line.startsWith('**Source**') || line.startsWith('**Date')) {
      continue;
    }
    
    // Détecter le type d'expérience
    let type: Experience['type'] = 'experience';
    for (const [key, pattern] of Object.entries(patterns)) {
      if (pattern.test(line)) {
        type = key as Experience['type'];
        break;
      }
    }
    
    // Extraire les expériences (lignes avec puces, dates, ou descriptions)
    if (line.startsWith('-') || line.startsWith('•') || line.startsWith('*') || 
        /^\d+[\.\)]/.test(line) || /^\d{4}/.test(line) || line.length > 50) {
      
      // Nettoyer la ligne
      const cleaned = line
        .replace(/^[-•*]\s*/, '')
        .replace(/^\d+[\.\)]\s*/, '')
        .replace(/^[]\s*/, '') // Caractères spéciaux
        .replace(/^\d{4}\s*[-–—]\s*\d{4}\s*/, '') // Dates au début
        .replace(/^\d{4}\s*[-–—]\s*/, '') // Date de début
        .replace(/Depuis\s+\d{4}\s*[-–—]\s*/, '') // "Depuis 2020 -"
        .trim();
      
      if (cleaned.length > 20 && !cleaned.startsWith('*[') && !cleaned.endsWith(']*')) {
        experiences.push({
          texte: cleaned,
          source: filename,
          type,
        });
      }
    }
  }
  
  return experiences;
};

/**
 * Analyse un fichier Markdown
 */
const analyzeFile = (
  filePath: string,
  competences: Map<string, Competence>,
  domaines: Map<string, Domaine>
): AnalyseResult => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const filename = path.basename(filePath);
  
  const result: AnalyseResult = {
    competencesTrouvees: new Map(),
    experiencesParDomaine: new Map(),
    nouvellesCompetences: new Set(),
    nouvellesExperiences: [],
    realisations: [],
    formations: [],
    certifications: [],
  };
  
  // Extraire les expériences du texte
  const experiences = extractExperiences(content, filename);
  
  // Analyser chaque expérience
  for (const exp of experiences) {
    // Classer par type
    if (exp.type === 'realisation') {
      result.realisations.push(exp);
    } else if (exp.type === 'formation') {
      result.formations.push(exp);
    } else if (exp.type === 'certification') {
      result.certifications.push(exp);
    }
    
    // Trouver les compétences mentionnées
    const competencesTrouvees = findCompetencesInText(exp.texte, competences);
    
    if (competencesTrouvees.length > 0) {
      // Associer l'expérience aux compétences trouvées
      for (const compId of competencesTrouvees) {
        if (!result.competencesTrouvees.has(compId)) {
          result.competencesTrouvees.set(compId, []);
        }
        result.competencesTrouvees.get(compId)!.push(exp);
      }
      
      // Trouver les domaines associés
      const domainesTrouves = findDomainesForCompetences(competencesTrouvees, domaines);
      for (const domaineId of domainesTrouves) {
        if (!result.experiencesParDomaine.has(domaineId)) {
          result.experiencesParDomaine.set(domaineId, []);
        }
        result.experiencesParDomaine.get(domaineId)!.push(exp);
      }
    } else {
      // Expérience sans compétence identifiée
      result.nouvellesExperiences.push(exp);
    }
  }
  
  return result;
};

/**
 * Parcourt récursivement un dossier pour trouver tous les fichiers Markdown
 */
const findMarkdownFiles = (dir: string): string[] => {
  const files: string[] = [];
  
  if (!fs.existsSync(dir)) {
    return files;
  }
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...findMarkdownFiles(fullPath));
    } else if (item.toLowerCase().endsWith('.md') && 
               !item.includes('README') && 
               !item.includes('Bilan-de-competences')) {
      files.push(fullPath);
    }
  }
  
  return files;
};

/**
 * Crée un texte synthétique à partir de plusieurs expériences similaires
 */
const synthesizeText = (texts: string[]): string => {
  if (texts.length === 0) return '';
  if (texts.length === 1) return texts[0];
  
  // Extraire toutes les informations clés
  const allInfo = {
    percentages: new Set<string>(),
    amounts: new Set<string>(),
    numbers: new Set<string>(),
    entities: new Set<string>(),
    keyPhrases: new Set<string>(),
  };
  
  for (const text of texts) {
    const info = extractKeyInfo(text);
    info.percentages.forEach(p => allInfo.percentages.add(p));
    info.amounts.forEach(a => allInfo.amounts.add(a));
    info.numbers.forEach(n => allInfo.numbers.add(n));
    info.entities.forEach(e => allInfo.entities.add(e));
    info.keyPhrases.forEach(p => allInfo.keyPhrases.add(p));
  }
  
  // Trouver le texte le plus complet comme base
  const baseText = texts.reduce((longest, current) => 
    current.length > longest.length ? current : longest
  );
  
  // Construire le texte synthétique
  let synthesized = baseText;
  
  // Ajouter les informations manquantes de manière intelligente
  const baseInfo = extractKeyInfo(baseText);
  
  // Ajouter les pourcentages manquants
  const missingPercentages = Array.from(allInfo.percentages)
    .filter(p => !baseInfo.percentages.includes(p));
  if (missingPercentages.length > 0) {
    synthesized += ` - ${missingPercentages.join(', ')}`;
  }
  
  // Ajouter les montants manquants
  const missingAmounts = Array.from(allInfo.amounts)
    .filter(a => !baseInfo.amounts.some(a1 => a1.includes(a) || a.includes(a1)));
  if (missingAmounts.length > 0) {
    synthesized += ` - ${missingAmounts.join(', ')}`;
  }
  
  // Ajouter les entités importantes manquantes (limitées)
  const missingEntities = Array.from(allInfo.entities)
    .filter(e => !baseInfo.entities.some(e1 => normalizeText(e1) === normalizeText(e)))
    .filter(e => e.length > 3 && e.length < 30)
    .slice(0, 2);
  if (missingEntities.length > 0) {
    synthesized += ` - ${missingEntities.join(', ')}`;
  }
  
  // Nettoyer et limiter la longueur
  synthesized = synthesized
    .replace(/\s+/g, ' ')
    .replace(/\s*-\s*-\s*/g, ' - ')
    .trim();
  
  // Limiter à 300 caractères max
  if (synthesized.length > 300) {
    synthesized = synthesized.substring(0, 297) + '...';
  }
  
  return synthesized;
};

/**
 * Fusionne les expériences similaires dans une liste
 */
const mergeSimilarExperiences = (experiences: Experience[]): Experience[] => {
  const merged: Experience[] = [];
  const processed = new Set<number>();
  
  for (let i = 0; i < experiences.length; i++) {
    if (processed.has(i)) {
      continue;
    }
    
    const similarGroup: Experience[] = [experiences[i]];
    processed.add(i);
    
    // Chercher des expériences similaires à fusionner
    for (let j = i + 1; j < experiences.length; j++) {
      if (processed.has(j)) {
        continue;
      }
      
      const similarity = calculateSimilarity(experiences[i].texte, experiences[j].texte);
      
      // Si similarité > 0.4, ajouter au groupe
      if (similarity > 0.4) {
        similarGroup.push(experiences[j]);
        processed.add(j);
      }
    }
    
    // Fusionner toutes les expériences du groupe
    if (similarGroup.length === 1) {
      merged.push(similarGroup[0]);
    } else {
      // Créer une expérience synthétique
      const texts = similarGroup.map(e => e.texte);
      const synthesizedText = synthesizeText(texts);
      const allSources = new Set(similarGroup.map(e => e.source));
      
      merged.push({
        texte: synthesizedText,
        source: Array.from(allSources).join(', '),
        type: similarGroup[0].type,
      });
    }
  }
  
  return merged;
};

/**
 * Génère le rapport Markdown
 */
const generateReport = (
  competences: Map<string, Competence>,
  domaines: Map<string, Domaine>,
  result: AnalyseResult
): string => {
  const lines: string[] = [];
  
  lines.push('# Bilan de compétences et d\'expérience');
  lines.push('');
  lines.push('> **Date de génération** : ' + new Date().toISOString().split('T')[0]);
  lines.push('> **Source** : Analyse de tous les fichiers dans `data/Ressources/`');
  lines.push('> **Note** : Les expériences similaires ont été fusionnées pour éviter les doublons');
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 📋 Vue d\'ensemble');
  lines.push('');
  
  // Compter les expériences uniques après fusion
  const allExperiences = Array.from(result.experiencesParDomaine.values()).flat();
  const mergedExperiences = mergeSimilarExperiences(allExperiences);
  const mergedNouvelles = mergeSimilarExperiences(result.nouvellesExperiences);
  const mergedRealisations = mergeSimilarExperiences(result.realisations);
  const mergedFormations = mergeSimilarExperiences([...result.formations, ...result.certifications]);
  
  lines.push(`- **Domaines analysés** : ${domaines.size}`);
  lines.push(`- **Compétences analysées** : ${competences.size}`);
  lines.push(`- **Expériences uniques (après fusion)** : ${mergedExperiences.length + mergedNouvelles.length}`);
  lines.push(`- **Réalisations uniques** : ${mergedRealisations.length}`);
  lines.push(`- **Formations et certifications uniques** : ${mergedFormations.length}`);
  lines.push('');
  lines.push('---');
  lines.push('');
  
  // Domaines existants avec expériences
  lines.push('## 🎯 Domaines de compétences existants');
  lines.push('');
  
  for (const [domaineId, domaine] of domaines.entries()) {
    const experiences = result.experiencesParDomaine.get(domaineId) || [];
    
    if (experiences.length > 0 || domaine.competences.length > 0) {
      lines.push(`### ${domaine.titre}`);
      lines.push('');
      
      if (domaine.contenu) {
        lines.push(`*${domaine.contenu}*`);
        if (domaine.auteur) {
          lines.push(`— ${domaine.auteur}`);
        }
        lines.push('');
      }
      
      // Compétences du domaine
      if (domaine.competences.length > 0) {
        lines.push('**Compétences :**');
        for (const compId of domaine.competences) {
          const comp = competences.get(compId);
          if (comp) {
            lines.push(`- ${comp.titre}`);
          }
        }
        lines.push('');
      }
      
      // Expériences associées (fusionnées)
      if (experiences.length > 0) {
        lines.push('**Expériences et apprentissages :**');
        const merged = mergeSimilarExperiences(experiences);
        
        // Trier par longueur (les plus complètes en premier)
        merged.sort((a, b) => b.texte.length - a.texte.length);
        
        for (const exp of merged) {
          lines.push(`- ${exp.texte} *[${exp.source}]*`);
        }
        lines.push('');
      }
      
      lines.push('---');
      lines.push('');
    }
  }
  
  // Nouvelles expériences sans domaine identifié (fusionnées)
  if (mergedNouvelles.length > 0) {
    lines.push('## 🔍 Expériences sans domaine identifié');
    lines.push('');
    lines.push('Ces expériences n\'ont pas pu être associées à un domaine de compétence existant.');
    lines.push('Elles pourraient nécessiter la création de nouveaux domaines ou compétences.');
    lines.push('');
    
    // Filtrer et trier
    const filtered = mergedNouvelles
      .filter(exp => exp.texte.length > 30)
      .sort((a, b) => b.texte.length - a.texte.length);
    
    for (const exp of filtered) {
      lines.push(`- ${exp.texte} *[${exp.source}]*`);
    }
    
    lines.push('');
    lines.push('---');
    lines.push('');
  }
  
  // Réalisations notables (fusionnées)
  if (mergedRealisations.length > 0) {
    lines.push('## 🏆 Réalisations notables');
    lines.push('');
    
    // Trier par longueur (les plus complètes en premier)
    mergedRealisations.sort((a, b) => b.texte.length - a.texte.length);
    
    for (const real of mergedRealisations) {
      lines.push(`- ${real.texte} *[${real.source}]*`);
    }
    
    lines.push('');
    lines.push('---');
    lines.push('');
  }
  
  // Formations et certifications (fusionnées)
  if (mergedFormations.length > 0) {
    lines.push('## 📚 Formations et certifications');
    lines.push('');
    
    // Trier par longueur
    mergedFormations.sort((a, b) => b.texte.length - a.texte.length);
    
    for (const form of mergedFormations) {
      lines.push(`- ${form.texte} *[${form.source}]*`);
    }
    
    lines.push('');
    lines.push('---');
    lines.push('');
  }
  
  // Compétences orphelines (sans domaine) - fusionnées
  const competencesAvecExperiences = Array.from(result.competencesTrouvees.keys());
  const competencesDansDomaines = new Set<string>();
  
  for (const domaine of domaines.values()) {
    for (const compId of domaine.competences) {
      competencesDansDomaines.add(compId);
    }
  }
  
  const competencesOrphelines = competencesAvecExperiences.filter(
    compId => !competencesDansDomaines.has(compId)
  );
  
  if (competencesOrphelines.length > 0) {
    lines.push('## 🔗 Compétences avec expériences mais sans domaine');
    lines.push('');
    lines.push('Ces compétences ont des expériences associées mais ne sont pas dans un domaine.');
    lines.push('');
    
    for (const compId of competencesOrphelines) {
      const comp = competences.get(compId);
      if (comp) {
        lines.push(`### ${comp.titre}`);
        const experiences = result.competencesTrouvees.get(compId) || [];
        const merged = mergeSimilarExperiences(experiences);
        
        // Trier par longueur
        merged.sort((a, b) => b.texte.length - a.texte.length);
        
        for (const exp of merged) {
          lines.push(`- ${exp.texte} *[${exp.source}]*`);
        }
        lines.push('');
      }
    }
    
    lines.push('---');
    lines.push('');
  }
  
  lines.push('## 📝 Notes');
  lines.push('');
  lines.push('- Ce bilan a été généré automatiquement à partir de l\'analyse des fichiers Markdown dans `data/Ressources/`.');
  lines.push('- Les associations entre expériences et domaines/compétences sont basées sur une recherche textuelle.');
  lines.push('- Certaines associations peuvent nécessiter une validation manuelle.');
  lines.push('- **Les expériences similaires ont été fusionnées** pour éviter les doublons (similarité > 40%).');
  lines.push('- Les informations complémentaires (chiffres, entités, phrases) ont été combinées lors de la fusion.');
  lines.push('- Les expériences sont triées par longueur (les plus complètes en premier).');
  lines.push('');
  
  return lines.join('\n');
};

/**
 * Fonction principale
 */
const main = async () => {
  console.log('🔍 Analyse des compétences et expériences...\n');
  
  // Charger les données de la bibliothèque
  console.log('📚 Chargement de la bibliothèque...');
  const competences = loadCompetences();
  const domaines = loadDomaines();
  console.log(`   - ${competences.size} compétences chargées`);
  console.log(`   - ${domaines.size} domaines chargés\n`);
  
  // Trouver tous les fichiers Markdown
  const resourcesDir = path.join(process.cwd(), 'data', 'Ressources');
  console.log(`📂 Recherche des fichiers Markdown dans : ${resourcesDir}`);
  const markdownFiles = findMarkdownFiles(resourcesDir);
  console.log(`   - ${markdownFiles.length} fichiers trouvés\n`);
  
  // Analyser chaque fichier
  console.log('🔬 Analyse des fichiers...');
  const globalResult: AnalyseResult = {
    competencesTrouvees: new Map(),
    experiencesParDomaine: new Map(),
    nouvellesCompetences: new Set(),
    nouvellesExperiences: [],
    realisations: [],
    formations: [],
    certifications: [],
  };
  
  for (const file of markdownFiles) {
    console.log(`   - Analyse de : ${path.basename(file)}`);
    const result = analyzeFile(file, competences, domaines);
    
    // Fusionner les résultats
    for (const [compId, exps] of result.competencesTrouvees.entries()) {
      if (!globalResult.competencesTrouvees.has(compId)) {
        globalResult.competencesTrouvees.set(compId, []);
      }
      globalResult.competencesTrouvees.get(compId)!.push(...exps);
    }
    
    for (const [domaineId, exps] of result.experiencesParDomaine.entries()) {
      if (!globalResult.experiencesParDomaine.has(domaineId)) {
        globalResult.experiencesParDomaine.set(domaineId, []);
      }
      globalResult.experiencesParDomaine.get(domaineId)!.push(...exps);
    }
    
    globalResult.nouvellesExperiences.push(...result.nouvellesExperiences);
    globalResult.realisations.push(...result.realisations);
    globalResult.formations.push(...result.formations);
    globalResult.certifications.push(...result.certifications);
  }
  
  console.log('\n📊 Génération du rapport...');
  
  // Générer le rapport
  const report = generateReport(competences, domaines, globalResult);
  
  // Sauvegarder le rapport
  const outputPath = path.join(resourcesDir, 'Bilan-de-competences-et-experience.md');
  fs.writeFileSync(outputPath, report, 'utf-8');
  
  console.log(`\n✅ Rapport généré : ${outputPath}`);
  console.log(`\n📈 Statistiques :`);
  console.log(`   - Expériences associées à des domaines : ${Array.from(globalResult.experiencesParDomaine.values()).flat().length}`);
  console.log(`   - Expériences sans domaine : ${globalResult.nouvellesExperiences.length}`);
  console.log(`   - Réalisations : ${globalResult.realisations.length}`);
  console.log(`   - Formations : ${globalResult.formations.length}`);
  console.log(`   - Certifications : ${globalResult.certifications.length}`);
};

// Exécuter le script
main().catch((error) => {
  console.error('❌ Erreur fatale :', error);
  process.exit(1);
});
