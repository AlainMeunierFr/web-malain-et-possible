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
          ============================================ */}
      <section className="charte-section">
        <h2>2. Types de contenu</h2>
        <p>Aperçu de chaque type de contenu avec sa classe racine.</p>

        {/* Hero — Types hiérarchiques selon spec canonique */}
        <div className="charte-exemple">
          <code>.hero — spec: titre=--h1, sousTitre=--h2, description=--p, CTA=--lk</code>
          <div className="hero">
            <h1 className="contenu titre">Titre du hero (--h1)</h1>
            <h2 className="contenu sousTitre">Sous-titre du hero (--h2)</h2>
            <p className="contenu description">
              Description avec <strong>texte en gras</strong> pour les points clés (--p).<br />
              Deuxième ligne après \n. Troisième avec <strong>autre gras</strong>.
            </p>
            <div className="groupeBoutons">
              <a href="#" className="bouton callToAction">Discutons (CTA --lk)</a>
              <a href="#" className="lien ensavoirplus">Mes profils (--lk)</a>
            </div>
          </div>
          <p className="charte-note">
            Spec: hero.titre=--h1, hero.sousTitre=--h2, hero.description=--p, hero.callToAction=--lk, hero.ensavoirplus=--lk
          </p>
        </div>

        {/* Titre (bande bleue) — spec: texte=--h2 */}
        <div className="charte-exemple">
          <code>.titre — spec: texte=--h2</code>
          <div className="titre">
            <h2 className="contenu texte">Titre de section (--h2)</h2>
          </div>
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

        {/* Domaine de compétence — spec: titre=--h2, contenu=--p, auteur=--a */}
        <div className="charte-exemple">
          <code>.domaineDeCompetence — spec: titre=--h2, contenu=--p, auteur=--a</code>
          <div className="domaineDeCompetence">
            <h2 className="contenu titre">Titre du domaine (--h2)</h2>
            <p className="contenu contenu">
              Contenu du domaine avec <strong>texte en gras</strong> (--p).<br />
              Deuxième ligne après \n.
            </p>
            <p className="contenu auteur">— Auteur de la citation (--a, italique)</p>
            {/* Ordre spec: titre → description → auteur → image.src → image.alt → bouton.action */}
            <div className="competences" data-layout="3 columns x 1 row">
              <div className="competence">
                <h3 className="contenu titre">1. titre (--h3)</h3>
                <p className="contenu description">2. description (--p) avec <strong>gras</strong></p>
                <p className="contenu auteur">3. auteur (--a)</p>
                <div className="contenu image">4. image.src (--img)</div>
                <p className="contenu imageAlt note">5. image.alt (--n)</p>
                <a href="#" className="bouton lien">6. bouton.action (--lk)</a>
              </div>
              <div className="competence">
                <h3 className="contenu titre">Compétence sans image</h3>
                <p className="contenu description">
                  Description avec <a href="#">lien</a> (--p).
                </p>
                <p className="contenu auteur">— Auteur citation (--a)</p>
              </div>
              <div className="competence">
                <h3 className="contenu titre">Compétence avec bouton</h3>
                <p className="contenu description">
                  Citation avec <strong>mise en gras</strong> (--p).
                </p>
                <a href="#" className="bouton lien">En savoir plus (--lk)</a>
              </div>
            </div>
          </div>
          <p className="charte-note">
            Spec: domaineDeCompetence.titre=--h2, .contenu=--p, .auteur=--a ; competence.titre=--h3, .description=--p
          </p>
        </div>

        {/* Profil — spec: titre=--h2, jobTitles=--n, route=--b */}
        <div className="charte-exemple">
          <code>.profil — spec: titre=--h2, jobTitles=--n, route=--b</code>
          <div className="profil">
            <h2 className="contenu titre">Titre du profil (--h2)</h2>
            <p className="contenu jobtitles note">Job title 1 • Job title 2 (--n)</p>
            <a href="#" className="bouton route">Voir le profil (--b)</a>
          </div>
        </div>

        {/* Témoignage — ordre spec: photo → nom → fonction → temoignage */}
        <div className="charte-exemple">
          <code>.temoignage — ordre: photo → nom → fonction → temoignage</code>
          <div className="temoignage">
            <div className="contenu temoin">
              <div className="contenu photo">1. photo (--photo)</div>
              <div className="contenu temoinTexte">
                <h3 className="contenu nom">2. nom (--h3)</h3>
                <p className="contenu fonction note">3. fonction (--n)</p>
              </div>
            </div>
            <div className="contenu temoignage">
              <p>4. temoignage (--p) : « Premier paragraphe.</p>
              <p>Deuxième paragraphe après \n\n. »</p>
            </div>
          </div>
          <p className="charte-note">
            Hiérarchie: temoin.photo → temoin.texte(nom, fonction) → temoignage
          </p>
        </div>

        {/* Détournement vidéo — ordre: header(titre→pitch→date) → videos */}
        <div className="charte-exemple">
          <code>.detournementVideo — header → videos</code>
          <div className="detournementVideo">
            <div className="contenu header">
              <h2 className="contenu titre">1. titre (--h2)</h2>
              <p className="contenu pitch">2. pitch (--p) avec <strong>gras</strong></p>
              <p className="contenu date note">3. date (--n)</p>
            </div>
            <div className="contenu videos">
              <div className="contenu videoDetournee">
                <h3 className="contenu titreVideoDetournee">4. titreVideoDetournee (--h3)</h3>
                <div className="contenu video">5. videoDetournee (--v)</div>
                <p className="contenu droitsAuteur note">6. droitsAuteur (--n, tooltip)</p>
                <p className="contenu linkedin note">7. linkedin (--n)</p>
              </div>
              <div className="contenu videoOriginale">
                <h3 className="contenu titreVideoOriginale">8. titreVideoOriginale (--h3)</h3>
                <div className="contenu video">9. videoOriginale (--v)</div>
              </div>
            </div>
          </div>
          <p className="charte-note">
            Hiérarchie: header(titre, pitch, date) → videos(videoDetournee, videoOriginale)
          </p>
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

        {/* Call to Action seul — spec: action=--lk (lien avec aspect bouton) */}
        <div className="charte-exemple">
          <code>.callToAction — spec: action=--lk (aspect bouton)</code>
          <a href="#" className="bouton callToAction">Discutons (--lk aspect bouton)</a>
          <p className="charte-note">
            C&apos;est un lien interne (route), pas un vrai bouton. Bords carrés, pas de mouvement au hover, effet enfoncé au clic.
          </p>
        </div>

        {/* Expérience et apprentissage — spec: categorie=--m, description=--n, periode=--m */}
        <div className="charte-exemple">
          <code>.experienceEtApprentissage — spec: description=--n (Markdown)</code>
          <div className="experienceEtApprentissage">
            <p className="contenu categorie">Catégorie (--m, métadonnée)</p>
            <p className="contenu description note">
              <strong>25 ans d&apos;expérience</strong> à transformer des <strong>idées</strong> en produits (--n, Markdown).
            </p>
            <p className="contenu periode">2020 - 2024 (--m)</p>
          </div>
          <p className="charte-note">
            Spec: experienceEtApprentissage.description=--n (petite taille, supporte Markdown **gras**)
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
