import PointView from "../view/point";
import PointEditView from "../view/point-edit";
import {render, RenderPosition, replace} from "../utils/dom";
import {isEscapeEvent} from './../utils/dom-event';

export default class Point {
  constructor(pointListContainer, destinations) {
    this._pointListContainer = pointListContainer;
    this._destinations = destinations;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._handlePointRollupButtonClick = this._handlePointRollupButtonClick.bind(this);
    this._handlePointFormRollupButtonClick = this._handlePointFormRollupButtonClick.bind(this);
    this._handlePointFormSubmit = this._handlePointFormSubmit.bind(this);
  }

  init(point) {
    this._point = point;

    this._pointComponent = new PointView(point);
    this._pointEditComponent = new PointEditView(point, this._destinations);

    this._pointComponent.setRollupButtonClickHandler(this._handlePointRollupButtonClick);
    this._pointEditComponent.setRollupButtonClickHandler(this._handlePointFormRollupButtonClick);
    this._pointEditComponent.setFormSubmitHandler(this._handlePointFormSubmit);

    render(this._pointListContainer, this._pointComponent, RenderPosition.BEFORE_END);
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

  _handlePointFormSubmit() {
    this._replaceFormToCard();
  }
}
