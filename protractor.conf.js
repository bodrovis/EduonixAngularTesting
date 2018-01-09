// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  multiCapabilities: [{
    'browserName': 'firefox',
    'platform': 'macOS 10.13',
    'version': '55',
    maxInstances: 1    //how many browsers will run
  },
  {
    'browserName': 'chrome',
    'platform': 'macOS 10.13',
    'version': '60',
    maxInstances: 1    //how many browsers will run
  }],
  //directConnect: true,
  sauceUser: 'bodrovis_ed',
  sauceKey: '97a3d094-9f03-4c2d-80fb-fe98887d999d',
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
  }
};
