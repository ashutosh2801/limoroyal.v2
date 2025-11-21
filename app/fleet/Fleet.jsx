'use client'
import React from 'react'
import { UserGroupIcon, BriefcaseIcon  } from '@heroicons/react/24/solid';
import Image from 'next/image'
import suv1 from '../../public/assets/suv/cadilac-escalade-esv.png'
import suv2 from '../../public/assets/suv/gmc-yukon-xl.png'
import suv3 from '../../public/assets/suv/suburban-high-country.png'
import suv4 from '../../public/assets/suv/lincoln-navigator-reserve.png'
import sedan1 from '../../public/assets/sedan/mercedes-benz-s-class.png'
import sedan2 from '../../public/assets/sedan/audi-s8.png'
import sedan3 from '../../public/assets/sedan/bmw-7-series.png'
import sedan4 from '../../public/assets/sedan/tesla-model-s.png'
import coaches1 from '../../public/assets/coaches/prevost-h3.png'
import coaches2 from '../../public/assets/coaches/temsa.png'
import coaches3 from '../../public/assets/coaches/mini-bus.png'
import coaches4 from '../../public/assets/coaches/sprinter-van.png'
import Stretch1 from '../../public/assets/limousines/stretch.png'
import Stretch2 from '../../public/assets/limousines/limo.png'
import Stretch3 from '../../public/assets/limousines/ultra-stretch.png'
import Stretch4 from '../../public/assets/limousines/royale-stretch.png'

