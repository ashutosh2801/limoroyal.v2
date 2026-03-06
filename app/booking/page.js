export const metadata = {
  title: "Book Now | Limo Royale",
  description:
    "Travel in style with Limo Royale’s luxury bus charters. Corporate, private, or sports groups enjoy spacious fleet, expert chauffeurs, and seamless rides.",
  keywords:
    "Bus Charter Service Toronto, Luxury Bus Charter & Group Travel",
  alternates: {
    canonical: "https://limoroyal.com/booknow",
    languages: {
      "en-ca": "https://limoroyal.com/booknow",
    },
  },
  images: ["https://limoroyal.com/_next/static/media/limo-royal.00028e7b.png"],
  robots: "index, follow",
  openGraph: {
    title: "Book Now | Limo Royale",
    description:
      "Travel in style with Limo Royale’s luxury bus charters. Corporate, private, or sports groups enjoy spacious fleet, expert chauffeurs, and seamless rides.",
    url: "https://limoroyal.com/booknow",
    images: [
      {
        url: "https://limoroyal.com/_next/static/media/limo-royal.00028e7b.png",
        width: 751,
        height: 323,
        alt: "Book Now",
      },
    ],
    type: "website",
  },
  twitter: {
    title: "Book Now | Limo Royale",
    description:
      "Travel in style with Limo Royale’s luxury bus charters. Corporate, private, or sports groups enjoy spacious fleet, expert chauffeurs, and seamless rides.",
    card: "summary_large_image",
    images: ["https://limoroyal.com/_next/static/media/limo-royal.00028e7b.png"],
  },
  other: {
    "twitter:url": "https://limoroyal.com/booknow",
    "DC.title": "Book Now | Limo Royale",
  },
};


import Search from '../components/Search'
import Slider from '../components/Slider'

export default function Booknow() {

    return (
    <main>        
        <div className='relative'>
            <Slider />
            <Search /> 
        </div>
    </main>
    )
}