import type { Metadata } from "next";
import { Syne, DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TrackMates — La course se vit mieux ensemble.",
  description:
    "TrackMates organise vos weekends courses depuis Paris jusqu'aux circuits ELMS. Transport, hébergement, billets. Un seul interlocuteur, zéro stress.",
  metadataBase: new URL("https://trackmates.fr"),
  openGraph: {
    title: "TrackMates — La course se vit mieux ensemble.",
    description:
      "Weekends tout compris depuis Paris vers les circuits ELMS. Saison 2027 : 6 circuits, 6 pays.",
    url: "https://trackmates.fr",
    siteName: "TrackMates",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrackMates — La course se vit mieux ensemble.",
    description:
      "Weekends tout compris depuis Paris vers les circuits ELMS. Lancement 2027.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${syne.variable} ${dmSans.variable} ${dmSerifDisplay.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
