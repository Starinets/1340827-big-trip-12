import {createOfferTemplate} from './offer';

const MAX_OFFERS_COUNT = 3;

const generateOffersList = (offers = []) => {
  if (offers.length > 0) {
    return createOffersListTemplate(offers
      .slice(0, MAX_OFFERS_COUNT)
      .map(createOfferTemplate)
      .join(``));
  }
  return ``;
};

const createOffersListTemplate = (offerTemplates) => `<h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
    ${offerTemplates}
  </ul>`;

export {generateOffersList};
