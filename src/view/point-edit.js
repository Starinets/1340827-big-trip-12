import {
  pointTypeToPretext,
  TYPE_GROUP_ACTIVITY,
  TYPE_GROUP_TRANSFER,
  OfferList
} from '../constants';
import {setFirstCharToUpperCase} from './../utils/general';
import {dateToString} from '../utils/date';
import SmartView from "./smart";

const BLANK_POINT = {
  type: ``,
  destination: ``,
  startTime: new Date(),
  endTime: new Date(),
  offers: [],
  isFavorite: false,
  price: 0,
};

const isOfferCheckedForPoint = (offerName, offers) => offers.find((item) => item.type === offerName);

const createOptionsListTemplate = (destinations) => {
  return destinations
    .map(({name}) => `<option value="${name}"></option>`)
    .join(``);
};

const createPhotoContainerTemplate = (data, destinations) => {
  const destination = destinations.find((item) => item.name === data.destination);

  return (
    `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination.description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">

        ${createPhotoListTemplate(data, destination.photos)}

      </div>
    </div>
  </section>`
  );
};

const createPhotoListTemplate = (data, photos) =>
  photos.map((photo) =>
    `<img class="event__photo" src="${photo.href}" alt="${photo.description}">`);


const createEventListTemplate = (data, pointTypeList) => {
  return (
    pointTypeList.map((pointTypeItem) => {
      return (
        `<div class="event__type-item">
          <input id="event-type-${pointTypeItem}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointTypeItem}" ${data.type === pointTypeItem ? `checked` : ``}>
          <label class="event__type-label  event__type-label--${pointTypeItem}" for="event-type-${pointTypeItem}-1">${setFirstCharToUpperCase(pointTypeItem)}</label>
        </div>`
      );
    }).join(``)
  );
};

const createOfferContainerTemplate = (data) => {
  return (
    `<section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">

      ${createOfferListTemplate(data)}

      </div>
    </section>
  </section>`
  );
};

const createOfferListTemplate = (data) => {
  return (
    Object.entries(OfferList).map((key) => {
      return (`<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${key[0]}-1" type="checkbox" name="event-offer-${key[0]}" ${isOfferCheckedForPoint(key[0], data.offers) ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${key[0]}-1">
          <span class="event__offer-title">${key[1].text}</span>
          +
          €&nbsp;<span class="event__offer-price">${key[1].price}</span>
        </label>
      </div>`);
    }).join(``)
  );
};

const createPointFormTemplate = (data, destinations) => {
  const optionsListTemplate = createOptionsListTemplate(destinations);

  return (
    `<li class="trip-events__item">
    <form class="event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${data.type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

              ${createEventListTemplate(data, TYPE_GROUP_ACTIVITY)}

            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              ${createEventListTemplate(data, TYPE_GROUP_TRANSFER)}

            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${pointTypeToPretext[data.type]}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${data.destination}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${optionsListTemplate}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateToString(data.startTime)}">
          —
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateToString(data.endTime)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            €
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${data.price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>

        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${data.isFavorite ? `checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>

      ${createOfferContainerTemplate(data)}

      ${createPhotoContainerTemplate(data, destinations)}

    </form>
    </li>`
  );
};

export default class PointEdit extends SmartView {
  constructor(point = BLANK_POINT, destinations) {
    super();

    this._data = PointEdit.parsePointToData(point);
    this._destinations = destinations;

    this._rollupButtonClickHandler = this._rollupButtonClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._favoriteCheckboxChangeHandler = this._favoriteCheckboxChangeHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._typeListChangeHandler = this._typeListChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  reset(point) {
    this.updateData(
        PointEdit.parsePointToData(point)
    );
  }

  _getTemplate() {
    return createPointFormTemplate(this._data, this._destinations);
  }

  restoreHandlers() {
    this._setInnerHandlers();

    this.setRollupButtonClickHandler(this._callback.rollupButtonClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  _setInnerHandlers() {
    const element = this.getElement();

    element.querySelector(`.event__favorite-checkbox`)
      .addEventListener(`change`, this._favoriteCheckboxChangeHandler);
    element.querySelector(`.event__input--price`)
      .addEventListener(`change`, this._priceChangeHandler);
    element.querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._destinationChangeHandler);
    element.querySelector(`.event__type-list`)
      .addEventListener(`change`, this._typeListChangeHandler);
  }

  _rollupButtonClickHandler() {
    this._callback.rollupButtonClick();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(PointEdit.parseDataToPoint(this._data));
  }

  _favoriteCheckboxChangeHandler() {
    this.updateData({
      isFavorite: !this._data.isFavorite
    }, true);
  }

  _priceChangeHandler(evt) {
    this.updateData({
      price: Number(evt.target.value),
    }, true);
  }

  _destinationChangeHandler(evt) {
    this.updateData({
      destination: evt.target.value
    });
  }

  _typeListChangeHandler(evt) {
    this.updateData({
      type: evt.target.value
    });
  }

  setRollupButtonClickHandler(callback) {
    this._callback.rollupButtonClick = callback;
    this.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, this._rollupButtonClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement()
      .addEventListener(`submit`, this._formSubmitHandler);
  }

  static parsePointToData(point) {
    return Object.assign(
        {},
        point
    );
  }

  static parseDataToPoint(data) {
    return Object.assign(
        {},
        data
    );
  }
}
