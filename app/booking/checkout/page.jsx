"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  UsersIcon,
  BriefcaseIcon,
  ExclamationCircleIcon
} from "@heroicons/react/24/solid";

import vClass from "../../../public/assets/sedan/mercedes-benz-s-class.png";
import visaIcon from "../../../public/assets/mastercard.png";

export default function CheckoutPage() {
  const router = useRouter();

  const steps = ["Service Class", "Pickup Info", "Payment", "Checkout"];
  const activeStep = 3;

  // Trip mock data — replace later
  const trip = {
    date: "Mon, Dec 8, 2025",
    time: "01:57 AM",
    from: "Toronto Pearson International Airport (YYZ)",
    fromAddress: "Silver Dart Dr 6301, ON L5P 1B2 Toronto, Mississauga",
    to: "L6Z 4V9 Brampton",
    duration: "19 min",
    distance: "25 km",
    car: "Mercedes Benz s-class",
    passengers: 3,
    bags: 2,
    price: 147.47,
    tax: 16.96,
    exclTax: 130.51,
  };

  return (
    <div className="min-h-screen">
      <div className="py-10 border-b webBorderColor">
        <div className="max-w-7xl mx-auto px-5 mt-30 md:mt-40">
          <div className="bg-white rounded-md shadow-xl overflow-hidden text-black">
            <div className="p-6 md:p-8">

              {/* ===========================
                  STEP INDICATOR
              ============================ */}
              <div className="relative pb-5">
                <div className="absolute left-0 right-0 top-[30px] h-[2px] bg-gray-300" />

                <div className="relative flex justify-between">
                  {steps.map((label, i) => {
                    const isActive = i === activeStep;
                    const isCompleted = i < activeStep;

                    return (
                      <div key={label} className="flex flex-col items-center w-full">
                        <div
                          className={`
                            mb-2 text-[9px] md:text-xs font-semibold
                            ${isActive || isCompleted ? "text-black" : "text-gray-400"}
                          `}
                        >
                          {label}
                        </div>

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

                <div
                  className="absolute top-[30px] h-[2px] bg-black transition-all"
                  style={{
                    width: `${(activeStep / (steps.length - 1)) * 100}%`,
                  }}
                />
              </div>

              {/* ===========================
                  TWO COLUMN LAYOUT
              ============================ */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4 md:mt-6">

                {/* ===========================
                    LEFT SECTION — YOUR RIDE
                ============================ */}
                <div className="md:col-span-2">
                    <h2 className="text-lg md:text-xl font-bold mb-4">Your ride</h2>

                    <div className="border border-gray-200 rounded-xl p-4">

                        {/* Title row */}
                        <div className="flex justify-between items-center">
                        <p className="font-semibold text-xs md:text-sm">
                            {trip.date} • {trip.time}
                        </p>
                        <button className="text-xs font-semibold py-2 px-4 bg-gray-100 hover:bg-gray-200 transition rounded-xl cursor-pointer">Edit</button>
                        </div>

                        {/* Map */}
                        <div className="mt-4">
                            <div className="mt-4 h-64 w-full rounded-xl overflow-hidden border border-gray-200">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"
                                    src="https://www.google.com/maps?q=Toronto+Pearson+International+Airport+YYZ+to+L6Z+4V9+Brampton&output=embed"
                                ></iframe>
                            </div>
                        </div>

                        {/* Locations */}
                        <div className="mt-6 space-y-4 text-xs md:text-sm">

                        {/* FROM */}
                        <div className="flex items-start gap-2">
                            <MapPinIcon className="w-4 h-4 mt-1 text-gray-600 flex-shrink-0" />
                            <div>
                            <p className="font-semibold">{trip.from}</p>
                            <p className="text-gray-600">{trip.fromAddress}</p>
                            </div>
                        </div>

                        {/* TO */}
                        <div className="flex items-start gap-2">
                            <MapPinIcon className="w-4 h-4 mt-1 text-red-500" />
                            <div>
                            <p className="font-semibold text-xs md:text-base">{trip.to}</p>
                            <p className="text-gray-600 text-xs md:text-sm">Canada</p>
                            </div>
                        </div>
                        </div>

                        {/* Time + Distance */}
                        <p className="mt-4 text-xs text-gray-600">
                        {trip.duration} • {trip.distance}
                        </p>
                    </div>

                    {/* Vehicle Selection Block */}
                    <div className="mt-6 border border-gray-200 rounded-xl p-4">
                        <div className="flex justify-between">
                            <div>
                            <p className="font-semibold text-xs md:text-sm">{trip.car}</p>
                            <div className="flex items-center gap-4 mt-3 text-xs text-gray-700">
                                <span className="flex items-center gap-2">
                                <UsersIcon className="w-5 h-5" /> {trip.passengers}
                                </span>
                                <span className="flex items-center gap-2">
                                <BriefcaseIcon className="w-5 h-5" /> {trip.bags}
                                </span>
                                
                            </div>
                            <div className="flex items-center gap-4 mt-3 text-xs text-gray-700">
                                <p className="flex items-start md:items-center gap-1">
                                    <ExclamationCircleIcon className="w-5 h-5 flex-shrink-0 " /> Have more bags or passengers? Please change to Business Van / SUV
                                </p>
                            </div>
                            </div>
                        
                            <div className="flex items-start flex-col md:flex-row">
                                <Image
                                    src={vClass}
                                    alt="Car"
                                    className="w-42 h-auto"
                                />
                                <button className="text-xs font-semibold mt-3 md:mt-0 py-2 px-4 bg-gray-100 hover:bg-gray-200 transition rounded-xl cursor-pointer">Edit</button>
                            </div>
                        </div>
                    </div>

                    {/* Guest Information Section */}
                    <div className="mt-7">
                        <h2 className="text-lg md:text-xl font-bold mb-4">Guest's information</h2>

                        <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">

                            {/* Guest Name */}
                            <div className="p-5 flex justify-between items-start border-b border-gray-200">
                            <div>
                                <p className="text-sm text-gray-500">Guest name</p>
                                <p className="text-xs md:text-sm font-semibold mt-1">Mr. Amjad</p>
                                <p className="text-xs md:text-sm text-gray-500 mt-4">Contact details</p>
                                <p className="text-xs md:text-sm font-medium mt-1">
                                amjad@gmail.com • +94 1232 456 789
                                </p>
                            </div>

                            <button className="text-xs font-semibold py-2 px-4 bg-gray-100 hover:bg-gray-200 transition rounded-xl cursor-pointer">Edit</button>
                            </div>

                            {/* Flight Number */}
                            <div className="p-5 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Flight number</p>
                                <p className="text-xs md:text-sm font-semibold mt-1">–</p>
                            </div>

                            <button className="text-xs font-semibold py-2 px-4 bg-gray-100 hover:bg-gray-200 transition rounded-xl cursor-pointer">Edit</button>
                            </div>

                            {/* Pickup Sign */}
                            <div className="px-5 py-2 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Pickup sign</p>
                                <p className="text-xs md:text-sm font-semibold mt-1">Amjad Mowlana</p>
                            </div>
                            </div>

                            {/* Notes */}
                            <div className="px-5 py-2 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Notes for the chauffeur</p>
                                <p className="text-xs md:text-sm font-semibold mt-1">–</p>
                            </div>
                            </div>

                            {/* Reference code */}
                            <div className="px-5 py-2 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Reference code or cost center</p>
                                <p className="text-xs md:text-sm font-semibold mt-1">–</p>
                            </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* ===========================
                    RIGHT SECTION — PAYMENT DETAILS
                ============================ */}
                <div className="md:col-span-1">
                    <h2 className="text-lg md:text-xl font-bold mb-4">Payment details</h2>
                    {/* Payment Card */}
                    <div className="border border-gray-200 rounded-xl p-4 space-y-4 mb-3">
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-700">Payment</p>
                            <button className="text-xs font-semibold py-2 px-4 bg-gray-100 hover:bg-gray-200 transition rounded-xl cursor-pointer">Edit</button>
                        </div>
                        <b className="text-xs md:text-sm font-semibold">Amjad Mowlana</b>
                        <div className="flex items-center gap-2 text-xs md:text-sm font-medium mt-2">
                            <Image src={visaIcon} alt="Visa" className="h-5 w-auto" />
                            •••• 2950 • 09/2029
                        </div>
                    </div>
                    {/* Billing info */}
                    <div className="border border-gray-200 rounded-xl p-4 space-y-4 mb-3">
                        <div>
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-700">Billing Information</p>
                                <button className="text-xs font-semibold py-2 px-4 bg-gray-100 hover:bg-gray-200 transition rounded-xl cursor-pointer">Edit</button>
                            </div>
                            <b className="text-xs md:text-sm font-semibold">-</b>
                        </div>
                    </div>
                    {/* Price breakdown */}
                    <div className="border border-gray-200 rounded-xl p-4 space-y-4">
                        <div className="text-sm">
                        <div className="flex justify-between py-1">
                            <span className="text-gray-700">Price excl. tax</span>
                            <span>$ {trip.exclTax}</span>
                        </div>

                        <div className="flex justify-between py-1">
                            <span className="text-gray-700">Estimated tax</span>
                            <span>$ {trip.tax}</span>
                        </div>

                        {/* Promo */}
                        <details className="mt-4 cursor-pointer">
                            <summary className="text-sm font-medium">Add promotion</summary>
                            <input
                            type="text"
                            placeholder="Enter code"
                            className="w-full px-3 py-3 text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none mt-2"
                            />
                        </details>

                        {/* Total */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-300 mt-4">
                            <span className="font-normal text-md">Total price</span>
                            <span className="font-semibold text-base">$ {trip.price}</span>
                        </div>
                        </div>
                    </div>

                    {/* Book now button */}
                    <div>
                        <button className="w-full py-3 text-white webBG rounded-md hover:opacity-90 text-sm mt-4 cursor-pointer">
                            Book now
                        </button>
                        <p className="text-gray-700 text-xs mt-4">By Booking, Our <a href="" target="_blank" className="font-medium underline text-black">Terms & Conditions</a> apply in their current version</p>
                    </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* INLINE CSS */}
        <style jsx global>{`
          nav div {
            background: #0a0a0a;
            margin-top: 0;
            padding-top: 2px;
          }
        `}</style>
      </div>
    </div>
  );
}
