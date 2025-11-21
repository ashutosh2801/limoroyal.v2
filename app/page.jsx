'use client'
import React, { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadset } from '@fortawesome/free-solid-svg-icons'
import Slider from './Slider'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import { Autoplay, EffectFade } from 'swiper/modules'
import Image from 'next/image'
import cat1 from '../public/assets/categories/1.png'
import cat2 from '../public/assets/categories/2.png'
import cat3 from '../public/assets/categories/3.png'
import cat4 from '../public/assets/categories/4.png'
import cat5 from '../public/assets/categories/5.png'

import { PlayIcon } from '@heroicons/react/24/solid'
import VideoThumbnail from '../public/assets/banners/banner-video.png' 
import CarBanner from '../public/assets/banners/banner-1.jpg'

import GlobalImg1 from '../public/assets/banners/global-1.jpg'
import GlobalImg2 from '../public/assets/banners/global-2.jpg'
import GlobalImg3 from '../public/assets/banners/global-3.jpg'
import GlobalImg4 from '../public/assets/banners/global-4.jpg'

import Icon1 from '../public/assets/icons/icon-1.png'
import Icon2 from '../public/assets/icons/icon-2.png'
import Icon3 from '../public/assets/icons/icon-3.png'

import Gallery from '../app/components/Gallery'

