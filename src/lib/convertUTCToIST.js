export function formatISODateToLocal(isoString) {
  const date = new Date(isoString);

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Kolkata",
  };

  const timeOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };

  const formattedDate = new Intl.DateTimeFormat("en-IN", dateOptions).format(date);
  const formattedTime = new Intl.DateTimeFormat("en-IN", timeOptions).format(date);

  return `${formattedDate} at ${formattedTime}`;
}
