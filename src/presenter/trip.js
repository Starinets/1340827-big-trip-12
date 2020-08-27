import {SortType} from './../constants';
import {
  render,
  replace,
  RenderPosition
} from './../utils/dom';
import {formatDayDate} from './../utils/date';
import {isEscapeEvent} from './../utils/dom-event';
import SortView from './../view/sort';
import PointMessage from './../view/point-message';
import DaysView from './../view/days';
import DayView from './../view/day';
import PointListView from './../view/point-list';
import PointView from './../view/point';
import PointEditView from '../view/point-edit';
import OfferListView from '../view/offer-list';
import OfferView from './../view/offer';

const EMPTY_POINTS_LIST_MESSAGE = `Click New Event to create your first point`;
const MAX_OFFERS_COUNT = 3;

const reducePointByDay = (days, point) => {
  const dayDate = formatDayDate(point.startTime);

  if (Array.isArray(days[dayDate])) {
    days[dayDate].push(point);
  } else {
    days[dayDate] = [point];
  }

  return days;
};

const groupPointsByDays = (points) => points
  .sort((less, more) => less.startTime - more.startTime)
  .reduce(reducePointByDay, {});

export default class Trip {
  constructor(container, destinations) {
    this._container = container;
    this._destinations = [...destinations];

    this._points = [];
    this._currentSortType = SortType.TIME;

    this._pointMessage = new PointMessage(EMPTY_POINTS_LIST_MESSAGE);
    this._sort = new SortView();
    this._daysView = new DaysView();
  }

  init(points) {
    this._points = [...points];

    if (points.length === 0) {
      this._renderNoPointMessage(EMPTY_POINTS_LIST_MESSAGE);
      return;
    }

    this._renderSort();
    this._renderDaysList();
  }

  _renderSort() {

    const handlerSortClick = (sortType) => {
      if (this._currentSortType === sortType) {
        return;
      }

    };

    this._sort.setSortClickHandler(handlerSortClick);

    render(this._container, this._sort, RenderPosition.BEFORE_END);
  }

  _renderNoPointMessage() {
    render(this._container, this._pointMessage, RenderPosition.BEFORE_END);
  }

  _renderDaysList() {
    render(this._container, this._daysView, RenderPosition.BEFORE_END);
    this._renderDays();
  }

  _renderDays() {
    const days = groupPointsByDays(this._points);

    Object.values(days)
    .forEach((dayPoints, counter) => {
      const dayView = new DayView(new Date(dayPoints[0].startTime), counter + 1);

      render(this._daysView, dayView, RenderPosition.BEFORE_END);
      this._renderPointsList(dayView, dayPoints);
    });
  }

  _renderPointsList(dayView, dayPoints) {
    const pointListView = new PointListView();
    render(dayView, pointListView, RenderPosition.BEFORE_END);
    this._renderPoints(pointListView, dayPoints);
  }

  _renderPoints(pointListView, dayPoints) {
    dayPoints.forEach((point) => {
      const pointComponent = new PointView(point);
      const pointView = pointComponent.getElement();
      const pointEditComponent = new PointEditView(point, this._destinations);

      const replaceCardToForm = () => {
        replace(pointEditComponent, pointComponent);
      };

      const replaceFormToCard = () => {
        replace(pointComponent, pointEditComponent);
      };

      const onEscapeKeydown = (evt) => {
        if (isEscapeEvent(evt)) {
          replaceFormToCard();
        }
      };

      const handlePointRollupButtonClick = () => {
        replaceCardToForm();

        document.addEventListener(`keydown`, onEscapeKeydown);
      };

      const handlePointFormRollupButtonClick = () => {
        replaceFormToCard();

        document.removeEventListener(`keydown`, onEscapeKeydown);
      };

      const handlePointFormSubmit = () => {
        replaceFormToCard();
      };

      pointComponent.setRollupButtonClickHandler(handlePointRollupButtonClick);
      pointEditComponent.setRollupButtonClickHandler(handlePointFormRollupButtonClick);
      pointEditComponent.setFormSubmitHandler(handlePointFormSubmit);

      render(pointListView, pointView, RenderPosition.BEFORE_END);

      if (point.offers.length > 0) {
        const offersContainer = pointComponent.getContainer();
        this._renderOffersList(offersContainer, point.offers);
      }
    });
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
