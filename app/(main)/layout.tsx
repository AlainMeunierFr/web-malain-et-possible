/**
 * Layout du site principal : uniquement les feuilles de style.
 * Les routes sous (main) ont le CSS ; Header et Footer restent dans le layout racine. /raw n’utilise pas ce layout (aucune feuille de style).
 */

import "../globals.css";
import "../content-styles.css";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
