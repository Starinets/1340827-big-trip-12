import {FilterType} from './../constants';

const filterTypeToPoints = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.FUTURE]: (points, currentDate) => points.filter((point) => point.startTime > currentDate),
  [FilterType.PAST]: (points, currentDate) => points.filter((point) => point.startTime <= currentDate)
};

export {filterTypeToPoints};
