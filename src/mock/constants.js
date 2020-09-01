const OFFERS_COUNT = 5;
const INFO_COUNT = 5;
const PHOTOS_COUNT = 5;

const MIN_PHOTO_PATH_NUMBER = 1;
const MAX_PHOTO_PATH_NUMBER = 5;

const POINT_TYPES = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
  `check-in`,
  `sightseeing`,
  `restaurant`
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

export {
  OFFERS_COUNT,
  INFO_COUNT,
  PHOTOS_COUNT,
  MIN_PHOTO_PATH_NUMBER,
  MAX_PHOTO_PATH_NUMBER,
  POINT_TYPES,
  DESTINATIONS,
  INFOS,
  OFFERS
};
