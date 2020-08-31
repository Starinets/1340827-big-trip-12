import {getRandomInteger} from './random.js';
import {
  INFO_COUNT,
  PHOTOS_COUNT,
  INFOS,
  DESTINATIONS,
  MIN_PHOTO_PATH_NUMBER,
  MAX_PHOTO_PATH_NUMBER
} from './constants';

const generateInfo = (infoCount) => new Array(infoCount)
  .fill()
  .map(() => INFOS[getRandomInteger(0, INFOS.length - 1)])
  .join(` `);

const generatePhotos = (photosCount) => new Array(photosCount)
  .fill()
  .map(() => {
    return {
      href: `img/photos/${getRandomInteger(MIN_PHOTO_PATH_NUMBER, MAX_PHOTO_PATH_NUMBER)}.jpg`,
      description: generateInfo(getRandomInteger(1, INFO_COUNT)),
    };
  });

const generateDestinationInfo = (item) =>
  ({
    name: item,
    description: generateInfo(getRandomInteger(1, INFO_COUNT)),
    photos: generatePhotos(getRandomInteger(1, PHOTOS_COUNT)),
  });

const generateDestinationsInfo = () =>
  DESTINATIONS.map((item) =>
    generateDestinationInfo(item));


export {
  generateDestinationsInfo,
  generateDestinationInfo
};
