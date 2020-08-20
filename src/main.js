import {
  render,
  RenderPosition
} from './utils/dom';
import {formatDateToISOString} from './utils/date';
import Info from './view/info';
import MainInfo from './view/main-info';
import CostInfo from './view/cost-info';
import Menu from './view/menu';
import Filters from './view/filters';
import Sort from './view/sort';
import Days from './view/days';
import Day from './view/day';
import PointList from './view/point-list';
import Point from './view/point';
import PointForm from './view/point-form';
import AddPointButton from './view/add-point-button';
import {generatePoint} from './mock/point';

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

const reducePointByDay = (days, point) => {
  const dayDate = formatDateToISOString(point.startTime).slice(0, 10);

  if (Array.isArray(days[dayDate])) {
    days[dayDate].push(point);
  } else {
    days[dayDate] = [point];
  }

  return days;
};

const generatePoints = (container, points) =>
  points.forEach((point) => {
    const pointForRender = new Point().getElement(point);
    const formForRender = new PointForm().getElement(point);

    const replacePointToForm = () => {
      container.replaceChild(formForRender, pointForRender);
    };

    const replaceFormToPoint = () => {
      container.replaceChild(pointForRender, formForRender);
    };

    pointForRender.querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      replacePointToForm();
    });

    formForRender.querySelector(`form`).addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
    });

    render(container, pointForRender, RenderPosition.BEFORE_END);
  });

const groupPointsByDays = (points) => points
  .sort((less, more) => less.startTime - more.startTime)
  .reduce(reducePointByDay, {});

const renderGroupedPoints = (points) => {
  const days = groupPointsByDays(points);

  Object.entries(days)
    .forEach(([date, dayPoints], counter) => {
      const dayElement = new Day(new Date(date), counter + 1).getElement();
      render(dayPlace, dayElement, RenderPosition.BEFORE_END);

      const pointList = new PointList().getElement();
      render(dayElement, pointList, RenderPosition.BEFORE_END);

      generatePoints(pointList, dayPoints);
    });
};

let minDate = new Date();

const points = new Array(EVENT_COUNT)
  .fill()
  .map(() => {
    let point = generatePoint(minDate);
    minDate = point.endTime;
    return point;
  });

render(infoPlace, new Info().getElement(), RenderPosition.AFTER_BEGIN);
render(infoPlace, new AddPointButton().getElement(), RenderPosition.BEFORE_END);

const infoMainPlace = infoPlace.querySelector(`.trip-info`);

render(infoMainPlace, new MainInfo().getElement(getTripPath(points)), RenderPosition.BEFORE_END);
render(infoMainPlace, new CostInfo().getElement(getTripCost(points)), RenderPosition.BEFORE_END);

render(menuPlace, new Menu().getElement(), RenderPosition.AFTER_END);
render(filtersPlace, new Filters().getElement(), RenderPosition.BEFORE_END);

render(sortingPlace, new Sort().getElement(), RenderPosition.AFTER_END);
render(contentPlace, new Days().getElement(), RenderPosition.BEFORE_END);

const dayPlace = contentPlace.querySelector(`.trip-days`);

renderGroupedPoints(points);
