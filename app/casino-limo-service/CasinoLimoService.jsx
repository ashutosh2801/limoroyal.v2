'use client'
import Image from 'next/image'
import ServiceSidePanel from '../components/ServiceSidePanel'
import CasinoBanner from '../../public/assets/services/casino-service.jpg'
import CustomerExperiences from '../components/CustomerExperiences'

const CasinoLimoService = () => {
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
                            <li>Casino Limo Service</li>
                            </ul>
                        </div>
                        <h2 className='text-white text-2xl lg:text-6xl leading-snug my-5 font-medium'>Casino Limo Service</h2>
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
                            <Image src={CasinoBanner} className='w-full h-full' alt='Casino Limo Service Toronto' />
                        </div>
                        <div className='border-b webBorderColor pb-10' data-aos="fade-up">
                            <h1 className='text-white text-2xl lg:text-4xl mt-10 mb-5 lg:mb-10'>Elevate Your Night with VIP Casino Transportation</h1>
                            <p className='webFontColor text-base leading-relaxed'>
                                Step into a world of luxury and excitement with <b>Limo Royale’s Casino Limo Service</b>. Whether you’re planning an evening at the tables or a weekend of high-stakes fun, our professional casino transportation service ensures that you arrive in style and make an unforgettable entrance. With our fleet of luxury vehicles and dedicated <b>Royale Chauffeurs</b>, your casino experience begins the moment you step into one of our cars.
                            </p>
                            <b className='text-white w-full block mb-5 mt-5'>Why Choose Limo Royale for Your Casino Night?</b>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>VIP Treatment: </b>From the moment you book with <b>Limo Royale</b>, you are treated like a VIP. Our chauffeurs ensure a smooth, comfortable ride with privacy and discretion, allowing you to focus on enjoying your evening.</li>
                                <li><b>Luxury Fleet: </b>Choose from our range of high-end vehicles, including stretch limousines, luxury sedans, and SUVs. Our fleet is designed for comfort and style, featuring leather seating, mood lighting, and entertainment systems to set the tone for a thrilling night out.</li>
                                <li><b>Arrive in Style: </b>Make a grand entrance at the casino, turning heads as you step out of one of our meticulously maintained vehicles. Whether you’re celebrating a big win or just enjoying a night of entertainment, <b>Limo Royale</b> ensures you arrive in the utmost elegance.</li>
                            </ul>
                            <b className='text-white w-full block mb-5 mt-5'>Casino Experience Packages</b>
                            <p className='webFontColor text-base'>We offer customizable casino limo packages that cater to your preferences and group size, ensuring you get the full VIP experience:</p><br></br>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>High Roller Package: </b>Enjoy a night of glamour in one of our stretch limousines or luxury SUVs. Perfect for groups, this package offers premium features like a stocked mini-bar, entertainment systems, and customized lighting to get the party started before you arrive at the casino.</li>
                                <li><b>Luxury Sedan Package: </b>Ideal for an intimate casino night or a couple’s evening out, our luxury sedans offer sophisticated comfort. With plush leather interiors, climate control, and refreshments, you’ll enjoy every moment of the ride.</li>
                                <li><b>Party Bus Package: </b>Bring the whole crew! Our party buses can accommodate larger groups, ensuring everyone enjoys the ride. With spacious interiors, advanced sound systems, and custom lighting, the fun begins the moment you step onboard.</li>
                            </ul>
                            <b className='text-white w-full block mb-5 mt-5'>Royale Chauffeurs: Your Trusted Companions for the Night</b>
                            <p className='webFontColor text-base'>Our <b>Royale Chauffeurs</b> are not just drivers—they are experienced professionals dedicated to providing you with a safe, smooth, and luxurious journey. With <b>15-20 years of driving experience</b>, they ensure you arrive at the casino relaxed and ready for a night of excitement. They will also be available to pick you up after your casino experience, ensuring that you return safely and comfortably.</p>
                            <b className='text-white w-full block mb-5 mt-5'>More Than Just a Ride</b>
                            <p className='webFontColor text-base'>At <b>Limo Royale</b>, we believe in delivering a full <b>VIP experience</b>. Whether you’re celebrating a special occasion or simply enjoying a night out, our casino limo service adds that extra touch of glamour and excitement to your evening.</p>
                            <b className='text-white w-full block mb-5 mt-5'>Safety and Discretion</b>
                            <p className='webFontColor text-base'>Your privacy and safety are our top priorities. Whether it’s a high-profile outing or a private night at the tables, our chauffeurs offer discretion and professionalism. You can focus on enjoying your night knowing that you’re in safe and reliable hands.<br></br><br></br>

                            For a night of luxury, excitement, and VIP treatment, <b>choose Limo Royale’s Casino Limo Service. Book your ride today</b> and let us take care of your transportation while you focus on enjoying the thrill of the casino.</p>
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

export default CasinoLimoService