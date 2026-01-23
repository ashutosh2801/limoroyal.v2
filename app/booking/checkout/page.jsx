"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import visaIcon from "../../../public/assets/mastercard.png";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { saveSearch } from "@/store/searchSlice";
import { FaChevronLeft, FaChevronRight, FaChild } from "react-icons/fa";
import {
  ChevronDownIcon
} from "@heroicons/react/24/solid";
import { chargeSavedCard, createBooking } from "@/app/lib/externalApi";
import Tabs from "@/app/components/Tabs";
import PriceBreakdown from "@/app/components/PriceBreakdown";
import RTabs from "./Tabs";
import Trip from "./Trip";
import ReturnTrip from "./ReturnTrip";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);

  const { data } = useSelector((s) => s.search);
  if (!data || Object.keys(data).length === 0) {
    router.push("/");
    return;
  }

  const hasReturnTrip = Boolean(data?.PickupInfo?.returnTrip);
  const activeStep = hasReturnTrip ? 5 : 3;

  const booknow = async () => {
    try {
      setLoading(true);
      setError(null);
      setErrors(null);

      const payload = {
        trip_type: data.tripType,
        pickup_date: data.pickupDate,
        pickup_time: data.pickupTime,
        from: data.from,
        additionalStops: data.additionalStops || [],
        to: data.to || "",
        airportFrom: data.airportFrom,
        airportTo: data.airportTo,
        distance_km: data.distanceKM,
        distance_mile: data.distanceMiles,
        duration_minutes: data.durationMinutes,
        passengers: data.selectedPassenger,
        luggage: data.selectedLuggage,
        guest: data.PickupInfo,
        payment_type: data.paymentType,

        vehicle: {
          id: data.selectedVehicle.id,
          name: data.selectedVehicle.name,
          passengers: data.selectedVehicle.passengers,
          luggage: data.selectedVehicle.luggage,
          base_fare: data.selectedVehicle.baseFare,
          price_KM: data.selectedVehicle.priceKM,
          price_HR: data.selectedVehicle.priceHR,
        },

        payment: {
          brand: data.cardData?.brand || null,
          last4: data.cardData?.last4 || null,
          stripe_customer_id: data.stripeCustomerId || null, // Stripe stripe Customer Id
          payment_method_id: data.cardData?.paymentMethodId || null, // Stripe saved card
          sub_total_price: data.payment.subTotalPrice,
          tax_price: data.payment.taxPrice,
          total_price: data.payment.totalPrice,
        },
        returnData: data.returnData
      };
      const result = await createBooking(payload);    
      // console.log('result', result);
      // return;
      
      if (result.status != "confirmed") {
        // If the API returns { message: "Validation failed", errors: ["Email is required", ...] }
        setError(result.message || "Booking failed");
        if (result.errors) {
          const flattenedErrors = Object.values(result.errors).flat();
          setErrors(flattenedErrors);
        }
        return; // Exit the function
      }

      if (result.status == 'confirmed') {

        dispatch(
          saveSearch({...data, 'order_id': result.order_id })
        );

        if(data.paymentType == 'card') {
          // Authorize Payment
          const chargePayload = { 
            paymentMethodId: data.cardData.paymentMethodId, 
            customerId: data.stripeCustomerId, 
            amount: data.returnData?.payment?.totalPrice || data.payment.totalPrice,
            orderId: result.order_id,
            bookingId: result.booking_id
          }
          const res = await chargeSavedCard(chargePayload);

          console.log(res);

          if(result.order_id) {
            router.push(`/booking/success?booking_id=${result.order_id}`);
          }
          else {
            setError(error);
          }
        }
        else {
          router.push(`/booking/success?booking_id=${result.order_id}`);
        }
        
      }
    } catch (err) {
      console.error("Booknow error:", err);
      setError("A network error occurred. Please try again. " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const [collapse, setCollapse] = useState({
    booking: true,
    returnBooking: true,
    price: true,
  });

  const toggleCollapse = (key) => {
    setCollapse((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-screen">
      <div className="py-10 border-b webBorderColor">
        <div className="container mx-auto px-2">
          <div className="flex flex-col md:flex-row space-x-5 pt-[90px] md:pt-[20px] xl:pt-0 mt-0 md:mt-20 xl:mt-40">
            <div className="w-full md:w-1/3 order-2 md:order-1">
              <div className="sticky top-5 z-50">
                {/* Payment Card */}
                <div className="bg-white rounded-md shadow-xl overflow-hidden text-black px-4 py-4 mb-5">
                  <h2 className="mb-4 text-sm xl:text-lg font-bold border-b border-gray-200 pb-1">Payment details</h2>
                  <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-700">Payment</p>
                      <button 
                      onClick={() => router.push("/booking/payment")}
                      className="text-xs font-semibold py-2 px-4 bg-gray-100 hover:bg-gray-200 transition rounded-xl cursor-pointer">Edit</button>
                  </div>
                  <b className="text-xs md:text-sm font-semibold">{`${data?.PickupInfo?.title} ${data?.PickupInfo?.firstName} ${data?.PickupInfo?.lastName}`}</b>
                  <div className="flex items-center gap-2 text-xs md:text-sm font-medium mt-2">
                    {data.paymentType == 'quote' ? <span className="text-green-500">Get a Quote</span> : <>
                      <Image src={visaIcon} alt="Visa" className="h-5 w-auto" />
                      •••• {data.cardData?.last4} ({data.cardData?.brand?.toUpperCase()})
                      </>
                    }
                  </div>
                </div>

                {/* Billing info */}
                <div className="bg-white rounded-md shadow-xl overflow-hidden text-black px-4 py-4 mb-5">
                    <div>
                      <h2 className="mb-4 text-sm xl:text-lg font-bold border-b border-gray-200 pb-1">Billing Information</h2>
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-700">Billing Information</p>
                            <button
                            onClick={() => router.push("/booking/payment")}
                            className="text-xs font-semibold py-2 px-4 bg-gray-100 hover:bg-gray-200 transition rounded-xl cursor-pointer">Edit</button>
                        </div>
                        <b className="text-xs md:text-sm font-semibold">{`${data?.PickupInfo?.title} ${data?.PickupInfo?.firstName} ${data?.PickupInfo?.lastName}`}</b>
                    </div>
                </div>

                <div className="bg-white rounded-md shadow-xl overflow-hidden text-black px-4 py-4 mb-4">
                  <div
                    className="flex justify-between items-center cursor-pointer border-b border-gray-200 pb-1"
                    onClick={() => toggleCollapse("price")}
                  >
                    <h4 className="text-sm xl:text-lg font-bold">
                      Price breakdown
                    </h4>
                    <span className="flex items-center">
                      <ChevronDownIcon
                        className={`w-5 h-5 transition-transform duration-300 ${
                          collapse.price ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      collapse.price ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <PriceBreakdown paymentData={data.returnData?.payment || data.payment} oldData={data.returnData?.payment ?data.payment : null} />
                  </div>
                </div> 

                {/* Book now button */}
                <div>
                    <button
                      onClick={booknow}
                      disabled={loading}
                      className="w-full py-3 text-white webBG rounded-md hover:opacity-90 text-sm mt-4 cursor-pointer">
                        {loading ? "Booking..." : data?.paymentType == 'quote' ? "Get a Quote Now"  : "Book now"}
                    </button>
                    {error && (
                      <p className="text-red-500 text-base mt-2">{error}</p>
                    )}
                    {errors && errors.map((error, i) => (
                      <p key={i} className="text-red-500 text-base mt-2">{error}</p>
                    ))}
                    <p className="text-gray-300 text-xs mt-4">By Booking, Our <a href="" target="_blank" className="font-medium underline text-gray-300">Terms & Conditions</a> apply in their current version</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3 order-1 md:order-2">
              <div className="bg-white rounded-md shadow-xl overflow-hidden text-black mb-5 md:mb-0">
                <div className="p-4 xl:p-8">

                  {/* ===========================
                      STEP INDICATOR
                  ============================ */}
                  <Tabs activeStep={activeStep} hasReturnTrip={hasReturnTrip} />

                  {/* ===========================
                      TWO COLUMN LAYOUT
                  ============================ */}
                  <div>
                      {/* TAB HEADERS */}
                      {data.returnData ? 
                        <RTabs
                          tabs={[{
                            label: "Your ride",
                            content: <Trip />,
                          },
                          {
                            label: "Return Trip",
                            content: <ReturnTrip />,
                          }]} />
                        :
                        <Trip />
                      }

                  </div>

                  {/* Continue button */}
                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={(e) => {e.preventDefault(); router.back(); }}
                      className="flex py-3 px-3 xl:px-10 rounded-md font-medium text-white bg-gray-700 hover:opacity-80 cursor-pointer text-xs xl:text-base w-auto transition"
                    >
                      <FaChevronLeft className="text-white text-xs xl:text-sm mr-1 mt-[2px] xl:mt-1" />
                      Back
                    </button>
                    {/* <button
                      onClick={booknow}
                      disabled={loading}
                      className="flex py-3 px-2 md:px-10 rounded-md font-medium text-white webBG hover:opacity-90 cursor-pointer text-xs md:text-base w-auto"
                    >
                      {loading ? "Booking..." : data.paymentType == 'quote' ? "Get a Quote Now"  : "Book now"}
                    </button>                     */}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* INLINE CSS */}
        <style jsx global>{`
          nav div {
            background: #0a0a0a;
            margin-top: 0;
            padding-top: 2px;
          }
        `}</style>
      </div>
    </div>
  );
}
