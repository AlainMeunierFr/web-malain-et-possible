export interface FooterButton {
  id: string;
  icon: string; // Nom de l'icône lucide-react (ex: "Mail", "Youtube")
  command: string;
  alt: string;
  url: string | null;
  tooltip: string;
}
