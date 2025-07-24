
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