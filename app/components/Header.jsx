'use client'

import React, { useState, useEffect } from 'react'
import { PhoneIcon, Bars3Icon, XMarkIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import logo from "../../public/assets/limo-royale.png"

const Header = () => {
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const pathname = usePathname();

    const isActive = (path) => {
        if (typeof window === "undefined") return false;
        return window.location.pathname === path;
    };


  return (
    <div>
      <nav className='relative webFont'>
        <div className='absolute mt-3 w-full z-50 text-[15px]'>

          {/* Top logo + contact */}
          <div className='border-b webBorderColor pb-2'>
            <div className='container mx-auto px-2'>
              <div className='flex flex-row items-center justify-between'>

                {/* Logo */}
                <div className='w-1/2 lg:w-1/4'>
                  <Link href='/'>
                    <Image
                      src={logo}
                      alt='Luxury Limo Service for Memorable Rides - Limo Royale'
                      className='w-full md:w-50 lg:w-50'
                    />
                  </Link>
                </div>

                {/* Contact (Desktop Only) */}
                <div className='w-3/4 hidden xl:flex justify-end space-x-3'>
                  <a href="tel:+14167255466" className='text-white flex items-center'>
                    <PhoneIcon className="h-4 w-4 text-white mr-2" />
                    416-725-LIMO (416-725-5466)
                  </a>
                  <a href="tel:18888705466" className='text-white flex items-center'>
                    <PhoneIcon className="h-4 w-4 text-white mr-2" />
                    Toll-free: 1 (888) 870-LIMO (5466)
                  </a>
                </div>

                {/* Mobile Menu Button */}
                <div className='xl:hidden relative z-70'>
                  <button onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
                    {isMobileNavOpen ? (
                      <XMarkIcon className='h-8 w-8 text-white' />
                    ) : (
                      <Bars3Icon className='h-8 w-8 text-white' />
                    )}
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* =============================================
                MOBILE + DESKTOP MENU
          ============================================= */}
          <div>
            <div className="container mx-auto px-2">
                <div className="flex items-center py-4">
                    <div className="w-[90%]">
                        {/* main menu */}
                        <div className="relative">
                            <div
                                className={`overflow-y-scroll xl:overflow-y-visible fixed xl:relative top-0 left-0 h-full w-75 xl:w-full bg-white xl:bg-inherit transform transition-transform duration-300 z-30 ${
                                    isMobileNavOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
                                }`}
                            >
                                <div className="flex flex-col xl:items-center xl:flex-row space-y-2 xl:space-y-0 xl:space-x-8 text-left xl:text-center text-white uppercase py-10 xl:py-0">

                                    <Link 
                                      href="/" 
                                      onClick={() => setIsMobileNavOpen(false)}
                                      className={`link border-b ${pathname === "/" ? "active" : "border-transparent"} hover:border-yellow-200`}
                                    >
                                      Home
                                    </Link>

                                    {/* Services Dropdown */}
                                    <div className="relative group">
                                        <div className="cursor-pointer flex items-center link border-b border-transparent hover:border-yellow-200 uppercase" onClick={() => setMobileServicesOpen(!mobileServicesOpen)}>
                                            Services <ChevronDownIcon className="h-4 w-4 ml-2 transition-transform duration-200" />
                                        </div>

                                        {/* Desktop hover dropdown */}
                                        <div className="hidden xl:block absolute left-0 w-120 bg-white text-left text-black rounded shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 uppercase">
                                            <Link href="/corporate-limo-service" className={`block px-6 py-3 link-service ${pathname === "/corporate-limo-service" ? "service-active" : "border-transparent"}`} title='Corporate Limo Service Toronto'>
                                                Corporate Limo Service
                                            </Link>

                                            <Link href="/executive-car-hire" className={`block px-6 py-3 link-service ${pathname === "/executive-car-hire" ? "service-active" : "border-transparent"}`} title='Executive Car Hire Toronto'>
                                                Executive Car Hire
                                            </Link>

                                            <Link href="/casino-limo-service" className={`block px-6 py-3 link-service ${pathname === "/casino-limo-service" ? "service-active" : "border-transparent"}`} title='Casino Limo Service Toronto'>
                                                Casino Limo Service
                                            </Link>

                                            <Link href="/airport-transfers" className={`block px-6 py-3 link-service ${pathname === "/airport-transfers" ? "service-active" : "border-transparent"}`} title='Airport Transfers Toronto'>
                                                Airport Transfers
                                            </Link>

                                            <Link href="/wedding-cars" className={`block px-6 py-3 link-service ${pathname === "/wedding-cars" ? "service-active" : "border-transparent"}`} title='Wedding Cars Toronto'>
                                                Wedding Cars
                                            </Link>

                                            <Link href="/ladies-night-out-limo-service" className={`block px-6 py-3 link-service ${pathname === "/ladies-night-out-limo-service" ? "service-active" : "border-transparent"}`} title='Ladies Night Out Limo Service Toronto'>
                                                Ladies Night Out Limo Service
                                            </Link>

                                            <Link href="/luxury-chauffeuring-services-to-londons" className={`block px-6 py-3 link-service ${pathname === "/luxury-chauffeuring-services-to-londons" ? "service-active" : "border-transparent"}`} title='Events'>
                                                Events
                                            </Link>

                                            <Link href="/airport-meet-and-greet-services" className={`block px-6 py-3 link-service ${pathname === "/airport-meet-and-greet-services" ? "service-active" : "border-transparent"}`} title='Airport Meet and Greet Services'>
                                                Airport Meet and Greet Services
                                            </Link>

                                            <Link href="/promotions" className={`block px-6 py-3 link-service ${pathname === "/promotions" ? "service-active" : "border-transparent"}`} title='Promotions'>
                                                Promotions
                                            </Link>

                                            <Link href="/birthdays-bachelor-and-bachelorette-limo-service" className={`block px-6 py-3 link-service ${pathname === "/birthdays-bachelor-and-bachelorette-limo-service" ? "service-active" : "border-transparent"}`} title='Birthdays, Bachelor, & Bachelorette Limo Service'>
                                                Birthdays, Bachelor, & Bachelorette Limo Service
                                            </Link>

                                            <Link href="/long-distance-limo-service" className={`block px-6 py-3 link-service ${pathname === "/long-distance-limo-service" ? "service-active" : "border-transparent"}`} title='Long Distance Limo Service'>
                                                Long Distance Limo Service
                                            </Link>

                                            <Link href="/luxury-chauffeuring-services" className={`block px-6 py-3 link-service ${pathname === "/luxury-chauffeuring-services" ? "service-active" : "border-transparent"}`} title='Luxury Chauffeuring Services'>
                                                Luxury Chauffeuring Services
                                            </Link>
                                        </div>
                                        
                                        {/* Mobile dropdown */}
                                        {mobileServicesOpen && (
                                            <div className="xl:hidden mt-2 bg-white text-black rounded p-2 space-y-2 uppercase">
                                                <Link href="/corporate-limo-service" onClick={() => setIsMobileNavOpen(false)} className={`flex px-6 py-2 link-service ${pathname === "/corporate-limo-service" ? "service-active" : "border-transparent"}`} title='Corporate Limo Service Toronto'>
                                                    <ChevronRightIcon className="h-3 w-3 mr-2 mt-1 flex-shrink-0" /> Corporate Limo Service
                                                </Link>

                                                <Link href="/executive-car-hire" onClick={() => setIsMobileNavOpen(false)} className={`flex px-6 py-2 link-service ${pathname === "/executive-car-hire" ? "service-active" : "border-transparent"}`} title='Executive Car Hire Toronto'>
                                                    <ChevronRightIcon className="h-3 w-3 mr-2 mt-1 flex-shrink-0" /> Executive Car Hire
                                                </Link>

                                                <Link href="/casino-limo-service" onClick={() => setIsMobileNavOpen(false)} className={`flex px-6 py-2 link-service ${pathname === "/casino-limo-service" ? "service-active" : "border-transparent"}`} title='Casino Limo Service Toronto'>
                                                    <ChevronRightIcon className="h-3 w-3 mr-2 mt-1 flex-shrink-0" /> Casino Limo Service
                                                </Link>

                                                <Link href="/airport-transfers" onClick={() => setIsMobileNavOpen(false)} className={`flex px-6 py-2 link-service ${pathname === "/airport-transfers" ? "service-active" : "border-transparent"}`} title='Airport Transfers Toronto'>
                                                    <ChevronRightIcon className="h-3 w-3 mr-2 mt-1 flex-shrink-0" /> Airport Transfers
                                                </Link>

                                                <Link href="/wedding-cars" onClick={() => setIsMobileNavOpen(false)} className={`flex px-6 py-2 link-service ${pathname === "/wedding-cars" ? "service-active" : "border-transparent"}`} title='Wedding Cars Toronto'>
                                                    <ChevronRightIcon className="h-3 w-3 mr-2 mt-1 flex-shrink-0" /> Wedding Cars
                                                </Link>

                                                <Link href="/ladies-night-out-limo-service" onClick={() => setIsMobileNavOpen(false)} className={`flex px-6 py-2 link-service ${pathname === "/ladies-night-out-limo-service" ? "service-active" : "border-transparent"}`} title='Ladies Night Out Limo Service Toronto'>
                                                    <ChevronRightIcon className="h-3 w-3 mr-2 mt-1 flex-shrink-0" /> Ladies Night Out Limo Service
                                                </Link>

                                                <Link href="/luxury-chauffeuring-services-to-londons" onClick={() => setIsMobileNavOpen(false)} className={`flex px-6 py-2 link-service ${pathname === "/luxury-chauffeuring-services-to-londons" ? "service-active" : "border-transparent"}`} title='Events'>
                                                    <ChevronRightIcon className="h-3 w-3 mr-2 mt-1 flex-shrink-0" /> Events
                                                </Link>

                                                <Link href="/airport-meet-and-greet-services" onClick={() => setIsMobileNavOpen(false)} className={`flex px-6 py-2 link-service ${pathname === "/airport-meet-and-greet-services" ? "service-active" : "border-transparent"}`} title='Airport Meet and Greet Services'>
                                                    <ChevronRightIcon className="h-3 w-3 mr-2 mt-1 flex-shrink-0" /> Airport Meet and Greet Services
                                                </Link>

                                                <Link href="/promotions" onClick={() => setIsMobileNavOpen(false)} className={`flex px-6 py-2 link-service ${pathname === "/promotions" ? "service-active" : "border-transparent"}`} title='Promotions'>
                                                    <ChevronRightIcon className="h-3 w-3 mr-2 mt-1 flex-shrink-0" /> Promotions
                                                </Link>

                                                <Link href="/birthdays-bachelor-and-bachelorette-limo-service" onClick={() => setIsMobileNavOpen(false)} className={`flex px-6 py-2 link-service ${pathname === "/birthdays-bachelor-and-bachelorette-limo-service" ? "service-active" : "border-transparent"}`} title='Birthdays, Bachelor, & Bachelorette Limo Service'>
                                                    <ChevronRightIcon className="h-3 w-3 mr-2 mt-1 flex-shrink-0" /> Birthdays, Bachelor, & Bachelorette Limo Service
                                                </Link>

                                                <Link href="/long-distance-limo-service" onClick={() => setIsMobileNavOpen(false)} className={`flex px-6 py-2 link-service ${pathname === "/long-distance-limo-service" ? "service-active" : "border-transparent"}`} title='Long Distance Limo Service'>
                                                    <ChevronRightIcon className="h-3 w-3 mr-2 mt-1 flex-shrink-0" /> Long Distance Limo Service
                                                </Link>

                                                <Link href="/luxury-chauffeuring-services" onClick={() => setIsMobileNavOpen(false)} className={`flex px-6 py-2 link-service ${pathname === "/luxury-chauffeuring-services" ? "service-active" : "border-transparent"}`} title='Luxury Chauffeuring Services'>
                                                    <ChevronRightIcon className="h-3 w-3 mr-2 mt-1 flex-shrink-0" /> Luxury Chauffeuring Services
                                                </Link>
                                            </div>
                                        )}
                                    </div>

                                    <Link href="/about" onClick={() => setIsMobileNavOpen(false)} className={`link border-b ${pathname === "/about" ? "active" : "border-transparent"} hover:border-yellow-200`} title='About Limo Royale'>
                                        About
                                    </Link>

                                    <Link href="/luxury-limousine" onClick={() => setIsMobileNavOpen(false)} className={`link border-b ${pathname === "/luxury-limousine" ? "active" : "border-transparent"} hover:border-yellow-200`} title='Luxury Limousine'>
                                        Luxury Limousine
                                    </Link>

                                    <Link href="/bus-charter" onClick={() => setIsMobileNavOpen(false)} className={`link border-b ${pathname === "/bus-charter" ? "active" : "border-transparent"} hover:border-yellow-200`} title='Bus Charter'>
                                        Bus Charter
                                    </Link>

                                    <Link href="/areas-served" onClick={() => setIsMobileNavOpen(false)} className={`link border-b ${pathname === "/areas-served" ? "active" : "border-transparent"} hover:border-yellow-200`} title='Areas Served'>
                                        Areas Served
                                    </Link>

                                    <Link href="/fleet" onClick={() => setIsMobileNavOpen(false)} className={`link border-b ${pathname === "/fleet" ? "active" : "border-transparent"} hover:border-yellow-200`} title='Fleet'>
                                        Fleet
                                    </Link>

                                    <Link href="/contact" onClick={() => setIsMobileNavOpen(false)} className={`link border-b ${pathname === "/contact" ? "active" : "border-transparent"} hover:border-yellow-200`} title='Contact Limo Royale'>
                                        Contact
                                    </Link>

                                    <Link href="/online-reservations" onClick={() => setIsMobileNavOpen(false)} className="book-now-link px-5 py-1">
                                        Book Now
                                    </Link>

                                    <Link href="/login" onClick={() => setIsMobileNavOpen(false)} className="book-now-link px-5 py-1">
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Right Menu */}
                    <div className="w-[10%]">
                        <div className="hidden xl:flex justify-end">
                            <button className="text-white cursor-pointer" onClick={() => setIsDesktopMenuOpen(true)}>
                                <Bars3Icon className="h-8 w-8" />
                            </button>

                            <div
                                className={`fixed top-0 right-0 h-full overflow-y-scroll w-140 bg-black shadow-lg transform transition-transform duration-300 z-50 ${
                                    isDesktopMenuOpen ? "translate-x-0" : "translate-x-full"
                                }`}
                            >
                                <div className="flex justify-end items-center p-4">
                                    <button onClick={() => setIsDesktopMenuOpen(false)}>
                                        <XMarkIcon className="h-6 w-6 text-white cursor-pointer" />
                                    </button>
                                </div>

                                <div className="flex flex-col space-y-3 px-15 py-8 text-white">
                                    <Image src={logo} alt="Luxury Limo Service" className="w-full mb-10" />

                                    <b className="text-2xl">Services</b>

                                    <Link href="/corporate-limo-service" className="text-lg text-gray-300 hover:text-white">
                                        Corporate Limo Service
                                    </Link>

                                    <Link href="/executive-car-hire" className="text-lg text-gray-300 hover:text-white">
                                        Executive Car Hire
                                    </Link>

                                    <Link href="/casino-limo-service" className="text-lg text-gray-300 hover:text-white">
                                        Casino Limo Service
                                    </Link>

                                    <Link href="/airport-transfers" className="text-lg text-gray-300 hover:text-white">
                                        Airport Transfers
                                    </Link>

                                    <Link href="/wedding-cars" className="text-lg text-gray-300 hover:text-white">
                                        Wedding Cars
                                    </Link>

                                    <Link href="/luxury-chauffeuring-services-to-londons" className="text-lg text-gray-300 hover:text-white">
                                        Events
                                    </Link>

                                    <Link href="/promotions" className="text-lg text-gray-300 hover:text-white">
                                        Promotions
                                    </Link>

                                    <div className="mt-4 space-y-5 text-lg">
                                        <a href="tel:+14167255466" className="flex items-center">
                                            <div className="webBG rounded-full p-2 mr-2">
                                                <PhoneIcon className="h-4 w-4" />
                                            </div>
                                            416-725-LIMO (416-725-5466)
                                        </a>

                                        <a className="flex items-center">
                                            <div className="webBG rounded-full p-2 mr-2">
                                                <PhoneIcon className="h-4 w-4" />
                                            </div>
                                            Toll-free: 1-888-870-LIMO
                                        </a>

                                        <Link href="/online-reservations" className="inline-block book-now-link rounded-md px-7 py-2 mt-2">
                                            Book Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Overlay */}
                    {(isMobileNavOpen || isDesktopMenuOpen) && (
                        <div
                            onClick={() => {
                                setIsMobileNavOpen(false);
                                setIsDesktopMenuOpen(false);
                            }}
                            className="fixed inset-0 bg-black opacity-70 z-10"
                        ></div>
                    )}
                </div>
            </div>
        </div>

        </div>
      </nav>
    </div>
  )
}

export default Header
