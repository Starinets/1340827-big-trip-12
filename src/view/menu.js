import Abstract from './abstract';
import {MenuItem} from './../constants';

const ACTIVE_MENU_CLASS = `trip-tabs__btn--active`;

const createMenuTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn trip-tabs__btn--active" data-menu-item="${MenuItem.TABLE}" href="#">Table</a>
      <a class="trip-tabs__btn" data-menu-item="${MenuItem.STATISTICS}" href="#">Stats</a>
    </nav>`
  );
};

export default class Menu extends Abstract {
  constructor() {
    super();

    this._clickHandler = this._clickHandler.bind(this);
  }

  _getTemplate() {
    return createMenuTemplate();
  }

  setClickHandler(callback) {
    this._callback.itemClick = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }

  _clickHandler(evt) {
    evt.preventDefault();

    const previousActive = this.getElement().querySelector(`.${ACTIVE_MENU_CLASS}`);
    const currentActive = evt.target;

    if (previousActive !== currentActive) {
      previousActive.classList.remove(ACTIVE_MENU_CLASS);
      currentActive.classList.add(ACTIVE_MENU_CLASS);

      this._callback.itemClick(currentActive.dataset.menuItem);
    }
  }

}
