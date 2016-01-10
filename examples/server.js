/* eslint-disable no-console, no-var */
var express = require('express')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var WebpackConfig = require('./webpack.config')
var packageInfo = require('../package.json')

var fs = require('fs')
var path = require('path')
var capitalize = require('capitalize')

var app = express()

var projects = []

app.use(webpackDevMiddleware(webpack(WebpackConfig), {
  publicPath: '/__build__/',
  stats: {
    colors: true
  }
}))

app.set('view engine', 'ejs')

fs.readdirSync(__dirname).forEach(function (file) {
  if (fs.statSync(path.join(__dirname, file)).isDirectory() &&
    !/^__/.test(file)) {
    var exampleTitle = capitalize.words(file.replace(/-/g, ' '))

    projects.push({
      name: exampleTitle,
      path: file
    })

    app.get('/' + file, function (req, res) {
      res.render(path.join(__dirname, file, 'index.ejs'), {
        version: packageInfo.version,
        title: exampleTitle,
        script: `/__build__/${ file }.js`,
        timelineEvents: require('./__common__/example-events')
      })
    })
  }
})

app.get('/', function (req, res) {
  res.render(path.join(__dirname, 'index.ejs'), {
    version: packageInfo.version,
    title: capitalize.words(packageInfo.name.replace(/-/g, ' ')) + ' Examples',
    projects: projects
  })
})

app.use(express.static(__dirname))

app.listen(8080, function () {
  console.log('Server listening on http://localhost:8080, Ctrl+C to stop')
})
