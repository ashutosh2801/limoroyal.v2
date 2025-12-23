"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckBadgeIcon,
  ExclamationCircleIcon,
  CheckCircleIcon
} from "@heroicons/react/24/solid";
import { saveSearch } from "@/store/searchSlice";
import TripSummary from "../components/TripSummary";
import Tabs from "../components/Tabs";


export default function Booking() {
  const router = useRouter();
  const dispatch = useDispatch();
  const activeStep = 0; // Service Class
  
  const [selectedIdx, setSelectedIdx] = useState(null);

  const { data } = useSelector((state) => state.search);

  const trip = {
    date: new Date(data.pickupDate).toDateString(),
    time: new Date(data.pickupTime).toLocaleTimeString(),
    from: data.from.name,
    to: data.to.name,
    distanceKM: data.distanceKM,
    pickupTimeLabel: data.pickupTimeLabel,
    estimatedTimeLabel: data.estimatedTimeLabel,
    durationMinutes: data.durationMinutes,
  };

  const [vehicles, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPickups = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/vehicles`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to load pickups: ${res.status}`);
        }

        const json = await res.json();

        // Laravel usually doesn't return "success"
        setPickups(json.data ?? json);

        console.log("Fetched pickups:", json.data ?? json);
      } catch (err) {
        console.error(err);
        console.error("Pickup fetch error:", err);
      }
      finally {
        setLoading(false);
      }
    };

    loadPickups();
  }, []);  

  const pricedVehicles = vehicles.map((v) => ({
    ...v,
    price: `$${(parseFloat(v.baseFare) + (parseFloat(v.priceKM) * trip.distanceKM)).toFixed(2)}`,
  }));

  const selectVahicle = () => {
    if (selectedIdx === null) return;

    const selectedVehicle = vehicles[selectedIdx];

    let subTotalPrice = (
          parseFloat(selectedVehicle.baseFare) +
          parseFloat(selectedVehicle.priceKM) * parseFloat(trip.distanceKM)
        );

    let taxPrice = subTotalPrice * (13/100);
    let totalPrice = subTotalPrice + parseFloat(taxPrice);

    subTotalPrice = Number(subTotalPrice).toFixed(2);
    taxPrice = Number(taxPrice).toFixed(2);
    totalPrice = Number(totalPrice).toFixed(2);

    const payment = {
      subTotalLabel: `$${subTotalPrice}`,
      subTotalPrice, // optional numeric value for calculations
      taxLabel: `Tax (13%) $${taxPrice}`,
      taxPrice, // optional numeric value for calculations
      totalLabel: `$${totalPrice}`,
      totalPrice, // optional numeric value for calculations
    };    

    dispatch(
      saveSearch({ 
        ...data, selectedVehicle, payment
      })
    );

    //console.log("Saved data:", payment);

    // For example, navigate to the next step
    router.push("/booking/pickup-info");
  };

  return (
    <div className="min-h-screen">
      <div className="py-10 border-b webBorderColor">
        {/* Centered white content card */}
        <div className="max-w-4xl mx-auto px-5 mt-30 md:mt-40">
          <div className="bg-white rounded-md shadow-xl overflow-hidden text-black">
            <div className="p-6 md:p-8">
              {/* Blacklane Stepper */}
              <Tabs activeStep={activeStep} />              

              {/* Trip summary (date,time,from,to) */}
              <TripSummary trip={trip} />
              

              {/* Heading */}
              <h2 className="mt-6 text-lg md:text-xl font-bold">Select a vehicle class</h2>
              <small className="text-gray-500 text-[10px] md:text-xs">All prices include estimated VAT, Fees, and Tolls</small>

              {loading && (
                <div className="flex items-center justify-center h-64">
                  <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
                </div>
              )}

              {error && (
                <p className="text-red-500 text-center">{error}</p>
              )}

              {/* Vehicles grid */}
              {!loading && !error && (<>
              <div className="mt-4 grid grid-cols-1 gap-4">
                {pricedVehicles.map((v, idx) => {
                  const isSelected = selectedIdx === idx;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedIdx(idx)}
                      className={`w-full md:flex items-center gap-4 p-4 rounded-xl text-left transition-shadow border cursor-pointer ${
                        isSelected
                          ? "border-gray-400 shadow-[0_6px_30px_rgba(0,0,0,0.12)]"
                          : "border-gray-200"
                      } hover:shadow-md`}
                      aria-pressed={isSelected}
                    >
                      {/* left: image */}
                      <div className="flex w-full md:w-32 h-20 relative items-center mb-3 md:mb-0">
                        <Image
                          src={v.img}
                          alt={v.name}
                          fill
                          sizes="128px"
                          className="object-contain rounded-md"
                        />
                      </div>

                      {/* center: details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-semibold text-sm md:text-base">{v.name}</div>
                          </div>

                          {/* price */}
                          <div className="text-right">
                            <div className="text-sm md:text-base font-bold">{v.price}</div>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: v.desc }} />
                        </div>

                        
                        <div className="flex justify-between items-center gap-6">
                          {/* icons list */}
                          <ul className="flex justify-center gap-5">
                            <li className="flex items-center gap-2">
                              {/* passenger icon (svg as in user's snippet) */}
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 webColor">
                                <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0Z" clipRule="evenodd"></path>
                                <path d="M6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"></path>
                              </svg>
                              <small className="text-sm text-gray-700">{v.passengers}</small>
                            </li>

                            <li className="flex items-center gap-2">
                              {/* luggage icon */}
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 webColor">
                                <path fillRule="evenodd" d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd"></path>
                                <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z"></path>
                              </svg>
                              <small className="text-sm text-gray-700">{v.luggage}</small>
                            </li>
                          </ul>
                          {/* right: selection tick */}
                          <div className="flex-shrink-0">
                            {isSelected ? (
                              <div className="w-10 h-10 rounded-full webColor border text-white flex items-center justify-center">
                                <CheckBadgeIcon className="w-5 h-5" />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"></path></svg>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              

              {/* Continue CTA */}
              <div className="mt-6 flex md:justify-end">
                <button
                  disabled={selectedIdx === null}
                  className={`py-3 px-20 rounded-md font-medium text-black transition hover:opacity-90 text-sm md:text-base w-full md:w-auto ${
                    selectedIdx !== null
                      ? "webBG cursor-pointer text-white"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                  onClick={() => { selectVahicle();
                    // router.push("/booking/pickup-info");
                    // console.log("selected vehicle:", vehicles[selectedIdx]);
                  }}
                >
                  Continue
                </button>
              </div></>

              )}

              <div className="border-t border-gray-200 mt-5">
                <h6 className="py-5 flex w-full text-black text-xs md:text-sm"> <ExclamationCircleIcon className="h-4 w-4 md:h-5 md:w-5 text-black mr-1" /> Eligable promotion auto-supplied</h6>
                <div className="border border-gray-200 rounded-xl">
                  <div className="p-4">
                    <b className="text-gray-500 font-semibold text-xs md:text-sm mb-2 flex">All classes include:</b>
                    <p className="text-gray-700 text-xs md:text-sm py-2 flex items-center items-start"> <CheckCircleIcon className="h-5 w-5 text-gray-600 mr-1 flex-shrink-0" /> Free Cancellation up until 1 hour before pickup</p>
                    <p className="text-gray-700 text-xs md:text-sm py-2 flex items-center items-start"> <CheckCircleIcon className="h-5 w-5 text-gray-600 mr-1 flex-shrink-0" /> Free 60 Minutes of wait time</p>
                    <p className="text-gray-700 text-xs md:text-sm py-2 flex items-center items-start"> <CheckCircleIcon className="h-5 w-5 text-gray-600 mr-1 flex-shrink-0" /> Meet & Greet</p>
                    <p className="text-gray-700 text-xs md:text-sm py-2 flex items-center items-start"> <CheckCircleIcon className="h-5 w-5 text-gray-600 mr-1 flex-shrink-0" /> Complimentary bottle of water</p>
                  </div>
                  <hr className="border-t border-gray-200" />
                  <div className="p-4">
                    <b className="text-gray-500 font-semibold text-xs md:text-sm mb-2 flex">Please Note:</b>
                    <p className="text-gray-700 text-xs md:text-sm py-2 flex items-center items-start"> <ExclamationCircleIcon className="h-5 w-5 text-gray-600 mr-1 flex-shrink-0" /> Guest/Luggage capacities must be abided by for safety reasons. If you are unsure, select a larger class as chauffeurs may turn down service when they are exceeded.</p>
                    <p className="text-gray-700 text-xs md:text-sm py-2 flex items-center items-start"> <ExclamationCircleIcon className="h-5 w-5 text-gray-600 mr-1 flex-shrink-0" /> The vehicle images above are examples. You may get a different vehicle of similar quality.</p>
                  </div>
                </div>
              </div> 
            </div>
          </div>
        </div>
        
        {/* INLINE CSS HERE */}
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
