const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './paths/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      url: 'http://localhost',
      show: true,
      browser: 'chromium'
    }
  },
  include: {
    I: './pages/steps_file.js'
  },
  name: 'hmc-judicial-payment-frontend',
  mocha: {
    reporterOptions: {
      mochawesome: {
        stdout: "./output/console.log",
        options: {
          reportDir: "./output",
          reportFilename: "Functional Tests Report"
        }
      }
    }
  }
}
