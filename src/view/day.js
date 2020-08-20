import {createElement} from './../utils/dom';
import {formatDateToISOString} from './../utils/date';

const formatMonthDate = new Intl.DateTimeFormat(`en-GB`, {
  month: `short`,
  day: `numeric`,
}).format;

const createDayTemplate = (dayDate, counter) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${counter}</span>
        <time class="day__date" datetime="${formatDateToISOString(dayDate)}">${formatMonthDate(dayDate)}</time>
      </div>
    </li>`
  );
};

export default class Day {
  constructor(dayDate, counter) {
    this._element = null;

    this._dayDate = dayDate;
    this._counter = counter;
  }

  _getTemplate() {
    return createDayTemplate(this._dayDate, this._counter);
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
}
