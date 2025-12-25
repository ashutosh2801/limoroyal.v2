"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ExclamationCircleIcon,
  CheckCircleIcon
} from "@heroicons/react/24/solid";
import payment from '../../../public/assets/payment.png'
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { saveSearch } from "@/store/searchSlice";
import Tabs from "../../components/Tabs";
import TripSummary from "../../components/TripSummary";

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

  useEffect(()=>{
    console.log(data);
  }, [data]);

  if (!data || !data.selectedVehicle) return null;

  const stripeStyle = {
    style: {
      base: {
        fontSize: "14px",
        color: "#000",
        "::placeholder": { color: "#9ca3af" },
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
    from: data.from.name,
    to: data.to?.name || "",
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
      // 1️⃣ Create SetupIntent
      const res = await fetch("/api/create-setup-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nameOnCard, email: data?.PickupInfo?.email }),
      });

      const { clientSecret, customerId } = await res.json();

      const cardNumberElement = elements.getElement(CardNumberElement);

      console.log("SetupIntent client secret:", clientSecret);
      console.log("Customer ID:", customerId);

      // 2️⃣ Confirm card setup (SAVE CARD)
      const result = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: nameOnCard,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        setProcessing(false);
        return;
      }

      // 3️⃣ Saved payment method ID
      const paymentMethodId = result.setupIntent.payment_method;
      
      // 4️⃣ Fetch card details from backend
      const pmRes = await fetch("/api/get-payment-method", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethodId }),
      });

      const card = await pmRes.json();

      const cardData = {
        paymentMethodId,
        nameOnCard,
        brand: card?.brand,
        last4: card?.last4,
        saveCard
      };

      dispatch(
        saveSearch({...data, paymentType: "card", 'stripeCustomerId': customerId, cardData })
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
        <div className="max-w-4xl mx-auto px-5 mt-30 md:mt-40">
          <div className="bg-white rounded-md shadow-xl overflow-hidden text-black">
            <div className="p-6 md:p-8">

                {/* Blacklane Stepper */}
                <Tabs activeStep={activeStep} />              

                {/* Trip summary (date,time,from,to) */}
                <TripSummary trip={trip} />

                {/* --- Payment Form --- */}
                {/* <h2 className="mt-7 text-lg md:text-xl font-bold">Add credit or debit card</h2> */}

                <h2 className="mt-7 text-lg md:text-xl font-bold">
                  Choose an option
                </h2>

                <div className="mt-4 space-y-3">
                  <label className="flex items-center gap-3 border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-black">
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

                  <label className="flex items-center gap-3 border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-black">
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
                <div className="mt-4 space-y-4 border border-gray-200 rounded-xl p-5">

                    {/* Name on card */}
                    <div className="flex flex-col">
                    <label className="text-gray-700 text-xs md:text-sm font-semibold mb-1">Name on card *</label>
                    <input
                        type="text"
                        className="w-full px-3 py-3 text-xs md:text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none"
                        value={nameOnCard}
                        placeholder="Name on card"
                        onChange={(e) => setNameOnCard(e.target.value)}
                    />
                    
                    </div>

                    {/* Card number */}
                    <div className="flex flex-col">
                    <label className="text-gray-700 text-xs md:text-sm font-semibold mb-1">Card number *</label>
                    <div className="relative">
                        <div className="px-3 py-3 border rounded-xl bg-gray-100 border-gray-200">
                          <CardNumberElement options={stripeStyle} />
                        </div>
                        {/* <input
                        type="number"
                        className="w-full px-3 py-3 text-xs md:text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        /> */}
                        <div className="absolute right-2 top-4 md:top-3">
                        <Image
                            src={payment}
                            alt="Payment"
                            className="object-contain h-3 md:h-5 w-auto"
                        />
                        </div>
                    </div>
                    </div>

                    {/* Expiry & CVV */}
                    <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="text-gray-700 text-xs md:text-sm font-semibold mb-1">
                        Expiration date *
                        </label>
                        {/* <input
                        type="number"
                        placeholder="MM/YY"
                        className="w-full px-3 py-3 text-xs md:text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        /> */}
                        <div className="px-3 py-3 border rounded-xl bg-gray-100 border-gray-200">
                    <CardExpiryElement options={stripeStyle} />
                  </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 text-xs md:text-sm font-semibold mb-1">CVV *</label>
                        {/* <input
                        type="number"
                        className="w-full px-3 py-3 text-xs md:text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none"
                        value={cvv}
                        onChange={(e) => setCVV(e.target.value)}
                        /> */}
                        <div className="px-3 py-3 border rounded-xl bg-gray-100 border-gray-200">
                    <CardCvcElement options={stripeStyle} />
                  </div>
                    </div>
                    </div>

                    {/* ERROR */}
                    {error && (
                        <p className="text-red-500 text-xs mb-4">{error}</p>
                    )}

                    {/* Save card */}
                    <label className="flex items-center gap-1 text-xs md:text-sm text-gray-700 mt-4 cursor-pointer">
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
                        <div className="p-4">
                            <p className="text-gray-700 text-xs md:text-sm py-2 flex items-center items-start"> <CheckCircleIcon className="h-5 w-5 text-gray-600 mr-1 flex-shrink-0" /> Our Servers are encrypted with TLS/SSL to ensure security and privacy.</p>
                        </div>
                        <hr className="border-t border-gray-200" />
                        <div className="p-4">
                            <p className="text-gray-700 text-xs md:text-sm py-2 flex items-center items-start"> <ExclamationCircleIcon className="h-5 w-5 text-gray-600 mr-1 flex-shrink-0" /> The amount will be held from your selected payment method after the booking, We only charge you after the ride is finished.</p>
                        </div>
                    </div>
                </div> 

                {/* Continue button */}
                <div className="mt-6 flex justify-end">
                {/* <button
                    onClick={handlePayment}
                    disabled={processing}
                    className={`py-3 px-10 rounded-md font-medium text-white webBG hover:opacity-90 cursor-pointer text-sm md:text-base w-full md:w-auto ${
                    processing
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:opacity-90"
                    }`}
                    >
                        {processing
                    ? "Processing..."
                    : `Proceed to Checkout`}
                        
                    </button> */}
                    <button
  onClick={handlePayment}
  disabled={processing}
  className={`py-3 px-10 rounded-md font-medium text-white webBG hover:opacity-90 cursor-pointer text-sm md:text-base w-full md:w-auto ${
    processing ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
  }`}
>
  {processing
    ? "Processing..."
    : paymentOption === "card"
    ? "Proceed to Checkout"
    : "Get a Quote"}
</button>
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
