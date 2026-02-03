/**
 * Page /charte — Charte graphique des types hiérarchiques et de contenu
 * 
 * Affiche tous les éléments typographiques et types de contenu en un seul endroit
 * pour valider la "grammaire visuelle" avant de l'appliquer sur tout le site.
 * 
 * Cette page utilise les VRAIS composants avec les VRAIES données JSON
 * pour que le CSS soit testé sur le vrai DOM.
 */

import './charte.css';
import fs from 'fs';
import path from 'path';
import { readPageData } from '../../../utils/indexReader';
import { readDomaines, readCompetences, readAutres } from '../../../utils/bibliothequeReader';
import type { 
  ElementHero, 
  ElementListeDeProfils, 
  ElementListeDeTemoignages,
  ElementDomaineDeCompetence,
  ElementListeDeDetournementsVideo,
  ElementTexteLarge,
  ElementTitre,
  ElementCallToAction,
  ElementGroupeDeBoutons,
  ElementTemoignage,
  ExperienceEtApprentissage
} from '../../../utils/indexReader';

// Composants réels
import HeroSection from '../../../components/HeroSection';
import BlocsProfils from '../../../components/BlocsProfils';
import Titre from '../../../components/Titre';
import Temoignages from '../../../components/Temoignages';
import DomaineDeCompetences from '../../../components/DomaineDeCompetences';
import TexteLarge from '../../../components/TexteLarge';
import VideoDetournement from '../../../components/VideoDetournement';
import GroupeBoutons from '../../../components/GroupeBoutons';
import CallToAction from '../../../components/CallToAction';

export const metadata = {
  title: 'Charte graphique — Types hiérarchiques et de contenu',
  robots: 'noindex, nofollow',
};

/**
 * Charge les données pour la charte graphique
 */
function loadCharteData() {
  // Hero depuis index.json
  const indexData = readPageData('index.json');
  const hero = indexData.contenu.find((el) => el.type === 'hero') as ElementHero | undefined;

  // Profils depuis mes-profils.json
  const mesProfilsData = readPageData('mes-profils.json');
  const listeDeProfils = mesProfilsData.contenu.find((el) => el.type === 'listeDeProfils') as ElementListeDeProfils | undefined;

  // Témoignages depuis _temoignages.json (limité à 2 pour la preview)
  const temoignagesPath = path.join(process.cwd(), 'data', '_temoignages.json');
  const temoignagesRaw = JSON.parse(fs.readFileSync(temoignagesPath, 'utf-8'));
  const temoignagesItems: ElementTemoignage[] = temoignagesRaw.contenu?.[0]?.items?.map(
    (item: Omit<ElementTemoignage, 'type'>) => ({ type: 'temoignage' as const, ...item })
  ) || [];
  const temoignagesLimites: ElementListeDeTemoignages = {
    type: 'listeDeTemoignages',
    items: temoignagesItems.slice(0, 2),
  };

  // Domaine de compétences (premier domaine avec compétences résolues)
  const domaines = readDomaines();
  const competences = readCompetences();
  const autres = readAutres();
  
  // Prendre le premier domaine qui a des compétences
  let domaineDeCompetence: ElementDomaineDeCompetence | undefined;
  for (const [, domaine] of domaines) {
    if (domaine.competences && domaine.competences.length > 0) {
      const items = domaine.competences
        .map((compId) => competences.get(compId))
        .filter((c): c is NonNullable<typeof c> => c !== undefined);
      
      const experiences: ExperienceEtApprentissage[] = (domaine.experiences || [])
        .map((expId) => autres.get(expId))
        .filter((e): e is NonNullable<typeof e> => e !== undefined);
      
      if (items.length > 0) {
        domaineDeCompetence = {
          type: 'domaineDeCompetence',
          titre: domaine.titre,
          contenu: domaine.contenu,
          auteur: domaine.auteur,
          items,
          experiences: experiences.length > 0 ? experiences : undefined,
        };
        break;
      }
    }
  }

  // Détournements vidéo depuis portfolio-detournements.json (limité à 1)
  const portfolioData = readPageData('portfolio-detournements.json');
  const listeDetournements = portfolioData.contenu.find(
    (el) => el.type === 'listeDeDetournementsVideo'
  ) as ElementListeDeDetournementsVideo | undefined;
  
  const detournementLimite: ElementListeDeDetournementsVideo | undefined = listeDetournements
    ? { type: 'listeDeDetournementsVideo', items: listeDetournements.items.slice(0, 1) }
    : undefined;

  // TexteLarge depuis mes-profils.json
  const texteLarge = mesProfilsData.contenu.find((el) => el.type === 'texteLarge') as ElementTexteLarge | undefined;

  return {
    hero,
    listeDeProfils,
    temoignages: temoignagesLimites,
    domaineDeCompetence,
    detournement: detournementLimite,
    texteLarge,
  };
}

