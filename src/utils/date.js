const timeToString = (date = new Date()) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours < 10 ? `0` + hours : hours}:${minutes < 10 ? `0` + minutes : minutes}`;
};

const timeToDateString = (date = new Date(), needShowTime = true) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDay();

  return `${year}-${month < 10 ? `0` + month : month}-${day < 10 ? `0` + day : day}${needShowTime ? `T${timeToString(date)}` : ``}`;
};

const getDatesDifference = (startDate = new Date(), endDate = new Date()) => {
  let difference = endDate - startDate;
  difference -= difference % 60000;
  difference = difference / 60000;
  const minutes = difference % 60;
  difference -= minutes;
  difference = difference / 60;
  const hours = difference % 24;
  difference -= hours;
  const days = difference / 24;

  let dateToString = ``;

  if (days > 0) {
    dateToString = days + `D `;
  }

  if (days > 0 || hours > 0) {
    dateToString = dateToString + hours + `H `;
  }

  dateToString = dateToString + minutes + `M`;

  return dateToString;
};

export {
  getDatesDifference,
  timeToDateString,
  timeToString
};
