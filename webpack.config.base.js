module.exports = {
  module: {
    loaders: [
      { test: /.js$/, loader: 'babel', exlude: /node_modules/ }
    ]
  },
  output: {
    library: 'StickyList',
    libraryTarget: 'umd'

  }
}
