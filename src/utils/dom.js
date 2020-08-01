const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export {render};
