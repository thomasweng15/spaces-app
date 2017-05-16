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
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
      }
    ]
  }
};