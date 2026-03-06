export const metadata = {
  title: "Luxury Limousine Services for Every Occasion | Limo Royale",
  description: "Book a premium limousine with Limo Royale. Experience comfort and elegance for any occasion. Reserve your ride today!",
  keywords: "Luxury Limousine Services for Every Occasion",

  alternates: {
    canonical: "https://limoroyal.com/luxury-limousine",
    languages: {
      "en-ca": "https://limoroyal.com/luxury-limousine",
    },
  },

  robots: "index, follow",

  openGraph: {
    title: "Luxury Limousine Services for Every Occasion | Limo Royale",
    description: "Book a premium limousine with Limo Royale. Experience comfort and elegance for any occasion. Reserve your ride today!",
    url: "https://limoroyal.com/luxury-limousine",
  },

  twitter: {
    title: "Luxury Limousine Services for Every Occasion | Limo Royale",
    description: "Book a premium limousine with Limo Royale. Experience comfort and elegance for any occasion. Reserve your ride today!",
    url: "https://limoroyal.com/luxury-limousine",
  },

  other: {
    "DC.title": "Luxury Limousine Services for Every Occasion | Limo Royale",
  },
};


import LuxuryLimousine from "./LuxuryLimousine";

const page = () => {
  return (
    <LuxuryLimousine />
  )
}

export default page