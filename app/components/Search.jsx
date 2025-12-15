"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Heroicons
import {
  MapPinIcon,
  ArrowsRightLeftIcon,
  CalendarDaysIcon,
  ClockIcon,
  AdjustmentsHorizontalIcon,
  ArrowTrendingUpIcon
} from "@heroicons/react/24/solid";
import { FaCarSide } from "react-icons/fa";

export default function Search() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("oneway");

  const inputClass =
    "w-full pl-11 pr-3 py-3 text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none";

  const iconStyle =
    "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500";

  return (
    <div className="w-full px-4 relative z-20">
      <div className="bg-white w-full max-w-md shadow-xl relative md:absolute right-0 md:right-20 bottom-0 md:bottom-18 mt-10 md:mt-0 rounded-md">

        {/* Tabs */}
        <div className="grid grid-cols-2 mt-1">
          <button
            onClick={() => setActiveTab("oneway")}
            className={`px-6 py-3 text-sm font-semibold bg-gray-100 cursor-pointer ${
              activeTab === "oneway"
                ? "border-b-2 border-gray-100 text-black bg-white"
                : "text-black"
            }`}
          >
            One Way
          </button>

          <button
            onClick={() => setActiveTab("hourly")}
            className={`px-6 py-3 text-sm font-semibold bg-gray-100 cursor-pointer ${
              activeTab === "hourly"
                ? "border-b-2 border-gray-100 text-black bg-white"
                : "text-black"
            }`}
          >
            By The Hour
          </button>
        </div>

        {/* ----------------------------- ONE WAY TAB ----------------------------- */}
        {activeTab === "oneway" && (
          <div className="grid grid-cols-1 gap-4 p-6">

            {/* From */}
            <div className="relative">
              <FaCarSide className={iconStyle} />
              <input type="text" placeholder="From" className={inputClass} />
            </div>

            {/* To */}
            <div className="relative">
              <MapPinIcon className={iconStyle} />
              <input type="text" placeholder="To" className={inputClass} />
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
              <button onClick={() => router.push("/booking")} className="w-full py-3 rounded-xl text-base search-btn transition cursor-pointer">
                Search
              </button>
            </div>
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
              <button onClick={() => router.push("/booking")} className="w-full py-3 rounded-xl text-base search-btn transition cursor-pointer">
                Search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
