"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  MapPinIcon,
  CheckBadgeIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  CalendarDaysIcon,
  Squares2X2Icon,
  ChevronDownIcon
} from "@heroicons/react/24/solid";
import { CheckCircleIcon as CheckCircleOutlineIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faWallet, faFireFlameCurved } from "@fortawesome/free-solid-svg-icons";
import { saveSearch } from "@/store/searchSlice";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getPickupData } from "@/app/lib/externalApi";
import Tabs from "@/app/components/Tabs";
import RouteMap from "@/app/components/RouteMap";
import Locations from "@/app/components/Locations";
import PriceBreakdown from "@/app/components/PriceBreakdown";

export default function Booking() {
  const router = useRouter();
  const dispatch = useDispatch();
  const activeStep = 2; // Service Class
  const [submiting, setSubmitting] = useState(false);
  
  const [selectedIdx, setSelectedIdx] = useState(null);

  const { data } = useSelector((state) => state.search);
  // console.log(data);
  if (!data || Object.keys(data).length === 0) {
    router.push("/");
    return;
  }

  const trip = {
    date: new Date(data.pickupDate).toDateString(),
    time: new Date(data.pickupTime).toLocaleTimeString(),
    from: data.from,
    to: data.to || "",
    distanceKM: data.distanceKM || "",
    pickupTimeLabel: data.pickupTimeLabel,
    estimatedTimeLabel: data.estimatedTimeLabel,
    durationMinutes: data.tripType == 'oneway' ? data.durationMinutes : data.duration,
    tripType: data.tripType,
    duration: data.duration || ""
  };

  const [vehicles, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [luggage, setLuggage] = useState(0);
  const [vehicleData, setVehicleData] = useState({});
  const [mobileModalOpen, setMobileModalOpen] = useState(false);

  useEffect(() => {
    const loadPickups = async () => {
      try {
        setLoading(true);
        setError(null);

        const json = await getPickupData();
        
        if (json.error) {
          throw new Error(`Failed to load pickups:`);
        }

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

  const pricedVehicles = vehicles.map((v) => {
    const basePrice =
      trip.tripType === 'oneway'
        ? (Number(v.priceKM || 0) * Number(trip.distanceKM || 0)) +
          Number(v.baseFare || 0)
        : Number(v.priceHR || 0) * Number(trip.duration || 0);
    
    const offerPrice = basePrice * 1.10; // ✅ add 10%    

    return {
      ...v,
      price: `$${basePrice.toFixed(2)}`,
      offerPrice: `$${offerPrice.toFixed(2)}`,
      numericPrice: basePrice, // optional but useful
    };
  });

  const selectVahicle = () => {

    if (selectedIdx === null) return;
    
    try {
      setSubmitting(true);
      const selectedVehicle = vehicles[selectedIdx];

      const subTotal = trip.tripType == 'oneway' ? 
                      (parseFloat(selectedVehicle.priceKM) * trip.distanceKM): 
                      (parseFloat(selectedVehicle.priceHR) * trip.duration);

      let subTotalPrice = subTotal;
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
      
      const saveData = { 
        ...data, 
        returnData: {
          ...(data.returnData || {}),
          selectedVehicle, 
          selectedPassenger: vehicleData[selectedIdx]?.passengers || 1,
          selectedLuggage: vehicleData[selectedIdx]?.luggage || 0,
          payment
        }
      };

      console.log(saveData);

      dispatch(
        saveSearch(saveData)
      );

      console.log("Saved data:", saveData);

      router.push("/booking/return-passengers-info");
    }
    catch (err) {
      console.error(err);
    }
    finally {
      setSubmitting(false);
    }
  };

  const updatePassengers = (idx, max, delta) => {
    setVehicleData(prev => {
      const current = prev[idx]?.passengers ?? 1;
      return {
        ...prev,
        [idx]: {
          ...prev[idx],
          passengers: Math.min(
            max,
            Math.max(1, current + delta)
          ),
        },
      };
    });
  };

  const updateLuggage = (idx, max, delta) => {
    setVehicleData(prev => {
      const current = prev[idx]?.luggage ?? 0;
      return {
        ...prev,
        [idx]: {
          ...prev[idx],
          luggage: Math.min(
            max,
            Math.max(0, current + delta)
          ),
        },
      };
    });
  };

  const [collapse, setCollapse] = useState({
    booking: true,
    returnBooking: true,
    price: true,
  });

  const toggleCollapse = (key) => {
    setCollapse((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-screen">
      <div className="py-10 border-b webBorderColor">
        <div className="container mx-auto px-2">
          <div className="flex flex-col md:flex-row space-x-5 pt-[90px] md:pt-[20px] xl:pt-0 mt-0 md:mt-20 xl:mt-40">
            <div className="w-full md:w-1/3 order-2 md:order-1">
              <div className="sticky top-5 z-50">
                <div className="bg-white rounded-md shadow-xl overflow-hidden text-black px-4 py-4 mb-4">
                  <div
                    className="flex justify-between items-center cursor-pointer border-b border-gray-200 pb-1"
                    onClick={() => toggleCollapse("booking")}
                  >
                    <h4 className="text-sm xl:text-lg font-bold">
                      Booking Summary
                    </h4>
                    <span className="flex items-center">
                      <ChevronDownIcon
                        className={`w-5 h-5 transition-transform duration-300 ${
                          collapse.booking ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </div>   
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      collapse.booking ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <Locations data={data} seats={data.seats} display="" />
                  </div>
                </div>

                <div className="bg-white rounded-md shadow-xl overflow-hidden text-black px-4 py-4 mb-4">
                  <div
                    className="flex justify-between items-center cursor-pointer border-b border-gray-200 pb-1"
                    onClick={() => toggleCollapse("returnBooking")}
                  >
                    <h4 className="text-sm xl:text-lg font-bold">
                      Return Trip Booking Summary
                    </h4>
                    <span className="flex items-center">
                      <ChevronDownIcon
                        className={`w-5 h-5 transition-transform duration-300 ${
                          collapse.returnBooking ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      collapse.returnBooking ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <Locations data={data.returnData} display="" />
                  </div>
                </div>

                <div className="bg-white rounded-md shadow-xl overflow-hidden text-black px-4 py-4 mb-4">
                  <div
                    className="flex justify-between items-center cursor-pointer border-b border-gray-200 pb-1"
                    onClick={() => toggleCollapse("price")}
                  >
                    <h4 className="text-sm xl:text-lg font-bold">
                      Price breakdown
                    </h4>
                    <span className="flex items-center">
                      <ChevronDownIcon
                        className={`w-5 h-5 transition-transform duration-300 ${
                          collapse.price ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      collapse.price ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <PriceBreakdown paymentData={data.payment} />
                  </div>
                </div>
              </div>
            </div>


            {/* Centered white content card */}
            <div className="w-full md:w-2/3 order-1 md:order-2">
              <div className="bg-white rounded-md shadow-xl text-black mb-5 md:mb-0">
                <div className="p-3 xl:p-8">
                  {/* Blacklane Stepper */}
                  <Tabs activeStep={2} hasReturnTrip />             

                  {/* Trip summary (date,time,from,to) */}
                  {/* <TripSummary trip={trip} /> */}

                  {/* Heading */}
                  <h2 className="mt-2 text-lg xl:text-xl font-bold">Select a return vehicle class</h2>
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
                    <div className="mt-4 grid gap-2 xl:gap-4">
                      {pricedVehicles.map((v, idx) => {
                        const isSelected = selectedIdx === idx;
                        const passengers = vehicleData[idx]?.passengers ?? 1;
                        const luggage = vehicleData[idx]?.luggage ?? 0;
                        const MAX_PASSENGERS = v.passengers;
                        const MAX_LUGGAGE = v.luggage;

                        return (
                          <div role="button"
                            key={v.id}
                            onClick={() => {
                              setSelectedIdx(idx);

                              if (window.innerWidth < 768) {
                                setMobileModalOpen(true);
                              } else {
                                setExpandedIdx(expandedIdx === idx ? null : idx);
                              }
                            }}
                            className={`w-full relative flex items-center flex-nowrap md:flex-wrap gap-4 p-3 md:p-4 mt-4 rounded-xl text-left transition-shadow border cursor-pointer ${
                              isSelected
                                ? "border-gray-400 shadow-[0_6px_30px_rgba(0,0,0,0.12)] bg-amber-50"
                                : "border-gray-300 md:border-gray-200"
                            } hover:shadow-md`}
                            aria-pressed={isSelected}
                          >
                            {/* left: image */}
                            <div className="flex w-[30%] h-10 md:w-35 md:h-15 xl:w-42 xl:h-20 relative items-center mb-0">
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
                                  {v.tag &&(
                                    <div className="absolute left-2 md:left-80 xl:left-48 right-0 -top-3 bg-white w-fit">
                                      <span className="flex py-0.5 px-2 md:px-3 text-[10px] md:text-xs border rounded-2xl w-fit">
                                        <FontAwesomeIcon icon={faCircleCheck} className="text-green-600 mr-1" /> {v.tag}
                                        {/* <FontAwesomeIcon icon={faWallet} className="text-yellow-500 mr-1" /> {v.tag} */}
                                        {/* <FontAwesomeIcon icon={faFireFlameCurved} className="text-red-500 mr-1" /> {v.tag} */}
                                      </span>
                                    </div>
                                  )}
                                  <div className="font-semibold text-xs md:text-sm xl:text-xl mt-3 mb-2">{v.name}</div>
                                  <div className="hidden md:block text-xs text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: v.desc }} />
                                  {/* icons list mobile only */}
                                  <ul className="inline-flex md:hidden gap-2 justify-center rounded-xl px-2 py-1 bg-white border border-gray-300">
                                    <li className="flex items-center gap-1">
                                      {/* passenger icon (svg as in user's snippet) */}
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 webColor">
                                        <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0Z" clipRule="evenodd"></path>
                                        <path d="M6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"></path>
                                      </svg>
                                      <small className="text-[11px] text-black">{v.passengers}</small>
                                    </li>

                                    <li className="flex items-center gap-1">
                                      {/* luggage icon */}
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 webColor">
                                        <path fillRule="evenodd" d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd"></path>
                                        <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z"></path>
                                      </svg>
                                      <small className="text-[11px] text-black">{v.luggage}</small>
                                    </li>

                                    {/* {v.features & v.features.map((f, i)=>{
                                      <li className="flex items-center gap-2">Free WiFi</li>
                                    })} */}
                                  </ul>
                                </div>

                                {/* price */}
                                <div className="text-right md:w-70 xl:w-40 mt-8 md:mt-0">
                                  <div className="text-[10px] md:text-base xl:text-base font-medium text-red-300 line-through">{v.offerPrice}</div>
                                  <div className="text-xs md:text-lg xl:text-2xl font-bold md:mt-1 md:mb-1">{v.price}</div>
                                  <div>
                                    <span className="hidden md:flex py-1 text-xs font-light md:justify-end items-center"><CheckCircleOutlineIcon className="w-5 h-5 text-green-600 mr-1 flex-shrink-0" /> Gratuity included</span>
                                  </div>
                                </div>
                              </div>

                              
                              {expandedIdx === idx && (
                              <div className="flex justify-between items-center gap-6">
                                {/* icons list */}
                                <ul className="flex justify-center gap-5 rounded-xl px-2 py-1 bg-white border border-gray-300">
                                  <li className="flex items-center gap-2">
                                    {/* passenger icon (svg as in user's snippet) */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 webColor">
                                      <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0Z" clipRule="evenodd"></path>
                                      <path d="M6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"></path>
                                    </svg>
                                    <small className="text-sm text-black">{v.passengers}</small>
                                  </li>

                                  <li className="flex items-center gap-2">
                                    {/* luggage icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 webColor">
                                      <path fillRule="evenodd" d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd"></path>
                                      <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z"></path>
                                    </svg>
                                    <small className="text-sm text-black">{v.luggage}</small>
                                  </li>

                                  {/* {v.features & v.features.map((f, i)=>{
                                    <li className="flex items-center gap-2">Free WiFi</li>
                                  })} */}
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
                              )}
                            </div>

                            {expandedIdx === idx && (
                              <div className="flex-2 mt-3 border-t border-gray-300 pt-3 flex flex-col xl:flex-row xl:items-center justify-between gap-4 w-full">
                                <div className="flex gap-5">
                                  {/* Passengers */}
                                  <div className="flex items-center gap-2 md:gap-3">
                                    <svg className="w-4 h-4 xl:w-7 xl:h-7" viewBox="0 0 25 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25.0005 16.875C25.0005 17.1734 24.8808 17.4595 24.6677 17.6705C24.4545 17.8815 24.1655 18 23.8641 18H10.2278C9.92638 18 9.63734 17.8815 9.42423 17.6705C9.21112 17.4595 9.0914 17.1734 9.0914 16.875C9.0914 15.0848 9.80974 13.3679 11.0884 12.102C12.3671 10.8362 14.1013 10.125 15.9096 10.125H18.1823C19.9906 10.125 21.7248 10.8362 23.0035 12.102C24.2821 13.3679 25.0005 15.0848 25.0005 16.875ZM17.0459 0C16.1469 0 15.2681 0.26392 14.5206 0.758387C13.7731 1.25285 13.1905 1.95566 12.8465 2.77792C12.5025 3.60019 12.4124 4.50499 12.5878 5.37791C12.7632 6.25082 13.1961 7.05264 13.8318 7.68198C14.4675 8.31132 15.2774 8.7399 16.1592 8.91353C17.0409 9.08717 17.9548 8.99805 18.7854 8.65746C19.616 8.31686 20.3259 7.74009 20.8253 7.00007C21.3248 6.26004 21.5914 5.39002 21.5914 4.5C21.5914 3.30653 21.1125 2.16193 20.2601 1.31802C19.4076 0.474106 18.2515 0 17.0459 0ZM6.81867 0C5.91966 0 5.04085 0.26392 4.29335 0.758387C3.54585 1.25285 2.96325 1.95566 2.61922 2.77792C2.27518 3.60019 2.18517 4.50499 2.36056 5.37791C2.53594 6.25082 2.96885 7.05264 3.60455 7.68198C4.24024 8.31132 5.05016 8.7399 5.9319 8.91353C6.81363 9.08717 7.72757 8.99805 8.55814 8.65746C9.38871 8.31686 10.0986 7.74009 10.5981 7.00007C11.0975 6.26004 11.3641 5.39002 11.3641 4.5C11.3641 3.30653 10.8852 2.16193 10.0328 1.31802C9.18035 0.474106 8.0242 0 6.81867 0ZM6.81867 16.875C6.81698 15.6933 7.05214 14.523 7.51054 13.432C7.96893 12.3409 8.64145 11.3507 9.48913 10.5188C8.79541 10.2595 8.06018 10.1261 7.31867 10.125H6.31867C4.64391 10.128 3.0386 10.7879 1.85436 11.9603C0.670121 13.1327 0.00349235 14.722 0.000488281 16.38V16.875C0.000488281 17.1734 0.120212 17.4595 0.333321 17.6705C0.546431 17.8815 0.835469 18 1.13685 18H7.02321C6.89092 17.6392 6.82174 17.2588 6.81867 16.875Z" fill="black"></path></svg>
                                    <span className="font-medium text-xs xl:text-sm">Passenger(s)</span>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        updatePassengers(idx, MAX_PASSENGERS, -1);
                                      }}
                                      className="w-4 h-4 xl:w-7 xl:h-7 border rounded-full cursor-pointer flex items-center justify-center"
                                      disabled={passengers === 1}
                                    >
                                      -
                                    </button>
                                    <span className="w-2 xl:w-5 text-center">{passengers}</span>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        updatePassengers(idx, MAX_PASSENGERS, 1);
                                      }}
                                      className="w-4 h-4 xl:w-7 xl:h-7 border rounded-full cursor-pointer flex items-center justify-center"
                                      disabled={passengers === MAX_PASSENGERS}
                                    >
                                      +
                                    </button>
                                  </div>

                                  {/* Luggage */}
                                  <div className="flex items-center gap-2 md:gap-3">
                                    <svg className="w-4 h-4 xl:w-7 xl:h-7" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.63642 2.11589C6.63642 1.84668 6.85972 1.6276 7.13412 1.6276H12.8668C13.1413 1.6276 13.3645 1.84668 13.3645 2.11589V5.02468H15.0235V2.11589C15.0235 0.949165 14.056 0 12.8668 0H7.13412C5.94491 0 4.97745 0.949165 4.97745 2.11589V5.02468H6.63642V2.11589Z" fill="black"></path><path d="M18.065 6.65233H1.93597C0.868746 6.65233 0.000488281 7.50417 0.000488281 8.55121V21.4737C0.000488281 22.4286 0.722811 23.2208 1.65947 23.3529V24.1861C1.65947 24.6356 2.03087 24.9999 2.48897 24.9999C2.94707 24.9999 3.31846 24.6356 3.31846 24.1861V23.3725H16.6825V24.1862C16.6825 24.6356 17.0539 25 17.512 25C17.9701 25 18.3415 24.6356 18.3415 24.1862V23.3529C19.2782 23.2209 20.0005 22.4286 20.0005 21.4737V8.55121C20.0005 7.50417 19.1322 6.65233 18.065 6.65233ZM4.97745 20.3886C4.97745 20.838 4.60605 21.2024 4.14795 21.2024C3.68985 21.2024 3.31846 20.838 3.31846 20.3886V9.63629C3.31846 9.18685 3.68985 8.82248 4.14795 8.82248C4.60605 8.82248 4.97745 9.18685 4.97745 9.63629V20.3886ZM15.853 21.2024C15.3949 21.2024 15.0235 20.838 15.0235 20.3886V9.63629C15.0235 9.18685 15.3949 8.82248 15.853 8.82248C16.3111 8.82248 16.6825 9.18685 16.6825 9.63629V20.3886C16.6825 20.8381 16.3111 21.2024 15.853 21.2024Z" fill="black"></path></svg>
                                    <span className="font-medium text-xs md:text-sm">Luggage(s)</span>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        updateLuggage(idx, MAX_LUGGAGE, -1);
                                      }}
                                      className="w-4 h-4 xl:w-7 xl:h-7 border rounded-full cursor-pointer flex items-center justify-center"
                                      disabled={luggage === 0}
                                    >
                                      -
                                    </button>
                                    <span className="w-2 xl:w-5 text-center">{luggage}</span>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        updateLuggage(idx, MAX_LUGGAGE, 1);
                                      }}
                                      disabled={luggage === MAX_LUGGAGE}
                                      className="w-4 h-4 xl:w-7 xl:h-7 border rounded-full cursor-pointer flex items-center justify-center"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                                {/* Continue */}
                                <button
                                  disabled={selectedIdx === null}
                                  className={`py-3 px-10 rounded-md font-medium text-black transition hover:opacity-90 text-sm md:text-base w-full md:w-auto ${
                                    selectedIdx !== null
                                      ? "webBG cursor-pointer text-white"
                                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                  }`}
                                  onClick={() => { selectVahicle();
                                  }}
                                >
                                  {submiting ? 'Continue...' : 'Continue'}
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>                  
                  </>
                  )}                  

                  {/* MOBILE VEHICLE MODAL */}
                  {mobileModalOpen && selectedIdx !== null && (
                    <div className="fixed inset-0 z-55 md:hidden">
                      {/* Backdrop */}
                      <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setMobileModalOpen(false)}
                      />

                      {/* Bottom Sheet */}
                      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 animate-slideUp max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="flex justify-end mb-2">
                          <button
                            onClick={() => setMobileModalOpen(false)}
                            className="text-2xl font-bold"
                          >
                            ×
                          </button>
                        </div>

                        {/* Image */}
                        <div className="relative w-full h-25 mb-4">
                          <Image
                            src={pricedVehicles[selectedIdx].img}
                            alt={pricedVehicles[selectedIdx].name}
                            fill
                            className="object-contain"
                          />
                        </div>

                        {/* icons list */}
                        <ul className="inline-flex md:hidden gap-2 justify-center rounded-xl px-2 py-1 mb-1 bg-white border border-gray-300">
                          <li className="flex items-center gap-1">
                            {/* passenger icon (svg as in user's snippet) */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 webColor">
                              <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0Z" clipRule="evenodd"></path>
                              <path d="M6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"></path>
                            </svg>
                            <small className="text-[11px] text-black">{pricedVehicles[selectedIdx]?.passengers}</small>
                          </li>

                          <li className="flex items-center gap-1">
                            {/* luggage icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 webColor">
                              <path fillRule="evenodd" d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd"></path>
                              <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z"></path>
                            </svg>
                            <small className="text-[11px] text-black">{pricedVehicles[selectedIdx]?.luggage}</small>
                          </li>
                        </ul>

                        <div className="border-b border-gray-200 mb-3 pb-3">
                          <h3 className="text-base font-semibold">
                            {pricedVehicles[selectedIdx].name}
                          </h3>
                          <div
                            className="text-xs text-gray-600 mt-1"
                            dangerouslySetInnerHTML={{
                              __html: pricedVehicles[selectedIdx]?.desc
                            }}
                          />
                        </div>
                        
                        {/* Passengers */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm">Passengers</span>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                updatePassengers(
                                  selectedIdx,
                                  pricedVehicles[selectedIdx].passengers,
                                  -1
                                )
                              }
                              className="w-6 h-6 border rounded-full flex items-center justify-center"
                            >
                              −
                            </button>
                            <span className="text-sm">{vehicleData[selectedIdx]?.passengers || 1}</span>
                            <button
                              onClick={() =>
                                updatePassengers(
                                  selectedIdx,
                                  pricedVehicles[selectedIdx].passengers,
                                  1
                                )
                              }
                              className="w-6 h-6 border rounded-full flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Luggage */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm">Luggage</span>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                updateLuggage(
                                  selectedIdx,
                                  pricedVehicles[selectedIdx].luggage,
                                  -1
                                )
                              }
                              className="w-6 h-6 border rounded-full flex items-center justify-center"
                            >
                              −
                            </button>
                            <span className="text-sm">{vehicleData[selectedIdx]?.luggage || 0}</span>
                            <button
                              onClick={() =>
                                updateLuggage(
                                  selectedIdx,
                                  pricedVehicles[selectedIdx].luggage,
                                  1
                                )
                              }
                              className="w-6 h-6 border rounded-full flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="flex justify-between border-t border-gray-200 mt-3 pt-3 mb-3">
                          <div className="flex items-center text-xs text-gray-500">
                            <CheckCircleOutlineIcon className="w-5 h-5 text-green-600 mr-1" /> Gratuity included
                          </div>
                          <div className="text-lg font-bold">
                            {pricedVehicles[selectedIdx].price}
                          </div>
                        </div>

                        {/* Continue */}
                        <button
                          onClick={() => {
                            setMobileModalOpen(false);
                            selectVahicle();
                          }}
                          className="w-full py-3 rounded-md webBG text-white font-medium"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  )}


                  <div className="border-t border-gray-200 mt-5">
                    <h6 className="py-5 flex w-full text-black text-xs md:text-sm"> <ExclamationCircleIcon className="h-4 w-4 md:h-5 md:w-5 text-black mr-1" /> Eligable promotion auto-supplied</h6>
                    <div className="border border-gray-200 rounded-xl">
                      <div className="p-4">
                        <b className="text-gray-500 font-semibold text-xs md:text-sm mb-2 flex">All classes include:</b>
                        <p className="text-gray-700 text-xs xl:text-sm py-2 flex items-center items-start"> <CheckCircleIcon className="h-5 w-5 text-gray-600 mr-1 flex-shrink-0" /> Free Cancellation up until 1 hour before pickup</p>
                        <p className="text-gray-700 text-xs xl:text-sm py-2 flex items-center items-start"> <CheckCircleIcon className="h-5 w-5 text-gray-600 mr-1 flex-shrink-0" /> Free 60 Minutes of wait time</p>
                        <p className="text-gray-700 text-xs xl:text-sm py-2 flex items-center items-start"> <CheckCircleIcon className="h-5 w-5 text-gray-600 mr-1 flex-shrink-0" /> Meet & Greet</p>
                        <p className="text-gray-700 text-xs xl:text-sm py-2 flex items-center items-start"> <CheckCircleIcon className="h-5 w-5 text-gray-600 mr-1 flex-shrink-0" /> Complimentary bottle of water</p>
                      </div>
                      <hr className="border-t border-gray-200" />
                      <div className="p-4">
                        <b className="text-gray-500 font-semibold text-xs md:text-sm mb-2 flex">Please Note:</b>
                        <p className="text-gray-700 text-xs xl:text-sm py-2 flex items-center items-start"> <ExclamationCircleIcon className="h-5 w-5 text-gray-600 mr-1 flex-shrink-0" /> Guest/Luggage capacities must be abided by for safety reasons. If you are unsure, select a larger class as chauffeurs may turn down service when they are exceeded.</p>
                        <p className="text-gray-700 text-xs xl:text-sm py-2 flex items-center items-start"> <ExclamationCircleIcon className="h-5 w-5 text-gray-600 mr-1 flex-shrink-0" /> The vehicle images above are examples. You may get a different vehicle of similar quality.</p>
                      </div>
                    </div>
                  </div> 

                  {/* Continue button */}
                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={(e) => {e.preventDefault(); router.back(); }}
                      className="flex py-3 px-3 xl:px-10 rounded-md font-medium text-white bg-gray-700 hover:opacity-80 cursor-pointer text-xs xl:text-base w-auto transition"
                    >
                      <FaChevronLeft className="text-white text-xs xl:text-sm mr-1 mt-[2px] xl:mt-1" />
                      Back
                    </button>
                    {/* <button
                      // onClick={handleContinue}
                      className="flex py-3 px-2 md:px-10 rounded-md font-medium text-white webBG hover:opacity-90 cursor-pointer text-xs md:text-base w-auto"
                    >
                      Continue to Payment
                      <FaChevronRight className="text-white text-sm ml-1 md:mt-1" />
                    </button> */}
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
