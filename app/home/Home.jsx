'use client'
import React, { useState, useRef } from 'react'
import { PhoneIcon } from "@heroicons/react/24/solid";
import Slider from '../components/Slider'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import { Autoplay, EffectFade } from 'swiper/modules'
import Image from 'next/image'
import cat1 from '../../public/assets/categories/1.png'
import cat2 from '../../public/assets/categories/2.png'
import cat3 from '../../public/assets/categories/3.png'
import cat4 from '../../public/assets/categories/4.png'
import cat5 from '../../public/assets/categories/5.png'

import { PlayIcon } from '@heroicons/react/24/solid'
import VideoThumbnail from '../../public/assets/banners/banner-video.png' 
import CarBanner from '../../public/assets/banners/banner-1.jpg'

import GlobalImg1 from '../../public/assets/banners/global-1.jpg'
import GlobalImg2 from '../../public/assets/banners/global-2.jpg'
import GlobalImg3 from '../../public/assets/banners/global-3.jpg'
import GlobalImg4 from '../../public/assets/banners/global-4.jpg'

import Icon1 from '../../public/assets/icons/icon-1.png'
import Icon2 from '../../public/assets/icons/icon-2.png'
import Icon3 from '../../public/assets/icons/icon-3.png'
import Icon4 from '../../public/assets/icons/icon-4.png'
import Icon5 from '../../public/assets/icons/icon-5.png'
import Icon6 from '../../public/assets/icons/icon-6.png'

import Search from '../components/Search'

import Gallery from '../components/Gallery'

