import React from 'react'

const Sitemap = () => {
    const pages = [
  { title: "Home", href: "/" },
  {
    title: "Services",
    children: [
      { title: "Corporate Limo Service", href: "/corporate-limo-service" },
      { title: "Executive Car Hire", href: "/executive-car-hire" },
      { title: "Casino Limo Service", href: "/casino-limo-service" },
      { title: "Airport Transfers", href: "/airport-transfers" },
      { title: "Wedding Cars", href: "/wedding-cars" },
      { title: "Ladies Night Out Limo Service", href: "/ladies-night-out-limo-service" },
      { title: "Events", href: "/luxury-chauffeuring-services-to-londons" },
      { title: "Airport Meet and Greet Services", href: "/airport-meet-and-greet-services" },
      { title: "Promotions", href: "/promotions" },
      { title: "Birthdays, Bachelor, & Bachelorette Limo Service", href: "/birthdays-bachelor-and-bachelorette-limo-service" },
      { title: "Long Distance Limo Service", href: "/long-distance-limo-service" },
      { title: "Luxury Chauffeuring Services", href: "/luxury-chauffeuring-services" },
    ],
  },
  { title: "About", href: "/about" },
  { title: "Luxury Limousine", href: "/luxury-limousine" },
  { title: "Bus Charter", href: "/bus-charter" },
  { title: "Areas Served", href: "/areas-served" },
  { title: "Fleet", href: "/fleet" },
  { title: "Contact", href: "/contact" },
  { title: "Book Now", href: "/online-reservations" },
  { title: "Login", href: "/login" },
  { title: "Blog", href: "/about" },
  { title: "Faqs", href: "/about" },
];
  return (
    <main>
        <div>
            <div className="relative">
                <div className="page-bg object-cover absolute h-[450px] lg:h-[550px] inset-0 opacity-50"></div>
                <div className="relative z-10 pt-50 lg:pt-80 pb-30">
                    <div className="container mx-auto px-2">
                        <ul className="breadcrumb uppercase webColor text-sm flex">
                        <li><a href="/">Home</a></li>
                        <li>Sitemap</li>
                        </ul>

                        <h1 className="text-white text-2xl lg:text-6xl leading-snug my-5 font-medium">
                        Sitemap
                        </h1>
                    </div>
                </div>
            </div>
            <div className="pb-15 border-[#0a0a0a] border-b">
                <div className="container mx-auto px-2">
                    <div className="border-l-2 border-gray-300 pl-6 space-y-4">

                        {pages.map((page, index) => (
                        <div key={index}>
                            <div className="relative mb-1">
                            <span className="absolute -left-[30px] top-0 w-3 h-3 webBG rounded-full" />
                            <a href={page.href} title={page.title} className="text-white hover:text-yellow-200">
                                {page.title}
                            </a>
                            </div>

                            {page.children && (
                            <div className="border-l-2 border-gray-200 ml-5 py-5 pl-6 space-y-3">
                                {page.children.map((child, i) => (
                                <div key={i} className="relative">
                                    <span className="absolute -left-[31px] top-1 w-3 h-3 webBG rounded-full" />
                                    <a href={child.href} title={child.title} className="text-white hover:text-yellow-200">
                                    {child.title}
                                    </a>
                                </div>
                                ))}
                            </div>
                            )}
                        </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}

export default Sitemap