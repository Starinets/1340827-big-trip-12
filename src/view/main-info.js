import {createElement} from './../utils/dom';

const createMainInfoTemplate = (tripInfo) => {
  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${tripInfo}</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>`
  );
};

export default class MainInfo {
  constructor(tripInfo) {
    this._element = null;

    this._tripInfo = tripInfo;
  }

  _getTemplate() {
    return createMainInfoTemplate(this._tripInfo);
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
