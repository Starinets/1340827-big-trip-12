import Abstract from './abstract';

const createAddPointButtonTemplate = () => {
  return (
    `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`
  );
};

export default class AddPointButton extends Abstract {
  constructor() {
    super();

    this._elementClickHandler = this._elementClickHandler.bind(this);
  }

  _getTemplate() {
    return createAddPointButtonTemplate();
  }

  _elementClickHandler(evt) {
    evt.preventDefault();
    this._callback.buttonClick();
  }

  // весь объект является кнопкой, и больше в нем ничего нет, поэтому ClickHandler
  setClickHandler(callback) {
    this._callback.buttonClick = callback;

    this.getElement().addEventListener(`click`, this._elementClickHandler);
  }
}
