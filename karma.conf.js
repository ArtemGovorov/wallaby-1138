/**
 * Karma-webpack configuration file
 *
 * http://karma-runner.github.io/1.0/config/configuration-file.html
 */

var webpackConfig = require('./webpack.test.config');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      // workaround for ES6 support on PhantomJS
      // https://github.com/ariya/phantomjs/issues/13652
      'node_modules/babel-polyfill/browser.js',

      // glob-pattern workaround for issue on Mac OS
      // https://github.com/karma-runner/karma/issues/1532#issuecomment-127128326
      'test/**/*.+(ts|tsx)',
    ],
    exclude: [
      'node_modules'
    ],
    preprocessors: {
      // FIXME: Sourcemap doesn't work on PhantomJS
      // https://github.com/ariya/phantomjs/issues/12289
      // https://github.com/karma-runner/karma/issues/2268
      '**/*.+(ts|tsx)': ['webpack'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: {
        chunks: false,
        cached: false,
        warnings: false,
        hash: false,
        version: false,
        timings: false,
        assets: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        warnings: false,
        publicPath: false
      },
    },

    reporters: ['mocha'],
    browsers: ['PhantomJS'],

    colors: true,
    logLevel: config.LOG_INFO,
    singleRun: true,
    autoWatch: false,
    concurrency: Infinity
  })
}
