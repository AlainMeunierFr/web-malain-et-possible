import React from 'react';

/**
 * Contenu de la section "Contexte"
 * Séparé du composant pour faciliter la maintenance
 */
export const ContextContent: React.FC = () => {
  return (
    <div>
      <h2>Contexte</h2>
      <p>
        <strong>Ancien développeur (1995–2020), aujourd&apos;hui en reprise active du code</strong>, 
        ce projet est un laboratoire personnel de remise à niveau sur le développement web moderne.
      </p>

      <p>
        Il combine <strong>programmation orientée objet, TDD, CI/CD, BDD (Gherkin)</strong> et des 
        principes issus du <strong>clean code et du DDD</strong>, en s&apos;appuyant sur l&apos;IA comme 
        <strong> partenaire de travail pédagogique</strong> (code sous supervision + explication détaillée).
      </p>

      <p>
        L&apos;objectif n&apos;est pas la fonctionnalité brute, mais la{' '}
        <strong>qualité du design, la lisibilité du code et l&apos;expression explicite du métier</strong>, 
        même à petite échelle.
      </p>

      <h2>À propos du projet</h2>

      <p>
        Ce projet est né d&apos;un besoin simple, mais exigeant : <strong>me remettre sérieusement au code</strong>, 
        avec les standards et les pratiques modernes du développement logiciel.
      </p>

      <p>
        Pas comme un exercice académique.<br />
        Pas comme un « side project » jetable.<br />
        Mais comme un <strong>véritable terrain d&apos;apprentissage</strong>, pensé dès le départ pour 
        produire du code compréhensible, testable, maintenable — et partageable.<br />
        Pas pour devenir développeur, mais pour interragir encore mieux avec eux.
      </p>

      <h2>Une remise à niveau volontairement ambitieuse</h2>

      <p>Mon objectif est de pratiquer :</p>

      <ul>
        <li>la <strong>programmation orientée objet</strong></li>
        <li>dans un <strong>contexte web complet</strong> (front-end et back-end)</li>
        <li>avec des <strong>langages et outils modernes</strong></li>
        <li>
          en appliquant, même à petite échelle, les{' '}
          <strong>bonnes pratiques du software craftsmanship</strong>
        </li>
      </ul>

      <p>
        Pour y parvenir, j&apos;ai fait un choix assumé : <strong>utiliser une IA comme partenaire de travail</strong>, 
        non pas pour coder « à ma place », mais pour jouer deux rôles très précis :
      </p>

      <ul>
        <li>produire du code <strong>sous ma supervision</strong></li>
        <li>
          <strong>expliquer en détail</strong> ce code, son architecture et ses choix de conception, 
          afin que je progresse et garde une maîtrise totale de ce qui est construit
        </li>
      </ul>

      <p>L&apos;IA est ici un <strong>accélérateur d&apos;apprentissage</strong>, pas une béquille.</p>

      <h2>Mon parcours : développeur, puis décideur</h2>

      <p>
        Je suis un ancien développeur, avec une expérience professionnelle allant de{' '}
        <strong>1995 à 2020</strong>, principalement sur l&apos;environnement <strong>4D</strong>.
      </p>

      <p>Ce contexte m&apos;a permis de construire de solides bases :</p>

      <ul>
        <li>
          <strong>modélisation de données</strong> (très forte)
        </li>
        <li>conception de <strong>bases relationnelles</strong></li>
        <li>
          <strong>SQL</strong> (un peu rouillé, mais bien compris)
        </li>
        <li>
          <strong>algorithmie</strong> et raisonnement logique
        </li>
      </ul>

      <p>En revanche, mon parcours ne m&apos;a pas exposé directement à :</p>

      <ul>
        <li>la programmation orientée objet « pure »</li>
        <li>les <strong>design patterns</strong></li>
        <li>les frameworks modernes</li>
        <li>la culture du code issue du <em>software craft</em></li>
      </ul>

      <p>
       Dès 2010, j&apos;ai financé et dirigé une équipe de développeurs <strong>C#</strong>. 
        Nous avons connu un échec marquant : en trois ans, le projet est devenu un{' '}
        <strong>monolithe spaghetti</strong>… que nous avons fini par jeter.
      </p>

      <p>Cette expérience a été déterminante.</p>

      <p>Elle a conduit l&apos;équipe à une remise en question profonde, puis à l&apos;adoption progressive de pratiques solides :</p>

      <ul>
        <li>
          <strong>BDD &amp; TDD</strong>
        </li>
        <li>
          <strong>Clean Code</strong>
        </li>
        <li>
          <strong>DDD</strong>
        </li>
        <li>
          <strong>architecture hexagonale</strong>
        </li>
        <li>
          <strong>CQRS</strong> et <strong>Event Sourcing</strong>
        </li>
      </ul>

      <p>
        Aujourd&apos;hui, je connais la <strong>différence entre du code qui fonctionne et du code de qualité</strong>.
      </p>

      <h2>Les principes non négociables du projet</h2>

      <p>Même pour un projet personnel, même pour apprendre, je considère que le minimum est :</p>

      <ul>
        <li>
          <strong>TDD</strong> : les tests guident le code
        </li>
        <li>
          <strong>CI/CD</strong> : le code est versionné, testé et déployable
        </li>
        <li>un <strong>historique clair sur GitHub</strong></li>
        <li>
          un <strong>déploiement rapide</strong> dans un environnement accessible à des utilisateurs réels 
          (testeurs, amis, tiers)
        </li>
        <li>des <strong>itérations courtes</strong> et du feedback rapide</li>
      </ul>

      <p>Le code n&apos;est pas écrit « pour moi seul », mais pour être :</p>

      <ul>
        <li>lu</li>
        <li>compris</li>
        <li>critiqué</li>
        <li>amélioré</li>
      </ul>

      <h2>Un accent fort sur l&apos;expression du métier</h2>

      <p>
        Je suis particulièrement attaché à la capacité du code à <strong>exprimer l&apos;intention métier</strong>.
      </p>

      <p>C&apos;est pourquoi le projet s&apos;appuie aussi sur :</p>

      <ul>
        <li>des <strong>scénarios BDD en Gherkin</strong></li>
        <li>un langage compréhensible par des <strong>non-développeurs</strong></li>
      </ul>

      <p>
        L&apos;objectif est simple : qu&apos;une personne extérieure puisse retrouver, dans le code source,{' '}
        <strong>l&apos;intention initiale du produit</strong>.
      </p>

      <h2>Pourquoi ce projet peut vous intéresser</h2>

      <p>
        Si vous êtes recruteur, développeur ou tech lead, ce projet n&apos;est pas là pour impressionner par sa 
        taille ou sa complexité.
      </p>

      <p>Il est là pour montrer :</p>

      <ul>
        <li>une <strong>démarche de reprise en main sérieuse</strong></li>
        <li>une <strong>culture de la qualité logicielle</strong></li>
        <li>une capacité à <strong>apprendre avec méthode</strong></li>
        <li>
          une exigence souvent réservée aux projets professionnels, appliquée ici à un projet personnel
        </li>
      </ul>

      <p>
        C&apos;est à la fois un <strong>laboratoire</strong>, un <strong>outil de formation</strong>, et un{' '}
        <strong>manifeste discret</strong> sur la manière dont j&apos;aborde aujourd&apos;hui le développement logiciel.
      </p>

      <p>
        Ces bonnes pratiques sont formalisées dans une <strong>Definition of Done</strong> (DOD) structurée par thème,
        du plus simple au plus complexe.
      </p>
    </div>
  );
};
