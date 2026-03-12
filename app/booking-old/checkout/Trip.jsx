"use client";

import React from 'react'
import Image from "next/image";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import RouteMap from "@/app/components/RouteMap";
import Locations from "@/app/components/Locations";
import vClass from "../../../public/assets/sedan/mercedes-benz-s-class.png";

function Trip() {
  const { data } = useSelector((s) => s.search);
  if (!data || Object.keys(data).length === 0) {
    router.push("/");
    return;
  }
  return (
    <div>
        <h2 className="text-lg xl:text-xl font-bold mb-4">Your ride</h2>
                      
        {/* Ride detail */}
        <div className="border border-gray-200 rounded-xl p-3 xl:p-4">

            {/* Map */}
            <div className="">
                <div className="w-full rounded-xl border border-gray-200">
                <RouteMap />
                </div>
            </div>

        <div className="flex flex-wrap md:flex-nowrap md:justify-between items-start">
            
            <div>
            {/* Locations */}
            <Locations data={data} />

            
            </div>  

            <button 
            onClick={() => router.push("/")}
            className="text-xs font-semibold py-2 px-4 bg-gray-100 hover:bg-gray-200 transition rounded-xl cursor-pointer mt-3 md:mt-6">Edit</button>
        </div>
        </div>

        {/* Vehicle Selection Block */}
        <div className="mt-6 border border-gray-200 rounded-xl p-3 xl:p-4">
            <div className="flex justify-between">
                <div>
                <p className="font-semibold text-xs md:text-sm">{data.selectedVehicle.name}</p>
                {data.selectedVehicle.desc && (
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-700">
                    <p className="flex items-start md:items-center gap-1">
                        <ExclamationCircleIcon className="w-5 h-5 flex-shrink-0 " /> <span dangerouslySetInnerHTML={{ __html: data.selectedVehicle.desc }} />
                    </p>
                </div>
                )}                                
                </div>
            
                <div className="flex items-end flex-col md:flex">
                    <button 
                    onClick={() => router.push("/booking")}
                    className="text-xs font-semibold py-2 px-4 bg-gray-100 hover:bg-gray-200 transition rounded-xl cursor-pointer">Edit</button>
                    <Image
                        src={data.selectedVehicle.img ?? vClass}
                        alt={data.selectedVehicle.name}
                        className="w-50 h-auto"
                        width={168}      // w-42 = 168px
                        height={100}     // adjust as per your image ratio
                        priority
                    />
                    
                </div>
            </div>
        </div>

        {/* Guest Information Section */}
        <div className="mt-7">
            <h2 className="text-lg md:text-xl font-bold mb-4">Passenger's information</h2>

            <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">

                {/* Guest Name */}
                <div className="p-3 xl:p-5 flex justify-between items-start border-b border-gray-200">
                <div>                                    
                    <p className="text-xs xl:text-sm text-gray-500">Passenger name</p>
                    <p className="text-xs xl:text-sm font-semibold mt-1">{`${data.PickupInfo.title} ${data.PickupInfo.firstName} ${data.PickupInfo.lastName}`}</p>
                    <p className="text-xs xl:text-sm text-gray-500 mt-4">Contact details</p>
                    <p className="text-xs xl:text-sm font-medium mt-1">
                    {`${data.PickupInfo.email} • +${data.PickupInfo.contactNumber}`}
                    </p>
                </div>

                <button 
                onClick={() => router.push("/booking/pickup-info")}
                className="text-xs font-semibold py-2 px-4 bg-gray-100 hover:bg-gray-200 transition rounded-xl cursor-pointer">Edit</button>
                </div>

                {data.PickupInfo.bookingFor === "someoneElse" && (
                <div className="p-3 xl:p-5 flex justify-between items-start border-b border-gray-200">
                <div>                                    
                    <p className="text-xs xl:text-sm text-gray-500">Booker Name</p>
                    <p className="text-xs xl:text-sm font-semibold mt-1">{`${data.PickupInfo.booker_title} ${data.PickupInfo.booker_firstName} ${data.PickupInfo.booker_lastName}`}</p>
                    <p className="text-xs xl:text-sm text-gray-500 mt-4">Contact details</p>
                    <p className="text-xs xl:text-sm font-medium mt-1">
                    {`${data.PickupInfo.booker_email} • +${data.PickupInfo.booker_contactNumber}`}
                    </p>
                </div>
                </div>
                )}

                

                {/* Notes */}
                <div className="px-3 md:px-5 py-2 flex justify-between items-center">
                <div>
                    <p className="text-sm text-gray-500">Trip Notes</p>
                    <p className="text-xs md:text-sm font-semibold mt-1">{data.PickupInfo.trip_notes || "-"}</p>
                </div>
                </div>                             

                

            </div>
        </div>
    </div>
  )
}

export default Trip
