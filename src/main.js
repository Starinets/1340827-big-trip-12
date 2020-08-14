import {
  render,
  InsertPosition
} from './utils/dom';
import Info from './view/info';
import MainInfo from './view/main-info';
import CostInfo from './view/cost-info';
import Menu from './view/menu';
import Filters from './view/filters';
import {createSortTemplate} from './view/sort.js';
import {createDaysTemplate} from './view/days.js';
import {createDayTemplate} from './view/day.js';
import AddPointButton from './view/add-point-button';
import {generatePoint} from './mock/point.js';

const EVENT_COUNT = 30;

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

const formatDayDate = (date) => date.toISOString().slice(0, 10);

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
      render(dayPlace, createDayTemplate(new Date(date), counter + 1, dayPoints), InsertPosition.BEFORE_END);
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
// render(infoPlace, createInfoTemplate(), InsertPosition.AFTER_BEGIN);
infoPlace.append(new AddPointButton().getElement());
// render(infoPlace, createAddPointButtonTemplate(), InsertPosition.BEFORE_END);

const infoMainPlace = infoPlace.querySelector(`.trip-info`);

infoMainPlace.append(new MainInfo().getElement(getTripPath(points)));
// render(infoMainPlace, createMainInfoTemplate(getTripPath(points)), InsertPosition.BEFORE_END);
infoMainPlace.append(new CostInfo().getElement(getTripCost(points)));
// render(infoMainPlace, createCostInfoTemplate(getTripCost(points)), InsertPosition.BEFORE_END);

menuPlace.append(new Menu().getElement());
// render(menuPlace, createMenuTemplate(), InsertPosition.AFTER_END);
filtersPlace.append(new Filters().getElement());
// render(filtersPlace, createFiltersTemplate(), InsertPosition.BEFORE_END);

render(sortingPlace, createSortTemplate(), InsertPosition.AFTER_END);
render(contentPlace, createDaysTemplate(), InsertPosition.BEFORE_END);

const dayPlace = contentPlace.querySelector(`.trip-days`);

renderGroupedPoints(points);
