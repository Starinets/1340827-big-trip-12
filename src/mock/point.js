import {
  getRandomInteger,
  getRandomDate,
  getNewID
} from './random.js';
import {addLeadingRank} from '../utils/date';
import {
  OFFERS_COUNT,
  OFFERS,
  POINT_TYPES,
  DESTINATIONS
} from './constants';
import {generateDestinationInfo} from './destinations';

const Price = {
  min: 2,
  max: 50,
  multiplicity: 10,
};

const generatePoint = (minDate = new Date()) => {
  let point = {
    id: getNewID(),
    type: POINT_TYPES[getRandomInteger(0, POINT_TYPES.length - 1)],
    destination: generateDestinationInfo(DESTINATIONS[getRandomInteger(0, DESTINATIONS.length - 1)]),
    offers: generateOffers(getRandomInteger(0, OFFERS_COUNT)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    price: getRandomInteger(Price.min, Price.max) * Price.multiplicity,
  };

  minDate = getRandomDate(minDate);
  point.startTime = minDate;
  point.day = `${minDate.getFullYear()}-${addLeadingRank(minDate.getMonth() + 1)}-${addLeadingRank(minDate.getDate())}`;
  minDate = getRandomDate(minDate);
  point.endTime = minDate;

  return point;
};

const generateOffers = (offersCount) => new Array(offersCount)
  .fill()
  .map(() => OFFERS[getRandomInteger(0, OFFERS.length - 1)]);

export {generatePoint};
