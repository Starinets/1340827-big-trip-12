import {PointTypeToPretext} from '../utils/constants';
import {
  getDatesDifference,
  timeToString
} from '../utils/date';
import {generateOffersList} from './offers';

const getHeaderText = (point) => `${PointTypeToPretext[point.type]} ${point.destination}`;

const createPointTemplate = (point) => {
  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${getHeaderText(point)}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${point.startTime.toISOString()}">${timeToString(point.startTime)}</time>
            &mdash;
            <time class="event__end-time" datetime="${point.endTime.toISOString()}">${timeToString(point.endTime)}</time>
            </p>
          <p class="event__duration">${getDatesDifference(point.startTime, point.endTime)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${point.price}</span>
        </p>

        ${generateOffersList(point.offers)}

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export {createPointTemplate};
