'use client'
import Image from 'next/image'
import ServiceSidePanel from '../components/ServiceSidePanel'
import ServiceFaq from '../components/ServiceFaq'
import CustomerExperiences from '../components/CustomerExperiences'
import proBanner from '../../public/assets/services/protection-service.jpg'

const CloseProtectionService = () => {
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
                            <li>Close Protection Service</li>
                            </ul>
                        </div>
                        <h2 className='text-white text-2xl lg:text-6xl leading-snug my-5 font-medium'>Close Protection Service</h2>
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
                            <Image src={proBanner} className='w-full h-full' alt='Close Protection Service Toronto' />
                        </div>
                        <div className='border-b webBorderColor pb-10 mb-10' data-aos="fade-up">
                            <h1 className='text-white text-2xl lg:text-4xl mt-10 mb-5 lg:mb-10'>Close Protection Service</h1>
                            <p className='webFontColor text-base leading-relaxed'>
                                Our Close Protection Service ensures your safety in every situation, offering discreet, high-level security for executives, public figures, and individuals in need of personal protection. Our team of trained professionals is skilled in assessing risks and neutralizing potential threats, allowing you to carry on with your daily activities confidently and securely.<br></br><br></br>

                                We provide tailored protection plans to meet your specific needs, whether for a short-term event or long-term assignment. Our security experts work closely with clients to evaluate potential vulnerabilities, taking a proactive approach to your personal safety. Our close protection agents are highly trained in surveillance, defensive driving, and conflict resolution, ensuring seamless security without intruding on your privacy.<br></br><br></br>

                                With our Close Protection Service, you are assured 24/7 safety management, whether at public events, during travel, or in the comfort of your residence. Our team coordinates all logistics, securing venues, travel routes, and other aspects of your life to minimize any risk. Equipped with the latest technology, we offer round-the-clock monitoring and real-time reporting, adapting quickly to changing circumstances.<br></br><br></br>

                                Whether you require individual security or protection for your family and associates, we provide peace of mind with our highly skilled, professional service. Each client’s well-being is our top priority, and we maintain the highest standards of discretion and professionalism. With us, you can move through the world confidently, knowing that your security is in expert hands.
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

export default CloseProtectionService