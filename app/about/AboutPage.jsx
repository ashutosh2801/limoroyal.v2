'use client'

import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadset } from '@fortawesome/free-solid-svg-icons'
import AboutBanner from '../../public/assets/banners/about-banner.jpg'
import AboutBanner2 from '../../public/assets/banners/about-banner2.jpg'
import AboutBanner3 from '../../public/assets/banners/about-banner3.jpg'
import GlobalImg1 from '../../public/assets/banners/global-1.jpg'
import GlobalImg2 from '../../public/assets/banners/global-2.jpg'

const AboutPage = () => {
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
                  <li>About</li>
                  </ul>
              </div>
              <h2 className='text-white text-2xl lg:text-6xl leading-snug my-5 font-medium'>About</h2>
              </div>
          </div>
          </div>
      </div>

      <div>
        <div className='container mx-auto px-2' data-aos="fade-up">
          <div className='pt-20 lg:pt-10 pb-5'>
            <small className='text-sm webColor uppercase'>Finest Transport</small>
            <h1 className='text-white text-2xl lg:text-4xl mb-5 lg:mb-0 pr-0 xl:pr-200 leading-snug font-medium'>Experience True Luxury with Over 20 Years of Global Expertise</h1>
          </div>
          <div>
            <p className='webFontColor text-base leading-relaxed'>At Limo Royale, we are more than just a transportation company—we are curators of unforgettable, luxurious experiences. With over 20 years of expertise spanning multiple countries, including our deep involvement in the hotel and hospitality industry, we understand better than anyone how to deliver exceptional service. Our goal is not just to offer limo rides, but to provide a royal experience that sets a new standard in luxury transportation.</p>
          </div>
          <div data-aos="fade-up">
            <h2 className='text-white text-2xl lg:text-4xl leading-snug mt-10 mb-5'>Our Legacy of Excellence</h2>
            <p className='text-base leading-relaxed webFontColor'>
              Having worked with elite clients across the globe, we know that true luxury is not about flashy exteriors—it’s about the details that make every journey special. At Limo Royale, we blend our knowledge of the hospitality industry with our passion for delivering unparalleled transportation services. We’ve served VIPs, business executives, and high-profile clients who demand the very best, and that’s exactly what we deliver. Our expertise in the hospitality industry gives us a unique edge: we understand what it takes to make our clients feel truly royal.
            </p>
            <div className='pb-10 mb-15 border-b webBorderColor'>
              <h3 className='text-white text-2xl mt-10 mb-10'>What Makes Limo Royale Unique?</h3>
              <div className='grid lg:grid-cols-3 lg:space-x-10 space-y-10 lg:space-y-0'>
                <div className='bg-[#0a0a0a] p-7'>
                  <h4 className='text-white text-xl lg:text-2xl mb-5'>A Royal Experience, Every Time</h4>
                  <p className='text-base leading-relaxed webFontColor'>Unlike other limo services, we don’t believe in just getting you from point A to point B. With Limo Royale, no detail is too small. We are committed to creating a royal experience from the moment you step into one of our vehicles. Our approach is different because we prioritize your comfort, privacy, and the feeling of being treated like royalty. Our clients enjoy it.</p>
                </div>
                <div className='bg-[#0a0a0a] p-7'>
                  <h4 className='text-white text-xl lg:text-2xl mb-5'>Exclusive Fleet Under Two Years Old</h4>
                  <p className='text-base leading-relaxed webFontColor'>To ensure that our clients always experience the height of luxury, we keep our entire fleet less than two years old. Each vehicle is meticulously maintained, equipped with the latest in comfort, technology, and performance. Whether you prefer the smooth sophistication of a luxury sedan or the commanding presence of an SUV.</p>
                </div>
                <div className='bg-[#0a0a0a] p-7'>
                  <h4 className='text-white text-xl lg:text-2xl mb-5'>Personalized Service</h4>
                  <p className='text-base leading-relaxed webFontColor'>With Limo Royale, no detail is too small. Our clients enjoy a personalized travel experience that reflects their unique needs and preferences. From tailored itineraries to VIP treatment at every stage of the journey, we ensure that your travel with us is seamless and truly memorable. Our dedicated team meticulously plans every aspect, providing luxury, comfort, and convenience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Image src={AboutBanner} className='w-full h-[300px] lg:h-[550px] object-cover object-bottom' alt='Experience the Luxury Transportation' />
      </div>

      <div>
        <div className='container mx-auto px-2'>
          <div className='grid md:grid-cols-2 space-x-4 pt-17' data-aos="fade-up">
            <div>
              <small className='text-sm webColor uppercase'>Our Vision</small>
              <h2 className='text-white text-2xl lg:text-4xl mb-5 lg:mb-0 leading-snug font-medium'>Our Global Experience</h2>
            </div>
            <div>
              <p className='webFontColor text-base leading-relaxed'>With over two decades of experience across various regions and industries, Limo Royale has gained invaluable insight into what it takes to serve clients at the highest level. Our deep roots in the luxury hotel industry have taught us the importance of not just meeting expectations, but exceeding them. We don’t aim to be just another limo service—we strive to be the best, offering an experience that mirrors the finest standards of hospitality found in the world’s leading hotel chains.</p>
              <a href='tel:+14167255466' title='Limo Royale Hotline' className='webFontColor mt-5 block'>
                <div className='bg-white rounded-full px-3 lg:px-4 py-4 mr-2 inline-block'><FontAwesomeIcon icon={faHeadset} className="text-red-800 text-3xl" /></div> <span className='webColor'>Call Center:</span> 416-725-5466
              </a>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className='relative pt-5 lg:pt-5 pb-17'>
          <div className='container mx-auto px-2'>
            <h2 className='text-white text-2xl lg:text-3xl leading-snug my-5 font-medium'>Our Values: Luxury, Precision, Royal Treatment</h2>
            <div className='grid lg:grid-cols-3 lg:space-x-5 space-y-5 lg:space-y-0 mt-10'>
              <div className='bg-[#0a0a0a] p-6' data-aos="fade-up">
                <h4 className='text-white text-xl lg:text-2xl mb-5'>Luxury Above All</h4>
                <p className='text-base leading-relaxed webFontColor'>Every detail of our service is crafted with luxury in mind. From the hand-selected fleet to our team of professional chauffeurs, Limo Royale embodies elegance, exclusivity, and refinement.</p>
              </div>
              <div className='bg-[#0a0a0a] p-6' data-aos="fade-up">
                <h4 className='text-white text-xl lg:text-2xl mb-5'>Precision & Punctualit</h4>
                <p className='text-base leading-relaxed webFontColor'>We understand the value of time. Our commitment to punctuality and professionalism ensures that every journey with Limo Royale is smooth, reliable, and stress-free. Our experienced chauffeurs are trained not only in safe driving but also in delivering the highest level of service.</p>
              </div>
              <div className='bg-[#0a0a0a] p-6' data-aos="fade-up">
                <h4 className='text-white text-xl lg:text-2xl mb-5'>Royal Treatment</h4>
                <p className='text-base leading-relaxed webFontColor'>At Limo Royale, you are more than a client—you are a guest of honor. We treat every booking as an opportunity to deliver a royal experience, ensuring that our clients feel pampered and valued. Our dedication to customer service goes beyond the standard; it’s about creating an atmosphere of sophistication, comfort, and care.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className='bg-[#0a0a0a] py-15 pr-5 xl:pr-62 pl-5 lg:pl-0'>
          <div className='flex flex-col lg:flex-row lg:space-x-12 space-y-10 lg:space-y-0 items-center'>
            <div className='w-full lg:w-3/5' data-aos="fade-up">
                <Image src={AboutBanner2} className='w-full h-full' alt='vehicle cleanliness and quality checks' />
            </div>
            <div className='w-full lg:w-2/5' data-aos="fade-up">
              <small className='webColor uppercase'>Goal</small>
              <h2 className='text-white text-2xl lg:text-4xl leading-snug my-3 font-medium'>Royale Excellence in Cleanliness and Vehicle Maintenance</h2>
              <p className='text-base leading-relaxed webFontColor'>At <b>Limo Royale</b>, every journey is meticulously planned and executed to perfection. We take pride in ensuring that our fleet not only meets but exceeds the expectations of our discerning clients. That’s why we have a <b>dedicated team of professionals</b> who conduct thorough <b>vehicle cleanliness and quality checks</b> before each pickup. Every vehicle is detailed to immaculate standards, ensuring that your experience with us is luxurious from the moment you step inside.
              <br></br><br></br>
              Our commitment to maintaining the highest quality standards means that no detail is overlooked. From spotless interiors to the flawless performance of our vehicles, we guarantee that your ride will be as smooth and elegant as possible.</p>
              <a href='/online-reservations' title='Luxury Limo & Airport Chauffeur Service Toronto' className='inline-block book-now-slide text-sm px-10 py-5 mt-10 uppercase'>Book Now</a>
            </div>
          </div>          
        </div>
      </div>
      
      <div>
        <div className='container mx-auto px-2'>
          <div className='flex flex-col lg:flex-row lg:space-x-10 py-15' data-aos="fade-up">
            <div className='w-full lg:w-2/5'>
              <small className='webColor uppercase'>Premium drivers</small>
              <h2 className='text-white text-2xl lg:text-4xl leading-snug my-5 font-medium'>Royale Chauffeur: Your Journey in Expert Hands</h2>
              <p className='text-base leading-relaxed webFontColor'>At <b>Limo Royale</b>, we take pride in offering more than just a ride—we provide an exceptional travel experience, guided by our elite team of <b>Royale Chauffeurs</b>. With a minimum of <b>15-20 years of professional driving experience</b>, each Royale Chauffeur is handpicked to ensure that your journey is both <b>safe</b> and <b>smooth</b>. Our chauffeurs are not only skilled drivers but also masters of service, trained to deliver the <b>royal treatment</b> you deserve.</p>
              <a href='/online-reservations' title='Luxury Limo & Airport Chauffeur Service Toronto' className='inline-block book-now-slide text-sm px-9 py-4 mt-10 uppercase'>Book Now</a>
            </div>
            <div className='w-full lg:w-3/5'>
                <div className='grid grid-cols-2 space-x-5 mt-10 lg:mt-0'>
                  <div><Image src={GlobalImg1} className='w-full h-[250px] md:h-[400px] lg:h-[450px] object-cover' alt='Global Experience with Limo Service' /></div>
                  <div><Image src={GlobalImg2} className='w-full h-[250px] md:h-[400px] lg:h-[450px] object-cover' alt='Premium Limo Service Toronto' /></div>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className='relative pt-5 lg:pt-5 pb-17'>
          <div className='container mx-auto px-2'>
            <small className='webColor uppercase'>finest transport</small>
            <h2 className='text-white text-2xl lg:text-3xl leading-snug my-5 font-medium'>Why Choose a Royale Chauffeur?</h2>
            <p className='text-base leading-relaxed webFontColor pr-0 xl:pr-150'>When you travel with Limo Royale, you are in the capable hands of highly experienced professionals who go above and beyond to ensure your comfort, safety, and satisfaction</p>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 md:space-x-4 space-y-5 lg:space-y-0 mt-10'>
              <div className='bg-[#0a0a0a] p-6' data-aos="fade-up">
                <h4 className='text-white text-xl lg:text-2xl mb-5'>Experience & Expertise</h4>
                <p className='text-base leading-relaxed webFontColor'>Our chauffeurs have decades of experience navigating both local and international routes, ensuring that every journey is flawless and efficient.</p>
              </div>
              <div className='bg-[#0a0a0a] p-6' data-aos="fade-up">
                <h4 className='text-white text-xl lg:text-2xl mb-5'>Safety First</h4>
                <p className='text-base leading-relaxed webFontColor'>Safety is our top priority. With their extensive experience, our chauffeurs are adept at handling all road conditions, giving you peace of mind throughout your journey.</p>
              </div>
              <div className='bg-[#0a0a0a] p-6' data-aos="fade-up">
                <h4 className='text-white text-xl lg:text-2xl mb-5'>Royal Service</h4>
                <p className='text-base leading-relaxed webFontColor'>Beyond driving, our chauffeurs excel in delivering a discreet, professional, and courteous service, attending to your needs with precision and care.</p>
              </div>
              <div className='bg-[#0a0a0a] p-6' data-aos="fade-up">
                <h4 className='text-white text-xl lg:text-2xl mb-5'>Seamless Journeys</h4>
                <p className='text-base leading-relaxed webFontColor'>Whether it’s navigating city traffic or ensuring timely arrivals for events, your Royale Chauffeur is committed to making your journey as smooth and stress-free as possible.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className='bg-[#0a0a0a] py-15 pr-5 xl:pr-62 pl-5 lg:pl-0'>
          <div className='flex flex-col lg:flex-row lg:space-x-12 space-y-10 lg:space-y-0 items-center'>
            <div className='w-full lg:w-3/5' data-aos="fade-up">
                <Image src={AboutBanner3} className='w-full h-full' alt='Royal Experience in Limo Royale' />
            </div>
            <div className='w-full lg:w-2/5' data-aos="fade-up">
              <small className='webColor uppercase'>Goal</small>
              <h2 className='text-white text-2xl lg:text-4xl leading-snug my-3 font-medium'>Why We Stand Apart</h2>
              <p className='text-base leading-relaxed webFontColor'>At <b>Limo Royale</b>, we don’t follow trends—we set new standards. Our service is built around one core promise: to give every client a <b>royal experience</b>. Unlike other limo services, we are not focused on being the largest or the most visible—we are focused on being the <b>best</b>. Our goal is to ensure that every time a client steps into one of our vehicles, they experience the ultimate in luxury and comfort.
              <br></br><br></br>
              We believe that the journey should be just as special as the destination. That’s why we go above and beyond to ensure that your time with us reflects the elegance and refinement you deserve. Our <b>20+ years of experience</b> in both the limo service and hotel industry have given us a unique insight into what it means to provide <b>world-class service</b>. We pride ourselves on standing out in an industry where many others fall short.</p>
              <a href='/online-reservations' title='Luxury Limo & Airport Chauffeur Service Toronto' className='inline-block book-now-slide text-sm px-10 py-5 mt-10 uppercase'>Book Now</a>
            </div>
          </div>          
        </div>
      </div>

      <div>
        <div className='container mx-auto px-2'>
          <div className='mt-15 mb-15' data-aos="fade-up">
            <h2 className='text-white text-2xl lg:text-4xl leading-snug my-3 font-medium'>The Limo Royale Experience</h2>
            <p className='text-base leading-relaxed webFontColor'>With <b>Limo Royale</b>, you’re not just choosing a ride—you’re choosing a premium service that caters to your every need. Whether you require corporate transportation, airport transfers, event charters, or personalized tours, our team is dedicated to providing an experience that is unmatched. From our <b>luxury fleet</b> to our <b>bespoke service</b>, we make it our mission to ensure every client enjoys an unforgettable journey.<br></br><br></br>
            <b>Choose Limo Royale</b>, and experience what it truly means to travel like royalty
            </p>
          </div>
        </div>
      </div>

      <div className='pb-15'>
        <div className='container mx-auto px-2'>
          <div className='grid lg:grid-cols-3 lg:space-x-4 space-y-5 lg:space-y-0 mt-10'>
            <div className='bg-[#0a0a0a] p-5 lg:p-10' data-aos="fade-up">
              <h4 className='text-white text-xl lg:text-2xl mb-5'>Unwavering Love for His Car and Dog</h4>
              <p className='text-base leading-relaxed webFontColor'>Even during the civil war, when we were forced to leave our home and move to another city, my father refused to part ways with his Morris Minor and his three beloved <b>German Shepherds</b>. He stayed behind to ensure they were safe and taken care of, reflecting his loyalty and deep connection to the things he loved. <br></br><br></br>Later in life, as his health began to decline, <b>Sabaratnam Sithravelu</b> made the difficult decision not to sell his Morris Minor. Instead, he entrusted it to a friend whom he believed would care for it as he had, keeping it in immaculate condition. He made sure the car continued to serve a family, just as he had intended.</p>
            </div>
            <div className='bg-[#0a0a0a] p-5 lg:p-10' data-aos="fade-up">
              <h4 className='text-white text-xl lg:text-2xl mb-5'>A Legacy of Safety and Excellence</h4>
              <p className='text-base leading-relaxed webFontColor'>Beyond his love for cars, my father was known for his <b>exceptional driving skills</b>. He was famous in <b>Sri Lanka</b>  for his smooth driving, having started a <b>van hire</b> and transportation business. Despite the rough and challenging roads of Sri Lanka, he never compromised on safety or comfort. He was meticulous, ensuring that every journey was smooth and that his passengers were always safe and comfortable. <br></br><br></br>To this day, I proudly hold his driving history card issued by the <b>Sri Lankan Motor Department</b>, which remains blank—he never had a single accident in his entire driving career. His record stands as a testament to his skill, his patience, and his unwavering commitment to excellence on the road.</p>
            </div>
            <div className='bg-[#0a0a0a] p-5 lg:p-10' data-aos="fade-up">
              <h4 className='text-white text-xl lg:text-2xl mb-5'>The Inspiration Behind Limo Royale</h4>
              <p className='text-base leading-relaxed webFontColor'>It is from this legacy that <b>Limo Royale</b> was born. Inspired by my father’s dedication to <b>safety, comfort,</b> and maintaining the <b>highest standards</b>, I created Limo Royale to offer our guests the same level of care and precision that he embodied throughout his life. At <b>Limo Royale</b>, we believe in providing not just a ride but an experience—one where every detail is considered, from the cleanliness of our cars to the expertise of our chauffeurs. <br></br><br></br>Just as my father ensured that his Morris Minor stayed in top condition, we maintain a fleet of <b>luxury vehicles</b> that are always in pristine condition, offering our clients a truly royal experience. And just like him, we are committed to offering <b>smooth and safe journeys</b>, ensuring that our guests feel relaxed and cared for from the moment they step into our vehicles.</p>
            </div>
          </div>
        </div>
      </div>

    </main>
  )
}

export default AboutPage