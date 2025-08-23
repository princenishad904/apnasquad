export function convertUTCToIST(utcDateString) {
  const utcDate = new Date(utcDateString);

  // IST offset (5 hours 30 minutes ahead of UTC)
  const istOffset = 5.5 * 60 * 60 * 1000;

  const istDate = new Date(utcDate.getTime() + istOffset);
  return istDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
}

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

export function convertToIST(utcTime) {
  const date = new Date(utcTime);

  const options = {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formatter = new Intl.DateTimeFormat("en-GB", options);
  const formatted = formatter.format(date);

  // "23/08/2025, 05:30 pm" → convert to "23-08-2025 05:30PM"
  const [d, m, rest] = formatted.split("/");
  const [year, time] = rest.split(", ");
  return `${d}-${m}-${year.trim()} ${time.toUpperCase()}`;
}
