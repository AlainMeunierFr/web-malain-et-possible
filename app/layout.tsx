import type { Metadata } from "next";
import { EditingProvider } from "../contexts/EditingContext";
import { PageTitleProvider } from "../contexts/PageTitleContext";
import Matomo from "../components/Matomo";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
      <head>
        <link
          rel="preload"
          href="/fonts/Outfit-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Outfit-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        <EditingProvider>
          <PageTitleProvider>
            <Matomo />
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
          </PageTitleProvider>
        </EditingProvider>
      </body>
    </html>
  );
}
