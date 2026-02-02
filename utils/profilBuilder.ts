/**
 * Backend pur : Résolution des références vers la bibliothèque
 * Cette logique est réutilisable et testable en ligne de commande
 */

import type { PageData, ElementContenu, ElementDomaineDeCompetence } from './indexReader';
import type { CompetenceBibliotheque, DomaineBibliotheque, ExperienceEtApprentissage } from './bibliothequeReader';

/**
 * Résout les références dans une page en chargeant les domaines et compétences depuis la bibliothèque
 */
export function resolvePageReferences(
  pageData: PageData,
  competences: Map<string, CompetenceBibliotheque>,
  domaines: Map<string, DomaineBibliotheque>,
  autres?: Map<string, ExperienceEtApprentissage>
): PageData {
  const resolvedContenu: ElementContenu[] = [];

  for (const element of pageData.contenu) {
    // Si c'est un domaineDeCompetence avec une référence, résoudre la référence
    if (element.type === 'domaineDeCompetence' && 'ref' in element) {
      const refElement = element as any;
      const domaineId = refElement.ref;

      if (!domaineId || typeof domaineId !== 'string') {
        throw new Error(`Référence de domaine invalide: ${JSON.stringify(refElement)}`);
      }

      // Charger le domaine depuis la bibliothèque
      const domaine = domaines.get(domaineId);
      if (!domaine) {
        throw new Error(`Domaine référencé introuvable: "${domaineId}"`);
      }

      // Charger les compétences référencées
      const competencesResolues: any[] = [];
      for (const competenceId of domaine.competences) {
        const competence = competences.get(competenceId);
        if (!competence) {
          throw new Error(`Compétence référencée introuvable: "${competenceId}" dans le domaine "${domaineId}"`);
        }
        // Extraire uniquement les propriétés de ElementCompetence (sans l'id et type)
        // Le composant DomaineDeCompetences attend un tableau de ElementCompetence
        // Normaliser le bouton : extraire seulement texte et action
        let boutonNormalise = null;
        if (competence.bouton) {
          if (typeof competence.bouton === 'object' && 'texte' in competence.bouton && 'action' in competence.bouton) {
            boutonNormalise = {
              texte: competence.bouton.texte,
              action: competence.bouton.action,
            };
          } else {
            // Si le bouton a une structure différente, essayer de l'adapter
            const boutonAny = competence.bouton as any;
            if (boutonAny.texte && boutonAny.action) {
              boutonNormalise = {
                texte: boutonAny.texte,
                action: boutonAny.action,
              };
            }
          }
        }
        
        const competenceResolue: any = {
          type: 'competence',
          titre: competence.titre,
          description: competence.description || '',
          image: competence.image,
          icon: competence.icon,
          auteur: competence.auteur,
          bouton: boutonNormalise,
        };
        competencesResolues.push(competenceResolue);
      }

      // Charger les expériences référencées si disponibles
      const experiencesResolues: ExperienceEtApprentissage[] = [];
      if (domaine.experiences && autres) {
        for (const experienceId of domaine.experiences) {
          const experience = autres.get(experienceId);
          if (experience) {
            experiencesResolues.push(experience);
          }
        }
      }

      // Construire l'élément domaineDeCompetence complet au format attendu
      const domaineResolu: ElementDomaineDeCompetence = {
        type: 'domaineDeCompetence',
        titre: domaine.titre,
        contenu: domaine.contenu || '',
        auteur: domaine.auteur,
        items: competencesResolues, // Utiliser "items" comme attendu par le renderer
        experiences: experiencesResolues.length > 0 ? experiencesResolues : undefined,
      };

      resolvedContenu.push(domaineResolu);
    } else {
      // Élément sans référence, le garder tel quel
      resolvedContenu.push(element);
    }
  }

  return {
    metadata: pageData.metadata,
    contenu: resolvedContenu,
  };
}
