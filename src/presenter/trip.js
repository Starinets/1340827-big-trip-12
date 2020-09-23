import {
  EMPTY_POINTS_LIST_MESSAGE,
  LOADING_MESSAGE,
  UNGROUPED_LIST,
  SortType,
  UpdateType,
  PointFormState,
  UserAction,
  FilterType
} from './../constants';
import {filterTypeToPoints} from './../utils/filter';
import {
  render,
  remove,
  RenderPosition
} from './../utils/dom';
import {
  sortPointByTime,
  sortPointByPrice
} from './../utils/trip';
import {formatDayDate} from './../utils/date';
import SortView from './../view/sort';
import PointMessage from './../view/point-message';
import DaysView from './../view/days';
import DayView from './../view/day';
import PointListView from './../view/point-list';
import PointPresenter from './point';
import PointNewPresenter from './point-new';

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
  constructor(container, pointsModel, filterModel, api, addPointButtonView) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._api = api;
    this._addPointButtonView = addPointButtonView;

    this._pointPresenter = {};
    this._currentSortType = SortType.EVENT;
    this._days = [];
    this._sort = null;
    this._isLoading = true;
    this._destinations = [];

    this._pointMessageView = new PointMessage(EMPTY_POINTS_LIST_MESSAGE);
    this._loadingView = new PointMessage(LOADING_MESSAGE);
    this._daysView = new DaysView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this.createPoint = this.createPoint.bind(this);

    this._pointNewPresenter = {};
  }

  init() {
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderSort();
    this._renderDaysList();
  }

  destroy() {
    this._clearPointList({resetSortType: true});

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  /* -------------------------------- Getters ------------------------------- */
  /* -------------------------------- Setters ------------------------------- */
  /* -------------------------- Overloaded methods -------------------------- */
  /* ----------------------------- Class methods ---------------------------- */
  /* ---------------------------- Private methods --------------------------- */
  /* ---------------------------- Events handlers --------------------------- */
  /* ---------------------------- Static methods ---------------------------- */

  setOptions(destinations, offers) {
    this._destinations = destinations;
    this._offers = offers;

    this._pointNewPresenter = new PointNewPresenter(this._daysView, this._destinations, this._offers, this._handleViewAction, this._addPointButtonView);
  }

  createPoint() {
    this._currentSortType = SortType.EVENT;
    this._filterModel.set(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.init();
  }

  _getPoints() {
    const filterType = this._filterModel.get();
    const points = this._pointsModel.get();
    const filteredPoints = filterTypeToPoints[filterType](points, new Date());

    switch (this._currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortPointByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointByPrice);
    }

    return filteredPoints;
  }

  _renderSort() {

    const handleSortChange = (sortType) => {
      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      this._clearPointList();
      this._renderSort();
      this._renderDaysList();

    };

    if (this._sort !== null) {
      remove(this._sort);
      this._sort = null;
    }

    this._sort = new SortView(this._currentSortType);
    this._sort.setChangeHandler(handleSortChange);

    render(this._container, this._sort, RenderPosition.BEFORE_END);
  }

  _renderLoadingMessage() {
    render(this._container, this._loadingView, RenderPosition.BEFORE_END);
  }

  _renderNoPointMessage() {
    render(this._container, this._pointMessageView, RenderPosition.BEFORE_END);
  }

  _clearPointList({resetSortType = false} = {}) {
    this._pointNewPresenter.destroy();

    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    this._days.forEach(remove);
    this._days = [];

    remove(this._sort);
    remove(this._loadingView);
    remove(this._daysView);

    if (resetSortType) {
      this._currentSortType = SortType.EVENT;
    }
  }

  _renderDaysList() {
    render(this._container, this._daysView, RenderPosition.BEFORE_END);
    this._renderDays();
  }

  _renderDays() {
    if (this._isLoading) {
      this._renderLoadingMessage();
      return;
    }

    const points = this._getPoints();

    if (points.length === 0) {
      remove(this._sort);
      this._renderNoPointMessage();
      return;
    }

    remove(this._pointMessageView);

    if (this._currentSortType === SortType.EVENT) {
      const days = groupPointsByDays(points);

      Object.values(days)
        .forEach((dayPoints, counter) => {
          const dayView = new DayView(new Date(dayPoints[0].startTime), counter + 1);
          this._days.push(dayView);

          render(this._daysView, dayView, RenderPosition.BEFORE_END);
          this._renderPointsList(dayView, dayPoints);
        });

    } else {

      const dayView = new DayView(new Date(), UNGROUPED_LIST);

      this._days.push(dayView);

      render(this._daysView, dayView, RenderPosition.BEFORE_END);
      this._renderPointsList(dayView, points);
    }
  }

  _renderPointsList(dayView, dayPoints) {
    const pointListView = new PointListView();
    render(dayView, pointListView, RenderPosition.BEFORE_END);
    this._renderPoints(pointListView, dayPoints);
  }

  _renderPoints(pointListView, dayPoints) {
    dayPoints.forEach((point) => {
      const pointPresenter = new PointPresenter(pointListView, this._destinations, this._offers, this._handleViewAction, this._handleModeChange);
      pointPresenter.init(point);

      this._pointPresenter[point.id] = pointPresenter;
    });
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();

    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointPresenter[update.id].setViewState(PointFormState.SAVING);
        this._api.updatePoint(update)
          .then((response) => {
            this._pointsModel.update(updateType, response);
          })
          .catch(() => {
            this._pointPresenter[update.id].setViewState(PointFormState.ABORTING);
          });
        break;
      case UserAction.ADD_POINT:
        this._pointNewPresenter.setSaving();
        this._api.addPoint(update)
          .then((response) => {
            this._pointsModel.add(updateType, response);
          })
          .catch(() => {
            this._pointNewPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_POINT:
        this._pointPresenter[update.id].setViewState(PointFormState.DELETING);
        this._api.deletePoint(update)
          .then(() => {
            this._pointsModel.delete(updateType, update);
          })
          .catch(() => {
            this._pointPresenter[update.id].setViewState(PointFormState.ABORTING);
          });
        break;
    }
  }

  _handleModelEvent(updateType, point) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[point.id].init(point);
        break;
      case UpdateType.FILTER:
        this._clearPointList({resetSortType: true});
        this._renderSort();
        this._renderDaysList();
        break;
      case UpdateType.MINOR:
        this._clearPointList();
        this._renderSort();
        this._renderDaysList();
        break;
      case UpdateType.MAJOR:
        this._clearPointList({resetSortType: true});
        this._renderSort();
        this._renderDaysList();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingView);
        this._renderSort();
        this._renderDaysList();
        break;
    }
  }
}
