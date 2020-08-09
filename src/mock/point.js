import {getRandomInteger, getRandomDate} from '../utils/random.js';

const OFFERS_COUNT = 5;
const INFO_COUNT = 5;
const PHOTOS_COUNT = 5;
const Price = {
  min: 2,
  max: 50,
  multiplicity: 10,
};

const pointType = [
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

const destinations = [
  `Amsterdam`,
  `Frankfurt`,
  `Stambul`,
  `Kiev`,
  `Paris`,
  `Montreal`,
  `Toronto`,
  `Ottava`
];

const infos = [
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

const generatePoint = () => ({
  type: pointType[getRandomInteger(0, pointType.length - 1)],
  destination: destinations[getRandomInteger(0, destinations.length - 1)],
  offers: generateOffers(getRandomInteger(0, OFFERS_COUNT)),
  destinationInfo: {
    text: generateDestinationInfo(getRandomInteger(1, INFO_COUNT)),
    photos: generateDestinationPhotos(getRandomInteger(1, PHOTOS_COUNT)),
  },
  startTime: getRandomDate(),
  endTime: getRandomDate(),
  cost: getRandomInteger(Price.min, Price.max) * Price.multiplicity,
});

const generateOffers = (offersCount) => new Array(offersCount)
  .fill()
  .map(() => ({
    type: `offerType`,
    name: `offerName`,
    price: `offerPrice`,
  }));

const generateDestinationInfo = (infoCount) => new Array(infoCount)
  .fill()
  .map(() => infos[getRandomInteger(0, infos.length - 1)])
  .join(` `);

const generateDestinationPhotos = (photosCount) => new Array(photosCount)
  .fill()
  .map(() => Math.random());

export {generatePoint};
