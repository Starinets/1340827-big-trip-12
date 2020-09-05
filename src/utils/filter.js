import {FilterType} from './../constants';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points, currentDate) => points.filter((point) => point.startDate > currentDate),
  [FilterType.PAST]: (points, currentDate) => points.filter((point) => point.startDate <= currentDate)
};
