import Navigation from './Navigation'
import Hero from './Hero'
import Search from '../components/Search'
import Services from './Services'
import Fleet from './Fleet'
import WhyChooseUs from './WhyChooseUs';
import Reviews from "./Reviews"
import LocalAuthority from './LocalAuthority'
import Faq from './Faq'
import Cta from './Cta'
import Footer from './Footer'

export const metadata = {
  title: "Book Now | Limo Royale",
  description:
    "Travel in style with Limo Royale’s luxury bus charters. Corporate, private, or sports groups enjoy spacious fleet, expert chauffeurs, and seamless rides.",
  keywords:
    "Bus Charter Service Toronto, Luxury Bus Charter & Group Travel",
  alternates: {
    canonical: "https://limoroyal.com/booking-limo-royale",
    languages: {
      "en-ca": "https://limoroyal.com/booking-limo-royale",
    },
  },
  images: ["https://limoroyal.com/_next/static/media/limo-royal.00028e7b.png"],
  robots: "index, follow",
  openGraph: {
    title: "Book Now | Limo Royale",
    description:
      "Travel in style with Limo Royale’s luxury bus charters. Corporate, private, or sports groups enjoy spacious fleet, expert chauffeurs, and seamless rides.",
    url: "https://limoroyal.com/booking-limo-royale",
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
    "twitter:url": "https://limoroyal.com/booking-limo-royale",
    "DC.title": "Book Now | Limo Royale",
  },
};

export default function Limo() {

    return (
    <main>        
        <div className='relative'>
            <Navigation />
            <Hero />
            <Search /> 
            <Services />
            <Fleet />
            <WhyChooseUs />
            <Reviews />
            <LocalAuthority />
            <Faq />
            <Cta />
            <Footer />
        </div>
    </main>
    )
}