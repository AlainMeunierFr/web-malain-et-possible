import '../../a-propos-du-site/a-propos-du-site.css';

/**
 * Layout de la section « A propos du site ».
 * Charge les styles dédiés (a-propos-du-site.css) pour ces routes.
 */
export default function AProposDuSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
