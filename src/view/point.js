import {
  render,
  createElement,
  RenderPosition
} from './../utils/dom';
import {pointTypeToPretext} from './../constants';
import {
  getDatesDifference,
  timeToString
} from './../utils/date';
import OffersList from './offers-list';

const formatPointTitle = (point) => `${pointTypeToPretext[point.type]} ${point.destination}`;

const generateOffers = (container, offers) => {
  if (offers.length > 0) {
    render(container, new OffersList().getElement(offers), RenderPosition.AFTER_END);
  }
};

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
            <time class="event__start-time" datetime="${point.startTime.toISOString()}">${timeToString(point.startTime)}</time>
            &mdash;
            <time class="event__end-time" datetime="${point.endTime.toISOString()}">${timeToString(point.endTime)}</time>
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
  constructor() {
    this._element = null;
  }

  _getTemplate(point) {
    return createPointTemplate(point);
  }

  getElement(point) {
    if (!this._element) {
      this._element = createElement(this._getTemplate(point));
    }

    const pointPrice = this._element.querySelector(`.event__price`);
    generateOffers(pointPrice, point.offers);

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
