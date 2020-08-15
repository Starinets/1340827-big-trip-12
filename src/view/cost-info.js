import {createElement} from './../utils/dom';

const createCostInfoTemplate = (total) => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
    </p>`
  );
};

export default class CostInfo {
  constructor() {
    this._element = null;
  }

  _getTemplate(total) {
    return createCostInfoTemplate(total);
  }

  getElement(total) {
    if (!this._element) {
      this._element = createElement(this._getTemplate(total));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
