import moment from "moment";

const addLeadingRank = (value) => {
  return String(value).padStart(2, `0`);
};

const dateToString = (date) => {
  return moment(date).format(`DD/MM/YY HH:mm`);
};

const timeToString = (date = new Date()) => {
  return moment(date).format(`HH:mm`);
};

const formatDateToISOString = (date) => {
  return moment(date).format();
};

const formatDayDate = (date) => moment(date).format(`DD/MM/YYYY`);

const getDatesDifference = (startTime = new Date(), endTime = new Date()) => {
  const duration = moment.duration(moment(endTime).diff(moment(startTime)));
  const minutes = duration.minutes();
  const hours = duration.hours();
  const days = duration.days();

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

const formatMonthDate = (date) => moment(date).format(`MMM D`);

export {
  addLeadingRank,
  getDatesDifference,
  dateToString,
  timeToString,
  formatDateToISOString,
  formatDayDate,
  formatMonthDate
};
