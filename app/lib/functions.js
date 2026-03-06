
export function formatDate (isoString) {
  const date = new Date(isoString);

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};


export function formatTime (isoString) {
  const date = new Date(isoString);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true
  });
};

export function extractAirportData (place) {
  if (!place?.types?.includes("airport")) return null;

  const iata =
    place.address_components?.find(c =>
      c.types.includes("airport")
    )?.short_name || null;

  const terminal =
    place.name.match(/Terminal\s?\d+/i)?.[0] || null;

  return {
    isAirport: true,
    iata,
    terminal,
  };
};

export function convertTime(value, type) {
  if (!value || value < 0) return "0 mins";

  if (type === "H") {
    const hrs = value;
    return `${hrs} hr${hrs > 1 ? "s" : ""}`;
  }

  if (type === "M") {
    const hrs = Math.floor(value / 60);
    const mins = value % 60;

    if (hrs > 0 && mins > 0) return `${hrs} hr${hrs > 1 ? "s" : ""} ${mins} min`;
    if (hrs > 0) return `${hrs} hr${hrs > 1 ? "s" : ""}`;
    return `${mins} min`;
  }

  return "";
};

export function canAddAnotherStop(additionalStops) {
  if (additionalStops?.length === 0) return true;

  const lastStop = additionalStops[additionalStops?.length - 1];
  return lastStop.name && lastStop.name.trim().length > 0;
};

export function getAlphabetLabel(index) {
  let label = "";
  while (index >= 0) {
    label = String.fromCharCode((index % 26) + 65) + label;
    index = Math.floor(index / 26) - 1;
  }
  return label;
};
