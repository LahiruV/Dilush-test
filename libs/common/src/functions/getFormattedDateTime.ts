
export const getDateTime = (pDate?: Date, addMins?: number) => {
  let now = new Date();

  if (pDate)
    now = new Date(pDate);

  if (addMins)
    now.setMinutes(now.getMinutes() + addMins);

  // Format date as YYYY-MM-DDTHH:MM
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const getDate = (pDate?: Date) => {
  let now = new Date();

  if (pDate)
    now = new Date(pDate);

  // Format date as dd/MM/yyyy
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getFormattedDateTime = (pDate?: Date, separator: "-" | "/" = "/") => {
  let now = new Date();

  if (pDate)
    now = new Date(pDate);

  // Format date as dd/MM/yyyy
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${day}${separator}${month}${separator}${year}`;
};

export const getFormattedDateTimeWithTime = (
  pDate?: Date | string,
  separator: "-" | "/" = "/"
) => {
  let now: Date;

  if (!pDate) {
    now = new Date();
  } else if (typeof pDate === "string") {
    now = new Date(pDate);
  } else {
    now = pDate;
  }

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12
  const formattedHours = String(hours).padStart(2, "0");

  return `${day}${separator}${month}${separator}${year} ${formattedHours}:${minutes}:${seconds} ${ampm}`;
};