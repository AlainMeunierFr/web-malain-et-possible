/**
 * Page /charte — Charte graphique des types hiérarchiques et de contenu
 * 
 * Affiche tous les éléments typographiques et types de contenu en un seul endroit
 * pour valider la "grammaire visuelle" avant de l'appliquer sur tout le site.
 */

import './charte.css';
import { buildHierarchyTree, renderHierarchyToAscii } from '../../../utils/backoffice';
import { CANONICAL_SPEC_ORDER } from '../../../constants/canonicalSpec';
import VideoDetournement from '../../../components/VideoDetournement';
import type { ElementListeDeDetournementsVideo } from '../../../utils';

// Génère la hiérarchie ASCII au moment du build (Server Component)
const hierarchyAscii = renderHierarchyToAscii(buildHierarchyTree(CANONICAL_SPEC_ORDER));

/**
 * Transforme le texte ASCII en JSX avec :
 * - data-layout colorés en jaune
 * - types hiérarchiques (--h1, --p, etc.) colorés en vert
 */
function renderAsciiWithColors(ascii: string): React.ReactNode[] {
  const lines = ascii.split('\n');
  return lines.map((line, i) => {
    // Regex combinée pour trouver data-layout="..." et (--xxx)
    const regex = /(data-layout="[^"]*")|(\(--[a-z0-9]+\))/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    
    while ((match = regex.exec(line)) !== null) {
      // Texte avant le match
      if (match.index > lastIndex) {
        parts.push(line.slice(lastIndex, match.index));
      }
      // Déterminer le type de match et la classe CSS
      if (match[1]) {
        // data-layout en jaune
        parts.push(
          <span key={`${i}-${match.index}`} className="data-layout-highlight">
            {match[1]}
          </span>
        );
      } else if (match[2]) {
        // Type hiérarchique en vert
        parts.push(
          <span key={`${i}-${match.index}`} className="type-hierarchique-highlight">
            {match[2]}
          </span>
        );
      }
      lastIndex = regex.lastIndex;
    }
    // Texte restant après le dernier match
    if (lastIndex < line.length) {
      parts.push(line.slice(lastIndex));
    }
    
    return (
      <span key={i}>
        {parts.length > 0 ? parts : line}
        {'\n'}
      </span>
    );
  });
}

export const metadata = {
  title: 'Charte graphique — Types hiérarchiques et de contenu',
  robots: 'noindex, nofollow',
};

