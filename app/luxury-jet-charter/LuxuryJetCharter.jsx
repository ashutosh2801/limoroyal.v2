'use client'
import Image from 'next/image'
import ServiceSidePanel from '../components/ServiceSidePanel'
import ServiceFaq from '../components/ServiceFaq'
import CustomerExperiences from '../components/CustomerExperiences'
import jetBanner from '../../public/assets/services/jet-service.jpg'

const LuxuryJetCharter = () => {
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
                            <li>Luxury Jet Charter</li>
                            </ul>
                        </div>
                        <h2 className='text-white text-2xl lg:text-6xl leading-snug my-5 font-medium'>Luxury Jet Charter</h2>
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
                            <Image src={jetBanner} className='w-full h-full' alt='Luxury Jet Charter service' />
                        </div>
                        <div className='border-b webBorderColor pb-10 mb-10' data-aos="fade-up">
                            <h1 className='text-white text-2xl lg:text-4xl mt-10 mb-5 lg:mb-10'>Luxury Jet Charter</h1>
                            <p className='webFontColor text-base leading-relaxed'>
                                Our Luxury Jet Charter service offers a seamless and exclusive flying experience, ensuring you travel in the utmost comfort and style. With access to a fleet of private jets, you can enjoy personalized amenities, spacious cabins, and first-class service from start to finish. Whether for business or leisure, our jet charters guarantee a smooth, stress-free journey tailored to your needs.<br></br><br></br>

                                Each flight is crafted to offer the highest level of privacy and convenience. You can choose your preferred departure time, and bypass the hassles of commercial travel, including long security lines and delays. Our team ensures that every detail, from in-flight services to ground transportation, is handled efficiently.<br></br><br></br>

                                Our jets are equipped with the latest technology and luxury features, including reclining seats, gourmet meals, and premium entertainment options. Whether you’re flying solo or with a group, our jets provide the ultimate in comfort and flexibility. The experience is all about you, allowing you to relax, work, or even host meetings onboard.<br></br><br></br>

                                With our Luxury Jet Charter service, you not only get to your destination quickly but also enjoy an experience that is unparalleled in comfort and luxury. We offer an exceptional level of service that redefines air travel, making it a truly extraordinary way to fly.
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

export default LuxuryJetCharter