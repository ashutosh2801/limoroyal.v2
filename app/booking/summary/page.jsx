'use client';

export default function summary() {
  return (
    <main className="min-h-screen">
        <div className="pt-10 pb-10 border-b webBorderColor">
            <div className="flex flex-col pt-[80px] md:pt-0 mt-0 md:mt-40 items-center justify-center">
                <div className="max-w-md mx-auto">

                    {/* Title */}
                    <h1 className="text-center text-white text-2xl font-bold mb-6">
                    BOOKING SUMMARY
                    </h1>

                    {/* Card */}
                    <div className="bg-white rounded-xl shadow-md p-5 space-y-4 ">

                    {/* Booking Number */}
                    <div className="flex items-center gap-2">
                        <span className="bg-[#c9a24d] text-black rounded-md px-2 py-1 font-semibold">
                        →
                        </span>
                        <p className="font-semibold text-lg">
                        Booking # 43978
                        </p>
                    </div>

                    <hr className="border-gray-200" />                    

                    <p className="flex gap-3 items-center">
                        <span className="font-semibold text-sm">Booking Status:</span>{' '}
                        <span className="text-white bg-green-500 px-2 py-1 rounded-full text-sm font-medium">Confirmed</span>
                    </p>

                    {/* Details */}
                    <SummaryRow label="Passenger Name" value="Ashutosh Sharma" />
                    <SummaryRow label="Booker Name" value="Ashutosh Sharma" />
                    <SummaryRow
                        label="Pick Up"
                        value="Southwest Florida International Airport (RSW), Terminal Access Road, Fort Myers, FL, USA"
                    />
                    <SummaryRow
                        label="Drop-Off"
                        value="The Perry Hotel Naples, Tamiami Trail North, Naples, FL, USA"
                    />
                    <SummaryRow label="Date & Time" value="01-10-2026 11:00 AM" />
                    <SummaryRow label="Vehicle" value="Luxury SUV" />
                    <SummaryRow label="Passengers" value="3" />
                    <SummaryRow label="Luggage" value="3" />

                    </div>
                </div>
            </div>
        </div>
    </main>
  );
}

/* Reusable row */
function SummaryRow({ label, value }) {
  return (
    <div className="flex gap-3">
      <p className="font-semibold min-w-[110px] text-sm">{label}:</p>
      <p className="text-gray-700 text-sm">{value}</p>
    </div>
  );
}
