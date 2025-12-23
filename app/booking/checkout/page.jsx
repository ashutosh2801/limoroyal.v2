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

const formatDate = (isoString) => {
  const date = new Date(isoString);

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function CheckoutPage() {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);
  const router = useRouter();
  const activeStep = 3; // Payment step

  const { data } = useSelector((s) => s.search);

  useEffect(() => {
    // If no search data, redirect to home
    if (!data || Object.keys(data).length === 0) {
      router.push("/");
    }

    console.log("Checkout Page - Retrieved data:", data);
  }, [router]);

  const booknow = async () => {
    try {
      setLoading(true);
      setError(null);
      setErrors(null);

      const payload = {
        pickup_date: data.pickupDate,
        pickup_time: data.pickupTime,
        from: data.from,
        to: data.to,
        distance_km: data.distanceKM,
        distance_mile: data.distanceMiles,
        duration_minutes: data.durationMinutes,

        flight_number: data.PickupInfo.flightNumber,
        pickup_sign: data.PickupInfo.pickupSign,
        notes: data.PickupInfo.chauffeurNotes,
        reference_code: data.PickupInfo.referenceCode,

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
        },

        payment: {
          brand: data.cardData.brand,
          last4: data.cardData.last4,
          strip_customer_id: data.stripeCustomerId, // Stripe stripe Customer Id
          payment_method_id: data.cardData.paymentMethodId, // Stripe saved card
          sub_total_price: data.payment.subTotalPrice,
          tax_price: data.payment.taxPrice,
          total_price: data.payment.totalPrice,
        },
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      console.log("Booking", result);
      if (!res.ok) {
        // If the API returns { message: "Validation failed", errors: ["Email is required", ...] }
        setError(result.message || "Booking failed");
        if (result.errors) {
          const flattenedErrors = Object.values(result.errors).flat();
          setErrors(flattenedErrors);
        }
        return; // Exit the function
      }

      if (res.ok) {

        dispatch(
          saveSearch({...data, 'order_id': result.order_id })
        );
        // Authorize Payment
        const chargeAmount = { 
          paymentMethodId: data.cardData.paymentMethodId, 
          customerId: data.stripeCustomerId, 
          amount: data.payment.totalPrice
        }
        const res = await fetch("/api/charge-saved-card", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(chargeAmount),
        });

        const { success, error } = await res.json();
        if(success) {
          router.push(`/booking/success?booking_id=${result.order_id}`);
        }
        else {
          setError(error);
        }
      }
    } catch (err) {
      console.error("Booknow error:", err);
      setError("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="py-10 border-b webBorderColor">
        <div className="max-w-7xl mx-auto px-5 mt-30 md:mt-40">
          <div className="bg-white rounded-md shadow-xl overflow-hidden text-black">
            <div className="p-6 md:p-8">

              {/* ===========================
                  STEP INDICATOR
              ============================ */}
              <Tabs activeStep={activeStep} />     

              {/* ===========================
                  TWO COLUMN LAYOUT
              ============================ */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4 md:mt-6">

                {/* ===========================
                    LEFT SECTION — YOUR RIDE
                ============================ */}
                <div className="md:col-span-2">
                    <h2 className="text-lg md:text-xl font-bold mb-4">Your ride</h2>

                    <div className="border border-gray-200 rounded-xl p-4">

                        {/* Title row */}
                        <div className="flex justify-between items-center">
                        <p className="font-semibold text-xs md:text-sm">
                            {formatDate(data.pickupDate)} • {data.pickupTimeLabel}
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
                                    src={`https://www.google.com/maps?q=${data.from.name}+to+${data.to.name}&output=embed`}
                                ></iframe>
                            </div>
                        </div>

                        {/* Locations */}
                        <div className="mt-6 space-y-4 text-xs md:text-sm">

                        {/* FROM */}
                        <div className="flex items-start gap-2">
                            <MapPinIcon className="w-4 h-4 mt-1 text-gray-600 flex-shrink-0" />
                            <div>
                            <p className="font-semibold">{data.from.name}</p>
                            <p className="text-gray-600">{data.from.address}</p>
                            </div>
                        </div>

                        {/* TO */}
                        <div className="flex items-start gap-2">
                            <MapPinIcon className="w-4 h-4 mt-1 text-red-500" />
                            <div>
                            <p className="font-semibold text-xs md:text-base">{data.to.name}</p>
                            <p className="text-gray-600 text-xs md:text-sm">{data.to.address}</p>
                            </div>
                        </div>
                        </div>

                        {/* Time + Distance */}
                        <p className="mt-4 text-xs text-gray-600">
                        {data.durationMinutes} minutes • {data.distanceKM} km
                        </p>
                    </div>

                    {/* Vehicle Selection Block */}
                    <div className="mt-6 border border-gray-200 rounded-xl p-4">
                        <div className="flex justify-between">
                            <div>
                            <p className="font-semibold text-xs md:text-sm">{data.selectedVehicle.name}</p>
                            <div className="flex items-center gap-4 mt-3 text-xs text-gray-700">
                                <span className="flex items-center gap-2">
                                  <UsersIcon className="w-5 h-5" /> {data.selectedVehicle.passengers}
                                </span>
                                <span className="flex items-center gap-2">
                                  <BriefcaseIcon className="w-5 h-5" /> {data.selectedVehicle.luggage}
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
                            <div className="p-5 flex justify-between items-start border-b border-gray-200">
                            <div>
                                {/* {data.PickupInfo.bookingFor === "myself" && (
                                  <>
                                    <p className="text-sm text-gray-500">Guest name</p>
                                    <p className="text-xs md:text-sm font-semibold mt-1">Mr. Amjad</p>
                                    <p className="text-xs md:text-sm text-gray-500 mt-4">Contact details</p>
                                    <p className="text-xs md:text-sm font-medium mt-1">
                                    amjad@gmail.com • +94 1232 456 789
                                    </p>
                                  </>
                                )}
                                {data.PickupInfo.bookingFor === "someoneElse" && ( */}
                                  <>
                                    <p className="text-sm text-gray-500">Guest name</p>
                                    <p className="text-xs md:text-sm font-semibold mt-1">{`${data.PickupInfo.title} ${data.PickupInfo.firstName} ${data.PickupInfo.lastName}`}</p>
                                    <p className="text-xs md:text-sm text-gray-500 mt-4">Contact details</p>
                                    <p className="text-xs md:text-sm font-medium mt-1">
                                    {`${data.PickupInfo.email} • +${data.PickupInfo.contactNumber}`}
                                    </p>
                                  </>
                                {/* )} */}
                            </div>

                            <button 
                            onClick={() => router.push("/booking/pickup-info")}
                            className="text-xs font-semibold py-2 px-4 bg-gray-100 hover:bg-gray-200 transition rounded-xl cursor-pointer">Edit</button>
                            </div>

                            {/* Flight Number */}
                            <div className="p-5 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Flight number</p>
                                <p className="text-xs md:text-sm font-semibold mt-1">{data.PickupInfo.flightNumber || "-"}</p>
                            </div>

                            {/* <button className="text-xs font-semibold py-2 px-4 bg-gray-100 hover:bg-gray-200 transition rounded-xl cursor-pointer">Edit</button> */}
                            </div>

                            {/* Pickup Sign */}
                            <div className="px-5 py-2 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Pickup sign</p>
                                <p className="text-xs md:text-sm font-semibold mt-1">{data.PickupInfo.pickupSign || "-"}</p>
                            </div>
                            </div>

                            {/* Notes */}
                            <div className="px-5 py-2 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Notes for the chauffeur</p>
                                <p className="text-xs md:text-sm font-semibold mt-1">{data.PickupInfo.chauffeurNotes || "-"}</p>
                            </div>
                            </div>

                            {/* Reference code */}
                            <div className="px-5 py-2 flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Reference code or cost center</p>
                                <p className="text-xs md:text-sm font-semibold mt-1">{data.PickupInfo.referenceCode || "-"}</p>
                            </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* ===========================
                    RIGHT SECTION — PAYMENT DETAILS
                ============================ */}
                <div className="md:col-span-1">
                    <h2 className="text-lg md:text-xl font-bold mb-4">Payment details</h2>
                    {/* Payment Card */}
                    <div className="border border-gray-200 rounded-xl p-4 space-y-4 mb-3">
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-700">Payment</p>
                            <button 
                            onClick={() => router.push("/booking/payment")}
                            className="text-xs font-semibold py-2 px-4 bg-gray-100 hover:bg-gray-200 transition rounded-xl cursor-pointer">Edit</button>
                        </div>
                        <b className="text-xs md:text-sm font-semibold">{`${data.PickupInfo.title} ${data.PickupInfo.firstName} ${data.PickupInfo.lastName}`}</b>
                        <div className="flex items-center gap-2 text-xs md:text-sm font-medium mt-2">
                            <Image src={visaIcon} alt="Visa" className="h-5 w-auto" />
                            •••• {data.cardData?.last4} ({data.cardData?.brand?.toUpperCase()})
                        </div>
                    </div>
                    {/* Billing info */}
                    <div className="border border-gray-200 rounded-xl p-4 space-y-4 mb-3">
                        <div>
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
                    <div className="border border-gray-200 rounded-xl p-4 space-y-4">
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
                            <span className="font-semibold text-base">{data.payment.totalLabel}</span>
                        </div>
                        </div>
                    </div>

                    {/* Book now button */}
                    <div>
                        <button
                          onClick={booknow}
                          disabled={loading}
                          className="w-full py-3 text-white webBG rounded-md hover:opacity-90 text-sm mt-4 cursor-pointer">
                            {loading ? "Booking..." : "Book now"}
                        </button>
                        {error && (
                          <p className="text-red-500 text-xs mt-2">{error}</p>
                        )}
                        {errors && errors.map((error, i) => (
                          <p key={i} className="text-red-500 text-2xl font-medium mt-2">{error}</p>
                        ))}
                        <p className="text-gray-700 text-xs mt-4">By Booking, Our <a href="" target="_blank" className="font-medium underline text-black">Terms & Conditions</a> apply in their current version</p>
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
