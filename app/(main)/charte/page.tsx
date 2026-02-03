/**
 * Page /charte — Charte graphique des types hiérarchiques et de contenu
 * 
 * Affiche tous les éléments typographiques et types de contenu en un seul endroit
 * pour valider la "grammaire visuelle" avant de l'appliquer sur tout le site.
 */

import './charte.css';

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
              <span className="titreDePage texte">Titre de Page (h1 dans header)</span>
            </div>
            <p className="charte-note">
              Contexte : header bleu, texte blanc, taille --enorme
            </p>
          </div>

          {/* h1 standard (hors header, ex: Hero.Titre) */}
          <div className="charte-exemple">
            <code>h1 (standard, ex: Hero.Titre) — --enorme</code>
            <h1>Titre de niveau 1 (h1)</h1>
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
            <code>p — --normale</code>
            <p>
              Paragraphe standard (p). Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div className="charte-exemple">
            <code>strong / em</code>
            <p>
              Texte avec <strong>mise en gras</strong> et <em>mise en italique</em>.
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
            <code>note (n) — --petite</code>
            <p className="note">
              Ceci est une note ou une légende. Texte plus petit pour les informations secondaires.
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
          ============================================ */}
      <section className="charte-section">
        <h2>2. Types de contenu</h2>
        <p>Aperçu de chaque type de contenu avec sa classe racine.</p>

        {/* Hero */}
        <div className="charte-exemple">
          <code>.hero</code>
          <div className="hero">
            <div className="contenu titre">Titre du hero</div>
            <div className="contenu sousTitre">Sous-titre du hero</div>
            <div className="contenu description">
              Description du hero. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <div className="groupeBoutons">
              <a href="#" className="callToAction">Bouton CTA</a>
            </div>
          </div>
        </div>

        {/* Titre (bande bleue) */}
        <div className="charte-exemple">
          <code>.titre</code>
          <div className="titre">
            <div className="contenu titre">Titre de section (bande bleue)</div>
          </div>
        </div>

        {/* TexteLarge */}
        <div className="charte-exemple">
          <code>.texteLarge</code>
          <div className="texteLarge">
            <p>
              Bloc de texte large. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
          </div>
        </div>

        {/* Domaine de compétence */}
        <div className="charte-exemple">
          <code>.domaineDeCompetence</code>
          <div className="domaineDeCompetence">
            <div className="contenu titre">Titre du domaine</div>
            <div className="contenu description">
              Description du domaine de compétence.
            </div>
            <div className="competences" data-layout="3 columns x 1 row">
              <div className="competence">
                <div className="contenu titre">Compétence 1</div>
                <div className="contenu description">Description de la compétence.</div>
              </div>
              <div className="competence">
                <div className="contenu titre">Compétence 2</div>
                <div className="contenu description">Description de la compétence.</div>
              </div>
              <div className="competence">
                <div className="contenu titre">Compétence 3</div>
                <div className="contenu description">Description de la compétence.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Profil */}
        <div className="charte-exemple">
          <code>.profil</code>
          <div className="profil">
            <div className="contenu titre">Titre du profil</div>
            <div className="contenu jobtitles">Job title 1 • Job title 2</div>
            <a href="#" className="callToAction">Voir le profil</a>
          </div>
        </div>

        {/* Témoignage */}
        <div className="charte-exemple">
          <code>.temoignage</code>
          <div className="temoignage">
            <div className="contenu auteur">Nom de l&apos;auteur</div>
            <div className="contenu fonction">Fonction de l&apos;auteur</div>
            <div className="contenu texte">
              &quot;Citation du témoignage. Lorem ipsum dolor sit amet, consectetur adipiscing elit.&quot;
            </div>
          </div>
        </div>

        {/* Détournement vidéo */}
        <div className="charte-exemple">
          <code>.detournementVideo</code>
          <div className="detournementVideo">
            <div className="contenu titre">Titre du détournement</div>
            <div className="contenu pitch">
              Pitch du détournement vidéo. Description courte du contenu.
            </div>
            <div className="contenu date">Janvier 2024</div>
          </div>
        </div>

        {/* Groupe de boutons */}
        <div className="charte-exemple">
          <code>.groupeBoutons</code>
          <div className="groupeBoutons">
            <a href="#" className="callToAction">Bouton 1</a>
            <a href="#" className="callToAction">Bouton 2</a>
            <a href="#" className="callToAction">Bouton 3</a>
          </div>
        </div>

        {/* Call to Action seul */}
        <div className="charte-exemple">
          <code>.callToAction</code>
          <a href="#" className="callToAction">Bouton Call to Action</a>
        </div>

        {/* Expérience et apprentissage */}
        <div className="charte-exemple">
          <code>.experienceEtApprentissage</code>
          <div className="experienceEtApprentissage">
            <div className="contenu categorie">Catégorie</div>
            <div className="contenu description">Description de l&apos;expérience ou apprentissage.</div>
            <div className="contenu periode">2020 - 2024</div>
          </div>
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
