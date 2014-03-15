// An example configuration file.
exports.config = {
    // Do not start a Selenium Standalone sever - only run this using chrome.
    // chromeOnly: true,
    // chromeDriver: './node_modules/protractor/selenium/chromedriver',

    // comment out chromeOnly and chromeDriver if using this one:
    seleniumAddress: 'http://0.0.0.0:4444/wd/hub',


    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            binary: '/Applications/GoogleChrome.app/Contents/MacOS/Google Chrome',
            args: [],
            extensions: [],
        }
    },

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: ['test/e2e/**/*spec.js'],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    },

    baseUrl: 'http://127.0.0.1:8000/'







};