'use client'
import Image from 'next/image'
import ServiceSidePanel from '../components/ServiceSidePanel'
import ServiceFaq from '../components/ServiceFaq'
import CustomerExperiences from '../components/CustomerExperiences'
import seaBanner from '../../public/assets/services/sea-service.jpg'

const SeaportsTransport = () => {
  return (
    <main>
        <div>
        <div>
            <div className='relative'>
                <div className='page-bg object-cover absolute h-[450px] lg:h-[550px] inset-0 opacity-50'></div>
                <div className='relative z-10 pt-50 lg:pt-80 pb-30'>
                    <div className='container mx-auto px-2'>
                        <div>
                            <ul className='breadcrumb uppercase webColor text-sm flex'>
                            <li><a href='/'>Home</a></li>
                            <li>Seaports Transport</li>
                            </ul>
                        </div>
                        <h2 className='text-white text-2xl lg:text-6xl leading-snug my-5 font-medium'>Seaports Transport</h2>
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
                            <Image src={seaBanner} className='w-full h-full' alt='Seaports Transport Toronto' />
                        </div>
                        <div className='border-b webBorderColor pb-10 mb-10' data-aos="fade-up">
                            <h1 className='text-white text-2xl lg:text-4xl mt-10 mb-5 lg:mb-10'>Seaports Transport</h1>
                            <p className='webFontColor text-base leading-relaxed'>
                                Our Seaports Transport service ensures you enjoy a hassle-free experience when arriving at or departing from the port. Whether you are a passenger on a cruise or a visitor to the coast, we provide reliable and luxury transportation to and from the seaport, offering peace of mind and convenience.<br></br><br></br>

We understand that time is of the essence, especially when catching a cruise or a flight after a port visit. Our chauffeurs are punctual and familiar with all the best routes, ensuring you arrive on time, stress-free, and in style.<br></br><br></br>

Our fleet of vehicles, ranging from luxury sedans to spacious SUVs, offers both comfort and ample space for your luggage. We cater to both individuals and large groups, offering flexible transportation options to accommodate your specific needs.<br></br><br></br>

With our professional service, you can enjoy seamless transport from the port to your destination. Let us handle the logistics so you can relax and enjoy your journey, whether it’s heading to the city, the airport, or a nearby hotel.
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
    </div>
    </main>
  )
}

export default SeaportsTransport