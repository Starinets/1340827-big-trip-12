import Abstract from './abstract';

const createOffersListTemplate = () => `<ul class="event__selected-offers"></ul>`;

export default class OfferList extends Abstract {
  _getTemplate() {
    return createOffersListTemplate();
  }
}
