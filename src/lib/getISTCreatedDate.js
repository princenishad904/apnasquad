export function getISTCreatedDate(timestamp) {
  const dateObject = new Date(timestamp);
  
  const options = {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true 
  };

  const formattedDate = new Intl.DateTimeFormat('en-IN', options).format(dateObject);


  const [datePart, timePart] = formattedDate.split(', ');
  const [day, month, year] = datePart.split('/');
  const [hourMinute, ampm] = timePart.split(':');
  
  return `${day}-${month}-${year} ${hourMinute}:${ampm}`;
}
