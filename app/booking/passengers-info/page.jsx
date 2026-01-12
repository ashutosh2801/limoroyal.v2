"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CalendarDaysIcon,
  ClockIcon,
  ArrowPathIcon,
  MapPinIcon,
  Squares2X2Icon
} from "@heroicons/react/24/solid";
import {
  CheckCircleIcon as CheckCircleOutlineIcon,
} from "@heroicons/react/24/outline";
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaPlane } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { saveSearch } from "@/store/searchSlice";
import { getPickupData } from "@/app/lib/externalApi";
import { showAlert } from "@/app/lib/alert";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import Tabs from "@/app/components/Tabs";
import TripSummary from "@/app/components/TripSummary";
import RouteMap from "@/app/components/RouteMap";
import VehiclesGrid from "@/app/components/VehiclesGrid";
import ReturnTrip from "@/app/components/RetrunTrip";
import PriceBreakdown from "@/app/components/PriceBreakdown";
import Locations from "@/app/components/Locations";

export default function PickupInfoPage() {
  const router = useRouter();
  const refMsg = useRef(null);
  const dispatch = useDispatch();
  const activeStep = 1; // Pickup Info
  const { data } = useSelector((state) => state.search);

  const requiredSeats = data?.requiredSeats || 2; // dynamic (2 or 3)
  const childCost = data?.childCost || 25;
  const [seats, setSeats] = useState({
    infant: data?.seats?.infant || 0,
    toddler: data?.seats?.toddler || 0,
    booster: data?.seats?.booster || 0,
  });
  const totalSelected = seats.infant + seats.toddler + seats.booster;

  const [payment, setPayment] = useState({
    subTotalPrice: data.payment?.subTotalPrice || 0,
    taxPrice: data.payment?.taxPrice || 0,
    totalPrice: data.payment?.totalPrice || 0,
    childPrice: data.payment?.childPrice || 0,

    subTotalLabel: `${data.payment?.subTotalLabel}`,
    taxLabel: `${data.payment?.taxLabel}`,
    totalLabel: `${data.payment?.totalLabel}`,
    childLabel: `${data.payment?.childLabel || 0}`,
    
    childSeats: data?.payment?.childSeats || 0,
    totalSelected: data?.payment?.totalSelected || 0,

  });

  const trip = {
    date: new Date(data.pickupDate).toDateString(),
    time: new Date(data.pickupTime).toLocaleTimeString(),
    from: data.from,
    to: data.to || "",
    distanceKM: data.distanceKM || "",
    pickupTimeLabel: data.pickupTimeLabel,
    estimatedTimeLabel: data.estimatedTimeLabel,
    durationMinutes: data.tripType == 'oneway' ? data.durationMinutes : data.duration,
    tripType: data.tripType,
    duration: data.duration || ""
  };

  const [form, setForm] = useState({
    bookingFor: data?.PickupInfo?.bookingFor || "myself",
    title: data?.PickupInfo?.title || "",
    firstName: data?.PickupInfo?.firstName || "",
    lastName: data?.PickupInfo?.lastName || "",
    email: data?.PickupInfo?.email || "",
    contactNumber: data?.PickupInfo?.contactNumber || "",
    createAccount: data?.PickupInfo?.createAccount,
    // Booker Information
    booker_title: data?.PickupInfo?.booker_title || "",
    booker_firstName: data?.PickupInfo?.booker_firstName || "",
    booker_lastName: data?.PickupInfo?.booker_lastName || "",
    booker_email: data?.PickupInfo?.booker_email || "",
    booker_contactNumber: data?.PickupInfo?.booker_contactNumber || "",
    // Additional Information
    childSeats: data?.PickupInfo?.childSeats || "",
    totalSelected,
    seats: data?.seats || seats,
    // Return Trip
    returnTrip: data?.PickupInfo?.returnTrip || "",
    // Special Requests
    tripPurpose: data?.PickupInfo?.tripPurpose || "",
  });

  const handleSeatChange = (type, value) => {
    const newValue = Number(value);

    const newTotal = totalSelected - seats[type] + newValue;
    // Block if exceeds required seats
    if (newTotal > requiredSeats) { 
      showAlert({ text: `You can select a maximum of ${requiredSeats} seats.`});
      return; 
    }

    let childPrice = parseInt(newTotal) * parseFloat(childCost);
    let subTotalPrice = parseFloat(payment?.subTotalPrice);
    let taxPrice = (subTotalPrice + childPrice) * (13/100);
    let totalPrice = subTotalPrice + childPrice + taxPrice;

    subTotalPrice = Number(subTotalPrice).toFixed(2);
    childPrice = Number(childPrice).toFixed(2);
    taxPrice = Number(taxPrice).toFixed(2);
    totalPrice = Number(totalPrice).toFixed(2);

    setPayment({
      subTotalPrice,
      childPrice,
      taxPrice,
      totalPrice,
      subTotalLabel: `$${subTotalPrice}`,
      childLabel: `$${childPrice}`,
      taxLabel: `Tax (13%) $${taxPrice}`,
      totalLabel: `$${totalPrice}`,

      childSeats: form?.childSeats,
      totalSelected: newTotal,
    });

    setSeats((prev) => ({
      ...prev,
      [type]: newValue,
    }));

    setForm((prev) => ({
      ...prev,
      totalSelected: newTotal,
    }));

  };
  const isDisabled = (type) => totalSelected >= requiredSeats && seats[type] === 0;


  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

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

    if (form.bookingFor === "someoneElse") {
      if (!form.booker_title) newErrors.booker_title = "Title is required";
      if (!form.booker_firstName.trim()) newErrors.booker_firstName = "First name is required";
      if (!form.booker_lastName.trim()) newErrors.booker_lastName = "Last name is required";

      if (!form.booker_email) {
        newErrors.booker_email = "Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(form.booker_email)) {
        newErrors.booker_email = "Invalid email address";
      }

      if (!form.booker_contactNumber.trim()) {
        newErrors.booker_contactNumber = "Contact number is required";
      }
      else if (form.booker_contactNumber.replace(/\D/g, "").length < 10) {
        newErrors.booker_contactNumber = "Invalid phone number";
      }
    }

    if (form.childSeats) {
      if (totalSelected === 0)
      newErrors.childSeats = "Child seats are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {

    if (!validate()) {refMsg.current?.scrollIntoView({ behavior: "smooth" }); return;}

    const saveData = { 
      ...data, PickupInfo: { ...form, seats }, payment
    };

    dispatch(
      saveSearch(saveData)
    );

    console.log("Saved data:", saveData);

    router.push("/booking/payment");
  };

  return (
    <div className="min-h-screen">
      <div className="py-10 border-b webBorderColor">
        <div className="container mx-auto px-2">
          <div className="flex flex-col md:flex-row space-x-5 pt-[90px] md:pt-[20px] xl:pt-0 mt-0 md:mt-20 xl:mt-40">
            <div className="w-full md:w-1/3 order-2 md:order-1">
              <div className="sticky top-5 z-50">
                <div className="bg-white rounded-md shadow-xl overflow-hidden text-black px-4 py-4 mb-5">
                  <div>
                    <h4 className="mb-4 text-sm md:text-lg font-bold border-b border-gray-200 pb-1">Pickup Trip Details</h4>
                  </div>

                  <Locations data={data} seats={seats} display="" />

                </div>

                <div className="bg-white rounded-md shadow-xl overflow-hidden text-black p-1 mb-5">
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
                <PriceBreakdown paymentData={payment} />                

              </div>
            </div>
            {/* Centered white content card */}
            <div className="w-full md:w-2/3 order-1 md:order-2">
              <div className="bg-white rounded-md shadow-xl overflow-hidden text-black mb-5 md:mb-0">
                <div className="p-4 xl:p-8">

                  {/* Blacklane Stepper */}
                  <Tabs activeStep={activeStep} />              

                  {/* Vehicles grid */}                  
                  {/* <VehiclesGrid />                       */}

                  {/* Heading */}
                  <h2 ref={refMsg} className="mt-6 text-lg md:text-xl font-bold">Passenger Information</h2>
                  <small className="text-gray-500 text-[10px] md:text-xs">
                    Provide details your chauffeur should know
                  </small>

                  {/* FORM */}
                  <div className="mt-6">

                    {/* Booking For */}
                    <div className="mb-6">
                      {/* <p className="font-semibold mb-2 text-sm md:text-base">Select Who you are booking for?</p> */}

                      <div className="flex gap-2">                        

                        {/* Toggle */}
                        <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value="someoneElse"
                          checked={form.bookingFor === "someoneElse"}
                          onChange={() =>
                            setForm((prev) => ({
                              ...prev,
                              bookingFor:
                                prev.bookingFor === "someoneElse" ? "myself" : "someoneElse",
                            }))
                          }
                          className="sr-only peer"
                        />
                        <div className="w-10 h-6 bg-gray-300 peer-checked:bg-yellow-600 rounded-full
                                        after:content-[''] after:absolute after:top-1 after:left-1
                                        after:bg-white after:w-4 after:h-4 after:rounded-full
                                        after:transition-all peer-checked:after:translate-x-4" />
                        </label>

                        <div className="flex items-center gap-2 md:w-[260px]">
                          
                          <span className="font-semibold text-sm md:text-base">
                              Book for someone else
                          </span>
                        </div>
                      </div>

                      {/* <div className="flex flex-col gap-4 p-3 md:p-4 border border-gray-200 rounded-xl">
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

                        <label className="flex items-center gap-2 text-xs xl:text-sm">
                          <input
                            type="radio"
                            name="bookingFor"
                            value="someoneElse"
                            checked={form.bookingFor === "someoneElse"}
                            onChange={() => setForm({ ...form, bookingFor: 'someoneElse' })}
                          />
                          Book for someone else
                        </label>
                      </div> */}
                    </div>

                    <div className="mb-6 p-3 lg:p-4 lg:p-6 lg:!pr-6 lg:!pr-20 border border-gray-200 rounded-xl space-y-4">
                      <p className="font-semibold mb-2 text-sm xl:text-base">Passenger Details</p>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="relative w-full md:w-50">
                          {/* Select */}
                          <select
                            value={form.title}
                            onChange={(e) =>
                              setForm({ ...form, title: e.target.value })
                            }
                            className="peer w-full px-3 pt-6 pb-2 text-xs md:text-sm
                              border rounded-xl bg-gray-100 border-gray-200
                              focus:outline-none focus:bg-white"
                          >
                            <option value="" disabled hidden />
                            <option value="Mr.">Mr.</option>
                            <option value="Mrs.">Mrs.</option>
                            <option value="Ms.">Ms.</option>
                            <option value="Dr.">Dr.</option>
                          </select>

                          {/* Floating Label */}
                          <label
                            className={`absolute left-3 text-gray-400 pointer-events-none
                              transition-all duration-200
                              ${
                                form.title
                                  ? "top-2 text-xs"
                                  : "top-3 text-[12px] xl:text-sm peer-focus:top-2 peer-focus:text-xs"
                              }`}
                          >
                            Title
                          </label>

                          {/* Helper text */}
                          {!form.title && !errors.title && (
                            <span className="pointer-events-none absolute left-3 top-8 text-[12px] text-gray-500 transition-opacity peer-focus:opacity-0 line-clamp-1">
                              Please select a title
                            </span>
                          )}

                          {/* Error */}
                          {errors.title && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.title}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="relative w-full">
                          {/* Input */}
                          <input
                            type="text"
                            value={form.firstName}
                            onChange={(e) =>
                              setForm({ ...form, firstName: e.target.value })
                            }
                            placeholder=" "
                            className="peer w-full px-3 pt-6 pb-2 text-xs md:text-sm
                              border rounded-xl bg-gray-100 border-gray-200
                              focus:outline-none focus:bg-white"
                          />

                          {/* Floating Label */}
                          <label
                            className={`absolute left-3 text-gray-400 pointer-events-none
                              transition-all duration-200
                              ${
                                form.firstName
                                  ? "top-2 text-xs"
                                  : "top-3 text-[12px] xl:text-sm peer-focus:top-2 peer-focus:text-xs"
                              }`}
                          >
                            First Name
                          </label>

                          {/* Helper text */}
                          {!form.firstName && !errors.firstName && (
                            <span className="pointer-events-none absolute left-3 top-8 text-[12px] text-gray-500 transition-opacity peer-focus:opacity-0">
                              Enter your first name
                            </span>
                          )}

                          {/* Error */}
                          {errors.firstName && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.firstName}
                            </p>
                          )}
                        </div>

                        <div className="relative w-full">
                          {/* Input */}
                          <input
                            type="text"
                            value={form.lastName}
                            onChange={(e) =>
                              setForm({ ...form, lastName: e.target.value })
                            }
                            placeholder=" "
                            className="peer w-full px-3 pt-6 pb-2 text-xs md:text-sm
                              border rounded-xl bg-gray-100 border-gray-200
                              focus:outline-none focus:bg-white"
                          />

                          {/* Floating Label */}
                          <label
                            className={`absolute left-3 text-gray-400 pointer-events-none
                              transition-all duration-200
                              ${
                                form.lastName
                                  ? "top-2 text-xs"
                                  : "top-3 text-[12px] xl:text-sm peer-focus:top-2 peer-focus:text-xs"
                              }`}
                          >
                            Last Name
                          </label>

                          {/* Helper text */}
                          {!form.lastName && !errors.lastName && (
                            <span className="pointer-events-none absolute left-3 top-8 text-[12px] text-gray-500 transition-opacity peer-focus:opacity-0">
                              Enter your last name
                            </span>
                          )}

                          {/* Error */}
                          {errors.lastName && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.lastName}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="relative w-full">
                          {/* Input */}
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                              setForm({ ...form, email: e.target.value })
                            }
                            placeholder=" "
                            className="peer w-full px-3 pt-6 pb-2 text-xs md:text-sm
                              border rounded-xl bg-gray-100 border-gray-200
                              focus:outline-none focus:bg-white"
                          />

                          {/* Floating Label */}
                          <label
                            className={`absolute left-3 text-gray-400 pointer-events-none
                              transition-all duration-200
                              ${
                                form.email
                                  ? "top-2 text-xs"
                                  : "top-3 text-[12px] xl:text-sm peer-focus:top-2 peer-focus:text-xs"
                              }`}
                          >
                            Email Address
                          </label>

                          {/* Helper text */}
                          {!form.email && !errors.email && (
                            <span className="pointer-events-none absolute left-3 top-8 text-[12px] text-gray-500 transition-opacity peer-focus:opacity-0">
                              Enter your email address
                            </span>
                          )}

                          {/* Error */}
                          {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.email}
                            </p>
                          )}
                        </div>
                        <div className="relative w-full">
                          {/* Phone Input */}
                          <PhoneInput
                            country={"ca"}
                            value={form.contactNumber}
                            onChange={(phone) =>
                              setForm({ ...form, contactNumber: phone })
                            }
                            containerClass="peer !w-full"
                            inputClass="!w-full !pt-10 !pb-3 !pr-3 !pl-12
                              !text-xs md:!text-sm
                              !border !rounded-xl !bg-gray-100 !border-gray-200
                              focus:!outline-none focus:!bg-white"
                            buttonClass="!border-none !bg-transparent"
                            placeholder=" "
                          />

                          {/* Floating Label */}
                          <label
                            className={`absolute left-12 text-gray-400 pointer-events-none
                              transition-all duration-200
                              ${
                                form.contactNumber
                                  ? "top-2 text-xs"
                                  : "top-3 text-[12px] xl:text-sm peer-focus-within:top-2 peer-focus-within:text-xs"
                              }`}
                          >
                            Contact Number
                          </label>

                          {/* Error */}
                          {errors.contactNumber && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.contactNumber}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="relative w-full">
                        {/* Checkbox */}
                        <div className="flex gap-2">
                          {/* <input
                            type="checkbox"
                            checked={form.createAccount || true}
                            onChange={(e) =>
                              setForm({ ...form, createAccount: e.target.checked })
                            }
                          /> */}
                          {/* Toggle */}
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={form.createAccount}
                                onChange={() => setForm({ ...form, createAccount: !form.createAccount })}
                                className="sr-only peer"
                            />
                            <div className="relative w-10 h-6 bg-gray-300 peer-checked:bg-yellow-600 rounded-full after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-all peer-checked:after:translate-x-4" />
                          </label>
                          <span className="text-xs xl:text-sm font-medium animate-pulse pt-1">Check this box to securely create an account for faster bookings next time.</span>
                        </div>

                        
                      </div>
                    </div>

                    {(form.bookingFor === "someoneElse") && (
                      <div className="mb-6 p-3 lg:p-4 lg:p-6 lg:!pr-6 lg:!pr-20 border border-gray-200 rounded-xl space-y-4">
                        <p className="font-semibold mb-2 text-sm xl:text-base">Booker Details</p>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="relative w-full md:w-50">
                            {/* Select */}
                            <select
                              value={form.booker_title}
                              onChange={(e) =>
                                setForm({ ...form, booker_title: e.target.value })
                              }
                              className="peer w-full px-3 pt-6 pb-2 text-xs md:text-sm
                                border rounded-xl bg-gray-100 border-gray-200
                                focus:outline-none focus:bg-white"
                            >
                              <option value="" disabled hidden />
                              <option value="Mr.">Mr.</option>
                              <option value="Mrs.">Mrs.</option>
                              <option value="Ms.">Ms.</option>
                              <option value="Dr.">Dr.</option>
                            </select>

                            {/* Floating Label */}
                            <label
                              className={`absolute left-3 text-gray-400 pointer-events-none
                                transition-all duration-200
                                ${
                                  form.booker_title
                                    ? "top-2 text-xs"
                                    : "top-3 text-[12px] xl:text-sm peer-focus:top-2 peer-focus:text-xs"
                                }`}
                            >
                              Title
                            </label>

                            {/* Helper text */}
                            {!form.booker_title && !errors.booker_title && (
                              <span className="pointer-events-none absolute left-3 top-8 text-[12px] text-gray-500 transition-opacity peer-focus:opacity-0 line-clamp-1">
                                Please select a title
                              </span>
                            )}

                            {/* Error */}
                            {errors.booker_title && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.booker_title}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="relative w-full">
                            {/* Input */}
                            <input
                              type="text"
                              value={form.booker_firstName}
                              onChange={(e) =>
                                setForm({ ...form, booker_firstName: e.target.value })
                              }
                              placeholder=" "
                              className="peer w-full px-3 pt-6 pb-2 text-xs md:text-sm
                                border rounded-xl bg-gray-100 border-gray-200
                                focus:outline-none focus:bg-white"
                            />

                            {/* Floating Label */}
                            <label
                              className={`absolute left-3 text-gray-400 pointer-events-none
                                transition-all duration-200
                                ${
                                  form.booker_firstName
                                    ? "top-2 text-xs"
                                    : "top-3 text-[12px] xl:text-sm peer-focus:top-2 peer-focus:text-xs"
                                }`}
                            >
                              First Name
                            </label>

                            {/* Helper text */}
                            {!form.booker_firstName && !errors.booker_firstName && (
                              <span className="pointer-events-none absolute left-3 top-8 text-[12px] text-gray-500 transition-opacity peer-focus:opacity-0">
                                Enter your first name
                              </span>
                            )}

                            {/* Error */}
                            {errors.booker_firstName && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.booker_firstName}
                              </p>
                            )}
                          </div>

                          <div className="relative w-full">
                            {/* Input */}
                            <input
                              type="text"
                              value={form.booker_lastName}
                              onChange={(e) =>
                                setForm({ ...form, booker_lastName: e.target.value })
                              }
                              placeholder=" "
                              className="peer w-full px-3 pt-6 pb-2 text-xs md:text-sm
                                border rounded-xl bg-gray-100 border-gray-200
                                focus:outline-none focus:bg-white"
                            />

                            {/* Floating Label */}
                            <label
                              className={`absolute left-3 text-gray-400 pointer-events-none
                                transition-all duration-200
                                ${
                                  form.booker_lastName
                                    ? "top-2 text-xs"
                                    : "top-3 text-[12px] xl:text-sm peer-focus:top-2 peer-focus:text-xs"
                                }`}
                            >
                              Last Name
                            </label>

                            {/* Helper text */}
                            {!form.booker_lastName && !errors.booker_lastName && (
                              <span className="pointer-events-none absolute left-3 top-8 text-[12px] text-gray-500 transition-opacity peer-focus:opacity-0">
                                Enter your last name
                              </span>
                            )}

                            {/* Error */}
                            {errors.booker_lastName && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.booker_lastName}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="relative w-full">
                            {/* Input */}
                            <input
                              type="email"
                              value={form.booker_email}
                              onChange={(e) =>
                                setForm({ ...form, booker_email: e.target.value })
                              }
                              placeholder=" "
                              className="peer w-full px-3 pt-6 pb-2 text-xs md:text-sm
                                border rounded-xl bg-gray-100 border-gray-200
                                focus:outline-none focus:bg-white"
                            />

                            {/* Floating Label */}
                            <label
                              className={`absolute left-3 text-gray-400 pointer-events-none
                                transition-all duration-200
                                ${
                                  form.booker_email
                                    ? "top-2 text-xs"
                                    : "top-3 text-[12px] xl:text-sm peer-focus:top-2 peer-focus:text-xs"
                                }`}
                            >
                              Email Address
                            </label>

                            {/* Helper text */}
                            {!form.booker_email && !errors.booker_email && (
                              <span className="pointer-events-none absolute left-3 top-8 text-[12px] text-gray-500 transition-opacity peer-focus:opacity-0">
                                Enter your email address
                              </span>
                            )}

                            {/* Error */}
                            {errors.booker_email && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.booker_email}
                              </p>
                            )}
                          </div>
                          <div className="relative w-full">
                            {/* Phone Input */}
                            <PhoneInput
                              country={"ca"}
                              value={form.booker_contactNumber}
                              onChange={(phone) =>
                                setForm({ ...form, booker_contactNumber: phone })
                              }
                              containerClass="peer !w-full"
                              inputClass="!w-full !pt-10 !pb-3 !pr-3 !pl-12
                                !text-xs md:!text-sm
                                !border !rounded-xl !bg-gray-100 !border-gray-200
                                focus:!outline-none focus:!bg-white"
                              buttonClass="!border-none !bg-transparent"
                              placeholder=" "
                            />

                            {/* Floating Label */}
                            <label
                              className={`absolute left-12 text-gray-400 pointer-events-none
                                transition-all duration-200
                                ${
                                  form.booker_contactNumber
                                    ? "top-2 text-xs"
                                    : "top-3 text-[12px] xl:text-sm peer-focus-within:top-2 peer-focus-within:text-xs"
                                }`}
                            >
                              Contact Number
                            </label>

                            {/* Error */}
                            {errors.booker_contactNumber && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.booker_contactNumber}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Additional Info */}
                    <div className="mb-2">
                      <p className="font-semibold text-sm md:text-base">Additional Information</p>

                      <div className="w-full mt-5 space-y-4">
                      
                        {/* CHILD SEATS */}
                        <div className="flex flex-col xl:flex-row xl:items-center gap-3">
                          <div className="flex gap-2">
                            <div className="flex items-center gap-2 md:w-[260px]">
                              <span className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full">
                                  👶
                              </span>
                              <span className="text-sm font-medium">
                                  Do you want Child Seats?
                              </span>
                            </div>
    
                            {/* Toggle */}
                            <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={form.childSeats}
                                onChange={() => {
                                  setSeats({
                                    infant: 0,
                                    toddler: 0,
                                    booster: 0,
                                  });
                                  setPayment({
                                    subTotalPrice: data.payment?.subTotalPrice || 0,
                                    taxPrice: data.payment?.taxPrice || 0,
                                    totalPrice: data.payment?.totalPrice || 0,
                                    childPrice: data.payment?.childPrice || 0,

                                    subTotalLabel: `${data.payment?.subTotalLabel}`,
                                    taxLabel: `${data.payment?.taxLabel}`,
                                    totalLabel: `${data.payment?.totalLabel}`,
                                    childLabel: `${data.payment?.childLabel}`,

                                    childSeats: data.payment?.childSeats,
                                    totalSelected: 0,
                                  });
                                  setForm({ ...form, childSeats: !form.childSeats })
                                }}
                                className="sr-only peer"
                            />
                            <div className="w-10 h-6 bg-gray-300 peer-checked:bg-yellow-600 rounded-full
                                            after:content-[''] after:absolute after:top-1 after:left-1
                                            after:bg-white after:w-4 after:h-4 after:rounded-full
                                            after:transition-all peer-checked:after:translate-x-4" />
                            </label>
                          </div>

                          {/* Child seat selects (SHOW ONLY IF ON) */}
                          {form.childSeats && (
                            <>
                            <div className="grid grid-cols-3 gap-2 xl:ml-auto xl:w-[60%]">
                              <div className="relative">
                                {/* Select infant */}
                                <select
                                  value={seats.infant}
                                  onChange={(e) => handleSeatChange("infant", e.target.value)}
                                  disabled={isDisabled("infant")}
                                  className="peer w-full px-2 pt-7 pb-2 text-sm border rounded-xl
                                            bg-gray-100 border-gray-200 focus:outline-none
                                              appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                                  
                                >
                                  <option value="" disabled hidden />
                                  <option value="0">0</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                </select>
    
                                {/* Dropdown Icon */}
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                  <FaChevronDown className="text-gray-500 text-sm" />
                                </div>
    
                                {/* Floating label */}
                                <label
                                  className="pointer-events-none absolute left-2
                                            transition-all duration-200 text-gray-400
                                            top-3 text-xs
                                            peer-focus:top-2 peer-focus:text-xs
                                            peer-valid:top-2 peer-valid:text-xs"
                                >
                                  Infant
                                </label>
    
                                {/* Helper text */}
                                {/* <span
                                  className="pointer-events-none absolute left-2 top-7
                                            text-[12px] text-gray-500 transition-opacity
                                            peer-focus:opacity-0 peer-valid:opacity-0"
                                >
                                  Select infant seats
                                </span> */}
                              </div>

                              <div className="relative">
                                {/* Select toddler */}
                                <select
                                  value={seats.toddler}
                                  onChange={(e) => handleSeatChange("toddler", e.target.value)}
                                  disabled={isDisabled("toddler")}
                                  className="peer w-full px-2 pt-7 pb-2 text-sm border rounded-xl
                                            bg-gray-100 border-gray-200 focus:outline-none
                                            appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <option value="" disabled hidden />
                                  <option value="0">0</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                </select>
    
                                {/* Dropdown Icon */}
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                  <FaChevronDown className="text-gray-500 text-sm" />
                                </div>
    
                                {/* Floating label */}
                                <label
                                  className="pointer-events-none absolute left-2
                                            transition-all duration-200 text-gray-400
                                            top-3 text-xs
                                            peer-focus:top-2 peer-focus:text-xs
                                            peer-valid:top-2 peer-valid:text-xs"
                                >
                                  Toddler
                                </label>
    
                                {/* Helper text */}
                                {/* <span
                                  className="pointer-events-none absolute left-2 top-7
                                            text-[12px] text-gray-500 transition-opacity
                                            peer-focus:opacity-0 peer-valid:opacity-0"
                                >
                                  Select toddler seats
                                </span> */}
                              </div>

                              <div className="relative">
                                {/* Select booster */}
                                <select
                                  value={seats.booster}
                                  onChange={(e) => handleSeatChange("booster", e.target.value)}
                                  disabled={isDisabled("booster")}
                                  className="peer w-full px-2 pt-7 pb-2 text-sm border rounded-xl
                                            bg-gray-100 border-gray-200 focus:outline-none
                                            appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <option value="" disabled hidden />
                                  <option value="0">0</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                </select>
    
                                {/* Dropdown Icon */}
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                  <FaChevronDown className="text-gray-500 text-sm" />
                                </div>
    
                                {/* Floating label */}
                                <label
                                  className="pointer-events-none absolute left-2
                                            transition-all duration-200 text-gray-400
                                            top-3 text-xs
                                            peer-focus:top-2 peer-focus:text-xs
                                            peer-valid:top-2 peer-valid:text-xs"
                                >
                                  Booster
                                </label>
    
                                {/* Helper text */}
                                {/* <span
                                  className="pointer-events-none absolute left-2 top-7
                                            text-[12px] text-gray-500 transition-opacity
                                            peer-focus:opacity-0 peer-valid:opacity-0"
                                >
                                  Select booster seats
                                </span> */}
                              </div>
                              
                            </div>                            
                            </>                            
                            )}
                        </div>
                        {/* Error */}
                        {errors.childSeats && (
                          <div className="grid md:grid-cols-1 gap-2 md:ml-auto md:w-[100%]">
                          <p className="text-red-500 text-xs mt-1 text-center md:text-right">
                            {errors.childSeats}
                          </p>
                          </div>
                        )}
    
                        {/* RETURN TRIP */}
                        {/* <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 md:w-[260px]">
                            <span className="w-6 h-6 flex items-center justify-center bg-yellow-600 rounded-full">
                                <ArrowPathIcon className="w-4 h-4 text-white" />
                            </span>
                            <span className="text-sm font-medium">
                                Do you want a Return Trip?
                            </span>
                            </div>
    
                            <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={form.returnTrip}
                                onChange={() => setForm({ ...form, returnTrip: !form.returnTrip })}
                                className="sr-only peer"
                            />
                            <div className="w-10 h-6 bg-gray-300 peer-checked:bg-yellow-600 rounded-full
                                            after:content-[''] after:absolute after:top-1 after:left-1
                                            after:bg-white after:w-4 after:h-4 after:rounded-full
                                            after:transition-all peer-checked:after:translate-x-4" />
                            </label>
                        </div> */}
    
                        {/* RETURN TRIP FIELDS (SHOW ONLY IF ON) */}
                        {form.returnTrip && (
                          <ReturnTrip form={form} setForm={setForm} errors={errors} />
                        )}
                      </div>
                      
                    </div>


                    <h2 className="mt-10 font-semibold text-sm md:text-base">Trip Notes <span className="text-gray-500 font-medium text-xs md:text-sm">(Any special requirements or requests for your trip e.g. business visit, child car seats, etc.)</span></h2>
                    <div className="mt-3">
                      <div className="relative w-full">
                        {/* Input */}
                        <input
                          type="text"
                          value={form.tripPurpose}
                          onChange={(e) => setForm({ ...form, tripPurpose: e.target.value })}
                          placeholder=" "
                          className="peer w-full px-3 pt-8 pb-5 text-xs md:text-sm
                            border rounded-xl bg-gray-100 border-gray-200
                            focus:outline-none"
                        />

                        {/* Floating Label */}
                        <label
                          className={`absolute left-3 text-gray-400 pointer-events-none
                            transition-all duration-200
                            ${
                              form.tripPurpose
                                ? "top-2 text-xs"
                                : "top-3 text-[12px] md:text-sm peer-focus:top-2 peer-focus:text-xs"
                            }`}
                        >
                          Trip Purpose
                        </label>

                        {/* Helper text inside input */}
                        {!form.tripPurpose && (
                          <span className="pointer-events-none absolute left-3 top-10 text-[12px] text-gray-500 transition-opacity peer-focus:opacity-0 hidden md:block">
                            Enter any special requirements or requests for your trip e.g. business visit, child car seats, etc.
                          </span>
                        )}
                      </div>
                      <small className="text-gray-500 text-[10px] flex md:hidden mt-1">
                        Enter any special requirements or requests for your trip e.g. business visit, child car seats, etc.
                      </small>
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
                      onClick={handleContinue}
                      className="flex py-3 px-2 xl:px-10 rounded-md font-medium text-white webBG hover:opacity-90 cursor-pointer text-xs xl:text-base w-auto"
                    >
                      Continue to Payment/Quote
                      <FaChevronRight className="text-white text-sm ml-1 md:mt-1" />
                    </button>
                  </div>

                </div>
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
