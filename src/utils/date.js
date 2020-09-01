import moment from "moment";

const MILLISECOND_IN_MINUTE = 60000;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;


const addLeadingRank = (value) => {
  return String(value).padStart(2, `0`);
};

const dateToString = (date) => {
  return moment(date).format(`DD/MM/YY hh:mm`);
};

const timeToString = (date = new Date()) => {
  return moment(date).format(`hh:mm`);
};

const formatDateToISOString = (date) => {
  return moment(date).format();
};

const formatDayDate = (date) => moment(date).format(`DD/MM/YYYY`);

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
