"use client";

import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function BookingSuccess({ params }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md text-center">
        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />

        <h1 className="text-2xl font-bold mt-4">
          Booking Confirmed!
        </h1>

        <p className="text-gray-600 mt-2">
          Your booking reference
        </p>

        <p className="text-lg font-semibold mt-1">
          {params.id}
        </p>

        <p className="text-sm text-gray-500 mt-4">
          A confirmation email has been sent to you.
        </p>

        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-black text-white rounded-md"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
