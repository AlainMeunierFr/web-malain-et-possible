import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Malain et possible",
  description: "Conduite du changement - Transformation - Inspirateur - Explorateur des possibles - Coach agile",
  keywords: ["conduite du changement", "transformation", "coach agile", "Alain Meunier"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
