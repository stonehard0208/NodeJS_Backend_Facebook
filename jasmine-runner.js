const Jasmine = require('jasmine');
const JasmineReporters = require('jasmine-reporters');

const jasmine = new Jasmine();

jasmine.loadConfigFile('spec/support/jasmine.json'); 

const junitReporter = new JasmineReporters.JUnitXmlReporter({
    savePath: 'test-results', 
    consolidateAll: false 
});

jasmine.addReporter(junitReporter);

jasmine.execute();
