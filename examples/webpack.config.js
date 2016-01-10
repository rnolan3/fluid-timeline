/* eslint-disable no-var */
var path = require('path')
var fs = require('fs')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var jsLoader = 'babel'
var lessLoader = 'css!autoprefixer?browsers=last 2 version!less'

module.exports = {

  devtool: 'inline-source-map',

  entry: fs.readdirSync(__dirname).reduce(function (entries, dir) {
    if (fs.statSync(path.join(__dirname, dir)).isDirectory()
      && !/^__/.test(dir)) {
      entries[dir] = path.join(__dirname, dir, 'app.js')
    }
    return entries
  }, {}),

  output: {
    path: __dirname + '/__build__',
    filename: '[name].js',
    publicPath: '/__build__/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: jsLoader
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', lessLoader)
      }
    ]
  },

  resolve: {
    alias: {
      'fluid-timeline': path.join(__dirname, '../modules')
    }
  },

  plugins: [
    new ExtractTextPlugin('styles.css')
  ]

}
