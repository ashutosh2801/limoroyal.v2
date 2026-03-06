// const PRICING = {
//   baseFare: 25,            // Base booking charge
//   perKmRate: 2.5,          // Price per KM
//   perMileRate: 4,          // (optional if using miles)
//   stopFee: 15,             // Per additional stop charge
//   waitingPerMinute: 1.2,   // Waiting time charge per minute
//   minimumFare: 40,         // Minimum ride price
// };
export function calculateTripPrice({
  PRICING,  
  distanceKM = 0,
  distanceMiles = 0,
  additionalStops = [],
  useKM = true,
}) {
  let priceBreakdown = {};

  // 1️⃣ Base fare
  let total = PRICING.baseFare;
  priceBreakdown.baseFare = PRICING.baseFare;

  // 2️⃣ Distance price
  const distancePrice = useKM
    ? distanceKM * PRICING.perKmRate
    : distanceMiles * PRICING.perMileRate;

  total += distancePrice;
  priceBreakdown.distancePrice = Number(distancePrice.toFixed(2));

  // 3️⃣ Stop charges
  const stopCount = additionalStops.length;
  const stopCharges = stopCount * PRICING.stopFee;

  total += stopCharges;
  priceBreakdown.stopCharges = stopCharges;

  // 4️⃣ Waiting time charges
  const waitingMinutes = additionalStops.reduce(
    (sum, s) => sum + (Number(s.waitingTime) || 0),
    0
  );

  const waitingCharges = waitingMinutes * PRICING.waitingPerMinute;

  total += waitingCharges;
  priceBreakdown.waitingCharges = Number(waitingCharges.toFixed(2));

  // 5️⃣ Minimum fare check
  if (total < PRICING.minimumFare) {
    total = PRICING.minimumFare;
    priceBreakdown.minimumFareApplied = true;
  }

  priceBreakdown.total = Number(total.toFixed(2));
  priceBreakdown.waitingMinutes = waitingMinutes;
  priceBreakdown.stopCount = stopCount;

  return priceBreakdown;
}

export function combineDateAndTime(date, time) {
  const d = new Date(date);
  const t = new Date(time);

  d.setHours(t.getHours());
  d.setMinutes(t.getMinutes());
  d.setSeconds(0);
  d.setMilliseconds(0);

  return d;
};
