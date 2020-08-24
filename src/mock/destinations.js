import {getRandomInteger} from './random.js';
import {
  INFO_COUNT,
  PHOTOS_COUNT,
  INFOS,
  DESTINATIONS
} from './constants';

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