export default function ChartePage() {
  const data = loadCharteData();

  // Données fictives pour les exemples qui n'ont pas de vraies données
  const titreFictif: ElementTitre = {
    type: 'titre',
    texte: 'Titre de section (bande bleue)',
  };

  const callToActionFictif: ElementCallToAction = {
    type: 'callToAction',
    action: 'Faisons connaissance...',
    e2eID: 'charte-cta',
  };

  const groupeBoutonsFictif: ElementGroupeDeBoutons = {
    type: 'groupeDeBoutons',
    taille: 'grande',
    boutons: [
      { type: 'bouton', id: 'mail', icone: 'Mail', texte: 'Me contacter', url: 'mailto:contact@example.com', command: null },
      { type: 'bouton', id: 'linkedin', icone: 'Linkedin', texte: 'LinkedIn', url: 'https://linkedin.com', command: null },
      { type: 'bouton', id: 'youtube', icone: 'Youtube', texte: 'YouTube', url: 'https://youtube.com', command: null },
    ],
  };

  const experienceEtApprentissageFictif = {
    type: 'experienceEtApprentissage' as const,
    id: 'charte-exp',
    categorie: 'Expériences et apprentissages',
    description: 'Recrutement et formation de plus de **100 collaborateurs** (techniciens, formateurs, commerciaux) avec alignement via « moving motivators » du Management 3.0',
    periode: 'Depuis 1995',
  };

  return (
    <main className="charte">
      <section className="charte-section">
        <h1>Charte graphique</h1>
        <p className="intro">
          Cette page affiche tous les types hiérarchiques et de contenu pour valider
          la cohérence visuelle en un seul endroit.
        </p>
      </section>

      {/* ============================================
          SECTION 1 : TYPES HIÉRARCHIQUES (h1, h2, h3, h4, p, a, etc.)
          ============================================ */}
      <section className="charte-section">
        <h2>1. Types hiérarchiques</h2>
        <p>Tailles, couleurs et graisses des éléments texte de base.</p>

        <div className="charte-exemples">
          {/* === TAILLE --enorme (2rem) === */}
          
          {/* h1 dans contexte TitreDePage (header bleu) */}
          <div className="charte-exemple">
            <code>h1 (dans .header .titreDePage) — --enorme</code>
            <div className="header-preview">
              <span className="titreDePage texte">Mes Profils</span>
            </div>
            <p className="charte-note">
              Contexte : header bleu, texte blanc, taille --enorme
            </p>
          </div>

          {/* h1 standard (hors header, ex: Hero.Titre) */}
          <div className="charte-exemple">
            <code>h1 (standard, ex: Hero.Titre) — --enorme</code>
            <h1>Alain Meunier</h1>
            <p className="charte-note">
              Contexte : fond clair, texte noir, taille --enorme
            </p>
          </div>

          {/* === TAILLE --grande (1.5rem) === */}
          
          <div className="charte-exemple">
            <code>h2 — --grande</code>
            <h2>Titre de niveau 2 (h2)</h2>
          </div>

          {/* === TAILLE --normale (1rem) === */}
          
          <div className="charte-exemple">
            <code>h3 — --normale, bleu, gras</code>
            <h3>Titre de niveau 3 (h3)</h3>
          </div>

          <div className="charte-exemple">
            <code>p — --normale — reçoit le Markdown parsé</code>
            <p>
              Paragraphe avec <strong>texte en gras</strong> (Markdown: **gras**) et <em>italique</em> (*italique*).<br />
              Saut de ligne simple (Markdown: \n).<br />
              Contient aussi des <a href="#">liens cliquables</a> (Markdown: [texte](url)).
            </p>
            <p className="charte-note">
              Utilisé par: hero.description, texteLarge.texte, competence.description, temoignage.temoignage
            </p>
          </div>

          <div className="charte-exemple">
            <code>auteur (a) — --normale, italique</code>
            <p className="auteur">
              — Prénom Nom, fonction de l&apos;auteur
            </p>
          </div>

          <div className="charte-exemple">
            <code>liste l1 — --normale</code>
            <ul>
              <li>Élément de liste niveau 1</li>
              <li>Élément de liste niveau 1</li>
              <li>Élément de liste niveau 1</li>
            </ul>
          </div>

          <div className="charte-exemple">
            <code>lien (lk) — --normale, bleu, souligné</code>
            <p>
              Voici un <a href="#" className="lien">lien cliquable</a> avec style distinct.
            </p>
          </div>

          <div className="charte-exemple">
            <code>bouton (b) — --normale, blanc sur bleu</code>
            <button type="button" className="bouton">Bouton standard</button>
          </div>

          {/* === TAILLE --petite (0.8rem) === */}
          
          <div className="charte-exemple">
            <code>h4 — --petite</code>
            <h4>Titre de niveau 4 (h4)</h4>
          </div>

          <div className="charte-exemple">
            <code>note (n) — --petite — reçoit le Markdown parsé</code>
            <p className="note">
              <strong>25 ans d&apos;expérience</strong> à transformer des <strong>idées</strong> en produits logiciels 
              qui génèrent de la <strong>valeur</strong>.
            </p>
            <p className="charte-note">
              Utilisé par: experienceEtApprentissage.description
            </p>
          </div>

          <div className="charte-exemple">
            <code>sous-liste l2 — --petite</code>
            <ul>
              <li>Élément de liste niveau 1
                <ul>
                  <li>Sous-élément niveau 2 (plus petit)</li>
                  <li>Sous-élément niveau 2 (plus petit)</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 2 : TYPES DE CONTENU (classes racine)
          Utilise les VRAIS composants avec les VRAIES données
          ============================================ */}
      <section className="charte-section">
        <h2>2. Types de contenu</h2>
        <p>Aperçu de chaque type de contenu avec sa classe racine, rendu via les vrais composants.</p>

        {/* Hero */}
        {data.hero && (
          <div className="charte-exemple">
            <code>.hero — HeroSection avec index.json</code>
            <HeroSection element={data.hero} />
            <p className="charte-note">
              Composant: HeroSection | Données: index.json → hero
            </p>
          </div>
        )}

        {/* Liste de Profils */}
        {data.listeDeProfils && (
          <div className="charte-exemple">
            <code>.listeDeProfils — BlocsProfils avec mes-profils.json</code>
            <BlocsProfils element={data.listeDeProfils} />
            <p className="charte-note">
              Composant: BlocsProfils | Données: mes-profils.json → listeDeProfils
            </p>
          </div>
        )}

        {/* Titre (bande bleue) */}
        <div className="charte-exemple">
          <code>.titre — Titre</code>
          <Titre element={titreFictif} />
          <p className="charte-note">
            Composant: Titre | Données: élément fictif
          </p>
        </div>

        {/* Témoignages */}
        {data.temoignages && data.temoignages.items.length > 0 && (
          <div className="charte-exemple">
            <code>.temoignages — Temoignages avec _temoignages.json (2 premiers)</code>
            <Temoignages element={data.temoignages} />
            <p className="charte-note">
              Composant: Temoignages | Données: _temoignages.json → items[0:2]
            </p>
          </div>
        )}

        {/* Domaine de compétence */}
        {data.domaineDeCompetence && (
          <div className="charte-exemple">
            <code>.domaineDeCompetence — DomaineDeCompetences avec domaines.json + competences.json</code>
            <DomaineDeCompetences domaine={data.domaineDeCompetence} backgroundColor="white" />
            <p className="charte-note">
              Composant: DomaineDeCompetences | Données: domaines.json + competences.json (premier domaine)
            </p>
          </div>
        )}

        {/* TexteLarge */}
        {data.texteLarge && (
          <div className="charte-exemple">
            <code>.texteLarge — TexteLarge avec mes-profils.json</code>
            <TexteLarge element={data.texteLarge} />
            <p className="charte-note">
              Composant: TexteLarge | Données: mes-profils.json → texteLarge
            </p>
          </div>
        )}

        {/* Détournement vidéo */}
        {data.detournement && (
          <div className="charte-exemple">
            <code>.videoDetournement — VideoDetournement avec portfolio-detournements.json (1 premier)</code>
            <VideoDetournement element={data.detournement} />
            <p className="charte-note">
              Composant: VideoDetournement | Données: portfolio-detournements.json → items[0]
            </p>
          </div>
        )}

        {/* Groupe de boutons */}
        <div className="charte-exemple">
          <code>.groupeBoutons — GroupeBoutons</code>
          <GroupeBoutons element={groupeBoutonsFictif} />
          <p className="charte-note">
            Composant: GroupeBoutons | Données: élément fictif (taille grande)
          </p>
        </div>

        {/* Call to Action seul */}
        <div className="charte-exemple">
          <code>.callToAction — CallToAction</code>
          <CallToAction element={callToActionFictif} />
          <p className="charte-note">
            Composant: CallToAction | Données: élément fictif
          </p>
        </div>

        {/* Expérience et apprentissage (exemple en HTML car pas de composant standalone) */}
        <div className="charte-exemple">
          <code>.experienceEtApprentissage — (dans DomaineDeCompetences.experiences)</code>
          <div className="experienceEtApprentissage">
            <p className="contenu categorie">{experienceEtApprentissageFictif.categorie}</p>
            <p className="contenu description note">
              Recrutement et formation de plus de <strong>100 collaborateurs</strong> (techniciens, formateurs, commerciaux) avec alignement via « moving motivators » du Management 3.0
            </p>
            <p className="contenu periode">{experienceEtApprentissageFictif.periode}</p>
          </div>
          <p className="charte-note">
            Note: ExperienceEtApprentissage est affiché dans DomaineDeCompetences.experiences (accordéon)
          </p>
        </div>
      </section>

      {/* ============================================
          SECTION 3 : TOKENS CSS
          ============================================ */}
      <section className="charte-section">
        <h2>3. Tokens CSS (variables)</h2>
        <p>Valeurs actuelles des tokens définis dans <code>globals.css</code>.</p>

        <div className="charte-tokens">
          <h3>Couleurs</h3>
          <div className="token-grid">
            <div className="token-item">
              <div className="token-swatch" style={{ background: 'var(--CouleurFoncé)' }} />
              <code>--CouleurFoncé</code>
            </div>
            <div className="token-item">
              <div className="token-swatch" style={{ background: 'var(--CouleurClaire)' }} />
              <code>--CouleurClaire</code>
            </div>
            <div className="token-item">
              <div className="token-swatch" style={{ background: 'var(--Noir)' }} />
              <code>--Noir</code>
            </div>
            <div className="token-item">
              <div className="token-swatch" style={{ background: 'var(--Blanc)', border: '1px solid #ccc' }} />
              <code>--Blanc</code>
            </div>
          </div>

          <h3>Tailles de police</h3>
          <div className="token-list">
            <div><code>--enorme</code>: <span style={{ fontSize: 'var(--enorme)' }}>2rem</span></div>
            <div><code>--grande</code>: <span style={{ fontSize: 'var(--grande)' }}>1.5rem</span></div>
            <div><code>--moyenne</code>: <span style={{ fontSize: 'var(--moyenne)' }}>1.25rem</span></div>
            <div><code>--normale</code>: <span style={{ fontSize: 'var(--normale)' }}>1rem</span></div>
            <div><code>--petite</code>: <span style={{ fontSize: 'var(--petite)' }}>0.8rem</span></div>
          </div>
        </div>
      </section>
    </main>
  );
}
