/**
 * Created by donal on 19/08/2016.
 */
const path = require('path');
const srcDir = path.join(__dirname, '..', 'server');

// included as in the instructions here
// https://github.com/pghalliday/grunt-mocha-test#generating-coverage-reports

require('blanket')({
  // Only files that match the pattern will be instrumented
  pattern: srcDir
});
