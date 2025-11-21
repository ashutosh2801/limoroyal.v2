'use client'

import React, { useRef, useState } from 'react'
import { PlayIcon } from '@heroicons/react/24/solid'
import Image from 'next/image';
import Thumbnail from '../../public/assets/testimonial/1.jpg' 
import Thumbnail2 from '../../public/assets/testimonial/2.jpg'
import Thumbnail3 from '../../public/assets/testimonial/3.jpg'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import { Autoplay } from 'swiper/modules'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';

const Testimonials = () => {
    const [playingIndexes, setPlayingIndexes] = useState({}) // use object or array

    const handlePlay = (index) => {
        setPlayingIndexes((prev) => ({ ...prev, [index]: true }))
    }

    const swiperRef = useRef(null);
    const testimonials = [
        {
            videoId: 'JpU9oEyNw_s',
            thumbnail: Thumbnail,
            title: 'Clean & Comfortable',
            review: 'Impeccable service! The vehicle was spotless, and it felt like stepping into pure luxury. Every detail was thought through, making my ride with Limo Royale a truly memorable experience.',
            name: 'Emily R.',
        },
        {
            videoId: 'mkKhW8QzsO4',
            thumbnail: Thumbnail2,
            title: 'Best Price Assured',
            review: 'From the moment I entered the limo, I knew I was in for something special. The car was in pristine condition, and the attention to detail was impeccable. Limo Royale truly exceeded my expectations!',
            name: 'Jonathan M.',
        },
        {
            videoId: 'JpU9oEyNw_s',
            thumbnail: Thumbnail3,
            title: 'Smooth Car Transport',
            review: 'Limo Royale never disappoints! The vehicle was beyond immaculate, and the professional team made sure every aspect of the ride was perfect. It’s always a five-star experience!',
            name: 'Sarah K.',
        },
    ]
  return (
    <div className='py-15'>
        <div className='container mx-auto px-2'>
            <div className='pb-5 text-center'>
                <small className='webColor uppercase'>Testimonials</small>
                <h2 className='text-white text-2xl lg:text-4xl leading-snug my-2 font-medium' data-aos="fade-up">Unmatched Luxury, Always New</h2>
            </div>
            <div
            onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
            onMouseLeave={() => swiperRef.current?.autoplay?.start()}
            >
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={35}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 2 },
                    }}
                >
                    {testimonials.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className='lg:border-r webBorderColor lg:pr-8 py-10'>
                                <div className='relative' data-aos="fade-up">
                                    {!playingIndexes[index] ? (
                                        <div onClick={() => handlePlay(index)} className="relative cursor-pointer">
                                            <Image
                                                src={item.thumbnail}
                                                className="w-full h-64 md:h-90 object-cover rounded-lg"
                                                alt="Experience the Journey with Limo Royale"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className='rounded-full border border-white p-5'>
                                                    <PlayIcon className="w-12 h-12 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative aspect-video rounded-lg overflow-hidden">
                                            <iframe
                                                className="w-full h-64 md:h-90"
                                                src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&mute=1`}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                referrerPolicy="strict-origin-when-cross-origin"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h5 className='text-white text-xl font-semibold mt-5'>{item.title}</h5>
                                    <div className="flex space-x-1 webColor mt-5 text-sm">
                                        {[...Array(4)].map((_, i) => (
                                            <FontAwesomeIcon icon={solidStar} key={i} />
                                        ))}
                                    </div>
                                    <p className='webFontColor text-base leading-relaxed mt-5 w-full block'>{item.review}</p>
                                    <small className='webColor mt-8 text-sm w-full block'>- {item.name}</small>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    </div>
  )
}

export default Testimonials