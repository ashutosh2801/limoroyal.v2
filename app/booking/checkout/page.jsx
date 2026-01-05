"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  MapPinIcon,
  UsersIcon,
  BriefcaseIcon,
  ExclamationCircleIcon
} from "@heroicons/react/24/solid";

import vClass from "../../../public/assets/sedan/mercedes-benz-s-class.png";
import visaIcon from "../../../public/assets/mastercard.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Tabs from "../../components/Tabs";
import { saveSearch } from "@/store/searchSlice";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { chargeSavedCard, createBooking } from "../../lib/externalApi";
import { formatDate } from "../../lib/functions";

export default function CheckoutPage() {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);
  const router = useRouter();
  const activeStep = 3; // Payment step

  const { data } = useSelector((s) => s.search);
  if (!data) {
    router.push("/");
    return;
  }

  useEffect(() => {
    // If no search data, redirect to home
    if (!data || Object.keys(data).length === 0) {
      router.push("/");
      return;
    }

    console.log("Checkout Page - Retrieved data:", data);
  }, [router, data]);

  const booknow = async () => {
    try {
      setLoading(true);
      setError(null);
      setErrors(null);

      const payload = {
        pickup_date: data.pickupDate,
        pickup_time: data.pickupTime,
        from: data.from,
        to: data.to || "",
        distance_km: data.distanceKM,
        distance_mile: data.distanceMiles,
        duration_minutes: data.durationMinutes,
        trip_type: data.tripType,
        payment_type: data.paymentType,

        flight_number: data.PickupInfo.flightNumber,
        pickup_sign: data.PickupInfo.pickupSign,
        chauffeur_notes: data.PickupInfo.chauffeurNotes,
        reference_code: data.PickupInfo.referenceCode,

        passengers: data.selectedPassenger,
        luggage: data.selectedLuggage,

        vehicle: {
          id: data.selectedVehicle.id,
          name: data.selectedVehicle.name,
          passengers: data.selectedVehicle.passengers,
          luggage: data.selectedVehicle.luggage,
          base_fare: data.selectedVehicle.baseFare,
          price_KM: data.selectedVehicle.priceKM,
          price_HR: data.selectedVehicle.priceHR,
        },

        guest: {
          booking_for: data.PickupInfo.bookingFor,
          title: data.PickupInfo.title,
          first_name: data.PickupInfo.firstName,
          last_name: data.PickupInfo.lastName,
          email: data.PickupInfo.email,
          phone: data.PickupInfo.contactNumber,
          booker_title: data.PickupInfo.booker_title,
          booker_first_name: data.PickupInfo.booker_firstName,
          booker_last_name: data.PickupInfo.booker_lastName,
          booker_email: data.PickupInfo.booker_email,
          booker_phone: data.PickupInfo.booker_contactNumber,
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
      };

      const result = await createBooking(payload);    

      console.log("Booking", result);
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
            amount: data.payment.totalPrice
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

  return (
    <div className="min-h-screen">
      <div className="py-10 border-b webBorderColor">
        <div className="container mx-auto px-2">
          <div className="flex flex-col md:flex-row space-x-5 pt-[80px] md:pt-0 mt-0 md:mt-40">
            <div className="w-full md:w-1/3 order-2 md:order-1">
              <div>
                {/* Payment Card */}
                <div className="bg-white rounded-md shadow-xl overflow-hidden text-black px-4 py-4 mb-5">
                  <h2 className="mb-4 text-lg md:text-lg font-bold border-b border-gray-200 pb-1">Payment details</h2>
                  <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-700">Payment</p>
                      <button 
                      onClick={() => router.push("/booking/payment")}
                      className="text-xs font-semibold py-2 px-4 bg-gray-100 hover:bg-gray-200 transition rounded-xl cursor-pointer">Edit</button>
                  </div>
                  <b className="text-xs md:text-sm font-semibold">{`${data.PickupInfo.title} ${data.PickupInfo.firstName} ${data.PickupInfo.lastName}`}</b>
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
                      <h2 className="mb-4 text-lg md:text-lg font-bold border-b border-gray-200 pb-1">Billing Information</h2>
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-700">Billing Information</p>
                            <button 
                            
                            onClick={() => router.push("/booking/payment")}
                            className="text-xs font-semibold py-2 px-4 bg-gray-100 hover:bg-gray-200 transition rounded-xl cursor-pointer">Edit</button>
                        </div>
                        <b className="text-xs md:text-sm font-semibold">{`${data.PickupInfo.title} ${data.PickupInfo.firstName} ${data.PickupInfo.lastName}`}</b>
                    </div>
                </div>
                {/* Price breakdown */}
                <div className="bg-white rounded-md shadow-xl overflow-hidden text-black px-4 py-4 mb-2">
                    <h2 className="mb-4 text-lg md:text-lg font-bold border-b border-gray-200 pb-1">Price breakdown</h2>
                    <div className="text-sm">
                      <div className="flex justify-between py-1">
                          <span className="text-gray-700">Price excl. tax</span>
                          <span>{data.payment.subTotalLabel}</span>
                      </div>

                      <div className="flex justify-between py-1">
                          <span className="text-gray-700">Estimated tax</span>
                          <span>{data.payment.taxLabel}</span>
                      </div>

                      {/* Promo */}
                      {/* <details className="mt-4 cursor-pointer">
                          <summary className="text-sm font-medium">Add promotion</summary>
                          <input
                          type="text"
                          placeholder="Enter code"
                          className="w-full px-3 py-3 text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none mt-2"
                          />
                      </details> */}

                      {/* Total */}
                      <div className="flex justify-between items-center pt-4 border-t border-gray-300 mt-4">
                          <span className="font-normal text-md">Total price</span>
                          <span className="font-bold text-lg">{data.payment.totalLabel}</span>
                      </div>
                    </div>
                </div>
                {/* Book now button */}
                <div>
                    <button
                      onClick={booknow}
                      disabled={loading}
                      className="w-full py-3 text-white webBG rounded-md hover:opacity-90 text-sm mt-4 cursor-pointer">
                        {loading ? "Booking..." : data.paymentType == 'quote' ? "Get a Quote Now"  : "Book now"}
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
                <div className="p-4 md:p-8">

                  {/* ===========================
                      STEP INDICATOR
                  ============================ */}
                  <Tabs activeStep={activeStep} />     

                  {/* ===========================
                      TWO COLUMN LAYOUT
                  ============================ */}
                  <div>
                      <h2 className="text-lg md:text-xl font-bold mb-4">Your ride</h2>

                      <div className="border border-gray-200 rounded-xl p-3 md:p-4">

                          {/* Title row */}
                          <div className="flex justify-between items-center">
                            <p className="font-semibold text-xs md:text-sm pr-5 md:pr-0">
                                {formatDate(data?.pickupDate)} • {data?.pickupTimeLabel}
                            </p>
                            <button 
                            onClick={() => router.push("/")}
                            className="text-xs font-semibold py-2 px-4 bg-gray-100 hover:bg-gray-200 transition rounded-xl cursor-pointer">Edit</button>
                          </div>

                          {/* Map */}
                          <div className="mt-4">
                              <div className="mt-4 h-64 w-full rounded-xl overflow-hidden border border-gray-200">
                                  <iframe
                                      width="100%"
                                      height="100%"
                                      style={{ border: 0 }}
                                      loading="lazy"
                                      allowFullScreen
                                      referrerPolicy="no-referrer-when-downgrade"
                                      src={data.to ? `https://www.google.com/maps?q=${data.from.name}+to+${data.to?.name}&output=embed` : `https://www.google.com/maps?q=${data.from.name}&output=embed`}
                                  ></iframe>
                              </div>
                          </div>

                          {/* Locations */}
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

                          {/* Time + Distance */}
                          <div className="flex gap-4 mt-4 text-xs text-gray-600">

                            {data.distanceKM && (
                              <p className="flex gap-1">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.8 16C12.7882 16 14.4 14.3882 14.4 12.4L14.4 3.2L15.2 3.2C15.5235 3.2 15.8153 3.00512 15.9391 2.70616C16.0629 2.4072 15.9945 2.06312 15.7657 1.83432L14.1657 0.23432C13.8532 -0.0780794 13.3467 -0.0780795 13.0343 0.23432L11.4343 1.83432C11.2055 2.06312 11.137 2.4072 11.2609 2.70616C11.3847 3.00512 11.6764 3.2 12 3.2L12.8 3.2L12.8 12.4C12.8 13.5046 11.9045 14.4 10.8 14.4C9.69541 14.4 8.8 13.5046 8.8 12.4L8.8 3.6C8.8 1.61176 7.18824 -7.70349e-07 5.2 -9.44166e-07C3.21176 -1.11798e-06 1.6 1.61176 1.6 3.6L1.6 11.3366C0.667839 11.666 -1.60618e-06 12.555 -1.69753e-06 13.6C-1.81341e-06 14.9255 1.07448 16 2.4 16C3.72552 16 4.8 14.9255 4.8 13.6C4.8 12.555 4.13216 11.666 3.2 11.3366L3.2 3.6C3.2 2.49544 4.09544 1.6 5.2 1.6C6.30456 1.6 7.2 2.49544 7.2 3.6L7.2 12.4C7.2 14.3882 8.81176 16 10.8 16Z" fill="#ceb366"></path></svg> {data.distanceKM} km
                              </p>
                            )}
                            <p className="flex gap-1">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.3904 10.0572C10.1976 10.0572 10.0145 10.003 9.86024 9.89458L7.46988 8.21386C7.24819 8.06024 7.11325 7.80723 7.11325 7.54518V4.18373C7.11325 3.72289 7.50843 3.35241 8 3.35241C8.49157 3.35241 8.88675 3.72289 8.88675 4.18373V7.12952L10.9205 8.55723C11.1133 8.69277 11.2289 8.88253 11.2675 9.10843C11.2964 9.3253 11.2386 9.5512 11.094 9.72289C10.9301 9.93072 10.6699 10.0572 10.3807 10.0572H10.3904Z" fill="#ceb366"></path><path d="M8 15C3.58554 15 0 11.6386 0 7.5C0 3.36145 3.58554 0 8 0C12.4145 0 16 3.36145 16 7.5C16 11.6386 12.4145 15 8 15ZM8 1.66265C4.56867 1.66265 1.77349 4.28313 1.77349 7.5C1.77349 10.7169 4.56867 13.3373 8 13.3373C11.4313 13.3373 14.2265 10.7169 14.2265 7.5C14.2265 4.28313 11.4313 1.66265 8 1.66265Z" fill="#ceb366"></path></svg>
                              {data.durationMinutes}
                            </p>                          
                            
                          </div>
                      </div>

                      {/* Vehicle Selection Block */}
                      <div className="mt-6 border border-gray-200 rounded-xl p-3 md:p-4">
                          <div className="flex justify-between">
                              <div>
                              <p className="font-semibold text-xs md:text-sm">{data.selectedVehicle.name}</p>
                              <div className="flex items-center gap-4 mt-3 text-xs text-gray-700">
                                  <span className="flex items-center gap-2">
                                    <UsersIcon className="w-5 h-5" /> {data.selectedPassenger}
                                  </span>
                                  <span className="flex items-center gap-2">
                                    <BriefcaseIcon className="w-5 h-5" /> {data.selectedLuggage}
                                  </span>                                
                              </div>
                              <div className="flex items-center gap-4 mt-3 text-xs text-gray-700">
                                  <p className="flex items-start md:items-center gap-1">
                                      <ExclamationCircleIcon className="w-5 h-5 flex-shrink-0 " /> Have more bags or passengers? Please change to Business Van / SUV
                                  </p>
                              </div>
                              </div>
                          
                              <div className="flex items-start flex-col md:flex-row">
                                  <Image
                                      src={data.selectedVehicle.img ?? vClass}
                                      alt={data.selectedVehicle.name}
                                      className="w-42 h-auto"
                                      width={168}      // w-42 = 168px
                                      height={100}     // adjust as per your image ratio
                                      priority
                                  />
                                  <button 
                                  onClick={() => router.push("/booking")}
                                  className="text-xs font-semibold mt-3 md:mt-0 py-2 px-4 bg-gray-100 hover:bg-gray-200 transition rounded-xl cursor-pointer">Edit</button>
                              </div>
                          </div>
                      </div>

                      {/* Guest Information Section */}
                      <div className="mt-7">
                          <h2 className="text-lg md:text-xl font-bold mb-4">Guest's information</h2>

                          <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">

                              {/* Guest Name */}
                              <div className="p-3 md:p-5 flex justify-between items-start border-b border-gray-200">
                                <div>                                    
                                    <p className="text-sm text-gray-500">Passenger name</p>
                                    <p className="text-xs md:text-sm font-semibold mt-1">{`${data.PickupInfo.title} ${data.PickupInfo.firstName} ${data.PickupInfo.lastName}`}</p>
                                    <p className="text-xs md:text-sm text-gray-500 mt-4">Contact details</p>
                                    <p className="text-xs md:text-sm font-medium mt-1">
                                    {`${data.PickupInfo.email} • +${data.PickupInfo.contactNumber}`}
                                    </p>
                                </div>

                                <button 
                                onClick={() => router.push("/booking/pickup-info")}
                                className="text-xs font-semibold py-2 px-4 bg-gray-100 hover:bg-gray-200 transition rounded-xl cursor-pointer">Edit</button>
                              </div>

                              {data.PickupInfo.bookingFor === "someoneElse" && (
                              <div className="p-3 md:p-5 flex justify-between items-start border-b border-gray-200">
                                <div>                                    
                                    <p className="text-sm text-gray-500">Booker Name</p>
                                    <p className="text-xs md:text-sm font-semibold mt-1">{`${data.PickupInfo.booker_title} ${data.PickupInfo.booker_firstName} ${data.PickupInfo.booker_lastName}`}</p>
                                    <p className="text-xs md:text-sm text-gray-500 mt-4">Contact details</p>
                                    <p className="text-xs md:text-sm font-medium mt-1">
                                    {`${data.PickupInfo.booker_email} • +${data.PickupInfo.booker_contactNumber}`}
                                    </p>
                                </div>
                              </div>
                              )}

                              {/* Flight Number */}
                              <div className="p-3 md:p-5 flex justify-between items-center">
                              <div>
                                  <p className="text-sm text-gray-500">Flight number</p>
                                  <p className="text-xs md:text-sm font-semibold mt-1">{data.PickupInfo.flightNumber || "-"}</p>
                              </div>

                              {/* <button className="text-xs font-semibold py-2 px-4 bg-gray-100 hover:bg-gray-200 transition rounded-xl cursor-pointer">Edit</button> */}
                              </div>

                              {/* Pickup Sign */}
                              <div className="px-3 md:px-5 py-2 flex justify-between items-center">
                              <div>
                                  <p className="text-sm text-gray-500">Pickup sign</p>
                                  <p className="text-xs md:text-sm font-semibold mt-1">{data.PickupInfo.pickupSign || "-"}</p>
                              </div>
                              </div>

                              {/* Notes */}
                              <div className="px-3 md:px-5 py-2 flex justify-between items-center">
                              <div>
                                  <p className="text-sm text-gray-500">Notes for the chauffeur</p>
                                  <p className="text-xs md:text-sm font-semibold mt-1">{data.PickupInfo.chauffeurNotes || "-"}</p>
                              </div>
                              </div>

                              {/* Reference code */}
                              <div className="px-3 md:px-5 py-2 flex justify-between items-center">
                              <div>
                                  <p className="text-sm text-gray-500">Reference code or cost center</p>
                                  <p className="text-xs md:text-sm font-semibold mt-1">{data.PickupInfo.referenceCode || "-"}</p>
                              </div>
                              </div>

                              

                          </div>
                      </div>
                  </div>

                  {/* Continue button */}
                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={(e) => {e.preventDefault(); router.back(); }}
                      className="flex py-3 px-3 md:px-10 rounded-md font-medium text-white bg-gray-700 hover:opacity-80 cursor-pointer text-xs md:text-base w-auto transition"
                    >
                      <FaChevronLeft className="text-white text-sm mr-1 md:mt-1" />
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
