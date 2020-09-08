import Abstract from './abstract';

const createOfferTemplate = (offer) => `<li class="event__offer">
    <span class="event__offer-title">${offer.name}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
  </li>`;

export default class Offer extends Abstract {
  constructor(specific) {
    super();

    this._specific = specific;
  }

  _getTemplate() {
    return createOfferTemplate(this._specific);
  }
}
