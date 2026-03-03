'use client'

import React from 'react'
import Image from 'next/image'
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/solid'
import { 
  FaFacebookF, FaInstagram, FaTwitter, 
  FaPinterest, FaYoutube, FaLinkedin, FaTiktok 
} from 'react-icons/fa'
import FloatingActions from '../components/FloatingActions'
import logo from '../../public/assets/limo-royale.png'

const Footer = () => {
  return (
    <footer className='pt-14'>

      <div className='container mx-auto px-4'>

        {/* Top Section */}
        <div className='grid md:grid-cols-2 gap-10 items-start'>

            {/* Logo - LEFT */}
            <div>
                <Image 
                    src={logo} 
                    alt="Limo Royale Logo" 
                    width={180} 
                    height={60} 
                    className="mb-6"
                />
                <p className='webFontColor text-sm leading-relaxed max-w-xs'>
                    Premium luxury transportation delivering comfort, punctuality,
                    and professionalism for every journey.
                </p>
            </div>

            {/* Contact Info - RIGHT */}
            <div className="space-y-6 text-sm md:ml-auto">

                {/* Phone */}
                <div className="flex items-start">
                    <div className="w-6 flex justify-center">
                        <PhoneIcon className="h-5 w-5 text-[#bb9a4b]" />
                    </div>
                    <div className="ml-4 text-white leading-tight">
                        <a href="tel:+14167255466" className="block hover:text-[#bb9a4b] transition">
                        416-725-LIMO <br /> (416-725-5466)
                        </a>
                    </div>
                </div>

                {/* Phone */}
                <div className="flex items-start">
                    <div className="w-6 flex justify-center">
                        <PhoneIcon className="h-5 w-5 text-[#bb9a4b]" />
                    </div>
                    <div className="ml-4 text-white leading-tight">
                        <a href="tel:18888705466" className="block hover:text-[#bb9a4b] transition">
                        Toll-Free: <br /> 1 (888) 870-LIMO (5466)
                        </a>
                    </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                    <div className="w-6 flex justify-center">
                        <EnvelopeIcon className="h-5 w-5 text-[#bb9a4b]" />
                    </div>
                    <div className="ml-4">
                        <a
                        href="mailto:book@limoroyal.com"
                        className="text-white hover:text-[#bb9a4b] transition"
                        >
                        book@limoroyal.com
                        </a>
                    </div>
                </div>

                {/* Address */}
                <div className="flex items-start">
                    <div className="w-6 flex justify-center">
                        <MapPinIcon className="h-5 w-5 text-[#bb9a4b]" />
                    </div>
                    <div className="ml-4">
                        <a
                        href="https://maps.app.goo.gl/tvrQxosc5Fjq58Dx7"
                        target="_blank"
                        className="text-white hover:text-[#bb9a4b] transition"
                        >
                        16 Arnold St, Toronto, ON M8Z 5A6
                        </a>
                    </div>
                </div>

            </div>

        </div>

        {/* Bottom Section */}
        <div className='flex flex-col md:flex-row md:justify-between items-center mt-12 py-6 border-t border-[#1f1f1f]'>

          <p className='webFontColor text-sm mb-4 md:mb-0'>
            © 2026 Limo Royale, All Rights Reserved
          </p>

          <div>
            <a href="https://web.facebook.com/LimoRoyalelux" target="_blank" className="p-2 text-lg mr-1 text-white hover:text-[#bb9a4b] transition inline-block">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/limoroyale/" target="_blank" className="p-2 text-lg mr-1 text-white hover:text-[#bb9a4b] transition inline-block">
              <FaInstagram />
            </a>
            <a href="https://www.tiktok.com/@limoroyale" target="_blank" className="p-2 text-lg mr-1 text-white hover:text-[#bb9a4b] transition inline-block">
              <FaTiktok />
            </a>
            <a href="https://www.youtube.com/@LimoRoyalelux/shorts" target="_blank" className="p-2 text-lg mr-1 text-white hover:text-[#bb9a4b] transition inline-block">
              <FaYoutube />
            </a>
            <a href="https://www.linkedin.com/company/limo-royale" target="_blank" className="p-2 text-lg mr-1 text-white hover:text-[#bb9a4b] transition inline-block">
              <FaLinkedin />
            </a>
            <a href="https://x.com/limoroyalelux" target="_blank" className="p-2 text-lg mr-1 text-white hover:text-[#bb9a4b] transition inline-block">
              <FaTwitter />
            </a>
            <a href="https://www.pinterest.com/limoroyale/" target="_blank" className="p-2 text-lg mr-1 text-white hover:text-[#bb9a4b] transition inline-block">
              <FaPinterest />
            </a>
          </div>

        </div>

      </div>

      <FloatingActions />
    </footer>
  )
}

export default Footer