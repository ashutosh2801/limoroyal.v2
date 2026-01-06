'use client'

import React from 'react'
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/solid'
import { 
  FaFacebookF, FaInstagram, FaTwitter, 
  FaPinterest, FaYoutube, FaLinkedin, FaTiktok 
} from 'react-icons/fa'
import Link from 'next/link'
import FloatingActions from './FloatingActions';

const Footer = () => {
  return (
    <div className='border-t lg:border-0 webBorderColor'>
      <div className='container mx-auto px-2'>
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 lg:space-x-3 space-y-5 lg:space-y-0 pt-5 md:pt-15 md:pb-10'>
          {/* Column 1 */}
          <div className='text-[13px] md:text-[16px]'>
            <h6 className='text-white text-base md:text-xl font-semibold mb-5'>Limo</h6>

            <Link href='/' className='webFontColor block mb-3' title='Luxury Limo & Airport Chauffeur Service'>Home</Link>
            <Link href='/about' className='webFontColor block mb-3' title='About Limo Royale'>About</Link>
            <Link href='/bus-charter' className='webFontColor block mb-3' title='Bus Charter'>Bus Charter</Link>
            <Link href='/online-reservations' className='webFontColor block mb-3' title='Book Now'>Book Now</Link>
            <Link href='/blog' className='webFontColor block mb-3' title='Blog'>Blog</Link>
            <Link href='/contact' className='webFontColor block mb-3' title='Contact Limo Royale'>Contact Us</Link>
            <Link href='/sitemap' className='webFontColor block mb-3' title='Sitemap'>Sitemap</Link>
          </div>

          {/* Column 2 */}
          <div className='text-[13px] md:text-[16px]'>
            <h6 className='text-white text-base md:text-xl font-semibold mb-5'>Services</h6>

            <Link href='/corporate-limo-service' className='webFontColor block mb-3'>Corporate Limo Service</Link>
            <Link href='/executive-car-hire' className='webFontColor block mb-3'>Executive Car Hire</Link>
            <Link href='/casino-limo-service' className='webFontColor block mb-3'>Casino Limo Service</Link>
            <Link href='/airport-transfers' className='webFontColor block mb-3'>Airport Transfers</Link>
            <Link href='/wedding-cars' className='webFontColor block mb-3'>Wedding Cars</Link>
            <Link href='/luxury-chauffeuring-services-to-londons' className='webFontColor block mb-3'>Events</Link>
            <Link href='/promotions' className='webFontColor block mb-3'>Promotions</Link>
          </div>

          {/* Column 3 */}
          <div className='text-[13px] md:text-[16px]'>
            <h6 className='text-white text-base md:text-xl font-semibold mb-5'>Our Tours</h6>

            <Link href='/areas-served#niagara-falls' className='webFontColor block mb-3'>Niagara Falls Tours</Link>
            <Link href='/areas-served#thousand-islands' className='webFontColor block mb-3'>1000 Islands Tours</Link>
            <Link href='/areas-served#toronto-city' className='webFontColor block mb-3'>Toronto City Tours</Link>
            <Link href='/areas-served#ottawa-tours' className='webFontColor block mb-3'>Ottawa Tours</Link>
            <Link href='/areas-served#montreal-tours' className='webFontColor block mb-3'>Montreal Tours</Link>
            <Link href='/areas-served#sault-marie-tours' className='webFontColor block mb-3'>Sault Ste. Marie Tours</Link>
            <Link href='/areas-served#blue-mountains-tours' className='webFontColor block mb-3'>Blue Mountains Tours</Link>
          </div>

          {/* Column 4 */}
          <div className='text-[13px] md:text-[16px]'>
            <h6 className='text-white text-base md:text-xl font-semibold mb-5'>Our Fleet</h6>

            <Link href='/fleet#sedan' className='webFontColor block mb-3'>Luxury Sedan</Link>
            <Link href='/fleet#suv' className='webFontColor block mb-3'>Luxury SUV</Link>
            <Link href='/fleet#coaches' className='webFontColor block mb-3'>Luxury Van</Link>
            <Link href='/fleet#limousines' className='webFontColor block mb-3'>Stretch Limousines</Link>
            <Link href='/fleet#coaches' className='webFontColor block mb-3'>Luxury Coaches</Link>
            <Link href='/fleet#coaches' className='webFontColor block mb-3'>Bus</Link>
            <Link href='/fleet#grand-party-coach' className='webFontColor block mb-3'>Grand Party Coach</Link>
          </div>

          {/* Column 5 */}
          <div className='hidden md:block'>
            <h6 className='text-white text-xl font-semibold mb-5'>Contact Us</h6>

            {/* Phone */}
            <div className='mt-5 flex items-start flex-wrap'>
              <div className='bg-white rounded-full px-3 py-3 mr-5 inline-block'>
                <PhoneIcon className="h-4 w-4 webColor" />
              </div>
              <a href='tel:+14167255466' className='webFontColor' title='Limo Hotline'>
                416-725-LIMO <br /> (416-725-5466)
              </a>
              <a href='tel:18888705466' className='webFontColor ml-15 mt-5' title='Limo Royale Toll Free'>
                Toll-Free: <br /> 1 (888) 870-LIMO (5466)
              </a>
            </div>

            {/* Email */}
            <div className='mt-5 flex items-start flex-wrap'>
              <div className='bg-white rounded-full px-3 py-3 mr-5 inline-block'>
                <EnvelopeIcon className="h-4 w-4 webColor" />
              </div>
              <a href='mailto:book@limo-royale.com' className='webFontColor' title='Limo Royale Email'>
                Email: <br /> book@limoroyal.com
              </a>
            </div>

            {/* Address */}
            <div className='mt-5 flex items-start flex-wrap'>
              <div className='bg-white rounded-full px-3 py-3 mr-5 inline-block'>
                <MapPinIcon className="h-4 w-4 webColor" />
              </div>
              <a href='https://maps.app.goo.gl/tvrQxosc5Fjq58Dx7' target='_blank' className='webFontColor' title='Limo Royale Email'>
                Address: <br /> 16 Arnold St, Toronto,<br></br> ON M8Z 5A6
              </a>
            </div>
          </div>
        </div>

        {/* ================= MOBILE VIEW ONLY ================= */}
        <div className='block md:hidden mb-5 text-[13px]'>
          <h6 className='text-white text-base font-semibold mb-5'>Contact Us</h6>

          {/* Phone */}
          <div className='mt-5 flex items-start flex-wrap'>
            <div className='bg-white rounded-full px-3 py-3 mr-5 inline-block'>
              <PhoneIcon className="h-4 w-4 webColor" />
            </div>
            <a href='tel:+14167255466' className='webFontColor' title='Limo Hotline'>
              416-725-LIMO <br /> (416-725-5466)
            </a>
            <a href='tel:18888705466' className='webFontColor ml-15 mt-5' title='Limo Royale Toll Free'>
              Toll-Free: <br /> 1 (888) 870-LIMO (5466)
            </a>
          </div>

          {/* Email */}
          <div className='mt-5 flex items-start flex-wrap'>
            <div className='bg-white rounded-full px-3 py-3 mr-5 inline-block'>
              <EnvelopeIcon className="h-4 w-4 webColor" />
            </div>
            <a href='mailto:book@limo-royale.com' className='webFontColor' title='Limo Royale Email'>
              Email: <br /> book@limoroyal.com
            </a>
          </div>

          {/* Address */}
          <div className='mt-5 flex items-start flex-wrap'>
            <div className='bg-white rounded-full px-3 py-3 mr-5 inline-block'>
              <MapPinIcon className="h-4 w-4 webColor" />
            </div>
            <a href='mailto:book@limo-royale.com' className='webFontColor' title='Limo Royale Email'>
              Address: <br /> 16 Arnold St, Toronto,<br></br> ON M8Z 5A6
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className='flex flex-col md:flex-row md:justify-between items-center py-3 border-t webBorderColor'>
          <p className='webFontColor text-[13px] md:text-[16px] mb-2 md:mb-0'>© 2025 Limo Royale, All Rights Reserved</p>
          <div>
            <a href="https://web.facebook.com/LimoRoyalelux" target="_blank" className="p-2 text-lg mr-1 rounded-lg text-white social-icon inline-block">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/limoroyale/" target="_blank" className="p-2 text-lg mr-1 rounded-lg text-white social-icon inline-block">
              <FaInstagram />
            </a>
            <a href="https://www.tiktok.com/@limoroyale" target="_blank" className="p-2 text-lg mr-1 rounded-lg text-white social-icon inline-block">
              <FaTiktok />
            </a>
            <a href="https://www.youtube.com/@LimoRoyalelux/shorts" target="_blank" className="p-2 text-lg mr-1 rounded-lg text-white social-icon inline-block">
              <FaYoutube />
            </a>
            <a href="https://www.linkedin.com/company/limo-royale" target="_blank" className="p-2 text-lg mr-1 rounded-lg text-white social-icon inline-block">
              <FaLinkedin />
            </a>
            <a href="https://x.com/limoroyalelux" target="_blank" className="p-2 text-lg mr-1 rounded-lg text-white social-icon inline-block">
              <FaTwitter />
            </a>
            <a href="https://www.pinterest.com/limoroyale/" target="_blank" className="p-2 text-lg mr-1 rounded-lg text-white social-icon inline-block">
              <FaPinterest />
            </a>
          </div>
        </div>
      </div>
      <FloatingActions />
    </div>
  )
}

export default Footer
