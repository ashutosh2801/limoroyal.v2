'use client';

import { useState, useRef } from 'react';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

export default function BookingSystem() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // REFS FOR GOOGLE AUTOCOMPLETE INSTANCE (Logic)
  const originAutocompleteRef = useRef(null);
  const destAutocompleteRef = useRef(null);

  // REFS FOR HTML INPUT ELEMENTS (Text Values)
  const originInputRef = useRef(null);
  const destInputRef = useRef(null);

  if (!isLoaded) {
    return <div className="flex justify-center items-center h-screen">Loading Maps API...</div>;
  }

  const calculateRoute = async (e) => {
    e.preventDefault();

    // 1. Check values using the INPUT refs (the actual text boxes)
    if (!originInputRef.current.value || !destInputRef.current.value || !date || !time) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    const service = new google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
      {
        origins: [originInputRef.current.value],
        destinations: [destInputRef.current.value],
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        setLoading(false);
        if (status === "OK" && response.rows[0].elements[0].status === "OK") {
          const data = response.rows[0].elements[0];
          setResult({
            distance: data.distance.text,
            duration: data.duration.text,
            origin: response.originAddresses[0],
            destination: response.destinationAddresses[0],
          });
        } else {
          alert("Error calculating distance. Please check the addresses.");
          console.error("Distance Matrix Error:", response);
        }
      }
    );
  };

  const handleBooking = () => {
    alert(`Booking Confirmed!\n\nFrom: ${result.origin}\nTo: ${result.destination}\nDate: ${date} at ${time}\nDistance: ${result.distance}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Ride Booking (By DistanceMatrixService)</h1>

        <form onSubmit={calculateRoute} className="space-y-4">
          {/* From Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">From</label>
            <Autocomplete
              onLoad={(autocomplete) => (originAutocompleteRef.current = autocomplete)}
              onPlaceChanged={() => {
                // Update the input value manually to ensure sync if needed
                 if(originAutocompleteRef.current.getPlace().formatted_address) {
                    originInputRef.current.value = originAutocompleteRef.current.getPlace().formatted_address;
                 }
              }}
            >
              <input
                ref={originInputRef} 
                type="text"
                placeholder="Enter pickup location"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </Autocomplete>
          </div>

          {/* To Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">To</label>
            <Autocomplete
              onLoad={(autocomplete) => (destAutocompleteRef.current = autocomplete)}
              onPlaceChanged={() => {
                 if(destAutocompleteRef.current.getPlace().formatted_address) {
                    destInputRef.current.value = destAutocompleteRef.current.getPlace().formatted_address;
                 }
              }}
            >
              <input
                ref={destInputRef}
                type="text"
                placeholder="Enter drop-off location"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </Autocomplete>
          </div>

          {/* Date and Time Inputs */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          {/* Calculate Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 font-medium"
          >
            {loading ? 'Calculating...' : 'Check Availability'}
          </button>
        </form>

        {/* Result Display */}
        {result && (
          <div className="mt-6 p-4 bg-green-50 rounded-md border border-green-200">
            <h3 className="font-semibold text-green-800 border-b border-green-200 pb-2 mb-2">Trip Details</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p><span className="font-bold">Total Distance:</span> {result.distance}</p>
              <p><span className="font-bold">Est. Duration:</span> {result.duration}</p>
              <p><span className="font-bold">Date:</span> {date}</p>
              <p><span className="font-bold">Time:</span> {time}</p>
            </div>
            
            <button 
              onClick={handleBooking}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Confirm Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
}