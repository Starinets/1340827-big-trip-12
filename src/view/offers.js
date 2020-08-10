import {createOfferTemplate} from './offer';

const MAX_OFFERS_COUNT = 3;

const generateOffersList = (offers = []) => {
  if (offers.length > 0) {
    const offersCount = Math.min(MAX_OFFERS_COUNT, offers.length);
    let offerTemplates = ``;

    for (let index = 0; index < offersCount; index++) {
      offerTemplates += createOfferTemplate(offers[index]);

    }

    return createOffersListTemplate(offerTemplates);
  }
  return ``;
};

const createOffersListTemplate = (offerTemplates) => `<h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
    ${offerTemplates}
  </ul>`;

export {generateOffersList};
