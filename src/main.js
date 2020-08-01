import {createTripInfoTemplate} from './view/trip-info.js';
import {createTripMainInfoTemplate} from './view/trip-main-info.js';
import {createTripCostInfoTemplate} from './view/trip-cost-info.js';
import {createMenuTemplate} from './view/menu.js';
import {createFiltersTemplate} from './view/filters.js';
import {createTripSortTemplate} from './view/trip-sort.js';
import {createTripDaysTemplate} from './view/trip-days.js';
import {createTripDayTemplate} from './view/trip-day.js';
import {createTripEventTemplate} from './view/trip-event.js';
import {createTripEventFormTemplate} from './view/trip-event-form.js';

const EVENT_COUNT = 3;

const tripInfoPlace = document.querySelector(`.trip-main`);
const tripMenuPlace = tripInfoPlace.querySelector(`.js-menu`);
const tripFiltersPlace = tripInfoPlace.querySelector(`.trip-controls`);

const tripContentPlace = document.querySelector(`.trip-events`);
const tripSortingPlace = document.querySelector(`.js-sorting`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(tripInfoPlace, createTripInfoTemplate(), `afterbegin`);

const tripInfoMainPlace = tripInfoPlace.querySelector(`.trip-info`);
render(tripInfoMainPlace, createTripMainInfoTemplate(), `beforeend`);
render(tripInfoMainPlace, createTripCostInfoTemplate(), `beforeend`);


render(tripMenuPlace, createMenuTemplate(), `afterend`);
render(tripFiltersPlace, createFiltersTemplate(), `beforeend`);

render(tripSortingPlace, createTripSortTemplate(), `afterend`);
render(tripContentPlace, createTripEventFormTemplate(), `beforeend`);
render(tripContentPlace, createTripDaysTemplate(), `beforeend`);

const tripDayPlace = tripContentPlace.querySelector(`.trip-days`);
render(tripDayPlace, createTripDayTemplate(), `beforeend`);

const tripEventPlace = tripDayPlace.querySelector(`.trip-events__list`);

for (let i = 0; i < EVENT_COUNT; i++) {
  render(tripEventPlace, createTripEventTemplate(), `beforeend`);
}
