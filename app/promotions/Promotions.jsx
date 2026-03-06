'use client'
import Image from 'next/image'
import ServiceSidePanel from '../components/ServiceSidePanel'
import ServiceFaq from '../components/ServiceFaq'
import CustomerExperiences from '../components/CustomerExperiences'
import PromotionsBanner from '../../public/assets/banners/value-bg.jpg'

const Promotions = () => {
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
                            <li>Promotions</li>
                            </ul>
                        </div>
                        <h2 className='text-white text-2xl lg:text-6xl leading-snug my-5 font-medium'>Promotions</h2>
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
                            <Image src={PromotionsBanner} className='w-full h-[500px] object-cover object-bottom' alt='Promotion Limo Service' />
                        </div>
                        <div className='border-b webBorderColor pb-10 mb-10' data-aos="fade-up">
                            <h1 className='text-white text-2xl lg:text-4xl mt-10 mb-5 lg:mb-10'>Arrive in Style and Make Memories to Last a Lifetime</h1>
                            <p className='webFontColor text-base leading-relaxed'>
                                Prom is a night to remember, and with <b>Limo Royale</b>, you’ll arrive in the ultimate style and elegance. Our <b>Prom Limo Service</b> is designed to provide young adults with a glamorous, unforgettable experience. From the moment you step into one of our luxury vehicles, you’ll feel like royalty. We ensure a safe, stylish, and comfortable ride, making your prom night as special as you’ve always imagined.
                            </p>
                            <b className='text-white w-full block mb-5 mt-5'>Why Choose Limo Royale for Your Prom?</b>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>Luxury Fleet: </b>Our fleet includes the latest models of luxury limousines, sleek sedans, and spacious SUVs, all meticulously maintained and equipped with state-of-the-art features for a comfortable and exciting ride.</li>

                                <li><b>Royale Chauffeurs: </b>Our experienced and professional chauffeurs will ensure your group arrives at the prom venue safely and on time. With a minimum of <b>15-20 years of experience</b>, our chauffeurs prioritize safety and a smooth ride, letting you enjoy every moment of your night.</li>

                                <li><b>Red Carpet Treatment: </b>We make sure that every guest feels like a VIP. Step out onto the red carpet, making a grand entrance that will set the tone for an unforgettable evening.</li>

                                <li><b>Customized Experience: </b>Whether you want to ride with a group of friends or make a solo statement, we’ll work with you to customize your prom limo experience, from pick-up locations to post-prom plans. We accommodate groups of all sizes, ensuring everyone travels in luxury.</li>
                            </ul>
                            <b className='text-white w-full block mb-5 mt-5'>Prom Packages</b>
                            <p className='webFontColor text-base mt-5'>Our prom limo packages are designed to cater to various needs, ensuring everyone has a chance to enjoy a royal experience:</p>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>Classic Limousine Package: </b>Ride in one of our elegant stretch limousines, perfect for a group of friends. Enjoy comfortable seating, mood lighting, and a premium sound system to start your prom night in style.</li>

                                <li><b>VIP Prom Package: </b>Arrive in one of our high-end luxury sedans or SUVs for a more intimate and sophisticated experience. With leather seating, refreshments, and entertainment systems, your ride will be as stylish as your evening.</li>

                                <li><b>Party Bus Experience: </b>For larger groups, our spacious party buses offer the ultimate prom experience. With plenty of room for dancing, custom lighting, and high-end sound systems, the party starts the moment you board.</li>
                            </ul>

                            <b className='text-white w-full block mb-5 mt-5'>Safety First</b>
                            <p className='webFontColor text-base mt-5'>At <b>Limo Royale</b>, we understand the importance of safety, especially on such a special night. Our <b>Royale Chauffeurs</b> are experienced professionals who ensure that all passengers arrive safely at their destinations. We provide peace of mind for parents, knowing that their teenagers are in safe and capable hands.</p>

                            <b className='text-white w-full block mb-5 mt-5'>Memories That Last</b>
                            <p className='webFontColor text-base mt-5'>Prom is more than just a night out—it’s a milestone. At <b>Limo Royale</b>, we’re dedicated to making sure it’s a night you’ll never forget. Our attention to detail, luxurious vehicles, and exceptional service ensure that your prom experience is nothing short of magical.<br></br><br></br>
                            For a night as special as your prom, choose <b>Limo Royale. Book your Prom Limo Service today</b> and make memories that will last a lifetime.
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

export default Promotions