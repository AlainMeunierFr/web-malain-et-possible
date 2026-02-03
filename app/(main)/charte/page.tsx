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
          ============================================ */}
      <section className="charte-section">
        <h2>2. Types de contenu</h2>
        <p>Aperçu de chaque type de contenu avec sa classe racine.</p>

        {/* Hero — Types hiérarchiques selon spec canonique */}
        <div className="charte-exemple">
          <code>.hero — spec: titre=--h1, sousTitre=--h2, description=--p, CTA=--lk</code>
          <div className="hero">
            <h1 className="contenu titre">Alain Meunier</h1>
            <h2 className="contenu sousTitre">Disponible et enthousiaste pour un projet stimulant (CDI ou freelance)</h2>
            <p className="contenu description">
              25 ans d&apos;expérience à <strong>transformer des idées</strong> en produits logiciels qui <strong>génèrent de la valeur</strong>.<br />
              J&apos;ai équipé 15% des radiologues libéraux français avec mon premier produit.<br />
              Passionné par la <strong>résolution de problèmes complexes</strong>, je combine <strong>rigueur technique et leadership humain</strong>.
            </p>
            <div className="groupeBoutons" data-layout="1 column, centered">
              <a href="#" className="bouton callToAction">Discutons</a>
              <a href="#" className="lien ensavoirplus">Mes profils</a>
            </div>
          </div>
          <p className="charte-note">
            Données réelles : index.json → hero
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
            <h2 className="contenu titre">Interactions humaines</h2>
            <p className="contenu contenu">
              « Lorsque les gens sont financièrement investis, ils veulent un retour. Lorsque les gens sont émotionnellement investis, ils veulent contribuer. »
            </p>
            <p className="contenu auteur">— Simon Sinek</p>
            {/* Ordre spec: titre → description → auteur → image.src → image.alt → bouton.action */}
            <div className="competences" data-layout="3 columns x 1 row">
              <div className="competence">
                <h3 className="contenu titre">Créativité</h3>
                <p className="contenu description">
                  « L&apos;imagination est plus importante que le savoir. Car le savoir est limité, tandis que l&apos;imagination embrasse le monde entier, stimulant le progrès, donnant naissance à l&apos;évolution. »
                </p>
                <p className="contenu auteur">— Albert Einstein</p>
                <div className="contenu image">[Image: Créativité.png]</div>
                <p className="contenu imageAlt note">Créativité</p>
                <a href="#" className="bouton lien">Voir le portfolio</a>
              </div>
              <div className="competence">
                <h3 className="contenu titre">Service client</h3>
                <p className="contenu description">
                  Un <strong>client satisfait</strong> est notre meilleur commercial. Il est très compliqué et long de construire une image de marque, mais très facile et rapide de la détruire.
                </p>
              </div>
              <div className="competence">
                <h3 className="contenu titre">Gestion des talents</h3>
                <p className="contenu description">
                  Je suis convaincu que le succès d&apos;une entreprise repose sur <strong>la reconnaissance</strong> et <strong>le développement</strong> des talents individuels.
                </p>
              </div>
            </div>
          </div>
          <p className="charte-note">
            Données réelles : domaines.json → interactions-humaines, competences.json → creativite, service-client, gestion-des-talents
          </p>
        </div>

        {/* Profil — spec: titre=--h2, jobTitles=--n, route=--b */}
        <div className="charte-exemple">
          <code>.profil — spec: titre=--h2, jobTitles=--n, route=--b</code>
          <div className="profil">
            <h2 className="contenu titre">Produit logiciel</h2>
            <p className="contenu jobtitles note">CPO - Chief Product Officer • HOP - Head of Product • Product Manager • Product Owner</p>
            <a href="#" className="bouton route">Voir le profil</a>
          </div>
          <p className="charte-note">
            Données réelles : mes-profils.json → profil cpo
          </p>
        </div>

        {/* Témoignage — ordre spec: photo → nom → fonction → temoignage */}
        <div className="charte-exemple">
          <code>.temoignage — ordre: photo → nom → fonction → temoignage</code>
          <div className="temoignage">
            <div className="contenu temoin">
              <div className="contenu photo">[Photo: Florent Grosmaitre.jpeg]</div>
              <div className="contenu temoinTexte">
                <h3 className="contenu nom">Florent Grosmaitre</h3>
                <p className="contenu fonction note">CEO chez CryptoNext Security</p>
              </div>
            </div>
            <div className="contenu temoignage">
              <p>« J&apos;ai eu la chance de travailler avec Alain pour l&apos;entreprise Actibase qu&apos;il avait fondé.</p>
              <p>Alain a un profil transverse capable d&apos;appréhender les problématiques variées de toute entreprise IT depuis les enjeux de R&amp;D jusqu&apos;aux éléments financiers en passant par les aspects produits, marketing et commerciaux.</p>
              <p>Alain a des qualités exceptionnelles d&apos;analyse approfondie, de compréhension des aspects technologiques, de pro-activité pour trouver des solutions, d&apos;implication dans ses missions, de qualité des livrables… Et en plus, c&apos;est sympa de travailler avec lui ! »</p>
            </div>
          </div>
          <p className="charte-note">
            Données réelles : _temoignages.json → Florent Grosmaitre
          </p>
        </div>

        {/* Détournement vidéo — ordre: header(titre→pitch→date) → videos */}
        <div className="charte-exemple">
          <code>.detournementVideo — header → videos</code>
          <div className="detournementVideo">
            <div className="contenu header">
              <h2 className="contenu titre">Team for the Planet</h2>
              <p className="contenu pitch">
                Contexte : la société et la marque «&nbsp;Time for the Planet&nbsp;» ont été poursuivies en justice par la société «&nbsp;Time to Planet&nbsp;» pour concurrence déloyale. L&apos;affaire a été longue et compliquée. Au final TFTP a modifié son nom en «&nbsp;Team for the Planet&nbsp;».
              </p>
              <p className="contenu date note">30/3/2023</p>
            </div>
            <div className="contenu videos">
              <div className="contenu videoDetournee">
                <h3 className="contenu titreVideoDetournee">Debriefing de l&apos;action contre le nom de TFTP</h3>
                <div className="contenu video">[Vidéo: kVR1a7EHn9E]</div>
                <p className="contenu linkedin note">[Lien LinkedIn]</p>
              </div>
              <div className="contenu videoOriginale">
                <h3 className="contenu titreVideoOriginale">Les visiteurs</h3>
                <div className="contenu video">[Vidéo: D66x25E_Zpc]</div>
              </div>
            </div>
          </div>
          <p className="charte-note">
            Données réelles : portfolio-detournements.json → Team for the Planet (id 4)
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
