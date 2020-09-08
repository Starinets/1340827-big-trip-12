import PointEditView from './../view/point-edit';
import PointListView from './../view/point-list';
import DayView from './../view/day';
import {getNewID} from './../mock/random';
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
  constructor(container, destinations, changeData) {
    this._container = container;
    this._destinations = destinations;
    this._changeData = changeData;

    this._pointEditComponent = null;
    this._dayView = null;
    this._pointListView = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleResetButtonClick = this._handleResetButtonClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleRollupButtonClick = this._handleRollupButtonClick.bind(this);
  }

  init() {
    if (this._pointEditComponent !== null) {
      return;
    }

    this._pointEditComponent = new PointEditView(createEmptyPoint(), this._destinations);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setResetButtonClickHandler(this._handleResetButtonClick);
    this._pointEditComponent.setRollupButtonClickHandler(this._handleRollupButtonClick);


    this._dayView = new DayView(new Date(), UNGROUPED_LIST);
    render(this._container, this._dayView, RenderPosition.AFTER_BEGIN);

    this._pointListView = new PointListView();
    render(this._dayView, this._pointListView, RenderPosition.BEFORE_END);

    render(this._pointListView, this._pointEditComponent, RenderPosition.AFTER_BEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._pointEditComponent === null) {
      return;
    }

    remove(this._pointEditComponent);
    this._pointEditComponent = null;
    remove(this._pointListView);
    remove(this._dayView);

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFormSubmit(task) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        Object.assign(
            {
              id: getNewID()
            },
            task
        )
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
