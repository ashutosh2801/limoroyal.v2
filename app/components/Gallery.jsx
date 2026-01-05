'use client'

import React, { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const images = [
  '/assets/gallery/1.jpg',
  '/assets/gallery/2.jpg',
  '/assets/gallery/3.jpg',
  '/assets/gallery/4.jpg',
  '/assets/gallery/5.jpg',
  '/assets/gallery/6.jpg',
];

const Gallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <div className="bg-[#0a0a0a] py-5">
      <div className="container mx-auto px-2">

        {/* Heading */}
        <div data-aos="fade-up">
          <h2 className="text-white text-2xl lg:text-4xl leading-snug mb-5 font-medium">
            Ride Smooth, Ride First-Class
          </h2>

          <p className="text-base leading-relaxed webFontColor mb-5">
            At Limo Royale, we set the standard for luxury travel. Every vehicle in our fleet is brand new and never more than two years old—including models like the BMW XM and BMW M340i. This means you’ll always experience the latest in comfort, technology, and style.
          </p>
        </div>

        {/* ================= MOBILE VIEW (SLIDER) ================= */}
        <div className="block md:hidden" data-aos="fade-up">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={12}
            slidesPerView={1.1}
            className="gallery-swiper"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <div
                  className="relative h-72 cursor-pointer"
                  onClick={() => {
                    setIsOpen(true);
                    setPhotoIndex(index);
                  }}
                >
                  <Image
                    src={src}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ================= DESKTOP VIEW (GRID) ================= */}
        <div className="hidden md:grid grid-cols-3 gap-3">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative h-72 lg:h-96 cursor-pointer"
              data-aos="fade-up"
              onClick={() => {
                setIsOpen(true);
                setPhotoIndex(index);
              }}
            >
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="relative mt-5 text-center" data-aos="fade-up">
          <a
            href="/online-reservations"
            title="Book Luxury Fleet Canada"
            className="inline-block view-more-btn text-sm px-10 py-5 uppercase"
          >
            book our fleet today
          </a>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        index={photoIndex}
        slides={images.map((src) => ({ src }))}
        on={{ view: ({ index }) => setPhotoIndex(index) }}
      />
    </div>
  );
};

export default Gallery;
