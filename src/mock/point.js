import {getRandomInteger} from '../utils/random.js';

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

const generatePoint = () => ({
  type: pointType[getRandomInteger(0, pointType.length - 1)],
  destination: destinations[getRandomInteger(0, destinations.length - 1)],
});

export {generatePoint};
