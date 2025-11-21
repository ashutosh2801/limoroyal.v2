'use client'
import Image from 'next/image'
import ServiceSidePanel from '../components/ServiceSidePanel'
import ServiceFaq from '../components/ServiceFaq'
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
                            <h1 className='text-white text-2xl lg:text-4xl mt-10 mb-5 lg:mb-10'>Luxury Chauffeuring Services</h1>
                            <p className='webFontColor text-base leading-relaxed'>
                                Our Luxury Chauffeuring Services offer an elevated level of comfort and professionalism for any occasion. Whether you’re attending a corporate event, a wedding, or simply need a luxurious ride to the airport, our experienced chauffeurs ensure a smooth, stylish, and timely journey. We take pride in offering impeccable service, from the moment you are picked up to your final destination.<br></br><br></br>

                                Our fleet features high-end vehicles that are meticulously maintained and equipped with all the amenities to provide you with an extraordinary experience. From plush interiors to advanced technology, every detail is carefully considered to enhance your comfort and relaxation.<br></br><br></br>

                                Our chauffeurs are highly trained professionals who embody courtesy and discretion. They are knowledgeable of the best routes, ensuring you arrive on time, while also maintaining the highest standards of safety and privacy. You can trust our team to make your trip stress-free and enjoyable.<br></br><br></br>

                                Whether you’re looking for a ride for a special event or need reliable transportation for daily commutes, our Luxury Chauffeuring Services offer convenience, elegance, and personalized attention. We are committed to ensuring that every journey you take with us is nothing short of exceptional.
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