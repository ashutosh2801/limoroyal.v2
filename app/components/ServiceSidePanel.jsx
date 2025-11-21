"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ServiceSidePanel = () => {
    const currentPath = usePathname();

    const isActive = (path) => currentPath === path;

    return (
        <div className='w-full md:w-2/5 lg:w-1/3'>
            <div className='p-5 lg:p-10 bg-[#0a0a0a] sticky top-10 mt-10 md:mt-0'>
                
                <div className='border-b webBorderColor pb-8' data-aos="fade-up">
                    <b className='text-white text-xl lg:text-2xl mb-8 font-normal'>Our Services</b>
                    <ul className='my-5 text-gray-300 space-y-5'>

                        <li>
                            <Link href='/wedding-cars' title='Wedding Cars'
                                className={`services-link ${isActive("/wedding-cars") ? "side-active" : "border-transparent"}`}>
                                Wedding Cars
                            </Link>
                        </li>

                        <li>
                            <Link href='/luxury-jet-charter' title='Luxury Jet Charter'
                                className={`services-link ${isActive("/luxury-jet-charter") ? "side-active" : "border-transparent"}`}>
                                Luxury Jet Charter
                            </Link>
                        </li>

                        <li>
                            <Link href='/airport-meet-and-greet-services' title='Airport Meet and Greet Services'
                                className={`services-link ${isActive("/airport-meet-and-greet-services") ? "side-active" : "border-transparent"}`}>
                                Airport Meet and Greet Services
                            </Link>
                        </li>

                        <li>
                            <Link href='/airport-transfers' title='Airport Transfers'
                                className={`services-link ${isActive("/airport-transfers") ? "side-active" : "border-transparent"}`}>
                                Airport Transfers
                            </Link>
                        </li>

                        <li>
                            <Link href='/executive-car-hire' title='Executive Car Hire'
                                className={`services-link ${isActive("/executive-car-hire") ? "side-active" : "border-transparent"}`}>
                                Executive Car Hire
                            </Link>
                        </li>

                        <li>
                            <Link href='/close-protection-service' title='Close Protection Service'
                                className={`services-link ${isActive("/close-protection-service") ? "side-active" : "border-transparent"}`}>
                                Close Protection Service
                            </Link>
                        </li>

                        <li>
                            <Link href='/luxury-chauffeuring-services-to-londons' title='Luxury Chauffeuring Services to London'
                                className={`services-link ${isActive("/luxury-chauffeuring-services-to-londons") ? "side-active" : "border-transparent"}`}>
                                Events
                            </Link>
                        </li>

                        <li>
                            <Link href='/seaports-transport' title='Seaports Transport'
                                className={`services-link ${isActive("/seaports-transport") ? "side-active" : "border-transparent"}`}>
                                Seaports Transport
                            </Link>
                        </li>

                        <li>
                            <Link href='/promotions' title='Promotions'
                                className={`services-link ${isActive("/promotions") ? "side-active" : "border-transparent"}`}>
                                Promotions
                            </Link>
                        </li>

                        <li>
                            <Link href='/luxury-chauffeuring-services' title='Luxury Chauffeuring Services'
                                className={`services-link ${isActive("/luxury-chauffeuring-services") ? "side-active" : "border-transparent"}`}>
                                Luxury Chauffeuring Services
                            </Link>
                        </li>

                    </ul>
                </div>

                <div className='border-b webBorderColor pb-8' data-aos="fade-up">
                    <b className='text-white text-xl lg:text-2xl mt-8 mb-8 font-normal block'>Call us today & avail our services</b>
                    <a href='tel:+14167255466' title='Limo Royale Hotline'
                       className='webFontColor mt-5 block text-md md:text-sm lg:text-xl font-semibold'>
                        <div className='bg-white rounded-full px-3 lg:px-4 py-3 lg:py-4 mr-2 inline-block'>
                            <FontAwesomeIcon icon={faHeadset} className="webColor text-xl lg:text-3xl" />
                        </div>
                        <span className='webColor'>Call Now</span> 416-725-5466
                    </a>
                </div>

                <div data-aos="fade-up">
                    <b className='text-white text-xl lg:text-2xl mt-8 mb-8 font-normal block'>Book Today</b>
                    <p className='text-gray-300'>Book Car Rental Today</p>

                    <Link href='/online-reservations'
                          title='Book Car Rental from Limo Royale'
                          className='inline-block book-now-slide text-sm px-10 py-4 mt-5 uppercase'>
                        Book Now
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ServiceSidePanel;
