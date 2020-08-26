import Abstract from './abstract';

const createInfoTemplate = () => {
  return (
    `<section class="trip-main__trip-info  trip-info">
    </section>`
  );
};

export default class TripInfo extends Abstract {
  _getTemplate() {
    return createInfoTemplate();
  }
}
