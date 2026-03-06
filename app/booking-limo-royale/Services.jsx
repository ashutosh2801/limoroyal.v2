'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import service1 from '../../public/assets/services/1.jpg'
import service2 from '../../public/assets/services/2.jpg'
import service3 from '../../public/assets/services/3.jpg'
import service4 from '../../public/assets/services/4.jpg'
import service5 from '../../public/assets/services/5.jpg'
import service6 from '../../public/assets/services/6.jpg'
import service7 from '../../public/assets/services/7.jpg'
import service8 from '../../public/assets/services/8.jpg'
import service9 from '../../public/assets/services/9.jpg'
import service10 from '../../public/assets/services/10.jpg'
import service11 from '../../public/assets/services/11.jpg'
import service12 from '../../public/assets/services/12.jpg'

const services = [
//   {
//     title: "Point to Point Service",
//     description:
//       "Direct luxury transportation between two locations with professional chauffeurs, timely arrivals, premium vehicles, and seamless booking for stress free travel.",
//     image: service1,
//   },
  {
    title: "Corporate Limo Service",
    description:
      "Professional corporate transportation for executives, meetings, conferences, and business travel with punctual chauffeurs, luxury fleet, and reliable scheduling support.",
    image: service1,
  },
  {
    title: "Executive Car Hire",
    description:
      "Premium executive car service offering discreet chauffeurs, high end sedans and SUVs, ensuring comfort, privacy, and sophistication for business travel",
    image: service2,
  },
  {
    title: "Casino Limo Service",
    description:
      "Luxury transportation for casino nights and VIP outings with professional chauffeurs, stylish vehicles, and smooth, punctual service for an unforgettable experience.",
    image: service3,
  },
  {
    title: "Airport Transfers",
    description:
      "Reliable airport pickup and drop off service with flight tracking, meet and greet options, luxury vehicles, and guaranteed on time arrivals.",
    image: service4,
  },
  {
    title: "Wedding Cars",
    description:
      "Elegant wedding transportation with luxury vehicles, professional chauffeurs, decorated options, and seamless coordination for your special day celebrations.",
    image: service5,
  },
  {
    title: "Ladies Night Out Limo Service",
    description:
      "Safe and stylish transportation for ladies night out with luxury limousines, professional drivers, and unforgettable experiences across the city.",
    image: service6,
  },
  {
    title: "Events",
    description:
      "Luxury transportation for concerts, sporting events, private parties, and special occasions with punctual service and premium comfort guaranteed.",
    image: service7,
  },
  {
    title: "Airport Meet and Greet Services",
    description:
      "Personalized airport pickup with flight tracking, terminal greeting, luggage assistance, and seamless transfer to your luxury vehicle",
    image: service8,
  },
  {
    title: "Promotions",
    description:
      "Luxury transportation for promotional events, corporate marketing campaigns, and brand activations with professional drivers and impressive vehicles.",
    image: service9,
  },
  {
    title: "Birthdays, Bachelor & Bachelorette Limo Service",
    description:
      "Celebrate birthdays, bachelor, and bachelorette parties with luxury limousines, party buses, professional chauffeurs, and unforgettable VIP experiences.",
    image: service10,
  },
  {
    title: "Long Distance Limo Service",
    description:
      "Comfortable long distance limousine service with experienced chauffeurs, luxury seating, smooth rides, and reliable scheduling for extended travel.",
    image: service11,
  },
  {
    title: "Luxury Chauffeuring Services",
    description:
      "Discreet, professional chauffeurs and high-end vehicles delivering refined, comfortable transportation for business or private travel",
    image: service12,
  },
]

export default function Services() {
  return (
    <section id='services' className="py-5">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="text-center mb-7 mt-7 md:mt-0">
          <h1 className="text-white text-2xl lg:text-3xl font-medium mb-5">
            Our Premium Services
          </h1>
          <p className="text-base leading-relaxed webFontColor">
            Experience world-class luxury transportation tailored to every occasion.
            From executive travel to unforgettable celebrations,<br></br> Limo Royale
            delivers precision, comfort, and royal treatment every time.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#0a0a0a] rounded-xl overflow-hidden text-center border border-[#1f1f1f] hover:border-[#333] transition duration-500 group"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  className="w-full h-55 object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition duration-500"></div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-white text-lg font-semibold mt-3 mb-4 group-hover:text-[#bb9a4b] transition md:min-h-[60px]">
                  {service.title}
                </h3>

                <p className="webFontColor leading-relaxed text-sm mb-6 min-h-[115px]">
                  {service.description}
                </p>

                <Link
                  href="/booking-limo-royale#quote"
                  className="inline-block text-sm uppercase tracking-wide text-[#bb9a4b] transition"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  )
}