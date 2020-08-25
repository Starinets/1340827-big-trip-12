import Abstract from './abstract';

const createCostInfoTemplate = (total) => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
    </p>`
  );
};

export default class CostInfo extends Abstract {
  constructor(total) {
    super();

    this._total = total;
  }

  _getTemplate() {
    return createCostInfoTemplate(this._total);
  }
}
