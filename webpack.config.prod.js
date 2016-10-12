const webpack = require('webpack');
const config = require('./webpack.config');
const path = require('path');

const prodConfig = {
  entry: [
    'babel-polyfill',
    'eventsource-polyfill',
    path.join(__dirname, './src/index.js'),
  ],
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: [
        'babel',
      ],
      exclude: /node_modules/,
      include: __dirname,
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
      ],
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader?modules&localIdentName=[path][name]-[local]-[hash:base64:5]!postcss-loader'
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      // API_HOST: "'http://git4uap.large-bear.net:9527/api'",
      // API_HOST: "'http://apiacc.futureworldex.com/api'",
      ENV: "'__PROD__'",
    }),
    new webpack.ProvidePlugin({
      'Promise': 'es6-promise', // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
  ]
};

module.exports = Object.assign({}, config, prodConfig);
