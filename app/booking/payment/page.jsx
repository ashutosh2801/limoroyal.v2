"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  ExclamationCircleIcon,
  CheckCircleIcon
} from "@heroicons/react/24/solid";
import payment from '../../../public/assets/payment.png'

export default function PaymentPage() {
  const router = useRouter();

  const steps = ["Service Class", "Pickup Info", "Payment", "Checkout"];
  const activeStep = 2; // Payment step

  // Trip data (should match previous pages)
  const trip = {
    date: "Mon, Dec 8, 2025",
    time: "01:57 AM (EST)",
    from: "Toronto Pearson International Airport (YYZ)",
    to: "L6Z 4V9",
  };

  // Payment form state
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCVV] = useState("");
  const [saveCard, setSaveCard] = useState(true);

  const handleCheckout = () => {
    router.push("/booking/checkout");
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
                        width: `${(activeStep / (steps.length - 0.8)) * 100}%`,
                    }}
                    />
                </div>

                {/* --- Trip Summary --- */}
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

                {/* --- Payment Form --- */}
                <h2 className="mt-7 text-lg md:text-xl font-bold">Add credit or debit card</h2>

                <div className="mt-4 space-y-4 border border-gray-200 rounded-xl p-5">

                    {/* Name on card */}
                    <div className="flex flex-col">
                    <label className="text-gray-700 text-xs md:text-sm font-semibold mb-1">Name on card *</label>
                    <input
                        type="text"
                        className="w-full px-3 py-3 text-xs md:text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none"
                        value={nameOnCard}
                        onChange={(e) => setNameOnCard(e.target.value)}
                    />
                    </div>

                    {/* Card number */}
                    <div className="flex flex-col">
                    <label className="text-gray-700 text-xs md:text-sm font-semibold mb-1">Card number *</label>
                    <div className="relative">
                        <input
                        type="number"
                        className="w-full px-3 py-3 text-xs md:text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        />
                        <div className="absolute right-2 top-4 md:top-3">
                        <Image
                            src={payment}
                            alt="Payment"
                            className="object-contain h-3 md:h-5 w-auto"
                        />
                        </div>
                    </div>
                    </div>

                    {/* Expiry & CVV */}
                    <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="text-gray-700 text-xs md:text-sm font-semibold mb-1">
                        Expiration date *
                        </label>
                        <input
                        type="number"
                        placeholder="MM/YY"
                        className="w-full px-3 py-3 text-xs md:text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 text-xs md:text-sm font-semibold mb-1">CVV *</label>
                        <input
                        type="number"
                        className="w-full px-3 py-3 text-xs md:text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none"
                        value={cvv}
                        onChange={(e) => setCVV(e.target.value)}
                        />
                    </div>
                    </div>

                    {/* Save card */}
                    <label className="flex items-center gap-1 text-xs md:text-sm text-gray-700 mt-4 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={saveCard}
                        onChange={() => setSaveCard(!saveCard)}
                        className="w-4 h-4"
                    />
                    Save card to your list
                    </label>
                </div>

                <div className="mt-5">
                    <div className="border border-gray-200 rounded-xl">
                        <div className="p-4">
                            <p className="text-gray-700 text-xs md:text-sm py-2 flex items-center items-start"> <CheckCircleIcon className="h-5 w-5 text-gray-600 mr-1 flex-shrink-0" /> Our Servers are encrypted with TLS/SSL to ensure security and privacy.</p>
                        </div>
                        <hr className="border-t border-gray-200" />
                        <div className="p-4">
                            <p className="text-gray-700 text-xs md:text-sm py-2 flex items-center items-start"> <ExclamationCircleIcon className="h-5 w-5 text-gray-600 mr-1 flex-shrink-0" /> The amount will be held from your selected payment method after the booking, We only charge you after the ride is finished.</p>
                        </div>
                    </div>
                </div> 

                {/* Continue button */}
                <div className="mt-6 flex justify-end">
                <button
                    onClick={handleCheckout}
                    className="py-3 px-10 rounded-md font-medium text-white webBG hover:opacity-90 cursor-pointer text-sm md:text-base w-full md:w-auto"
                >
                    Proceed to Checkout
                </button>
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
