var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: {
    './build/bundle.js':'./index.js',
    './test/site/bundle.js': './test/site/main.js' // This one is for demo which is inside test folder 
  },
  output: {
    path: path.resolve(__dirname, './'),
    filename: '[name]'
  }
};