import Testimonials from '../components/Testimonials'

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
      <div className='relative'>
        <Slider/>
        {/* <Search /> */}
      </div>
      <div>
        <div className='container mx-auto px-2'>
          <div className='grid md:grid-cols-2 space-x-4 py-10 md:py-10' data-aos="fade-up">
            <div>
              <h1 className='text-white text-2xl lg:text-4xl mb-5 lg:mb-0 leading-snug font-medium'>Experience Two Decades of Expertise in Providing Luxury Transportation</h1>
            </div>
            <div>
              <p className='webFontColor text-base leading-relaxed'>Limo Royale is all about providing luxurious and comfortable transportation to all our clients. We have 20 years of experience providing the best transportation services across the region.  Our service goes beyond simply providing a method of transportation to our clients. We ensure each and every client is satisfied with our services by giving our best every time. We are a luxury transportation service company that exceeds expectations.</p>
              <a href='tel:+14167255466' title='Limo Royale Hotline' className='webFontColor hover:text-white mt-5 flex items-center'>
                <div className='webBG rounded-full transition p-3 mr-2 inline-block'><PhoneIcon className="text-white w-5 h-5" /></div> <span className='webColor mr-2'>Call Center:</span> 416-725-5466
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
        <div className='bg-[#0a0a0a] pt-5 pb-8'>
          <div className='container mx-auto px-2'>
            <div className='border-b webBorderColor pb-10 mb-10' data-aos="fade-up">
              <h2 className='text-white text-2xl lg:text-4xl leading-snug mb-5'>Two decades of excellence</h2>
              <p className='text-base leading-relaxed webFontColor'>
                Our experience in the hospitality industry shines through the quality of the services we provide. Our transportation services focus on providing more than just a ride to the client. It enhances the experience with the inclusion of additional amenities to keep you comfortable throughout the journey.
              </p>
            </div>

            <div data-aos="fade-up">
              <h3 className='text-white text-2xl mb-10'>What Makes Us Special?</h3>
              <div className='lg:space-x-10 space-y-10 lg:space-y-0'>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={40}
                    slidesPerView={1}
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
                        <div>
                        <h4 className='text-white text-xl lg:text-xl mb-5'>A Positive Experience</h4>
                        <p className='text-base leading-relaxed webFontColor'>
                            At Limo Royale, We provide our clients a right royal experience from the moment they step into the vehicle until they reach their destination. We prioritize the comfort and privacy of our clients and make our best effort to fulfil these. Limo Royale is all about luxury traveling at an affordable rate. We go beyond simply transporting our clients from one place to another.
                        </p>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div>
                        <h4 className='text-white text-xl lg:text-xl mb-5'>Luxury Fleet of Well-Maintained Vehicles</h4>
                        <p className='text-base leading-relaxed webFontColor'>
                            All the vehicles in our fleet are under two years old. They are well-maintained to ensure the highest level of comfort to our clients. The fleet is equipped with the latest technological advancements to ensure a ride that keeps you connected with your personal and business commitments. We provide the best amenities for you in all our vehicles.
                        </p>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div>
                        <h4 className='text-white text-xl lg:text-xl mb-5'>Customized Service</h4>
                        <p className='text-base leading-relaxed webFontColor'>
                            We curate every itinerary as per the client’s preferences. At Limo Royale, we treat each and every client with VIP treatment, ensuring they are comfortable all throughout their journey. We listen to their needs and ensure they are fully satisfied with our service. The best experience comes with satisfied clients who enjoy their journey to the fullest.
                        </p>
                        </div>
                    </SwiperSlide>
                </Swiper>
              </div>
            </div>

            <div className='grid md:grid-cols-2 md:space-x-5 space-y-5 lg:space-y-0 mt-10 lg:mt-10'>
              <div className='relative' data-aos="fade-up">
                {!isPlaying ? (
                  <div onClick={handlePlay} className="relative cursor-pointer">
                    <Image
                      src={VideoThumbnail}
                      alt='Limo Service Toronto'
                      className="w-full h-80 md:h-100 lg:h-140 xl:h-180 object-cover rounded-md"
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
                    className="w-full h-80 md:h-100 lg:h-140 xl:h-180 object-cover rounded-md"
                    controls
                  />
                )}
              </div>

              <div data-aos="fade-up">
                <Image
                  src={CarBanner}
                  alt='A Royal Experience in Limo Royale'
                  className="w-full h-80 md:h-100 lg:h-140 xl:h-180 object-cover rounded-md"
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
          <div className='flex flex-col lg:flex-row lg:space-x-10 py-8' data-aos="fade-up">
            <div className='w-full lg:w-2/5'>
              <h2 className='text-white text-2xl lg:text-4xl leading-snug mb-8 font-medium'>Trusted Chauffeurs of Exceptional Standards</h2>
              <p className='text-base leading-relaxed webFontColor'>Limo Royale Chauffeurs are all trusted with their ability to take clients to their destination safe and sound. We do rigorous background checks and follow standards in ensuring all chauffeurs are apt to protecting the client’s safety and taking them to their destination safely. Safety certifications, continuous training, and support ensure that all Limo Royale chauffeurs adhere to strict guidelines.</p>
              <a href='/online-reservations' title='Luxury Limo & Airport Chauffeur Service Toronto' className='inline-block book-now-slide text-sm px-9 py-4 mt-10 uppercase'>Book Now</a>
            </div>
            <div className='w-full lg:w-3/5'>
                <div className='grid grid-cols-2 space-x-5 mt-10 lg:mt-0'>
                  <div><Image src={GlobalImg1} className='w-full h-[200px] md:h-[400px] lg:h-[450px] object-cover' alt='Global Experience with Limo Service' /></div>
                  <div><Image src={GlobalImg2} className='w-full h-[200px] md:h-[400px] lg:h-[450px] object-cover' alt='Premium Limo Service Toronto' /></div>
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
              <h2 className='text-white text-2xl lg:text-4xl leading-snug my-5 font-medium'>Our Values</h2>
                <div className='flex lg:space-x-5 space-y-5 lg:space-y-0 mt-10'>
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={40}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{ delay: 3500, disableOnInteraction: false }}
                        breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 3 },
                        1200: { slidesPerView: 3 }
                        }}
                    >
                        <SwiperSlide className='h-auto flex'>
                            <div className='backdrop-blur-md bg-[#1b1b1b]/60 p-6 flex flex-col h-full w-full' data-aos="fade-up">
                            <h4 className='text-white text-xl lg:text-2xl mb-5'>Punctuality and Reliability</h4>
                            <p className='text-base leading-relaxed webFontColor flex-grow'>Limo Royale is your go-to transport service for precision, punctuality, and reliability. You can count on our Royale chauffeurs to be there on time to pick you up and take you to your destination safely. Beyond all of this, we give priority to providing the highest level of service to you.</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className='h-auto flex'>
                            <div className='backdrop-blur-md bg-[#1b1b1b]/60 p-6 flex flex-col h-full w-full' data-aos="fade-up">
                            <h4 className='text-white text-xl lg:text-2xl mb-5'>Luxury</h4>
                            <p className='text-base leading-relaxed webFontColor flex-grow'>We redefine luxury with our stylishly elegant and modern fleet of vehicles. All our vehicles are equipped with the latest technology to provide you a journey that is not only comfortable but also helps keep you connected to your business and personal commitments.</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className='h-auto flex'>
                            <div className='backdrop-blur-md bg-[#1b1b1b]/60 p-6 flex flex-col h-full w-full' data-aos="fade-up">
                            <h4 className='text-white text-xl lg:text-2xl mb-5'>Excellent Treatment</h4>
                            <p className='text-base leading-relaxed webFontColor flex-grow'>Our fleet or luxurious vehicles and team of professional chauffeurs manage to give a royal treatment of excellence. From the time you step into the vehicle up until the end of the journey, you are cared for in the best possible manner. Our excellent treatment goes beyond the journey as we connect with our clients from booking until the end.</p>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
              <div className='relative mt-10'>
                <a href='/fleet' title='Luxury Cars in Toronto' className='inline-block view-more-btn text-sm px-10 py-5 uppercase'>View More</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className='bg-[#0a0a0a] py-8'>
          <div className='container mx-auto px-2'>
            <h2 className='text-white text-2xl lg:text-4xl leading-snug mb-5 font-medium' data-aos="fade-up">Fleet of Clean and Well-Maintained Vehicles</h2>
            <p className='text-base leading-relaxed webFontColor' data-aos="fade-up">We make sure you get into a well-polished, clean, and stylish vehicle fully-equipped with all amenities. Our fleet goes through thorough checking for cleanliness in order to maintain the highest quality of standard. From cleanliness to performance, we ensure everything is perfect to give you a smooth ride to your destination. We go the extra mile to ensure the vehicles are cleaned and well-maintained by checking them from inside out. <br></br><br></br>With Limo Royale, you don’t just travel from one place to another. You enjoy a comfortable, luxurious, and safe journey with us.</p>
            <h2 className='text-white text-2xl lg:text-3xl leading-snug mt-5 font-medium' data-aos="fade-up">Elegance in Every Mile</h2>
            <div className='flex md:space-x-5 space-y-5 lg:space-y-0 mt-5'>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={40}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 3 },
                    1200: { slidesPerView: 3 }
                    }}
                >
                    <SwiperSlide className='h-auto flex'>
                        <div className='webBorderColor border rounded-lg p-5 flex flex-col h-full w-full' data-aos="fade-up">
                            <Image src={Icon1} alt='Reclining & Massaging Seats' className='filter brightness-0 invert' />
                            <h5 className='text-white text-xl lg:text-2xl mt-5 font-medium'>Reclining & Massaging Seats</h5>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='h-auto flex'>
                        <div className='webBorderColor border rounded-lg p-5 flex flex-col h-full w-full' data-aos="fade-up">
                            <Image src={Icon2} alt='State-of-the-art sound systems' className='filter brightness-0 invert' />
                            <h5 className='text-white text-xl lg:text-2xl mt-5 font-medium'>State-of-the-art sound systems</h5>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='h-auto flex'>
                        <div className='webBorderColor border rounded-lg p-5 flex flex-col h-full w-full' data-aos="fade-up">
                            <Image src={Icon3} alt='Advanced Climate Control' className='filter brightness-0 invert' />
                            <h5 className='text-white text-xl lg:text-2xl mt-5 font-medium'>Advanced Climate Control</h5>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='h-auto flex'>
                        <div className='webBorderColor border rounded-lg p-5 flex flex-col h-full w-full' data-aos="fade-up">
                            <Image src={Icon4} alt='Panoramic Sunroof' className='filter brightness-0 invert' />
                            <h5 className='text-white text-xl lg:text-2xl mt-5 font-medium'>Panoramic Sunroof</h5>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='h-auto flex'>
                        <div className='webBorderColor border rounded-lg p-5 flex flex-col h-full w-full' data-aos="fade-up">
                            <Image src={Icon5} alt='Rear Entertainment System' className='filter brightness-0 invert' />
                            <h5 className='text-white text-xl lg:text-2xl mt-5 font-medium'>Rear Entertainment System</h5>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='h-auto flex'>
                        <div className='webBorderColor border rounded-lg p-5 flex flex-col h-full w-full' data-aos="fade-up">
                            <Image src={Icon6} alt='Ambient Lighting' className='filter brightness-0 invert' />
                            <h5 className='text-white text-xl lg:text-2xl mt-5 font-medium'>Ambient Lighting</h5>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className='mt-8 pb-10 lg:pb-0'>
          <div className='container mx-auto px-2 md:text-center'>
            <h2 className='text-white text-2xl lg:text-4xl leading-snug my-5 font-medium' data-aos="fade-up">Our Team of Royale Chauffeurs</h2>
            <p className='text-base leading-relaxed webFontColor' data-aos="fade-up">Our Limo Royale team takes pride in providing almost two decades of excellent service to clients, offering more than just a ride to them. We ensure a smooth ride by our skilled drivers who are trained to provide a royal service to each and every client.</p>
            <div data-aos="fade-up">
                <h2 className='text-white text-2xl lg:text-3xl leading-snug mt-10 mb-8 font-medium'>Why Choose Us?</h2>
                <div className='hidden md:grid lg:grid-cols-2 lg:space-x-8 space-y-10 text-left'>
                  <div>
                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Seamless Travel</h2>
                    <p className='text-base leading-relaxed webFontColor'>Our seamless travel solutions at Limo Royale ensures you get to your destination with ease. Our professional chauffeurs are expert in routes and know how to navigate city traffic to take you comfortably and safely.</p>
                  </div>
                  <div>
                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Unparalleled Expertise</h2>
                    <p className='text-base leading-relaxed webFontColor'>Unmatched expertise of our chauffeurs come with years of experience of providing transportation solutions to every type of client. We master the art of making your ride as smooth as possible, helping you stay at ease at all times.</p>
                  </div>
                  <div>
                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>High-Quality Service</h2>
                    <p className='text-base leading-relaxed webFontColor'>Driving is part and parcel of our business, which is why our chauffeurs are experts in taking you on a safe and comfortable ride. They are courteous, attentive, and will serve you at the highest level possible, all along the way.</p>
                  </div>
                  <div>
                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Safety as a Priority</h2>
                    <p className='text-base leading-relaxed webFontColor'>We treat client safety as priority. Our Royale chauffeurs ensure your safety and will give you the utmost care during your journey. They are committed to your safety, allowing you complete peace of mind throughout the journey.</p>
                  </div>
                </div>
                <div className='block md:hidden'>
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={40}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{ delay: 3500, disableOnInteraction: false }}
                            breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 1 }
                            }}
                        >
                        <SwiperSlide>
                            <div>
                                <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Seamless Travel</h2>
                                <p className='text-base leading-relaxed webFontColor'>Our seamless travel solutions at Limo Royale ensures you get to your destination with ease. Our professional chauffeurs are expert in routes and know how to navigate city traffic to take you comfortably and safely.</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div>
                                <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Unparalleled Expertise</h2>
                                <p className='text-base leading-relaxed webFontColor'>Unmatched expertise of our chauffeurs come with years of experience of providing transportation solutions to every type of client. We master the art of making your ride as smooth as possible, helping you stay at ease at all times.</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div>
                                <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>High-Quality Service</h2>
                                <p className='text-base leading-relaxed webFontColor'>Driving is part and parcel of our business, which is why our chauffeurs are experts in taking you on a safe and comfortable ride. They are courteous, attentive, and will serve you at the highest level possible, all along the way.</p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div>
                                <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Safety as a Priority</h2>
                                <p className='text-base leading-relaxed webFontColor'>We treat client safety as priority. Our Royale chauffeurs ensure your safety and will give you the utmost care during your journey. They are committed to your safety, allowing you complete peace of mind throughout the journey.</p>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
          </div>
        </div>
      </div>

      <Gallery />

      <div>
        <div className='container mx-auto px-2'>
          <div className='flex flex-col lg:flex-row md:items-center lg:space-x-10 py-8'>
            <div className='w-full lg:w-3/5' data-aos="fade-up">
                <div className='grid grid-cols-2 space-x-5 mb-5 lg:mb-0'>
                  <div><Image src={GlobalImg3} className='w-full h-[200px] md:h-[400px] lg:h-[450px] object-cover object-bottom' alt='Join with the best Limo Service in Toronto' /></div>
                  <div><Image src={GlobalImg4} className='w-full h-[200px] md:h-[400px] lg:h-[450px] object-cover object-bottom' alt='VIP Membership' /></div>
                </div>
            </div>
            <div className='w-full lg:w-2/5' data-aos="fade-up">
              <small className='webColor uppercase'>Only the best</small>
              <h2 className='text-white text-2xl lg:text-4xl leading-snug my-3 font-medium'>How Do We Differ?</h2>
              <p className='text-base leading-relaxed webFontColor hidden md:block'>At Limo Royale, it is not just about taking you to your destination. It’s about making you enjoy the journey and helping you feel at ease all throughout. We ensure you have the highest level of comfort and luxury that you deserve in your ride. <br></br><br></br>Our two decades of experience has taught us what people look for in a luxury transportation service. We are always willing to go the extra mile to help our clients have an enjoyable trip.</p>
            </div>
            <div className='block md:hidden'>
              <Swiper
                modules={[Autoplay]}
                spaceBetween={40}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 350000, disableOnInteraction: false }}
                breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 1 }
                }}
              >
                <SwiperSlide>
                  <p className='text-base leading-relaxed webFontColor'>At Limo Royale, it is not just about taking you to your destination. It’s about making you enjoy the journey and helping you feel at ease all throughout. We ensure you have the highest level of comfort and luxury that you deserve in your ride.</p>
                </SwiperSlide>
                <SwiperSlide>
                  <p className='text-base leading-relaxed webFontColor'>Our two decades of experience has taught us what people look for in a luxury transportation service. We are always willing to go the extra mile to help our clients have an enjoyable trip.</p>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          <div className='mb-5 md:mb-7' data-aos="fade-up">
            <h2 className='text-white text-2xl lg:text-4xl leading-snug mb-3 font-medium'>The Limo Royale Experience</h2>
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
