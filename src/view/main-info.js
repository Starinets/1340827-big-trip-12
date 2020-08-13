const createMainInfoTemplate = (tripInfo) => {
  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${tripInfo}</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>`
  );
};

export {createMainInfoTemplate};
