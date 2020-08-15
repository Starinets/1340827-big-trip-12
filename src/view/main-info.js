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
  constructor() {
    this._element = null;
  }

  _getTemplate(tripInfo) {
    return createMainInfoTemplate(tripInfo);
  }

  getElement(tripInfo) {
    if (!this._element) {
      this._element = createElement(this._getTemplate(tripInfo));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
