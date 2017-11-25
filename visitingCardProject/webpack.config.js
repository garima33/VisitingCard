var webpack = require('webpack');
var argv = require('minimist')(process.argv.slice(2));

var DEV = process.env.NODE_ENV !== 'production'

var ENTRYPOINT = DEV ? ['webpack/hot/only-dev-server','babel-polyfill', './app.js'] : ['babel-polyfill', './app.js'];

var BUILD_GLOBALS = {
  '__DEV__': "\'" + process.env.NODE_ENV + "\'",
};

console.log('process.env.NODE_ENV----> ', BUILD_GLOBALS.__DEV__);
var AUTOPREFIXER_LOADER = 'autoprefixer-loader?{browsers:[' +
  '"Android >= 4", "Chrome >= 20", "Firefox >= 24", ' +
  '"Explorer >= 9", "iOS >= 6", "Safari >= 6"]}';


console.log('\nPerforming a %s build.\n', DEV ? 'development' : 'production')

var config = {

  entry: ENTRYPOINT,

  output: {
    filename: 'index.js',
    path: './dist/',
    publicPath: '/dist',
    libraryTarget: 'umd'
  },

  cache: DEV,
  debug: DEV,
  devtool: DEV ? '#inline-source-map' : false,

  stats: {
    colors: true,
    reasons: DEV
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(BUILD_GLOBALS),
  ].concat(DEV ? [] : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.AggressiveMergingPlugin()
    ]),

  resolve: {
    extensions: ['', '.webpack.js', '.js', '.jsx', '.json']
  },


  externals: {
    'drupal-t': 'drupal-t'
  },
  module: {
    loaders: [{
      test: /\.less$/,
      loader: 'style-loader!css-loader!' + AUTOPREFIXER_LOADER + '!less-loader'
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
                presets: ['es2015', 'react']
            }
    }, {
      include: /\.json$/,
      exclude: /node_modules/,
      loader: 'json-loader'
    }]
  }
};

module.exports = config;
