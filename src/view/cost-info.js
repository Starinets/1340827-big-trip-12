const createCostInfoTemplate = (total) => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
    </p>`
  );
};

export {createCostInfoTemplate};
