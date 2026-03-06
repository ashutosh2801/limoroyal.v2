export const metadata = {
  title: "Luxury Bus Charter & Group Travel | Limo Royale",
  description:
    "Travel in style with Limo Royale’s luxury bus charters. Corporate, private, or sports groups enjoy spacious fleet, expert chauffeurs, and seamless rides.",
  keywords:
    "Bus Charter Service Toronto, Luxury Bus Charter & Group Travel",
  alternates: {
    canonical: "https://limoroyal.com/bus-charter",
    languages: {
      "en-ca": "https://limoroyal.com/bus-charter",
    },
  },
  robots: "index, follow",
  openGraph: {
    title: "Luxury Bus Charter & Group Travel | Limo Royale",
    description:
      "Travel in style with Limo Royale’s luxury bus charters. Corporate, private, or sports groups enjoy spacious fleet, expert chauffeurs, and seamless rides.",
    url: "https://limoroyal.com/bus-charter",
  },
  twitter: {
    title: "Luxury Bus Charter & Group Travel | Limo Royale",
    description:
      "Travel in style with Limo Royale’s luxury bus charters. Corporate, private, or sports groups enjoy spacious fleet, expert chauffeurs, and seamless rides.",
    card: "summary_large_image",
  },
  other: {
    "twitter:url": "https://limoroyal.com/bus-charter",
    "DC.title": "Luxury Bus Charter & Group Travel | Limo Royale",
  },
};


import BusCharter from "./BusCharter";

const page = () => {
  return (
    <BusCharter />
  )
}

export default page