const Fleet = () => {
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
                            <li>Fleet</li>
                            </ul>
                        </div>
                        <h2 className='text-white text-2xl lg:text-6xl leading-snug my-5 font-medium'>Fleet</h2>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className='container mx-auto px-2'>
                <div className='pt-10 lg:pt-0 pb-10 mt-10' data-aos="fade-up">
                    <h1 className='text-white text-2xl lg:text-4xl leading-snug my-5'>Our Fleet</h1>
                    <p className='text-base leading-relaxed webFontColor'>
                    At Limo Royale, we understand the importance of seamless, professional travel for your business. Whether it’s for conferences, team-building retreats, business meetings, or corporate outings, our corporate charter service offers unmatched comfort, style, and efficiency. From initial booking to final drop-off, we ensure your team experiences a flawless journey, so you can focus on what matters most—your business.
                    </p>
                </div>
            </div>
        </div>
        <div>
            <div className='container mx-auto px-2'>
                <div className='mb-20'>
                    <h2 className='text-white text-2xl lg:text-4xl leading-snug my-5'>SUV</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                        <div className='bg-[#0a0a0a] p-5 text-center' data-aos="fade-up">
                            <Image src={suv1} className='w-full h-45 mb-5 mt-5 object-contain' alt='Cadilac Escalade ESV' />
                            <h3 className='text-white text-2xl inline-block my-5'>Cadilac Escalade ESV</h3>
                            <ul className='flex justify-center gap-5'>
                                <li className='flex items-center gap-2'>
                                    <UserGroupIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>6</small>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <BriefcaseIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>6</small>
                                </li>
                            </ul>
                            <p className='text-base leading-relaxed webFontColor my-5'>
                                Ideal for single passengers or small groups
                            </p>
                            <a href='/online-reservations' className='webColor inline-block text-sm px-10 py-5 uppercase'>Book Now</a>
                        </div>
                        <div className='bg-[#0a0a0a] p-5 text-center' data-aos="fade-up">
                            <Image src={suv2} className='w-full h-45 mb-5 mt-5 object-contain' alt='GMC Yukon XL' />
                            <h3 className='text-white text-2xl inline-block my-5'>GMC Yukon XL</h3>
                            <ul className='flex justify-center gap-5'>
                                <li className='flex items-center gap-2'>
                                    <UserGroupIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>6</small>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <BriefcaseIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>6</small>
                                </li>
                            </ul>
                            <p className='text-base leading-relaxed webFontColor my-5'>
                                Traditional limo options for small to medium groups.
                            </p>
                            <a href='/online-reservations' className='webColor inline-block text-sm px-10 py-5 uppercase'>Book Now</a>
                        </div>
                        <div className='bg-[#0a0a0a] p-5 text-center' data-aos="fade-up">
                            <Image src={suv3} className='w-full h-45 mb-5 mt-5 object-contain' alt='Suburban High Country' />
                            <h3 className='text-white text-2xl inline-block my-5'>Suburban High Country</h3>
                            <ul className='flex justify-center gap-5'>
                                <li className='flex items-center gap-2'>
                                    <UserGroupIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>6</small>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <BriefcaseIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>6</small>
                                </li>
                            </ul>
                            <p className='text-base leading-relaxed webFontColor my-5'>
                                Larger limousines for additional space and comfort.
                            </p>
                            <a href='/online-reservations' className='webColor inline-block text-sm px-10 py-5 uppercase'>Book Now</a>
                        </div>
                        <div className='bg-[#0a0a0a] p-5 text-center' data-aos="fade-up">
                            <Image src={suv4} className='w-full h-45 mb-5 mt-5 object-contain' alt='Lincoln Navigator Reserve L' />
                            <h3 className='text-white text-2xl inline-block my-5'>Lincoln Navigator Reserve L</h3>
                            <ul className='flex justify-center gap-5'>
                                <li className='flex items-center gap-2'>
                                    <UserGroupIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>6</small>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <BriefcaseIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>6</small>
                                </li>
                            </ul>
                            <p className='text-base leading-relaxed webFontColor my-5'>
                                Party bus for special occasions like birthdays or bachelor/bachelorette parties.
                            </p>
                            <a href='/online-reservations' className='webColor inline-block text-sm px-10 py-5 uppercase'>Book Now</a>
                        </div>
                    </div>
                </div>
                <div className='mb-20'>
                    <h2 className='text-white text-2xl lg:text-4xl leading-snug my-5'>SEDAN</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                        <div className='bg-[#0a0a0a] p-5 text-center' data-aos="fade-up">
                            <Image src={sedan1} className='w-full h-45 mb-5 mt-5 object-contain' alt='Mercedes-Benz S-Class LWB' />
                            <h3 className='text-white text-2xl inline-block my-5'>Mercedes-Benz S-Class LWB</h3>
                            <ul className='flex justify-center gap-5'>
                                <li className='flex items-center gap-2'>
                                    <UserGroupIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>4</small>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <BriefcaseIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>2</small>
                                </li>
                            </ul>
                            <a href='/online-reservations' className='webColor inline-block text-sm px-10 py-5 uppercase'>Book Now</a>
                        </div>
                        <div className='bg-[#0a0a0a] p-5 text-center' data-aos="fade-up">
                            <Image src={sedan2} className='w-full h-45 mb-5 mt-5 object-contain' alt='Audi S8-L' />
                            <h3 className='text-white text-2xl inline-block my-5'>Audi S8-L</h3>
                            <ul className='flex justify-center gap-5'>
                                <li className='flex items-center gap-2'>
                                    <UserGroupIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>4</small>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <BriefcaseIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>2</small>
                                </li>
                            </ul>
                            <a href='/online-reservations' className='webColor inline-block text-sm px-10 py-5 uppercase'>Book Now</a>
                        </div>
                        <div className='bg-[#0a0a0a] p-5 text-center' data-aos="fade-up">
                            <Image src={sedan3} className='w-full h-45 mb-5 mt-5 object-contain' alt='BMW 7 Series' />
                            <h3 className='text-white text-2xl inline-block my-5'>BMW 7 Series</h3>
                            <ul className='flex justify-center gap-5'>
                                <li className='flex items-center gap-2'>
                                    <UserGroupIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>4</small>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <BriefcaseIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>2</small>
                                </li>
                            </ul>
                            <a href='/online-reservations' className='webColor inline-block text-sm px-10 py-5 uppercase'>Book Now</a>
                        </div>
                        <div className='bg-[#0a0a0a] p-5 text-center' data-aos="fade-up">
                            <Image src={sedan4} className='w-full h-45 mb-5 mt-5 object-contain' alt='TESLA Model S' />
                            <h3 className='text-white text-2xl inline-block my-5'>TESLA Model S</h3>
                            <ul className='flex justify-center gap-5'>
                                <li className='flex items-center gap-2'>
                                    <UserGroupIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>4</small>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <BriefcaseIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>2</small>
                                </li>
                            </ul>
                            <a href='/online-reservations' className='webColor inline-block text-sm px-10 py-5 uppercase'>Book Now</a>
                        </div>
                    </div>
                </div>
                <div className='mb-20'>
                    <h2 className='text-white text-2xl lg:text-4xl leading-snug my-5'>Luxury Coaches</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                        <div className='bg-[#0a0a0a] p-5 text-center' data-aos="fade-up">
                            <Image src={coaches1} className='w-full h-45 mb-5 mt-5 object-contain' alt='Prevost H3' />
                            <h3 className='text-white text-2xl inline-block my-5'>Prevost H3</h3>
                            <ul className='flex justify-center gap-5'>
                                <li className='flex items-center gap-2'>
                                    <UserGroupIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>56</small>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <BriefcaseIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>112</small>
                                </li>
                            </ul>
                            <p className='text-base leading-relaxed webFontColor my-5'>
                                Ideal for large events and tours, offering unmatched luxury and spacious seating.
                            </p>
                            <a href='/online-reservations' className='webColor inline-block text-sm px-10 py-5 uppercase'>Book Now</a>
                        </div>
                        <div className='bg-[#0a0a0a] p-5 text-center' data-aos="fade-up">
                            <Image src={coaches2} className='w-full h-45 mb-5 mt-5 object-contain' alt='TEMSA' />
                            <h3 className='text-white text-2xl inline-block my-5'>TEMSA</h3>
                            <ul className='flex justify-center gap-5'>
                                <li className='flex items-center gap-2'>
                                    <UserGroupIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>34</small>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <BriefcaseIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>68</small>
                                </li>
                            </ul>
                            <p className='text-base leading-relaxed webFontColor my-5'>
                                Perfect for mid-sized groups seeking comfort and sophistication.
                            </p>
                            <a href='/online-reservations' className='webColor inline-block text-sm px-10 py-5 uppercase'>Book Now</a>
                        </div>
                        <div className='bg-[#0a0a0a] p-5 text-center' data-aos="fade-up">
                            <Image src={coaches3} className='w-full h-45 mb-5 mt-5 object-contain' alt='Mini Bus' />
                            <h3 className='text-white text-2xl inline-block my-5'>Mini Bus</h3>
                            <ul className='flex justify-center gap-5'>
                                <li className='flex items-center gap-2'>
                                    <UserGroupIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>24</small>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <BriefcaseIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>48</small>
                                </li>
                            </ul>
                            <p className='text-base leading-relaxed webFontColor my-5'>
                                An excellent choice for smaller groups with luxury and convenience in mind.
                            </p>
                            <a href='/online-reservations' className='webColor inline-block text-sm px-10 py-5 uppercase'>Book Now</a>
                        </div>
                        <div className='bg-[#0a0a0a] p-5 text-center' data-aos="fade-up">
                            <Image src={coaches4} className='w-full h-45 mb-5 mt-5 object-contain' alt='Sprinter VAN' />
                            <h3 className='text-white text-2xl inline-block my-5'>Sprinter VAN</h3>
                            <ul className='flex justify-center gap-5'>
                                <li className='flex items-center gap-2'>
                                    <UserGroupIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>14</small>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <BriefcaseIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>28</small>
                                </li>
                            </ul>
                            <p className='text-base leading-relaxed webFontColor my-5'>
                                Tailored for intimate group travel with top-tier amenities.
                            </p>
                            <a href='/online-reservations' className='webColor inline-block text-sm px-10 py-5 uppercase'>Book Now</a>
                        </div>
                    </div>
                </div>
                <div className='mb-20'>
                    <h2 className='text-white text-2xl lg:text-4xl leading-snug my-5'>Stretch Limousines</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                        <div className='bg-[#0a0a0a] p-5 text-center' data-aos="fade-up">
                            <Image src={Stretch1} className='w-full h-45 mb-5 mt-5 object-contain' alt='Royale Stretch Limousines' />
                            <h3 className='text-white text-2xl inline-block my-5'>Royale Stretch Limousines</h3>
                            <ul className='flex justify-center gap-5'>
                                <li className='flex items-center gap-2'>
                                    <UserGroupIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>6-10</small>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <BriefcaseIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>6</small>
                                </li>
                            </ul>
                            <p className='text-base leading-relaxed webFontColor my-5'>
                                Perfect for small group events, offering comfort and a touch of elegance for intimate gatherings or corporate transfers.
                            </p>
                            <a href='/online-reservations' className='webColor inline-block text-sm px-10 py-5 uppercase'>Book Now</a>
                        </div>
                        <div className='bg-[#0a0a0a] p-5 text-center' data-aos="fade-up">
                            <Image src={Stretch2} className='w-full h-45 mb-5 mt-5 object-contain' alt='Royale Super Stretch Limo' />
                            <h3 className='text-white text-2xl inline-block my-5'>Royale Super Stretch Limo</h3>
                            <ul className='flex justify-center gap-5'>
                                <li className='flex items-center gap-2'>
                                    <UserGroupIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>10-12</small>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <BriefcaseIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>10</small>
                                </li>
                            </ul>
                            <p className='text-base leading-relaxed webFontColor my-5'>
                                Combines luxury and spacious seating for medium-sized parties, weddings, or upscale outings
                            </p>
                            <a href='/online-reservations' className='webColor inline-block text-sm px-10 py-5 uppercase'>Book Now</a>
                        </div>
                        <div className='bg-[#0a0a0a] p-5 text-center' data-aos="fade-up">
                            <Image src={Stretch3} className='w-full h-45 mb-5 mt-5 object-contain' alt='Royale Ultra Stretch Limos' />
                            <h3 className='text-white text-2xl inline-block my-5'>Royale Ultra Stretch Limos</h3>
                            <ul className='flex justify-center gap-5'>
                                <li className='flex items-center gap-2'>
                                    <UserGroupIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>14-20</small>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <BriefcaseIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>10</small>
                                </li>
                            </ul>
                            <p className='text-base leading-relaxed webFontColor my-5'>
                                A top-tier option for large groups, offering luxury seating, entertainment systems, and unmatched sophistication
                            </p>
                            <a href='/online-reservations' className='webColor inline-block text-sm px-10 py-5 uppercase'>Book Now</a>
                        </div>
                    </div>
                </div>
                <div className='mb-20'>
                    <h2 className='text-white text-2xl lg:text-4xl leading-snug my-5'>Royale Grand Party Coach</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                        <div className='bg-[#0a0a0a] p-5 text-center' data-aos="fade-up">
                            <Image src={Stretch4} className='w-full h-45 mb-5 mt-5 object-contain' alt='Royale Stretch Limousines' />
                            <h3 className='text-white text-2xl inline-block my-5'>Royale Stretch Limousines</h3>
                            <ul className='flex justify-center gap-5'>
                                <li className='flex items-center gap-2'>
                                    <UserGroupIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>30-40</small>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <BriefcaseIcon className="h-5 w-5 webColor" />
                                    <small className='text-white'>35</small>
                                </li>
                            </ul>
                            <p className='text-base leading-relaxed webFontColor my-5'>
                                A top-tier party coach with luxury amenities, including a VIP lounge area, karaoke setup, dance pole, and customizable lighting. Perfect for weddings, large group events, or all-night celebrations
                            </p>
                            <a href='/online-reservations' className='webColor inline-block text-sm px-10 py-5 uppercase'>Book Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}

export default Fleet