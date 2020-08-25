import {
  render,
  RenderPosition
} from './utils/dom';
import {isEscapeEvent} from './utils/dom-event';
import {formatDayDate} from './utils/date';
import InfoView from './view/info';
import MainInfoView from './view/main-info';
import CostInfoView from './view/cost-info';
import MenuView from './view/menu';
import FiltersView from './view/filters';
import SortView from './view/sort';
import DaysView from './view/days';
import DayView from './view/day';
import PointListView from './view/point-list';
import PointView from './view/point';
import PointFormView from './view/point-form';
import OffersListView from './view/offers-list';
import OfferView from './view/offer';
import AddPointButtonView from './view/add-point-button';
import PointMessage from './view/point-message';
import {generatePoint} from './mock/point';
import {generateDestinationsInfo} from './mock/destinations';

const EVENT_COUNT = 30;
const MAX_OFFERS_COUNT = 3;
const EMPTY_POINTS_LIST_MESSAGE = `Click New Event to create your first point`;

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
  const dayDate = formatDayDate(point.startTime);

  if (Array.isArray(days[dayDate])) {
    days[dayDate].push(point);
  } else {
    days[dayDate] = [point];
  }

  return days;
};

const generateOffers = (container, offers) => {
  offers.slice(0, MAX_OFFERS_COUNT)
    .forEach((offer) => {
      render(container, new OfferView(offer).getElement(), RenderPosition.BEFORE_END);
    });
};

const generateOffersList = (container, offers) => {
  const offerListView = new OffersListView().getElement();
  render(container, offerListView, RenderPosition.AFTER_END);

  generateOffers(offerListView, offers);
};

const generatePoints = (container, points) =>
  points.forEach((point) => {
    const pointComponent = new PointView(point);
    const pointView = pointComponent.getElement();
    const pointFormView = new PointFormView(point, destinations).getElement();

    const onKeydown = (evt) => {
      if (isEscapeEvent(evt)) {
        replaceFormToPoint();
      }
    };

    const onRollupButtonClick = () => {
      replacePointToForm();

      document.addEventListener(`keydown`, onKeydown);
    };

    const onPointFormViewSubmit = (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
    };

    const replacePointToForm = () => {
      container.replaceChild(pointFormView, pointView);
    };

    const replaceFormToPoint = () => {
      container.replaceChild(pointView, pointFormView);
      document.removeEventListener(`keydown`, onKeydown);
    };

    pointComponent.setRollupButtonClickHandler(onRollupButtonClick);
    pointFormView.addEventListener(`submit`, onPointFormViewSubmit);

    render(container, pointView, RenderPosition.BEFORE_END);

    if (point.offers.length > 0) {
      const pointContainer = pointComponent.getContainer();
      generateOffersList(pointContainer, point.offers);
    }
  });

const groupPointsByDays = (points) => points
  .sort((less, more) => less.startTime - more.startTime)
  .reduce(reducePointByDay, {});

const renderGroupedPoints = (dayPlace, points) => {
  const days = groupPointsByDays(points);

  // Если передавать "date", время которой смещено на 00:00:00, то в formatDateToISOString
  // "костыль" смещает дату на день раньше, в случае отрицательного GMT. Поэтому
  // будем использовать начальное время первой точки дня.
  Object.values(days)
    .forEach((dayPoints, counter) => {
      const dayView = new DayView(new Date(dayPoints[0].startTime), counter + 1).getElement();
      render(dayPlace, dayView, RenderPosition.BEFORE_END);

      const pointListView = new PointListView().getElement();
      render(dayView, pointListView, RenderPosition.BEFORE_END);

      generatePoints(pointListView, dayPoints);
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

const destinations = generateDestinationsInfo();

const infoView = new InfoView().getElement();

render(infoPlace, infoView, RenderPosition.AFTER_BEGIN);
render(infoPlace, new AddPointButtonView().getElement(), RenderPosition.BEFORE_END);

render(infoView, new MainInfoView(getTripPath(points)).getElement(), RenderPosition.BEFORE_END);
render(infoView, new CostInfoView(getTripCost(points)).getElement(), RenderPosition.BEFORE_END);

render(menuPlace, new MenuView().getElement(), RenderPosition.AFTER_END);
render(filtersPlace, new FiltersView().getElement(), RenderPosition.BEFORE_END);

if (points.length > 0) {
  const dayView = new DaysView().getElement();

  render(sortingPlace, new SortView().getElement(), RenderPosition.AFTER_END);
  render(contentPlace, dayView, RenderPosition.BEFORE_END);

  renderGroupedPoints(dayView, points);
} else {
  render(contentPlace, new PointMessage(EMPTY_POINTS_LIST_MESSAGE).getElement(), RenderPosition.BEFORE_END);
}
