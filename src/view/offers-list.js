import {
  render,
  createElement,
  RenderPosition
} from './../utils/dom';
import Offer from './offer';

const MAX_OFFERS_COUNT = 3;

const generateOffers = (container, offers) => {
  offers.slice(0, MAX_OFFERS_COUNT)
    .forEach((offer) => {
      render(container, new Offer().getElement(offer), RenderPosition.BEFORE_END);
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

      generateOffers(this._element, offers);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
