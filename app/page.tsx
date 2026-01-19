import styles from './shared.module.css';
import { readIndexData } from '../utils/indexReader';

/**
 * Page d'accueil
 * Server Component : Charge le JSON depuis le backend pur et affiche le Domaine de compétences
 */
export default function HomePage() {
  // Appel côté serveur : le backend pur lit le fichier JSON
  const indexData = readIndexData();
  const domaine = indexData.domaineDeCompetences;

  return (
    <main className={styles.main}>
      <h1>Home page</h1>
      
      {/* Affichage du Domaine de compétences */}
      <section>
        <h2>{domaine.titre}</h2>
        <p>{domaine.contenu}</p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {domaine.items.map((competence, index) => (
            <div key={index} style={{ width: '33%', minWidth: '250px', padding: '20px' }}>
              <h3>{competence.titre}</h3>
              <img 
                src={competence.image.src} 
                alt={competence.image.alt}
                style={{ width: '60%', aspectRatio: '1', objectFit: 'cover' }}
              />
              <p>{competence.description}</p>
              {competence.bouton && (
                <button>{competence.bouton.texte}</button>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
