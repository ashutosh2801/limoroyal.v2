'use client'
import Image from 'next/image'
import ServiceSidePanel from '../components/ServiceSidePanel'
import ServiceFaq from '../components/ServiceFaq'
import AirportMeetBanner from '../../public/assets/services/airport-meet.jpg'
import CustomerExperiences from '../components/CustomerExperiences'

const AirportMeetAndGreetServices = () => {
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
                            <li>Airport Meet and Greet Services</li>
                            </ul>
                        </div>
                        <h2 className='text-white text-2xl lg:text-6xl leading-snug my-5 font-medium'>Airport Meet and<br></br> Greet Services</h2>
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
                            <Image src={AirportMeetBanner} className='w-full h-full' alt='Airport Meet & Greet with Chauffeur Service' />
                        </div>
                        <div className='border-b webBorderColor pb-10 mb-10' data-aos="fade-up">
                            <h1 className='text-white text-2xl lg:text-4xl mt-10 mb-5 lg:mb-10'>Professional Airport Meet and Greet Services</h1>
                            <p className='webFontColor text-base leading-relaxed'>
                                Limo Royale provides the perfect setting for comfortable and professional airport transfers. Our airport limo service ensures comfort, punctuality, reliability, providing the highest quality of service as always. Our professional Royal chauffeurs ensure hassle-free airport transportation under every circumstance. Make your airport transfers seamless with Limo Royale airport limo service. 
                            </p>
                            <b className='text-white w-full block mb-5 mt-5'>Why Choose Limo Royale for Airport Transfers?</b>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>Arrival Experience: </b>One of our professional Royale chauffeurs will be available at the arrival hall, gate, or designated area. He will greet you and provide you with the best airport meet and greet services in Toronto.</li>

                                <li><b>Baggage Assistance: </b>Our professional Royale chauffeurs will provide you with all assistance with regard to your baggage handling. </li>

                                <li><b>Navigation through the terminal: </b>Whether you are new to airport travel or not, there is no need to worry with our airport limo service. We take care of your navigation through the terminal to ensure a seamless airport transfer process. </li>
                            </ul>

                            <b className='text-white w-full block mb-5 mt-5'>Private Transfer Meet and Greet Services</b>
                            <p className='webFontColor text-base mt-5'>Our airport limo service provides private meet and greet services as per client needs and requirements. Our Royale chauffeurs will meet you at the arrivals hall or gate to provide luggage assistance.<br></br><br></br> We specialize in providing discreet airport limo service for VIPs and high-profile clients. We tailor the experience to match their preferences.</p>

                            <b className='text-white w-full block mb-5 mt-5'>Airport Limo Service: Who is it for?</b>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>Business Travellers: </b>Executives and all types of business travellers require the assistance of airport limo service. They require punctual and reliable airport transfer services for their business meetings.</li>

                                <li><b>VIPs: </b>VIPs require luxury and comfort to ensure that they get to their destination on time. Our Royale chauffeurs provide all assistance VIPs require for a comfortable and safe ride to the destination. They consider punctuality as their highest priority.</li>

                                <li><b>Families: </b>Family vacations require comfort, luxury, and ample space for luggage. Our airport limo service ensures all of these features are available for family travellers to provide seamless airport transfer services.</li>
                            </ul>

                            <b className='text-white w-full block mb-5 mt-5'>Special Airport Limo Service</b>
                            <ul className='list-disc pl-5 space-y-4 webFontColor text-base'>
                                <li><b>ALWAYS Meet and Assist Service: </b>We provide personal assistance to and from the airport gate. This includes expedited processing, lounge access, and also help with terminal shopping, if required.</li>

                                <li><b>Royal Airport Concierge: </b>We provide aircraft-side greeting, porter service at baggage claim, and proper coordination with the Royale chauffeurs waiting outside the airport.</li>

                                <li><b>Fast-Track VIP Service: </b>We specialize in arrival and departure meet and assist services. This includes gate-to-gate connection service for transit clients.</li>
                            </ul>
                            <div className="pt-2" data-aos="fade-up">

                                <b className="text-white w-full block mb-5 mt-5">
                                    Summary of the service types we provide
                                </b>

                                {/* Desktop Table */}
                                <div className="hidden md:block overflow-x-auto">
                                    <table className="w-full border border-gray-600 text-sm">
                                    <thead>
                                        <tr className="bg-gray-800 text-white">
                                        <th className="border border-gray-600 p-3 text-left">Service Type</th>
                                        <th className="border border-gray-600 p-3 text-left">Key Features</th>
                                        <th className="border border-gray-600 p-3 text-left">Suitable For</th>
                                        </tr>
                                    </thead>

                                    <tbody className="webFontColor">
                                        <tr>
                                        <td className="border border-gray-600 p-3 font-semibold">Full Concierge</td>

                                        <td className="border border-gray-600 p-3">
                                            <ul className="list-disc pl-5 space-y-1">
                                            <li>Gate escort service</li>
                                            <li>Lounge access</li>
                                            <li>Fast-track service</li>
                                            <li>Porters for assistance</li>
                                            </ul>
                                        </td>

                                        <td className="border border-gray-600 p-3">
                                            <ul className="list-disc pl-5 space-y-1">
                                            <li>First-time travellers</li>
                                            <li>VIPs</li>
                                            <li>Seniors</li>
                                            </ul>
                                        </td>
                                        </tr>

                                        <tr>
                                        <td className="border border-gray-600 p-3 font-semibold">
                                            Driver Meet & Greet Services
                                        </td>

                                        <td className="border border-gray-600 p-3">
                                            <ul className="list-disc pl-5 space-y-1">
                                            <li>Greeting with a signboard at the arrival hall</li>
                                            <li>Help load luggage to the car</li>
                                            </ul>
                                        </td>

                                        <td className="border border-gray-600 p-3">
                                            <ul className="list-disc pl-5 space-y-1">
                                            <li>Business travellers</li>
                                            <li>Families with heavy luggage</li>
                                            </ul>
                                        </td>
                                        </tr>

                                        <tr>
                                        <td className="border border-gray-600 p-3 font-semibold">Transit Assistance</td>

                                        <td className="border border-gray-600 p-3">
                                            <ul className="list-disc pl-5 space-y-1">
                                            <li>Guidance between terminals and gates for connections</li>
                                            </ul>
                                        </td>

                                        <td className="border border-gray-600 p-3">
                                            <ul className="list-disc pl-5 space-y-1">
                                            <li>Complex connections</li>
                                            <li>Short layovers</li>
                                            </ul>
                                        </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>

                                {/* Mobile Cards */}
                                <div className="md:hidden space-y-6">

                                    <div className="border border-gray-600 p-5 rounded-lg">
                                    <h4 className="text-white font-semibold mb-3">Full Concierge</h4>

                                    <p className="text-gray-300 font-medium mb-1">Key Features</p>
                                    <ul className="list-disc pl-5 text-sm webFontColor mb-3">
                                        <li>Gate escort service</li>
                                        <li>Lounge access</li>
                                        <li>Fast-track service</li>
                                        <li>Porters for assistance</li>
                                    </ul>

                                    <p className="text-gray-300 font-medium mb-1">Suitable For</p>
                                    <ul className="list-disc pl-5 text-sm webFontColor">
                                        <li>First-time travellers</li>
                                        <li>VIPs</li>
                                        <li>Seniors</li>
                                    </ul>
                                    </div>

                                    <div className="border border-gray-600 p-5 rounded-lg">
                                    <h4 className="text-white font-semibold mb-3">Driver Meet & Greet Services</h4>

                                    <p className="text-gray-300 font-medium mb-1">Key Features</p>
                                    <ul className="list-disc pl-5 text-sm webFontColor mb-3">
                                        <li>Greeting with a signboard at the arrival hall</li>
                                        <li>Help load luggage to the car</li>
                                    </ul>

                                    <p className="text-gray-300 font-medium mb-1">Suitable For</p>
                                    <ul className="list-disc pl-5 text-sm webFontColor">
                                        <li>Business travellers</li>
                                        <li>Families with heavy luggage</li>
                                    </ul>
                                    </div>

                                    <div className="border border-gray-600 p-5 rounded-lg">
                                    <h4 className="text-white font-semibold mb-3">Transit Assistance</h4>

                                    <p className="text-gray-300 font-medium mb-1">Key Features</p>
                                    <ul className="list-disc pl-5 text-sm webFontColor mb-3">
                                        <li>Guidance between terminals and gates for connections</li>
                                    </ul>

                                    <p className="text-gray-300 font-medium mb-1">Suitable For</p>
                                    <ul className="list-disc pl-5 text-sm webFontColor">
                                        <li>Complex connections</li>
                                        <li>Short layovers</li>
                                    </ul>
                                    </div>

                                </div>
                            </div>
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

export default AirportMeetAndGreetServices