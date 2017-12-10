module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    files: [
      'test/test-*',
      { pattern: 'test/fixtures/index.html', included: false },
      { pattern: 'test/fixtures/bundle.js', included: false }
    ],
    preprocessors: {
      '/**/*.js': ['webpack', 'sourcemap']
    },
    webpack: {
      watch: true,
      devtool: 'inline-source-map',
      module: {
        rules: [{
          test: /index\.js$/,
          use: {
            loader: 'istanbul-instrumenter-loader'
          },
          exclude: /(test|node_modules|bower_components)\//
        }]
      }
    },
    webpackServer: {
      quiet: true,
      noInfo: true
    },
    reporters: [ 'progress', 'coverage-istanbul', 'coverage' ],
    coverageIstanbulReporter: {
      reports: [ 'text-summary' ],
      fixWebpackSourcePaths: true
    },
    browsers: ['Firefox']
  })
}
