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
      url: process.env.TEST_URL || 'https://jps-judicial-payment-frontend-pr-70.preview.platform.hmcts.net/',
      show: false,
      browser: 'chromium',
      timeout: 10000,
      ignoreHTTPSErrors: true
    }
  },
  include: {
    I: './pages/steps_file.js'
  },
  plugins: {
    retryFailedStep: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
      fullPageScreenshots: true,
    },
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
