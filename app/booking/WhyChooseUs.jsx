'use client'
import React from 'react'
import { ShieldCheck, Car, Clock, DollarSign, Headphones, BadgeCheck } from 'lucide-react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const benefits = [
  {
    title: "Professional Chauffeurs",
    description:
      "Highly trained, background checked drivers delivering safe, punctual, and courteous service for every ride and occasion.",
    icon: ShieldCheck,
  },
  {
    title: "Luxury Modern Fleet",
    description:
      "Premium sedans, SUVs, and limousines maintained to highest standards for comfort, safety, and exceptional style.",
    icon: Car,
  },
  {
    title: "On Time Guarantee",
    description:
      "We prioritize punctual pickups and timely arrivals ensuring reliable transportation without delays or unexpected disruptions.",
    icon: Clock,
  },
  {
    title: "Transparent Pricing",
    description:
      "Upfront competitive rates with no hidden charges providing clear pricing and complete confidence before booking.",
    icon: DollarSign,
  },
  {
    title: "24/7 Customer Support",
    description:
      "Round the clock support team assisting bookings, schedule changes, and special requests anytime needed.",
    icon: Headphones,
  },
  {
    title: "Fully Licensed & Insured",
    description:
      "Completely licensed and insured services ensuring legal compliance, passenger safety, and professional accountability always.",
    icon: BadgeCheck,
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-15 bg-[#0a0a0a]">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-white text-2xl lg:text-3xl font-medium mb-5">
            Why Choose Us
          </h2>
          <p className="text-base leading-relaxed webFontColor max-w-3xl mx-auto">
            Experience unmatched professionalism, reliability, and luxury.
            Limo Royale is committed to delivering exceptional transportation
            solutions tailored to your comfort and expectations.
          </p>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {benefits.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="bg-[#111] rounded-xl p-8 text-center border border-[#1f1f1f] 
                hover:border-[#333] transition duration-500 group h-full"
              >
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#1a1a1a] flex items-center justify-center 
                  group-hover:bg-[#bb9a4b] transition duration-500">
                    <item.icon
                      size={28}
                      className="text-[#bb9a4b] group-hover:text-black transition duration-500"
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-white text-lg font-semibold mb-4 group-hover:text-[#bb9a4b] transition">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="webFontColor text-sm leading-relaxed min-h-[110px]">
                  {item.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  )
}