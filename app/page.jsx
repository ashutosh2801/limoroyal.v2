import Home from "../app/home/page"

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
    images: [{
        url: "/assets/limo-royale.png",
        width: 750,
        height: 330,
        alt: "Limo Royale Logo",
      },
    ],
  },

  twitter: {
    title: "Limo Royale | Luxury Limo & Airport Chauffeur Service Toronto",
    description:
      "Travel like royalty with Limo Royale. Premium fleet, expert chauffeurs, and personalized service for corporate, airport, or special events. Book now!",
    card: "summary_large_image",
    images: ["/assets/limo-royale.png"],
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

const page = () => {
  return (
    <Home />
  );
}

export default page