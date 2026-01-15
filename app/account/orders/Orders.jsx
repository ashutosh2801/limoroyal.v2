"use client";

import { useState } from "react";
import AccountSidebar from "../../components/AccountSidebar";
import {
  CalendarDaysIcon,
  ClockIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

const Orders = () => {
  const [open, setOpen] = useState(false);

  return (
    <AccountSidebar active="orders">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-white mb-2">
          Order History
        </h3>
        <p className="webFontColor text-sm">
          View your past and upcoming trips.
        </p>
      </div>

      {/* Order Card */}
      <div className="bg-black border border-gray-800 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-white font-medium">Order #LR-1024</p>

          <div className="flex items-center gap-3 text-sm text-gray-400 mt-2">
            <CalendarDaysIcon className="w-4 h-4" />
            <span>12 Jan 2026</span>
          </div>

          <p className="text-sm mt-2 webColor">Completed</p>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-white font-semibold text-lg">$450</span>
          <button
            onClick={() => setOpen(true)}
            className="webBG px-6 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition cursor-pointer"
          >
            View
          </button>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/90 px-4">
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl max-w-2xl w-full p-6 relative">
            
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
            >
              ✕
            </button>

            {/* Header */}
            <h4 className="text-xl font-semibold text-white mb-1">
              Trip Details
            </h4>
            <p className="text-sm text-gray-400 mb-6">
              Order #LR-1024
            </p>

            {/* Details */}
            <div className="space-y-4 text-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-800 pb-3">
                <span className="text-gray-400">Pickup Location</span>
                <span className="text-white">6301 Silver Dart Dr, Mississauga, ON L5P 1B2, Canada</span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-800 pb-3">
                <span className="text-gray-400">Dropoff Location</span>
                <span className="text-white flex items-center gap-2">
                  13850 Steeles Ave, Halton Hills, ON L7G 0J1, Canada
                </span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-800 pb-3">
                <span className="text-gray-400">Pickup Date & Time</span>
                <span className="text-white flex items-center gap-2">
                  <CalendarDaysIcon className="w-4 h-4" />
                  12 Jan 2026 
                  <ClockIcon className="w-4 h-4" />
                  08:30 AM
                </span>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-800 pb-3">
                <span className="text-gray-400">Passengers</span>
                <span className="text-white">2</span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-800 pb-3">
                <span className="text-gray-400">Luggage</span>
                <span className="text-white">3</span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <span className="text-gray-400">Payment Type</span>
                <span className="text-white flex items-center gap-2">
                  <CreditCardIcon className="w-4 h-4" />
                  Card
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setOpen(false)}
                className="px-6 py-2 border border-gray-700 rounded-lg text-sm text-gray-300 hover:bg-gray-800 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AccountSidebar>
  );
};

export default Orders;
