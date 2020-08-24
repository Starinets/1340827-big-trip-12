import {createElement} from './../utils/dom';
import {pointTypeToPretext} from './../constants';
import {
  getDatesDifference,
  timeToString,
  formatDateToISOString
} from './../utils/date';

const formatPointTitle = (point) => `${pointTypeToPretext[point.type]} ${point.destination}`;

const createPointTemplate = (point) => {
  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${formatPointTitle(point)}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${formatDateToISOString(point.startTime)}">${timeToString(point.startTime)}</time>
            &mdash;
            <time class="event__end-time" datetime="${formatDateToISOString(point.endTime)}">${timeToString(point.endTime)}</time>
            </p>
          <p class="event__duration">${getDatesDifference(point.startTime, point.endTime)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${point.price}</span>
        </p>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Point {
  constructor(point) {
    this._element = null;

    this._point = point;
  }

  _getTemplate() {
    return createPointTemplate(this._point);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getContainer() {
    return this.getElement().querySelector(`.event__price`);
  }

  getRollupButton() {
    return this.getElement().querySelector(`.event__rollup-btn`);
  }
}
