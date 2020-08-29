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
  constructor(container, destinations) {
    this._container = container;
    this._destinations = [...destinations]; //

    this._points = this._unsortedPoints = [];
    this._pointPresenter = {};
    this._currentSortType = SortType.EVENT;
    this._days = [];

    this._pointMessage = new PointMessage(EMPTY_POINTS_LIST_MESSAGE);
    this._sort = new SortView();
    this._daysView = new DaysView();
  }

  init(points) {
    this._points = this._unsortedPoints = [...points];

    if (points.length === 0) {
      this._renderNoPointMessage(EMPTY_POINTS_LIST_MESSAGE);
      return;
    }

    this._renderSort();
    this._sortPoints(this._currentSortType);
    this._renderDaysList();
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this._points.sort(sortPointByPrice);
        break;
      case SortType.TIME:
        this._points.sort(sortPointByTime);
        break;
      default:
        this._points = [...this._unsortedPoints];
    }

    this._currentSortType = sortType;
  }

  _renderSort() {

    const handleSortClick = (sortType) => {
      if (this._currentSortType === sortType) {
        return;
      }

      this._sortPoints(sortType);
      remove(this._daysView);
      this._renderDaysList();

    };

    this._sort.setClickHandler(handleSortClick);

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

    this._days.forEach((day) => remove(day));
    this._days.length = 0;

    remove(this._daysView);
  }

  _renderDaysList() {
    render(this._container, this._daysView, RenderPosition.BEFORE_END);
    this._renderDays();
  }

  _renderDays() {
    if (this._currentSortType === SortType.EVENT) {
      const days = groupPointsByDays(this._points);

      Object.values(days)
        .forEach((dayPoints, counter) => {
          const dayView = new DayView(new Date(dayPoints[0].startTime), counter + 1);
          // так как все точки сгруппированы по дням, то при "умном" удалении точек,
          // так же надо удалить дни и контейнер дней. Не придумал ничего лучшего,
          // кроме как сохранять дни в массив, и в случае необходимости вызывать
          // метод removeElement().
          this._days.push(dayView);

          render(this._daysView, dayView, RenderPosition.BEFORE_END);
          this._renderPointsList(dayView, dayPoints);
        });

    } else {

      const dayView = new DayView(new Date(), UNGROUPED_LIST);

      this._days.push(dayView);

      render(this._daysView, dayView, RenderPosition.BEFORE_END);
      this._renderPointsList(dayView, this._points);
    }
  }

  _renderPointsList(dayView, dayPoints) {
    const pointListView = new PointListView();
    render(dayView, pointListView, RenderPosition.BEFORE_END);
    this._renderPoints(pointListView, dayPoints);
  }

  _renderPoints(pointListView, dayPoints) {
    dayPoints.forEach((point) => {
      const pointPresenter = new PointPresenter(pointListView, this._destinations);
      pointPresenter.init(point);

      this._pointPresenter[point.id] = pointPresenter;
    });
  }
}
