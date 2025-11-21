'use client'
import Image from 'next/image'
import ServiceSidePanel from '../components/ServiceSidePanel'
import LadiesNightBanner from '../../public/assets/services/ladies-nightout.jpg'
import CustomerExperiences from '../components/CustomerExperiences'
import ServiceFaq from '../components/ServiceFaq'

const LadiesNightOutLimoService = () => {
  return (
    <main>
        <div>
            <div className='relative'>
                <div className='page-bg object-cover absolute h-[450px] lg:h-[550px] inset-0 opacity-50'></div>
                <div className='relative z-10 pt-50 lg:pt-60 xl:pt-80 pb-30 md:pb-30 xl:pb-10'>
                    <div className='container mx-auto px-2'>
                        <div>
                            <ul className='breadcrumb uppercase webColor text-sm flex'>
                            <li><a href='/'>Home</a></li>
                            <li>Ladies Night Out Limo Service</li>
                            </ul>
                        </div>
                        <h2 className='text-white text-2xl lg:text-6xl leading-snug my-5 font-medium'>Ladies Night Out<br></br> Limo Service</h2>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className='container mx-auto px-2'>
                <div className='flex flex-col-reverse md:flex-row md:space-x-8 justify-between pt-15 pb-5 md:pb-15 space-y-6 lg:space-y-0'>
                    <ServiceSidePanel />
                    <div className='w-full md:w-3/5 lg:w-2/3'>
                        <div data-aos="fade-up">
                            <Image src={LadiesNightBanner} className='w-full h-full' alt='Limo Royale’s Ladies Night Out Limo Service' />
                        </div>
                        <div className='border-b webBorderColor pb-10 mb-10' data-aos="fade-up">
                            <h1 className='text-white text-2xl lg:text-4xl mt-10 mb-5 lg:mb-10'>Experience a Night of Fun, Glamour, and Luxury</h1>
                            <p className='webFontColor text-base leading-relaxed'>
                                Whether you’re planning a night out with your closest friends, celebrating a special occasion, or simply indulging in an evening of fun, <b>Limo Royale’s Ladies Night Out Limo Service</b> is the ultimate way to elevate your experience. From chic restaurants to trendy clubs or a sophisticated evening at a theater, we ensure your group travels in style, luxury, and comfort. Our exclusive fleet and professional chauffeurs will make your night truly unforgettable.
                            </p>
                            <b className='text-white w-full block mb-5 mt-5'>Why Choose Limo Royale for Your Ladies Night?</b>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>Luxury Fleet: </b>Our premium fleet of limousines, sedans, and SUVs offers the perfect ride for your night out. Enjoy plush seating, mood lighting, and the latest entertainment systems, creating the perfect prelude to your evening.</li>
                                <li><b>Royale Chauffeurs: </b>Our experienced <b>Royale Chauffeurs</b> are dedicated to making your night as smooth and enjoyable as possible. With <b>15-20 years of experience</b>, they ensure that your group is transported safely and punctually while you focus on having fun.</li>
                                <li><b>VIP Treatment: </b>At <b>Limo Royale</b>, we believe every ladies’ night should feel like a VIP event. We offer complimentary perks such as chilled champagne, custom lighting, and personalized music selections to set the tone for an unforgettable night.</li>
                            </ul>
                            <b className='text-white w-full block mb-5 mt-5'>Our Ladies Night Services Include:</b>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>Nightclub and Bar Hopping: </b>Forget about worrying about parking or designating a driver—our chauffeur service allows you to enjoy your night without a care in the world. Whether it’s a tour of the hottest nightclubs or an evening of bar hopping, we ensure you arrive in style and make an entrance wherever you go.</li>
                                <li><b>Dinner and Drinks: </b>Kick off your evening with dinner at a fine restaurant, followed by a night of drinks and dancing. Our limos offer a luxurious space to relax between venues, so you can enjoy every moment of your night out.</li>
                                <li><b>Theater, Concerts, and Events: </b>Planning an elegant evening at the theater or a concert? <b>Limo Royale</b> ensures that your night is stress-free and luxurious, from your front door to the venue and back.</li>
                                <li><b>Custom Itineraries: </b>Create the perfect night out for your group with a fully customized itinerary. Whether you’re visiting multiple locations or planning a surprise stop, we work with you to ensure your night goes exactly as planned.</li>
                            </ul>
                            <b className='text-white w-full block mb-5 mt-5'>Why Limo Royale for Your Ladies Night Out?</b>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>Luxury at Every Turn: </b>From the moment you step into one of our limos, you’ll be surrounded by elegance and comfort. We ensure that every detail is taken care of, from the drinks to the music, so that you can focus on enjoying your night.</li>
                                <li><b>Safety and Reliability: </b>At <b>Limo Royale</b>, your safety is our top priority. Our chauffeurs are not only skilled drivers but also trained to provide the highest levels of professionalism and discretion, ensuring you can enjoy your night worry-free.</li>
                                <li><b>Unforgettable Experience: </b>A night out with Limo Royale isn’t just about transportation—it’s about creating an experience. Whether it’s a special occasion or simply a fun night out with the girls, we make sure it’s a night you’ll remember for years to come.</li>
                            </ul>
                            <b className='text-white w-full block mb-5 mt-5'>Ladies Night Packages</b>
                            <p className='webFontColor text-base mt-5'>We offer flexible packages to accommodate all types of nights out:</p><br></br><br></br>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>Classic Night Out Package: </b>Includes transportation to your choice of dinner and entertainment venues, with options for multiple stops throughout the evening.</li>
                                <li><b>VIP Night Out Package: </b>For those looking for an exclusive experience, this package includes a premium vehicle, personalized services, and special extras like complimentary champagne and snacks.</li>
                                <li><b>Custom Night Out Package: </b>Design your perfect night with a customized itinerary, including multiple stops, personal chauffeur service, and all the luxuries you deserve.</li>
                            </ul>
                            <p className='webFontColor text-base mt-5'>Get ready for a night of fun, laughter, and luxury with <b>Limo Royale’s Ladies Night Out Limo Service. Book today</b>, and let us take care of the ride while you focus on making memories.</p>
                        </div>
                        <div data-aos="fade-up">
                            <ServiceFaq />
                        </div>
                        <div data-aos="fade-up">
                            <CustomerExperiences />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}

export default LadiesNightOutLimoService