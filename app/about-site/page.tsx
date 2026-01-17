import fs from 'fs';
import path from 'path';
import styles from '../shared.module.css';
import aboutSiteStyles from './about-site.module.css';
import { parseMarkdownDOD, type ParsedDOD } from '../../utils/markdownParser';

export default function AboutSitePage() {
  // Read the Markdown file at build time
  const markdownPath = path.join(process.cwd(), 'DEFINITION_OF_DONE.md');
  const markdownContent = fs.readFileSync(markdownPath, 'utf-8');
  const dod: ParsedDOD = parseMarkdownDOD(markdownContent);

  return (
    <main className={styles.main}>
      <div className={aboutSiteStyles.content}>
        <h1>À propos du site</h1>
        <section className={aboutSiteStyles.intro}>
          <p>
            Ce site web a été développé par un Product Manager qui a piloté une IA en lui imposant des bonnes pratiques.
          </p>
          <p>
            Ces bonnes pratiques sont formalisées dans une <strong>Definition of Done</strong> (DOD) structurée par thème,
            du plus simple au plus complexe.
          </p>
        </section>

        <section className={aboutSiteStyles.dodSection}>
          <h2>{dod.title}</h2>
          {dod.description && <p className={aboutSiteStyles.description}>{dod.description}</p>}
          {dod.themes.map((theme, index) => (
            <div key={index} className={aboutSiteStyles.theme}>
              <h3>{theme.theme}</h3>
              <ul>
                {theme.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
