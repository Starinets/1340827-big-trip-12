const MILLISECOND_IN_MINUTE = 60000;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;


const addLeadingRank = (value) => {
  return String(value).padStart(2, `0`);
};

const dateToString = (date) => {
  const year = addLeadingRank(date.getFullYear().toString().substr(-2));
  const month = addLeadingRank(date.getMonth());
  const day = addLeadingRank(date.getDate());

  return `${day}/${month}/${year} ${timeToString(date)}`;
};

const timeToString = (date = new Date()) => {
  const hours = addLeadingRank(date.getHours());
  const minutes = addLeadingRank(date.getMinutes());

  return `${hours}:${minutes}`;
};

const formatDateToISOString = (date) => {
  const formattedDate = new Date(date);
  formattedDate.setHours(formattedDate.getHours() - formattedDate.getTimezoneOffset() / MINUTES_IN_HOUR);

  return formattedDate.toISOString();
};

const formatDayDate = (date) => formatDateToISOString(date).slice(0, 10);

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
  dateToString,
  timeToString,
  formatDateToISOString,
  formatDayDate
};
