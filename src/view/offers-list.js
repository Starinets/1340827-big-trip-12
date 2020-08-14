import {createElement} from './../utils/dom';
import Offer from './offer';

const MAX_OFFERS_COUNT = 3;

const generateOffers = (container, offers) => {
  offers.slice(0, MAX_OFFERS_COUNT)
    .forEach((offer) => {
      container.append(new Offer().getElement(offer));
    });
};

const createOffersListTemplate = () => `<ul class="event__selected-offers"></ul>`;

export default class OffersList {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createOffersListTemplate();
  }

  getElement(offers) {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    generateOffers(this._element, offers);
    // ${offerTemplates}

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export {generateOffers as generateOffersList};
