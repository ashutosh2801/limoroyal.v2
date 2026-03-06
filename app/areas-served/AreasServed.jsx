'use client'

import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import { Autoplay, EffectFade } from 'swiper/modules'
import Image from 'next/image'
import AreasBanner1 from '../../public/assets/areas-served/1.jpg'
import AreasBanner2 from '../../public/assets/areas-served/2.jpg'
import AreasBanner3 from '../../public/assets/areas-served/3.jpg'
import AreasBanner4 from '../../public/assets/areas-served/4.jpg'
import AreasBanner5 from '../../public/assets/areas-served/5.jpg'
import AreasBanner6 from '../../public/assets/areas-served/6.jpg'
import AreasBanner7 from '../../public/assets/areas-served/7.jpg'
import AreasBanner8 from '../../public/assets/areas-served/8.jpg'

const AreasServed = () => {
    const swiperRef = useRef(null);
    const testimonials = [
        {
            title: 'Custom Itineraries',
            review: 'We create personalized routes, allowing you to experience Niagara Falls at your own pace, with options to include stops at nearby attractions such as casinos, theaters, and shopping districts.',
        },
        {
            title: 'Exclusive Access',
            review: 'Enjoy private viewing areas, VIP treatment at local attractions, and curated experiences designed to enhance your visit.',
        },
        {
            title: 'Luxury Fleet',
            review: 'Travel in style aboard our premium vehicles, offering reclining seats, climate control, WiFi, and entertainment systems.',
        },
    ]
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
                            <li>Areas Served</li>
                            </ul>
                        </div>
                        <h2 className='text-white text-2xl lg:text-6xl leading-snug my-5 font-medium'>Areas Served</h2>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className='mb-8' data-aos="fade-up">
                <div className='container mx-auto px-2'>
                    <div className='border-b webBorderColor pt-18 lg:pt-0 pb-8 mt-2 mb-8' data-aos="fade-up">
                        <small className='text-sm webColor uppercase'>Craft Your Perfect Journey</small>
                        <h1 className='text-white text-2xl lg:text-4xl leading-snug mb-5 mt-2'>Customise Your Tour with Limo Royale</h1>
                        <p className='text-base leading-relaxed webFontColor'>
                            At Limo Royale, we believe travel should reflect your personal style and desires. Our Customise Tour option allows you to tailor every aspect of your experience, from the destinations to the pace of travel, ensuring a journey that is uniquely yours. Whether you seek cultural immersion, natural wonders, or luxury escapes, our custom tours provide the flexibility and exclusivity you deserve. Travel in the utmost comfort with our premium fleet and knowledgeable chauffeurs, who are dedicated to bringing your vision to life.
                        </p>
                    </div>
                    <div data-aos="fade-up">
                        <h2 className='text-white text-2xl lg:text-3xl leading-snug mt-10 mb-8 font-medium'>Why Customise with Limo Royale?</h2>
                        <div className='text-left'>
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={30}
                                slidesPerView={1}
                                loop={true}
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 1 },
                                1024: { slidesPerView: 3 },
                                1200: { slidesPerView: 3 }
                                }}
                            >
                                <SwiperSlide>
                                    <div className='bg-[#0a0a0a] px-10 py-10 min-h-[230px]'>
                                        <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium mb-3'>Personalized Itineraries</h2>
                                        <p className='text-base leading-relaxed webFontColor'>Work with our travel experts to create a bespoke journey, handpicking destinations, stops, and experiences tailored to your preferences.</p>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='bg-[#0a0a0a] px-10 py-10 min-h-[230px]'>
                                        <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium mb-3'>Luxury Fleet</h2>
                                        <p className='text-base leading-relaxed webFontColor'>Choose from our range of high-end vehicles equipped with spacious seating, climate control, WiFi, and more for a comfortable and relaxing ride.</p>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='bg-[#0a0a0a] px-10 py-10 min-h-[230px]'>
                                        <h2 className='text-white text-xl lg:text-2xl leading-snug font-medium mb-3'>Exclusive Private Shuttles</h2>
                                        <p className='text-base leading-relaxed webFontColor'>Whether you're traveling alone or with a group, we provide private shuttle options that offer privacy, comfort, and convenience.</p>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div className='bg-[#0a0a0a]'>
                <div className='grid grid-cols-1 lg:grid-cols-2' data-aos="fade-up">
                    <div>
                        <Image src={AreasBanner1} className='w-full h-full object-cover' alt='Niagara Wine Tours by Limo Royale' />
                    </div>
                    <div className='p-5 md:py-10 md:px-10 flex flex-col'>
                        <small className='text-sm webColor uppercase'>Savor the Flavors of Niagara Wine Country</small>
                        <h2 className='text-white text-2xl lg:text-4xl my-5'>Niagara Wine Tours by Limo Royale</h2>
                        <p className='text-base leading-relaxed webFontColor mt-5'>Discover the rich, fertile vineyards of Niagara’s Wine Country with Limo Royale’s luxurious wine tours. Whether you’re a wine connoisseur or simply looking for a relaxing day trip, our tours offer a perfect blend of wine, culture, and scenic beauty. Traverse the rolling hills, visit award-winning wineries, and taste the region’s finest offerings, all while being transported in luxury.</p>
                        <h3 className='text-white text-2xl lg:text-2xl my-8'>Why Choose Limo Royale?</h3>
                        <div
                        onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
                        onMouseLeave={() => swiperRef.current?.autoplay?.start()}
                        >
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={20}
                                slidesPerView={1}
                                loop={true}
                                autoplay={{ delay: 4000, disableOnInteraction: false }}
                                onSwiper={(swiper) => {
                                    swiperRef.current = swiper;
                                }}
                                breakpoints={{
                                    640: { slidesPerView: 1 },
                                    768: { slidesPerView: 1 },
                                    1024: { slidesPerView: 1 },
                                }}
                            >
                                {testimonials.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <div className='bg-black p-8 md:p-15 min-h-[360px] lg:min-h-[300px] flex flex-col justify-center'>
                                            <div>
                                                <h5 className='text-white text-2xl font-semibold'>{item.title}</h5>
                                                <p className='webFontColor text-base leading-relaxed mt-5 w-full block'>{item.review}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
                <div className='pt-5 md:pt-10 lg:pt-8 pb-8'>
                    <div className='container mx-auto px-2'>
                        <h2 className='text-white text-2xl lg:text-3xl mb-8'>Experience the Best of Niagara Falls</h2>
                        <div className='hidden md:grid grid-cols-1 md:grid-cols-2 gap-5'>
                            <div className='bg-black px-10 py-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Classic Falls Experience</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    Stand at the edge of the thundering Horseshoe Falls, where the raw power of nature is on full display. Our guides will take you to the best vantage points, ensuring you capture the perfect photo and gain insight into the geology and history of the falls.
                                </p>
                            </div>
                            <div className='bg-black px-10 py-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Adventure Awaits</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    For thrill-seekers, embark on the legendary Hornblower Cruise, taking you right into the mist of the falls. Or, opt for an adrenaline-pumping zipline over the Niagara Gorge, offering unmatched views and excitement.
                                </p>
                            </div>
                            <div className='bg-black px-10 py-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Historical Insights</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    Delve deeper into the stories of the region with a guided tour of Fort George or a visit to the charming Niagara-on-the-Lake town, known for its colonial charm and rich heritage.
                                </p>
                            </div>
                            <div className='bg-black px-10 py-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Wine & Dine</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    Complement your visit with a luxurious wine tasting at one of Niagara's award-winning wineries, where local flavors meet world-class viticulture. Our curated Wine & Dine tours include vineyard visits, paired with gourmet meals in stunning locations overlooking the falls.
                                </p>
                            </div>
                        </div>
                        <div className='block md:hidden'>
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={40}
                                slidesPerView={1}
                                loop={true}
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 1 }
                                }}
                            >
                                <SwiperSlide>
                                <div className='bg-black px-10 py-10 min-h-[470px]' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Classic Falls Experience</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        Stand at the edge of the thundering Horseshoe Falls, where the raw power of nature is on full display. Our guides will take you to the best vantage points, ensuring you capture the perfect photo and gain insight into the geology and history of the falls.
                                    </p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-black px-10 py-10 min-h-[470px]' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Adventure Awaits</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        For thrill-seekers, embark on the legendary Hornblower Cruise, taking you right into the mist of the falls. Or, opt for an adrenaline-pumping zipline over the Niagara Gorge, offering unmatched views and excitement.
                                    </p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-black px-10 py-10 min-h-[470px]' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Historical Insights</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        Delve deeper into the stories of the region with a guided tour of Fort George or a visit to the charming Niagara-on-the-Lake town, known for its colonial charm and rich heritage.
                                    </p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-black px-10 py-10 min-h-[470px]' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Wine & Dine</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        Complement your visit with a luxurious wine tasting at one of Niagara's award-winning wineries, where local flavors meet world-class viticulture. Our curated Wine & Dine tours include vineyard visits, paired with gourmet meals in stunning locations overlooking the falls.
                                    </p>
                                </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        <div data-aos="fade-up">
                            <a href='/online-reservations' className='inline-block view-more-btn text-sm px-9 py-4 mt-5 mr-3 uppercase'>Book Now</a>
                            <a href='https://maps.app.goo.gl/YKPLgaV9XEWUdKay7' target='_blank' className='inline-block check-map-btn text-sm px-9 py-4 mt-5 uppercase'>Check Map</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="niagara-falls">
            <div className='bg-black'>
                <div className='grid grid-cols-1 lg:grid-cols-2' data-aos="fade-up">
                    <div>
                        <Image src={AreasBanner2} className='w-full h-full lg:h-90 object-cover' alt='Niagara Falls Tours by Limo Royale' />
                    </div>
                    <div className='p-5 md:py-10 md:px-10 flex flex-col'>
                        <small className='text-sm webColor uppercase'>Unveil the Majestic Power of Niagara Falls</small>
                        <h2 className='text-white text-2xl lg:text-4xl my-5'>Niagara Falls Tours by Limo Royale</h2>
                        <p className='text-base leading-relaxed webFontColor mt-5'>Discover the breathtaking grandeur of Niagara Falls, a natural wonder that has captivated millions. With Limo Royale’s Niagara Falls Tours, we provide more than just a viewing experience—we offer a complete, immersive journey that highlights the awe-inspiring beauty and history of this global landmark. Whether you’re a first-time visitor or returning for another dose of wonder, our tailored tours ensure you witness the falls in comfort, style, and luxury.</p>
                    </div>
                </div>
                <div className='pt-5 md:pt-10 lg:pt-8 pb-8'>
                    <div className='container mx-auto px-2'>
                        <h2 className='text-white text-2xl lg:text-3xl mb-8'>What Awaits You</h2>
                        <div className='hidden md:grid grid-cols-1 md:grid-cols-2 gap-5'>
                            <div className='bg-[#0a0a0a] p-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Exclusive Tastings</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    Gain private access to some of Niagara’s most prestigious vineyards. Savor small-batch wines, enjoy cellar tours, and meet winemakers who will share their passion and knowledge about their craft.
                                </p>
                            </div>
                            <div className='bg-[#0a0a0a] p-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Gourmet Pairings</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    Indulge in a gastronomic journey with curated food and wine pairings, where seasonal, local ingredients are perfectly matched with the region’s standout wines. 
                                </p>
                            </div>
                            <div className='bg-[#0a0a0a] p-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Behind-the-Scenes Access</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    Go beyond the tasting room with private tours of vineyards, production facilities, and barrel cellars, learning about the winemaking process from vine to bottle.
                                </p>
                            </div>
                            <div className='bg-[#0a0a0a] p-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Scenic Landscapes</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    Enjoy stunning views of sprawling vineyards and the Niagara Escarpment, offering a perfect backdrop to your luxurious tour. Relax, unwind, and immerse yourself in the serene beauty of wine country.
                                </p>
                            </div>
                        </div>
                        <div className='block md:hidden'>
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={40}
                                slidesPerView={1}
                                loop={true}
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 1 }
                                }}
                            >
                                <SwiperSlide>
                                <div className='bg-[#0a0a0a] p-10' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Exclusive Tastings</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        Gain private access to some of Niagara’s most prestigious vineyards. Savor small-batch wines, enjoy cellar tours, and meet winemakers who will share their passion and knowledge about their craft.
                                    </p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-[#0a0a0a] p-10' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Gourmet Pairings</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        Indulge in a gastronomic journey with curated food and wine pairings, where seasonal, local ingredients are perfectly matched with the region’s standout wines. 
                                    </p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-[#0a0a0a] p-10' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Behind-the-Scenes Access</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        Go beyond the tasting room with private tours of vineyards, production facilities, and barrel cellars, learning about the winemaking process from vine to bottle.
                                    </p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-[#0a0a0a] p-10' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Scenic Landscapes</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        Enjoy stunning views of sprawling vineyards and the Niagara Escarpment, offering a perfect backdrop to your luxurious tour. Relax, unwind, and immerse yourself in the serene beauty of wine country.
                                    </p>
                                </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        <div data-aos="fade-up">
                            <a href='/online-reservations' className='inline-block view-more-btn text-sm px-9 py-4 mt-5 mr-3 uppercase'>Book Now</a>
                            <a href='https://maps.app.goo.gl/1jA6Tca3RLnhTLPv8' target='_blank' className='inline-block check-map-btn text-sm px-9 py-4 mt-5 uppercase'>Check Map</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id='thousand-islands'>
            <div className='bg-[#0a0a0a]'>
                <div className='grid grid-cols-1 lg:grid-cols-2' data-aos="fade-up">
                    <div>
                        <Image src={AreasBanner3} className='w-full h-full lg:h-80 object-cover' alt='1000 Islands Tours by Limo Royale' />
                    </div>
                    <div className='p-5 md:py-10 md:px-10 flex flex-col'>
                        <small className='text-sm webColor uppercase'>Discover the Magic of the 1000 Islands</small>
                        <h2 className='text-white text-2xl lg:text-4xl my-5'>1000 Islands Tours by Limo Royale</h2>
                        <p className='text-base leading-relaxed webFontColor mt-5'>Nestled along the St. Lawrence River, the 1000 Islands region is a world of its own, filled with stunning natural beauty, historic castles, and charming island communities. With Limo Royale’s 1000 Islands Tours, you’ll experience this enchanting area in style, from luxurious boat cruises to exclusive access to hidden gems.</p>
                    </div>
                </div>
                <div className='pt-5 md:pt-10 lg:pt-8 pb-8'>
                    <div className='container mx-auto px-2'>
                        <h2 className='text-white text-2xl lg:text-3xl mb-8'>Explore the Enchantment</h2>
                        <div className='hidden md:grid grid-cols-1 md:grid-cols-2 gap-5'>
                            <div className='bg-black p-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Scenic Boat Cruises</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    Glide through the calm waters of the St. Lawrence River on a private boat tour, weaving between the islands while admiring picturesque cottages, lush greenery, and crystal-clear waters.
                                </p>
                            </div>
                            <div className='bg-black p-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Historic Castles</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    Visit Boldt Castle and Singer Castle, where you’ll learn about the fascinating history of these grand estates, built by millionaires during the Gilded Age. Enjoy exclusive access and guided tours of these iconic landmarks
                                </p>
                            </div>
                            <div className='bg-black p-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Outdoor Adventure</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    For nature lovers, embark on a kayaking tour, hike scenic trails, or enjoy fishing in some of the best spots in the region. Our tours can be customized to include a blend of adventure and relaxation.
                                </p>
                            </div>
                            <div className='bg-black p-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Private Island Experiences</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    Escape to a secluded island for a private picnic or wine tasting, enjoying the tranquility and beauty of your surroundings.
                                </p>
                            </div>
                        </div>
                        <div className='block md:hidden'>
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={40}
                                slidesPerView={1}
                                loop={true}
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 1 }
                                }}
                            >
                                <SwiperSlide>
                                <div className='bg-black p-10' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Scenic Boat Cruises</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        Glide through the calm waters of the St. Lawrence River on a private boat tour, weaving between the islands while admiring picturesque cottages, lush greenery, and crystal-clear waters.
                                    </p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-black p-10' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Historic Castles</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        Visit Boldt Castle and Singer Castle, where you’ll learn about the fascinating history of these grand estates, built by millionaires during the Gilded Age. Enjoy exclusive access and guided tours of these iconic landmarks
                                    </p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-black p-10' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Outdoor Adventure</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        For nature lovers, embark on a kayaking tour, hike scenic trails, or enjoy fishing in some of the best spots in the region. Our tours can be customized to include a blend of adventure and relaxation.
                                    </p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-black p-10' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Private Island Experiences</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        Escape to a secluded island for a private picnic or wine tasting, enjoying the tranquility and beauty of your surroundings.
                                    </p>
                                </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        <div data-aos="fade-up">
                            <a href='/online-reservations' className='inline-block view-more-btn text-sm px-9 py-4 mt-5 mr-3 uppercase'>Book Now</a>
                            <a href='https://maps.app.goo.gl/1jA6Tca3RLnhTLPv8' target='_blank' className='inline-block check-map-btn text-sm px-9 py-4 mt-5 uppercase'>Check Map</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id='toronto-city'>
            <div className='bg-black'>
                <div className='grid grid-cols-1 lg:grid-cols-2' data-aos="fade-up">
                    <div>
                        <Image src={AreasBanner4} className='w-full h-full lg:h-80 object-cover' alt='Toronto City Tours by Limo Royale' />
                    </div>
                    <div className='p-5 md:py-10 md:px-10 flex flex-col'>
                        <small className='text-sm webColor uppercase'>Experience the Heart of Toronto</small>
                        <h2 className='text-white text-2xl lg:text-4xl my-5'>Toronto City Tours by Limo Royale</h2>
                        <p className='text-base leading-relaxed webFontColor mt-5'>Toronto is Canada’s largest city and a melting pot of culture, history, and innovation. With Limo Royale’s Toronto City Tours, explore the city’s most famous landmarks, hidden gems, and vibrant neighborhoods in the lap of luxury. Whether you’re visiting for the first time or rediscovering the city’s charm, our tours offer an intimate look at Toronto’s diverse landscape.</p>
                    </div>
                </div>
                <div className='pt-5 md:pt-10 lg:pt-8 pb-8'>
                    <div className='container mx-auto px-2'>
                        <h2 className='text-white text-2xl lg:text-3xl mb-8'>Discover the Best of Toronto</h2>
                        <div className='hidden md:grid grid-cols-1 md:grid-cols-2 gap-5'>
                            <div className='bg-[#0a0a0a] p-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Iconic Landmarks</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    Stand atop the CN Tower, visit the historic Casa Loma, or explore the Royal Ontario Museum, home to fascinating exhibits on natural history and world cultures.
                                </p>
                            </div>
                            <div className='bg-[#0a0a0a] p-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Neighborhood Explorations</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    Walk the vibrant streets of Kensington Market, Chinatown, and the Distillery District, each offering its unique flavor of culture, art, and culinary experiences. 
                                </p>
                            </div>
                            <div className='bg-[#0a0a0a] p-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Culinary Adventures</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    Toronto is a foodie’s paradise. Our optional food tours take you through some of the city’s best restaurants and food markets, allowing you to sample everything from international cuisines to local delicacies.
                                </p>
                            </div>
                            <div className='bg-[#0a0a0a] p-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Art & Culture</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    Visit the Art Gallery of Ontario or explore the city’s dynamic street art scene, including iconic murals and graffiti alleyways that add a creative edge to the city’s landscape.
                                </p>
                            </div>
                        </div>
                        <div className='block md:hidden'>
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={40}
                                slidesPerView={1}
                                loop={true}
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 1 }
                                }}
                            >
                                <SwiperSlide>
                                <div className='bg-[#0a0a0a] p-10 min-h-[430px]' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Iconic Landmarks</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        Stand atop the CN Tower, visit the historic Casa Loma, or explore the Royal Ontario Museum, home to fascinating exhibits on natural history and world cultures.
                                    </p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-[#0a0a0a] p-10 min-h-[430px]' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Neighborhood Explorations</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        Walk the vibrant streets of Kensington Market, Chinatown, and the Distillery District, each offering its unique flavor of culture, art, and culinary experiences. 
                                    </p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-[#0a0a0a] p-10 min-h-[430px]' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Culinary Adventures</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        Toronto is a foodie’s paradise. Our optional food tours take you through some of the city’s best restaurants and food markets, allowing you to sample everything from international cuisines to local delicacies.
                                    </p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-[#0a0a0a] p-10 min-h-[430px]' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Art & Culture</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        Visit the Art Gallery of Ontario or explore the city’s dynamic street art scene, including iconic murals and graffiti alleyways that add a creative edge to the city’s landscape.
                                    </p>
                                </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        <div data-aos="fade-up">
                            <a href='/online-reservations' className='inline-block view-more-btn text-sm px-9 py-4 mt-5 mr-3 uppercase'>Book Now</a>
                            <a href='https://maps.app.goo.gl/fspJwJ1iHHB15DKx7' target='_blank' className='inline-block check-map-btn text-sm px-9 py-4 mt-5 uppercase'>Check Map</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id='ottawa-tours'>
            <div className='bg-[#0a0a0a]'>
                <div className='grid grid-cols-1 lg:grid-cols-2' data-aos="fade-up">
                    <div>
                        <Image src={AreasBanner5} className='w-full h-full lg:h-80 object-cover' alt='Ottawa Tours by Limo Royale' />
                    </div>
                    <div className='p-5 md:py-10 md:px-10 flex flex-col'>
                        <small className='text-sm webColor uppercase'>Uncover Canada’s Capital in Style</small>
                        <h2 className='text-white text-2xl lg:text-4xl my-5'>Ottawa Tours by Limo Royale</h2>
                        <p className='text-base leading-relaxed webFontColor mt-5'>Explore the political and cultural heart of Canada with Limo Royale’s Ottawa Tours. Rich in history and culture, Ottawa offers a perfect mix of iconic landmarks, world-class museums, and charming neighborhoods. Our tours ensure that you experience the best of the city, from the grandeur of Parliament Hill to the lively ByWard Market.</p>
                    </div>
                </div>
                <div className='pt-5 md:pt-10 lg:pt-8 pb-8'>
                    <div className='container mx-auto px-2'>
                        <h2 className='text-white text-2xl lg:text-3xl mb-8'>What You’ll Experience</h2>
                        <div className='hidden md:grid grid-cols-1 md:grid-cols-2 gap-5'>
                            <div className='bg-black p-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Parliament Hill</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    Delve into Canada’s rich political history with guided tours of the Parliament Buildings. Witness the Changing of the Guard and learn about the country’s legislative process.
                                </p>
                            </div>
                            <div className='bg-black p-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Museums & Galleries</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    Ottawa is home to some of the nation’s most important cultural institutions. Explore the Canadian Museum of History, the National Gallery of Canada, and the Canadian War Museum.
                                </p>
                            </div>
                            <div className='bg-black p-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Scenic Waterways</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    Enjoy a relaxing cruise along the Rideau Canal, a UNESCO World Heritage Site, and take in the picturesque beauty of Ottawa’s waterways.
                                </p>
                            </div>
                        </div>
                        <div className='block md:hidden'>
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={40}
                                slidesPerView={1}
                                loop={true}
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 1 }
                                }}
                            >
                                <SwiperSlide>
                                <div className='bg-black p-10 min-h-[400px]' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Parliament Hill</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        Delve into Canada’s rich political history with guided tours of the Parliament Buildings. Witness the Changing of the Guard and learn about the country’s legislative process.
                                    </p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-black p-10 min-h-[400px]' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Museums & Galleries</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        Ottawa is home to some of the nation’s most important cultural institutions. Explore the Canadian Museum of History, the National Gallery of Canada, and the Canadian War Museum.
                                    </p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-black p-10 min-h-[400px]' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Scenic Waterways</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        Enjoy a relaxing cruise along the Rideau Canal, a UNESCO World Heritage Site, and take in the picturesque beauty of Ottawa’s waterways.
                                    </p>
                                </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        <div data-aos="fade-up">
                            <a href='/online-reservations' className='inline-block view-more-btn text-sm px-9 py-4 mt-5 mr-3 uppercase'>Book Now</a>
                            <a href='https://maps.app.goo.gl/db2ZdGosJdCCHgiT8' target='_blank' className='inline-block check-map-btn text-sm px-9 py-4 mt-5 uppercase'>Check Map</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id='montreal-tours'>
            <div className='bg-black'>
                <div className='grid grid-cols-1 lg:grid-cols-2' data-aos="fade-up">
                    <div>
                        <Image src={AreasBanner6} className='w-full h-full lg:h-80 object-cover' alt='Montreal Tours by Limo Royale' />
                    </div>
                    <div className='p-5 md:py-10 md:px-10 flex flex-col'>
                        <small className='text-sm webColor uppercase'>Immerse Yourself in the Culture and History of Montreal</small>
                        <h2 className='text-white text-2xl lg:text-4xl my-5'>Montreal Tours by Limo Royale</h2>
                        <p className='text-base leading-relaxed webFontColor mt-5'>Montreal, Canada’s cultural capital, is known for its vibrant arts scene, stunning architecture, and culinary delights. With Limo Royale’s Montreal Tours, you’ll experience the best the city has to offer, from the old-world charm of Vieux-Montréal to the lively streets of Le Plateau.</p>
                    </div>
                </div>
                <div className='pt-5 md:pt-10 lg:pt-8 pb-8'>
                    <div className='container mx-auto px-2'>
                        <h2 className='text-white text-2xl lg:text-3xl mb-8'>What You’ll Experience</h2>
                        <div className='hidden md:grid grid-cols-1 md:grid-cols-2 gap-5'>
                            <div className='bg-[#0a0a0a] p-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Historic Old Montreal</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    Stroll through the cobblestone streets of Vieux-Montréal, where you’ll visit landmarks such as Notre-Dame Basilica and discover the city's French colonial past.
                                </p>
                            </div>
                            <div className='bg-[#0a0a0a] p-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Culinary Delights</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    Explore the flavors of Montreal with stops at iconic eateries, sampling local specialties like poutine, Montreal bagels, and fine French cuisine.
                                </p>
                            </div>
                            <div className='bg-[#0a0a0a] p-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Art & Culture</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    Visit the Montreal Museum of Fine Arts or catch a performance at the Place des Arts, home to world-class concerts, theater, and dance.
                                </p>
                            </div>
                            <div className='bg-[#0a0a0a] p-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Art & Culture</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    Visit the Art Gallery of Ontario or explore the city’s dynamic street art scene, including iconic murals and graffiti alleyways that add a creative edge to the city’s landscape.
                                </p>
                            </div>
                        </div>
                        <div className='block md:hidden'>
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={40}
                                slidesPerView={1}
                                loop={true}
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 1 }
                                }}
                            >
                                <SwiperSlide>
                                <div className='bg-[#0a0a0a] p-10 min-h-[380px]' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Historic Old Montreal</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        Stroll through the cobblestone streets of Vieux-Montréal, where you’ll visit landmarks such as Notre-Dame Basilica and discover the city's French colonial past.
                                    </p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-[#0a0a0a] p-10 min-h-[380px]' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Culinary Delights</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        Explore the flavors of Montreal with stops at iconic eateries, sampling local specialties like poutine, Montreal bagels, and fine French cuisine.
                                    </p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-[#0a0a0a] p-10 min-h-[380px]' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Art & Culture</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        Visit the Montreal Museum of Fine Arts or catch a performance at the Place des Arts, home to world-class concerts, theater, and dance.
                                    </p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-[#0a0a0a] p-10 min-h-[380px]' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Art & Culture</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        Visit the Art Gallery of Ontario or explore the city’s dynamic street art scene, including iconic murals and graffiti alleyways that add a creative edge to the city’s landscape.
                                    </p>
                                </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        <div data-aos="fade-up">
                            <a href='/online-reservations' className='inline-block view-more-btn text-sm px-9 py-4 mt-5 mr-3 uppercase'>Book Now</a>
                            <a href='https://maps.app.goo.gl/dKy6mEvuDeAB34mx5' target='_blank' className='inline-block check-map-btn text-sm px-9 py-4 mt-5 uppercase'>Check Map</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id='sault-marie-tours'>
            <div className='bg-[#0a0a0a]'>
                <div className='grid grid-cols-1 lg:grid-cols-2' data-aos="fade-up">
                    <div>
                        <Image src={AreasBanner7} className='w-full h-full lg:h-105 object-cover' alt='Sault Ste. Marie Tours by Limo Royale' />
                    </div>
                    <div className='p-5 md:py-10 md:px-10 flex flex-col'>
                        <small className='text-sm webColor uppercase'>Discover the Hidden Gems of Sault Ste. Marie in Luxury</small>
                        <h2 className='text-white text-2xl lg:text-4xl my-5'>Sault Ste. Marie Tours by Limo Royale</h2>
                        <p className='text-base leading-relaxed webFontColor mt-5'>Embark on a journey through the scenic landscapes and rich history of Sault Ste. Marie with Limo Royale’s exclusive tours. Nestled along the St. Marys River, this charming city offers a blend of natural beauty and historical significance that creates the perfect getaway for adventurers, nature lovers, and history enthusiasts alike. Our tours provide a luxurious and comfortable way to explore the hidden gems of Northern Ontario, allowing you to relax and take in the breathtaking sights as we handle all the details.</p>
                    </div>
                </div>
                <div className='pt-5 md:pt-10 lg:pt-8 pb-8'>
                    <div className='container mx-auto px-2'>
                        <h2 className='text-white text-2xl lg:text-3xl mb-8'>What You’ll Experience</h2>
                        <div className='hidden md:grid grid-cols-1 md:grid-cols-2 gap-5'>
                            <div className='bg-black p-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Soo Locks Experience</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    Witness the engineering marvel of the Soo Locks, where large ships navigate between Lake Superior and the lower Great Lakes. Learn about their importance in North American maritime history and witness the intricate operation firsthand.
                                </p>
                            </div>
                            <div className='bg-black p-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Historic Landmarks</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    Dive into the region’s past with a visit to the Canadian Bushplane Heritage Centre, showcasing Canada’s aviation history, or explore the Ermatinger-Clergue National Historic Site, where the city’s colonial heritage comes to life.
                                </p>
                            </div>
                            <div className='bg-black p-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Outdoor Adventures</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    Take in the pristine natural beauty surrounding Sault Ste. Marie. Whether you’re hiking, fishing, or boating along the St. Marys River, our tours allow you to experience Northern Ontario’s wilderness in all its glory.
                                </p>
                            </div>
                            <div className='bg-black p-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Personalized Itinerarie</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    Choose from a variety of activities and experiences, tailoring your tour to suit your interests, whether it’s cultural exploration or outdoor recreation.
                                </p>
                            </div>
                        </div>
                        <div className='block md:hidden'>
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={40}
                                slidesPerView={1}
                                loop={true}
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 1 }
                                }}
                            >
                                <SwiperSlide>
                                <div className='bg-black p-10 min-h-[450px]' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Soo Locks Experience</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        Witness the engineering marvel of the Soo Locks, where large ships navigate between Lake Superior and the lower Great Lakes. Learn about their importance in North American maritime history and witness the intricate operation firsthand.
                                    </p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-black p-10 min-h-[450px]' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Historic Landmarks</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        Dive into the region’s past with a visit to the Canadian Bushplane Heritage Centre, showcasing Canada’s aviation history, or explore the Ermatinger-Clergue National Historic Site, where the city’s colonial heritage comes to life.
                                    </p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-black p-10 min-h-[450px]' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Outdoor Adventures</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        Take in the pristine natural beauty surrounding Sault Ste. Marie. Whether you’re hiking, fishing, or boating along the St. Marys River, our tours allow you to experience Northern Ontario’s wilderness in all its glory.
                                    </p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-black p-10 min-h-[450px]' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Personalized Itinerarie</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        Choose from a variety of activities and experiences, tailoring your tour to suit your interests, whether it’s cultural exploration or outdoor recreation.
                                    </p>
                                </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        <div data-aos="fade-up">
                            <h5 className='text-white text-2xl lg:text-2xl mt-5'>With Limo Royale, you’ll enjoy the perfect blend of luxury and adventure in Sault Ste. Marie.</h5>
                            <a href='/online-reservations' className='inline-block view-more-btn text-sm px-9 py-4 mt-5 mr-3 uppercase'>Book Now</a>
                            <a href='https://maps.app.goo.gl/s4xJyRBUi3Y955YQ7' target='_blank' className='inline-block check-map-btn text-sm px-9 py-4 mt-5 uppercase'>Check Map</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div id='blue-mountains-tours'>
            <div className='bg-black'>
                <div className='grid grid-cols-1 lg:grid-cols-2' data-aos="fade-up">
                    <div>
                        <Image src={AreasBanner8} className='w-full h-full lg:h-90 object-cover' alt='Blue Mountains Tours by Limo Royale' />
                    </div>
                    <div className='p-5 md:py-10 md:px-10 flex flex-col'>
                        <small className='text-sm webColor uppercase'>Escape to the Tranquility and Adventure of the Blue Mountains</small>
                        <h2 className='text-white text-2xl lg:text-4xl my-5'>Blue Mountains Tours by Limo Royale</h2>
                        <p className='text-base leading-relaxed webFontColor mt-5'>Discover the natural beauty and outdoor thrills of Ontario’s Blue Mountains with Limo Royale’s luxurious tours. Known for its breathtaking vistas, charming villages, and year-round outdoor activities, the Blue Mountains is the ideal destination for both relaxation and adventure. With Limo Royale, you’ll enjoy personalized service, comfortable travel, and an unforgettable experience, whether you’re seeking a scenic escape or action-packed fun.</p>
                    </div>
                </div>
                <div className='pt-5 md:pt-10 lg:pt-8 pb-8'>
                    <div className='container mx-auto px-2'>
                        <h2 className='text-white text-2xl lg:text-3xl mb-8'>What You’ll Experience</h2>
                        <div className='hidden md:grid grid-cols-1 md:grid-cols-2 gap-5'>
                            <div className='bg-[#0a0a0a] p-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Scenic Views & Lookouts</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    Take in panoramic views of Georgian Bay and the surrounding countryside from top lookouts such as Blue Mountain Lookout and Scenic Caves Nature Adventures. These stunning vistas provide the perfect backdrop for a peaceful getaway.
                                </p>
                            </div>
                            <div className='bg-[#0a0a0a] p-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Outdoor Adventure</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    Whether you're skiing or snowboarding in the winter or hiking and zip-lining in the warmer months, the Blue Mountains offers a variety of activities for every season. Enjoy guided outdoor excursions tailored to your interests, from trekking the famous Bruce Trail to gliding across the slopes at Blue Mountain Resort.
                                </p>
                            </div>
                            <div className='bg-[#0a0a0a] p-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Charming Village Life</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    Explore the quaint charm of Blue Mountain Village, with its boutique shops, cozy cafes, and vibrant dining scene. Experience the warm hospitality of this year-round resort community, where you can unwind after a day of adventure.
                                </p>
                            </div>
                            <div className='bg-[#0a0a0a] p-10' data-aos="fade-up">
                                <h4 className='text-white text-2xl lg:text-2xl mb-5'>Custom Itineraries</h4>
                                <p className='text-base leading-relaxed webFontColor'>
                                    Choose your ideal balance of relaxation and adventure. Whether it’s a spa retreat, a wine tasting tour, or a day filled with outdoor activities, we will create a personalized itinerary that meets your every need.
                                </p>
                            </div>
                        </div>
                        <div className='block md:hidden'>
                            <Swiper
                                modules={[Autoplay]}
                                spaceBetween={40}
                                slidesPerView={1}
                                loop={true}
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 1 }
                                }}
                            >
                                <SwiperSlide>
                                <div className='bg-[#0a0a0a] p-10 min-h-[560px]' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Scenic Views & Lookouts</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        Take in panoramic views of Georgian Bay and the surrounding countryside from top lookouts such as Blue Mountain Lookout and Scenic Caves Nature Adventures. These stunning vistas provide the perfect backdrop for a peaceful getaway.
                                    </p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-[#0a0a0a] p-10 min-h-[560px]' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Outdoor Adventure</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        Whether you're skiing or snowboarding in the winter or hiking and zip-lining in the warmer months, the Blue Mountains offers a variety of activities for every season. Enjoy guided outdoor excursions tailored to your interests, from trekking the famous Bruce Trail to gliding across the slopes at Blue Mountain Resort.
                                    </p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-[#0a0a0a] p-10 min-h-[560px]' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Charming Village Life</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        Explore the quaint charm of Blue Mountain Village, with its boutique shops, cozy cafes, and vibrant dining scene. Experience the warm hospitality of this year-round resort community, where you can unwind after a day of adventure.
                                    </p>
                                </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                <div className='bg-[#0a0a0a] p-10 min-h-[560px]' data-aos="fade-up">
                                    <h4 className='text-white text-2xl lg:text-2xl mb-5'>Custom Itineraries</h4>
                                    <p className='text-base leading-relaxed webFontColor'>
                                        Choose your ideal balance of relaxation and adventure. Whether it’s a spa retreat, a wine tasting tour, or a day filled with outdoor activities, we will create a personalized itinerary that meets your every need.
                                    </p>
                                </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        <div data-aos="fade-up">
                            <h5 className='text-white text-2xl lg:text-2xl mt-8'>Escape to the serenity of the Blue Mountains and let Limo Royale deliver a travel experience defined by comfort, luxury, and breathtaking landscapes.</h5>
                            <a href='/online-reservations' className='inline-block view-more-btn text-sm px-9 py-4 mt-5 mr-3 uppercase'>Book Now</a>
                            <a href='https://maps.app.goo.gl/dKy6mEvuDeAB34mx5' target='_blank' className='inline-block check-map-btn text-sm px-9 py-4 mt-5 uppercase'>Check Map</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}

export default AreasServed