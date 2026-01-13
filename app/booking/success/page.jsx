"use client";

import { CheckCircleIcon, HomeIcon, PrinterIcon } from "@heroicons/react/24/solid";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { destroySearch } from "@/store/searchSlice";
import { formatDate, formatTime } from "../../lib/functions";
import Image from "next/image";
import logo from "../../../public/assets/limo-royale.png";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { getBookingData } from "../../lib/externalApi";
import { useReactToPrint } from "react-to-print";

export default function BookingSuccess() {
  const dispatch = useDispatch();
  const printRef = useRef();
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking_id") || "";
  const [bookData, setBookData] = useState([]);
  const [qrdata, setQRData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const { data } = useSelector((s) => s.search);
  useEffect(() => {
    dispatch(destroySearch());
  }, [dispatch]);

  useEffect(() => {

    const loadBookingData = async (booking_id) => {
      try {
        setLoading(true);
        setError('');
        const data = await getBookingData(booking_id);

        if(data.error) {
          throw new Error(`Invalid bookig id! ${data.error}`)
        }

        setBookData(data);
      }
      catch(error) {
        setError(error);
      }
      finally{
        setLoading(false);
      }

    }

    if(bookingId) {
      loadBookingData(bookingId);
      const qrValue = `${process.env.NEXT_PUBLIC_APP_URL}/booking/success?booking_id=${bookingId}`;
      setQRData(qrValue);
    }
  }, [bookingId]);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Invoice-12345",
  });

  return (
    <main className="min-h-screen">
      <div className="py-10 border-b webBorderColor">
        <div className="container mx-auto px-2">
          <div className="flex flex-col pt-[80px] md:pt-0 mt-0 md:mt-40 items-center justify-center">
            <div className="bg-white rounded-md shadow-xl overflow-hidden text-black p-4 md:p-8 w-full">

              {loading && (
                <div className="flex items-center justify-center h-64">
                  <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
                </div>
              )}
              {!loading && (<>

                {/* Header */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CheckCircleIcon className="w-8 h-8 webColor" />
                    <h1 className="md:text-xl font-bold tracking-wide">
                      BOOKING CONFIRMED
                    </h1>
                  </div>
                  <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                    Your request has been submitted. Our customer service representative
                    will get back to you shortly.
                    <br />
                    Thank you for choosing Limo Royal and have a safe trip.
                  </p>
                </div>

                {/* Ticket */}
                <div ref={printRef}>
                <div className="relative w-full md:max-w-4xl m-auto bg-gray-100 rounded-2xl shadow-lg overflow-hidden border border-gray-200">

                  {/* World Map Background (desktop only) */}
                  <div
                    className="hidden md:block absolute inset-0 bg-center bg-no-repeat bg-contain opacity-30 pointer-events-none right-50"
                    style={{ backgroundImage: "url('/assets/map.png')" }}
                  />

                  {/* Ticket Header */}
                  <div className="flex flex-col md:flex-row items-center md:h-16 relative z-10 w-full">
                    <div className="bg-black text-white px-6 w-full md:w-fit h-full flex items-center justify-center font-bold text-sm">
                      <Image
                        src={logo}
                        alt="Luxury Limo Service for Memorable Rides - Limo Royal"
                        className="w-30 md:w-30"
                      />
                    </div>

                    <div className="webBG flex-1 w-full h-full flex items-center justify-center md:justify-end py-2 md:py-0 px-6">
                      <span className="font-bold text-xs md:text-sm tracking-wide">
                        PICKUP TRIP
                      </span>
                    </div>
                  </div>

                  {/* Ticket Body */}
                  <div className="flex flex-col md:grid md:grid-cols-12 text-sm text-gray-800">

                    {/* Left */}
                    <div className="md:col-span-4 space-y-4 p-4 md:p-6 border-dashed border-gray-400 border-b md:border-b-0 relative z-10">
                      <div>
                        <p className="text-gray-500 text-xs">Passenger Name</p>
                        <p className="font-bold text-base">{`${bookData?.booking?.customer?.title} ${bookData?.booking?.customer?.first_name} ${bookData?.booking?.customer?.last_name}`}</p>
                      </div>

                      <div>
                        <p className="text-gray-500 text-xs">Vehicle</p>
                        <p className="font-semibold">{bookData?.booking?.vehicle?.name}</p>
                      </div>

                      <div className="flex gap-8">
                        <div>
                          <p className="text-gray-500 text-xs">Luggage</p>
                          <p className="font-semibold">{bookData?.booking?.luggage}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Passengers</p>
                          <p className="font-semibold">{bookData?.booking?.passengers}</p>
                        </div>
                      </div>

                      <div className="flex gap-8">
                        <div>
                          <p className="text-gray-500 text-xs">Duration</p>
                          <p className="font-semibold">{bookData?.booking?.duration_minutes}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Distance</p>
                          <p className="font-semibold">{bookData?.booking?.distance_km} km</p>
                        </div>
                      </div>
                    </div>

                    {/* Middle */}
                    <div className="md:col-span-5 space-y-4 p-4 md:p-6 border-dashed border-gray-400 border-b md:border-b-0 relative z-10">
                      <div>
                        <p className="text-gray-500 text-xs">Pick up</p>
                        <p className="font-semibold leading-snug">
                          {bookData?.location?.pickup?.location_name}, {bookData?.location?.pickup?.location_address}
                        </p>
                      </div>

                      {
                        Object.values(bookData?.location?.stops || {}).map((stop, i) => (
                          <div key={i}>
                            <p className="text-gray-500 text-xs">Stop</p>
                            <p className="font-semibold leading-snug">
                              {stop?.location_name}, {stop?.location_address}
                            </p>
                          </div>
                        ))
                      }

                      <div>
                        <p className="text-gray-500 text-xs">Drop off</p>
                        <p className="font-semibold leading-snug">
                          {bookData?.location?.dropoff?.location_name}, {bookData?.location?.dropoff?.location_address}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-500 text-xs">Pick Up Date</p>
                          <p className="font-semibold">{formatDate(bookData?.booking?.pickup_date)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Pick Up Time</p>
                          <p className="font-semibold">{formatTime(bookData?.booking?.pickup_time)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Divider (desktop only) */}
                    <div className="hidden md:flex md:col-span-1 justify-center">
                      <div className="border-l border-dashed h-full border-gray-400" />
                    </div>

                    {/* Right */}
                    <div className="md:col-span-2 flex flex-row md:flex-col items-center justify-between md:justify-center gap-4 p-4 md:pl-0 md:pr-6 md:pb-6 md:pt-6 text-center">
                      <QRCodeSVG
                          value={qrdata}
                          size={100}
                          bgColor="#ffffff"
                          fgColor="#000000"
                        />
                      <div>
                        <p className="text-gray-500 text-xs">Booking Number</p>
                        <p className="font-bold text-lg">{bookingId}</p>
                      </div>
                    </div>
                  </div>

                  {/* Footer strip */}
                  <div className="flex items-center h-7 relative z-10">
                    <div className="bg-black text-white px-6 w-full h-full flex items-center font-bold text-sm" />
                  </div>
                </div>
                </div>

                {/* Button */}
                <div className="flex justify-between">
                  <button
                    onClick={() => router.push("/booking")}
                    className="mt-8 bg-gray-700 hover:opacity-80 cursor-pointer text-white px-7 py-3 rounded-lg text-sm hover:bg-gray-800 transition flex items-center gap-2 mx-auto"
                  >
                    Back to <HomeIcon className="w-4 h-4 text-white" />
                  </button>

                  <button
                    onClick={handlePrint}
                    className="mt-8 webBG hover:opacity-80 cursor-pointer text-white px-7 py-3 rounded-lg text-sm transition flex items-center gap-2 mx-auto"
                  >
                    Print <PrinterIcon className="w-4 h-4 text-white" />
                  </button>
                </div>
                </>)}

              </div>
            </div>
        </div>
      </div>
    </main>
  );
}