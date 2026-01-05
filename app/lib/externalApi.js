const API_BASE = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getBookingData(booking_id) {
  const res = await fetch(`${API_BASE}/api/bookings/${booking_id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
  });

  if (!res.ok) {
    throw new Error(`Failed to load bookings: ${res.status}`);
  }

  return res.json();
}

export async function getPickupData() {
  const res = await fetch(`${API_BASE}/api/vehicles`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
  });

  if (!res.ok) {
    throw new Error(`Failed to load pickups: ${res.status}`);
  }

  return res.json();
}

export async function createBooking(payload) {
  const res = await fetch(`${API_BASE}/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Failed to load pickups: ${res.status}`);
  }

  return res.json();
}

export async function createSetupIntent(payload) {
  const res = await fetch(`${API_BASE}/api/stripe/setup-intent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "SetupIntent failed");
  }

  return res.json();
}

export async function getPaymentMethod(paymentMethodId) {
  const res = await fetch(`${API_BASE}/api/stripe/payment-method`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify({ paymentMethodId }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch card details");
  }

  return res.json();
}

export async function chargeSavedCard(payload) {
  const res = await fetch(`${API_BASE}/api/stripe/charge`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch card details");
  }

  return res.json();
}
