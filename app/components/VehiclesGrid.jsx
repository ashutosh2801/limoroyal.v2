'use strict';

import React, { use } from 'react'
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux'

const VehiclesGrid = () => {

    const router = useRouter();
    const { data } = useSelector((state) => state.search);

    return (
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
  )
}

export default VehiclesGrid
