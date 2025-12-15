"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";

export default function PickupInfoPage() {
  const router = useRouter();

  const [bookingFor, setBookingFor] = useState("myself");

  // You can retrieve vehicle if you pass it via query or localStorage later
  const trip = {
    date: "Mon, Dec 8, 2025",
    time: "01:57 AM (EST)",
    from: "Toronto Pearson International Airport (YYZ)",
    to: "L6Z 4V9",
  };

  const steps = ["Service Class", "Pickup Info", "Payment", "Checkout"];
  const activeStep = 1; // Pickup Info

  const handleContinue = () => {
    router.push("/booking/payment");
  };

  return (
    <div className="min-h-screen">
      <div className="py-10 border-b webBorderColor">
        <div className="max-w-4xl mx-auto px-5 mt-30 md:mt-40">
          <div className="bg-white rounded-md shadow-xl overflow-hidden text-black">
            <div className="p-6 md:p-8">

              {/* Blacklane Stepper */}
              <div className="relative">

                {/* Connector Line */}
                <div className="absolute left-0 right-0 top-[30px] h-[2px] bg-gray-300" />

                <div className="relative flex justify-between">

                  {steps.map((label, i) => {
                    const isActive = i === activeStep;          // current page step
                    const isCompleted = i < activeStep;         // passed steps

                    return (
                      <div key={label} className="flex flex-col items-center w-full">

                        {/* Label */}
                        <div
                          className={`
                            mb-2 text-[9px] md:text-xs font-semibold
                            ${isActive || isCompleted ? "text-black" : "text-gray-400"}
                          `}
                        >
                          {label}
                        </div>
                        
                        {/* Circle */}
                        <div
                          className={`
                            w-4 h-4 rounded-full border-[3px] z-10
                            ${isActive ? "bg-white border-black" : ""}
                            ${isCompleted ? "bg-black border-black" : ""}
                            ${!isActive && !isCompleted ? "bg-white border-gray-400" : ""}
                          `}
                        />
                        
                      </div>
                    );
                  })}

                </div>

                {/* Progress fill line */}
                <div
                  className="absolute top-[30px] h-[2px] bg-black transition-all duration-500"
                  style={{
                    width: `${(activeStep / (steps.length - 1.4)) * 100}%`,
                  }}
                />
              </div>

              {/* Trip summary */}
              <div className="mt-6 bg-gray-100 rounded-xl p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <div className="text-xs md:text-sm font-semibold">
                      {trip.date} at {trip.time}
                    </div>
                    <div className="text-[10px] md:text-xs text-gray-600 mt-1">
                      <MapPinIcon className="inline w-4 h-4 mr-1 -mt-0.5 text-gray-500" />
                      {trip.from} → {trip.to}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-600">
                      <CalendarDaysIcon className="w-4 h-4 text-gray-500" />
                      <span>{trip.date}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-600">
                      <ClockIcon className="w-4 h-4 text-gray-500" />
                      <span>{trip.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Heading */}
              <h2 className="mt-6 text-lg md:text-xl font-bold">Pickup Information</h2>
              <small className="text-gray-500 text-[10px] md:text-xs">
                Provide details your chauffeur should know
              </small>

              {/* FORM */}
              <div className="mt-6">

                {/* Booking For */}
                <div className="mb-6">
                  <p className="font-semibold mb-2 text-sm md:text-base">Select Who you are booking for?</p>

                  <div className="flex flex-col gap-4 p-4 border border-gray-200 rounded-xl">
                    <label className="flex items-center gap-2 text-xs md:text-sm">
                      <input
                        type="radio"
                        name="bookingFor"
                        value="myself"
                        checked={bookingFor === "myself"}
                        onChange={() => setBookingFor("myself")}
                      />
                      Book for myself
                    </label>

                    <label className="flex items-center gap-2 text-xs md:text-sm">
                      <input
                        type="radio"
                        name="bookingFor"
                        value="someoneElse"
                        checked={bookingFor === "someoneElse"}
                        onChange={() => setBookingFor("someoneElse")}
                      />
                      Book for someone else
                    </label>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mb-2">
                  <p className="font-semibold text-sm md:text-base">Additional information</p>
                  <small className="text-gray-500 text-[10px] md:text-xs">
                    Enter your flight number to ensure your chauffeur can track your flight and adjust the pickup time.
                  </small>
                  <div className="mt-2 p-4 border border-gray-200 rounded-xl">
                    <input
                      type="text"
                      placeholder="Flight number"
                      className="w-full px-3 py-3 text-xs md:text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="mt-3 p-4 border border-gray-200 rounded-xl">
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Pickup Sign"
                      className="w-full px-3 py-3 text-xs md:text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none"
                    />
                    <small className="text-gray-500 text-[10px] md:text-xs">It will appear on your chauffeur's pickup sign when they meet you.</small>
                  </div>
                  <div className="mb-3">
                    <textarea
                      type="text"
                      placeholder="Notes for the chauffeur"
                      className="w-full px-3 py-3 text-xs md:text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none min-h-25"
                    ></textarea>
                    <small className="text-gray-500 text-[10px] md:text-xs">Add special requests, e.g. number of bags, child seats, etc. please do not include confidential information.</small>
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Reference code or cost center"
                      className="w-full px-3 py-3 text-xs md:text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none"
                    />
                    <small className="text-gray-500 text-[10px] md:text-xs">Booking for business? what you enter above will appear on the invoice.</small>
                  </div>
                </div>
              </div>

              {/* Continue button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleContinue}
                  className="py-3 px-10 rounded-md font-medium text-white webBG hover:opacity-90 cursor-pointer text-sm md:text-base w-full md:w-auto"
                >
                  Continue to Payment
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* INLINE CSS (copied from Booking) */}
        <>
          <style jsx global>{`
            nav div.header {
              background: #0a0a0a;
              margin-top: 0;
              padding-top: 10px;
            }
          `}</style>
        </>
      </div>
    </div>
  );
}
