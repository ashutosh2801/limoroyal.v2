'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { Star } from 'lucide-react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const reviews = [
  {
    name: "Michael Anderson",
    role: "Corporate Client",
    review:
      "Outstanding service from start to finish. The chauffeur was punctual, professional, and the vehicle was immaculate.",
  },
  {
    name: "Sophia Martinez",
    role: "Wedding Client",
    review:
      "Absolutely amazing experience on our wedding day. The car was elegant, the driver was courteous, and everything ran perfectly on schedule.",
  },
  {
    name: "David Thompson",
    role: "Airport Transfer",
    review:
      "Reliable airport pickup with real-time flight tracking. Smooth ride, luxury comfort, and zero delays. I will definitely book again.",
  },
  {
    name: "Jessica Lee",
    role: "Event Client",
    review:
      "We booked for a special event and the experience was phenomenal. Clean vehicle, professional chauffeur, and seamless booking process.",
  },
  {
    name: "Daniel Roberts",
    role: "Private Client",
    review:
      "Luxury, comfort, and professionalism at its best. Transparent pricing and exceptional service every time we book.",
  },
]

export default function Reviews() {
  return (
    <section id='reviews' className="pb-15 bg-[#0a0a0a]">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-white text-2xl lg:text-3xl font-medium mb-5">
            What Our Clients Say
          </h2>
          <p className="text-base leading-relaxed webFontColor max-w-3xl mx-auto">
            Trusted by corporate executives, wedding clients, and travelers across the city.
            Experience why Limo Royale is the preferred choice for luxury transportation.
          </p>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-[#111] rounded-xl p-8 border border-[#1f1f1f] hover:border-[#333] transition duration-500 h-full flex flex-col">

                {/* Stars */}
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="text-[#bb9a4b] fill-[#bb9a4b] mr-1"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="webFontColor text-sm leading-relaxed mb-6 flex-grow">
                  "{item.review}"
                </p>

                {/* Client Info */}
                <div className="border-t border-[#222] pt-4">
                  <h4 className="text-white font-semibold text-sm">
                    {item.name}
                  </h4>
                  <p className="text-[#bb9a4b] text-xs mt-1">
                    {item.role}
                  </p>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  )
}