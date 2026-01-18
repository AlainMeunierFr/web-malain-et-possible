import fs from 'fs';
import path from 'path';
import styles from '../shared.module.css';
import aboutSiteStyles from './about-site.module.css';
import { parseMarkdownDOD, type ParsedDOD } from '../../utils/markdownParser';
import { readJournalFiles, readCourseFiles } from '../../utils/journalReader';
import AccordionSection from '../../components/AccordionSection';
import { ContextContent } from '../../data/contextContent';
import JournalList from '../../components/JournalList';
import CourseList from '../../components/CourseList';

export default function AboutSitePage() {
  // Read the Markdown file at build time
  const markdownPath = path.join(process.cwd(), 'DEFINITION_OF_DONE.md');
  const markdownContent = fs.readFileSync(markdownPath, 'utf-8');
  const dod: ParsedDOD = parseMarkdownDOD(markdownContent);

  // Read journal and course files at build time
  const journals = readJournalFiles();
  const courses = readCourseFiles();

  return (
    <main className={styles.main}>
      <div className={aboutSiteStyles.content}>
        <AccordionSection title="À propos du site">
          <div className={aboutSiteStyles.sectionContent}>
            <ContextContent />
          </div>
        </AccordionSection>

        <AccordionSection title="Definition of Done">
          <div className={aboutSiteStyles.sectionContent}>
            <div className={aboutSiteStyles.dodSection}>
              {dod.description && <p className={aboutSiteStyles.description}>{dod.description}</p>}
              {dod.themes.map((theme, index) => (
                <div key={index} className={aboutSiteStyles.theme}>
                  <h2>{theme.theme}</h2>
                  <ul>
                    {theme.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </AccordionSection>

        <AccordionSection title="Journal de bord">
          <div className={aboutSiteStyles.sectionContent}>
            <JournalList journals={journals} />
          </div>
        </AccordionSection>

        <AccordionSection title="Cours">
          <div className={aboutSiteStyles.sectionContent}>
            <CourseList courses={courses} />
          </div>
        </AccordionSection>
      </div>
    </main>
  );
}
