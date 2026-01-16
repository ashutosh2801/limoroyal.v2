"use client";
import React from "react";
import {
  FaTachometerAlt,
  FaUser,
  FaShoppingBag,
  FaSignOutAlt,
} from "react-icons/fa";

const AccountSidebar = ({ active, children }) => {
  return (
    <main>

      <div className='relative'>
        <div className='page-bg object-cover absolute h-[450px] lg:h-[550px] inset-0 opacity-50'></div>
        <div className='relative z-10 pt-50 lg:pt-80 pb-30'>
          <div className='container mx-auto px-2'>
            <div>
              <ul className='breadcrumb uppercase webColor text-sm flex'>
                <li><a href='/'>Home</a></li>
                <li>My Account</li>
              </ul>
            </div>
            <h2 className='text-white text-2xl lg:text-6xl leading-snug my-5 font-medium'>
              My Account
            </h2>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-20 md:mt-0 mb-15 md:mb-0">

          {/* Sidebar */}
          <aside className="bg-[#0a0a0a] border border-gray-900 rounded-xl py-6 h-fit">
            <ul className="text-gray-400">
              <li className={active === "dashboard" ? "webColor font-medium bg-black px-4 py-3" : "px-4 py-3"}>
                <a href="/account/dashboard" className="flex items-center gap-2"><FaTachometerAlt className="text-base" /> Dashboard</a>
              </li>
              <li className={active === "profile" ? "webColor font-medium bg-black px-4 py-3" : "px-4 py-3"}>
                <a href="/account/profile" className="flex items-center gap-2"><FaUser className="text-base" /> My Profile</a>
              </li>
              <li className={active === "orders" ? "webColor font-medium bg-black px-4 py-3" : "px-4 py-3"}>
                <a href="/account/orders" className="flex items-center gap-2"><FaShoppingBag className="text-base" /> Order History</a>
              </li>
              <li className="px-4 py-3">
                <a href="/" className="flex items-center gap-2"><FaSignOutAlt className="text-base" /> Logout</a>
              </li>
            </ul>
          </aside>

          {/* Page Content */}
          <section className="lg:col-span-3 bg-[#0a0a0a] border border-gray-900 rounded-xl p-4 md:p-8">
            {children}
          </section>

        </div>
      </div>
    </main>
  );
};

export default AccountSidebar;
