const MILLISECOND_IN_MINUTE = 60000;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;


const addLeadingRank = (value) => {
  return String(value).padStart(2, `0`);
};

const timeToString = (date = new Date()) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours < 10 ? `0` + hours : hours}:${minutes < 10 ? `0` + minutes : minutes}`;
};

const formatDateToISOString = (date) => {
  const formattedDate = new Date(date);
  formattedDate.setHours(formattedDate.getHours() - formattedDate.getTimezoneOffset() / MINUTES_IN_HOUR);

  return formattedDate.toISOString();
};

const getDatesDifference = (startDate = new Date(), endDate = new Date()) => {
  let difference = endDate - startDate;
  difference -= difference % MILLISECOND_IN_MINUTE;
  difference = difference / MILLISECOND_IN_MINUTE;
  const minutes = difference % MINUTES_IN_HOUR;
  difference -= minutes;
  difference = difference / MINUTES_IN_HOUR;
  const hours = difference % HOURS_IN_DAY;
  difference -= hours;
  const days = difference / HOURS_IN_DAY;

  let formattedTime = ``;

  if (days > 0) {
    formattedTime = addLeadingRank(days) + `D `;
  }

  if (days > 0 || hours > 0) {
    formattedTime = formattedTime + addLeadingRank(hours) + `H `;
  }

  formattedTime = formattedTime + addLeadingRank(minutes) + `M`;

  return formattedTime;
};

export {
  addLeadingRank,
  getDatesDifference,
  timeToString,
  formatDateToISOString
};
