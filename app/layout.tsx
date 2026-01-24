import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { EditingProvider } from "../contexts/EditingContext";
import Matomo from "../components/Matomo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Malain et possible",
  description: "Conduite du changement - Transformation - Inspirateur - Explorateur des possibles - Coach agile",
  keywords: ["conduite du changement", "transformation", "coach agile", "Alain Meunier"],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <EditingProvider>
          <Matomo />
          <Header />
          {children}
          <Footer />
        </EditingProvider>
      </body>
    </html>
  );
}
