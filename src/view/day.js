import {createElement} from './../utils/dom';
import {createPointListTemplate} from './point-list';

const formatMonthDate = new Intl.DateTimeFormat(`en-GB`, {
  month: `short`,
  day: `numeric`,
}).format;

const createDayTemplate = (dayDate, counter, dayPoints) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${counter}</span>
        <time class="day__date" datetime="${dayDate.toISOString()}">${formatMonthDate(dayDate)}</time>
      </div>
      ${createPointListTemplate(dayPoints)}
    </li>`
  );
};

export default class Day {
  constructor() {
    this._element = null;
  }

  _getTemplate(dayDate, counter, dayPoints) {
    return createDayTemplate(dayDate, counter, dayPoints);
  }

  getElement(dayDate, counter, dayPoints) {
    if (!this._element) {
      this._element = createElement(this._getTemplate(dayDate, counter, dayPoints));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export {createDayTemplate};