import Testimonials from '../app/components/Testimonials'

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef(null)

  const handlePlay = () => {
    setIsPlaying(true)
    if (videoRef.current) {
      videoRef.current.play()
    }
  }
  return (
    <main>
      <Slider/>

      <div>
        <div className='container mx-auto px-2'>
          <div className='grid md:grid-cols-2 space-x-4 py-17' data-aos="fade-up">
            <div>
              <h1 className='text-white text-2xl lg:text-4xl mb-5 lg:mb-0 leading-snug font-medium'>Experience True Luxury with Over 20 Years of Global Expertise</h1>
            </div>
            <div>
              <p className='webFontColor text-base leading-relaxed'>At Limo Royale, we go beyond providing simply transportation services. In fact, our goal is to provide a luxurious, memorable, and most satisfactory experience to our clientele. With more than 20 years of experience spanning multiple countries across the globe, we truly understand what clients require. Our expertise in the hotel and hospitality industries adds more depth to our service to clients. Our objective is to provide clients with a royal experience that exceeds expectations in luxury transportation.</p>
              <a href='tel:+14167255466' title='Limo Royale Hotline' className='webFontColor mt-5 block'>
                <div className='bg-white rounded-full px-4 lg:px-5 py-4 mr-2 inline-block'><FontAwesomeIcon icon={faHeadset} className="text-red-800 text-3xl" /></div> <span className='webColor'>Call Center:</span> 416-725-5466
              </a>
            </div>
          </div>
          <div>
            <div className="mb-10" data-aos="fade-up">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={40}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                  1200: { slidesPerView: 5 }
                }}
              >
                <SwiperSlide>
                  <div className="text-left">
                    <a href='/fleet'><Image src={cat1} alt="LUXURY SEDAN" className="w-full h-50 object-contain bg-[#222] rounded-xl" loading='lazy' /></a>
                    <h3 className="text-white text-xl uppercase my-5"><a href='/fleet'>LUXURY SEDAN</a></h3>
                    <a href='/online-reservations' title='Book Now Luxury Sedan' className='webColor text-base'>Book Now</a>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="text-left">
                    <a href='/fleet'><Image src={cat2} alt="LUXURY SUV" className="w-full h-50 object-contain bg-[#222] rounded-xl" loading='lazy' /></a>
                    <h3 className="text-white text-xl uppercase my-5"><a href='/fleet'>LUXURY SUV</a></h3>
                    <a href='/online-reservations' title='Book Now Luxury SUV' className='webColor text-base'>Book Now</a>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="text-left">
                    <a href='/fleet'><Image src={cat3} alt="EXECUTIVE VAN" className="w-full h-50 object-contain bg-[#222] rounded-xl" loading='lazy' /></a>
                    <h3 className="text-white text-xl uppercase my-5"><a href='/fleet'>EXECUTIVE VAN</a></h3>
                    <a href='/online-reservations' title='Book Now Executive Van' className='webColor text-base'>Book Now</a>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="text-left">
                    <a href='/fleet'><Image src={cat4} alt="STRETCH LIMO" className="w-full h-50 object-contain bg-[#222] rounded-xl" loading='lazy' /></a>
                    <h3 className="text-white text-xl uppercase my-5"><a href='/fleet'>STRETCH LIMO</a></h3>
                    <a href='/online-reservations' title='Book Now Stretch Limo' className='webColor text-base'>Book Now</a>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="text-left">
                    <a href='/fleet'><Image src={cat5} alt="LUXURY COACH" className="w-full h-50 object-contain bg-[#222] rounded-xl" loading='lazy' /></a>
                    <h3 className="text-white text-xl uppercase my-5"><a href='/fleet'>LUXURY COACH</a></h3>
                    <a href='/online-reservations' title='Book Now Luxury Coach' className='webColor text-base'>Book Now</a>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className='bg-[#0a0a0a] mt-20 py-15'>
          <div className='container mx-auto px-2'>
            <div className='border-b webBorderColor pb-10 mb-13' data-aos="fade-up">
              <small className='text-sm webColor uppercase'>Finest Transport</small>
              <h2 className='text-white text-2xl lg:text-4xl leading-snug my-5'>Our Legacy of Excellence</h2>
              <p className='text-base leading-relaxed webFontColor'>
                True luxury is not about the outer appearance of the fleet. Instead, it’s about making you feel extra special and comfortable along your journey. Our knowledge in the hospitality industry makes our service all the more special to our clients. We’ve served high-profile clients, including VIPs and business executives, which gives us a unique edge and enables us to provide a royal service all the way.
              </p>
            </div>

            <div data-aos="fade-up">
              <h3 className='text-white text-2xl mb-10'>What Makes Limo Royale Unique?</h3>
              <div className='grid lg:grid-cols-3 lg:space-x-10 space-y-10 lg:space-y-0'>
                <div>
                  <h4 className='text-white text-xl lg:text-xl mb-5'>A Royal Experience, Every Time</h4>
                  <p className='text-base leading-relaxed webFontColor'>
                    Our service extends beyond merely transporting our clients from one location to another. It is all about making them enjoy the comfort level and luxury of travelling in our fleet. We prioritize privacy and comfort, making you feel special and cared for the moment you step into our vehicle. Clients enjoy being treated like royalty.
                  </p>
                </div>
                <div>
                  <h4 className='text-white text-xl lg:text-xl mb-5'>Exclusive Fleet Under Two Years Old</h4>
                  <p className='text-base leading-relaxed webFontColor'>
                    We ensure each one of our vehicles is maintained and up to date with the latest technological advancements in the automotive industry. All our vehicles are under two years old, ensuring our clients experience the best service in a vehicle kept in good condition. You can travel in comfort in a vehicle equipped with the latest technology.
                  </p>
                </div>
                <div className='lg:mr-[40px]'>
                  <h4 className='text-white text-xl lg:text-xl mb-5'>Personalized Service</h4>
                  <p className='text-base leading-relaxed webFontColor'>
                    Every small detail matters to us at Limo Royale. We curate personalized itineraries for our clients, ensuring they enjoy their journey to the fullest. The best experience comes with VIP treatment at every stage of the journey. We meticulously plan your journey, prioritizing luxury and comfort every step of the way.
                  </p>
                </div>
              </div>
            </div>

            <div className='grid md:grid-cols-2 md:space-x-5 space-y-5 lg:space-y-0 mt-10 lg:mt-10'>
              <div className='relative' data-aos="fade-up">
                {!isPlaying ? (
                  <div onClick={handlePlay} className="relative cursor-pointer">
                    <Image
                      src={VideoThumbnail}
                      alt='Limo Service Toronto'
                      className="w-full h-64 md:h-100 lg:h-140 xl:h-180 object-cover rounded-md"
                      width={800}
                      height={450}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className='rounded-full border border-white p-5'>
                        <PlayIcon className="w-12 h-12 text-white" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <video
                    ref={videoRef}
                    src="../assets/banners/video-1.mp4"
                    className="w-full h-64 md:h-100 lg:h-140 xl:h-180 object-cover rounded-md"
                    controls
                  />
                )}
              </div>

              <div data-aos="fade-up">
                <Image
                  src={CarBanner}
                  alt='A Royal Experience in Limo Royale'
                  className="w-full h-64 md:h-100 lg:h-140 xl:h-180 object-cover rounded-md"
                  width={800}
                  height={450}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className='container mx-auto px-2'>
          <div className='flex flex-col lg:flex-row lg:space-x-10 py-15' data-aos="fade-up">
            <div className='w-full lg:w-2/5'>
              <small className='webColor uppercase'>Premium drivers</small>
              <h2 className='text-white text-2xl lg:text-4xl leading-snug my-5 font-medium'>Our Global Experience</h2>
              <p className='text-base leading-relaxed webFontColor'>Limo Royale knows how to best serve its clients with expertise gained over two years in the industry. Experience in the hotel industry has taught us the importance of maintaining client satisfaction throughout. We don’t just meet expectations – we exceed them. We strive to be the best in the industry, providing the highest level of service to the clients, going beyond simply being yet another limo service.</p>
              <a href='/online-reservations' title='Luxury Limo & Airport Chauffeur Service Toronto' className='inline-block book-now-slide text-sm px-9 py-4 mt-10 uppercase'>Book Now</a>
            </div>
            <div className='w-full lg:w-3/5'>
                <div className='grid grid-cols-2 space-x-5 mt-10 lg:mt-0'>
                  <div><Image src={GlobalImg1} className='w-full h-[250px] md:h-[400px] lg:h-[450px] object-cover' alt='Global Experience with Limo Service' /></div>
                  <div><Image src={GlobalImg2} className='w-full h-[250px] md:h-[400px] lg:h-[450px] object-cover' alt='Premium Limo Service Toronto' /></div>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className='relative'>
          <div className='value-bg object-cover absolute inset-0 opacity-50'></div>
          <div className='relative z-10 py-5 lg:py-20'>
            <div className='container mx-auto px-2'>
              <h2 className='text-white text-2xl lg:text-4xl leading-snug my-5 font-medium'>Our Values: <br></br> Luxury, Precision, Royal Treatment</h2>
              <div className='grid lg:grid-cols-3 lg:space-x-5 space-y-5 lg:space-y-0 mt-10'>
                <div className='backdrop-blur-md bg-[#1b1b1b]/60 p-6' data-aos="fade-up">
                  <h4 className='text-white text-xl lg:text-2xl mb-5'>Luxury Above All</h4>
                  <p className='text-base leading-relaxed webFontColor'>Limo Royale is all about luxury. We focus on providing luxurious services to all our clients. Everything from our hand-selected fleet to our professional-level chauffeurs, we focus on delivering the best at all times.</p>
                </div>
                <div className='backdrop-blur-md bg-[#1b1b1b]/60 p-6' data-aos="fade-up">
                  <h4 className='text-white text-xl lg:text-2xl mb-5'>Precision & Punctuality</h4>
                  <p className='text-base leading-relaxed webFontColor'>We value our clients’ time and ensure that we reach the client’s location on time and take them to their destination with precision and safety in mind, at all times. Limo Royale is your transport and chauffeur service for a reliable and safe journey. This is done all while keeping the delivery of the highest level of service in mind.</p>
                </div>
                <div className='backdrop-blur-md bg-[#1b1b1b]/60 p-6' data-aos="fade-up">
                  <h4 className='text-white text-xl lg:text-2xl mb-5'>Royal Treatment</h4>
                  <p className='text-base leading-relaxed webFontColor'>At Limo Royale, you are not simply our client; you are our guest of honour. That’s how we treat every client of ours. Our dedicated service goes beyond pampering you in your journey in utmost comfort and luxury. You will go on a journey with customer service that extends the standard.</p>
                </div>
              </div>
              <div className='relative mt-10'>
                <a href='/fleet' title='Luxury Cars in Toronto' className='inline-block view-more-btn text-sm px-10 py-5 uppercase'>View More</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className='bg-[#0a0a0a] py-5'>
          <div className='container mx-auto px-2'>
            <h2 className='text-white text-2xl lg:text-4xl leading-snug my-5 font-medium' data-aos="fade-up">Royale Excellence in Cleanliness and Vehicle Maintenance</h2>
            <p className='text-base leading-relaxed webFontColor' data-aos="fade-up">At Limo Royale, we believe your ride should be more than just transportation—it should feel like an exceptional experience from start to finish. That’s why we go the extra mile to make sure every journey is comfortable, smooth, and stress-free. <br></br><br></br>Before every pickup, our team carefully checks each vehicle inside and out. From cleanliness to performance, nothing is left to chance. We make sure the car is spotless, perfectly prepared, and ready to give you the kind of ride you’d expect from a luxury service. <br></br><br></br>It’s the little details that matter—stepping into a fresh, polished car, enjoying the quiet elegance, and knowing everything has been taken care of for you. With us, you don’t just get from point A to point B—you enjoy the journey.</p>
            <div className='grid md:grid-cols-3 md:space-x-5 space-y-5 lg:space-y-0 my-10'>
              <div className='webBorderColor border rounded-lg p-5' data-aos="fade-up">
                <Image src={Icon1} alt='Reclining seats' className='filter brightness-0 invert' />
                <h5 className='text-white text-xl lg:text-3xl mt-5 font-medium'>Reclining seats</h5>
              </div>
              <div className='webBorderColor border rounded-lg p-5' data-aos="fade-up">
                <Image src={Icon2} alt='State-of-the-art sound systems' className='filter brightness-0 invert' />
                <h5 className='text-white text-xl lg:text-3xl mt-5 font-medium'>State-of-the-art sound systems</h5>
              </div>
              <div className='webBorderColor border rounded-lg p-5' data-aos="fade-up">
                <Image src={Icon3} alt='Premium amenities' className='filter brightness-0 invert' />
                <h5 className='text-white text-xl lg:text-3xl mt-5 font-medium'>Premium amenities</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className='mt-10 pb-10 lg:pb-0'>
          <div className='container mx-auto px-2 text-center'>
            <small className='webColor uppercase'>Our Team</small>
            <h2 className='text-white text-2xl lg:text-4xl leading-snug my-5 font-medium' data-aos="fade-up">Royale Excellence in Cleanliness and Vehicle Maintenance</h2>
            <p className='text-base leading-relaxed webFontColor' data-aos="fade-up">At Limo Royale, we take pride in offering more than just a ride—we provide an exceptional travel experience, guided by our elite team of Royale Chauffeurs. With a minimum of 15-20 years of professional driving experience, each Royale Chauffeur is handpicked to ensure that your journey is both safe and smooth. Our chauffeurs are not only skilled drivers but also masters of service, trained to deliver the royal treatment you deserve.</p>
            <div data-aos="fade-up">
              <h2 className='text-white text-2xl lg:text-3xl leading-snug mt-10 mb-8 font-medium'>Why Choose a Royale Chauffeur?</h2>
              <div className='grid lg:grid-cols-2 lg:space-x-8 space-y-15 text-left'>
                  <div>
                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Unmatched Expertise</h2>
                    <p className='text-base leading-relaxed webFontColor'>With decades of experience across both local and international routes, our chauffeurs ensure that every journey is smooth, efficient, and worry-free.</p>
                  </div>
                  <div>
                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>A Commitment to Safety</h2>
                    <p className='text-base leading-relaxed webFontColor'>Your safety is our foremost priority. Our highly skilled chauffeurs navigate all road conditions with confidence and care, allowing you complete peace of mind throughout your travel.</p>
                  </div>
                  <div>
                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>The Art of Service</h2>
                    <p className='text-base leading-relaxed webFontColor'>Driving is just one part of the job. Our chauffeurs are trained to provide discreet, professional, and courteous service—always attentive to your comfort and needs.</p>
                  </div>
                  <div>
                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Seamless Travel, Every Time</h2>
                    <p className='text-base leading-relaxed webFontColor'>From managing busy city traffic to getting you to important events right on time, your Royale Chauffeur ensures every journey feels effortless and stress-free.</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Gallery />

      <div>
        <div className='container mx-auto px-2'>
          <div className='flex flex-col lg:flex-row lg:space-x-12 space-y-10 lg:space-y-0 items-center py-15'>
            <div className='w-full lg:w-3/5' data-aos="fade-up">
                <div className='grid grid-cols-2 space-x-5'>
                  <div><Image src={GlobalImg3} className='w-full h-full' alt='Join with the best Limo Service in Toronto' /></div>
                  <div><Image src={GlobalImg4} className='w-full h-full' alt='VIP Membership' /></div>
                </div>
            </div>
            <div className='w-full lg:w-2/5' data-aos="fade-up">
              <small className='webColor uppercase'>Only the best</small>
              <h2 className='text-white text-2xl lg:text-4xl leading-snug my-3 font-medium'>Why We Stand Apart</h2>
              <p className='text-base leading-relaxed webFontColor'>At Limo Royale, every ride will make you feel special. We promise to give you more than just transportation—we want every client to feel truly valued and cared for. We’re not about being the biggest name out there, but about being the one you can always trust for the best experience.<br></br><br></br> When you step into one of our vehicles, it’s all about comfort, ease, and a touch of luxury that makes the journey just as enjoyable as the destination. With decades of experience in both limo services and hospitality, we’ve learned exactly what it takes to make people feel looked after. That’s why we go the extra mile—to give you the kind of service that stands out and stays with you.</p>
            </div>
          </div>
          <div className='mb-15' data-aos="fade-up">
            <h2 className='text-white text-2xl lg:text-4xl leading-snug my-3 font-medium'>The Limo Royale Experience</h2>
            <p className='text-base leading-relaxed webFontColor'>We, at Limo Royale, provide our clients premium service for any kind of event they want a ride for. Be it corporate travel, airport transfer, a wedding, or any journey, we are there for you to provide the best service. Our luxury fleet is built to ensure you have a comfortable and safe journey to your destination. </p>
          </div>            
        </div>
      </div>

      <div>
        <div className='car-banner h-[300px] md:h-[500px] lg:min-h-[1000px]' data-aos="fade-up"></div>
      </div>

      <Testimonials />

      <div>
        <div className='luxury-car-bg py-40'>
          <div className='container mx-auto px-2'>
            <h6 className='text-white text-3xl lg:text-4xl leading-snug my-5 font-medium'>Unmatched Luxury, Always New</h6>
          </div>
        </div>
      </div>

    </main>
  );
}
