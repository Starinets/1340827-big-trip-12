import {
  pointTypeToPretext,
  TYPE_GROUP_ACTIVITY,
  TYPE_GROUP_TRANSFER,
  OfferList
} from '../constants';
import {setFirstCharToUpperCase} from './../utils/general';
import {dateToString} from '../utils/date';
import Abstract from './abstract';

const isOfferCheckedForPoint = (offerName, offers) => offers.find((item) => item.type === offerName);

const createOptionsListTemplate = (destinations) => {
  return destinations
    .map(({name}) => `<option value="${name}"></option>`)
    .join(``);
};

const createEventListTemplate = (point, pointTypeList) => {
  return (
    pointTypeList.map((pointTypeItem) => {
      return (
        `<div class="event__type-item">
          <input id="event-type-${pointTypeItem}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointTypeItem}" ${point.type === pointTypeItem ? `checked` : ``}>
          <label class="event__type-label  event__type-label--${pointTypeItem}" for="event-type-${pointTypeItem}-1">${setFirstCharToUpperCase(pointTypeItem)}</label>
        </div>`
      );
    }).join(``)
  );
};

const createOfferListTemplate = (point) => {
  return (
    Object.entries(OfferList).map((key) => {
      return (`<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${key[0]}-1" type="checkbox" name="event-offer-${key[0]}" ${isOfferCheckedForPoint(key[0], point.offers) ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${key[0]}-1">
          <span class="event__offer-title">${key[1].text}</span>
          +
          €&nbsp;<span class="event__offer-price">${key[1].price}</span>
        </label>
      </div>`);
    }).join(``)
  );
};

const createPointFormTemplate = (point, destinations) => {
  const optionsListTemplate = createOptionsListTemplate(destinations);

  return (
    `<li class="trip-events__item">
    <form class="event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

              ${createEventListTemplate(point, TYPE_GROUP_ACTIVITY)}

            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              ${createEventListTemplate(point, TYPE_GROUP_TRANSFER)}

            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${pointTypeToPretext[point.type]}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${point.destination}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${optionsListTemplate}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateToString(point.startTime)}">
          —
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateToString(point.endTime)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            €
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>

        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${point.isFavorite ? `checked` : ``}>
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

      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">

          ${createOfferListTemplate(point)}

          </div>
        </section>
      </section>
    </form>
    </li>`
  );
};

export default class PointEdit extends Abstract {
  constructor(point, destinations) {
    super();

    this._point = point;
    this._destinations = destinations;

    this._onRollupButtonClick = this._onRollupButtonClick.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _getTemplate() {
    return createPointFormTemplate(this._point, this._destinations);
  }

  _onRollupButtonClick() {
    this._callback.rollupButtonClick();
  }

  _onSubmit(evt) {
    evt.preventDefault();
    this._callback.submit(this._point);
  }

  setRollupButtonClickHandler(callback) {
    this._callback.rollupButtonClick = callback;
    this.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, this._onRollupButtonClick);
  }

  setFormSubmitHandler(callback) {
    this._callback.submit = callback;
    this.getElement()
      .addEventListener(`submit`, this._onSubmit);
  }
}
