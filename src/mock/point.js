import {
  getRandomInteger,
  getRandomDate
} from '../utils/random.js';

const OFFERS_COUNT = 5;
const INFO_COUNT = 5;
const PHOTOS_COUNT = 5;

const POINT_TYPES = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check`,
  `Sightseeing`,
  `Restaurant`
];

const DESTINATIONS = [
  `Amsterdam`,
  `Frankfurt`,
  `Stambul`,
  `Kiev`,
  `Paris`,
  `Montreal`,
  `Toronto`,
  `Ottava`
];

const INFOS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const OFFERS = [
  {
    type: `luggage`,
    name: `Add luggage`,
    price: 30
  },
  {
    type: `comfort`,
    name: `Switch to comfort class`,
    price: 100
  },
  {
    type: `meal`,
    name: `Add meal`,
    price: 15
  },
  {
    type: `seats`,
    name: `Choose seats`,
    price: 5
  },
  {
    type: `train`,
    name: `Travel by train`,
    price: 40
  }
];

const Price = {
  min: 2,
  max: 50,
  multiplicity: 10,
};

const generatePoint = (minDate = new Date()) => {
  let point = {
    type: POINT_TYPES[getRandomInteger(0, POINT_TYPES.length - 1)],
    destination: DESTINATIONS[getRandomInteger(0, DESTINATIONS.length - 1)],
    offers: generateOffers(getRandomInteger(0, OFFERS_COUNT)),
    destinationInfo: {
      text: generateDestinationInfo(getRandomInteger(1, INFO_COUNT)),
      photos: generateDestinationPhotos(getRandomInteger(1, PHOTOS_COUNT)),
    },
    price: getRandomInteger(Price.min, Price.max) * Price.multiplicity,
  };

  minDate = getRandomDate(minDate);
  point.startTime = minDate;
  minDate = getRandomDate(minDate);
  point.endTime = minDate;

  return point;
};

const generateOffers = (offersCount) => new Array(offersCount)
  .fill()
  .map(() => OFFERS[getRandomInteger(0, OFFERS.length - 1)]);

const generateDestinationInfo = (infoCount) => new Array(infoCount)
  .fill()
  .map(() => INFOS[getRandomInteger(0, INFOS.length - 1)])
  .join(` `);

const generateDestinationPhotos = (photosCount) => new Array(photosCount)
  .fill()
  .map(() => Math.random());

export {generatePoint};
