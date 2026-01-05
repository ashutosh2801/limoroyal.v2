const convertTime = (value, type) => {
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

export default convertTime;