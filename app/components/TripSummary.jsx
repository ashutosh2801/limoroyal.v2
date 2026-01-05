"use client";

import { CalendarDaysIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/solid";

function TripSummary({ trip }) {
  return (
    <div className="mt-6 bg-gray-100 rounded-xl p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
                <div className="text-xs md:text-sm font-semibold">{trip.date} at {trip.pickupTimeLabel}</div>
                <div className="text-[12px] md:text-xs text-gray-600 mt-1">
                    <MapPinIcon className="inline w-4 h-4 mr-1 -mt-0.5 text-gray-500" />
                    <span>{trip.from} {trip.to ? '→' : '' } {trip.to}</span>
                </div>
                {trip.tripType == 'oneway' && (
                <div className="text-[12px] md:text-xs text-gray-600 mt-2">
                    <ClockIcon className="inline w-4 h-4 mr-1 -mt-0.5 text-gray-500" /> 
                    Estimated arrival at {trip.estimatedTimeLabel} - ({trip.durationMinutes} min). 
                    {trip.distanceKM} KM
                </div>
                )}
                {trip.tripType == 'hourly' && (
                <div className="text-[12px] md:text-xs text-gray-600 mt-2">
                    <ClockIcon className="inline w-4 h-4 mr-1 -mt-0.5 text-gray-500" /> 
                    Durstion {trip.duration} hr
                </div> 
                )}
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-600">
                    <CalendarDaysIcon className="w-4 h-4 text-gray-500" />
                    <span>{trip.date}</span>
                </div>

                <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-600">
                    <ClockIcon className="w-4 h-4 text-gray-500" />
                    <span>{trip.pickupTimeLabel}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TripSummary
