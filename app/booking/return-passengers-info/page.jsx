"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaPlane } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { saveSearch } from "@/store/searchSlice";
import { showAlert } from "@/app/lib/alert";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import Tabs from "@/app/components/Tabs";
import PriceBreakdown from "@/app/components/PriceBreakdown";
import Locations from "@/app/components/Locations";

export default function PickupInfoPage() {
  const router = useRouter();
  const refMsg = useRef(null);
  const dispatch = useDispatch();
  const activeStep = 3; // Pickup Info
  const { data } = useSelector((state) => state.search);
  // console.log(data);
  if (!data || Object.keys(data).length === 0) {
    router.push("/");
    return;
  }
  const [loading, setLoading] = useState(false);
  const requiredSeats = data?.returnData?.selectedVehicle?.numChildSeatAllow || 0; // dynamic (2 or 3)
  const childCost = data?.returnData?.selectedVehicle?.perChildSeatPrice || 0;
  const [seats, setSeats] = useState({
    infant: 0,
    toddler: 0,
    booster: 0,
  });
  const totalSelected = seats.infant + seats.toddler + seats.booster;

  const [payment, setPayment] = useState({
    subTotalPrice: data.returnData?.payment?.subTotalPrice || 0,
    taxPrice: data.returnData?.payment?.taxPrice || 0,
    totalPrice: data.returnData?.payment?.totalPrice || 0,
    childPrice: data.returnData?.payment?.childPrice || 0,

    subTotalLabel: `${data.returnData?.payment?.subTotalLabel}`,
    taxLabel: `${data.returnData?.payment?.taxLabel}`,
    totalLabel: `${data.returnData?.payment?.totalLabel}`,
    childLabel: `${data.returnData?.payment?.childLabel || 0}`,
    
    childSeats: data?.returnData?.payment?.childSeats || 0,
    totalSelected: data?.returnData?.payment?.totalSelected || 0,
  });

  const trip = {
    date: new Date(data.returnData?.pickupDate).toDateString(),
    time: new Date(data.returnData?.pickupTime).toLocaleTimeString(),
    from: data.returnData?.from,
    to: data.returnData?.to || "",
    distanceKM: data.returnData?.distanceKM || "",
    pickupTimeLabel: data.returnData?.pickupTimeLabel,
    estimatedTimeLabel: data.returnData?.estimatedTimeLabel,
    durationMinutes: data.returnData?.tripType == 'oneway' ? data.returnData?.durationMinutes : data.returnData?.duration,
    tripType: data.returnData?.tripType,
    duration: data.returnData?.duration || ""
  };

  const [form, setForm] = useState({
    bookingFor: data?.PickupInfo?.bookingFor || "myself",
    title: data?.returnData?.PickupInfo?.title || data?.PickupInfo?.title || "",
    firstName: data?.returnData?.PickupInfo?.firstName || data?.PickupInfo?.firstName || "",
    lastName: data?.returnData?.PickupInfo?.lastName || data?.PickupInfo?.lastName || "",
    email: data?.returnData?.PickupInfo?.email || data?.PickupInfo?.email || "",
    contactNumber: data?.returnData?.PickupInfo?.contactNumber || data?.PickupInfo?.contactNumber || "",
    // Additional Information
    childSeats: data?.returnData?.PickupInfo?.childSeats || "",
    totalSelected,
    seats: data?.seats || seats,
    // Special Requests
    trip_notes: data?.returnData?.PickupInfo?.trip_notes || "",
  });

  const handleSeatChange = (type, value) => {
    const newValue = Number(value);

    const newTotal = totalSelected - seats[type] + newValue;
    // Block if exceeds required seats
    if (newTotal > requiredSeats) { 
      showAlert({ text: `You can select a maximum of ${requiredSeats} seats.`});
      return; 
    }

    const oldSubtotal = parseFloat(data.payment?.subTotalPrice);
    const oldchildPric= parseFloat(data.payment?.childPrice);
    console.log(oldSubtotal);

    console.log(oldchildPric);
    let childPrice    = parseInt(newTotal) * parseFloat(childCost);
    let subTotalPrice = parseFloat(data.returnData?.payment?.subTotalPrice) + parseFloat(oldSubtotal);
    let taxPrice      = (subTotalPrice + childPrice + oldchildPric) * (13/100);
    let totalPrice    = subTotalPrice + childPrice + oldchildPric + taxPrice;

    subTotalPrice     = Number(subTotalPrice).toFixed(2);
    childPrice        = Number(childPrice).toFixed(2);
    taxPrice          = Number(taxPrice).toFixed(2);
    totalPrice        = Number(totalPrice).toFixed(2);

    const paymentData = {
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
    };
    console.log(paymentData);
    setPayment(paymentData);

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

    if (form.childSeats) {
      if (totalSelected === 0)
      newErrors.childSeats = "Child seats are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = async () => {

    setLoading(true);

    try {
      if (!validate()) {
        refMsg.current?.scrollIntoView({ behavior: "smooth" }); return;
      }

      let saveData = {};
      saveData = { 
        ...data, 
        returnData: {
          ...(data.returnData || {}), PickupInfo: { ...form, seats }, payment
        }
      };

      dispatch(
        saveSearch(saveData)
      );
      router.push("/booking/payment");
    } catch (err) {
      console.error(err);
      showAlert({
        text: err,
        icon: "error",
      });
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

                <div className="bg-white rounded-md shadow-xl overflow-hidden text-black px-4 py-4 mb-4">
                  <div
                    className="flex justify-between items-center cursor-pointer border-b border-gray-200 pb-1"
                    onClick={() => toggleCollapse("booking")}
                  >
                    <h4 className="text-sm xl:text-lg font-bold">
                      Booking Summary
                    </h4>
                    <span className="text-xl font-bold">
                      {collapse.booking ? "−" : "+"}
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

                <div className="bg-white rounded-md shadow-xl overflow-hidden text-black px-4 py-4 mb-4">
                  <div
                    className="flex justify-between items-center cursor-pointer border-b border-gray-200 pb-1"
                    onClick={() => toggleCollapse("returnBooking")}
                  >
                    <h4 className="text-sm xl:text-lg font-bold">
                      Return Trip Booking Summary
                    </h4>
                    <span className="text-xl font-bold">
                      {collapse.returnBooking ? "−" : "+"}
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

                {data?.selectedVehicle?.isShowPrice == 1 && (
                <div className="bg-white rounded-md shadow-xl overflow-hidden text-black px-4 py-4 mb-4">
                  <div
                    className="flex justify-between items-center cursor-pointer border-b border-gray-200 pb-1"
                    onClick={() => toggleCollapse("price")}
                  >
                    <h4 className="text-sm xl:text-lg font-bold">
                      Price breakdown
                    </h4>
                    <span className="text-xl font-bold">
                      {collapse.price ? "−" : "+"}
                    </span>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      collapse.price ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <PriceBreakdown paymentData={payment} oldData={data?.payment} /> 
                  </div>
                </div>               
                )}
              </div>
            </div>
            {/* Centered white content card */}
            <div className="w-full md:w-2/3 order-1 md:order-2">
              <div className="bg-white rounded-md shadow-xl overflow-hidden text-black mb-5 md:mb-0">
                <div className="p-4 xl:p-8">

                  {/* Blacklane Stepper */}
                  <Tabs activeStep={3} hasReturnTrip />              

                  {/* Heading */}
                  <h2 ref={refMsg} className="mt-6 text-lg md:text-xl font-bold">Return Trip Passenger Information</h2>
                  <small className="text-gray-500 text-[10px] md:text-xs">
                    Provide details your chauffeur should know
                  </small>

                  {/* FORM */}
                  <div className="mt-6">                    

                    <div className="mb-6 p-3 lg:p-4 lg:p-6 lg:!pr-6 lg:!pr-20 border border-gray-200 rounded-xl space-y-4">
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
                    </div>


                    {/* Additional Info */}
                    <div className="mb-2">
                      <p className="font-semibold text-sm md:text-base">Additional Information</p>
                      <div className="w-full mt-5 space-y-4">
                        {
                          requiredSeats > 0 && (
                            <>                          
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
                            </>
                          )
                        }
                      </div>
                    </div>


                    <h2 className="mt-10 font-semibold text-sm md:text-base">Return Trip Notes</h2>
                    <div className="mt-3">
                      <div className="relative w-full">
                        {/* Input */}
                        <input
                          type="text"
                          value={form.trip_notes}
                          onChange={(e) => setForm({ ...form, trip_notes: e.target.value })}
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
                              form.trip_notes
                                ? "top-2 text-xs"
                                : "top-3 text-[12px] md:text-sm peer-focus:top-2 peer-focus:text-xs"
                            }`}
                        >
                          Return Trip Notes
                        </label>

                        {/* Helper text inside input */}
                        {!form.trip_notes && (
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
                      disabled={loading}
                      className="flex py-3 px-2 xl:px-10 rounded-md font-medium text-white webBG hover:opacity-90 cursor-pointer text-xs xl:text-base w-auto"
                    >
                      {loading ? "Please wait..." : "Continue"}
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
