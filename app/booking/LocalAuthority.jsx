'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import area1 from '../../public/assets/areas-served/niagara-falls.jpg'
import area2 from '../../public/assets/areas-served/london-ontario.jpg'
import area3 from '../../public/assets/areas-served/kitchener.jpg'
import area4 from '../../public/assets/areas-served/hamilton.jpg'
import area5 from '../../public/assets/areas-served/kingston.jpg'
import area6 from '../../public/assets/areas-served/ottawa.jpg'
import area7 from '../../public/assets/areas-served/windsor.jpg'

const routes = [
  { title: "Toronto ⇄ Niagara Falls", image: area1 },
  { title: "Toronto ⇄ London Ontario", image: area2 },
  { title: "Toronto ⇄ Kitchener", image: area3 },
  { title: "Toronto ⇄ Hamilton", image: area4 },
  { title: "Toronto ⇄ Kingston", image: area5 },
  { title: "Toronto ⇄ Ottawa", image: area6 },
  { title: "Toronto ⇄ Windsor", image: area7 },
]

export default function LocalAuthority() {
  return (
    <section className="py-15">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-white text-2xl lg:text-3xl font-medium mb-5">
            Our Service Areas
          </h2>
          <p className="text-base leading-relaxed webFontColor max-w-2xl mx-auto">
            Providing premium luxury transportation across major destinations.
            Travel in comfort, arrive in style, and experience true professionalism.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {routes.map((route, index) => (
            <Link
              href="/booking#quote"
              key={index}
              className="group"
            >
              <div className="bg-[#111] rounded-xl overflow-hidden border border-[#1f1f1f] hover:border-[#333] transition duration-500">

                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={route.image}
                    alt={route.title}
                    fill
                    className="w-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition duration-500"></div>
                </div>

                {/* Title */}
                <div className="py-4 text-center bg-[#111]">
                  <h3 className="text-white text-sm lg:text-base font-medium group-hover:text-[#bb9a4b] transition">
                    {route.title}
                  </h3>
                </div>

              </div>
            </Link>
          ))}

        </div>

      </div>
    </section>
  )
}