export default function ChartePage() {
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
          SECTION 1 : TYPES HIÉRARCHIQUES (h1, --st, h2, h3, h4, p, a, etc.)
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

          {/* === TAILLE --moyenne (1.25rem) === */}

          {/* Sous-titre (--st) : complément du titre principal */}
          <div className="charte-exemple">
            <code>--st (sous-titre, ex: Hero.sousTitre) — --moyenne, gras</code>
            <p className="sousTitre">Disponible et enthousiaste pour un projet stimulant</p>
            <p className="charte-note">
              Sémantique : complément du titre (pas un h2). Rendu en &lt;p class=&quot;sousTitre&quot;&gt;
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
          SECTION 2 : HIÉRARCHIE DU SITE (ASCII)
          ============================================ */}
      <section className="charte-section">
        <h2>2. Hiérarchie du site</h2>
        <p>Structure des containers et propriétés générée depuis <code>canonicalSpec.ts</code>.</p>
        <div className="charte-exemple">
          <code>Générée par utils/siteHierarchyGenerator.ts (sans IA)</code>
          <pre className="hierarchy-ascii">{renderAsciiWithColors(hierarchyAscii)}</pre>
          <p className="charte-note">
            Légende : dossier/ = container, ligne = propriété. 
            Source : constants/canonicalSpec.ts
          </p>
        </div>
      </section>

      {/* ============================================
          SECTION 3 : TYPES DE CONTENU (classes racine)
          ============================================ */}
      <section className="charte-section">
        <h2>3. Types de contenu</h2>
        <p>Aperçu de chaque type de contenu avec sa classe racine.</p>

        {/* Hero — Layout 2 colonnes avec vidéo */}
        <div className="charte-exemple">
          <code>.hero[data-layout=&quot;2 columns&quot;] — .heroGauche | .heroDroite</code>
          <div className="hero" data-layout="2 columns">
            <div className="heroGauche">
              <h1 className="hero titre">Alain Meunier</h1>
              <p className="hero sousTitre">Disponible et enthousiaste pour un projet stimulant (CDI ou freelance)</p>
              <p className="hero description">
                25 ans d&apos;expérience à <strong>transformer des idées</strong> en produits logiciels qui <strong>génèrent de la valeur</strong>.<br />
                J&apos;ai équipé 15% des radiologues libéraux français avec mon premier produit.<br />
                Passionné par la <strong>résolution de problèmes complexes</strong>, je combine <strong>rigueur technique et leadership humain</strong>.
              </p>
              <div className="ui-heroCtas">
                <a href="#" className="lienInterne">Télécharger mon CV</a>
                <a href="#" className="bouton hero callToAction">Discutons</a>
              </div>
            </div>
            <div className="heroDroite">
              <div className="video">
                <div className="videoWrapper" style={{ backgroundColor: '#e0e0e0', position: 'relative', width: '100%', height: 0, paddingBottom: '56.25%' }}>
                  <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#666' }}>[Vidéo YouTube]</span>
                </div>
              </div>
            </div>
          </div>
          <p className="charte-note">
            Données réelles : index.json → hero (avec video)
          </p>
        </div>

        {/* Liste de Profils — 4 colonnes (classes identiques à ProfilContainer.tsx) */}
        <div className="charte-exemple">
          <code>.listeDeProfils — data-layout=&quot;4 columns x 1 row&quot;</code>
          <div className="listeDeProfils" data-layout="4 columns x 1 row">
            <div className="profil">
              <h2 className="profil titre">Produit logiciel</h2>
              <ul className="profil jobTitles">
                <li className="profil jobTitle">CPO - Chief Product Officer</li>
                <li className="profil jobTitle">HOP - Head of Product</li>
                <li className="profil jobTitle">Product Manager</li>
                <li className="profil jobTitle">Product Owner</li>
              </ul>
              <div className="profil actions">
                <a href="#" className="profil route lienInterne">En savoir plus...</a>
              </div>
              <a href="/CV/cpo.pdf" className="cvPath" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                <span>Télécharger le CV</span>
              </a>
            </div>
            <div className="profil">
              <h2 className="profil titre">Opérations</h2>
              <ul className="profil jobTitles">
                <li className="profil jobTitle">Manager de transition</li>
                <li className="profil jobTitle">COO - Chief Operation Officer</li>
                <li className="profil jobTitle">HOO - Head of Operation</li>
                <li className="profil jobTitle">Directeur opérationnel</li>
              </ul>
              <div className="profil actions">
                <a href="#" className="profil route lienInterne">En savoir plus...</a>
              </div>
              <a href="/CV/coo.pdf" className="cvPath" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                <span>Télécharger le CV</span>
              </a>
            </div>
            <div className="profil">
              <h2 className="profil titre">Transformation Agile</h2>
              <ul className="profil jobTitles">
                <li className="profil jobTitle">Transformation Agile</li>
                <li className="profil jobTitle">Coach Agile</li>
                <li className="profil jobTitle">Scrum Master</li>
                <li className="profil jobTitle">Product Owner</li>
              </ul>
              <div className="profil actions">
                <a href="#" className="profil route lienInterne">En savoir plus...</a>
              </div>
              <a href="/CV/agile.pdf" className="profil cvPath" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                <span>Télécharger le CV</span>
              </a>
            </div>
            <div className="profil">
              <h2 className="profil titre">Technologie</h2>
              <ul className="profil jobTitles">
                <li className="profil jobTitle">CTO - Chief Technology Officer</li>
                <li className="profil jobTitle">HTO - Head of Technology</li>
                <li className="profil jobTitle">Directeur Technique</li>
              </ul>
              <div className="profil actions">
                <a href="#" className="profil route lienInterne">En savoir plus...</a>
              </div>
              <a href="/CV/cto.pdf" className="cvPath" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                <span>Télécharger le CV</span>
              </a>
            </div>
          </div>
          <p className="charte-note">
            Structure : .profil &gt; (.titre + .jobTitles + .actions) — .actions contient le bouton et le lien CV
          </p>
        </div>

        {/* Titre (bande bleue) — spec: texte=--h2 */}
        <div className="charte-exemple">
          <code>.titre — spec: texte=--h2</code>
          <div className="titre">
            <h2 className="contenu texte">Titre de section (--h2)</h2>
          </div>
        </div>

        {/* Liste de Témoignages — grille 2 colonnes */}
        <div className="charte-exemple">
          <code>.listeDeTemoignages — data-layout=&quot;2 columns x N rows&quot;</code>
          <div className="temoignages" data-layout="2 columns x N rows">
            <div className="ui-grid">
              {/* Témoignage 1 */}
              <div className="temoignage ui-card">
                <div className="ui-header">
                  <div className="temoignage photo ui-photo">
                    <div className="placeholder-image" style={{ width: 80, height: 80, borderRadius: '50%' }}>[Photo]</div>
                  </div>
                  <div className="ui-info">
                    <h3 className="temoignage nom">Florent Grosmaitre</h3>
                    <p className="temoignage fonction">CEO chez CryptoNext Security</p>
                  </div>
                </div>
                <div className="temoignage temoignage">
                  <p className="ui-paragraph">« J&apos;ai eu la chance de travailler avec Alain pour l&apos;entreprise Actibase qu&apos;il avait fondé. »</p>
                </div>
              </div>
              {/* Témoignage 2 */}
              <div className="temoignage ui-card">
                <div className="ui-header">
                  <div className="temoignage photo ui-photo">
                    <div className="placeholder-image" style={{ width: 80, height: 80, borderRadius: '50%' }}>[Photo]</div>
                  </div>
                  <div className="ui-info">
                    <h3 className="temoignage nom">Marie Dupont</h3>
                    <p className="temoignage fonction">Directrice Produit</p>
                  </div>
                </div>
                <div className="temoignage temoignage">
                  <p className="ui-paragraph">« Un professionnel exceptionnel avec une vision stratégique remarquable. »</p>
                </div>
              </div>
              {/* Témoignage 3 */}
              <div className="temoignage ui-card">
                <div className="ui-header">
                  <div className="temoignage photo ui-photo">
                    <div className="placeholder-image" style={{ width: 80, height: 80, borderRadius: '50%' }}>[Photo]</div>
                  </div>
                  <div className="ui-info">
                    <h3 className="temoignage nom">Pierre Martin</h3>
                    <p className="temoignage fonction">CTO chez TechCorp</p>
                  </div>
                </div>
                <div className="temoignage temoignage">
                  <p className="ui-paragraph">« Alain combine expertise technique et leadership humain de façon unique. »</p>
                </div>
              </div>
            </div>
          </div>
          <p className="charte-note">
            Types : .nom (--h3), .fonction (--n), .temoignage (--p). Grille : 2 colonnes responsive.
          </p>
        </div>

        {/* Domaine de compétence — spec: titre=--h2, contenu=--p, auteur=--a */}
        <div className="charte-exemple">
          <code>.domaineDeCompetence — spec: titre=--h2, contenu=--p, auteur=--a</code>
          <div className="domaineDeCompetence">
            <h2 className="contenu titre">Interactions humaines</h2>
            <p className="contenu contenu">
              « Lorsque les gens sont financièrement investis, ils veulent un retour. Lorsque les gens sont émotionnellement investis, ils veulent contribuer. »
            </p>
            <p className="contenu auteur">— Simon Sinek</p>
            {/* Ordre visuel: titre → image → description → auteur → bouton */}
            <div className="competences" data-layout="3 columns x 1 row">
              <div className="competence">
                <h3 className="contenu titre">Créativité</h3>
                <div className="contenu image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/api/images/json/Cr%C3%A9ativit%C3%A9.png" alt="Créativité" />
                </div>
                <p className="contenu description">
                  « L&apos;imagination est plus importante que le savoir. Car le savoir est limité, tandis que l&apos;imagination embrasse le monde entier. »
                </p>
                <p className="contenu auteur">— Albert Einstein</p>
                <a href="#" className="bouton lien">Voir le portfolio</a>
              </div>
              <div className="competence">
                <h3 className="contenu titre">Service client</h3>
                <div className="contenu image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/api/images/json/Service%20client.png" alt="Service client" />
                </div>
                <p className="contenu description">
                  Un <strong>client satisfait</strong> est notre meilleur commercial. Il est très compliqué de construire une image de marque, mais facile de la détruire.
                </p>
              </div>
              <div className="competence">
                <h3 className="contenu titre">Gestion des talents</h3>
                <div className="contenu image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/api/images/json/Talents.png" alt="Gestion des talents" />
                </div>
                <p className="contenu description">
                  Le succès d&apos;une entreprise repose sur <strong>la reconnaissance</strong> et <strong>le développement</strong> des talents individuels.
                </p>
              </div>
            </div>
          </div>
          <p className="charte-note">
            Données réelles : domaines.json → interactions-humaines, competences.json → creativite, service-client, gestion-des-talents
          </p>
        </div>

        {/* TexteLarge — Markdown: **gras**, \n\n (paragraphes) */}
        <div className="charte-exemple">
          <code>.texteLarge — Markdown: **gras**, \n\n</code>
          <div className="texteLarge">
            <p>
              Premier paragraphe avec <strong>texte en gras</strong> pour les points importants.
              Suite du premier paragraphe sur la même ligne.
            </p>
            <p>
              Deuxième paragraphe après \n\n. Mon <strong>profil polyvalent</strong> me permet
              d&apos;apporter des <strong>solutions créatives</strong> à vos défis.
            </p>
            <p>
              Troisième paragraphe. Conclusion du texte large.
            </p>
          </div>
          <p className="charte-note">
            JSON: &quot;texte&quot;: &quot;Premier **paragraphe**.\n\nDeuxième **paragraphe**.&quot;
          </p>
        </div>

        {/* Détournement vidéo — rendu par le composant unique VideoDetournement */}
        <div className="charte-exemple">
          <code>.detournementVideo — .titre (--h2) + .pitch (--p) + .videos (2 colonnes)</code>
          <VideoDetournement element={{
            type: 'listeDeDetournementsVideo',
            items: [{
              type: 'detournementVideo',
              titre: 'Sator',
              titreVideoDetournee: 'La machine à apprendre',
              videoDetournee: 'SiIT5JustSE',
              titreVideoOriginale: 'La machine à apprendre',
              videoOriginale: 'ljYRbx4XipQ',
              date: '17/9/2025',
              pitch: 'Contexte : promotion de l\'offre Sator, la plateforme de formation dédiée aux enjeux sérieux.',
              droitsAuteur: `Cette vidéo s'inscrit dans une démarche de détournement qui relève d'une exception au droit d'auteur au titre du pastiche ou de la parodie, selon l'alinéa 4 de l'article L122‑5 du Code de la propriété intellectuelle.
Pour moi, elle respecte les exigences de la jurisprudence :
- Loi du genre : parodie, pastiche ou caricature doit respecter les codes humoristiques du genre : satire, ironie, etc.
- Éléments essentiels : l'œuvre évoque clairement une œuvre originale, mais de façon perceptiblement différente, et génère un effet comique ou satirique.
- Intention non malveillante : il ne doit pas y avoir d'intention de nuire ou de dégrader l'image de l'œuvre d'origine.
- Absence de confusion : le public ne doit pas confondre la parodie avec l'œuvre originale.
- Respect du juste équilibre : l'évaluation doit tenir compte du contexte global, de la finalité non commerciale, de la portée critique ou satirique, et des droits de l'auteur original.`,
              linkedin: 'https://www.linkedin.com/posts/pierre-gilbert-2916a5108_un-peu-dhumour-pour-commencer-la-journ%C3%A9e-activity-7373958957519900672-KOuP',
            }],
          } as ElementListeDeDetournementsVideo} />
          <p className="charte-note">
            Rendu par le composant unique VideoDetournement (même rendu que /portfolio-detournements)
          </p>
        </div>

        {/* Groupe de boutons */}
        <div className="charte-exemple">
          <code>.groupeBoutons — data-layout=&quot;1 column, centered&quot;</code>
          <div className="groupeBoutons" data-layout="1 column, centered">
            <a href="#" className="callToAction">Discutons</a>
            <a href="#" className="callToAction">Mes profils</a>
          </div>
          <p className="charte-note">
            Boutons empilés verticalement et centrés
          </p>
        </div>

        {/* Call to Action seul — spec: action=--lk (lien avec aspect bouton) */}
        <div className="charte-exemple">
          <code>.callToAction — spec: action=--lk (aspect bouton)</code>
          <a href="#" className="bouton callToAction">Faisons connaissance...</a>
          <p className="charte-note">
            Données réelles : detournement-video.json → callToAction.action
          </p>
        </div>

        {/* Expérience et apprentissage — spec: categorie=--m, description=--n, periode=--m */}
        <div className="charte-exemple">
          <code>.experienceEtApprentissage — spec: description=--n (Markdown)</code>
          <div className="experienceEtApprentissage">
            <p className="contenu categorie">Expériences et apprentissages</p>
            <p className="contenu description note">
              Recrutement et formation de plus de <strong>100 collaborateurs</strong> (techniciens, formateurs, commerciaux) avec alignement via «&nbsp;moving motivators&nbsp;» du Management 3.0
            </p>
            <p className="contenu periode">Depuis 1995</p>
          </div>
          <p className="charte-note">
            Données réelles : experienceEtApprentissage.json → id 2 et 5
          </p>
        </div>
      </section>

      {/* ============================================
          SECTION 4 : TOKENS CSS
          ============================================ */}
      <section className="charte-section">
        <h2>4. Tokens CSS (variables)</h2>
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
