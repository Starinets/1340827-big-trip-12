import {SortType} from './../constants';
import {
  render,
  remove,
  RenderPosition
} from './../utils/dom';
import {
  sortPointByTime,
  sortPointByPrice
} from "../utils/trip";
import {formatDayDate} from './../utils/date';
import SortView from './../view/sort';
import PointMessage from './../view/point-message';
import DaysView from './../view/days';
import DayView from './../view/day';
import PointListView from './../view/point-list';
import PointPresenter from "./point";

const EMPTY_POINTS_LIST_MESSAGE = `Click New Event to create your first point`;
const UNGROUPED_LIST = 0;

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
  constructor(container, destinations, pointsModel) {
    this._container = container;
    this._destinations = destinations;
    this._pointsModel = pointsModel;

    this._pointPresenter = {};
    this._currentSortType = SortType.EVENT;
    this._days = [];

    this._pointMessage = new PointMessage(EMPTY_POINTS_LIST_MESSAGE);
    this._sort = new SortView();
    this._daysView = new DaysView();

    // this._handlePointChange = this._handlePointChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderSort();
    this._renderDaysList();
  }

  _getPoints() {
    switch (this._currentSortType) {
      case SortType.TIME:
        return this._pointsModel.getPoints().slice().sort(sortPointByTime);
      case SortType.PRICE:
        return this._pointsModel.getPoints().slice().sort(sortPointByPrice);
    }
    return this._pointsModel.getPoints();
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  }

  _handleModelEvent(updateType, data) {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  }

  _renderSort() {

    const handleSortChange = (sortType) => {
      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      this._clearPointList();
      this._renderDaysList();

    };

    this._sort.setChangeHandler(handleSortChange);

    render(this._container, this._sort, RenderPosition.BEFORE_END);
  }

  _renderNoPointMessage() {
    render(this._container, this._pointMessage, RenderPosition.BEFORE_END);
  }

  _clearPointList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    this._days.forEach(remove);
    this._days = [];

    remove(this._daysView);
  }

  _renderDaysList() {
    render(this._container, this._daysView, RenderPosition.BEFORE_END);
    this._renderDays();
  }

  _renderDays() {
    if (this._currentSortType === SortType.EVENT) {
      const days = groupPointsByDays(this._getPoints());

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
      this._renderPointsList(dayView, this._getPoints());
    }
  }

  _renderPointsList(dayView, dayPoints) {
    const pointListView = new PointListView();
    render(dayView, pointListView, RenderPosition.BEFORE_END);
    this._renderPoints(pointListView, dayPoints);
  }

  _renderPoints(pointListView, dayPoints) {
    dayPoints.forEach((point) => {
      // const pointPresenter = new PointPresenter(pointListView, this._destinations, this._handlePointChange, this._handleModeChange);
      const pointPresenter = new PointPresenter(pointListView, this._destinations, this._handleViewAction, this._handleModeChange);
      pointPresenter.init(point);

      this._pointPresenter[point.id] = pointPresenter;
    });
  }
}
