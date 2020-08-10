import {createPointListTemplate} from './point-list';
import {timeToDateString} from '../utils/date';

const createDayTemplate = (day, counter, dayPoints) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${counter}</span>
        <time class="day__date" datetime="${timeToDateString(new Date(day), false)}">${(new Date(day).toLocaleString(`en-US`, {month: `short`, day: `numeric`}))}</time>
      </div>
      ${createPointListTemplate(dayPoints)}
    </li>`
  );
};

export {createDayTemplate};
