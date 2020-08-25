import Abstract from './abstract';

const createAddPointButtonTemplate = () => {
  return (
    `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`
  );
};

export default class AddPointButton extends Abstract {
  _getTemplate() {
    return createAddPointButtonTemplate();
  }
}
