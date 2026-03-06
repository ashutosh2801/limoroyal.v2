'use client'
import React from 'react'
import Link from 'next/link'
import Search from '../components/Search'

export default function Cta() {
  return (
    <section className="py-10 bg-[#0a0a0a] relative overflow-hidden">
      <div className="container mx-auto px-4">
        
        <div className="grid lg:grid-cols-2 md:gap-12 items-center">
          
          {/* LEFT SIDE - CTA CONTENT */}
          <div className="text-center lg:text-left">
            
            <p className="text-[#bb9a4b] uppercase tracking-[3px] text-xs mb-6">
              Book Your Ride Today
            </p>

            <h2 className="text-white text-3xl md:text-4xl font-medium leading-tight mb-6">
              Luxury Transportation Made Simple
            </h2>

            <p className="webFontColor text-base leading-relaxed mb-10 max-w-xl">
              Book your ride in minutes. Professional chauffeurs, premium vehicles,
              and guaranteed on-time service for every occasion.
            </p>

            <Link
              href="tel:+14167255466"
              className="inline-block webBG text-white font-semibold px-8 py-4 rounded-full transition duration-300 text-base uppercase tracking-wide hover:opacity-90"
            >
              CALL (416) 725-5466
            </Link>
          </div>

          {/* RIGHT SIDE - BOOKING FORM */}
          <div className="cta-bk-form relative">
            <h3 className="text-white text-xl md:text-xl font-semibold mb-2 mt-15 md:mt-0 text-center">
              NEED A LUXURY RIDE FOR YOUR NEXT EVENT?
            </h3>

            <p className="text-gray-300 text-center">
              Get an instant quote now
            </p>
            <Search />
          </div>

        </div>
      </div>

      {/* Subtle Gold Divider Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#bb9a4b] to-transparent opacity-40"></div>
    </section>
  )
}