const {
  setHeadlessWhen,
  setCommonPlugins
} = require('@codeceptjs/configure');

setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './paths/*_test.js',
  output: process.cwd() + '/functional-output',
  helpers: {
    Playwright: {
      url: process.env.TEST_URL || 'http://localhost:3000',
      show: false,
      browser: 'chromium',
      timeout: 10000
    },
    RandomDateHelper: {
      require: './helpers/RandomDateHelper.js'
    }
  },
  include: {
    I: './pages/steps_file.js'
  },
  name: 'hmc-judicial-payment-frontend',
  mocha: {
    reporterOptions: {
      reportDir: 'functional-output/',
      reportFilename: "Functional Tests Report",
      stdout: './functional-output/console.log'
    }
  }
}
