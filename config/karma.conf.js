module.exports = function (config) {
    config.set({
        basePath: '../',
        frameworks: ['jasmine', 'browserify'],

        files: [
            "test/unit/dummySpec.js",
            "test/unit/trackSpec.js"
        ],

        reporters: ['progress'],
        autoWatch: true,
        LogLevel: config.LOG_DEBUG,
        colors: true,
        browsers: ['Chrome'],
        captureTimeout: 60000,
        singleRun: false,

        // Browserify config
        browserify: {
            watch: true,
            debug: true
        },

        preprocessors: {
            "test/unit/*": ['browserify']
        }
    });
};
