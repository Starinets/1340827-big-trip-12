'use strict';

const path = require(`path`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

const PATH_TO_BUNDLE = path.join(__dirname, 'public');

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: PATH_TO_BUNDLE,
  },
  devtool: `source-map`,
  devServer: {
    contentBase: PATH_TO_BUNDLE,
    watchContentBase: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new MomentLocalesPlugin()
]
};
