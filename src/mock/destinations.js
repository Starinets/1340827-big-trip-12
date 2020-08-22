import {getRandomInteger} from './random.js';

const PHOTOS_COUNT = 5;
const INFO_COUNT = 5;

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

const generateDestinationInfo = (infoCount) => new Array(infoCount)
  .fill()
  .map(() => INFOS[getRandomInteger(0, INFOS.length - 1)])
  .join(` `);

const generateDestinationPhotos = (photosCount) => new Array(photosCount)
  .fill()
  .map(() => {
    return {
      href: `img/icons/${Math.random()}.png`,
      description: generateDestinationInfo(getRandomInteger(1, INFO_COUNT)),
    };
  });

const generateDestinationsInfo = () => {
  return DESTINATIONS.map((item) => {
    return {
      name: item,
      description: generateDestinationInfo(getRandomInteger(1, INFO_COUNT)),
      photos: generateDestinationPhotos(getRandomInteger(1, PHOTOS_COUNT)),
    };
  });
};

export {generateDestinationsInfo};
