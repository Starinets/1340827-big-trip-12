import {createElement} from './../utils/dom';

const createDaysTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class Days {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createDaysTemplate();
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

export {createDaysTemplate};
