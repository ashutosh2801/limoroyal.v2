"use client";

import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import { Autoplay } from 'swiper/modules'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';

const CustomerExperiences = () => {
    const swiperRef = useRef(null);
    const testimonials = [
        {
            title: 'Amazing Birthday Celebration',
            review: 'I rented a limo for my birthday and had a blast! The vehicle was luxurious, the driver was friendly, and it made the day unforgettable. Highly recommend!',
            name: 'Madison Edwar, Chicago',
        },
        {
            title: 'Perfect Wedding Ride',
            review: 'We rented a limo for our wedding and it was flawless. The vehicle was immaculate, the chauffeur was professional, and the service was top-notch. It truly added to our special day!',
            name: 'Eloin Malone , Chicago',
        },
        {
            title: 'Reliable Corporate Service',
            review: 'For our business events, this service is always dependable. The limos are clean, the drivers are polite, and everything runs smoothly. A great choice for corporate transportation.',
            name: 'Gloria Foles  , Chicago',
        },
    ];

    return (
        <div className='pt-10' data-aos="fade-up">
            <div className='container mx-auto px-2'>
                <div className='pb-5'>
                    <h2 className='text-white text-2xl lg:text-4xl mb-5 lg:mb-5'>Customer Past Experiences</h2>
                </div>

                <div
                    onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
                    onMouseLeave={() => swiperRef.current?.autoplay?.start()}
                >
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{ delay: 2500, disableOnInteraction: false }}
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 1 },
                            1024: { slidesPerView: 2 },
                        }}
                    >
                        {testimonials.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className='bg-[#0a0a0a] p-10 lg:min-h-[350px]'>
                                    <div>
                                        <h5 className='text-white text-xl font-semibold'>{item.title}</h5>

                                        <div className="flex space-x-1 webColor mt-5 text-sm">
                                            {[...Array(4)].map((_, i) => (
                                                <FontAwesomeIcon icon={solidStar} key={i} />
                                            ))}
                                        </div>

                                        <p className='webFontColor text-base leading-relaxed mt-5 w-full block'>
                                            {item.review}
                                        </p>

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

export default CustomerExperiences;
