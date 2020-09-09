import Abstract from './abstract';

const ACTIVE_MENU_CLASS = `trip-tabs__btn--active`;

const createMenuTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>`
  );
};

export default class Menu extends Abstract {
  constructor() {
    super();

    this._tabsClickHandler = this._tabsClickHandler.bind(this);
  }

  _getTemplate() {
    return createMenuTemplate();
  }

  setClickHandler(callback) {
    this._callback.itemClick = callback;
    this.getElement().addEventListener(`click`, this._tabsClickHandler);
  }

  _tabsClickHandler(evt) {
    evt.preventDefault();

    const previousActive = this.getElement().querySelector(`.${ACTIVE_MENU_CLASS}`);
    const currentActive = evt.target;

    if (previousActive !== currentActive) {
      previousActive.classList.remove(ACTIVE_MENU_CLASS);
      currentActive.classList.add(ACTIVE_MENU_CLASS);

      this._callback.itemClick();
    }
  }

}
