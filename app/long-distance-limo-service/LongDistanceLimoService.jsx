'use client'
import Image from 'next/image'
import ServiceSidePanel from '../components/ServiceSidePanel'
import ServiceFaq from '../components/ServiceFaq'
import CustomerExperiences from '../components/CustomerExperiences'
import LongDistanceBanner from '../../public/assets/services/long-distance.jpg'

const LongDistanceLimoService = () => {
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
                            <li>Long Distance Limo Service</li>
                            </ul>
                        </div>
                        <h2 className='text-white text-2xl lg:text-6xl leading-snug my-5 font-medium'>Long Distance<br></br> Limo Service</h2>
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
                            <Image src={LongDistanceBanner} className='w-full h-full' alt='Long Distance Limo & Airport Limo Transfers' />
                        </div>
                        <div className='border-b webBorderColor pb-10 mb-10' data-aos="fade-up">
                            <h1 className='text-white text-2xl lg:text-4xl mt-10 mb-5 lg:mb-10'>Luxury and Comfort for Every Mile</h1>
                            <p className='webFontColor text-base leading-relaxed'>
                                When it comes to long-distance travel, <b>Limo Royale</b> ensures that your journey is as luxurious and seamless as your destination. Whether you’re traveling between cities, heading to a special event, or simply prefer the convenience of door-to-door transportation, our <b>Long Distance Limo Service</b> is designed to provide comfort, elegance, and safety throughout the entire trip. <br></br><br></br>With our fleet of top-of-the-line luxury vehicles and professional <b>Royale Chauffeurs</b>, every mile is an experience in itself, combining relaxation, convenience, and exclusivity.
                            </p>
                            <b className='text-white w-full block mb-5 mt-5'>Why Choose Limo Royale for Long Distance Travel?</b>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>Unmatched Comfort: </b>Our fleet includes spacious, meticulously maintained vehicles that allow you to relax on long trips. Whether you’re traveling alone or with a group, our limousines, sedans, and SUVs are designed to offer maximum comfort for long-distance journeys, with features like reclining leather seats, climate control, and entertainment systems.</li>

                                <li><b>Royale Chauffeurs: </b>Our professional chauffeurs have <b>15-20 years of experience</b>, ensuring that your trip is smooth, safe, and timely. With expert knowledge of routes, traffic conditions, and local shortcuts, they handle the drive while you enjoy the journey.</li>

                                <li><b>Convenience at Your Fingertips: </b>Say goodbye to the stress of navigating airports, train stations, or highways. With <b>Limo Royale</b>, you enjoy <b>door-to-door service</b>, picking you up from your location and dropping you at your destination with no hassle. Your comfort and convenience are our top priorities.</li>
                            </ul>
                            <b className='text-white w-full block mb-5 mt-5'>Key Features of Our Long Distance Service:</b>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>Luxury Fleet for Long Journeys: </b>Our vehicles are equipped with features to make long-distance travel a breeze, including WiFi, charging ports, plush leather seating, and entertainment systems. Whether you need to work on the go or relax in style, we provide the tools to make your journey productive and enjoyable.</li>

                                <li><b>Bachelor and Bachelorette Parties: </b>We understand that no two trips are the same. At Limo Royale, we work with you to create a tailored itinerary that suits your needs, offering flexible stops along the way for meals, breaks, or sightseeing.</li>

                                <li><b>Customizable Itineraries: </b>We understand that no two trips are the same. At <b>Limo Royale</b>, we work with you to create a tailored itinerary that suits your needs, offering flexible stops along the way for meals, breaks, or sightseeing.</li>

                                <li><b>Privacy and Peace of Mind: </b>For those seeking privacy, our long-distance service ensures a quiet and comfortable environment, allowing you to relax or conduct business in total discretion.</li>

                                <li><b>Safe and Reliable: </b>Safety is a priority at <b>Limo Royale</b>. Our experienced chauffeurs follow the safest routes and adjust to road conditions to ensure that you arrive at your destination not only in style but also securely.</li>
                            </ul>
                            <b className='text-white w-full block mb-5 mt-5'>Perfect for:</b>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>City-to-City Travel: </b>Whether you’re traveling for business or leisure, enjoy the luxury of a chauffeur-driven ride between major cities, avoiding the hassle of public transport.</li>

                                <li><b>Event and Destination Transfers: </b>Heading to a wedding, corporate event, or family gathering in a neighboring city? <b>Limo Royale</b> provides the ultimate long-distance transportation, ensuring you arrive refreshed and ready.</li>

                                <li><b>Business Travel: </b>For executives who value time and comfort, our long-distance limo service is an excellent alternative to flying or driving yourself. Focus on work or relax while we take care of the rest.</li>
                            </ul>

                            <b className='text-white w-full block mb-5 mt-5'>Celebration Packages</b>
                            <p className='webFontColor text-base mt-5'>At <b>Limo Royale</b>, we believe that the journey should be as enjoyable as the destination. Our <b>Long Distance Limo Service</b> is designed for clients who value luxury, comfort, and professionalism. Whether you need to travel across the province or to another city, we ensure that your experience is one of relaxation and refinement.<br></br><br></br>
                            <b>Book your Long Distance Limo Service with Limo Royale</b> today, and experience the difference in every mile.
                            </p>
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

export default LongDistanceLimoService