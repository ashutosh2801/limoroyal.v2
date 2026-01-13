"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  ExclamationCircleIcon,
  CheckCircleIcon
} from "@heroicons/react/24/solid";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import payment from '../../../public/assets/payment.png'
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Tabs from "@/app/components/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { saveSearch } from "@/store/searchSlice";
import { createSetupIntent, getPaymentMethod } from "@/app/lib/externalApi";
import { loadStripe } from "@stripe/stripe-js";
import PriceBreakdown from "@/app/components/PriceBreakdown";
import VehiclesGrid from "@/app/components/VehiclesGrid";
import Locations from "../../components/Locations";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_KEY
);

function PaymentForm() {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const activeStep = 2; // Payment step

  const { data } = useSelector((s) => s.search);
  if (!data || Object.keys(data).length === 0) {
    router.push("/");
    return;
  }

  const [paymentOption, setPaymentOption] = useState("card");
  const [nameOnCard, setNameOnCard] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [saveCard, setSaveCard] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cardFocused, setCardFocused] = useState(false);
  const [cardExpiry, setCardExpiry] = useState("");
  const [expiryFocused, setExpiryFocused] = useState(false);
  const [cardCvc, setCardCvc] = useState("");
  const [cvcFocused, setCvcFocused] = useState(false);

  useEffect(()=>{
    console.log(data);
  }, [data]);

  if (!data || !data.selectedVehicle) {
    router.push("/booknow");
    return null;
  }

  const stripeStyle = {
    style: {
      base: {
        fontSize: "14px",
        color: "#000",
        "::placeholder": { 
          color: "#6a7282", 
          fontSize: "12px"
        },
      },
      invalid: {
        color: "#dc2626",
      },
    },
  };

  // Trip data (should match previous pages)
  const trip = {
    date: new Date(data.pickupDate).toDateString(),
    time: new Date(data.pickupTime).toLocaleTimeString(),
    from: data.from,
    to: data.to || "",
    distanceKM: data.distanceKM || "",
    distanceKM: data.distanceKM,
    pickupTimeLabel: data.pickupTimeLabel,
    estimatedTimeLabel: data.estimatedTimeLabel,
    durationMinutes: data.tripType == 'oneway' ? data.durationMinutes : data.duration,
    tripType: data.tripType,
    duration: data.duration || ""
  };

  useEffect(()=>{
    setNameOnCard(data?.cardData?.nameOnCard || "");
    setPaymentOption(data?.paymentType || "card")
  }, [data]);

  const handlePayment = async () => {

    if (paymentOption === "quote") {
      const saveData = {
        ...data,
        paymentType: "quote",
      };
      dispatch(
        saveSearch(saveData)
      );

      router.push("/booking/checkout");
      return;
    }


    if (!stripe || !elements) return;

    if (!nameOnCard.trim()) {
      setError("Name on card is required");
      return;
    }

    setProcessing(true);
    setError("");

    try {
      // 🔹 1. CREATE SETUP INTENT (EXTERNAL API)
      const { clientSecret, customerId } = await createSetupIntent({
        name: nameOnCard,
        email: data?.PickupInfo?.email,
      });

      const cardElement = elements.getElement(CardNumberElement);

      // 🔹 2. CONFIRM CARD SETUP (STRIPE.JS)
      const result = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: nameOnCard },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setProcessing(false);
        return;
      }

      const paymentMethodId = result.setupIntent.payment_method;

      // 🔹 3. FETCH CARD DETAILS (EXTERNAL API)
      const card = await getPaymentMethod(paymentMethodId);

      const cardData = {
        paymentMethodId,
        nameOnCard,
        brand: card?.brand,
        last4: card?.last4,
        saveCard
      };

      const saveData = {
          ...data, 
          paymentType: "card", 
          stripeCustomerId: customerId, 
          cardData 
        };

      dispatch(
        saveSearch(saveData)
      );

      console.log("Saved data:", saveData);

      // 👉 Save paymentMethodId to your DB
      setSuccess(true);
      setProcessing(false);

      router.push("/booking/checkout");
    } catch (err) {
      console.error("Payment error:", err);
      setError("Failed to save card");
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="py-10 border-b webBorderColor">
        <div className="container mx-auto px-2">
          <div className="flex flex-col md:flex-row space-x-5 pt-[80px] md:pt-0 mt-0 md:mt-40">
            <div className="w-full md:w-1/3 order-2 md:order-1">
            <div className="sticky top-5 z-50">
              <div className="bg-white rounded-md shadow-xl overflow-hidden text-black px-4 py-4 mb-4">
                <div>
                  <h4 className="mb-4 text-sm md:text-lg font-bold border-b border-gray-200 pb-1">Booking Summary</h4>
                </div>
                
                <Locations data={data} seats={data.seats} display="" />

              </div>

              <div className="bg-white rounded-md shadow-xl overflow-hidden text-black p-1 mb-4">
                  {/* <div className="h-80 w-full rounded-xl overflow-hidden">
                    <RouteMap />                     
                  </div> */}
                  <div className="mt-4 mb-2 text-xs md:text-sm text-gray-600 flex gap-5 px-3"> 
                    {data.distanceKM && (<p className="flex gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M10.8 16C12.7882 16 14.4 14.3882 14.4 12.4L14.4 3.2L15.2 3.2C15.5235 3.2 15.8153 3.00512 15.9391 2.70616C16.0629 2.4072 15.9945 2.06312 15.7657 1.83432L14.1657 0.23432C13.8532 -0.0780794 13.3467 -0.0780795 13.0343 0.23432L11.4343 1.83432C11.2055 2.06312 11.137 2.4072 11.2609 2.70616C11.3847 3.00512 11.6764 3.2 12 3.2L12.8 3.2L12.8 12.4C12.8 13.5046 11.9045 14.4 10.8 14.4C9.69541 14.4 8.8 13.5046 8.8 12.4L8.8 3.6C8.8 1.61176 7.18824 -7.70349e-07 5.2 -9.44166e-07C3.21176 -1.11798e-06 1.6 1.61176 1.6 3.6L1.6 11.3366C0.667839 11.666 -1.60618e-06 12.555 -1.69753e-06 13.6C-1.81341e-06 14.9255 1.07448 16 2.4 16C3.72552 16 4.8 14.9255 4.8 13.6C4.8 12.555 4.13216 11.666 3.2 11.3366L3.2 3.6C3.2 2.49544 4.09544 1.6 5.2 1.6C6.30456 1.6 7.2 2.49544 7.2 3.6L7.2 12.4C7.2 14.3882 8.81176 16 10.8 16Z"></path></svg> {trip.distanceKM} km
                    </p>)}
                    <p className="flex gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M10.3904 10.0572C10.1976 10.0572 10.0145 10.003 9.86024 9.89458L7.46988 8.21386C7.24819 8.06024 7.11325 7.80723 7.11325 7.54518V4.18373C7.11325 3.72289 7.50843 3.35241 8 3.35241C8.49157 3.35241 8.88675 3.72289 8.88675 4.18373V7.12952L10.9205 8.55723C11.1133 8.69277 11.2289 8.88253 11.2675 9.10843C11.2964 9.3253 11.2386 9.5512 11.094 9.72289C10.9301 9.93072 10.6699 10.0572 10.3807 10.0572H10.3904Z"></path><path d="M8 15C3.58554 15 0 11.6386 0 7.5C0 3.36145 3.58554 0 8 0C12.4145 0 16 3.36145 16 7.5C16 11.6386 12.4145 15 8 15ZM8 1.66265C4.56867 1.66265 1.77349 4.28313 1.77349 7.5C1.77349 10.7169 4.56867 13.3373 8 13.3373C11.4313 13.3373 14.2265 10.7169 14.2265 7.5C14.2265 4.28313 11.4313 1.66265 8 1.66265Z"></path></svg>
                      {data.durationMinutes}
                    </p>
                  </div>
                </div>

              {/* Price breakdown */}
              <PriceBreakdown paymentData={data.payment} /> 

              
            </div>
            </div>
            <div className="w-full md:w-2/3 order-1 md:order-2">
              <div className="bg-white rounded-md shadow-xl overflow-hidden text-black mb-5 md:mb-0">
                <div className="p-4 md:p-8">

                    {/* Blacklane Stepper */}
                    <Tabs activeStep={activeStep} />              

                    {/* Vehicles grid */} 
                    {/* <VehiclesGrid />                       */}

                    {/* --- Payment Form --- */}
                    {/* <h2 className="mt-7 text-lg md:text-xl font-bold">Add credit or debit card</h2> */}

                    <h2 className="mt-7 text-lg md:text-xl font-bold">
                      Choose an option
                    </h2>

                    <div className="mt-4 space-y-3">
                      <label className="flex items-center gap-3 border border-gray-200 rounded-xl p-3 md:p-4 cursor-pointer hover:border-black">
                        <input
                          type="radio"
                          name="paymentOption"
                          value="card"
                          checked={paymentOption === "card"}
                          onChange={() => setPaymentOption("card")}
                          className="w-4 h-4"
                        />
                        <div>
                          <p className="font-semibold text-sm md:text-base">
                            Add credit or debit card
                          </p>
                          <p className="text-xs text-gray-500">
                            Secure card verification. Pay after the ride.
                          </p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 border border-gray-200 rounded-xl p-3 md:p-4 cursor-pointer hover:border-black">
                        <input
                          type="radio"
                          name="paymentOption"
                          value="quote"
                          checked={paymentOption === "quote"}
                          onChange={() => setPaymentOption("quote")}
                          className="w-4 h-4"
                        />
                        <div>
                          <p className="font-semibold text-sm md:text-base">
                            Get a Quote
                          </p>
                          <p className="text-xs text-gray-500">
                            No card required. Receive pricing via email.
                          </p>
                        </div>
                      </label>
                    </div>

                    {paymentOption === "card" && (
                    <div className="mt-4 space-y-4 border border-gray-200 rounded-xl p-3 md:p-5">

                        {/* Name on card */}
                        <div className="flex flex-col">
                          <div className="relative w-full">
                            {/* Input */}
                            <input
                              type="text"
                              value={nameOnCard}
                              onChange={(e) => setNameOnCard(e.target.value)}
                              placeholder=" "
                              className="peer w-full px-3 pt-6 pb-2 text-xs md:text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none"
                            />

                            {/* Floating Label */}
                            <label
                              className={`absolute left-3 text-gray-400 pointer-events-none transition-all duration-200 ${
                                nameOnCard
                                  ? "top-2 text-xs"
                                  : "top-3 text-[12px] md:text-sm peer-focus:top-2 peer-focus:text-xs"
                              }`}
                            >
                              Name on card *
                            </label>

                            {/* Helper text */}
                            {!nameOnCard && (
                              <span className="hidden md:block pointer-events-none absolute left-3 top-8 text-[12px] text-gray-500 transition-opacity peer-focus:opacity-0">
                                Enter the name exactly as shown on your card
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card number */}
                        <div className="flex flex-col relative w-full">
                          <div className="relative">
                            <div
                              className="pl-3 md:pr-40 pt-6 pb-3 border rounded-xl bg-gray-100 border-gray-200"
                              onFocus={() => setCardFocused(true)}
                              onBlur={() => setCardFocused(false)}
                            >
                              <CardNumberElement
                                options={stripeStyle}
                                onChange={(e) => setCardNumber(e.value)}
                                onFocus={() => setCardFocused(true)}
                                onBlur={() => setCardFocused(false)}
                              />
                            </div>

                            {/* Floating Label */}
                            <label
                              className={`absolute left-3 text-gray-400 pointer-events-none transition-all duration-200 ${
                                cardNumber || cardFocused
                                  ? "top-1 text-xs"
                                  : "top-2 text-[12px] md:text-sm"
                              }`}
                            >
                              Card Number *
                            </label>

                            {/* Payment Icon */}
                            <div className="absolute right-2 top-3 md:top-6">
                              <Image
                                src={payment}
                                alt="Payment"
                                className="object-contain h-3 md:h-5 w-auto"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Expiry & CVV */}
                        <div className="grid md:grid-cols-2 gap-4">
                          {/* Expiration Date */}
                          <div className="flex flex-col relative w-full">
                            <div className="relative">
                              <div
                                className="pl-3 pr-20 pt-6 pb-2 border rounded-xl bg-gray-100 border-gray-200"
                                onFocus={() => setExpiryFocused(true)}
                                onBlur={() => setExpiryFocused(false)}
                              >
                                <CardExpiryElement
                                  options={stripeStyle}
                                  onChange={(e) => setCardExpiry(e.value)}
                                  onFocus={() => setExpiryFocused(true)}
                                  onBlur={() => setExpiryFocused(false)}
                                />
                              </div>

                              {/* Floating Label */}
                              <label
                                className={`absolute left-3 text-gray-400 pointer-events-none transition-all duration-200 ${
                                  cardExpiry || expiryFocused
                                    ? "top-1 text-xs"
                                    : "top-2 text-[12px] md:text-sm"
                                }`}
                              >
                                Expiration Date *
                              </label>
                            </div>
                          </div>

                          {/* CVV */}
                          <div className="flex flex-col relative w-full">
                            <div className="relative">
                              <div
                                className="pl-3 pr-20 pt-6 pb-2 border rounded-xl bg-gray-100 border-gray-200"
                                onFocus={() => setCvcFocused(true)}
                                onBlur={() => setCvcFocused(false)}
                              >
                                <CardCvcElement
                                  options={stripeStyle}
                                  onChange={(e) => setCardCvc(e.value)}
                                  onFocus={() => setCvcFocused(true)}
                                  onBlur={() => setCvcFocused(false)}
                                />
                              </div>

                              {/* Floating Label */}
                              <label
                                className={`absolute left-3 text-gray-400 pointer-events-none transition-all duration-200 ${
                                  cardCvc || cvcFocused
                                    ? "top-1 text-xs"
                                    : "top-2 text-[12px] md:text-sm"
                                }`}
                              >
                                CVV *
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* ERROR */}
                        {error && (
                            <p className="text-red-500 text-xs mb-4">{error}</p>
                        )}

                        {/* Save card */}
                      <div className="flex gap-2">                        

                        {/* Toggle */}
                        <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value="1"
                          checked={saveCard}
                          onChange={() => setSaveCard(!saveCard)}
                          className="sr-only peer"
                        />
                        <div className="w-10 h-6 bg-gray-300 peer-checked:bg-yellow-600 rounded-full after:content-[] after:absolute after:top-1 after:left-1 after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-all peer-checked:after:translate-x-4" />
                        </label>

                        <div className="flex items-center gap-2 md:w-[260px]">
                          
                          <span className="text-sm font-medium">
                              Save card to your list
                          </span>
                        </div>
                      </div>
                        
                    </div>
                    )}

                    <div className="mt-5">
                        <div className="border border-gray-200 rounded-xl">
                            <div className="p-3 md:p-4">
                                <p className="text-gray-700 text-xs md:text-sm py-2 flex items-center items-start"> <CheckCircleIcon className="h-5 w-5 text-gray-600 mr-1 flex-shrink-0" /> Our Servers are encrypted with TLS/SSL to ensure security and privacy.</p>
                            </div>
                            <hr className="border-t border-gray-200" />
                            <div className="p-3 md:p-4">
                                <p className="text-gray-700 text-xs md:text-sm py-2 flex items-center items-start"> <ExclamationCircleIcon className="h-5 w-5 text-gray-600 mr-1 flex-shrink-0" /> The amount will be held from your selected payment method after the booking, We only charge you after the ride is finished.</p>
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
                      <button
                        onClick={handlePayment}
                        disabled={processing}
                        className={`flex py-3 px-3 md:px-10 rounded-md font-medium text-white webBG hover:opacity-90 cursor-pointer text-xs md:text-base w-auto ${
                          processing ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
                        }`}
                      >
                        {processing
                            ? "Processing..."
                            : paymentOption === "card"
                            ? "Proceed to Checkout"
                            : "Get a Quote"}
                        <FaChevronRight className="text-white text-sm ml-1 md:mt-1" />
                      </button>
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


/* ---------------- WRAPPER ---------------- */

export default function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}
