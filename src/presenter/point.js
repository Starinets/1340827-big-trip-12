import PointView from "../view/point";
import PointEditView from "../view/point-edit";
import {render, RenderPosition, replace, remove} from "../utils/dom";
import {isEscapeEvent} from './../utils/dom-event';
import OfferListView from '../view/offer-list';
import OfferView from './../view/offer';
import {
  UserAction,
  PointFormState,
  UpdateType,
  EditablePoint
} from "./../constants";
import {isDatesEqual} from "./../utils/date";

const MAX_OFFERS_COUNT = 3;
const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Point {
  constructor(container, destinations, offers, changeData, changeMode) {
    this._container = container;
    this._destinations = destinations;
    this._offers = offers;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._specific = null;
    this._component = null;
    this._editComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleRollupButtonClick = this._handleRollupButtonClick.bind(this);
    this._handleFormRollupButtonClick = this._handleFormRollupButtonClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escapeKeydownHandler = this._escapeKeydownHandler.bind(this);
    this._handleFavoriteChange = this._handleFavoriteChange.bind(this);
    this._handleResetButtonClick = this._handleResetButtonClick.bind(this);
  }

  init(specifics) {
    this._specific = specifics;

    const previousComponent = this._component;
    const previousEditComponent = this._editComponent;

    this._component = new PointView(specifics);
    this._editComponent = new PointEditView(specifics, this._destinations, this._offers, EditablePoint.OLD);

    this._component.setRollupButtonClickHandler(this._handleRollupButtonClick);
    this._editComponent.setRollupButtonClickHandler(this._handleFormRollupButtonClick);
    this._editComponent.setFormSubmitHandler(this._handleFormSubmit);

    this._editComponent.setFavoriteChangeHandler(this._handleFavoriteChange);
    this._editComponent.setResetButtonClickHandler(this._handleResetButtonClick);

    if (specifics.offers.length > 0) {
      const offersContainer = this._component.getContainer();
      this._renderOffersList(offersContainer, specifics.offers);
    }

    if (previousComponent === null || previousEditComponent === null) {
      render(this._container, this._component, RenderPosition.BEFORE_END);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._component, previousComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._component, previousEditComponent);
      this._mode = Mode.DEFAULT;
    }

    remove(previousComponent);
    remove(previousEditComponent);
  }

  destroy() {
    remove(this._component);
    remove(this._editComponent);
    document.removeEventListener(`keydown`, this._escapeKeydownHandler);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  setViewState(state) {
    switch (state) {
      case PointFormState.SAVING:
        this._editComponent.updateData({
          isDisabled: true,
          isSaving: true
        });
        break;
      case PointFormState.DELETING:
        this._editComponent.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
    }
  }

  _replaceCardToForm() {
    replace(this._editComponent, this._component);
    document.addEventListener(`keydown`, this._escapeKeydownHandler);

    this._editComponent.reset(this._specific);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._component, this._editComponent);
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

  _handleRollupButtonClick() {
    this._replaceCardToForm();
  }

  _handleFormRollupButtonClick() {
    this._replaceFormToCard();
  }

  _handleFormSubmit(editedPoint) {
    const isPatchUpdate =
      isDatesEqual(this._specific.startTime, editedPoint.startTime)
      && this._specific.price === editedPoint.price;

    this._changeData(
        UserAction.UPDATE_POINT,
        isPatchUpdate ? UpdateType.PATCH : UpdateType.MINOR,
        editedPoint);
  }

  _handleFavoriteChange(isFavorite) {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.PATCH,
        Object.assign(
            this._specific,
            {isFavorite}
        )
    );
  }

  _handleResetButtonClick() {
    this._changeData(
        UserAction.DELETE_POINT,
        UpdateType.MINOR,
        this._specific
    );
  }
}
