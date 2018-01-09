// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  plugins: [{
    package: 'protractor-screenshoter-plugin',
    screenshotPath: './REPORTS/e2e',
    screenshotOnExpect: 'none',
    screenshotOnSpec: 'failure+success',
    withLogs: true,
    writeReportFreq: 'asap',
    imageToAscii: 'none',
    clearFoldersBeforeTest: true
  }],
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  //SELENIUM_PROMISE_MANAGER: false,
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));

    return global.browser.getProcessedConfig().then(function(config) {
    });
  }
};
