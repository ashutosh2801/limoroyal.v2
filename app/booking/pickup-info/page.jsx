"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { saveSearch } from "@/store/searchSlice";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import Tabs from "../../components/Tabs";
import TripSummary from "../../components/TripSummary";

export default function PickupInfoPage() {
  const router = useRouter();
  const refMsg = useRef(null);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.search);
  const [bookingFor, setBookingFor] = useState("myself");
  const activeStep = 1; // Pickup Info

  const trip = {
    date: new Date(data.pickupDate).toDateString(),
    time: new Date(data.pickupTime).toLocaleTimeString(),
    from: data.from.name,
    to: data.to.name,
    distanceKM: data.distanceKM,
    pickupTimeLabel: data.pickupTimeLabel,
    estimatedTimeLabel: data.estimatedTimeLabel,
    durationMinutes: data.durationMinutes,
  };

  const [form, setForm] = useState({
    bookingFor: "myself",
    title: data?.PickupInfo?.title || "",
    firstName: data?.PickupInfo?.firstName || "",
    lastName: data?.PickupInfo?.lastName || "",
    email: data?.PickupInfo?.email || "",
    contactNumber: data?.PickupInfo?.contactNumber || "",
    flightNumber: data?.PickupInfo?.flightNumber || "",
    pickupSign: data?.PickupInfo?.pickupSign || "",
    chauffeurNotes: data?.PickupInfo?.chauffeurNotes || "",
    referenceCode: data?.PickupInfo?.referenceCode || "",
  });

  const [errors, setErrors] = useState({});

  useEffect(()=>{
      console.log(data);
    }, [data]);

  const validate = () => {
    const newErrors = {};

    //if (bookingFor === "someoneElse") {
      if (!form.title) newErrors.title = "Title is required";
      if (!form.firstName.trim()) newErrors.firstName = "First name is required";
      if (!form.lastName.trim()) newErrors.lastName = "Last name is required";

      if (!form.email) {
        newErrors.email = "Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
        newErrors.email = "Invalid email address";
      }

      if (!form.contactNumber.trim()) {
        newErrors.contactNumber = "Contact number is required";
      }
      else if (form.contactNumber.replace(/\D/g, "").length < 10) {
        newErrors.contactNumber = "Invalid phone number";
      }
    //}

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {

    if (!validate()) {refMsg.current?.scrollIntoView({ behavior: "smooth" }); return;}

    dispatch(
      saveSearch({ 
        ...data, PickupInfo: { ...form }
      })
    );

    router.push("/booking/payment");
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

              {/* Heading */}
              <h2 ref={refMsg} className="mt-6 text-lg md:text-xl font-bold">Pickup Information</h2>
              <small className="text-gray-500 text-[10px] md:text-xs">
                Provide details your chauffeur should know
              </small>

              {/* FORM */}
              <div className="mt-6">

                {/* Booking For */}
                <div className="mb-6">
                  <p className="font-semibold mb-2 text-sm md:text-base">Select Who you are booking for?</p>

                  <div className="flex flex-col gap-4 p-4 border border-gray-200 rounded-xl">
                    <label className="flex items-center gap-2 text-xs md:text-sm">
                      <input
                        type="radio"
                        name="bookingFor"
                        value="myself"
                        checked={form.bookingFor === "myself"}
                        onChange={() => setForm({ ...form, bookingFor: 'myself' })}
                      />
                      Book for myself
                    </label>

                    <label className="flex items-center gap-2 text-xs md:text-sm">
                      <input
                        type="radio"
                        name="bookingFor"
                        value="someoneElse"
                        checked={form.bookingFor === "someoneElse"}
                        onChange={() => setForm({ ...form, bookingFor: 'someoneElse' })}
                      />
                      Book for someone else
                    </label>
                  </div>
                </div>

                {(form.bookingFor === "someoneElse" || form.bookingFor === "myself") && (
                  <div className="mb-6 p-6 border border-gray-200 rounded-xl">
                    <p className="font-semibold mb-2 text-sm md:text-base">Guest Information</p>
                    <div className="grid gap-4">

                      <div className="">
                        <select 
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="w-40 px-3 py-3 text-xs md:text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none">
                          <option value="">Title</option>
                          <option value="Mr.">Mr.</option>
                          <option value="Mrs.">Mrs.</option>
                          <option value="Ms.">Ms.</option>
                          <option value="Dr.">Dr.</option>
                          </select>
                          {errors.title && (
                            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                          )}
                        </div>

                      <div className="flex gap-4">
                        <div>  
                        <input
                          type="text"
                          value={form.firstName}
                          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                          placeholder="First Name"
                          className="w-full px-3 py-3 text-xs md:text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none"
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                          )}
                          </div>

                        <div>

                        <input
                          type="text"
                          value={form.lastName}
                          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                          placeholder="Last Name"
                          className="w-full px-3 py-3 text-xs md:text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none"
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                          )}
                          </div>
                      </div>

                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="Email Address"
                        className="w-full px-3 py-3 text-xs md:text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none"
                      />
                      {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                          )}

                      {/* <input
                        type="text"
                        value={form.contactNumber}
                        onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
                        placeholder="Contact Number"
                        className="w-full px-3 py-3 text-xs md:text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none"
                      /> */}
                      <PhoneInput
                        country={"ca"}
                        value={form.contactNumber}
                        onChange={(phone) =>
                          setForm({ ...form, contactNumber: phone })
                        }
                        inputClass="!w-full !py-6 !pr-3 !pl-12 !text-xs md:!text-sm !border !rounded-xl !bg-gray-100 !border-gray-200 focus:!outline-none"
                        buttonClass="!border-none !bg-transparent"
                        containerClass="!w-full"
                        placeholder="Contact Number"
                      />
                      {errors.contactNumber && (
                            <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>
                          )}

                    </div>
                  </div>
                )}

                {/* Additional Info */}
                <div className="mb-2">
                  <p className="font-semibold text-sm md:text-base">Additional information</p>
                  <small className="text-gray-500 text-[10px] md:text-xs">
                    Enter your flight number to ensure your chauffeur can track your flight and adjust the pickup time.
                  </small>
                  <div className="mt-2 p-4 border border-gray-200 rounded-xl">
                    <input
                      type="text"
                      value={form.flightNumber}
                      onChange={(e) => setForm({ ...form, flightNumber: e.target.value })}
                      placeholder="Flight number"
                      className="w-full px-3 py-3 text-xs md:text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="mt-3 p-4 border border-gray-200 rounded-xl">
                  <div className="mb-3">
                    <input
                      type="text"
                      value={form.pickupSign}
                      onChange={(e) => setForm({ ...form, pickupSign: e.target.value })}
                      placeholder="Pickup Sign"
                      className="w-full px-3 py-3 text-xs md:text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none"
                    />
                    <small className="text-gray-500 text-[10px] md:text-xs">It will appear on your chauffeur's pickup sign when they meet you.</small>
                  </div>
                  <div className="mb-3">
                    <textarea
                      type="text"
                      value={form.chauffeurNotes}
                      onChange={(e) => setForm({ ...form, chauffeurNotes: e.target.value })}
                      placeholder="Notes for the chauffeur"
                      className="w-full px-3 py-3 text-xs md:text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none min-h-25"
                    ></textarea>
                    <small className="text-gray-500 text-[10px] md:text-xs">Add special requests, e.g. number of bags, child seats, etc. please do not include confidential information.</small>
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={form.referenceCode}
                      onChange={(e) => setForm({ ...form, referenceCode: e.target.value })}
                      placeholder="Reference code or cost center"
                      className="w-full px-3 py-3 text-xs md:text-sm border rounded-xl bg-gray-100 border-gray-200 focus:outline-none"
                    />
                    <small className="text-gray-500 text-[10px] md:text-xs">Booking for business? what you enter above will appear on the invoice.</small>
                  </div>
                </div>
              </div>

              {/* Continue button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleContinue}
                  className="py-3 px-10 rounded-md font-medium text-white webBG hover:opacity-90 cursor-pointer text-sm md:text-base w-full md:w-auto"
                >
                  Continue to Payment
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* INLINE CSS (copied from Booking) */}
        <>
          <style jsx global>{`
            nav div.header {
              background: #0a0a0a;
              margin-top: 0;
              padding-top: 10px;
            }
          `}</style>
        </>
      </div>
    </div>
  );
}
