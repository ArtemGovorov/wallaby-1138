var webpack = require('webpack');

module.exports = {
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    modules: ['src', 'node_modules'],
    mainFields: [/* 'module', */ 'browser', 'main']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: 'noop-loader' },
      { test: /\.(png|svg|jpg)$/, loader: 'file-loader?emitFile=false' },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('test'),
      'process.env.API_HOST': JSON.stringify(process.env.API_HOST || 'http://localhost:8000'),
      'process.env.DISABLE_SIGNUP': Boolean(process.env.DISABLE_SIGNUP),
      'process.env.DISABLE_CREATE_BOT': Boolean(process.env.DISABLE_CREATE_BOT),
      'process.env.DISABLE_INCOMPLETE': Boolean(process.env.DISABLE_INCOMPLETE),
      'process.env.DISABLE_EXPERIMENTAL': Boolean(process.env.DISABLE_EXPERIMENTAL),
    }),
    new webpack.NormalModuleReplacementPlugin(/\.(css)$/, 'node-noop'),

    // Conditional requires workaround
    // https://github.com/airbnb/enzyme/issues/47
    // https://github.com/airbnb/enzyme/blob/master/docs/guides/webpack.md
    new webpack.IgnorePlugin(/react\/addons/),
    new webpack.IgnorePlugin(/react\/lib\/ReactContext/),
    new webpack.IgnorePlugin(/react\/lib\/ExecutionEnvironment/)
  ],
  externals: {
    // Conditional requires workaround
    // https://github.com/airbnb/enzyme/issues/47
    // https://github.com/airbnb/enzyme/blob/master/docs/guides/webpack.md
    'react/addons': 'react',
    'react/lib/ReactContext': true,
    'react/lib/ExecutionEnvironment': true,
    'fs': true,
    'net': true,
    'jsdom': 'window',
    'cheerio': 'window',
    'expect': 'chai/expect'
  },

  // stats configuration since webpack 2.1, seems not work yet.
  // https://webpack.js.org/configuration/stats/#stats
  stats: 'none',
  devServer: {
    stats: 'errors-only',
  }
};