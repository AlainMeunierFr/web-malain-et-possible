import '../../a-propos-du-site/a-propos-du-site.css';
import { readMenu } from '../../../utils/server';
import MenuAPropos from '../../../components/MenuAPropos';

/**
 * Layout de la section « A propos du site ».
 * Charge les styles dédiés et affiche le menu horizontal partagé.
 */
export default function AProposDuSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lignes = readMenu();

  return (
    <main className="main-cont">
      <MenuAPropos lignes={lignes} />
      <div className="contenuAPropos">
        {children}
      </div>
    </main>
  );
}
