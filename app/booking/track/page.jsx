'use client';
import { useRouter } from 'next/navigation';
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid';
import { EnvelopeIcon, CalendarIcon  } from '@heroicons/react/24/outline'

export default function TrackBooking() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/booking/summary');
  };

  return (
    <main className="min-h-screen">
        <div className="pt-10 pb-20 border-b webBorderColor">
            <div className="flex flex-col pt-[80px] md:pt-0 mt-0 md:mt-40 items-center justify-center">
                <div className="w-full max-w-md text-center animate-fadeIn">
                    
                    {/* Icon */}
                    <div className="flex justify-center mb-6 animate-slideDown">
                        <ClipboardDocumentCheckIcon className="w-14 h-14 text-[#c9a24d]" />
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-bold text-white mb-2">
                    TRACK YOUR BOOKING
                    </h1>

                    <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                    Please enter following details to view your booking summary and track
                    status of your booking.
                    </p>

                    {/* Form */}
                    <form
                    onSubmit={handleSubmit}
                    className="space-y-4 animate-slideUp"
                    >
                    {/* Booking ID */}
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        <CalendarIcon className="h-5 w-5 text-black" />
                        </span>
                        <input
                        type="text"
                        defaultValue="43729"
                        placeholder="Booking ID"
                        className="w-full rounded-md px-10 py-3 text-sm outline-none bg-white"
                        required
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                         <EnvelopeIcon className="h-5 w-5 text-black" />
                        </span>
                        <input
                        type="email"
                        placeholder="Enter Your Email Address"
                        className="w-full rounded-md px-10 py-3 text-sm outline-none bg-white"
                        required
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full webBG text-white cursor-pointer py-3 rounded-md font-medium tracking-wide transition-all duration-300 hover:bg-[#c9a24d] hover:text-black"
                    >
                        Continue
                    </button>
                    </form>
                </div>
            </div>
        </div>
    </main>
  );
}
