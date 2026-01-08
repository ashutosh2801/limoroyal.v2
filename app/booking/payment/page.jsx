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
  Squares2X2Icon
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
import Tabs from "../../components/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { saveSearch } from "@/store/searchSlice";
import { createSetupIntent, getPaymentMethod } from "../../lib/externalApi";
import { loadStripe } from "@stripe/stripe-js";

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
      dispatch(
        saveSearch({
          ...data,
          paymentType: "quote",
        })
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

      dispatch(
        saveSearch({
          ...data, 
          paymentType: "card", 
          stripeCustomerId: customerId, 
          cardData 
        })
      );

      console.log("Saved data:", data);

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
          <div className="flex flex-col md:flex-row space-x-5 pt-[90px] md:pt-[20px] xl:pt-0 mt-0 md:mt-20 xl:mt-40">
            <div className="w-full md:w-1/3 order-2 md:order-1">
            <div className="sticky top-5 z-50">
              <div className="bg-white rounded-md shadow-xl overflow-hidden text-black px-4 py-4">
                <div>
                  <h4 className="mb-4 text-sm xl:text-lg font-bold border-b border-gray-200 pb-1">Booking Summary</h4>
                </div>
                <div className="relative">
                  {/* Vertical connector */}
                  {data.to && (
                    <div className="absolute left-[9px] top-[19px] h-[calc(100%-55px)] xl:h-[calc(100%-40px)] border-r-3 border-dotted border-black" />
                  )}

                  {/* FROM */}
                  <div className="flex items-start gap-3 text-xs xl:text-sm mb-3 relative z-10">
                    <MapPinIcon className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold line-clamp-1">{data.from.name}</p>
                      <p className="text-gray-600">{data.from.address}</p>
                    </div>
                  </div>

                  {/* STOP */}
                  <div className="flex items-start gap-3 text-xs xl:text-sm mb-3 relative z-10">
                    <Squares2X2Icon className="w-5 h-5 text-yellow-900 flex-shrink-0" />
                    <div>
                      <p className="font-semibold line-clamp-1">{data.from.name}</p>
                      <p className="text-gray-600">{data.from.address}</p>
                    </div>
                  </div>

                  {/* TO */}
                  {data.to && (
                    <div className="flex items-start gap-3 text-xs xl:text-sm relative z-10">
                      <MapPinIcon className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">{data.to?.name}</p>
                        <p className="text-gray-600">{data.to?.address}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs xl:text-sm text-gray-600 mt-3">
                    <CalendarDaysIcon className="w-5 h-5 text-gray-600" />
                    <span>{trip.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs xl:text-sm text-gray-600 mt-3">
                    <ClockIcon className="w-5 h-5 text-gray-600" />
                    <span>{trip.pickupTimeLabel}</span>
                  </div>
                  {data.selectedPassenger > 0 && (
                  <div className="flex items-center gap-2 text-xs xl:text-sm text-gray-600 mt-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 webColor">
                      <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0Z" clipRule="evenodd"></path>
                      <path d="M6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"></path>
                    </svg>
                    <span>{data.selectedPassenger} Passenger(s)</span>
                  </div>
                  )}
                  {data.selectedLuggage > 0 && (
                  <div className="flex items-center gap-2 text-xs xl:text-sm text-gray-600 mt-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 webColor">
                      <path fillRule="evenodd" d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd"></path>
                      <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z"></path>
                    </svg>
                    <span>{data.selectedLuggage} Luggage(s)</span>
                  </div>
                  )}
                </div>
              </div>
              {/* Price breakdown */}
              <div className="bg-white rounded-md shadow-xl overflow-hidden text-black px-4 py-4 mt-5">
                  <h2 className="mb-4 text-sm xl:text-lg font-bold border-b border-gray-200 pb-1">Price breakdown</h2>
                  <div className="text-xs xl:text-sm">
                    <div className="flex justify-between py-1">
                        <span className="text-gray-700">Price excl. tax</span>
                        <span>{data.payment?.subTotalLabel}</span>
                    </div>

                    <div className="flex justify-between py-1">
                        <span className="text-gray-700">Estimated tax</span>
                        <span>{data.payment?.taxLabel}</span>
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
                        <span className="font-bold text-lg">{data.payment?.totalLabel}</span>
                    </div>
                  </div>
              </div>
            </div>
            </div>
            <div className="w-full md:w-2/3 order-1 md:order-2">
              <div className="bg-white rounded-md shadow-xl overflow-hidden text-black mb-5 md:mb-0">
                <div className="p-4 xl:p-8">

                    {/* Blacklane Stepper */}
                    <Tabs activeStep={activeStep} />              

                    {/* Trip summary (date,time,from,to) */}
                    {/* <TripSummary trip={trip} /> */}

                    {/* Vehicles grid */}                  
                    <div role="button"                          
                      className="w-full relative md:flex md:items-center flex-wrap gap-4 p-4 mt-2 rounded-xl text-left transition-shadow border bg-amber-50"
                    >
                      {/* left: image */}
                      <div className="flex w-[30%] h-10 md:w-35 md:h-15 xl:w-42 xl:h-20 relative items-center mb-0">
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
                            <div className="font-semibold text-xs md:text-sm xl:text-xl mt-3 mb-2">{data.selectedVehicle?.name}</div>
                            <div className="text-xs text-gray-600 my-1 hidden md:block" dangerouslySetInnerHTML={{ __html: data.selectedVehicle?.desc }} />
                          </div>
  
                          {/* price */}
                          <div className="md:text-right w-full md:w-70 xl:w-40 mt-0 md:mt-2">
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
                            <div className="text-sm md:text-lg xl:text-2xl font-bold my-1">{data.payment?.subTotalLabel}</div>
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
                        <label className="flex items-center gap-1 text-xs xl:text-sm text-gray-700 mt-4 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={saveCard}
                            onChange={() => setSaveCard(!saveCard)}
                            className="w-4 h-4"
                        />
                        Save card to your list
                        </label>
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
