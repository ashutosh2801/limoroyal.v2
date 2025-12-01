import "./globals.css";
import Script from "next/script";
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
      <head>
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
        >
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NWBX2HM4');
          `}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NWBX2HM4"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
