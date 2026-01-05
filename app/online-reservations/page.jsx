export const metadata = {
  title: "Book Your Ride Online | Limo Royale Luxury Chauffeur Service",
  description: "Reserve your luxury limo or private tour with Limo Royale. Easy online booking for airport transfers, city tours, and more.",
  keywords: "Limo Royale Luxury Chauffeur Service, Cheap Airport Limo",
  robots: "index, follow",
  alternates: {
    canonical: "https://limoroyal.com/online-reservations",
  },
  openGraph: {
    title: "Book Your Ride Online | Limo Royale Luxury Chauffeur Service",
    description: "Reserve your luxury limo or private tour with Limo Royale. Easy online booking for airport transfers, city tours, and more.",
    url: "https://limoroyal.com/online-reservations",
  },
  twitter: {
    title: "Book Your Ride Online | Limo Royale Luxury Chauffeur Service",
    description: "Reserve your luxury limo or private tour with Limo Royale. Easy online booking for airport transfers, city tours, and more.",
    url: "https://limoroyal.com/online-reservations",
  },
  other: {
    "DC.title": "Book Your Ride Online | Limo Royale Luxury Chauffeur Service",
    "hreflang": "en-ca",
    "alternate": "https://limoroyal.com/online-reservations"
  }
};


import OnlineReservations from './OnlineReservations';

const page = () => {
  return (
    <OnlineReservations />
  )
}

export default page