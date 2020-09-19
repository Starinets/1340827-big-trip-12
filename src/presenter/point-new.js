import PointEditView from './../view/point-edit';
import PointListView from './../view/point-list';
import DayView from './../view/day';
import {
  remove,
  render,
  RenderPosition
} from './../utils/dom';
import {isEscapeEvent} from './../utils/dom-event';
import {
  UNGROUPED_LIST,
  UserAction,
  UpdateType
} from './../constants';

const createEmptyPoint = () => ({
  type: `taxi`,
  destination: {
    name: ``,
    description: ``,
    photos: []
  },
  startTime: new Date(),
  endTime: new Date(),
  offers: [],
  isFavorite: false,
  price: 0,
});

export default class PointNew {
  constructor(container, destinations, offers, changeData) {
    this._container = container;
    this._destinations = destinations;
    this._offers = offers;
    this._changeData = changeData;

    this._editComponent = null;
    this._dayView = null;
    this._pointListView = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleResetButtonClick = this._handleResetButtonClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleRollupButtonClick = this._handleRollupButtonClick.bind(this);
  }

  init() {
    if (this._editComponent !== null) {
      return;
    }

    this._editComponent = new PointEditView(createEmptyPoint(), this._destinations, this._offers);
    this._editComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._editComponent.setResetButtonClickHandler(this._handleResetButtonClick);
    this._editComponent.setRollupButtonClickHandler(this._handleRollupButtonClick);


    this._dayView = new DayView(new Date(), UNGROUPED_LIST);
    render(this._container, this._dayView, RenderPosition.AFTER_BEGIN);

    this._pointListView = new PointListView();
    render(this._dayView, this._pointListView, RenderPosition.BEFORE_END);

    render(this._pointListView, this._editComponent, RenderPosition.AFTER_BEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._editComponent === null) {
      return;
    }

    remove(this._editComponent);
    this._editComponent = null;
    remove(this._pointListView);
    remove(this._dayView);

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFormSubmit(point) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        point
    );
    this.destroy();
  }

  _handleResetButtonClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (isEscapeEvent(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  }

  _handleRollupButtonClick() {
    this.destroy();
  }
}
