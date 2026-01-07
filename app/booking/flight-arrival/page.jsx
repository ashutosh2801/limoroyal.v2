"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CalendarDaysIcon,
  ClockIcon,
  CheckCircleIcon,
  MapPinIcon,
  XMarkIcon,
  ArrowPathIcon 
} from "@heroicons/react/24/solid";
import {
  CheckCircleIcon as CheckCircleOutlineIcon,
} from "@heroicons/react/24/outline";
import { FaPlane, FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { saveSearch } from "@/store/searchSlice";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import Tabs from "../../components/Tabs";
import { getPickupData } from "../../lib/externalApi";

export default function PickupInfoPage() {
  const router = useRouter();
  const refMsg = useRef(null);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.search);
  const [bookingFor, setBookingFor] = useState("myself");
  const activeStep = 1; // Pickup Info
  const [selectedIdx, setSelectedIdx] = useState(null);

  // ---------------- GOOGLE PLACES ----------------
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);
  const fromListRef = useRef(null);
  const toListRef = useRef(null);

  const [fromInput, setFromInput] = useState("");
  const [fromPlace, setFromPlace] = useState(null);
  const [toPlace, setToPlace] = useState(null);

  const directionsService = useRef(null);
  const autocompleteService = useRef(null);
  const placesService = useRef(null);

  const [googleReady, setGoogleReady] = useState(false);

  const [childSeats, setChildSeats] = useState(false);
  const [returnTrip, setReturnTrip] = useState(false);

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

  useEffect(() => {
    const loadPickups = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getPickupData();

        if (res.error) {
          throw new Error(`Failed to load pickups: ${res.status}`);
        }

        // Laravel usually doesn't return "success"
        setPickups(res.data ?? res);

        console.log("Fetched pickups:", json.data ?? json);
      } catch (err) {
        console.error(err);
        console.error("Pickup fetch error:", err);
      }
      finally {
        setLoading(false);
      }
    };

    // loadPickups();
  }, []); 

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google?.maps?.places && window.google?.maps?.DirectionsService) {
        autocompleteService.current =
          new window.google.maps.places.AutocompleteService();

        placesService.current =
          new window.google.maps.places.PlacesService(
            document.createElement("div")
          );

        directionsService.current =
          new window.google.maps.DirectionsService();

        setGoogleReady(true);
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const fetchPredictions = (value, listRef, inputRef, setInput) => {
    if (!autocompleteService.current || value.length < 2) {
      listRef.current.style.display = "none";
      return;
    }

    autocompleteService.current.getPlacePredictions(
      {
        input: value,
        // types: ["establishment", ""],
        componentRestrictions: { country: ["ca", "us"] },
      },
      (predictions, status) => {
        if (
          status !== window.google.maps.places.PlacesServiceStatus.OK ||
          !predictions
        ) {
          listRef.current.style.display = "none";
          return;
        }

        listRef.current.innerHTML = "";
        listRef.current.style.display = "block";

        predictions.forEach((p) => {
          const div = document.createElement("div");
          div.className = "p-3 cursor-pointer hover:bg-gray-100";

          const icon = getIcon(p.types);

          div.innerHTML = `
            <div class="flex items-start gap-2">
              <span class="text-lg">${icon}</span>
              <div>
                <div class="font-semibold">
                  ${p.structured_formatting.main_text}
                </div>
                <div class="text-xs text-gray-500">
                  ${p.description}
                </div>
              </div>
            </div>
          `;

          // div.innerHTML = `
          //   <div class="font-semibold">${p.structured_formatting.main_text}</div>
          //   <div class="text-xs text-gray-500">${p.description}</div>
          // `;

          div.onclick = () =>
            selectPlace(
              p.place_id,
              inputRef,
              listRef,
              setInput,
              setInput === setFromInput ? setFromPlace : setToPlace
            );

          listRef.current.appendChild(div);
        });
      }
    );
  };

  const selectPlace = (
    placeId,
    inputRef,
    listRef,
    setInput,
    setPlace
  ) => {
    placesService.current.getDetails(
      {
        placeId,
        fields: [
                  "name",
                  "formatted_address",
                  "geometry",
                  "place_id",
                  "types",
                  "address_components"
                ],
      },
      (place, status) => {
        if (status !== window.google.maps.places.PlacesServiceStatus.OK) return;

        const value = `${place.name}`;

        setInput(value);
        inputRef.current.value = value;

        listRef.current.innerHTML = "";
        listRef.current.style.display = "none";

        const airportData = extractAirportData(place);

        setPlace({
          name: place.name,
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          placeId: place.place_id,

          // ✈ Airport data
          isAirport: airportData?.isAirport || false,
          iata: airportData?.iata || null,
          terminal: airportData?.terminal || null,
        });

      }
    );
  };

  const handleContinue = () => {

    if (!validate()) {refMsg.current?.scrollIntoView({ behavior: "smooth" }); return;}

    dispatch(
      saveSearch({ 
        ...data, PickupInfo: { ...form }
      })
    );

    router.push("/booking/payment");
  };


  return (
    <div className="min-h-screen">
      <div className="py-10 border-b webBorderColor">
        <div className="container mx-auto px-2">
          <div className="flex flex-col md:flex-row space-x-5 pt-[80px] md:pt-0 mt-0 md:mt-40">
            <div className="w-full md:w-1/3 order-2 md:order-1">
            <div className="sticky top-5 z-50">
              <div className="bg-white rounded-md shadow-xl overflow-hidden text-black p-1">
                <div className="h-80 w-full rounded-xl overflow-hidden">
                    <iframe
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={data.to ? `https://www.google.com/maps?q=${data.from.name}+to+${data.to?.name}&output=embed` : `https://www.google.com/maps?q=${data.from.name}&output=embed`}
                    ></iframe>
                </div>
                <div className="mt-4 mb-2 text-xs md:text-sm text-black flex gap-5 px-3"> 
                  {data.distanceKM && (<p className="flex gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.8 16C12.7882 16 14.4 14.3882 14.4 12.4L14.4 3.2L15.2 3.2C15.5235 3.2 15.8153 3.00512 15.9391 2.70616C16.0629 2.4072 15.9945 2.06312 15.7657 1.83432L14.1657 0.23432C13.8532 -0.0780794 13.3467 -0.0780795 13.0343 0.23432L11.4343 1.83432C11.2055 2.06312 11.137 2.4072 11.2609 2.70616C11.3847 3.00512 11.6764 3.2 12 3.2L12.8 3.2L12.8 12.4C12.8 13.5046 11.9045 14.4 10.8 14.4C9.69541 14.4 8.8 13.5046 8.8 12.4L8.8 3.6C8.8 1.61176 7.18824 -7.70349e-07 5.2 -9.44166e-07C3.21176 -1.11798e-06 1.6 1.61176 1.6 3.6L1.6 11.3366C0.667839 11.666 -1.60618e-06 12.555 -1.69753e-06 13.6C-1.81341e-06 14.9255 1.07448 16 2.4 16C3.72552 16 4.8 14.9255 4.8 13.6C4.8 12.555 4.13216 11.666 3.2 11.3366L3.2 3.6C3.2 2.49544 4.09544 1.6 5.2 1.6C6.30456 1.6 7.2 2.49544 7.2 3.6L7.2 12.4C7.2 14.3882 8.81176 16 10.8 16Z" fill="#ceb366"></path></svg> {trip.distanceKM} km
                  </p>)}
                  <p className="flex gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.3904 10.0572C10.1976 10.0572 10.0145 10.003 9.86024 9.89458L7.46988 8.21386C7.24819 8.06024 7.11325 7.80723 7.11325 7.54518V4.18373C7.11325 3.72289 7.50843 3.35241 8 3.35241C8.49157 3.35241 8.88675 3.72289 8.88675 4.18373V7.12952L10.9205 8.55723C11.1133 8.69277 11.2289 8.88253 11.2675 9.10843C11.2964 9.3253 11.2386 9.5512 11.094 9.72289C10.9301 9.93072 10.6699 10.0572 10.3807 10.0572H10.3904Z" fill="#ceb366"></path><path d="M8 15C3.58554 15 0 11.6386 0 7.5C0 3.36145 3.58554 0 8 0C12.4145 0 16 3.36145 16 7.5C16 11.6386 12.4145 15 8 15ZM8 1.66265C4.56867 1.66265 1.77349 4.28313 1.77349 7.5C1.77349 10.7169 4.56867 13.3373 8 13.3373C11.4313 13.3373 14.2265 10.7169 14.2265 7.5C14.2265 4.28313 11.4313 1.66265 8 1.66265Z" fill="#ceb366"></path></svg>
                    {data.durationMinutes}
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-md shadow-xl overflow-hidden text-black px-4 py-4 mt-5">
                <div>
                  <h4 className="mb-4 text-sm md:text-lg font-bold border-b border-gray-200 pb-1">Pickup Trip Details</h4>
                </div>
                <div className="relative">
                  {/* Vertical connector */}
                  {data.to && (
                    <div className="absolute left-[9px] top-[19px] h-[calc(100%-40px)] border-r-3 border-dotted border-black" />
                  )}

                  {/* FROM */}
                  <div className="flex items-start gap-3 text-xs md:text-sm mb-4 relative z-10">
                    <MapPinIcon className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold line-clamp-1">{data.from.name}</p>
                      <p className="text-gray-600">{data.from.address}</p>
                    </div>
                  </div>

                  {/* TO */}
                  {data.to && (
                    <div className="flex items-start gap-3 text-xs md:text-sm relative z-10">
                      <MapPinIcon className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">{data.to?.name}</p>
                        <p className="text-gray-600">{data.to?.address}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 mt-3">
                    <CalendarDaysIcon className="w-5 h-5 text-gray-600" />
                    <span>{trip.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 mt-3">
                    <ClockIcon className="w-5 h-5 text-gray-600" />
                    <span>{trip.pickupTimeLabel}</span>
                  </div>
                  {data.selectedPassenger > 0 && (
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 mt-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 webColor">
                      <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0Z" clipRule="evenodd"></path>
                      <path d="M6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"></path>
                    </svg>
                    <span>{data.selectedPassenger} Passenger(s)</span>
                  </div>
                  )}
                  {data.selectedLuggage > 0 && (
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 mt-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 webColor">
                      <path fillRule="evenodd" d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd"></path>
                      <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z"></path>
                    </svg>
                    <span>{data.selectedLuggage} Luggage(s)</span>
                  </div>
                  )}
                </div>
              </div>
            </div>
            </div>
            {/* Centered white content card */}
            <div className="w-full md:w-2/3 order-1 md:order-2">
              <div className="bg-white rounded-md shadow-xl overflow-hidden text-black mb-5 md:mb-0">
                <div className="p-4 md:p-8">

                  {/* Blacklane Stepper */}
                  <Tabs activeStep={activeStep} />              

                  {/* Trip summary (date,time,from,to) */}
                  {/* <TripSummary trip={trip} /> */}

                  {/* Vehicles grid */}                  
                  <div role="button"                          
                    className="w-full relative md:flex md:items-center flex-wrap gap-4 p-4 mt-2 rounded-xl text-left transition-shadow border bg-amber-50"
                  >
                    {/* left: image */}
                    <div className="flex w-full md:w-42 h-20 relative items-center mb-3 md:mb-0">
                      <Image
                        src={data.selectedVehicle?.img}
                        alt={data.selectedVehicle?.name}
                        fill
                        sizes="128px"
                        className="object-contain rounded-md"
                      />
                    </div>

                    {/* center: details */}
                    <div className="flex-1">


                      <div className="block md:flex items-start justify-between">
                        <div>
                          <div className="font-semibold text-sm md:text-xl mt-2 mb-2">{data.selectedVehicle?.name}</div>
                          <div className="text-xs text-gray-600 my-1 hidden md:block" dangerouslySetInnerHTML={{ __html: data.selectedVehicle?.desc }} />
                        </div>

                        {/* price */}
                        <div className="md:text-right md:w-40">
                          <div className="inline-block md:flex md:justify-end"> 
                            <span className="flex items-center text-xs rounded-full bg-green-400 text-white py-1 px-2 gap-1">
                              <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 6L5 10L14 1" stroke="white" strokeWidth={2}></path></svg> Selected
                            </span>
                          </div>
                          <a href=""
                            onClick={(e) => {
                              e.preventDefault();
                              router.back();
                            }} className="inline-block float-right md:flex text-xs mt-2 mb-3 flex md:justify-end underline text-gray-700">Change Vehicle
                          </a>
                          <div className="text-sm md:text-2xl font-bold my-1">{data.payment?.subTotalLabel}</div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center gap-6">
                        {/* icons list */}
                        <ul className="flex justify-center gap-5 rounded-xl px-2 py-1 bg-white border border-gray-300">
                          <li className="flex items-center gap-2">
                            {/* passenger icon (svg as in user's snippet) */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 webColor">
                              <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0Z" clipRule="evenodd"></path>
                              <path d="M6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"></path>
                            </svg>
                            <small className="text-sm text-black">{data.selectedPassenger}</small>
                          </li>

                          <li className="flex items-center gap-2">
                            {/* luggage icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 webColor">
                              <path fillRule="evenodd" d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd"></path>
                              <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z"></path>
                            </svg>
                            <small className="text-sm text-black">{data.selectedLuggage}</small>
                          </li>

                          {/* {data.selectedVehicle?.features?.length > 0 & data.selectedVehicle?.features?.map((f, i)=>{
                            <li className="flex items-center gap-2">Free WiFi</li>
                          })} */}
                        </ul>
                      </div>
                    </div>
                  </div>
                      

                  {/* Heading */}
                  <h2 ref={refMsg} className="mt-6 text-lg md:text-xl font-bold">Flight Arrival Information</h2>

                  <div className="flex flex-col md:flex-row mt-3 space-x-3 space-y-3 md:space-y-0">
                    <div className="w-full md:w-[40%] relative">
                        {/* Icon */}
                        <FaPlane
                            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none w-5 h-5 text-gray-500 z-1"
                        />

                        {/* Input */}
                        <input
                            type="text"
                            placeholder=" "
                            className="peer w-full pl-11 pr-10 pt-7 pb-3 text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none"
                        />

                        {/* Floating label */}
                        <label
                            className="pointer-events-none absolute left-11
                                    transition-all duration-200 text-gray-400
                                    top-3 text-sm
                                    peer-focus:top-2 peer-focus:text-xs
                                    peer-not-placeholder-shown:top-2
                                    peer-not-placeholder-shown:text-xs"
                        >
                            Airline Name or Code
                        </label>

                        {/* Helper text */}
                        <span
                            className="pointer-events-none absolute left-11 top-8
                                    text-[13px] text-gray-500
                                    transition-opacity peer-focus:opacity-0 peer-not-placeholder-shown:opacity-0"
                        >
                            SriLankan Airlines, UL, EK
                        </span>
                    </div>
                    <div className="w-full md:w-[20%] relative">

                        {/* Input */}
                        <input
                            type="text"
                            placeholder=" "
                            className="peer w-full px-2 pt-7 pb-3 text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none"
                        />

                        {/* Floating label */}
                        <label
                            className="pointer-events-none absolute left-2
                                    transition-all duration-200 text-gray-400
                                    top-3 text-sm
                                    peer-focus:top-2 peer-focus:text-xs
                                    peer-not-placeholder-shown:top-2
                                    peer-not-placeholder-shown:text-xs"
                        >
                            Flight Code
                        </label>

                        {/* Helper text */}
                        <span
                            className="pointer-events-none absolute left-2 top-8
                                    text-[13px] text-gray-500
                                    transition-opacity peer-focus:opacity-0 peer-not-placeholder-shown:opacity-0"
                        >
                            UL 225, EK202..
                        </span>
                    </div>
                    <div className="w-full md:w-[40%] relative">
                        {/* Select */}
                        <select
                            defaultValue=""
                            className="peer w-full px-2 pt-7 pb-3 text-sm border rounded-xl
                                    bg-gray-100 border-gray-200 focus:outline-none
                                    appearance-none"
                            required
                        >
                            <option value="" disabled hidden />
                            <option value="curbside">Curbside Pickup</option>
                            <option value="inside">Inside Pickup</option>
                        </select>

                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                           <FaChevronDown className="text-gray-500 text-sm" />
                        </div>


                        {/* Floating label */}
                        <label
                            className="pointer-events-none absolute left-2
                                    transition-all duration-200 text-gray-400
                                    top-3 text-sm
                                    peer-focus:top-2 peer-focus:text-xs
                                    peer-valid:top-2 peer-valid:text-xs"
                        >
                            Meet &amp; Greet
                        </label>

                        {/* Helper text */}
                        <span
                            className="pointer-events-none absolute left-2 top-8
                                    text-[13px] text-gray-500 transition-opacity
                                    peer-focus:opacity-0 peer-valid:opacity-0"
                        >
                            Select pickup type
                        </span>
                    </div>
                  </div>

                  <div className="w-full mt-5 space-y-4">

                    {/* CHILD SEATS */}
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      <div className="flex gap-2">
                        <div className="flex items-center gap-2 md:w-[260px]">
                          <span className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full">
                              👶
                          </span>
                          <span className="text-sm font-medium">
                              Do you want Child Seats?
                          </span>
                        </div>

                        {/* Toggle */}
                        <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={childSeats}
                            onChange={() => setChildSeats(!childSeats)}
                            className="sr-only peer"
                        />
                        <div className="w-10 h-6 bg-gray-300 peer-checked:bg-yellow-600 rounded-full
                                        after:content-[''] after:absolute after:top-1 after:left-1
                                        after:bg-white after:w-4 after:h-4 after:rounded-full
                                        after:transition-all peer-checked:after:translate-x-4" />
                        </label>
                      </div>
                        {/* Child seat selects (SHOW ONLY IF ON) */}
                        {childSeats && (
                        <div className="grid md:grid-cols-3 gap-2 md:ml-auto md:w-[60%]">
                          <div className="relative">
                            {/* Select */}
                            <select
                              defaultValue=""
                              className="peer w-full px-2 pt-5 pb-2 text-sm border rounded-xl
                                        bg-gray-100 border-gray-200 focus:outline-none
                                        appearance-none"
                              required
                            >
                              <option value="" disabled hidden />
                              <option value="0">0</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                            </select>

                            {/* Dropdown Icon */}
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                              <FaChevronDown className="text-gray-500 text-sm" />
                            </div>

                            {/* Floating label */}
                            <label
                              className="pointer-events-none absolute left-2
                                        transition-all duration-200 text-gray-400
                                        top-3 text-xs
                                        peer-focus:top-2 peer-focus:text-xs
                                        peer-valid:top-2 peer-valid:text-xs"
                            >
                              Infant
                            </label>

                            {/* Helper text */}
                            <span
                              className="pointer-events-none absolute left-2 top-7
                                        text-[12px] text-gray-500 transition-opacity
                                        peer-focus:opacity-0 peer-valid:opacity-0"
                            >
                              Select infant seats
                            </span>
                          </div>
                          <div className="relative">
                            {/* Select */}
                            <select
                              defaultValue=""
                              className="peer w-full px-2 pt-5 pb-2 text-sm border rounded-xl
                                        bg-gray-100 border-gray-200 focus:outline-none
                                        appearance-none"
                              required
                            >
                              <option value="" disabled hidden />
                              <option value="0">0</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                            </select>

                            {/* Dropdown Icon */}
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                              <FaChevronDown className="text-gray-500 text-sm" />
                            </div>

                            {/* Floating label */}
                            <label
                              className="pointer-events-none absolute left-2
                                        transition-all duration-200 text-gray-400
                                        top-3 text-xs
                                        peer-focus:top-2 peer-focus:text-xs
                                        peer-valid:top-2 peer-valid:text-xs"
                            >
                              Toddler
                            </label>

                            {/* Helper text */}
                            <span
                              className="pointer-events-none absolute left-2 top-7
                                        text-[12px] text-gray-500 transition-opacity
                                        peer-focus:opacity-0 peer-valid:opacity-0"
                            >
                              Select toddler seats
                            </span>
                          </div>
                          <div className="relative">
                            {/* Select */}
                            <select
                              defaultValue=""
                              className="peer w-full px-2 pt-5 pb-2 text-sm border rounded-xl
                                        bg-gray-100 border-gray-200 focus:outline-none
                                        appearance-none"
                              required
                            >
                              <option value="" disabled hidden />
                              <option value="0">0</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                            </select>

                            {/* Dropdown Icon */}
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                              <FaChevronDown className="text-gray-500 text-sm" />
                            </div>

                            {/* Floating label */}
                            <label
                              className="pointer-events-none absolute left-2
                                        transition-all duration-200 text-gray-400
                                        top-3 text-xs
                                        peer-focus:top-2 peer-focus:text-xs
                                        peer-valid:top-2 peer-valid:text-xs"
                            >
                              Booster
                            </label>

                            {/* Helper text */}
                            <span
                              className="pointer-events-none absolute left-2 top-7
                                        text-[12px] text-gray-500 transition-opacity
                                        peer-focus:opacity-0 peer-valid:opacity-0"
                            >
                              Select booster seats
                            </span>
                          </div>
                        </div>
                        )}
                    </div>

                    {/* RETURN TRIP */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 md:w-[260px]">
                        <span className="w-6 h-6 flex items-center justify-center bg-yellow-600 rounded-full">
                            <ArrowPathIcon className="w-4 h-4 text-white" />
                        </span>
                        <span className="text-sm font-medium">
                            Do you want a Return Trip?
                        </span>
                        </div>

                        <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={returnTrip}
                            onChange={() => setReturnTrip(!returnTrip)}
                            className="sr-only peer"
                        />
                        <div className="w-10 h-6 bg-gray-300 peer-checked:bg-yellow-600 rounded-full
                                        after:content-[''] after:absolute after:top-1 after:left-1
                                        after:bg-white after:w-4 after:h-4 after:rounded-full
                                        after:transition-all peer-checked:after:translate-x-4" />
                        </label>
                    </div>

                    {/* RETURN TRIP FIELDS (SHOW ONLY IF ON) */}
                    {returnTrip && (
                        <div className="grid grid-cols-1 space-y-4">
                          <div className="relative">
                            {/* Icon */}
                            <FaPlane
                                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none w-5 h-5 text-gray-500 z-1"
                            />

                            {/* Input */}
                            <input
                                type="text"
                                placeholder=" "
                                className="peer w-full pl-11 pr-10 pt-7 pb-3 text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none"
                            />

                            {/* Floating label */}
                            <label
                                className="pointer-events-none absolute left-11
                                        transition-all duration-200 text-gray-400
                                        top-3 text-sm
                                        peer-focus:top-2 peer-focus:text-xs
                                        peer-not-placeholder-shown:top-2
                                        peer-not-placeholder-shown:text-xs"
                            >
                                Pickup Location
                            </label>

                            {/* Helper text */}
                            <span
                                className="pointer-events-none absolute left-11 top-8
                                        text-[13px] text-gray-500
                                        transition-opacity peer-focus:opacity-0 peer-not-placeholder-shown:opacity-0"
                            >
                                Address, Airport, Hotel...
                            </span>
                          </div>
                          <div className="relative">
                            {/* Icon */}
                            <MapPinIcon
                                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none w-5 h-5 text-gray-500 z-1"
                            />

                            {/* Input */}
                            <input
                                type="text"
                                placeholder=" "
                                className="peer w-full pl-11 pr-10 pt-7 pb-3 text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none"
                            />

                            {/* Floating label */}
                            <label
                                className="pointer-events-none absolute left-11
                                        transition-all duration-200 text-gray-400
                                        top-3 text-sm
                                        peer-focus:top-2 peer-focus:text-xs
                                        peer-not-placeholder-shown:top-2
                                        peer-not-placeholder-shown:text-xs"
                            >
                                Drop-off Location
                            </label>

                            {/* Helper text */}
                            <span
                                className="pointer-events-none absolute left-11 top-8
                                        text-[13px] text-gray-500
                                        transition-opacity peer-focus:opacity-0 peer-not-placeholder-shown:opacity-0"
                            >
                                Address, Airport, Hotel...
                            </span>
                          </div>
                          <div className="relative">
                            <div className="grid md:grid-cols-2 gap-3">
                              <div className="relative">
                                <CalendarDaysIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />

                                <input
                                  type="date"
                                  placeholder=" "
                                  className="peer w-full pl-11 pr-3 pt-[30px] pb-[8px]
                                            text-sm border rounded-xl bg-gray-100 border-gray-200
                                            focus:outline-none"
                                />

                                {/* Floating label */}
                                <label
                                  className="pointer-events-none absolute left-11
                                            transition-all duration-200 text-gray-400
                                            top-3 text-sm
                                            peer-focus:top-3 peer-focus:text-xs
                                            peer-not-placeholder-shown:top-3
                                            peer-not-placeholder-shown:text-xs"
                                >
                                  Pickup Date
                                </label>
                              </div>
                              <div className="relative">
                                <ClockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />

                                <input
                                  type="time"
                                  placeholder=" "
                                  className="peer w-full pl-11 pr-3 pt-[30px] pb-[8px]
                                            text-sm border rounded-xl bg-gray-100 border-gray-200
                                            focus:outline-none"
                                />

                                {/* Floating label */}
                                <label
                                  className="pointer-events-none absolute left-11
                                            transition-all duration-200 text-gray-400
                                            top-3 text-sm
                                            peer-focus:top-3 peer-focus:text-xs
                                            peer-not-placeholder-shown:top-3
                                            peer-not-placeholder-shown:text-xs"
                                >
                                  Pickup Time
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                    )}
                    </div>

                    {/* Continue button */}
                    <div className="mt-6 flex justify-between">
                      <button
                        onClick={(e) => {e.preventDefault(); router.back(); }}
                        className="flex py-3 px-3 md:px-10 rounded-md font-medium text-white bg-gray-700 hover:opacity-80 cursor-pointer text-xs md:text-base w-auto transition"
                      >
                        <FaChevronLeft className="text-white text-sm mr-1 md:mt-1" />
                        Back
                      </button>
                      <button
                        onClick={handleContinue}
                        className="flex py-3 px-2 md:px-10 rounded-md font-medium text-white webBG hover:opacity-90 cursor-pointer text-xs md:text-base w-auto"
                      >
                        Continue to Payment
                        <FaChevronRight className="text-white text-sm ml-1 md:mt-1" />
                      </button>
                    </div>

                </div>
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
