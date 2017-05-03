var path = require('path');
var webpack = require('webpack');
var wallabyWebpack = require('wallaby-webpack');
var webpackConfig = require('./webpack.test.config');

module.exports = function (wallaby) {

  webpackConfig.context = path.join(wallaby.projectCacheDir, 'src');
  var webpackPostprocessor = wallabyWebpack(webpackConfig);

  return {
    files: [
      { pattern: 'node_modules/babel-polyfill/browser.js', instrument: false },
      { pattern: 'node_modules/chai/chai.js', instrument: false },
      { pattern: 'node_modules/react/dist/react-with-addons.js', instrument: false },
      { pattern: 'node_modules/react-dom/dist/react-dom.js', instrument: false },
      { pattern: 'src/mixins/**/*', instrument: false },
      { pattern: 'src/assets/**/*', load: false },
      { pattern: 'src/**/*.{ts,tsx}', load: false },
      { pattern: 'src/**/*.d.ts', ignore: true },
      { pattern: 'test/**/*.spec.{ts,tsx}', ignore: true },
    ],
    tests: [
      { pattern: 'test/**/*.spec.{ts,tsx}', load: false },
    ],
    compilers: {
      '**/*.{ts,tsx}': wallaby.compilers.typeScript({
        jsx: 'react',
        module: 'commonjs'
      }),
    },
    postprocessor: webpackPostprocessor,
    testFramework: 'mocha',
    setup: function (wallaby) {
      window.expect = chai.expect;

      // required to trigger test loading
      window.__moduleBundler.loadTests();
    }
  };
};
