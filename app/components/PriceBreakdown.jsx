'use client'

import React from 'react'

export default function PriceBreakdown({paymentData}) {    
    
    return (
    <div className="bg-white rounded-md shadow-xl overflow-hidden text-black px-4 py-4 mb-5">
        <h2 className="mb-4 text-sm md:text-lg font-bold border-b border-gray-200 pb-1">Price breakdown</h2>
        <div className="text-xs md:text-sm">
            <div className="flex justify-between py-1">
                <span className="text-gray-700">Price excl. tax</span>
                <span>{paymentData?.subTotalLabel}</span>
            </div>

            {paymentData?.childSeats > 0 && paymentData?.totalSelected > 0 && (
            <div className="flex justify-between py-2 border-t border-b border-gray-300">
                <span className="text-gray-700">Child Seat {paymentData?.totalSelected ? ' x ' + paymentData?.totalSelected : ''}</span>
                <span>{paymentData?.childLabel}</span>
            </div>
            )}

            <div className="flex justify-between py-1">
                <span className="text-gray-700">Estimated tax</span>
                <span>{paymentData?.taxLabel}</span>
            </div>                      

            {/* Total */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-300 mt-4">
                <span className="font-normal text-md">Total price</span>
                <span className="font-bold text-lg">{paymentData?.totalLabel}</span>
            </div>
        </div>
    </div>
  )
}
