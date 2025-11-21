'use client'
import { useEffect, useRef, useState } from "react";
import { PhoneIcon, EnvelopeIcon, MapPinIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import Script from 'next/script';

const Contact = () => {
    const dateRef = useRef(null);
    const timeRef = useRef(null);
    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        if (dateRef.current) {
        dateRef.current.value = today;
        }
    }, []);
    const [pickupTime, setPickupTime] = useState("");

    useEffect(() => {
        // Ensure the JotForm embed handler runs after iframe is mounted
        if (typeof window !== "undefined" && window.jotformEmbedHandler) {
        window.jotformEmbedHandler(
            "iframe[id='JotFormIFrame-252725726484465']", 
            "https://form.jotform.com/"
        );
        }
    }, []);
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
                            <li>Contact</li>
                            </ul>
                        </div>
                        <h2 className='text-white text-2xl lg:text-6xl leading-snug my-5 font-medium'>Contact</h2>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className='container mx-auto px-2'>
                <div className='pt-10 lg:pt-0 pb-10 mt-15' data-aos="fade-up">
                    <small className='text-sm webColor uppercase'>Contact us</small>
                    <h1 className='text-white text-2xl lg:text-4xl leading-snug my-5'>Ride To Destinations With <br></br> Maximum Comfort</h1>
                </div>
            </div>
        </div>
        <div>
            <div className='container mx-auto px-2'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mb-15'>
                    <div className='bg-[#0a0a0a] p-5 md:p-5 lg:p-10' data-aos="fade-up">
                        <div className='w-auto inline-block bg-white rounded-full p-5 mb-5'>
                            <PhoneIcon className="w-5 h-5 lg:w-8 lg:h-8 text-black" />
                        </div>
                        <h3 className='text-white text-2xl lg:text-3xl mb-5'>Phone</h3>
                        <a href='tel:+14167255466' className='text-base md:text-sm lg:text-base leading-relaxed webFontColor w-full inline-block mb-10'>
                            416-725-LIMO<br></br>
                            (416-725-5466)
                        </a>
                        <a href='tel:4167255466' className='text-base md:text-sm lg:text-base leading-relaxed webFontColor w-full inline-block'>
                            Toll-free:<br></br>
                            1 (888) 870-LIMO (5466)
                        </a>
                    </div>
                    <div className='bg-[#0a0a0a] p-5 md:p-5 lg:p-10' data-aos="fade-up">
                        <div className='w-auto inline-block bg-white rounded-full p-5 mb-5'>
                            <EnvelopeIcon className="w-5 h-5 lg:w-8 lg:h-8 text-black" />
                        </div>
                        <h3 className='text-white text-2xl lg:text-3xl mb-5'>Email</h3>
                        <a href='mailto:book@limo-royale.com;' className='text-base md:text-sm lg:text-base leading-relaxed webFontColor w-full inline-block mb-10'>
                            book@limo-royale.com
                        </a>
                    </div>
                    <div className='bg-[#0a0a0a] p-5 md:p-5 lg:p-10' data-aos="fade-up">
                        <div className='w-auto inline-block bg-white rounded-full p-5 mb-5'>
                            <GlobeAltIcon className="w-5 h-5 lg:w-8 lg:h-8 text-black" />
                        </div>
                        <h3 className='text-white text-2xl lg:text-3xl mb-5'>Web</h3>
                        <a href='https://limo-royale.com/' className='text-base md:text-sm lg:text-base leading-relaxed webFontColor w-full inline-block mb-10'>
                           www.limoroyal.ca
                        </a>
                    </div>
                    {/* <div className='bg-[#0a0a0a] p-5 md:p-5 lg:p-10' data-aos="fade-up">
                        <div className='w-auto inline-block bg-white rounded-full p-5 mb-5'>
                            <MapPinIcon className="w-5 h-5 lg:w-8 lg:h-8 text-black" />
                        </div>
                        <h3 className='text-white text-2xl lg:text-3xl mb-5'>Location</h3>
                        <a href='https://maps.app.goo.gl/oVrvqS7i5hgPHXzM7' target='_blank' className='text-base md:text-sm lg:text-base leading-relaxed webFontColor w-full inline-block mb-10'>
                            1 Dundas Street West, Eaton Centre, Suite 2500, Toronto, ON M5G 1Z3
                        </a>
                    </div> */}
                </div>
            </div>
        </div>
        <div>
            <div className='bg-[#0a0a0a] py-15 mt-15' data-aos="fade-up">
                <div className='container mx-auto px-2'>
                <iframe
                    id="JotFormIFrame-252725726484465"
                    title="Get in touch"
                    onLoad={() => window.scrollTo(0, 0)}
                    allowtransparency="true"
                    allow="geolocation; microphone; camera; fullscreen; payment"
                    src="https://form.jotform.com/252725726484465"
                    frameBorder="0"
                    width="100%"
                    height="1300"
                />

                {/* JotForm Script */}
                <Script
                    src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"
                    strategy="afterInteractive"
                />
                </div>
            </div>
        </div>
    </main>
  )
}

export default Contact