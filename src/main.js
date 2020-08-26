import {
  render,
  RenderPosition
} from './utils/dom';
import InfoView from './view/info';
import MainInfoView from './view/main-info';
import CostInfoView from './view/cost-info';
import MenuView from './view/menu';
import FiltersView from './view/filters';
import SortView from './view/sort';
import AddPointButtonView from './view/add-point-button';
import {generatePoint} from './mock/point';
import TripPresenter from './presenter/trip';

const EVENT_COUNT = 30;

const infoPlace = document.querySelector(`.trip-main`);
const menuPlace = infoPlace.querySelector(`.js-menu`);
const filtersPlace = infoPlace.querySelector(`.trip-controls`);

const contentPlace = document.querySelector(`.trip-events`);
const sortingPlace = document.querySelector(`.js-sorting`);

const getTripCost = (points) => points.reduce((pointsPrice, point) =>
  pointsPrice + point.price + point.offers.reduce((offersPrice, offer) =>
    offersPrice + offer.price, 0), 0);

const getTripPath = (points) => {
  switch (points.length) {
    case 0:
      return ``;
    case 1:
      return `${points[0].destination}`;
    case 2:
      return `${points[0].destination} &mdash; ${points[points.length - 1].destination}`;
    case 3:
      return `${points[0].destination} &mdash; ${points[1].destination} &mdash; ${points[points.length - 1].destination}`;
    default:
      return `${points[0].destination} &mdash; ... &mdash; ${points[points.length - 1].destination}`;
  }
};

let minDate = new Date();

const points = new Array(EVENT_COUNT)
  .fill()
  .map(() => {
    let point = generatePoint(minDate);
    minDate = point.endTime;
    return point;
  });

const infoView = new InfoView().getElement();

render(infoPlace, infoView, RenderPosition.AFTER_BEGIN);
render(infoPlace, new AddPointButtonView().getElement(), RenderPosition.BEFORE_END);

render(infoView, new MainInfoView(getTripPath(points)).getElement(), RenderPosition.BEFORE_END);
render(infoView, new CostInfoView(getTripCost(points)).getElement(), RenderPosition.BEFORE_END);

render(menuPlace, new MenuView().getElement(), RenderPosition.AFTER_END);
render(filtersPlace, new FiltersView().getElement(), RenderPosition.BEFORE_END);

render(sortingPlace, new SortView().getElement(), RenderPosition.AFTER_END);

const tripPresenter = new TripPresenter(contentPlace);
tripPresenter.init(points);
