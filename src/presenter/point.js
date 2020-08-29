import PointView from "../view/point";
import PointEditView from "../view/point-edit";
import {render, RenderPosition, replace, remove} from "../utils/dom";
import {isEscapeEvent} from './../utils/dom-event';
import OfferListView from '../view/offer-list';
import OfferView from './../view/offer';

const MAX_OFFERS_COUNT = 3;

export default class Point {
  constructor(pointListContainer, destinations, changeData) {
    this._pointListContainer = pointListContainer;
    this._destinations = destinations;
    this._changeData = changeData;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._handlePointRollupButtonClick = this._handlePointRollupButtonClick.bind(this);
    this._handlePointFormRollupButtonClick = this._handlePointFormRollupButtonClick.bind(this);
    this._handlePointFormSubmit = this._handlePointFormSubmit.bind(this);
    this._onEscapeKeydown = this._onEscapeKeydown.bind(this);
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

    if (point.offers.length > 0) {
      const offersContainer = this._pointComponent.getContainer();
      this._renderOffersList(offersContainer, point.offers);
    }

    if (previousPointComponent === null || previousPointEditComponent === null) {
      render(this._pointListContainer, this._pointComponent, RenderPosition.BEFORE_END);
      return;
    }

    if (this._pointListContainer.getElement().contains(previousPointComponent.getElement())) {
      replace(this._pointComponent, previousPointComponent);
    }

    if (this._pointListContainer.getElement().contains(previousPointEditComponent.getElement())) {
      replace(this._pointEditComponent, previousPointEditComponent);
    }

    remove(previousPointComponent);
    remove(previousPointEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  _replaceCardToForm() {
    replace(this._pointEditComponent, this._pointComponent);
  }

  _replaceFormToCard() {
    replace(this._pointComponent, this._pointEditComponent);
  }

  _onEscapeKeydown(evt) {
    if (isEscapeEvent(evt)) {
      this._replaceFormToCard();
    }
  }

  _handlePointRollupButtonClick() {
    this._replaceCardToForm();

    document.addEventListener(`keydown`, this._onEscapeKeydown);
  }

  _handlePointFormRollupButtonClick() {
    this._replaceFormToCard();

    document.removeEventListener(`keydown`, this._onEscapeKeydown);
  }

  _handlePointFormSubmit(editedPoint) {
    this._changeData(editedPoint);
    this._replaceFormToCard();
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
}
