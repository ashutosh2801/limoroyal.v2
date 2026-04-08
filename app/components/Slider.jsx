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
            className="w-full h-[300px] md:h-[500px] lg:h-[600px] xl:h-[700px]"
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index} className='bg-black relative'>
                    <div className="relative w-full h-70 md:h-120 lg:h-150 xl:h-180 main-slider">
                        <Image
                            src={slide.image}
                            alt={`Slide ${index + 1}`}
                            fill
                            className="object-cover object-center"
                            priority
                        />
                    </div>
                    <div className="absolute top-20 md:top-40 inset-0 flex flex-col items-start justify-center text-white text-left px-5 lg:px-10">
                        <h2 className="text-2xl md:text-5xl lg:text-6xl xl:text-7xl font-medium mb-2 text-white leading-tight">
                            Where Luxury <br /> Meets the Road
                        </h2>
                        <a
                            href='/booking'
                            title='Book Now from Limo Royale'
                            className='inline-block book-now-slide text-sm px-4 py-2 md:px-9 md:py-4 mt-2 uppercase'
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
