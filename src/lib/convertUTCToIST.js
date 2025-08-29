import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";



export function formatISODateToLocal(isoString) {
  // Step 1: ISO string se Date object banayein.
  const date = new Date(isoString);

  // Step 2: Sirf date waale hisse ko format karein.
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-IN", dateOptions).format(
    date
  );
  // Iska result hoga: "Friday, 8 August 2025"

  // Step 3: Sirf time waale hisse ko format karein.
  const timeOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  const formattedTime = new Intl.DateTimeFormat("en-IN", timeOptions).format(
    date
  );
  // Iska result hoga: "4:23 AM"

  // Step 4: Dono ko 'at' laga kar jod dein.
  return `${formattedDate} at ${formattedTime}`;
}
