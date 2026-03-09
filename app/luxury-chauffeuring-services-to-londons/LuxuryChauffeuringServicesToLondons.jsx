'use client'
import Image from 'next/image'
import ServiceSidePanel from '../components/ServiceSidePanel'
import ServiceFaq from './ServiceFaq'
import chauffeuringBanner from '../../public/assets/services/chauffeuring-services.jpg'
import CustomerExperiences from '../components/CustomerExperiences'

const LuxuryChauffeuringServicesToLondons = () => {
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
                            <li>Luxury Chauffeuring Services</li>
                            </ul>
                        </div>
                        <h2 className='text-white text-2xl lg:text-6xl leading-snug my-5 font-medium'>Luxury Chauffeuring<br></br> Services</h2>
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
                            <Image src={chauffeuringBanner} className='w-full h-full' alt='Luxury Chauffeuring Services' />
                        </div>
                        <div className='border-b webBorderColor pb-10 mb-10' data-aos="fade-up">
                            <h1 className='text-white text-2xl lg:text-4xl mt-10 mb-5 lg:mb-10'>Luxury Chauffeuring Services at your Fingertips</h1>
                            <p className='webFontColor text-base leading-relaxed'>
                                We provide luxury chauffeuring services for any event. Be it a wedding, corporate event, or simply any occasion, our professional chauffeurs are ready to take you in complete luxury and comfort. We ensure a smooth and timely journey to your destination. From pick-up to drop-off, you are guaranteed professionalism all throughout the journey.<br></br><br></br>

                                Our fleet consists of high-end, well-maintained vehicles equipped with all amenities required for a comfortable and luxurious journey. The inclusion of plush interiors and every other detail are carefully considered to give you the best airport transfer experience. Our stylish vehicles are what every executive or business prefers when it comes to corporate travel.<br></br><br></br>

                                We provide luxury chauffeuring services with our highly-trained chauffeurs who display professionalism at the highest level. They ensure the safety of each and every client they provide transport services for. They know the best routes in the city and how to optimize to provide efficient and effective transportation services to clients. Trust them for a stress-free and enjoyable journey to your destination.<br></br><br></br>

                                You may embark in a professional or personal journey, we are there for you all the way from the start to the end!

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

export default LuxuryChauffeuringServicesToLondons