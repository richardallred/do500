const request = require('request');
const benchrest = require('bench-rest');
const grunt = require("grunt");
const Q = require('q');


// INFO ABOUT THE STATS
// stats.main.histogram.min - the minimum time any iteration took (milliseconds)
// stats.main.histogram.max - the maximum time any iteration took (milliseconds)
// stats.main.histogram.mean - the average time any iteration took (milliseconds)
// stats.main.histogram.p95 - the amount of time that 95% of all iterations completed within (milliseconds)

const options = {
  limit: 10,     // concurrent connections
  iterations: 10000  // number of iterations to perform
};
const test = {
  domain : 'http://localhost:9000',
  dir : './reports/server/perf/',
  route : '/api/todos/',
  nfr : 60
};
const dev = {
  domain : 'http://' + process.env.E2E_TEST_ROUTE,
  dir : './reports/server/perf/',
  route : '/api/todos/',
  nfr : 60
};
const production = {
  domain : 'http://localhost:80',
  dir : './reports/server/perf/',
  route : '/api/todos/',
  nfr : 50
};

const test_endpoint = function (flow, options) {
  const wait = Q.defer();

  benchrest(flow, options)
    .on('error', function (err, ctxName) {
      console.error('Failed in %s with err: ', ctxName, err);
    })
    .on('end', function (stats, errorCount) {
      console.log('\n\n###### ' +flow.filename +' - ' +flow.env.domain + flow.env.route);
      console.log('Error Count', errorCount);
      console.log('Stats', stats);
      const mean_score = stats.main.histogram.mean;
      const fs = require('fs-extra');
      const file = flow.env.dir + flow.filename + '-perf-score.csv';
      fs.outputFileSync(file, 'mean,max,mix,p95\n'+  stats.main.histogram.mean +','
        + stats.main.histogram.max +','+ stats.main.histogram.min +','+ stats.main.histogram.p95);
      if (mean_score > flow.env.nfr){
        console.error('NFR EXCEEDED - ' +mean_score +' > '+flow.env.nfr);
        wait.resolve(false);
      } else {
        wait.resolve(true);
      }
    });
  return wait.promise
};


module.exports = function () {
  grunt.task.registerTask('perf-test', 'Runs the performance tests against the target env', function(target, api) {
    if (target === undefined || api === undefined){
      grunt.fail.fatal('Required param not set - use grunt perf-test\:\<target\>\:\<api\>');
    } else {
      const done = this.async();
      const create = {
        filename: 'create',
        env: {},
        main: [{
          post: dev.domain + dev.route,
          json: {
            title: 'Run perf-test',
            completed: false
          }
        }]
      };

      const show = {
        filename: 'show',
        env: {},
        main: [{
          get: dev.domain + dev.route
        }]
      };

      if (target === 'dev') {
        show.env = dev;
        create.env = dev;
      }
      else if (target === 'production') {
        show.env = production;
        create.env = production;
      }
      else if (target === 'test') {
        show.env = test;
        create.env = test;
      } else {
        grunt.fail.fatal('Invalid target - ' + target);
        done();
      }

      grunt.log.ok("Perf tests running against " + target);
      grunt.log.ok("This may take some time .... ");

      const all_tests = [];

      // console.log(create)
      // console.log(show)
      request(show.env.domain + show.env.route, function (error, response, body) {
        if (error) {
          grunt.log.error(error);
        } else if(response.statusCode == 200) {
          if (api === 'create'){
            all_tests.push(test_endpoint(create, options));
          }
          else {
            const mongoid = JSON.parse(body)[0]._id;
            show.main[0].get = dev.domain + dev.route + mongoid;
            all_tests.push(test_endpoint(show, options));
          }

          Q.all(all_tests).then(function (data) {
            grunt.log.ok(data);
            if (data.indexOf(false) > -1){
              grunt.fail.fatal('FAILURE - NFR NOT ACHIEVED');
            } else {
              grunt.log.ok('SUCCESS - All NFR ACHIEVED');
              return done();
            }
          });
        } else {
          grunt.fail.fatal('FAILURE: something bad happened... there was no error from mongo but the response code was not 200')
        }
      });
    }
  });
};
