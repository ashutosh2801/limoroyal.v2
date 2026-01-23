"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  Squares2X2Icon,
  ChevronDownIcon
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
  
  const { data } = useSelector((s) => s.search);
  if (!data || Object.keys(data).length === 0) {
    router.push("/");
    return;
  }

  const hasReturnTrip = Boolean(data?.PickupInfo?.returnTrip);
  const activeStep = hasReturnTrip ? 4 : 2;

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

                <div className="bg-white rounded-md shadow-xl overflow-hidden text-black px-4 py-4 mb-4">
                  <div
                    className="flex justify-between items-center cursor-pointer border-b border-gray-200 pb-1"
                    onClick={() => toggleCollapse("booking")}
                  >
                    <h4 className="text-sm xl:text-lg font-bold">
                      Booking Summary
                    </h4>
                    <span className="flex items-center">
                      <ChevronDownIcon
                        className={`w-5 h-5 transition-transform duration-300 ${
                          collapse.booking ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </div>   
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      collapse.booking ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <Locations data={data} seats={data.seats} display="" />
                  </div>
                </div>

                {data.returnData && (
                  <div className="bg-white rounded-md shadow-xl overflow-hidden text-black px-4 py-4 mb-4">
                    <div
                      className="flex justify-between items-center cursor-pointer border-b border-gray-200 pb-1"
                      onClick={() => toggleCollapse("returnBooking")}
                    >
                      <h4 className="text-sm xl:text-lg font-bold">
                        Return Trip Booking Summary
                      </h4>
                      <span className="flex items-center">
                        <ChevronDownIcon
                          className={`w-5 h-5 transition-transform duration-300 ${
                            collapse.returnBooking ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        collapse.returnBooking ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <Locations data={data.returnData} display="" />
                    </div>
                  </div>
                )}

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
              
            </div>
            </div>
            <div className="w-full md:w-2/3 order-1 md:order-2">
              <div className="bg-white rounded-md shadow-xl overflow-hidden text-black mb-5 md:mb-0">
                <div className="p-4 xl:p-8">

                    {/* Blacklane Stepper */}
                    <Tabs activeStep={activeStep} hasReturnTrip={hasReturnTrip} />             

                    {/* Vehicles grid */} 
                    {/* <VehiclesGrid />                       */}

                    {/* --- Payment Form --- */}
                    {/* <h2 className="mt-7 text-lg md:text-xl font-bold">Add credit or debit card</h2> */}

                    <h2 className="mt-7 text-lg xl:text-xl font-bold">
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
                          <p className="font-semibold text-sm xl:text-base">
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
                          <p className="font-semibold text-sm xl:text-base">
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
                                  : "top-3 text-[12px] xl:text-sm peer-focus:top-2 peer-focus:text-xs"
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
                                  : "top-2 text-[12px] xl:text-sm"
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
                                    : "top-2 text-[12px] xl:text-sm"
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
                                    : "top-2 text-[12px] xl:text-sm"
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
                            <div className="p-3 xl:p-4">
                                <p className="text-gray-700 text-xs xl:text-sm py-2 flex items-center items-start"> <CheckCircleIcon className="h-5 w-5 text-gray-600 mr-1 flex-shrink-0" /> Our Servers are encrypted with TLS/SSL to ensure security and privacy.</p>
                            </div>
                            <hr className="border-t border-gray-200" />
                            <div className="p-3 md:p-4">
                                <p className="text-gray-700 text-xs xl:text-sm py-2 flex items-center items-start"> <ExclamationCircleIcon className="h-5 w-5 text-gray-600 mr-1 flex-shrink-0" /> The amount will be held from your selected payment method after the booking, We only charge you after the ride is finished.</p>
                            </div>
                        </div>
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
                      <button
                        onClick={handlePayment}
                        disabled={processing}
                        className={`flex py-3 px-3 xl:px-10 rounded-md font-medium text-white webBG hover:opacity-90 cursor-pointer text-xs xl:text-base w-auto ${
                          processing ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
                        }`}
                      >
                        {processing
                            ? "Processing..."
                            : paymentOption === "card"
                            ? "Proceed to Checkout"
                            : "Get a Quote"}
                        <FaChevronRight className="text-white text-xs xl:text-sm ml-1 mt-[2px] xl:mt-1" />
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
