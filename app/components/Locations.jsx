'use client';

import React from 'react'
import { CalendarDaysIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { formatDate } from "@/app/lib/functions";
import { FaChild } from 'react-icons/fa';

function Locations({data, seats, display="flex gap-4"}) {
    if(!data) return null;
    return (
    <div>
    <div className="relative mt-6 space-y-4 text-xs md:text-sm">
        {/* Vertical connector */}
        {data.to && (
            <div
            className="absolute left-[7px] top-[20px] h-[calc(100%-55px)] border-l-2 border-dotted border-gray-500 pointer-events-none"
            />
        )}

        {/* FROM */}
        <div className="flex items-start gap-2 relative z-10">
            <MapPinIcon className="w-4 h-4 mt-1 text-gray-600 flex-shrink-0" />
            <div>
            <p className="font-semibold">{data.from.name}</p>
            <p className="text-gray-600">{data.from.address}</p>
            </div>
        </div>

        {data.additionalStops && data.additionalStops.length > 0 && (
            <div className="flex items-start gap-3 text-xs md:text-sm mb-3 relative z-10">
                <MapPinIcon className="w-5 h-5 text-black flex-shrink-0" />
                <div>
                    <p className="font-semibold line-clamp-1">{data.additionalStops[0].name}</p>
                    <p className="text-gray-600">{data.additionalStops[0].address}</p>
                </div>
            </div>
        )}

        {/* TO */}
        {data.to && (
            <div className="flex items-start gap-2 relative z-10">
                <MapPinIcon className="w-4 h-4 mt-1 text-red-500 flex-shrink-0" />
                <div>
                    <p className="font-semibold text-xs md:text-base">
                    {data.to?.name}
                    </p>
                    <p className="text-gray-600 text-xs md:text-sm">
                    {data.to?.address}
                    </p>
                </div>
            </div>
        )}
    </div>

    <div className={`${display}`}>
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 mt-3">
            <CalendarDaysIcon className="w-5 h-5 text-gray-600" />
            <span>{formatDate(data?.pickupDate)}</span>
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 mt-3">
            <ClockIcon className="w-5 h-5 text-gray-600" />
            <span>{data?.pickupTimeLabel}</span>
        </div>
    </div>
    <div className={`${display}`}>
        {data.selectedPassenger > 0 && (
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 mt-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0Z" clipRule="evenodd"></path>
            <path d="M6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"></path>
            </svg>
            <span>{data.selectedPassenger} Passenger(s)</span>
        </div>
        )}
        {data.selectedLuggage > 0 && (
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 mt-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path fillRule="evenodd" d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd"></path>
            <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z"></path>
            </svg>
            <span>{data.selectedLuggage} Luggage(s)</span>
        </div>
        )}

        {(data.PickupInfo?.seats?.infant || data.PickupInfo?.seats?.toddler || data.PickupInfo?.seats?.booster) && (
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 mt-3">
            <span className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full">
                <FaChild />
            </span>
            {data.PickupInfo?.seats?.infant > 0 && (
                <span>{data.PickupInfo?.seats?.infant} infant</span>
            )}
            {data.PickupInfo?.seats?.toddler > 0 && (
                <span>{data.PickupInfo?.seats?.toddler} toddler</span>
            )}
            {data.PickupInfo?.seats?.booster > 0 && (
                <span>{data.PickupInfo?.seats?.booster} booster</span>
            )}
        </div>
        )}
        </div>
    </div>
  )
}

export default Locations
