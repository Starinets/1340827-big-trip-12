import {createElement} from './../utils/dom';

const createPointMessageTemplate = (textContent) => {
  return (
    `<p class="trip-events__msg">${textContent}</p>`
  );
};

export default class PointMessage {
  constructor(textContent) {
    this._element = null;

    this._textContent = textContent;
  }

  _getTemplate() {
    return createPointMessageTemplate(this._textContent);
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
