'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import { Autoplay, EffectFade } from 'swiper/modules'
import Image from 'next/image'
import slider1 from '../../public/assets/slides/1.jpg'
import slider2 from '../../public/assets/slides/2.jpg'
import slider3 from '../../public/assets/slides/3.png'

const Slider = () => {
    const slides = [
        { image: slider1 },
        { image: slider2 },
        { image: slider3 },
    ]

    return (
        <Swiper
            modules={[Autoplay, EffectFade]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            loop={true}
            effect="fade"
            navigation={false}
            speed={1000}
            className="w-full h-[500px] md:h-[550px] lg:h-[700px]"
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index} className='bg-black relative'>
                    <div className="relative w-full h-180 main-slider">
                        <Image
                            src={slide.image}
                            alt={`Slide ${index + 1}`}
                            fill
                            className="object-cover object-center"
                            priority
                        />
                    </div>
                    <div className="absolute top-40 inset-0 flex flex-col items-start justify-center text-white text-left px-5 lg:px-10">
                        <h2 className="text-5xl md:text-5xl lg:text-7xl font-medium mb-2 text-white leading-tight">
                            Where Luxury <br /> Meets the Road
                        </h2>
                        <a
                            href='/online-reservations'
                            title='Book Now from Limo Royale'
                            className='inline-block book-now-slide text-sm px-9 py-4 mt-2 uppercase'
                        >
                            Book Now
                        </a>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default Slider
