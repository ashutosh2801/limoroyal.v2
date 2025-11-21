'use client'
import Image from 'next/image'
import ServiceSidePanel from '../components/ServiceSidePanel'
import AirportBanner from '../../public/assets/services/airport-service.jpg'
import CustomerExperiences from '../components/CustomerExperiences'
import ServiceFaq from '../components/ServiceFaq'

const AirportTransfers = () => {
  return (
    <main>
        <div>
            <div className='relative'>
                <div className='page-bg object-cover absolute h-[450px] lg:h-[550px] inset-0 opacity-50'></div>
                <div className='relative z-10 pt-50 lg:pt-80 pb-30 md:pb-30 xl:pb-10'>
                    <div className='container mx-auto px-2'>
                        <div>
                            <ul className='breadcrumb uppercase webColor text-sm flex'>
                            <li><a href='/'>Home</a></li>
                            <li>Airport Transfers</li>
                            </ul>
                        </div>
                        <h2 className='text-white text-2xl lg:text-6xl leading-snug my-5 font-medium'>Airport Transfers</h2>
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
                            <Image src={AirportBanner} className='w-full h-full' alt='Airport Transfers Toronto' />
                        </div>
                        <div className='border-b webBorderColor pb-10 mb-10' data-aos="fade-up">
                            <h1 className='text-white text-2xl lg:text-4xl mt-10 mb-5 lg:mb-10'>Seamless and Luxurious Airport Transfers</h1>
                            <p className='webFontColor text-base leading-relaxed'>
                                Traveling to and from the airport should be a smooth, stress-free experience, and at <b>Limo Royale</b>, we make sure your journey is nothing less than exceptional. Whether you’re traveling for business or leisure, our <b>Airport Limo Service</b> provides punctual, comfortable, and luxurious transportation, ensuring you arrive in style and on time. With our premium fleet of vehicles and professional <b>Royale Chauffeurs</b>, we take the hassle out of airport transportation and elevate it to a royal experience.
                            </p>
                            <b className='text-white w-full block mb-5 mt-5'>Why Choose Limo Royale for Airport Transfers?</b>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>Luxury Fleet: </b>Our fleet of luxury sedans, SUVs, and limousines ensures that your ride to or from the airport is as comfortable as it is stylish. Enjoy spacious, plush seating, WiFi, and advanced climate control, all designed to provide a relaxing and refined environment.</li>
                                <li><b>Punctuality is Key: </b>We understand the importance of time when it comes to catching flights or picking up travelers. Our Royale Chauffeurs closely monitor your flight schedule, ensuring prompt pickups and drop-offs. We adjust for any flight delays or early arrivals so that you’re never left waiting.</li>
                                <li><b>Experienced Chauffeurs: </b>Our highly professional chauffeurs, with <b>15-20 years of experience</b>, are experts in navigating busy airports and traffic conditions. They ensure you have a smooth ride, handling luggage and offering personalized assistance to make your journey completely hassle-free.</li>
                            </ul>
                            <b className='text-white w-full block mb-5 mt-5'>Services We Offer:</b>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>Pickups and Drop-offs: </b>Whether you need transportation to or from the airport, we provide door-to-door service, ensuring you arrive at your destination on time and in style.</li>
                                <li><b>Flight Monitoring: </b>Our team monitors your flight in real-time, making adjustments to your pickup time as needed. This ensures timely service, even if your flight schedule changes.</li>
                                <li><b>Meet and Greet: </b>For added convenience, we offer a meet-and-greet service where your chauffeur will be waiting for you at arrivals, ready to assist with luggage and provide a warm welcome.</li>
                                <li><b>Corporate Airport Transfers: </b>For business travelers, we offer discrete and professional transportation that ensures you or your clients can travel in comfort while staying connected and productive.</li>
                            </ul>
                            <b className='text-white w-full block mb-5 mt-5'>Benefits of Choosing Limo Royale for Airport Transfers</b>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>Stress-Free Travel: </b>Eliminate the hassle of navigating traffic, parking, or dealing with rental cars. With Limo Royale, we take care of all the details so that you can relax and enjoy your journey.</li>
                                <li><b>Privacy and Discretion: </b>Whether traveling for business or leisure, our Royale Chauffeurs provide a professional and discreet service, allowing you to focus on what’s important.</li>
                                <li><b>Global Connectivity: </b>We cater to international travelers arriving from all over the world. Our team speaks multiple languages and understands the needs of high-profile clients who expect a seamless experience from airport to destination.</li>
                            </ul>
                            <b className='text-white w-full block mb-5 mt-5'>Perfect for:</b>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>Stress-Free Travel: </b>For executives needing punctual, reliable transportation to and from the airport.</li>
                                <li><b>Family Vacations: </b>Ensure your family travels in comfort and luxury, with plenty of space for luggage and the convenience of door-to-door service.</li>
                                <li><b>VIP Guests: </b>Treat high-profile guests or clients to the ultimate travel experience with our premium airport limo service, ensuring they are met with luxury and elegance upon arrival.</li>
                            </ul>
                            <p className='webFontColor text-base mt-5'>Experience a smooth and luxurious journey to or from the airport with Limo Royale’s Airport Limo Service. Book today and let us take care of your travel needs, ensuring every part of your trip is seamless and stylish.</p>
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

export default AirportTransfers