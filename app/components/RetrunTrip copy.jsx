"use client";

import {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
  useState,
} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  MapPinIcon,
  CalendarDaysIcon,
  ClockIcon,
  XMarkIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { FaCarSide, FaPlane } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  extractAirportData,
  convertTime,
  canAddAnotherStop,
} from "@/app/lib/functions";
import { showAlert } from "@/app/lib/alert";

const ReturnTrip = forwardRef((props, ref) => {
  const { data } = useSelector((state) => state.search);

  const [formData, setFormData] = useState(null);

  // ---------------- GOOGLE SERVICES ----------------
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);
  const fromListRef = useRef(null);
  const toListRef = useRef(null);
  const stopInputRefs = useRef([]);
  const stopListRefs = useRef([]);

  const directionsService = useRef(null);
  const autocompleteService = useRef(null);
  const placesService = useRef(null);

  const [googleReady, setGoogleReady] = useState(false);

  // ---------------- INPUT STATES ----------------
  const [fromInput, setFromInput] = useState(
    data?.returnData?.to?.address || data?.to?.address || ""
  );
  const [toInput, setToInput] = useState(
    data?.returnData?.from?.address || data?.from?.address || ""
  );

  const [fromPlace, setFromPlace] = useState(
    data?.returnData?.to || data?.to || null
  );
  const [toPlace, setToPlace] = useState(
    data?.returnData?.from || data?.from || null
  );

  const [fromFlightNumber, setFromFlightNumber] = useState("");
  const [toFlightNumber, setToFlightNumber] = useState("");
  const [flightCat, setFlightCat] = useState("");

  const [pickupDate, setPickupDate] = useState(null);
  const [pickupTime, setPickupTime] = useState(null);

  // ---------------- STOPS (CONSISTENT STRUCTURE) ----------------
  const [additionalStops, setAdditionalStops] = useState(
    Array.isArray(data?.returnData?.additionalStops)
      ? data.returnData.additionalStops.map((s) => ({
          input: s.address || "",
          name: s.name || "",
          address: s.address || null,
          lat: s.lat || null,
          lng: s.lng || null,
          waitingTime: s.waitingTime || "",
          notes: s.notes || "",
        }))
      : []
  );

  // ---------------- LOAD GOOGLE ----------------
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google?.maps?.places && window.google?.maps?.DirectionsService) {
        autocompleteService.current =
          new window.google.maps.places.AutocompleteService();
        placesService.current = new window.google.maps.places.PlacesService(
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

  // ---------------- AUTOCOMPLETE ----------------
  const fetchPredictions = (value, listRef, inputRef, setInput, stopIndex = null) => {
    const listEl = listRef?.current || listRef;
    if (!autocompleteService.current || value.length < 2) {
      if (listEl) listEl.style.display = "none";
      return;
    }

    autocompleteService.current.getPlacePredictions(
      {
        input: value,
        componentRestrictions: { country: ["ca", "us"] },
      },
      (predictions, status) => {
        if (
          status !== window.google.maps.places.PlacesServiceStatus.OK ||
          !predictions
        ) {
          if (listEl) listEl.style.display = "none";
          return;
        }

        listEl.innerHTML = "";
        listEl.style.display = "block";

        predictions.forEach((p) => {
          const div = document.createElement("div");
          div.className = "p-3 cursor-pointer hover:bg-gray-100";
          div.innerHTML = `
            <div class="font-semibold">${p.structured_formatting.main_text}</div>
            <div class="text-xs text-gray-500">${p.description}</div>
          `;

          div.onclick = () =>
            selectPlace(
              p.place_id,
              inputRef,
              listEl,
              setInput,
              stopIndex
            );

          listEl.appendChild(div);
        });
      }
    );
  };

  const selectPlace = (placeId, inputRef, listEl, setInput, stopIndex = null) => {
    placesService.current.getDetails(
      {
        placeId,
        fields: [
          "name",
          "formatted_address",
          "geometry",
          "place_id",
          "types",
          "address_components",
        ],
      },
      (place, status) => {
        if (status !== window.google.maps.places.PlacesServiceStatus.OK) return;

        const airportData = extractAirportData(place);

        if (stopIndex !== null) {
          const updated = [...additionalStops];
          updated[stopIndex] = {
            ...updated[stopIndex],
            input: place.formatted_address,
            name: place.name,
            address: place.formatted_address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
          setAdditionalStops(updated);
          listEl.style.display = "none";
          return;
        }

        setInput(place.formatted_address);
        inputRef.current.value = place.name;
        listEl.style.display = "none";

        const setPlace =
          setInput === setFromInput ? setFromPlace : setToPlace;

        setPlace({
          name: place.name,
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          placeId: place.place_id,
          isAirport: airportData?.isAirport || false,
          terminal: airportData?.terminal || null,
        });
      }
    );
  };

  // ---------------- ROUTE CALCULATION (STOPS SAFE) ----------------
  const getRouteDetails = (from, to, stops, pickupDateTime) =>
    new Promise((resolve, reject) => {
      directionsService.current.route(
        {
          origin: { lat: from.lat, lng: from.lng },
          destination: { lat: to.lat, lng: to.lng },
          waypoints: stops.map((s) => ({
            location: { lat: s.lat, lng: s.lng },
            stopover: true,
          })),
          travelMode: window.google.maps.TravelMode.DRIVING,
          drivingOptions: {
            departureTime: pickupDateTime || new Date(),
            trafficModel: window.google.maps.TrafficModel.BEST_GUESS,
          },
          provideRouteAlternatives: true,
        },
        (result, status) => {
          if (status !== "OK") return reject("Route not found");

          const bestRoute = result.routes.reduce((a, b) => {
            const da = a.legs.reduce((s, l) => s + l.distance.value, 0);
            const db = b.legs.reduce((s, l) => s + l.distance.value, 0);
            return da < db ? a : b;
          });

          let dist = 0;
          let dur = 0;

          bestRoute.legs.forEach((l) => {
            dist += l.distance.value;
            dur += l.duration_in_traffic?.value || l.duration.value;
          });

          resolve({
            distanceMiles: Number((dist / 1609.34).toFixed(2)),
            distanceKM: Number((dist / 1000).toFixed(2)),
            durationMinutes: Math.ceil(dur / 60),
            routeDescription: bestRoute.summary,
            highlights: bestRoute.warnings || [],
          });
        }
      );
    });

  // ---------------- VALIDATION ----------------
  const validate = async () => {
    if (!googleReady) {
      showAlert({ text: "Map services are still loading." });
      return null;
    }
    if ((!fromPlace)) {
      showAlert({text: "Please select return pickup address from dropdown list!"});
      return;
    }
    if (fromPlace?.isAirport && !fromFlightNumber) {
      showAlert({text: "Flight number is required for airport pickup!"});
      return;
    }
    if ((!toPlace)) {
      showAlert({text: "Please select return drop-off address from dropdown list!"});
      return;
    }
    if (toPlace?.isAirport && !toFlightNumber) {
      showAlert({text: "Flight number is required for airport drop-off."});
      return;
    }
    if ((!pickupDate)) {
      showAlert({text: "Please select return pickup date!"});
      return;
    }
    if ((!pickupTime)) {
      showAlert({text: "Please select return pickup time!"});
      return;
    }

    const pickupDateTime = new Date(pickupDate);
    pickupDateTime.setHours(pickupTime.getHours(), pickupTime.getMinutes());

    const route = await getRouteDetails(
      fromPlace,
      toPlace,
      additionalStops.filter((s) => s.address),
      pickupDateTime
    );

    // Estimated Arrival = pickup + duration
    const estimatedTime = new Date( pickupDateTime.getTime() + route.durationMinutes * 60 * 1000 );

    const finalData = {
      from: fromPlace,
      to: toPlace,
      additionalStops,
      pickupDate,
      pickupTime,
      pickupDateTime: pickupDateTime.toISOString(),
      estimatedTime,
      ...route,
    };

    const PRICING = {
      baseFare: 25,            // Base booking charge
      perKmRate: 2.5,          // Price per KM
      perMileRate: 4,          // (optional if using miles)
      stopFee: 15,             // Per additional stop charge
      waitingPerMinute: 1.2,   // Waiting time charge per minute
      minimumFare: 40,         // Minimum ride price
    };

    setFormData(finalData);
    return finalData;
  };

  useImperativeHandle(ref, () => ({
    validateForm: validate,
    getFormData: () => formData,
  }));

  // ---------------- UI STYLES ----------------
  const inputClass =
    "w-full pl-11 pr-10 py-4 text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none";

  const iconStyle =
    "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-1";

  // ---------------- RENDER ----------------
  return (
    <div className="w-full relative z-52 mt-5 border border-gray-300 rounded-xl bg-white shadow-lg">

        <div className="grid gap-3 px-4 py-3">

        {/* FROM */}
        <div className="relative">
            {/* Icon */}
            <FaCarSide
            className={`${iconStyle} absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none`}
            />

            {/* Input */}
            <input
            ref={fromInputRef}
            value={fromInput}
            placeholder=" "
            className={`${inputClass} peer pl-10 pt-6`}
            onChange={(e) => {
                setFromInput(e.target.value);
                setFromPlace(null);
                fetchPredictions(
                e.target.value,
                fromListRef,
                fromInputRef,
                setFromInput
                );
            }}

            onFocus={(e) => {
                setFromInput(e.target.value);
                setFromPlace(null);
                fetchPredictions(
                e.target.value,
                fromListRef,
                fromInputRef,
                setFromInput
                );
            }}
            />

            {/* Floating label */}
            <label
            className={`pointer-events-none absolute left-11
                transition-all duration-200 text-gray-400
                ${
                fromInput
                    ? "top-2 text-xs"
                    : "top-3 text-sm peer-focus:top-2 peer-focus:text-xs"
                }`}
            >
            Pickup Location
            </label>

            {/* Helper text */}
            {!fromInput && (
            <span
                className="pointer-events-none absolute left-11 top-8
                text-[13px] text-gray-500 transition-opacity
                peer-focus:opacity-0"
            >
                Address, Airport, Hotel...
            </span>
            )}

            {fromInput && (
            <XMarkIcon
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer"
                onClick={() => {
                setFromInput("");
                setFromPlace(null);
                fromListRef.current.style.display = "none";
                }}
            />
            )}

            <div
            ref={fromListRef}
            className="absolute z-50 bg-white w-full border rounded-lg mt-1 hidden max-h-100 overflow-y-auto"
            />
        </div>


        {/* Flight Number */}
        {fromPlace?.isAirport && (
        <div className="grid md:grid-cols-2 gap-3">
            <div className="relative">
            {/* Icon */}
            <FaPlane
                className={`${iconStyle} absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none`}
            />

            {/* Input */}
            <input
                id="fromFlightNumber"
                value={fromFlightNumber.toUpperCase()}
                type="text"
                placeholder=" "
                maxLength={6}
                className={`${inputClass} peer pl-10 pt-6`}
                onChange={(e) => setFromFlightNumber(e.target.value.toUpperCase())}
            />                

            {/* Floating label */}
            <label
                className={`pointer-events-none absolute left-11
                transition-all duration-200 text-gray-400
                ${
                    fromFlightNumber
                    ? "top-2 text-xs"
                    : "top-3 text-sm peer-focus:top-2 peer-focus:text-xs"
                }`}
            >
                Flight Number
            </label>

            {/* Helper text */}
            {!fromFlightNumber && (
                <span
                className="pointer-events-none absolute left-11 top-8
                    text-[13px] text-gray-500 transition-opacity
                    peer-focus:opacity-0"
                >
                EK202, UL225..
                </span>
            )}

            {/* Clear button */}
            {fromFlightNumber && (
                <XMarkIcon
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer"
                onClick={() => setFromFlightNumber("")}
                />
            )}
            </div>
            <div className="relative">
            {/* Icon */}
            <FaPlane
                className={`${iconStyle} absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none`}
            />

            {/* Select */}
            <select
              value={flightCat}
              className={`${inputClass} peer pl-10 pt-8 pb-2 appearance-none`}
              onChange={(e) => setFlightCat(e.target.value)}
            >
                <option value="">Select</option>
                <option value="Meet & Greet">Meet & Greet</option>
                <option value="Curbside">Curbside</option>
            </select>

            {/* Dropdown arrow */}
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                ▼
            </span>

            {/* Floating label */}
            <label
                className={`pointer-events-none absolute left-11 transition-all duration-200 text-gray-400
                ${
                    fromFlightNumber
                    ? "top-2 text-xs"
                    : "top-3 text-sm peer-focus:top-2 peer-focus:text-xs"
                }`}
            >
                Select
            </label>
            </div>
        </div>
        )}


        {/* ADDITIONAL STOP */}
        {additionalStops.map((stop, index) => (
            <div key={index} className="p-2 bg-gray-100 border border-gray-200 rounded-lg">
            <div className="relative mb-3">
                {/* Icon */}
                <FaCarSide
                className={`${iconStyle} absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none`}
                />

                {/* Input */}
                <input
                ref={(el) => (stopInputRefs.current[index] = el)}
                value={stop.input}               
                placeholder=" "
                className={`${inputClass} !bg-gray-50 peer pl-10 pr-10 pt-6`}

                onChange={(e) => {
                    const updated = [...additionalStops];
                    updated[index].input = e.target.value;
                    updated[index].place = null;
                    setAdditionalStops(updated);

                    const listEl = stopListRefs.current[index];
                    const inputEl = stopInputRefs.current[index];

                    if (listEl && inputEl) {
                    fetchPredictions(
                        e.target.value,
                        listEl,
                        inputEl,
                        null,
                        index
                    );
                    }
                }}
                onFocus={(e) => {
                    if (e.target.value.length >= 2) {
                    const listEl = stopListRefs.current[index];
                    const inputEl = stopInputRefs.current[index];
                    if (listEl && inputEl) {
                        fetchPredictions(
                        e.target.value,
                        listEl,
                        inputEl,
                        null,
                        index
                        );
                    }
                    }
                }}
                />

                {/* Floating label */}
                <label
                className={`pointer-events-none absolute left-11
                    transition-all duration-200 text-gray-400
                    ${stop.input ? "top-2 text-xs" : "top-3 text-sm peer-focus:top-2 peer-focus:text-xs"}`}
                >
                Stop {index + 1}
                </label>

                {/* Helper text */}
                {!stop.input && (
                <span
                    className="pointer-events-none absolute left-11 top-8
                    text-[13px] text-gray-500 transition-opacity
                    peer-focus:opacity-0"
                >
                    Address, Airport, Hotel...
                </span>
                )}

                {/*  Remove Stop Icon */}
                <XMarkIcon
                className="absolute right-3 top-1/2 -translate-y-1/2
                    w-4 h-4 cursor-pointer text-gray-400 hover:text-red-500"
                onClick={(e) => {
                    e.stopPropagation(); // 🔥 IMPORTANT
                    setAdditionalStops((prev) =>
                    prev.filter((_, i) => i !== index)
                    );
                }}
                />

                <div
                ref={(el) => (stopListRefs.current[index] = el)}
                className="absolute z-50 bg-white w-full border rounded-lg mt-1 hidden max-h-100 overflow-y-auto"
                />
            </div>
            
            <div className="grid md:grid-cols-2 gap-3">
                <div className="relative">
                <ClockIcon className={iconStyle} />
                <input
                    value={stop.waitingTime}   
                    placeholder=" "
                    className={`${inputClass} !bg-gray-50 peer pl-10 pt-6`}
                    onChange={(e) => {
                    const updated = [...additionalStops];
                    updated[index].waitingTime = e.target.value;
                    setAdditionalStops(updated);
                    }}
                />
                
                {/* Floating label */}
                <label
                    className={`pointer-events-none absolute left-11
                    transition-all duration-200 text-gray-400
                    ${
                        stop.waitingTime
                        ? "top-3 text-xs"
                        : "top-3 text-xs peer-focus:top-3 peer-focus:text-xs"
                    }`}
                >
                    Wait Time (In minutes)
                </label>

                {/* Helper text */}
                {!stop.waitingTime && (
                    <span
                    className="pointer-events-none absolute left-11 top-8
                        text-[13px] text-gray-500 transition-opacity
                        peer-focus:opacity-0"
                    >
                    30
                    </span>
                )}
                </div>

                <div className="relative">
                <PencilIcon className={iconStyle} />
                <input
                    value={stop.notes}  
                    placeholder=" "
                    className={`${inputClass} !bg-gray-50 peer pl-10 pt-6`}
                    onChange={(e) => {
                    const updated = [...additionalStops];
                    updated[index].notes = e.target.value;
                    setAdditionalStops(updated);
                    }}
                /> 

                {/* Floating label */}
                <label
                    className={`pointer-events-none absolute left-11
                    transition-all duration-200 text-gray-400
                    ${
                        stop.notes
                        ? "top-3 text-xs"
                        : "top-3 text-xs peer-focus:top-3 peer-focus:text-xs"
                    }`}
                >
                    Notes
                </label>

                {/* Helper text */}
                {!stop.notes && (
                    <span
                    className="pointer-events-none absolute left-11 top-8
                        text-[13px] text-gray-500 transition-opacity
                        peer-focus:opacity-0"
                    >
                    Short description...
                    </span>
                )}
                </div>
            </div>
            </div>
        ))}

        {/* TO */}
        <div className="relative">
            {/* Icon */}
            <MapPinIcon
            className={`${iconStyle} absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none`}
            />

            {/* Input */}
            <input
            ref={toInputRef}
            value={toInput}
            placeholder=" "
            className={`${inputClass} peer pl-10 pt-6`}
            onChange={(e) => {
              setToInput(e.target.value);
              setToPlace(null);
              fetchPredictions(
                e.target.value,
                toListRef,
                toInputRef,
                setToInput
              );
            }}

            onFocus={(e) => {
              setToInput(e.target.value);
              setToPlace(null);
              fetchPredictions(
                e.target.value,
                toListRef,
                toInputRef,
                setToInput
              );
            }}
            />

            {/* Floating label */}
            <label
            className={`pointer-events-none absolute left-11
                transition-all duration-200 text-gray-400
                ${
                toInput
                    ? "top-2 text-xs"
                    : "top-3 text-sm peer-focus:top-2 peer-focus:text-xs"
                }`}
            >
            Drop-off Location
            </label>

            {/* Helper text */}
            {!toInput && (
            <span
                className="pointer-events-none absolute left-11 top-8
                text-[13px] text-gray-500 transition-opacity
                peer-focus:opacity-0"
            >
                Address, Airport, Hotel...
            </span>
            )}

            {/* Clear button */}
            {toInput && (
            <XMarkIcon
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4
              cursor-pointer text-gray-400 hover:text-gray-600"
              onClick={() => {
                setToInput("");
                setToPlace(null);
                if (toListRef.current) {
                    toListRef.current.style.display = "none";
                }
              }}
            />
            )}

            {/* Predictions dropdown */}
            <div
            ref={toListRef}
            className="absolute z-50 bg-white w-full border rounded-lg mt-1 hidden max-h-100 overflow-y-auto"
            />
        </div>

        {/* To Flight Number */}
        {toPlace?.isAirport && (
        <div className="grid md:grid-cols-1 gap-3">
            <div className="relative">
            {/* Icon */}
            <FaPlane
                className={`${iconStyle} absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none`}
            />

            {/* Input */}
            <input
                id="toFlightNumber"
                value={toFlightNumber}
                placeholder=" "
                className={`${inputClass} peer pl-10 pt-6`}
                onChange={(e) => setToFlightNumber(e.target.value.toUpperCase())}
                maxLength={6}
            />                

            {/* Floating label */}
            <label
                className={`pointer-events-none absolute left-11
                transition-all duration-200 text-gray-400
                ${
                    toFlightNumber
                    ? "top-2 text-xs"
                    : "top-3 text-sm peer-focus:top-2 peer-focus:text-xs"
                }`}
            >
                Flight Number
            </label>

            {/* Helper text */}
            {!toFlightNumber && (
                <span
                className="pointer-events-none absolute left-11 top-8
                    text-[13px] text-gray-500 transition-opacity
                    peer-focus:opacity-0"
                >
                EK202, UL225..
                </span>
            )}

            {/* Clear button */}
            {toFlightNumber && (
                <XMarkIcon
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer"
                onClick={() => setToFlightNumber("")}
                />
            )}
            </div>
            
        </div>
        )}

        <div className="grid grid-cols-2 gap-3">
            <div className="relative">
            <CalendarDaysIcon className={iconStyle} />
            <DatePicker
                selected={pickupDate}
                onChange={setPickupDate}
                dateFormat="dd MMM yyyy"
                minDate={new Date()}
                placeholderText="Pickup date"
                className={`${inputClass} pt-[30px] pb-[8px]`}
                wrapperClassName="w-full"

                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                calendarClassName="large-datepicker"
            />
            
            {/* Floating label */}
            <label
                className={`pointer-events-none absolute left-11
                transition-all duration-200 text-gray-400
                ${
                    toInput
                    ? "top-3 text-xs"
                    : "top-3 text-xs peer-focus:top-3 peer-focus:text-xs"
                }`}
            >
                Pickup Date
            </label>
            </div>

            <div className="relative">
            <ClockIcon className={iconStyle} />
            <DatePicker
                selected={pickupTime}
                onChange={setPickupTime}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={5}
                dateFormat="hh:mm aa"
                placeholderText="12:00 pm"
                className={`${inputClass} pt-[30px] pb-[8px]`}
                wrapperClassName="w-full"
                calendarClassName="large-timepicker"
            />
            {/* Floating label */}
            <label
                className={`pointer-events-none absolute left-11
                transition-all duration-200 text-gray-400
                ${
                    toInput
                    ? "top-3 text-xs"
                    : "top-3 text-xs peer-focus:top-3 peer-focus:text-xs"
                }`}
            >
                Pickup Time
            </label>
            </div>
        </div>

        <div className="relative">
            <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-end">
                    <button
                        onClick={() => {
                        if (!canAddAnotherStop(additionalStops)) { 
                            if(additionalStops.length >= 3) {
                            showAlert({
                                text: "Maximum of 3 additional stops allowed.",
                                icon: "warning",
                            });
                            }
                            else {
                            showAlert({
                                text: "Please enter a additional stop.",
                                icon: "warning",
                            });
                            }
                            return;
                        }

                        setAdditionalStops([
                            ...additionalStops,
                            { input: "", place: null, waitingTime: "", notes: "" },
                        ]);
                        }}
                        disabled={!canAddAnotherStop(additionalStops)}
                        className={`text-xs px-2 md:px-4 py-2 rounded-full text-white
                        ${
                        canAddAnotherStop(additionalStops)
                            ? "bg-gray-600"
                            : "bg-gray-400 cursor-not-allowed"
                        } cursor-pointer`}
                    >
                        + Additional Stops
                    </button>
                </div>
            </div>
        </div>          

        
        </div>    

      
    </div>
  );
});

export default ReturnTrip;