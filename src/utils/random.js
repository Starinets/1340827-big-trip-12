const MINUTES_IN_HALF_HOUR = 30;
const maxAddToDate = {
  DAYS: 2,
  HOURS: 23,
  HALF_HOUR_PERIODS: 2,
};

const getRandomInteger = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomDate = (minDate = new Date()) => {
  const randomDate = new Date(minDate);

  randomDate.setDate(randomDate.getDate()
    + getRandomInteger(0, maxAddToDate.DAYS));

  randomDate.setHours(randomDate.getHours()
    + getRandomInteger(0, maxAddToDate.HOURS));

  randomDate.setMinutes(randomDate.getMinutes()
    + getRandomInteger(1, maxAddToDate.HALF_HOUR_PERIODS) * MINUTES_IN_HALF_HOUR);

  return new Date(randomDate);
};

export {getRandomInteger, getRandomDate};
