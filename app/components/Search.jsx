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

export default function Search() {

  const dispatch = useDispatch();
  const router = useRouter();
  const { data } = useSelector((state) => state.search);
  
  const [activeTab, setActiveTab] = useState("oneway");

  // ---------------- GOOGLE PLACES ----------------
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);
  const fromListRef = useRef(null);
  const toListRef = useRef(null);

  // Input values
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");

  const directionsService = useRef(null);
  const autocompleteService = useRef(null);
  const placesService = useRef(null);

  // Selected places
  const [fromPlace, setFromPlace] = useState(null);
  const [toPlace, setToPlace] = useState(null);

  const [pickupDate, setPickupDate] = useState(null);
  const [pickupTime, setPickupTime] = useState(null);

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
        types: ["establishment"],
        componentRestrictions: { country: "ca" },
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

        const value = `${place.name}, ${place.formatted_address || ""}`;

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


  // ---------------- SEARCH HANDLER ----------------
  const handleSearch = async() => {
    if (!googleReady) {
      alert("Map services are still loading. Please wait.");
      return;
    }

    if (!fromPlace || !toPlace || !pickupDate || !pickupTime) {
      alert("Please fill all fields");
      return;
    }

    dispatch(startSearch());

    try {

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
          distanceMiles: routeDetails.distanceMiles,
          distanceKM: routeDetails.distanceKM,
          durationMinutes: routeDetails.durationMinutes,
          routeDescription: routeDetails.routeDescription,
          highlights: routeDetails.highlights,
        })
      );

      router.push("/booking");
    } catch (err) {
      console.error(err);
      alert("Unable to calculate route. Please try again.");
    }

  };

  // ---------------- UI STYLES ----------------
  const inputClass =
    "w-full pl-11 pr-10 py-5 text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none";

  const iconStyle =
    "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500";

  // ---------------- RENDER ----------------
  return (
    <div className="w-full px-4 relative z-20 mt-5">
      <div className="bg-white w-full max-w-md shadow-xl relative md:absolute right-0 md:right-20 bottom-0 md:bottom-18 mt-10 md:mt-0 rounded-md">

        {/* Tabs */}
        <div className="grid grid-cols-2 mt-1">
          {["oneway", "hourly"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-semibold ${
                activeTab === tab ? "bg-white" : "bg-gray-100"
              }`}
            >
              {tab === "oneway" ? "One Way" : "By The Hour"}
            </button>
          ))}
        </div>

        {/* ---------------- ONE WAY ---------------- */}
        {activeTab === "oneway" && (
          <div className="grid gap-4 p-6">

            {/* FROM */}
            <div className="relative">
              <MapPinIcon className={iconStyle} />
              <input
                ref={fromInputRef}
                value={fromInput}
                placeholder="From"
                className={inputClass}
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


            {/* TO */}
            <div className="relative">
              <MapPinIcon className={iconStyle} />
              <input
                ref={toInputRef}
                value={toInput}
                placeholder="To"
                className={inputClass}
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

              {toInput && (
                <XMarkIcon
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer"
                  onClick={() => {
                    setToInput("");
                    setToPlace(null);
                    toListRef.current.style.display = "none";
                  }}
                />
              )}

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
                className={inputClass}
                wrapperClassName="w-full"
              />
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
                placeholderText="Pickup time"
                className={inputClass}
                wrapperClassName="w-full"
              />
            </div>

            <button
              onClick={handleSearch}
              className="w-full py-3 rounded-xl search-btn cursor-pointer text-base transition"
            >
              Search
            </button>
          </div>
        )}

        {/* ----------------------------- BY THE HOUR TAB ------------------------------ */}
        {activeTab === "hourly" && (
          <div className="grid grid-cols-1 gap-4 p-6">

            {/* From */}
            <div className="relative">
              <FaCarSide className={iconStyle} />
              <input type="text" placeholder="From" className={inputClass} />
            </div>

            {/* Duration */}
            <div className="relative">
              <AdjustmentsHorizontalIcon className={iconStyle} />
              <input
                type="number"
                placeholder="Duration (Hours)"
                className={inputClass}
              />
            </div>

            {/* Date */}
            <div className="relative">
              <CalendarDaysIcon className={iconStyle} />
              <input type="date" className={inputClass} />
            </div>

            {/* Time */}
            <div className="relative">
              <ClockIcon className={iconStyle} />
              <input type="time" className={inputClass} />
            </div>

            {/* Search Button */}
            <div>
              <button
              
              onClick={() => router.push("/booking")} className="w-full py-3 rounded-xl text-base search-btn transition cursor-pointer">
                Search
              </button>
            </div>
          </div>
        )}
      </div>

      <script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        async
        defer
      />
    </div>
  );
}