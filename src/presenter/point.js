import PointView from "../view/point";
import PointEditView from "../view/point-edit";
import {render, RenderPosition, replace, remove} from "../utils/dom";
import {isEscapeEvent} from './../utils/dom-event';
import OfferListView from '../view/offer-list';
import OfferView from './../view/offer';
import {UserAction, UpdateType} from "./../constants";
import {isDatesEqual} from "./../utils/date";

const MAX_OFFERS_COUNT = 3;
const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Point {
  constructor(container, destinations, changeData, changeMode) {
    this._container = container;
    this._destinations = destinations;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._point = null;
    this._pointComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handlePointRollupButtonClick = this._handlePointRollupButtonClick.bind(this);
    this._handlePointFormRollupButtonClick = this._handlePointFormRollupButtonClick.bind(this);
    this._handlePointFormSubmit = this._handlePointFormSubmit.bind(this);
    this._escapeKeydownHandler = this._escapeKeydownHandler.bind(this);
    this._handleFavoriteChange = this._handleFavoriteChange.bind(this);
    this._handleResetButtonClick = this._handleResetButtonClick.bind(this);
  }

  init(point) {
    this._point = point;

    const previousPointComponent = this._pointComponent;
    const previousPointEditComponent = this._pointEditComponent;

    this._pointComponent = new PointView(point);
    this._pointEditComponent = new PointEditView(point, this._destinations);

    this._pointComponent.setRollupButtonClickHandler(this._handlePointRollupButtonClick);
    this._pointEditComponent.setRollupButtonClickHandler(this._handlePointFormRollupButtonClick);
    this._pointEditComponent.setFormSubmitHandler(this._handlePointFormSubmit);

    this._pointEditComponent.setFavoriteChangeHandler(this._handleFavoriteChange);
    this._pointEditComponent.setResetButtonClickHandler(this._handleResetButtonClick);

    if (point.offers.length > 0) {
      const offersContainer = this._pointComponent.getContainer();
      this._renderOffersList(offersContainer, point.offers);
    }

    if (previousPointComponent === null || previousPointEditComponent === null) {
      render(this._container, this._pointComponent, RenderPosition.BEFORE_END);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, previousPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pointEditComponent, previousPointEditComponent);
    }

    remove(previousPointComponent);
    remove(previousPointEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
    document.removeEventListener(`keydown`, this._escapeKeydownHandler);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener(`keydown`, this._escapeKeydownHandler);

    this._pointEditComponent.reset(this._point);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener(`keydown`, this._escapeKeydownHandler);

    this._mode = Mode.DEFAULT;
  }

  _renderOffersList(offersContainer, offers) {
    const offerListView = new OfferListView();
    render(offersContainer, offerListView, RenderPosition.AFTER_END);

    this._renderOffers(offerListView, offers);
  }

  _renderOffers(offerListView, offers) {
    offers.slice(0, MAX_OFFERS_COUNT)
      .forEach((offer) => {
        render(offerListView, new OfferView(offer), RenderPosition.BEFORE_END);
      });
  }

  _escapeKeydownHandler(evt) {
    if (isEscapeEvent(evt)) {
      this._replaceFormToCard();
    }
  }

  _handlePointRollupButtonClick() {
    this._replaceCardToForm();
  }

  _handlePointFormRollupButtonClick() {
    this._replaceFormToCard();
  }

  _handlePointFormSubmit(editedPoint) {
    const isPatchUpdate = isDatesEqual(this._point.startTime, editedPoint.startTime);

    this._changeData(
        UserAction.UPDATE_POINT,
        isPatchUpdate ? UpdateType.PATCH : UpdateType.MINOR,
        editedPoint);
    this._replaceFormToCard();
  }

  _handleFavoriteChange(isFavorite) {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.PATCH,
        Object.assign(
            this._point,
            {isFavorite}
        )
    );
  }

  _handleResetButtonClick() {
    this._changeData(
        UserAction.DELETE_POINT,
        UpdateType.MINOR,
        this._point
    );
  }
}
