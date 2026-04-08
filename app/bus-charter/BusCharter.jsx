'use client'

import React from 'react'
import Image from 'next/image'
import EventBanner from '../../public/assets/slides/2.jpg'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import { Autoplay, EffectFade } from 'swiper/modules'

const BusCharter = () => {
  return (
    <main>
        <div>
            <div className='relative'>
                <div className='bus-page-bg object-cover absolute h-[300px] md:h-[550px] inset-0 opacity-50'></div>
                <div className='relative z-10 pt-40 lg:pt-80 md:pb-30'>
                    <div className='container mx-auto px-2'>
                        <div>
                            <ul className='breadcrumb uppercase webColor text-sm flex'>
                            <li><a href='/'>Home</a></li>
                            <li>Bus Charter</li>
                            </ul>
                        </div>
                        <h2 className='text-white text-2xl lg:text-6xl leading-snug my-5 font-medium'>Bus Charter</h2>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className='container mx-auto px-2'>
                <div className='pt-20 lg:pt-0 pb-0'>
                    <div className='border-b webBorderColor pb-8 mb-8' data-aos="fade-up">
                        <small className='text-sm webColor uppercase'>Bus Charter</small>
                        <h1 className='text-white text-2xl lg:text-4xl leading-snug mb-5 mt-2'>Bus Charter: For All Your Corporate Travel Needs</h1>
                        <p className='text-base leading-relaxed webFontColor'>
                        At Limo Royale, we are dedicated to providing seamless and professional transportation services to all our clients. For corporate outings, team-building retreats, or business meetings, we are there to provide you with our luxury bus charter service. We ensure a smooth journey, from booking to dropping you off at the destination.
                        </p>
                    </div>
                    <div data-aos="fade-up">
                        <h2 className='text-white text-2xl lg:text-3xl leading-snug mt-8 mb-8 font-medium'>What We Offer</h2>
                        <div className='hidden md:grid lg:grid-cols-2 lg:space-x-8 space-y-8 text-left'>
                            <div>
                            <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Luxury Fleet of Vehicles</h2>
                            <p className='text-base leading-relaxed webFontColor'>Our luxury fleet of charter vehicles are equipped with amenities that you and your team require for a comfortable trip. From Wi-Fi to power outlets, temperature control, and many more features are what makes you travel in utmost comfort. Travel in elegance and arrive at your destination refreshed and ready for your next commitment.</p>
                            </div>
                            <div>
                            <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Professional Chauffeurs</h2>
                            <p className='text-base leading-relaxed webFontColor'>Our team of professional chauffeurs at Limo Royale ensure you reach your destination safely. They are experts in routes and know how to navigate city traffic to help you reach your destination on time. We ensure smooth travel to each and every one of our clients, every time.</p>
                            </div>
                            <div>
                            <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Personalized Schedules</h2>
                            <p className='text-base leading-relaxed webFontColor'>We provide our clients personalized itineraries according to their schedules and to match with their requirements. We offer multiples pickups and shuttle services between venues to ensure smooth and comfortable travel solutions.</p>
                            </div>
                            <div>
                            <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Support Service</h2>
                            <p className='text-base leading-relaxed webFontColor'>Our Limo Royale customer support team is prepared to help you with everything related to your travels. From the point of booking to travel day, we are ready to serve you at the best level and provide you with assistance as and when you require.</p>
                            </div>
                        </div>
                        <div data-aos="fade-up">
                            <div className='grid lg:grid-cols-3 mt-5 mb-8'>
                                <div>
                                    <h2 className='text-white text-xl md:text-2xl font-medium'>What is it for?</h2> 
                                </div>
                                <div>
                                    <ul className='text-base space-y-3 webFontColor list-disc pl-6'>
                                        <li>Family Gatherings</li>
                                        <li>Private Parties</li>
                                        <li>Weddings</li>
                                        <li>VIP Transport</li>
                                    </ul>
                                </div>
                                {/* <div className='bg-[#0a0a0a] p-5 md:p-10 mt-10 lg:mt-0'>
                                    <h2 className='text-white text-xl md:text-2xl font-medium'>Create unforgettable memories with our private charters.</h2>
                                    <a href='/booking' className='inline-block view-more-btn text-sm px-5 md:px-10 py-5 mt-5 uppercase'>Contact us to book today!</a>
                                </div> */}
                            </div>
                        </div>
                        <div className='block md:hidden text-left'>
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={40}
                                slidesPerView={1}
                                loop={true}
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 1 },
                                }}
                            >
                                <SwiperSlide>
                                <div className='bg-[#0a0a0a] h-[300px] p-5'>
                                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Customizable Itineraries</h2>
                                    <p className='text-base leading-relaxed webFontColor'>We tailor our services to fit your schedule, offering multiple pickups, shuttle services between venues, or transportation for full-day events.</p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-[#0a0a0a] h-[300px] p-5'>
                                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Luxurious Fleet</h2>
                                    <p className='text-base leading-relaxed webFontColor'>Our charter vehicles are equipped with reclining leather seats, ample legroom, climate control, and onboard amenities such as WiFi and power outlets. Your team will travel in comfort and style, arriving at your destination refreshed.</p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-[#0a0a0a] h-[300px] p-5'>
                                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Experienced Chauffeurs</h2>
                                    <p className='text-base leading-relaxed webFontColor'>Our professional drivers are trained to prioritize safety and punctuality, ensuring smooth travel. Familiar with local routes and traffic patterns, they guarantee you arrive on time, every time.</p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-[#0a0a0a] h-[300px] p-5'>
                                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Complete Support</h2>
                                    <p className='text-base leading-relaxed webFontColor'>From booking to travel day, our customer service team is on hand to manage logistics and special requests, ensuring a seamless experience throughout your corporate event.</p>
                                </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className='bg-[#0a0a0a]' data-aos="fade-up">
                <div className='grid grid-cols-1 lg:grid-cols-2 mt-8 lg:mt-0'>
                    <div>
                        <Image src={EventBanner} alt='Corporate Travel Experience with Limo Royale' className='w-full md:h-[520px] object-cover object-bottom' />
                    </div>
                    <div className='py-5 md:py-5 px-5 md:px-10'>
                        <small className='text-sm webColor uppercase'>We are serving</small>
                        <h2 className='text-white text-2xl lg:text-4xl my-5'>Events We Offer Services</h2>
                        <ul className='text-base space-y-3 webFontColor list-disc pl-6'>
                            <li>Business Meetings</li>
                            <li>Corporate Retreats</li>
                            <li>Seminars</li>
                            <li>Team-Building programs</li>
                            <li>Business conferences</li>
                            <li>Trade shows</li>
                            <li>Exhibitions</li>
                        </ul>
                        <p className='text-base leading-relaxed webFontColor mt-5'>Elevate your corporate travel experience with Limo Royale. </p>
                        <a href='/booking' className='inline-block view-more-btn text-sm px-5 md:px-10 py-5 mt-5 uppercase'>book your charter today</a>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className='container mx-auto px-2'>
                <div className='border-b webBorderColor pb-10 mt-8 mb-8' data-aos="fade-up">
                    <small className='text-sm webColor uppercase'>Private Charter by Limo Royale</small>
                    <h2 className='text-white text-2xl lg:text-4xl leading-snug my-5'>Exclusive Private Charter Services<br></br> Tailored to Your Event</h2>
                    <p className='text-base leading-relaxed webFontColor'>
                    When it comes to personal and private events, Limo Royale offers the finest in transportation. Whether you’re planning a wedding, family reunion, or a private getaway, our private charter services provide the luxury, flexibility, and convenience you deserve. Our fleet of modern, well-appointed vehicles is equipped to transport your group in style, no matter the occasion.
                    </p>
                </div>
                <div data-aos="fade-up">
                    <h2 className='text-white text-2xl lg:text-3xl leading-snug mt-10 mb-8 font-medium'>What Sets Us Apart</h2>
                    <div className='hidden md:grid lg:grid-cols-2 lg:space-x-8 space-y-8 text-left'>
                        <div>
                        <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Personalized Itineraries</h2>
                        <p className='text-base leading-relaxed webFontColor'>We customize every trip based on your specific needs, offering the flexibility to include multiple stops, extended routes, or direct travel to your chosen destination.</p>
                        </div>
                        <div>
                        <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Luxury Onboard Experience</h2>
                        <p className='text-base leading-relaxed webFontColor'>Our private charters feature premium amenities such as climate-controlled environments, reclining seats, WiFi, and onboard entertainment systems, ensuring that your guests travel in complete comfort.</p>
                        </div>
                        <div>
                        <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Discreet and Professional Chauffeurs</h2>
                        <p className='text-base leading-relaxed webFontColor'>Our drivers are not only experienced but also trained in providing personalized, discreet service to ensure your event proceeds smoothly and with elegance.</p>
                        </div>
                        <div>
                        <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Exclusive to You</h2>
                        <p className='text-base leading-relaxed webFontColor'>Your event is the sole focus, with vehicles dedicated solely to your group, ensuring privacy and exclusivity</p>
                        </div>
                    </div>
                    <div className='block md:hidden text-left'>
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={40}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{ delay: 2500, disableOnInteraction: false }}
                            breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 1 },
                            }}
                        >
                            <SwiperSlide>
                            <div className='bg-[#0a0a0a] h-[300px] p-5'>
                                <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Personalized Itineraries</h2>
                                <p className='text-base leading-relaxed webFontColor'>We customize every trip based on your specific needs, offering the flexibility to include multiple stops, extended routes, or direct travel to your chosen destination.</p>
                            </div>
                            </SwiperSlide>
                            <SwiperSlide>
                            <div className='bg-[#0a0a0a] h-[300px] p-5'>
                                <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Luxury Onboard Experience</h2>
                                <p className='text-base leading-relaxed webFontColor'>Our private charters feature premium amenities such as climate-controlled environments, reclining seats, WiFi, and onboard entertainment systems, ensuring that your guests travel in complete comfort.</p>
                            </div>
                            </SwiperSlide>
                            <SwiperSlide>
                            <div className='bg-[#0a0a0a] h-[300px] p-5'>
                                <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Discreet and Professional Chauffeurs</h2>
                                <p className='text-base leading-relaxed webFontColor'>Our drivers are not only experienced but also trained in providing personalized, discreet service to ensure your event proceeds smoothly and with elegance.</p>
                            </div>
                            </SwiperSlide>
                            <SwiperSlide>
                            <div className='bg-[#0a0a0a] h-[300px] p-5'>
                                <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Exclusive to You</h2>
                                <p className='text-base leading-relaxed webFontColor'>Your event is the sole focus, with vehicles dedicated solely to your group, ensuring privacy and exclusivity</p>
                            </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
                <div data-aos="fade-up">
                    <div className='grid lg:grid-cols-3 mt-5 mb-8'>
                        <div>
                            <h2 className='text-white text-xl md:text-2xl font-medium'>Perfect for</h2> 
                        </div>
                        <div>
                            <ul className='text-base space-y-3 webFontColor list-disc pl-6'>
                                <li>Family Gatherings</li>
                                <li>Private Parties</li>
                                <li>Weddings</li>
                                <li>VIP Transport for Special Guests</li>
                            </ul>
                        </div>
                        <div className='bg-[#0a0a0a] p-5 md:p-10 mt-10 lg:mt-0'>
                            <h2 className='text-white text-xl md:text-2xl font-medium'>Create unforgettable memories with our private charters.</h2>
                            <a href='/booking' className='inline-block view-more-btn text-sm px-5 md:px-10 py-5 mt-5 uppercase'>Contact us to book today!</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className='bg-[#0a0a0a] py-1' data-aos="fade-up">
                <div className='container mx-auto px-2'>
                    <div className='border-b webBorderColor pb-8 mt-5 mb-8' data-aos="fade-up">
                        <small className='text-sm webColor uppercase'>Sports Team Charter by Limo Royale</small>
                        <h2 className='text-white text-2xl lg:text-4xl leading-snug my-5'>Tailored Transportation for Athletes and Teams</h2>
                        <p className='text-base leading-relaxed webFontColor'>
                            With Limo Royale’s Sports Team Charter, we understand that athletes need more than just transportation—they need a service that caters to their specific needs. Whether you’re heading to a local game, national tournament, or training camp, our luxury sports charters ensure that your team arrives well-rested and ready to perform.
                        </p>
                    </div>
                    <div data-aos="fade-up">
                        <h2 className='text-white text-2xl lg:text-3xl leading-snug mt-10 mb-8 font-medium'>Why Choose Limo Royale for Your Team</h2>
                        <div className='hidden md:grid lg:grid-cols-2 lg:space-x-8 space-y-8 text-left'>
                            <div>
                                <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Spacious and Modern Fleet</h2>
                                <p className='text-base leading-relaxed webFontColor'>Our charter buses feature large storage compartments for sports equipment, comfortable reclining seats with ample legroom, and onboard restrooms, allowing athletes to travel in comfort.</p>
                            </div>
                            <div>
                                <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Safety and Reliability</h2>
                                <p className='text-base leading-relaxed webFontColor'>Our professional drivers are highly experienced in ensuring safe, punctual transportation, no matter the distance. We prioritize your team's safety and work around any last-minute schedule changes.</p>
                            </div>
                            <div>
                                <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Customized Travel Schedules</h2>
                                <p className='text-base leading-relaxed webFontColor'>We understand the fluid nature of sports schedules, and we work closely with team managers and coordinators to develop travel itineraries that align with your game or practice schedule.</p>
                            </div>
                            <div>
                                <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Onboard Comfort</h2>
                                <p className='text-base leading-relaxed webFontColor'>WiFi, power outlets, and entertainment systems are available, ensuring athletes can relax, unwind, or stay connected during long journeys.</p>
                            </div>
                        </div>
                        <div className='block md:hidden text-left'>
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={40}
                                slidesPerView={1}
                                loop={true}
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 1 },
                                }}
                            >
                                <SwiperSlide>
                                <div className='bg-black h-[300px] p-5'>
                                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Spacious and Modern Fleet</h2>
                                    <p className='text-base leading-relaxed webFontColor'>Our charter buses feature large storage compartments for sports equipment, comfortable reclining seats with ample legroom, and onboard restrooms, allowing athletes to travel in comfort.</p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-black h-[300px] p-5'>
                                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Safety and Reliability</h2>
                                    <p className='text-base leading-relaxed webFontColor'>Our professional drivers are highly experienced in ensuring safe, punctual transportation, no matter the distance. We prioritize your team's safety and work around any last-minute schedule changes.</p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-black h-[300px] p-5'>
                                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Customized Travel Schedules</h2>
                                    <p className='text-base leading-relaxed webFontColor'>We understand the fluid nature of sports schedules, and we work closely with team managers and coordinators to develop travel itineraries that align with your game or practice schedule.</p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-black h-[300px] p-5'>
                                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Onboard Comfort</h2>
                                    <p className='text-base leading-relaxed webFontColor'>WiFi, power outlets, and entertainment systems are available, ensuring athletes can relax, unwind, or stay connected during long journeys.</p>
                                </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                    <div data-aos="fade-up">
                        <div className='grid lg:grid-cols-3 mt-5 mb-5'>
                            <div>
                            <h2 className='text-white text-xl md:text-2xl font-medium'>Events We Serve</h2> 
                            </div>
                            <div>
                                <ul className='text-base space-y-3 webFontColor list-disc pl-6'>
                                    <li>Tournaments</li>
                                    <li>Training Camps</li>
                                    <li>Away Games</li>
                                    <li>Team-Building Events</li>
                                </ul>
                            </div>
                            <div className='bg-black p-5 md:p-10 mt-10 lg:mt-0'>
                                <h2 className='text-white text-xl md:text-2xl font-medium'>Trust Limo Royale to get your team to the game, every time.</h2>
                                <a href='/booking' className='inline-block view-more-btn text-sm px-5 md:px-10 py-5 mt-5 uppercase'>Book your team's charter</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div data-aos="fade-up">
                <div className='container mx-auto px-2'>
                    <div className='border-b webBorderColor pb-8 mt-5 mb-8' data-aos="fade-up">
                        <small className='text-sm webColor uppercase'>City Charter by Limo Royale</small>
                        <h2 className='text-white text-2xl lg:text-4xl leading-snug my-5'>Explore the City in Comfort and Style</h2>
                        <p className='text-base leading-relaxed webFontColor'>
                            Discover Toronto and other cities in ultimate luxury with Limo Royale’s City Charter services. Whether you’re hosting a sightseeing tour, organizing a special event, or just want to enjoy the city in a stress-free manner, our city charters provide a top-tier travel experience for groups of all sizes. We cater to locals, tourists, and event organizers, offering a first-class urban travel solution.
                        </p>
                    </div>
                    <div data-aos="fade-up">
                        <h2 className='text-white text-2xl lg:text-3xl leading-snug mt-10 mb-8 font-medium'>Bus Charter City Experience</h2>
                        <div className='hidden md:grid lg:grid-cols-3 lg:space-x-8 space-y-8 text-left'>
                            <div>
                                <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Customized City Tour</h2>
                                <p className='text-base leading-relaxed webFontColor'>You provide the itinerary, we provide you with transportation. We customize city tour itineraries to cover all iconic landmarks, shopping districts, dining, cultural experiences, and more.</p>
                            </div>
                            <div>
                                <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Luxury Fleet</h2>
                                <p className='text-base leading-relaxed webFontColor'>Luxury vehicles in our fleet are fully equipped with all that is required for a comfortable journey. Ample legroom, reclining seats, plush leather interior, temperature control features, are what help to make it a comfortable and luxurious trip.</p>
                            </div>
                            <div>
                                <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Experienced Chauffeurs</h2>
                                <p className='text-base leading-relaxed webFontColor'>Our experienced chauffeurs ensure you have a smooth, comfortable, and safe journey all throughout. They will navigate you through city traffic to ensure that you enjoy every moment of the city tour.</p>
                            </div>
                        </div>
                        <div className='border-t webBorderColor mt-5'>
                            <h2 className='text-white text-2xl lg:text-3xl leading-snug mt-10 mb-8 font-medium'>Why Choose Us?</h2>
                            <div className='hidden md:grid lg:grid-cols-2 lg:space-x-8 space-y-8 text-left'>
                                <div>
                                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Availability</h2>
                                    <p className='text-base leading-relaxed webFontColor'>At Limo Royale, we are available 24/7 and provide continuous services to our clients. Our around-the-clock availability ensures clients can enjoy our transport services any time they require.</p>
                                </div>
                                <div>
                                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Luxury Fleet</h2>
                                    <p className='text-base leading-relaxed webFontColor'>Our well-maintained fleet of luxury vehicles provide the highest level of comfort and sophistication for you and your team.</p>
                                </div>
                                <div>
                                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Safety and Reliability</h2>
                                    <p className='text-base leading-relaxed webFontColor'>Your safety and satisfaction are our priority. Our professional chauffeurs ensure you travel in complete safety. Limo Royale provides reliable transportation services for corporate and personal events. </p>
                                </div>
                                <div>
                                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Professional Service</h2>
                                    <p className='text-base leading-relaxed webFontColor'>We provide customized services to clients to meet their specific requirements. We understand each client has unique requirements, thus ensuring a personalized service in every way. </p>
                                </div>
                            </div>
                        </div>
                        <div className='block md:hidden text-left'>
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={40}
                                slidesPerView={1}
                                loop={true}
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 1 },
                                }}
                            >
                                <SwiperSlide>
                                <div className='bg-[#0a0a0a] h-[300px] p-5'>
                                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Tailored City Tour</h2>
                                    <p className='text-base leading-relaxed webFontColor'>We craft personalized itineraries that allow you to explore the best of what the city has to offer—whether it’s iconic landmarks, shopping districts, dining excursions, or cultural experiences.</p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-[#0a0a0a] h-[300px] p-5'>
                                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Luxury Fleet</h2>
                                    <p className='text-base leading-relaxed webFontColor'>Travel in our fleet of modern vehicles, equipped with reclining seats, climate control, onboard WiFi, and entertainment options, ensuring your group enjoys the ride as much as the destination.</p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-[#0a0a0a] h-[300px] p-5'>
                                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Experienced Chauffeur</h2>
                                    <p className='text-base leading-relaxed webFontColor'>Our drivers are familiar with the city’s roads and traffic patterns, allowing you to relax while we handle the navigation. Whether it’s a busy weekday or weekend, we ensure a smooth and punctual experience.</p>
                                </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                    <div data-aos="fade-up">
                        <div className='grid lg:grid-cols-3 mt-5 mb-8'>
                            <div>
                            <h2 className='text-white text-xl md:text-2xl font-medium'>Ideal For</h2> 
                            </div>
                            <div>
                                <ul className='text-base space-y-3 webFontColor list-disc pl-6'>
                                    <li>Sightseeing and City Tours</li>
                                    <li>Corporate Outings</li>
                                    <li>Wedding Guest Transport</li>
                                    <li>Shopping and Dining Excursions</li>
                                </ul>
                            </div>
                            <div className='bg-[#0a0a0a] p-5 md:p-10 mt-10 lg:mt-0'>
                                <h2 className='text-white text-xl md:text-2xl font-medium'>Experience the city like never before with Limo Royale’s City Charter Services.</h2>
                                <a href='/booking' className='inline-block view-more-btn text-sm px-5 md:px-10 py-5 mt-5 uppercase'>contact us to book now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className='bg-[#0a0a0a] py-1' data-aos="fade-up">
                <div className='container mx-auto px-2'>
                    <div className='border-b webBorderColor pb-8 mt-5 mb-8' data-aos="fade-up">
                        <small className='text-sm webColor uppercase'>Wedding Shuttle by Limo Royale</small>
                        <h2 className='text-white text-2xl lg:text-4xl leading-snug my-5'>Elegant Wedding Shuttle Services for Your Special Day</h2>
                        <p className='text-base leading-relaxed webFontColor'>
                            On your wedding day, transportation should be the last thing on your mind. With Limo Royale’s Wedding Shuttle Services, we ensure your guests are comfortably transported between venues in style. Whether it’s moving between the ceremony, reception, or after-party, we make sure everyone arrives safely and on time, giving you peace of mind on your big day.
                        </p>
                    </div>
                    <div data-aos="fade-up">
                        <h2 className='text-white text-2xl lg:text-3xl leading-snug mt-10 mb-8 font-medium'>Features of Our Wedding Shuttle Services</h2>
                        <div className='hidden md:grid lg:grid-cols-2 lg:space-x-8 space-y-8 text-left'>
                            <div>
                                <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Comfort and Luxury</h2>
                                <p className='text-base leading-relaxed webFontColor'>Our shuttles are equipped with spacious seating, climate control, and elegant interiors to ensure your guests travel in comfort.</p>
                            </div>
                            <div>
                                <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Dedicated Bridal Party Service</h2>
                                <p className='text-base leading-relaxed webFontColor'>We offer special shuttles for bridal parties, providing privacy and comfort as you move between venues.</p>
                            </div>
                            <div>
                                <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Airport Transfer</h2>
                                <p className='text-base leading-relaxed webFontColor'>For out-of-town guests, we provide convenient airport shuttles, ensuring their arrival is smooth and stress-free.</p>
                            </div>
                            <div>
                                <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Flexible Schedulin</h2>
                                <p className='text-base leading-relaxed webFontColor'>Whether your wedding events span the whole day or are confined to a few hours, we work with you to develop a transportation schedule that aligns with your timeline.</p>
                            </div>
                        </div>
                        <div className='block md:hidden text-left'>
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={40}
                                slidesPerView={1}
                                loop={true}
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 1 },
                                }}
                            >
                                <SwiperSlide>
                                    <div className='bg-black h-[220px] p-5'>
                                        <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Comfort and Luxury</h2>
                                        <p className='text-base leading-relaxed webFontColor'>Our shuttles are equipped with spacious seating, climate control, and elegant interiors to ensure your guests travel in comfort.</p>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-black h-[220px] p-5'>
                                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Dedicated Bridal Party Service</h2>
                                    <p className='text-base leading-relaxed webFontColor'>We offer special shuttles for bridal parties, providing privacy and comfort as you move between venues.</p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-black h-[220px] p-5'>
                                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Airport Transfer</h2>
                                    <p className='text-base leading-relaxed webFontColor'>For out-of-town guests, we provide convenient airport shuttles, ensuring their arrival is smooth and stress-free.</p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-black h-[220px] p-5'>
                                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Flexible Schedulin</h2>
                                    <p className='text-base leading-relaxed webFontColor'>Whether your wedding events span the whole day or are confined to a few hours, we work with you to develop a transportation schedule that aligns with your timeline.</p>
                                </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                    <div data-aos="fade-up">
                        <div className='grid lg:grid-cols-3 mt-5 mb-5'>
                            <div></div>
                            <div></div>
                            <div className='bg-black p-5 md:p-10 mt-0 lg:mt-0'>
                                <h2 className='text-white text-xl md:text-2xl font-medium'>Let us take care of the transportation, so you can focus on celebrating your love.</h2>
                                <a href='/booking' className='inline-block view-more-btn text-sm px-5 md:px-10 py-5 mt-5 uppercase'>Book your wedding shuttle</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div data-aos="fade-up">
                <div className='container mx-auto px-2'>
                    <div className='border-b webBorderColor pb-8 mt-5 mb-8' data-aos="fade-up">
                        <small className='text-sm webColor uppercase'>Airport Shuttle by Limo Royale</small>
                        <h2 className='text-white text-2xl lg:text-4xl leading-snug my-5'>Effortless Airport Transfers with Limo Royale</h2>
                        <p className='text-base leading-relaxed webFontColor'>
                            When it comes to airport transportation, reliability and comfort are key. With Limo Royale’s luxury airport shuttle services, we provide a premium travel experience, ensuring you arrive at the airport or your destination on time and in style. Whether you’re traveling for business or leisure, our airport shuttles offer a seamless, stress-free ride from start to finish.
                        </p>
                    </div>
                    <div data-aos="fade-up">
                        <h2 className='text-white text-2xl lg:text-3xl leading-snug mt-10 mb-8 font-medium'>The Limo Royale Airport Experience</h2>
                        <div className='hidden md:grid lg:grid-cols-2 lg:space-x-8 space-y-8 text-left'>
                            <div>
                                <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>On-Time Guarantee</h2>
                                <p className='text-base leading-relaxed webFontColor'>We craft personalized itineraries that allow you to explore the best of what the city has to offer—whether it’s iconic landmarks, shopping districts, dining excursions, or cultural experiences.</p>
                            </div>
                            <div>
                                <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Luxury Fleet</h2>
                                <p className='text-base leading-relaxed webFontColor'>Choose from our range of high-end vehicles equipped with spacious seating, climate control, WiFi, and more for a comfortable and relaxing ride.</p>
                            </div>
                            <div>
                                <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Exclusive Private Shuttles</h2>
                                <p className='text-base leading-relaxed webFontColor'>Whether you're traveling alone or with a group, we provide private shuttle options that offer privacy, comfort, and convenience.</p>
                            </div>
                            <div>
                                <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Professional Chauffeurs</h2>
                                <p className='text-base leading-relaxed webFontColor'>Our experienced drivers ensure that your airport transfer is as smooth and efficient as possible, handling all your transportation needs with precision.</p>
                            </div>
                        </div>
                        <div className='block md:hidden text-left'>
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={40}
                                slidesPerView={1}
                                loop={true}
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 1 },
                                }}
                            >
                                <SwiperSlide>
                                <div className='bg-[#0a0a0a] h-[300px] p-5'>
                                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>On-Time Guarantee</h2>
                                    <p className='text-base leading-relaxed webFontColor'>We craft personalized itineraries that allow you to explore the best of what the city has to offer—whether it’s iconic landmarks, shopping districts, dining excursions, or cultural experiences.</p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-[#0a0a0a] h-[300px] p-5'>
                                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Luxury Fleet</h2>
                                    <p className='text-base leading-relaxed webFontColor'>Choose from our range of high-end vehicles equipped with spacious seating, climate control, WiFi, and more for a comfortable and relaxing ride.</p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-[#0a0a0a] h-[300px] p-5'>
                                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Exclusive Private Shuttles</h2>
                                    <p className='text-base leading-relaxed webFontColor'>Whether you're traveling alone or with a group, we provide private shuttle options that offer privacy, comfort, and convenience.</p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-[#0a0a0a] h-[300px] p-5'>
                                    <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium'>Professional Chauffeurs</h2>
                                    <p className='text-base leading-relaxed webFontColor'>Our experienced drivers ensure that your airport transfer is as smooth and efficient as possible, handling all your transportation needs with precision.</p>
                                </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                    <div data-aos="fade-up">
                        <div className='grid lg:grid-cols-3 mt-5 mb-5'>
                            <div></div>
                            <div></div>
                            <div className='bg-[#0a0a0a] p-5 md:p-10 mt-0 lg:mt-0'>
                                <h2 className='text-white text-xl md:text-2xl font-medium'>Start or end your trip in luxury with Limo Royale’s Airport Shuttle Services.</h2>
                                <a href='/booking' className='inline-block view-more-btn text-sm px-5 md:px-10 py-5 mt-5 uppercase'>book today</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}

export default BusCharter