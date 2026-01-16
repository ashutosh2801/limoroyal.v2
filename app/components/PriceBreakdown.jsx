'use client'

import React from 'react'

export default function PriceBreakdown({paymentData, oldData=null}) {    
    
    return (
    <div>
        <div className="relative mt-4 text-xs md:text-sm">
            <div className="flex justify-between py-1">
                <span className="text-gray-700">Price {oldData!=null ? '(+ retrun trip)':''} excl. tax</span>
                <span>{paymentData?.subTotalLabel}</span>
            </div>

            {oldData?.childSeats > 0 && oldData?.totalSelected > 0 && (
            <div className="flex justify-between py-2 border-t border-b border-gray-300">
                <span className="text-gray-700">Child Seat {oldData?.totalSelected ? ' x ' + oldData?.totalSelected : ''}</span>
                <span>{oldData?.childLabel}</span>
            </div>
            )}

            {paymentData?.childSeats > 0 && paymentData?.totalSelected > 0 && (
            <div className="flex justify-between py-2 border-t border-b border-gray-300">
                <span className="text-gray-700">{oldData!=null ? 'Return Trip ':''} Child Seat {paymentData?.totalSelected ? ' x ' + paymentData?.totalSelected : ''}</span>
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
