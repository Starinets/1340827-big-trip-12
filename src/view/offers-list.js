import {createElement} from './../utils/dom';
import {createOfferTemplate} from './offer';

const MAX_OFFERS_COUNT = 3;

const generateOffersList = (offers) => {
  return createOffersListTemplate(offers
      .slice(0, MAX_OFFERS_COUNT)
      .map(createOfferTemplate)
      .join(``));
};

const createOffersListTemplate = () => `<h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers"></ul>`;

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

    // ${offerTemplates}

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export {generateOffersList};
