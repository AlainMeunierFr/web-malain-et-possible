export interface FooterButton {
  id: string;
  icone: string; // Nom de l'icône lucide-react (ex: "Mail", "Youtube")
  texte: string | null;
  command: string;
  url: string | null;
  e2eID?: string;
  // Champs optionnels pour compatibilité
  alt?: string;
  tooltip?: string;
}
