const MINUTES_IN_HALF_HOUR = 30;
const maxAddToDate = {
  DAYS: 1,
  HOURS: 12,
  HALF_HOUR_PERIODS: 3,
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

  randomDate.setMinutes(getRandomInteger(2, maxAddToDate.HALF_HOUR_PERIODS) * MINUTES_IN_HALF_HOUR);

  return new Date(randomDate);
};

const getNewID = () => `f${(~~(Math.random() * 1e8)).toString(16)}`;

export {
  getRandomInteger,
  getRandomDate,
  getNewID
};
