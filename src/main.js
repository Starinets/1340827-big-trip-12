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
import {createPointListTemplate} from './view/point-list.js';
import {createPointTemplate} from './view/point.js';
import {createPointFormTemplate} from './view/point-form.js';
import {createAddPointButtonTemplate} from './view/add-point-button.js';

const EVENT_COUNT = 3;

const infoPlace = document.querySelector(`.trip-main`);
const menuPlace = infoPlace.querySelector(`.js-menu`);
const filtersPlace = infoPlace.querySelector(`.trip-controls`);

const contentPlace = document.querySelector(`.trip-events`);
const sortingPlace = document.querySelector(`.js-sorting`);

render(infoPlace, createInfoTemplate(), insertPosition.AFTER_BEGIN);
render(infoPlace, createAddPointButtonTemplate(), insertPosition.BEFORE_END);

const infoMainPlace = infoPlace.querySelector(`.trip-info`);
render(infoMainPlace, createMainInfoTemplate(), insertPosition.BEFORE_END);
render(infoMainPlace, createCostInfoTemplate(), insertPosition.BEFORE_END);


render(menuPlace, createMenuTemplate(), insertPosition.AFTER_END);
render(filtersPlace, createFiltersTemplate(), insertPosition.BEFORE_END);

render(sortingPlace, createSortTemplate(), insertPosition.AFTER_END);
render(contentPlace, createDaysTemplate(), insertPosition.BEFORE_END);

const dayPlace = contentPlace.querySelector(`.trip-days`);
render(dayPlace, createDayTemplate(), insertPosition.BEFORE_END);
const pointListPlace = contentPlace.querySelector(`.day`);
render(pointListPlace, createPointListTemplate(), insertPosition.BEFORE_END);

const eventPlace = dayPlace.querySelector(`.trip-events__list`);

render(eventPlace, createPointFormTemplate(), insertPosition.BEFORE_END);
for (let i = 0; i < EVENT_COUNT; i++) {
  render(eventPlace, createPointTemplate(), insertPosition.BEFORE_END);
}
