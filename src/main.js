import {
  render,
  RenderPosition
} from './utils/dom';
import {
  formatMonthDate,
  addLeadingRank
} from './utils/date';
import {MenuItem, UpdateType} from './constants';
import PointsModel from './model/points';
import FilterModel from './model/filter';
import TripInfoView from './view/trip-info';
import MainInfoView from './view/main-info';
import TripCostView from './view/trip-cost';
import MenuView from './view/menu';
import AddPointButtonView from './view/add-point-button';
import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';
import StatisticsPresenter from './presenter/statistics';
import Api from "./api.js";

const AUTHORIZATION = `Basic hS3sd3dfd2cl7sa2j`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;

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
      return `${formatMonthDate(startTime)}&nbsp;&mdash;&nbsp;${addLeadingRank(endTime.getDate())}`;
    }
  }

  return formatMonthDate(startTime);
};

const api = new Api(END_POINT, AUTHORIZATION);
const pointsModel = new PointsModel();

const filterModel = new FilterModel();

const infoView = new TripInfoView().getElement();
const addPointButtonView = new AddPointButtonView();

render(infoPlace, infoView, RenderPosition.AFTER_BEGIN);
render(infoPlace, addPointButtonView, RenderPosition.BEFORE_END);

const menuView = new MenuView();
render(menuPlace, menuView, RenderPosition.AFTER_END);

const tripPresenter = new TripPresenter(contentPlace, pointsModel, filterModel, api);
const filterPresenter = new FilterPresenter(filtersPlace, filterModel, pointsModel);
const statisticsPresenter = new StatisticsPresenter(contentPlace, pointsModel);

filterPresenter.init();
tripPresenter.init();

Promise.all([
  api.getPoints(),
  api.getDestinations(),
  api.getOffers()
])
  .then(([points, destinations, offers]) => {
    tripPresenter.setOptions(destinations, offers);
    pointsModel.set(UpdateType.INIT, points);

    // TODO: it is necessary to redo the data update through the model-observer-presenter (in additional task)
    points = points.sort((less, more) => less.startTime - more.startTime);

    const tripPath = getTripPath(points);
    const tripDuration = getTripDuration(points);
    const tripCost = getTripCost(points);

    render(infoView, new MainInfoView(tripPath, tripDuration), RenderPosition.BEFORE_END);
    render(infoView, new TripCostView(tripCost), RenderPosition.BEFORE_END);

    setMenuHandlers();
  })
  .catch(() => {
    tripPresenter.setOptions([], []);
    pointsModel.set(UpdateType.INIT, []);

    setMenuHandlers();
  });

const handleMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:
      statisticsPresenter.destroy();
      tripPresenter.init();
      tripPresenter.createPoint();
      menuView.reset();
      break;
    case MenuItem.TABLE:
      statisticsPresenter.destroy();
      tripPresenter.init();
      break;
    case MenuItem.STATISTICS:
      tripPresenter.destroy();
      statisticsPresenter.init();
      break;
  }
};

const setMenuHandlers = () => {
  menuView.setClickHandler(handleMenuClick);
  addPointButtonView.setClickHandler(handleMenuClick);
};
