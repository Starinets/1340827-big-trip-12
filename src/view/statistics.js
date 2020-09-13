import Abstract from './abstract';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getHourDuration} from './../utils/date';
import {PointKind, PointType, pointKindToTypeMap} from './../constants';

const BAR_HEIGHT = 55;

const pointTypeToChartLabel = {
  [PointType.TAXI]: `🚕 Taxi`,
  [PointType.BUS]: `🚌 Bus`,
  [PointType.TRAIN]: `🚂 Train`,
  [PointType.SHIP]: `🛳️ Ship`,
  [PointType.TRANSPORT]: `🚆 Transport`,
  [PointType.DRIVE]: `🚗 Drive`,
  [PointType.FLIGHT]: `✈️ Flight`,
  [PointType.CHECK_IN]: `🏨 Check in`,
  [PointType.SIGHTSEEING]: `🏛️ Sightseeing`,
  [PointType.RESTAURANT]: `🍴 Restaurant`,
};

const getPointTypePriceTotals = (points) => {
  const pointTypeTotalsMap = points.reduce((priceAccumulator, point) => {
    const {type, price} = point;

    return Object.assign({}, priceAccumulator, {
      [type]: {
        type,
        price: priceAccumulator[type] ? priceAccumulator[type].price + price : price,
      },
    });
  }, {});

  return Object.values(pointTypeTotalsMap);
};

const getPointTypeDurationTotals = (points) => {
  const pointTypeTotalsMap = points.reduce((durationAccumulator, point) => {
    const {type, startTime, endTime} = point;

    const hours = Math.trunc(getHourDuration(startTime, endTime));

    return Object.assign({}, durationAccumulator, {
      [type]: {
        type,
        hours: durationAccumulator[type] ? durationAccumulator[type].hours + hours : hours,
      },
    });
  }, {});

  return Object.values(pointTypeTotalsMap);
};

const INCREMENT_TRANSPORT_VALUE = 1;

const pointTransportsTypes = Object.values(pointKindToTypeMap[PointKind.TRANSFER]);

const getPointTypeTransportTotals = (points) => {
  const pointTypeTotalsMap = points.reduce((transportAccumulator, point) => {
    const {type} = point;
    const isTransportType = pointTransportsTypes.includes(type);

    return isTransportType
      ? Object.assign({}, transportAccumulator, {
        [type]: {
          type,
          totals: transportAccumulator[type]
            ? transportAccumulator[type].totals + INCREMENT_TRANSPORT_VALUE
            : INCREMENT_TRANSPORT_VALUE,
        },
      })
      : transportAccumulator;
  }, {});

  return Object.values(pointTypeTotalsMap);
};

const getPointTypeLabels = (pointTypes) =>
  pointTypes.map((pointType) =>
    pointTypeToChartLabel[pointType].toUpperCase()
  );

const generateChart = (ctx, chartLabels, chartValues, options) => {
  ctx.height = BAR_HEIGHT * chartLabels.length;

  const {text, formatter} = options;

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: chartLabels,
      datasets: [
        {
          data: chartValues,
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`,
          barThickness: 50,
          minBarLength: 50,
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter,
        },
      },
      title: {
        display: true,
        text,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            barThickness: 44,
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            minBarLength: 50,
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};


const generateMoneyChart = (ctx, points) => {
  const pointTotals = getPointTypePriceTotals(points);
  const sortedTotals = pointTotals.sort((a, b) => b.price - a.price);
  const chartLabels = getPointTypeLabels(sortedTotals.map((total) => total.type));
  const chartValues = sortedTotals.map((total) => total.price);

  const options = {
    text: `MONEY`,
    formatter: (val) => `€ ${val}`,
  };

  generateChart(ctx, chartLabels, chartValues, options);
};

const generateTransportChart = (ctx, points) => {
  const pointTotals = getPointTypeTransportTotals(points);
  const sortedTotals = pointTotals.sort((a, b) => b.totals - a.totals);
  const chartLabels = getPointTypeLabels(sortedTotals.map((total) => total.type));
  const chartValues = sortedTotals.map((total) => total.totals);

  const options = {
    text: `TRANSPORT`,
    formatter: (val) => `${val}x`,
  };

  generateChart(ctx, chartLabels, chartValues, options);
};

const generateTimeSpendChart = (ctx, points) => {
  const pointTotals = getPointTypeDurationTotals(points);
  const sortedTotals = pointTotals.sort((a, b) => b.hours - a.hours);
  const chartLabels = getPointTypeLabels(sortedTotals.map((total) => total.type));
  const chartValues = sortedTotals.map((total) => total.hours);

  const options = {
    text: `TIME SPEND`,
    formatter: (val) => `${val}h`,
  };

  generateChart(ctx, chartLabels, chartValues, options);
};


const createStatisticsTemplate = () => {
  return (
    `<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>`
  );
};

export default class Statistics extends Abstract {
  constructor(points) {
    super();
    this._points = points;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeChart = null;

    this._generate();
  }

  _generate() {
    const element = this.getElement();

    const moneyChart = element.querySelector(`.statistics__chart--money`);
    const transportChart = element.querySelector(`.statistics__chart--transport`);
    const timeSpendChart = element.querySelector(`.statistics__chart--time`);

    moneyChart.style.backgroundColor = `#f2f2f2`;
    transportChart.style.backgroundColor = `#f2f2f2`;
    timeSpendChart.style.backgroundColor = `#f2f2f2`;

    this._moneyCart = generateMoneyChart(moneyChart, this._points);
    this._transportChart = generateTransportChart(transportChart, this._points);
    this._timeSpendChart = generateTimeSpendChart(timeSpendChart, this._points);
  }

  _getTemplate() {
    return createStatisticsTemplate();
  }
}
