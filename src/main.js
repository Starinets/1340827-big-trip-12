import {render} from './utils/dom.js';
import {insertPosition} from './utils/constants.js';
import {createInfoTemplate} from './view/info.js';
import {createMainInfoTemplate} from './view/main-info.js';
import {createCostInfoTemplate} from './view/cost-info.js';
import {createMenuTemplate} from './view/menu.js';
import {createFiltersTemplate} from './view/filters.js';
import {createSortTemplate} from './view/sort.js';
import {createDaysTemplate} from './view/days.js';
import {createDayTemplate} from './view/day.js';
import {createAddPointButtonTemplate} from './view/add-point-button.js';
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

let minDate = new Date();

const points = new Array(EVENT_COUNT)
  .fill()
  .map(() => {
    let point = generatePoint(minDate);
    minDate = point.endTime;
    return point;
  });

render(infoPlace, createInfoTemplate(), insertPosition.AFTER_BEGIN);
render(infoPlace, createAddPointButtonTemplate(), insertPosition.BEFORE_END);

const infoMainPlace = infoPlace.querySelector(`.trip-info`);

render(infoMainPlace, createMainInfoTemplate(getTripPath(points)), insertPosition.BEFORE_END);
render(infoMainPlace, createCostInfoTemplate(getTripCost(points)), insertPosition.BEFORE_END);


render(menuPlace, createMenuTemplate(), insertPosition.AFTER_END);
render(filtersPlace, createFiltersTemplate(), insertPosition.BEFORE_END);

render(sortingPlace, createSortTemplate(), insertPosition.AFTER_END);
render(contentPlace, createDaysTemplate(), insertPosition.BEFORE_END);

const dayPlace = contentPlace.querySelector(`.trip-days`);

const result = points
  .sort((less, more) => less.startTime - more.startTime)
  .reduce((acc, item) => {
    acc[item.day] = acc[item.day] || [];
    acc[item.day].push(item);
    return acc;
  }, {});

let counter = 0;

for (const day in result) {
  if (result.hasOwnProperty(day)) {
    counter++;
    render(dayPlace, createDayTemplate(day, counter, result[day]), insertPosition.BEFORE_END);
  }
}
