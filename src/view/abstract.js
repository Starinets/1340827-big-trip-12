import {createElement} from './../utils/dom';

const SHAKE_ANIMATION_TIMEOUT = 600;

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }

    this._element = null;

    this._callback = {};
  }

  getElement() {
    if (this._element === null) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  shake(callback) {
    this.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.getElement().style.animation = ``;
      callback();
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }
}
