// Karma configuration
// Generated on Thu May 29 2014 22:04:03 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.min.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular-mocks.js',
      'web/js/TodoApp.js',
      'test/*Spec.js'
    ],


    // list of files to exclude
    exclude: [
      
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        // source files, that you wanna generate coverage for
        // do not include tests or libraries
        // (these files will be instrumented by Istanbul)
        'web/js/TodoApp.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','dots','story','html','coverage'],

    // optionally, configure the reporter
    coverageReporter: {
        reporters:[
            {type : 'html', dir : 'coverage/'},
            {type: 'text-summary'}
        ]
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    captureTimeout: 10000,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher ,'Chrome','Firefox'
    browsers: ['PhantomJS','Chrome','Firefox'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-html-reporter',
      'karma-story-reporter',
      'karma-js-coverage'
    ]
  });
};
