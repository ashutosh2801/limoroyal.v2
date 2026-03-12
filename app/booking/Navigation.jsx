'use client'

import React, { useState, useEffect } from 'react'
import { PhoneIcon, Bars3Icon, XMarkIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import logo from "../../public/assets/limo-royale.png"

const Navigation = () => {
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
        <div className='header absolute mt-3 w-full text-[15px]'>

          {/* Top logo + contact */}
          <div className='border-b webBorderColor pb-2 relative z-50'>
            <div className='container mx-auto px-2'>
              <div className='flex flex-row items-center justify-between'>

                {/* Logo */}
                <div className='w-1/2 lg:w-1/4'>
                  <Link href='/'>
                    <Image
                      src={logo}
                      alt='Luxury Limo Service for Memorable Rides - Limo Royal'
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
                    <div className="w-full">
                        {/* main menu */}
                        <div className="relative z-55">
                            <div
                                className={`overflow-y-scroll xl:overflow-y-visible fixed xl:relative top-0 left-0 h-full w-75 xl:w-full bg-white xl:bg-inherit transform transition-transform duration-300 z-30 ${
                                    isMobileNavOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
                                }`}
                            >
                                <div className="flex flex-col xl:justify-between xl:items-center xl:flex-row space-y-2 xl:space-y-0 text-left xl:text-center text-white uppercase py-10 xl:py-0">
                                    <div className='flex flex-col xl:flex-row gap-2 xl:gap-8'>
                                        <Link 
                                        href="/" 
                                        onClick={() => setIsMobileNavOpen(false)} className='link border-b border-transparent hover:border-yellow-200'
                                        >
                                        Home
                                        </Link>

                                        <Link href="/booking#services" onClick={() => setIsMobileNavOpen(false)} className='link border-b border-transparent hover:border-yellow-200'>
                                            Services
                                        </Link>

                                        <Link href="/booking#fleet" onClick={() => setIsMobileNavOpen(false)} className='link border-b border-transparent hover:border-yellow-200'>
                                            Fleet
                                        </Link>

                                        <Link href="/booking#reviews" onClick={() => setIsMobileNavOpen(false)} className='link border-b border-transparent hover:border-yellow-200'>
                                            Reviews
                                        </Link>

                                        <Link href="/booking#faq" onClick={() => setIsMobileNavOpen(false)} className='link border-b border-transparent hover:border-yellow-200'>
                                            FAQ
                                        </Link>
                                    </div>
                                    <div className='flex flex-col xl:flex-row gap-2 xl:gap-8'>
                                        <Link href="https://limoroyal.com/booking#quote" onClick={() => setIsMobileNavOpen(false)} className="book-now-link px-5 py-1">
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

export default Navigation
