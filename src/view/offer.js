import {createElement} from './../utils/dom';

const createOfferTemplate = (offer) => `<li class="event__offer">
    <span class="event__offer-title">${offer.name}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
  </li>`;

export default class Offer {
  constructor(offer) {
    this._element = null;

    this._offer = offer;
  }

  _getTemplate() {
    return createOfferTemplate(this._offer);
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
