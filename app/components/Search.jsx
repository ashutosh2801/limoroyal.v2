"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  MapPinIcon,
  CalendarDaysIcon,
  ClockIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { FaCarSide } from "react-icons/fa";
import { startSearch, saveSearch } from "@/store/searchSlice";

const convertTime = (value, type) => {
  if (!value || value < 0) return "0 mins";

  if (type === "H") {
    const hrs = value;
    return `${hrs} hr${hrs > 1 ? "s" : ""}`;
  }

  if (type === "M") {
    const hrs = Math.floor(value / 60);
    const mins = value % 60;

    if (hrs > 0 && mins > 0) return `${hrs} hr${hrs > 1 ? "s" : ""} ${mins} min`;
    if (hrs > 0) return `${hrs} hr${hrs > 1 ? "s" : ""}`;
    return `${mins} min`;
  }

  return "";
};

export default function Search() {

  const dispatch = useDispatch();
  const router = useRouter();
  const { data } = useSelector((state) => state.search);
  
  const [activeTab, setActiveTab] = useState("oneway");
  const [loading, setLoading] = useState(false);

  // ---------------- GOOGLE PLACES ----------------
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);
  const fromListRef = useRef(null);
  const toListRef = useRef(null);

  // Input values
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [timeInput, setTimeInput] = useState("");

  const directionsService = useRef(null);
  const autocompleteService = useRef(null);
  const placesService = useRef(null);

  // Selected places
  const [fromPlace, setFromPlace] = useState(null);
  const [toPlace, setToPlace] = useState(null);
  const [additionalStops, setAdditionalStops] = useState([]);
  const [duration, setDuration] = useState("");
  const [pickupDate, setPickupDate] = useState(new Date());
  const [pickupTime, setPickupTime] = useState(null);
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [passengers, setPassengers] = useState(1);
  const [luggage, setLuggage] = useState(0);
  const [googleReady, setGoogleReady] = useState(false);

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

  const getIcon = (types = []) => {
    if (types.includes("airport")) return "✈️";
    if (types.includes("lodging")) return "🏨";
    return "📍";
  };

  const fetchPredictions = (value, listRef, inputRef, setInput) => {
    if (!autocompleteService.current || value.length < 2) {
      listRef.current.style.display = "none";
      return;
    }

    autocompleteService.current.getPlacePredictions(
      {
        input: value,
        // types: ["establishment", ""],
        // componentRestrictions: { country: "ca" },
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

          div.innerHTML = `
            <div class="font-semibold">${p.structured_formatting.main_text}</div>
            <div class="text-xs text-gray-500">${p.description}</div>
          `;

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
        fields: ["name", "formatted_address", "geometry", "place_id"],
      },
      (place, status) => {
        if (status !== window.google.maps.places.PlacesServiceStatus.OK) return;

        const value = `${place.name}`;

        setInput(value);
        inputRef.current.value = value;

        listRef.current.innerHTML = "";
        listRef.current.style.display = "none";

        setPlace({
          name: place.name,
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          placeId: place.place_id,
        });
      }
    );
  };

  // ---------------- DISTANCE (MILES) ----------------
  const getRouteDetails = (from, to, pickupDateTime = null) => {
    return new Promise((resolve, reject) => {
      if (!directionsService.current) {
        reject("Directions service not ready");
        return;
      }

      directionsService.current.route(
        {
          origin: { lat: from.lat, lng: from.lng },
          destination: { lat: to.lat, lng: to.lng },
          travelMode: window.google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL,

          // THIS IS THE KEY PART
          drivingOptions: {
            departureTime: pickupDateTime || new Date(), // now OR selected pickup time
            trafficModel: window.google.maps.TrafficModel.BEST_GUESS,
          },

          // Optional but recommended
          provideRouteAlternatives: true,
        },
        (result, status) => {
          if (status !== "OK" || !result?.routes?.length) {
            reject("Route not found");
            return;
          }

          const route = result.routes[0];
          // const leg = route.legs[0];
          const bestRoute = result.routes.reduce((a, b) =>
            a.legs[0].distance.value < b.legs[0].distance.value ? a : b
          );

          const leg = bestRoute.legs[0];

          resolve({
            distanceMiles: Number((leg.distance.value / 1609.34).toFixed(2)),
            distanceKM: Number((leg.distance.value / 1000).toFixed(2)),

            // 👇 USE duration_in_traffic
            durationMinutes: Math.ceil(
              (leg.duration_in_traffic?.value || leg.duration.value) / 60
            ),

            routeDescription: route.summary || "Fastest available route",
            highlights: route.warnings || [],
          });
        }
      );
    });
  };

  // ---------------- Combine Date And Time ----------------
  const combineDateAndTime = (date, time) => {
    const d = new Date(date);
    const t = new Date(time);

    d.setHours(t.getHours());
    d.setMinutes(t.getMinutes());
    d.setSeconds(0);
    d.setMilliseconds(0);

    return d;
  };

  const time12HrOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  // ---------------- SEARCH One Way HANDLER ----------------
  const handleSearchOneWay = async() => {
    if (!googleReady) {
      alert("Map services are still loading. Please wait.");
      return;
    }

    if ((!fromPlace || !toPlace || !pickupDate || !pickupTime)) {
      alert("Please fill all fields");
      return;
    }

    dispatch(startSearch());

    try {

      setLoading(true);

      // Pickup DateTime
      const pickupDateTime = combineDateAndTime( pickupDate, pickupTime );

      // Get Route Details
      const routeDetails = await getRouteDetails(fromPlace, toPlace, pickupDateTime);

      // Estimated Arrival = pickup + duration
      const estimatedTime = new Date( pickupDateTime.getTime() + routeDetails.durationMinutes * 60 * 1000 );

      dispatch(
        saveSearch({
          tripType: activeTab,
          from: fromPlace,
          to: toPlace,
          pickupDate: pickupDate.toISOString(),
          pickupTime: pickupTime.toISOString(),
          pickupTimeLabel: pickupTime.toLocaleTimeString(
            "en-US",
            time12HrOptions
          ),

          estimatedTime: estimatedTime.toISOString(),
          estimatedTimeLabel: estimatedTime.toLocaleTimeString(
            "en-US",
            time12HrOptions
          ),

          // Route info
          distanceMiles: routeDetails.distanceMiles || 0,
          distanceKM: routeDetails.distanceKM || 0,
          durationMinutes: convertTime(routeDetails.durationMinutes, 'M'),
          routeDescription: routeDetails.routeDescription,
          highlights: routeDetails.highlights,
        })
      );

      router.push("/booking");
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert("Unable to calculate route. Please try again.");
    }
    finally {
      setLoading(false);
    }

  };

  // ---------------- SEARCH By The Hour HANDLER ----------------
  const handleSearchByTheHr = async() => {
    if (!googleReady) {
      alert("Map services are still loading. Please wait.");
      return;
    }

    if ((!fromPlace || !timeInput || !pickupDate || !pickupTime)) {
      alert("Please fill all fields");
      return;
    }

    dispatch(startSearch());

    try {

      setLoading(true);

      // Pickup DateTime
      const pickupDateTime = combineDateAndTime( pickupDate, pickupTime );

      // Estimated Arrival = pickup + duration
      const estimatedTime = new Date( pickupDateTime.getTime() + (parseFloat(timeInput) * 60) );

      dispatch(
        saveSearch({
          tripType: activeTab,
          from: fromPlace,
          duration: timeInput,
          durationMinutes: convertTime(timeInput, 'H'),
          pickupDate: pickupDate.toISOString(),
          pickupTime: pickupTime.toISOString(),
          pickupTimeLabel: pickupTime.toLocaleTimeString("en-US", time12HrOptions),
          estimatedTime: estimatedTime.toISOString(),
          estimatedTimeLabel: estimatedTime.toLocaleTimeString("en-US", time12HrOptions),
        })
      );

      router.push("/booking");
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert("Unable to calculate route. Please try again.");
    }
    finally {
      setLoading(false);
    }

  };

  const QuantitySelector = ({ label, value, setValue, min = 0 }) => (
    <div className="flex flex-col ">
      <span className="text-xs md:text-sm w-full mb-1">{label} :</span>
      <div className="flex items-center space-x-2 w-full border border-gray-200 rounded-lg">
        <button
          onClick={() => setValue(prev => Math.max(min, prev - 1))}
          className="w-12 h-8 text-xl flex items-center justify-center bg-gray-200 cursor-pointer"
        >
          -
        </button>
        <span className="w-full text-center">{value}</span>
        <button
          onClick={() => setValue(prev => prev + 1)}
          className="w-12 h-8 text-xl flex items-center justify-center bg-gray-200 cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );  

  // ---------------- UI STYLES ----------------
  const inputClass =
    "w-full pl-11 pr-10 py-4 text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none";

  const iconStyle =
    "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-1";

  // ---------------- RENDER ----------------
  return (
    <div className="w-full px-4 relative z-52 mt-5">
      <div className="bg-white w-full max-w-md shadow-xl relative md:absolute right-0 md:right-20 md:-top-130 mt-10 md:mt-0 rounded-md">

        {/* Tabs */}
        <div className="grid grid-cols-2 mt-1">
          {["oneway", "hourly"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-3 text-sm font-semibold ${
                activeTab === tab ? "bg-white" : "bg-gray-100"
              }`}
            >
              {tab === "oneway" ? "Point to Point" : "By The Hour"}
            </button>
          ))}
        </div>

        {/* ---------------- ONE WAY ---------------- */}
        {activeTab === "oneway" && (
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
                From
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
                className="absolute z-50 bg-white w-full border rounded-lg mt-1 hidden max-h-60 overflow-y-auto"
              />
            </div>

            {/* ADDITIONAL STOP */}
            {additionalStops.map((stop, index) => (
              <div key={index} className="relative">
                {/* Icon */}
                <FaCarSide
                  className={`${iconStyle} absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none`}
                />

                {/* Input */}
                <input
                  value={stop}
                  onChange={(e) => {
                    const newStops = [...additionalStops];
                    newStops[index] = e.target.value;
                    setAdditionalStops(newStops);
                  }}
                  placeholder=" "
                  className={`${inputClass} peer pl-10 pr-10 pt-6`}
                />

                {/* Floating label */}
                <label
                  className={`pointer-events-none absolute left-11
                    transition-all duration-200 text-gray-400
                    ${stop ? "top-2 text-xs" : "top-3 text-sm peer-focus:top-2 peer-focus:text-xs"}`}
                >
                  Stop {index + 1}
                </label>

                {/* Helper text */}
                {!stop && (
                  <span
                    className="pointer-events-none absolute left-11 top-8
                      text-[13px] text-gray-500 transition-opacity
                      peer-focus:opacity-0"
                  >
                    Address, Airport, Hotel...
                  </span>
                )}

                {/* ❌ Remove Stop Icon */}
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
                To
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
                className="absolute z-50 bg-white w-full border rounded-lg mt-1 hidden max-h-60 overflow-y-auto"
              />
            </div>

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

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <button
                    onClick={() => setIsRoundTrip(!isRoundTrip)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out cursor-pointer ${
                      isRoundTrip ? "webBG justify-end" : "bg-gray-300 justify-start"
                    }`}
                  >
                    <span className="w-4 h-4 bg-white rounded-full shadow-md"></span>
                  </button>
                  <span className="text-xs md:text-sm w-full ml-2">Round Trip</span>
                </div>
                <div className="flex justify-end">
                    <button
                      onClick={() => setAdditionalStops([...additionalStops, ""])}
                      className="text-xs px-2 md:px-4 py-2 rounded-full bg-gray-400 text-white cursor-pointer"
                    >
                      + Additional Stops
                    </button>
                </div>
              </div>
            </div>

            {/* <div className="relative">
              <div className="grid grid-cols-2 gap-8">
              <QuantitySelector label="Passengers" value={passengers} setValue={setPassengers} min={1} />
              <QuantitySelector label="Luggage" value={luggage} setValue={setLuggage} />
              </div>
            </div> */}

            <button
              onClick={handleSearchOneWay}
              className="w-full py-3 rounded-xl search-btn cursor-pointer text-base transition"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        )}

        {/* ----------------------------- BY THE HOUR TAB ------------------------------ */}
        {activeTab === "hourly" && (
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
                From
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
                className="absolute z-50 bg-white w-full border rounded-lg mt-1 hidden max-h-60 overflow-y-auto"
              />
            </div>

            {/* ADDITIONAL STOP */}
            {additionalStops.map((stop, index) => (
              <div key={index} className="relative">
                {/* Icon */}
                <FaCarSide
                  className={`${iconStyle} absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none`}
                />

                {/* Input */}
                <input
                  value={stop}
                  onChange={(e) => {
                    const newStops = [...additionalStops];
                    newStops[index] = e.target.value;
                    setAdditionalStops(newStops);
                  }}
                  placeholder=" "
                  className={`${inputClass} peer pl-10 pr-10 pt-6`}
                />

                {/* Floating label */}
                <label
                  className={`pointer-events-none absolute left-11
                    transition-all duration-200 text-gray-400
                    ${stop ? "top-2 text-xs" : "top-3 text-sm peer-focus:top-2 peer-focus:text-xs"}`}
                >
                  Stop {index + 1}
                </label>

                {/* Helper text */}
                {!stop && (
                  <span
                    className="pointer-events-none absolute left-11 top-8
                      text-[13px] text-gray-500 transition-opacity
                      peer-focus:opacity-0"
                  >
                    Address, Airport, Hotel...
                  </span>
                )}

                {/* ❌ Remove Stop Icon */}
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
              </div>
            ))}

            {/* TO */}
            <div className="relative">
              {/* Icon */}
              <AdjustmentsHorizontalIcon
                className={`${iconStyle} absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none`}
              />

              {/* Input */}
              {/* <input
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
              /> */}
              <select
                value={timeInput}
                className={`${inputClass} peer pl-10 pt-6`}
                onChange={(e) => {
                  setTimeInput(e.target.value);
                }}
              >
                <option value=""></option>
                {Array.from({ length: 10 }, (_, i) => {
                  const value = i + 3;
                  const time = `${value}:00 hrs`;
                  return (
                    <option key={value} value={value}>
                      {time}
                    </option>
                  );
                })}
              </select>

              {/* Floating label */}
              <label
                className={`pointer-events-none absolute left-11
                  transition-all duration-200 text-gray-400
                  ${
                    timeInput
                      ? "top-2 text-xs"
                      : "top-3 text-sm peer-focus:top-2 peer-focus:text-xs"
                  }`}
              >
                Duration (Hours)
              </label>

              {/* Helper text */}
              {!timeInput && (
                <span
                  className="pointer-events-none absolute left-11 top-8
                    text-[13px] text-gray-500 transition-opacity
                    peer-focus:opacity-0"
                >
                  02:00 Hrs
                </span>
              )}

              {/* Clear button */}
              {timeInput && (
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
                className="absolute z-50 bg-white w-full border rounded-lg mt-1 hidden max-h-60 overflow-y-auto"
              />
            </div>

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
                Pickup Date
              </label>
            </div>

            <div className="relative">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center">
                  <button
                    onClick={() => setIsRoundTrip(!isRoundTrip)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out cursor-pointer ${
                      isRoundTrip ? "webBG justify-end" : "bg-gray-300 justify-start"
                    }`}
                  >
                    <span className="w-4 h-4 bg-white rounded-full shadow-md"></span>
                  </button>
                  <span className="text-xs md:text-sm w-full ml-2">Round Trip</span>
                </div>
                <div className="flex justify-end">
                    <button
                      onClick={() => setAdditionalStops([...additionalStops, ""])}
                      className="text-xs px-2 md:px-4 py-2 rounded-full bg-gray-400 text-white cursor-pointer"
                    >
                      + Additional Stops
                    </button>
                </div>
              </div>
            </div>

            {/* <div className="relative">
              <div className="grid grid-cols-2 gap-8">
              <QuantitySelector label="Passengers" value={passengers} setValue={setPassengers} min={1} />
              <QuantitySelector label="Luggage" value={luggage} setValue={setLuggage} />
              </div>
            </div> */}

            {/* Search Button */}
            <div>
              <button
                onClick={handleSearchByTheHr}
                className="w-full py-3 rounded-xl text-base search-btn transition cursor-pointer">
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* <script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        async
        defer
      /> */}
    </div>
  );
}