import {pointTypeToPretext} from './../constants';
import {
  getDatesDifference,
  timeToString,
  formatDateToISOString
} from './../utils/date';
import Abstract from './abstract';

const formatPointTitle = (point) => `${pointTypeToPretext[point.type]} ${point.destination.name}`;

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

export default class Point extends Abstract {
  constructor(point) {
    super();

    this._point = point;
    this._onRollupButtonClick = this._onRollupButtonClick.bind(this);
  }

  _getTemplate() {
    return createPointTemplate(this._point);
  }

  getContainer() {
    return this.getElement().querySelector(`.event__price`);
  }

  _onRollupButtonClick() {
    this._callback.rollupButtonClick();
  }

  setRollupButtonClickHandler(callback) {
    this._callback.rollupButtonClick = callback;
    this.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, this._onRollupButtonClick);
  }
}
