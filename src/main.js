import Info from './view/info';
import MainInfo from './view/main-info';
import CostInfo from './view/cost-info';
import Menu from './view/menu';
import Filters from './view/filters';
import Sort from './view/sort';
import Days from './view/days';
import Day from './view/day';
import AddPointButton from './view/add-point-button';
import {generatePoint} from './mock/point';

const EVENT_COUNT = 30;
const MINUTES_IN_TIME_ZONE_OFFSET = 60;

const infoPlace = document.querySelector(`.trip-main`);
const menuPlace = infoPlace.querySelector(`.js-menu`);
const filtersPlace = infoPlace.querySelector(`.trip-controls`);

const contentPlace = document.querySelector(`.trip-events`);
const sortingPlace = document.querySelector(`.js-sorting`);

const getTripCost = (points) => points.reduce((pointsPrice, point) =>
  pointsPrice + point.price + point.offers.reduce((offersPrice, offer) =>
    offersPrice + offer.price, 0), 0);

const getTripPath = (points) => {
  switch (points.length) {
    case 0:
      return ``;
    case 1:
      return `${points[0].destination}`;
    case 2:
      return `${points[0].destination} &mdash; ${points[points.length - 1].destination}`;
    case 3:
      return `${points[0].destination} &mdash; ${points[1].destination} &mdash; ${points[points.length - 1].destination}`;
    default:
      return `${points[0].destination} &mdash; ... &mdash; ${points[points.length - 1].destination}`;
  }
};

const formatDayDate = (date) => {
  const formattedDate = new Date(date);

  formattedDate.setHours(formattedDate.getHours() - formattedDate.getTimezoneOffset() / MINUTES_IN_TIME_ZONE_OFFSET);

  return formattedDate.toISOString().slice(0, 10);
};

const reducePointByDay = (days, point) => {
  const dayDate = formatDayDate(point.startTime);

  if (Array.isArray(days[dayDate])) {
    days[dayDate].push(point);
  } else {
    days[dayDate] = [point];
  }

  return days;
};

const groupPointsByDays = (points) => points
  .sort((less, more) => less.startTime - more.startTime)
  .reduce(reducePointByDay, {});

const renderGroupedPoints = (points) => {
  const days = groupPointsByDays(points);

  Object.entries(days)
    .forEach(([date, dayPoints], counter) => {
      dayPlace.append(new Day().getElement(new Date(date), counter + 1, dayPoints));
    });
};

let minDate = new Date();

const points = new Array(EVENT_COUNT)
  .fill()
  .map(() => {
    let point = generatePoint(minDate);
    minDate = point.endTime;
    return point;
  });

infoPlace.prepend(new Info().getElement());
infoPlace.append(new AddPointButton().getElement());

const infoMainPlace = infoPlace.querySelector(`.trip-info`);

infoMainPlace.append(new MainInfo().getElement(getTripPath(points)));
infoMainPlace.append(new CostInfo().getElement(getTripCost(points)));

menuPlace.after(new Menu().getElement());
filtersPlace.append(new Filters().getElement());

sortingPlace.after(new Sort().getElement());
contentPlace.append(new Days().getElement());

const dayPlace = contentPlace.querySelector(`.trip-days`);

renderGroupedPoints(points);
