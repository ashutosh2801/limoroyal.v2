'use client'
import Image from 'next/image'
import ServiceSidePanel from '../components/ServiceSidePanel'
import WeddingBanner from '../../public/assets/services/weddingService.jpg'
import CustomerExperiences from '../components/CustomerExperiences'
import ServiceFaq from '../components/ServiceFaq'

const WeddingCars = () => {
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
                            <li>Wedding Cars</li>
                            </ul>
                        </div>
                        <h2 className='text-white text-2xl lg:text-6xl leading-snug my-5 font-medium'>Wedding Cars</h2>
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
                            <Image src={WeddingBanner} className='w-full h-full' alt='Luxurious Wedding Cars' />
                        </div>
                        <div className='border-b webBorderColor pb-10 mb-10' data-aos="fade-up">
                            <h1 className='text-white text-2xl lg:text-4xl mt-10 mb-5 lg:mb-10'>Make Your Special Day Unforgettable with Luxurious Wedding Transportation</h1>
                            <p className='webFontColor text-base leading-relaxed'>
                                Your wedding day is one of the most important and memorable days of your life, and at <b>Limo Royale</b>, we ensure that every moment is as elegant and seamless as possible. Our <b>Wedding Limo Service</b> is designed to provide you with the highest level of luxury, comfort, and style, making sure you arrive at your wedding venue with the grandeur your special day deserves. From the bride and groom to the entire wedding party, we cater to all your transportation needs, leaving you to focus on creating beautiful memories.
                            </p>
                            <b className='text-white w-full block mb-5 mt-5'>Why Choose Limo Royale for Your Wedding?</b>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>Luxury Fleet: </b>Our fleet of premium vehicles includes elegant limousines, stylish sedans, and spacious SUVs, all designed to offer comfort, elegance, and sophistication. Whether you prefer a classic stretch limo or a modern luxury vehicle, we have the perfect car to match the style and theme of your wedding.</li>
                                <li><b>Royale Chauffeurs: </b>Our <b>Royale Chauffeurs</b> are highly trained professionals with <b>15-20 years of experience</b> in providing safe, punctual, and discreet service. Their primary goal is to ensure that your wedding transportation is smooth and stress-free, so you can enjoy every moment of your big day.</li>
                                <li><b>Red Carpet Service: </b>Arrive like royalty with our red carpet service, making a grand entrance at your wedding venue. We offer complimentary red carpet rollout, adding an extra touch of elegance and sophistication to your special day.</li>
                            </ul>
                            <b className='text-white w-full block mb-5 mt-5'>Our Wedding Services Include:</b>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>Bride and Groom Transportation: </b>Travel to and from your wedding venue in style. Whether you need transportation for the ceremony, reception, or both, our luxurious limos ensure that the bride and groom arrive in comfort and elegance.</li>
                                <li><b>Bridal Party and Family Transportation: </b>We also offer transportation for the bridal party, family, and other VIP guests. Our spacious limousines and SUVs can comfortably accommodate your entire party, ensuring everyone arrives together and on time.</li>
                                <li><b>Multiple Stops and Custom Itineraries: </b>Weddings often involve multiple locations—from getting ready to the ceremony, photoshoot, and reception. We provide customized transportation solutions tailored to your schedule, with multiple stops and flexible timing.</li>
                                <li><b>Post-Wedding Send-Off: </b>End your night on a high note with a romantic and stylish getaway. Our limousines will be waiting for you after the reception to whisk you away to your next destination, whether it’s your hotel, airport, or honeymoon suite.</li>
                            </ul>
                            <b className='text-white w-full block mb-5 mt-5'>Why Limo Royale for Weddings?</b>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>Attention to Detail: </b>We understand how important every detail is on your wedding day. Our team works closely with you or your wedding planner to ensure that every transportation need is perfectly coordinated and executed, leaving nothing to chance.</li>
                                <li><b>Comfort and Privacy: </b>Each vehicle in our fleet is equipped with plush seating, climate control, and privacy features, ensuring that you can relax and enjoy the ride with your loved ones on your special day.</li>
                                <li><b>Timeless Elegance: </b>At Limo Royale, we believe that your wedding transportation should be as special as the day itself. Our vehicles are meticulously maintained and presented, ensuring that your arrival and departure are nothing short of perfect.</li>
                            </ul>
                            <b className='text-white w-full block mb-5 mt-5'>Wedding Packages</b>
                            <p className='webFontColor text-base mt-5'>We offer flexible wedding limo packages to accommodate your needs:</p><br></br><br></br>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>Classic Wedding Package: </b>Includes transportation for the bride and groom to the ceremony and reception, with additional options for bridal party transportation.</li>
                                <li><b>All-Inclusive Wedding Package: </b>Provides full-day transportation, including the bridal party, family members, and post-wedding send-off. Multiple stops and customized itineraries are available.</li>
                                <li><b>VIP Wedding Package: </b>A premium package offering exclusive access to our most luxurious vehicles, personalized service, and extra touches like champagne, refreshments, and red carpet service.</li>
                            </ul>
                            <p className='webFontColor text-base mt-5'>Let <b>Limo Royale</b> add a touch of elegance and luxury to your wedding day. <b>Book your Wedding Limo Service</b> today, and make your special day unforgettable.</p>
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

export default WeddingCars