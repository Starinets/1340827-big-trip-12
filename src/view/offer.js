import {createElement} from './../utils/dom';

const createOfferTemplate = (offer) => `<li class="event__offer">
    <span class="event__offer-title">${offer.name}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
  </li>`;

export default class Offer {
  constructor() {
    this._element = null;
  }

  _getTemplate(offer) {
    return createOfferTemplate(offer);
  }

  getElement(offer) {
    if (!this._element) {
      this._element = createElement(this._getTemplate(offer));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
