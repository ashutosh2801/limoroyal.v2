'use client'
import Image from 'next/image'
import ServiceSidePanel from '../components/ServiceSidePanel'
import ServiceFaq from '../components/ServiceFaq'
import CustomerExperiences from '../components/CustomerExperiences'
import BacheloretteBanner from '../../public/assets/services/bachelorette-service.jpg'

const BirthdaysBachelorAndBacheloretteLimoService = () => {
  return (
    <main>
        <div>
            <div className='relative'>
                <div className='page-bg object-cover absolute h-[450px] lg:h-[550px] inset-0 opacity-50'></div>
                <div className='relative z-10 pt-50 lg:pt-60 xl:pt-80 pb-10 md:pb-30 xl:pb-10'>
                    <div className='container mx-auto px-2'>
                        <div>
                            <ul className='breadcrumb uppercase webColor text-sm flex'>
                            <li><a href='/'>Home</a></li>
                            <li>Birthdays, Bachelor, and Bachelorette Limo Service</li>
                            </ul>
                        </div>
                        <h2 className='text-white text-2xl lg:text-6xl leading-snug my-5 font-medium'>Birthdays, Bachelor,<br></br> and Bachelorette Limo Service</h2>
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
                            <Image src={BacheloretteBanner} className='w-full h-full' alt='Party Limo for Birthdays & Bachelorette' />
                        </div>
                        <div className='border-b webBorderColor pb-10 mb-10' data-aos="fade-up">
                            <h1 className='text-white text-2xl lg:text-4xl mt-10 mb-5 lg:mb-10'>Celebrate in Style and Luxury with Limo Royale</h1>
                            <p className='webFontColor text-base leading-relaxed'>
                                Special occasions like birthdays and bachelor or bachelorette parties deserve to be celebrated in style, and at <b>Limo Royale</b>, we’re here to make those moments even more unforgettable. Whether you’re planning a milestone birthday, a memorable night out with your closest friends, or the ultimate bachelor or bachelorette bash, our luxury fleet and professional chauffeurs ensure that your event is nothing short of extraordinary.
                            </p>
                            <b className='text-white w-full block mb-5 mt-5'>Why Choose Limo Royale for Your Celebration?</b>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>Luxury Fleet for Every Group Size: </b>hether it’s an intimate celebration with a few friends or a large party, our premium fleet of limousines, SUVs, and luxury sedans has the perfect vehicle for your group. Enjoy plush seating, advanced sound systems, and mood lighting that create the ideal party atmosphere on the road.</li>

                                <li><b>Royale Chauffeurs: </b>With <b>15-20 years of experience</b>, our chauffeurs provide safe, reliable, and professional service, ensuring you can focus on having fun while we handle the details. From door-to-door service to multiple stops, your night will run smoothly with our expert drivers at the wheel.</li>

                                <li><b>VIP Experience: </b>At <b>Limo Royale</b>, every guest is treated like a VIP. We offer personalized services such as champagne, custom lighting, and music tailored to your group’s preferences, making sure your celebration starts the moment you step into one of our luxury vehicles.</li>
                            </ul>
                            <b className='text-white w-full block mb-5 mt-5'>Our Celebration Services Include</b>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>Birthday Celebrations: </b>Whether you’re celebrating a milestone birthday or simply looking for a memorable way to mark the occasion, we provide luxury transportation to and from your chosen destinations. Whether it’s a dinner, night out, or a special event, we make sure your birthday is one to remember.</li>

                                <li><b>Bachelor and Bachelorette Parties: </b>Your last night of singlehood should be one for the books! With <b>Limo Royale</b>, your bachelor or bachelorette party becomes an unforgettable experience. Enjoy hassle-free transportation between venues, from dinner and drinks to clubs and after-parties, all while celebrating in the comfort and luxury of our premium vehicles.</li>

                                <li><b>Nightclubs and Bar Hopping: </b>Forget about finding parking or appointing a designated driver. Our limo service allows you to enjoy a fun-filled night of bar hopping or visiting your favorite nightclubs while traveling in style.</li>

                                <li><b>Customized Itineraries: </b>Every celebration is unique, and at <b>Limo Royale</b>, we offer fully customizable itineraries. Whether you’re planning a quiet evening or a full-blown party, we work with you to ensure your transportation fits your plans perfectly, with multiple stops and flexible timing.</li>
                            </ul>
                            <b className='text-white w-full block mb-5 mt-5'>Why Limo Royale for Your Special Occasion?</b>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>Luxury on the Move: </b>From the moment you step into one of our vehicles, you’ll be surrounded by luxury and comfort. With state-of-the-art features, premium entertainment options, and elegant interiors, your ride will be just as memorable as the event itself.</li>

                                <li><b>Safety and Convenience: </b>Your safety is our priority. Our professional chauffeurs ensure that your group gets to and from each destination safely and efficiently, giving you peace of mind as you enjoy your celebration.</li>

                                <li><b>Unmatched Service: </b>At <b>Limo Royale</b>, we don’t just provide transportation; we create an experience. Our attention to detail and commitment to excellence mean that every aspect of your limo service will exceed your expectations.</li>
                            </ul>

                            <b className='text-white w-full block mb-5 mt-5'>Celebration Packages</b>
                            <p className='webFontColor text-base mt-5'>We offer a range of packages to suit your needs:</p>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>Birthday Celebration Package: </b>Includes luxury transportation to your chosen venues, with optional extras like champagne, party lighting, and a custom music playlist.</li>

                                <li><b>Bachelor and Bachelorette Party Package: </b>Designed for groups looking to enjoy the night in style, this package offers transportation to multiple venues, VIP treatment, and personalized service throughout the evening.</li>

                                <li><b>Custom Celebration Packagee: </b>Create your ideal celebration with a fully customized package. Whether it’s a surprise party or a special itinerary, we work with you to plan the perfect event, complete with personalized extras.</li>
                            </ul>

                            <p className='webFontColor text-base mt-5'>For a celebration that’s luxurious, fun, and unforgettable, <b>book your Birthday, Bachelor, or Bachelorette Limo Service with Limo Royale</b> today. Let us take care of the ride while you focus on making memories.
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

export default BirthdaysBachelorAndBacheloretteLimoService