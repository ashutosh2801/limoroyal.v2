'use client';

import React from 'react'
import { CalendarDaysIcon, ClockIcon, MapPinIcon, Squares2X2Icon } from '@heroicons/react/24/solid';
import { formatDate } from "@/app/lib/functions";
import { FaChild } from 'react-icons/fa';

function Locations({data, display="flex gap-4"}) {
    if(!data) return null;
    return (
    <div>
        <div className="relative mt-6 space-y-4 text-xs xl:text-sm">
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
                <p className="font-semibold line-clamp-1">{data.from.name}</p>
                <p className="text-gray-600">{data.from.address}</p>
                </div>
            </div>

            {data.additionalStops && data.additionalStops.length > 0 && (
                <div className="flex items-start gap-3 text-xs xl:text-sm mb-3 relative z-10">
                    <Squares2X2Icon className="w-4 h-4 text-gray-600 flex-shrink-0" />
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
                        <p className="font-semibold text-xs xl:text-sm line-clamp-1">
                        {data.to?.name}
                        </p>
                        <p className="text-gray-600 text-xs xl:text-sm">
                        {data.to?.address}
                        </p>
                    </div>
                </div>
            )}
        </div>

        <div className={`${display}`}>
            <div className="flex items-center gap-2 text-xs xl:text-sm text-gray-600 mt-3">
                <CalendarDaysIcon className="w-5 h-5 text-gray-600" />
                <span>{formatDate(data?.pickupDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-xs xl:text-sm text-gray-600 mt-3">
                <ClockIcon className="w-5 h-5 text-gray-600" />
                <span>{data?.pickupTimeLabel}</span>
            </div>
        </div>
        <div className={`${display}`}>
            {data.selectedPassenger > 0 && (
            <div className="flex items-center gap-2 text-xs xl:text-sm text-gray-600 mt-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0Z" clipRule="evenodd"></path>
                <path d="M6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"></path>
                </svg>
                <span>{data.selectedPassenger} Passenger(s)</span>
            </div>
            )}
            {data.selectedLuggage > 0 && (
            <div className="flex items-center gap-2 text-xs xl:text-sm text-gray-600 mt-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd"></path>
                <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z"></path>
                </svg>
                <span>{data.selectedLuggage} Luggage(s)</span>
            </div>
            )}

            {(data.PickupInfo?.seats?.infant > 0 || data.PickupInfo?.seats?.toddler > 0 || data.PickupInfo?.seats?.booster > 0) && (
            <div className="flex items-center gap-2 text-xs xl:text-sm text-gray-600 mt-3">
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

        <div className="mt-4 text-xs xl:text-sm text-gray-600 flex gap-5"> 
            {data.distanceKM && (<p className="flex gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M10.8 16C12.7882 16 14.4 14.3882 14.4 12.4L14.4 3.2L15.2 3.2C15.5235 3.2 15.8153 3.00512 15.9391 2.70616C16.0629 2.4072 15.9945 2.06312 15.7657 1.83432L14.1657 0.23432C13.8532 -0.0780794 13.3467 -0.0780795 13.0343 0.23432L11.4343 1.83432C11.2055 2.06312 11.137 2.4072 11.2609 2.70616C11.3847 3.00512 11.6764 3.2 12 3.2L12.8 3.2L12.8 12.4C12.8 13.5046 11.9045 14.4 10.8 14.4C9.69541 14.4 8.8 13.5046 8.8 12.4L8.8 3.6C8.8 1.61176 7.18824 -7.70349e-07 5.2 -9.44166e-07C3.21176 -1.11798e-06 1.6 1.61176 1.6 3.6L1.6 11.3366C0.667839 11.666 -1.60618e-06 12.555 -1.69753e-06 13.6C-1.81341e-06 14.9255 1.07448 16 2.4 16C3.72552 16 4.8 14.9255 4.8 13.6C4.8 12.555 4.13216 11.666 3.2 11.3366L3.2 3.6C3.2 2.49544 4.09544 1.6 5.2 1.6C6.30456 1.6 7.2 2.49544 7.2 3.6L7.2 12.4C7.2 14.3882 8.81176 16 10.8 16Z"></path></svg> {data.distanceKM} km
            </p>)}
            <p className="flex gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M10.3904 10.0572C10.1976 10.0572 10.0145 10.003 9.86024 9.89458L7.46988 8.21386C7.24819 8.06024 7.11325 7.80723 7.11325 7.54518V4.18373C7.11325 3.72289 7.50843 3.35241 8 3.35241C8.49157 3.35241 8.88675 3.72289 8.88675 4.18373V7.12952L10.9205 8.55723C11.1133 8.69277 11.2289 8.88253 11.2675 9.10843C11.2964 9.3253 11.2386 9.5512 11.094 9.72289C10.9301 9.93072 10.6699 10.0572 10.3807 10.0572H10.3904Z"></path><path d="M8 15C3.58554 15 0 11.6386 0 7.5C0 3.36145 3.58554 0 8 0C12.4145 0 16 3.36145 16 7.5C16 11.6386 12.4145 15 8 15ZM8 1.66265C4.56867 1.66265 1.77349 4.28313 1.77349 7.5C1.77349 10.7169 4.56867 13.3373 8 13.3373C11.4313 13.3373 14.2265 10.7169 14.2265 7.5C14.2265 4.28313 11.4313 1.66265 8 1.66265Z"></path></svg>
                {data.durationMinutes}
            </p>
        </div>
    </div>
  )
}

export default Locations
