import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import type { ReactNode } from 'react'
import { Sora } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Limo Royale | Luxury Limo & Airport Chauffeur Service Toronto",
  description:
    "Travel like royalty with Limo Royale. Premium fleet, expert chauffeurs, and personalized service for corporate, airport, or special events. Book now!",
  keywords: "airport chauffeur service, airport limo service",
  metadataBase: new URL("https://limoroyal.com"),

  alternates: {
    canonical: "/", // same as homepage
    languages: {
      "en-ca": "https://limoroyal.com",
    },
  },

  robots: "index, follow",

  openGraph: {
    title: "Limo Royale | Luxury Limo & Airport Chauffeur Service Toronto",
    description:
      "Travel like royalty with Limo Royale. Premium fleet, expert chauffeurs, and personalized service for corporate, airport, or special events. Book now!",
    url: "https://limoroyal.com/",
  },

  twitter: {
    title: "Limo Royale | Luxury Limo & Airport Chauffeur Service Toronto",
    description:
      "Travel like royalty with Limo Royale. Premium fleet, expert chauffeurs, and personalized service for corporate, airport, or special events. Book now!",
    card: "summary_large_image",
  },

  other: {
    "DC.title":
      "Limo Royale | Luxury Limo & Airport Chauffeur Service Toronto",
  },

  icons: {
    icon: "/favicon.jpg",
    shortcut: "/favicon.jpg",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
