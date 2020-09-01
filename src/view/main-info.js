import Abstract from './abstract';

const createMainInfoTemplate = (tripInfo, tripDuration) => {
  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${tripInfo}</h1>

      <p class="trip-info__dates">${tripDuration}</p>
    </div>`
  );
};

export default class MainInfo extends Abstract {
  constructor(tripInfo, tripDuration) {
    super();

    this._tripInfo = tripInfo;
    this._tripDuration = tripDuration;

  }

  _getTemplate() {
    return createMainInfoTemplate(this._tripInfo, this._tripDuration);
  }
}
