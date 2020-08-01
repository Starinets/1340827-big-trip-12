import {createInfoTemplate} from './view/info.js';
import {createMainInfoTemplate} from './view/main-info.js';
import {createCostInfoTemplate} from './view/cost-info.js';
import {createMenuTemplate} from './view/menu.js';
import {createFiltersTemplate} from './view/filters.js';
import {createSortTemplate} from './view/sort.js';
import {createDaysTemplate} from './view/days.js';
import {createDayTemplate} from './view/day.js';
import {createPointTemplate} from './view/point.js';
import {createPointFormTemplate} from './view/point-form.js';
import {createAddPointButtonTemplate} from './view/add-point-button.js';

const EVENT_COUNT = 3;

const infoPlace = document.querySelector(`.trip-main`);
const menuPlace = infoPlace.querySelector(`.js-menu`);
const filtersPlace = infoPlace.querySelector(`.trip-controls`);

const contentPlace = document.querySelector(`.trip-events`);
const sortingPlace = document.querySelector(`.js-sorting`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(infoPlace, createInfoTemplate(), `afterbegin`);
render(infoPlace, createAddPointButtonTemplate(), `beforeend`);

const infoMainPlace = infoPlace.querySelector(`.trip-info`);
render(infoMainPlace, createMainInfoTemplate(), `beforeend`);
render(infoMainPlace, createCostInfoTemplate(), `beforeend`);


render(menuPlace, createMenuTemplate(), `afterend`);
render(filtersPlace, createFiltersTemplate(), `beforeend`);

render(sortingPlace, createSortTemplate(), `afterend`);
render(contentPlace, createDaysTemplate(), `beforeend`);

const dayPlace = contentPlace.querySelector(`.trip-days`);
render(dayPlace, createDayTemplate(), `beforeend`);

const eventPlace = dayPlace.querySelector(`.trip-events__list`);

render(eventPlace, createPointFormTemplate(), `beforeend`);
for (let i = 0; i < EVENT_COUNT; i++) {
  render(eventPlace, createPointTemplate(), `beforeend`);
}
