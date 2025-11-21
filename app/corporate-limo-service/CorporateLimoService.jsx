'use client'
import Image from 'next/image'
import ServiceSidePanel from '../components/ServiceSidePanel'
import CorporateBanner from '../../public/assets/services/corporate-service.jpg'

const CorporateLimoService = () => {
  return (
    <main>
        <div>
            <div className='relative'>
                <div className='page-bg object-cover absolute h-[450px] lg:h-[550px] inset-0 opacity-50'></div>
                <div className='relative z-10 pt-50 lg:pt-80 pb-30 md:pb-30 xl:pb-20'>
                    <div className='container mx-auto px-2'>
                        <div>
                            <ul className='breadcrumb uppercase webColor text-sm flex'>
                            <li><a href='/'>Home</a></li>
                            <li>corporate limo service</li>
                            </ul>
                        </div>
                        <h2 className='text-white text-2xl lg:text-6xl leading-snug my-5 font-medium'>Corporate Limo Service</h2>
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
                            <Image src={CorporateBanner} className='w-full h-full' alt='Limo Royale’s Corporate Limo Service' />
                        </div>
                        <div data-aos="fade-up">
                            <h1 className='text-white text-2xl lg:text-4xl mt-10 mb-5 lg:mb-10'>Business Travel Redefined with Precision and Luxury</h1>
                            <p className='webFontColor text-base leading-relaxed'>
                                In today’s fast-paced business world, every detail matters—especially when it comes to corporate transportation. <b>Limo Royale’s Corporate Limo Service</b> offers executives and professionals a seamless, comfortable, and stylish solution for all business travel needs. Whether you’re heading to an important meeting, hosting clients, or organizing corporate events, we ensure that your travel experience reflects the professionalism and elegance of your brand. <br></br><br></br>With our fleet of premium vehicles and highly experienced <b>Royale Chauffeurs, Limo Royale</b> provides the highest level of luxury, punctuality, and discretion for corporate travelers.
                            </p>    
                            <b className='text-white w-full block mb-5 mt-5'>Why Choose Limo Royale for Corporate Travel?</b>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>Luxury Fleet</b>: Our fleet includes state-of-the-art luxury sedans, SUVs, and limousines, each designed to provide maximum comfort and convenience for business executives. Equipped with leather interiors, WiFi, and quiet, smooth rides, our vehicles allow you to work, relax, or prepare for your next meeting in complete comfort.</li>
                                <li><b>Royale Chauffeurs</b>: Our professional <b>Royale Chauffeurs</b> are handpicked for their experience, with <b>15-20 years of expertise</b> in navigating corporate travel. They are punctual, discreet, and fully committed to providing a smooth and seamless ride for busy professionals.</li>
                                <li><b>Punctuality and Precision</b>: We understand that time is of the essence in the corporate world. Our chauffeurs are trained to ensure that you arrive at your destination on time, every time. We monitor traffic, plan optimal routes, and account for all details to ensure a smooth journey, even in the busiest of cities.</li>
                            </ul>
                            <b className='text-white w-full block mb-5 mt-5'>Corporate Services We Offer:</b>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>Airport Transfers</b>: Skip the stress of airport navigation and enjoy a seamless transfer from the terminal to your destination. We monitor flight schedules and ensure on-time pickups and drop-offs, allowing you to focus on business without worry.</li>
                                <li><b>Corporate Event Transportation</b>: Whether you’re hosting a large corporate event or attending a business seminar, <b>Limo Royale</b> provides group and individual transportation solutions. Impress clients, business partners, and colleagues by arriving in luxury and comfort.</li>
                                <li><b>Client and Executive Hosting</b>: When it comes to hosting important clients or executives, first impressions are everything. Our corporate limo service ensures that your VIP guests are treated to a luxurious experience, setting the tone for productive meetings and successful business dealings.</li>
                                <li><b>Roadshows and Corporate Tours</b>: For business roadshows or tours that require multiple stops, we offer customized transportation solutions that ensure executives and clients travel efficiently, comfortably, and in style.</li>
                            </ul>
                            <b className='text-white w-full block mb-5 mt-5'>Why Limo Royale?</b>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>Professionalism at Every Step</b>: From the moment you book to the time you arrive at your destination, we ensure that every interaction is conducted with the utmost professionalism. Our chauffeurs are experts in corporate etiquette and are dedicated to providing a refined travel experience.</li>
                                <li><b>Comfort Meets Functionality</b>: Our vehicles are designed to provide the perfect balance between luxury and practicality. Whether you need to prepare for a meeting, host a conference call, or simply relax between appointments, our fleet offers the amenities and space you need.</li>
                                <li><b>Confidentiality and Discretion</b>: We understand that business matters can be sensitive. Our Royale Chauffeurs prioritize privacy and discretion, ensuring that you can conduct meetings or make calls during your journey with complete confidence.</li>
                            </ul>
                            <b className='text-white w-full block mb-5 mt-5'>Tailored Corporate Packages</b>
                            <p className='webFontColor text-base'>We offer customizable corporate packages to suit your business needs:</p><br></br>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>Executive Travel Package</b>: Ideal for senior executives, this package offers door-to-door service with the option for extended bookings, allowing executives to make the most of their travel time.</li>
                                <li><b>Corporate Event Package</b>: Designed for larger groups attending corporate functions, this package offers luxury transportation for employees, clients, and VIPs with multiple vehicles or shuttles as needed.</li>
                                <li><b>Client Hosting Package</b>: Ensure that your business guests are treated with the utmost care. Our Client Hosting Package includes airport transfers, city tours, and dedicated limo service for their stay.</li>
                            </ul>
                            <br></br>
                            <p className='webFontColor text-base'>
                                With <b>Limo Royale</b>, corporate travel is more than just getting from point A to point B—it’s an opportunity to enhance your professional image and make every journey productive, luxurious, and seamless.<br></br><br></br>
                                <b>Book your Corporate Limo Service</b> today and experience the height of executive travel with <b>Limo Royale</b>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}

export default CorporateLimoService