import {
  render,
  RenderPosition
} from './utils/dom';
import {
  formatMonthDate,
  addLeadingRank
} from './utils/date';
import PointsModel from './model/points';
import TripInfoView from './view/trip-info';
import MainInfoView from './view/main-info';
import TripCostView from './view/trip-cost';
import MenuView from './view/menu';
import FiltersView from './view/filters';
import AddPointButtonView from './view/add-point-button';
import {generatePoint} from './mock/point';
import {generateDestinationsInfo} from './mock/destinations';
import TripPresenter from './presenter/trip';

const EVENT_COUNT = 30;

const infoPlace = document.querySelector(`.trip-main`);
const menuPlace = infoPlace.querySelector(`.js-menu`);
const filtersPlace = infoPlace.querySelector(`.trip-controls`);

const contentPlace = document.querySelector(`.trip-events`);

const getTripCost = (points) => points.reduce((pointsPrice, point) =>
  pointsPrice + point.price + point.offers.reduce((offersPrice, offer) =>
    offersPrice + offer.price, 0), 0);

const getTripPath = (points) => {
  switch (points.length) {
    case 0:
      return ``;
    case 1:
      return `${points[0].destination.name}`;
    case 2:
      return `${points[0].destination.name} &mdash; ${points[points.length - 1].destination.name}`;
    case 3:
      return `${points[0].destination.name} &mdash; ${points[1].destination.name} &mdash; ${points[points.length - 1].destination.name}`;
    default:
      return `${points[0].destination.name} &mdash; ... &mdash; ${points[points.length - 1].destination.name}`;
  }
};

const getTripDuration = (points) => {
  const startTime = points[0].startTime;
  const endTime = points[points.length - 1].endTime;

  if (startTime.getMonth() !== endTime.getMonth()) {
    return `${formatMonthDate(startTime)}&nbsp;&mdash;&nbsp;${formatMonthDate(endTime)}`;
  } else {
    if (startTime.getDay() !== endTime.getDay()) {
      return `${formatMonthDate(startTime)}&nbsp;&mdash;&nbsp;${addLeadingRank(endTime.getDay())}`;
    }
  }

  return formatMonthDate(startTime);
};

let minDate = new Date();

const points = new PointsModel().setPoints(
    new Array(EVENT_COUNT)
      .fill()
      .map(() => {
        let point = generatePoint(minDate);
        minDate = point.endTime;
        return point;
      })
);

const destinations = generateDestinationsInfo();

const infoView = new TripInfoView().getElement();

render(infoPlace, infoView, RenderPosition.AFTER_BEGIN);
render(infoPlace, new AddPointButtonView().getElement(), RenderPosition.BEFORE_END);

render(infoView, new MainInfoView(getTripPath(points), getTripDuration(points)).getElement(), RenderPosition.BEFORE_END);
render(infoView, new TripCostView(getTripCost(points)).getElement(), RenderPosition.BEFORE_END);

render(menuPlace, new MenuView().getElement(), RenderPosition.AFTER_END);
render(filtersPlace, new FiltersView().getElement(), RenderPosition.BEFORE_END);

const tripPresenter = new TripPresenter(contentPlace, destinations);
tripPresenter.init(points);
