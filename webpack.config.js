var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: './modules/main.js',
  output: {
    path: path.join(__dirname, 'public'), 
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
      }
    ]
  }
};