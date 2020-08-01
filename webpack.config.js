'use strict';

const path = require(`path`);

let pathToBundle = path.join(__dirname, `public`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: pathToBundle,
  },
  devtool: `source-map`,
  devServer: {
    contentBase: pathToBundle,
    watchContentBase: true,
  }
};
