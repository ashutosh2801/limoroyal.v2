"use client";

import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function BookingSuccess() {

  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking_id");

  useEffect(() => {
    if (!bookingId) return;

    //fetchBooking();
  }, [bookingId]);

  return (
    <main>
            <div className="flex flex-col justify-center items-center h-screen bg-black text-center border-b webBorderColor pt-50 pb-17">
            <CheckCircleIcon className="webColor w-20 h-20 mb-4" />
    
            <h1 className="text-3xl font-bold mb-2 text-white">
                Booking Confirmed!
            </h1>
    
            <p className="webFontColor mb-6 max-w-md">
                Your booking reference: <span className="text-white">{bookingId}</span>
            </p>

            <p className="webFontColor mb-6 max-w-md">
                A confirmation email has been sent to you. We’ll get back to you as soon as possible.
            </p>         
    
            <button
                onClick={() => router.push("/")}
                className="book-now-link px-6 py-2 transition cursor-pointer"
            >
                Back to Home
            </button>
            </div>
        </main>
  );
}
