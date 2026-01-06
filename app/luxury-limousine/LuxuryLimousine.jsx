'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import "swiper/css/pagination";
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'

const LuxuryLimousine = () => {
  return (
    <main>
        <div>
            <div className='relative'>
                <div className='page-bg object-cover absolute h-[450px] lg:h-[550px] inset-0 opacity-50'></div>
                <div className='relative z-10 pt-50 lg:pt-80 pb-30'>
                    <div className='container mx-auto px-2'>
                        <div>
                            <ul className='breadcrumb uppercase webColor text-sm flex'>
                                <li><a href='/'>Home</a></li>
                                <li>Luxury Limousine</li>
                            </ul>
                        </div>
                        <h2 className='text-white text-2xl lg:text-6xl leading-snug my-5 font-medium'>Luxury Limousine</h2>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div className='container mx-auto px-2'>
                <div className='pt-20 lg:pt-5 pb-5'>
                    <h1 className='text-white text-2xl lg:text-4xl mb-5 lg:mb-0 font-medium'>Luxury Limousine Services</h1>
                </div>
                <div>
                    <p className='webFontColor text-base leading-relaxed'>Experience elegance and sophistication with our premium luxury limousine services. Whether you’re attending a wedding, corporate event, or special occasion, our fleet of high-end limousines ensures a stylish and comfortable ride. We take pride in delivering exceptional customer service, with professional chauffeurs dedicated to making your journey memorable. Offering a range of modern amenities and attention to detail, our services guarantee both luxury and convenience. Trust us to elevate your travel experience to the next level of comfort and class.</p>
                </div>
            </div>
        </div>
        
        <div className='hidden md:block'>
            <div className='container mx-auto px-2'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-8'>
                    <div className='bg-[#0a0a0a] p-5 md:p-10' data-aos="fade-up">
                        <b className='bg-black p-5 text-white text-xl inline-block'>01</b>
                        <h4 className='text-white text-xl lg:text-2xl my-5'>Airport Transfers</h4>
                        <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Convenient, luxurious transfers to and from major airports.</p>
                        <a href='/online-reservations' title='Airport Transfers in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                    </div>
                    <div className='bg-[#0a0a0a] p-5 md:p-10' data-aos="fade-up">
                        <b className='bg-black p-5 text-white text-xl inline-block'>02</b>
                        <h4 className='text-white text-xl lg:text-2xl my-5'>Corporate Travel</h4>
                        <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Premium chauffeured transport for business executives.</p>
                        <a href='/online-reservations' title='Corporate Travel in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                    </div>
                    <div className='bg-[#0a0a0a] p-5 md:p-10' data-aos="fade-up">
                        <b className='bg-black p-5 text-white text-xl inline-block'>03</b>
                        <h4 className='text-white text-xl lg:text-2xl my-5'>Wedding Limousine</h4>
                        <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Stylish and elegant limousines for weddings.</p>
                        <a href='/online-reservations' title='Wedding Limousine in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                    </div>
                    <div className='bg-[#0a0a0a] p-5 md:p-10' data-aos="fade-up">
                        <b className='bg-black p-5 text-white text-xl inline-block'>04</b>
                        <h4 className='text-white text-xl lg:text-2xl my-5'>Prom Limo</h4>
                        <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Special limo rentals for prom nights.</p>
                        <a href='/online-reservations' title='Prom Limo in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                    </div>
                    <div className='bg-[#0a0a0a] p-5 md:p-10' data-aos="fade-up">
                        <b className='bg-black p-5 text-white text-xl inline-block'>05</b>
                        <h4 className='text-white text-xl lg:text-2xl my-5'>Special Events Limousine</h4>
                        <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Services for birthdays, anniversaries, and other special occasions.</p>
                        <a href='/online-reservations' title='Special Events Limousine in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                    </div>
                    <div className='bg-[#0a0a0a] p-5 md:p-10' data-aos="fade-up">
                        <b className='bg-black p-5 text-white text-xl inline-block'>06</b>
                        <h4 className='text-white text-xl lg:text-2xl my-5'>Night Out Limousine</h4>
                        <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Safe, luxurious travel for parties, concerts, or evening events.</p>
                        <a href='/online-reservations' title='Night Out Limousine in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                    </div>
                    <div className='bg-[#0a0a0a] p-5 md:p-10' data-aos="fade-up">
                        <b className='bg-black p-5 text-white text-xl inline-block'>07</b>
                        <h4 className='text-white text-xl lg:text-2xl my-5'>Casino Trips</h4>
                        <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Comfortable transportation to and from casinos.</p>
                        <a href='/online-reservations' title='Casino Trips in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                    </div>
                    <div className='bg-[#0a0a0a] p-5 md:p-10' data-aos="fade-up">
                        <b className='bg-black p-5 text-white text-xl inline-block'>08</b>
                        <h4 className='text-white text-xl lg:text-2xl my-5'>Wine Tours</h4>
                        <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Luxury limos for wine tasting and vineyard tours.</p>
                        <a href='/online-reservations' title='Wine Tours in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                    </div>
                    <div className='bg-[#0a0a0a] p-5 md:p-10' data-aos="fade-up">
                        <b className='bg-black p-5 text-white text-xl inline-block'>09</b>
                        <h4 className='text-white text-xl lg:text-2xl my-5'>VIP Limousine</h4>
                        <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Exclusive transportation for VIP clients.</p>
                        <a href='/online-reservations' title='VIP Limousine in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                    </div>
                    <div className='bg-[#0a0a0a] p-5 md:p-10' data-aos="fade-up">
                        <b className='bg-black p-5 text-white text-xl inline-block'>10</b>
                        <h4 className='text-white text-xl lg:text-2xl my-5'>City Tours</h4>
                        <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Premium limousine tours around the city.</p>
                        <a href='/online-reservations' title='City Tours in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                    </div>
                    <div className='bg-[#0a0a0a] p-5 md:p-10' data-aos="fade-up">
                        <b className='bg-black p-5 text-white text-xl inline-block'>11</b>
                        <h4 className='text-white text-xl lg:text-2xl my-5'>Concert and Event Transportation</h4>
                        <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Limousine services for special events like concerts or sports games.</p>
                        <a href='/online-reservations' title='Concert and Event Transportation in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                    </div>
                    <div className='bg-[#0a0a0a] p-5 md:p-10' data-aos="fade-up">
                        <b className='bg-black p-5 text-white text-xl inline-block'>12</b>
                        <h4 className='text-white text-xl lg:text-2xl my-5'>Funeral Limousine Services</h4>
                        <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Discreet and respectful transportation for funerals.</p>
                        <a href='/online-reservations' title='Funeral Limousine Services in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                    </div>
                </div>
            </div>
        </div>
        {/* MOBILE ONLY */}
        <div className='block md:hidden'>
            <div className='container mx-auto px-2'>
                <div className='my-8'>
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={40}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        className="gallery-swiper"
                        loop={true}
                        autoplay={{ delay: 3500, disableOnInteraction: false }}
                        breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 3 },
                        1200: { slidesPerView: 3 }
                        }}
                    >
                        <SwiperSlide>
                        <div className='bg-[#0a0a0a] p-5 md:p-10 h-[350px]' data-aos="fade-up">
                            <b className='bg-black p-5 text-white text-xl inline-block'>01</b>
                            <h4 className='text-white text-xl lg:text-2xl my-5'>Airport Transfers</h4>
                            <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Convenient, luxurious transfers to and from major airports.</p>
                            <a href='/online-reservations' title='Airport Transfers in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div className='bg-[#0a0a0a] p-5 md:p-10 h-[350px]' data-aos="fade-up">
                            <b className='bg-black p-5 text-white text-xl inline-block'>02</b>
                            <h4 className='text-white text-xl lg:text-2xl my-5'>Corporate Travel</h4>
                            <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Premium chauffeured transport for business executives.</p>
                            <a href='/online-reservations' title='Corporate Travel in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div className='bg-[#0a0a0a] p-5 md:p-10 h-[350px]' data-aos="fade-up">
                            <b className='bg-black p-5 text-white text-xl inline-block'>03</b>
                            <h4 className='text-white text-xl lg:text-2xl my-5'>Wedding Limousine</h4>
                            <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Stylish and elegant limousines for weddings.</p>
                            <a href='/online-reservations' title='Wedding Limousine in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div className='bg-[#0a0a0a] p-5 md:p-10 h-[350px]' data-aos="fade-up">
                            <b className='bg-black p-5 text-white text-xl inline-block'>04</b>
                            <h4 className='text-white text-xl lg:text-2xl my-5'>Prom Limo</h4>
                            <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Special limo rentals for prom nights.</p>
                            <a href='/online-reservations' title='Prom Limo in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div className='bg-[#0a0a0a] p-5 md:p-10 h-[350px]' data-aos="fade-up">
                            <b className='bg-black p-5 text-white text-xl inline-block'>05</b>
                            <h4 className='text-white text-xl lg:text-2xl my-5'>Special Events Limousine</h4>
                            <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Services for birthdays, anniversaries, and other special occasions.</p>
                            <a href='/online-reservations' title='Special Events Limousine in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div className='bg-[#0a0a0a] p-5 md:p-10 h-[350px]' data-aos="fade-up">
                            <b className='bg-black p-5 text-white text-xl inline-block'>06</b>
                            <h4 className='text-white text-xl lg:text-2xl my-5'>Night Out Limousine</h4>
                            <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Safe, luxurious travel for parties, concerts, or evening events.</p>
                            <a href='/online-reservations' title='Night Out Limousine in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div className='bg-[#0a0a0a] p-5 md:p-10 h-[350px]' data-aos="fade-up">
                            <b className='bg-black p-5 text-white text-xl inline-block'>07</b>
                            <h4 className='text-white text-xl lg:text-2xl my-5'>Casino Trips</h4>
                            <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Comfortable transportation to and from casinos.</p>
                            <a href='/online-reservations' title='Casino Trips in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div className='bg-[#0a0a0a] p-5 md:p-10 h-[350px]' data-aos="fade-up">
                            <b className='bg-black p-5 text-white text-xl inline-block'>08</b>
                            <h4 className='text-white text-xl lg:text-2xl my-5'>Wine Tours</h4>
                            <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Luxury limos for wine tasting and vineyard tours.</p>
                            <a href='/online-reservations' title='Wine Tours in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div className='bg-[#0a0a0a] p-5 md:p-10 h-[350px]' data-aos="fade-up">
                            <b className='bg-black p-5 text-white text-xl inline-block'>09</b>
                            <h4 className='text-white text-xl lg:text-2xl my-5'>VIP Limousine</h4>
                            <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Exclusive transportation for VIP clients.</p>
                            <a href='/online-reservations' title='VIP Limousine in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div className='bg-[#0a0a0a] p-5 md:p-10 h-[350px]' data-aos="fade-up">
                            <b className='bg-black p-5 text-white text-xl inline-block'>10</b>
                            <h4 className='text-white text-xl lg:text-2xl my-5'>City Tours</h4>
                            <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Premium limousine tours around the city.</p>
                            <a href='/online-reservations' title='City Tours in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div className='bg-[#0a0a0a] p-5 md:p-10 h-[350px]' data-aos="fade-up">
                            <b className='bg-black p-5 text-white text-xl inline-block'>11</b>
                            <h4 className='text-white text-xl lg:text-2xl my-5'>Concert and Event Transportation</h4>
                            <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Limousine services for special events like concerts or sports games.</p>
                            <a href='/online-reservations' title='Concert and Event Transportation in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div className='bg-[#0a0a0a] p-5 md:p-10 h-[350px]' data-aos="fade-up">
                            <b className='bg-black p-5 text-white text-xl inline-block'>12</b>
                            <h4 className='text-white text-xl lg:text-2xl my-5'>Funeral Limousine Services</h4>
                            <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Discreet and respectful transportation for funerals.</p>
                            <a href='/online-reservations' title='Funeral Limousine Services in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                        </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>

        <div className='hidden md:block'>
            <div className='bg-[#0a0a0a] py-8'>
                <div className='container mx-auto px-2'>
                    <h3 className='text-white text-2xl lg:text-4xl mb-5 lg:mb-0 font-medium text-center'>Special Add-on Services</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10'>
                        <div className='bg-black p-5 md:p-10' data-aos="fade-up">
                            <b className='bg-[#0a0a0a] p-5 text-white text-xl inline-block'>01</b>
                            <h4 className='text-white text-xl lg:text-2xl my-5'>Meet and Greet Service</h4>
                            <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Personalized airport pick-up with professional greeters.</p>
                            <a href='/online-reservations' title='Meet and Greet Service in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                        </div>
                        <div className='bg-black p-5 md:p-10' data-aos="fade-up">
                            <b className='bg-[#0a0a0a] p-5 text-white text-xl inline-block'>02</b>
                            <h4 className='text-white text-xl lg:text-2xl my-5'>Baggage Assistance</h4>
                            <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Help with luggage handling for airport or hotel transfers.</p>
                            <a href='/online-reservations' title='Baggage Assistance in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                        </div>
                        <div className='bg-black p-5 md:p-10' data-aos="fade-up">
                            <b className='bg-[#0a0a0a] p-5 text-white text-xl inline-block'>03</b>
                            <h4 className='text-white text-xl lg:text-2xl my-5'>Custom Decorated Vehicles</h4>
                            <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Customized decorations for weddings, proms, and special events.</p>
                            <a href='/online-reservations' title='Custom Decorated Vehicles in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                        </div>
                        <div className='bg-black p-5 md:p-10' data-aos="fade-up">
                            <b className='bg-[#0a0a0a] p-5 text-white text-xl inline-block'>04</b>
                            <h4 className='text-white text-xl lg:text-2xl my-5'>On-Board Entertainment</h4>
                            <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Limos and buses with premium entertainment systems (TV, music, etc.).</p>
                            <a href='/online-reservations' title='On-Board Entertainment in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                        </div>
                        <div className='bg-black p-5 md:p-10' data-aos="fade-up">
                            <b className='bg-[#0a0a0a] p-5 text-white text-xl inline-block'>05</b>
                            <h4 className='text-white text-xl lg:text-2xl my-5'>Refreshments on Board</h4>
                            <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Complimentary drinks and snacks for clients.</p>
                            <a href='/online-reservations' title='Refreshments on Board in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                        </div>
                        <div className='bg-black p-5 md:p-10' data-aos="fade-up">
                            <b className='bg-[#0a0a0a] p-5 text-white text-xl inline-block'>06</b>
                            <h4 className='text-white text-xl lg:text-2xl my-5'>Child Seats Available</h4>
                            <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Offering child-friendly seating options.</p>
                            <a href='/online-reservations' title='Child Seats Available in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* MOBILE ONLY */}
        <div className='block md:hidden'>
            <div className='bg-[#0a0a0a] py-8'>
                <div className='container mx-auto px-2'>
                    <h3 className='text-white text-2xl lg:text-4xl mb-5 lg:mb-0 font-medium text-center'>Special Add-on Services</h3>
                    <div className='mt-10'>
                        <Swiper
                            modules={[Pagination]}
                            pagination={{ clickable: true }}
                            spaceBetween={40}
                            slidesPerView={1}
                            className="gallery-swiper"
                            loop={true}
                            autoplay={{ delay: 3500, disableOnInteraction: false }}
                            breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 3 }
                            }}
                        >
                            <SwiperSlide>
                                <div className='bg-black p-5 md:p-10 h-[350px]' data-aos="fade-up">
                                    <b className='bg-[#0a0a0a] p-5 text-white text-xl inline-block'>01</b>
                                    <h4 className='text-white text-xl lg:text-2xl my-5'>Meet and Greet Service</h4>
                                    <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Personalized airport pick-up with professional greeters.</p>
                                    <a href='/online-reservations' title='Meet and Greet Service in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='bg-black p-5 md:p-10 h-[350px]' data-aos="fade-up">
                                    <b className='bg-[#0a0a0a] p-5 text-white text-xl inline-block'>02</b>
                                    <h4 className='text-white text-xl lg:text-2xl my-5'>Baggage Assistance</h4>
                                    <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Help with luggage handling for airport or hotel transfers.</p>
                                    <a href='/online-reservations' title='Baggage Assistance in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='bg-black p-5 md:p-10 h-[350px]' data-aos="fade-up">
                                    <b className='bg-[#0a0a0a] p-5 text-white text-xl inline-block'>03</b>
                                    <h4 className='text-white text-xl lg:text-2xl my-5'>Custom Decorated Vehicles</h4>
                                    <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Customized decorations for weddings, proms, and special events.</p>
                                    <a href='/online-reservations' title='Custom Decorated Vehicles in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='bg-black p-5 md:p-10 h-[350px]' data-aos="fade-up">
                                    <b className='bg-[#0a0a0a] p-5 text-white text-xl inline-block'>04</b>
                                    <h4 className='text-white text-xl lg:text-2xl my-5'>On-Board Entertainment</h4>
                                    <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Limos and buses with premium entertainment systems (TV, music, etc.).</p>
                                    <a href='/online-reservations' title='On-Board Entertainment in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='bg-black p-5 md:p-10 h-[350px]' data-aos="fade-up">
                                    <b className='bg-[#0a0a0a] p-5 text-white text-xl inline-block'>05</b>
                                    <h4 className='text-white text-xl lg:text-2xl my-5'>Refreshments on Board</h4>
                                    <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Complimentary drinks and snacks for clients.</p>
                                    <a href='/online-reservations' title='Refreshments on Board in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='bg-black p-5 md:p-10 h-[350px]' data-aos="fade-up">
                                    <b className='bg-[#0a0a0a] p-5 text-white text-xl inline-block'>06</b>
                                    <h4 className='text-white text-xl lg:text-2xl my-5'>Child Seats Available</h4>
                                    <p className='text-base leading-relaxed webFontColor mt-2 inline-block'>Offering child-friendly seating options.</p>
                                    <a href='/online-reservations' title='Child Seats Available in Toronto' className='uppercase text-white pt-8 inline-block hover:underline'>Book Now</a>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}

export default LuxuryLimousine