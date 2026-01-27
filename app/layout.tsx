import type { Metadata } from "next";
import "./globals.css";
import "./button-styles.css";
import "./content-styles.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { EditingProvider } from "../contexts/EditingContext";
import { PageTitleProvider } from "../contexts/PageTitleContext";
import Matomo from "../components/Matomo";

/* Les polices sont maintenant chargées localement via @font-face dans globals.css
   Plus besoin de next/font/google - toutes les polices sont servies depuis /fonts/ */

export const metadata: Metadata = {
  title: "Malain et possible",
  description: "Conduite du changement - Transformation - Inspirateur - Explorateur des possibles - Coach agile",
  keywords: ["conduite du changement", "transformation", "coach agile", "Alain Meunier"],
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  other: {
    'color-scheme': 'light',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="antialiased">
        <EditingProvider>
          <PageTitleProvider>
            <Matomo />
            <Header />
            {children}
            <Footer />
          </PageTitleProvider>
        </EditingProvider>
      </body>
    </html>
  );
}
