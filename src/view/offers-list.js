import {createElement} from './../utils/dom';

const createOffersListTemplate = () => `<ul class="event__selected-offers"></ul>`;

export default class OffersList {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createOffersListTemplate();
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
