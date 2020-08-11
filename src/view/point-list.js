import {createPointTemplate} from './point.js';

const generatePointsTemplates = (points) => points
  .map((createPointTemplate))
  .join(``);

const createPointListTemplate = (points) => `<ul class="trip-events__list">
  ${generatePointsTemplates(points)}
</ul>`;

export {createPointListTemplate};
