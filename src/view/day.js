import {createPointListTemplate} from './point-list';

const formatMonthDate = new Intl.DateTimeFormat(`en-GB`, {
  month: `short`,
  day: `numeric`,
}).format;

const createDayTemplate = (dayDate, counter, dayPoints) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${counter}</span>
        <time class="day__date" datetime="${dayDate.toISOString()}">${formatMonthDate(dayDate)}</time>
      </div>
      ${createPointListTemplate(dayPoints)}
    </li>`
  );
};

export {createDayTemplate};
