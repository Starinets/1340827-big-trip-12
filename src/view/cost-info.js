import {createElement} from './../utils/dom';

const createCostInfoTemplate = (total) => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
    </p>`
  );
};

export default class CostInfo {
  constructor(total) {
    this._element = null;

    this._total = total;
  }

  _getTemplate() {
    return createCostInfoTemplate(this._total);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
