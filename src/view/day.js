import {
  render,
  createElement,
  RenderPosition
} from './../utils/dom';
import PointList from './point-list';

const formatMonthDate = new Intl.DateTimeFormat(`en-GB`, {
  month: `short`,
  day: `numeric`,
}).format;

const createDayTemplate = (dayDate, counter) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${counter}</span>
        <time class="day__date" datetime="${dayDate.toISOString()}">${formatMonthDate(dayDate)}</time>
      </div>
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

    render(this._element, new PointList().getElement(dayPoints), RenderPosition.BEFORE_END);

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
