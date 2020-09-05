import {FilterType} from './../constants';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points, currentDate) => points.filter((point) => point.startTime > currentDate),
  [FilterType.PAST]: (points, currentDate) => points.filter((point) => point.startTime <= currentDate)
};
