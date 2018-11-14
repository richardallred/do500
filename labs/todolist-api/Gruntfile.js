// Generated on 2016-08-09 using generator-angular-fullstack 2.1.1
'use strict';

module.exports = function (grunt) {
  let localConfig;
  try {
    localConfig = require('./server/config/local.env');
  } catch(e) {
    localConfig = {};
  }

  // Load grunt tasks automatically, when needed
  require('jit-grunt')(grunt, {
    express: 'grunt-express-server'
  });

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.task.loadTasks('./tasks');

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    pkg: grunt.file.readJSON('package.json'),
    express: {
      options: {
        port: process.env.PORT || 9000
      },
      dev: {
        options: {
          script: 'server/app.js',
          debug: true
        }
      },
      prod: {
        options: {
          script: 'dist/server/app.js'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      server: {
        options: {
          jshintrc: 'server/.jshintrc'
        },
        src: [
          'server/**/*.js',
          '!server/**/*.spec.js'
        ]
      },
      serverTest: {
        options: {
          jshintrc: 'server/.jshintrc'
        },
        src: ['server/**/*.spec.js']
      },
      ci_server: {
        options: {
          jshintrc: 'server/.jshintrc',
          reporter: require('jshint-jenkins-checkstyle-reporter'),
          reporterOutput: 'reports/server/linting/jshint-server.xml'
        },
        src: [
          'server/**/*.js',
          'server/**/*.spec.js'
        ]
      },
      // bm_server: {
      //   options: {
      //     jshintrc: 'server/.jshintrc',
      //     reporter: require('jshint-junit-reporter'),
      //     reporterOutput: 'reports/server/linting/jshint-junit-server.xml'
      //   },
      //   src: [
      //     'server/**/*.js',
      //     'server/**/*.spec.js'
      //   ]
      // }
    },

    // Empties folders to start fresh
    clean: {
      server: '.tmp',
      mochareports: 'reports/server/mocha/**',
      lint: 'reports/{server}/linting/**',
      coverage: 'reports/coverage/**'
    },

    // Use nodemon to run server in debug mode with an initial breakpoint
    nodemon: {
      debug: {
        script: 'server/app.js',
        options: {
          nodeArgs: ['--debug-brk'],
          env: {
            PORT: process.env.PORT || 9000
          },
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // opens browser on initial server start
            nodemon.on('config:update', function () {
              setTimeout(function () {
                require('open')('http://localhost:8080/debug?port=5858');
              }, 500);
            });
          }
        }
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
      ],
      test: [
      ],
      debug: {
        tasks: [
          'nodemon',
        ],
        options: {
          logConcurrentOutput: true
        }
      },
      dist: [
      ]
    },

    mochaTest: {
      terminal: {
        options: {
          reporter: 'spec',
          require: 'tasks/blanket'
        },
        src: ['server/**/*.spec.js']
      },
      junit: {
        options: {
          reporter: 'mocha-junit-reporter',
          // require: require("blanket"),
          require: 'tasks/blanket'
        },
        src: ['server/**/*.spec.js']
      },
      html: {
        options: {
          // reporters are  ['html-cov', 'json-cov', 'travis-cov', 'mocha-lcov-reporter', 'mocha-cobertura-reporter'],
          reporter: 'html-cov',
          quiet: true,
          captureFile: 'reports/server/coverage/cobertura-report.html'
        },
        src: ['server/**/*.spec.js']
      },
      cobertura: {
        options: {
          reporter: 'mocha-cobertura-reporter',
          // use the quiet flag to suppress the mocha console output
          quiet: true,
          // specify a destination file to capture the mocha
          // output (the quiet option does not suppress this)
          captureFile: 'reports/server/coverage/cobertura-report.xml'
        },
        src: ['server/**/*.spec.js']
      },
      travis: {
        options: {
          reporter: 'travis-cov',
          quiet: false
        },
        src: ['server/**/*.spec.js']
      }
    },

    env: {
      test: {
        NODE_ENV: 'test'
      },
      dev: {
        NODE_ENV: 'development'
      },
      ci: {
        NODE_ENV: 'ci'
      },
      si: {
        NODE_ENV: 'si'
      },
      prod: {
        NODE_ENV: 'production'
      },
      jenkins: {
        MOCHA_FILE: 'reports/server/mocha/test-results.xml'
      },
      all: localConfig
    },
  });

  // Used for delaying livereload until after server has restarted
  grunt.registerTask('wait', function () {
    grunt.log.ok('Waiting for server reload...');

    const done = this.async();

    setTimeout(function () {
      grunt.log.writeln('Done waiting!');
      done();
    }, 1500);
  });

  grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
    this.async();
  });

  grunt.registerTask('build-image', 'Build the image', function(imageId) {
    const shell = require("shelljs");
    grunt.log.ok('BUILDING IMAGE');
    if (!imageId) {
      grunt.fail.warn('must supply an imageId to build');
    }
    const rc = shell.exec('docker build -t todolist:' + imageId + ' -f ./dist/Dockerfile ./dist').code;
    if (rc > 0){
      grunt.fail.warn("DOCKER FAILURE")
    }
  });

  grunt.registerTask('deploy', 'deploy the node js app to a docker container and start it in the correct mode', function(target_env, build_tag) {
    grunt.log.ok('this task must run on a host that has the Docker Daemon running on it');
    const ports = {
      ci: '9001',
      si: '9002',
      production: '80'
    };

    if (target_env === undefined || build_tag === undefined){
      grunt.fail.warn('Required param not set - use grunt deploy\:\<target\>\:\<tag\>');
    } else {
      const shell = require("shelljs");
      grunt.log.ok('STOPPING AND REMOVING EXISTING CONTAINERS');
      shell.exec('docker stop todolist-'+ target_env + ' && docker rm todolist-'+ target_env);

      grunt.log.ok('DEPLOYING ' + target_env + ' CONTAINER');
      if (target_env === 'ci'){
        const rc = shell.exec('docker run -t -d --name todolist-' + target_env + ' -p ' + ports[target_env]+ ':'+ports[target_env]+' --env NODE_ENV=' + target_env + ' todolist:' + build_tag);
        if (rc > 0){
          grunt.fail.warn("DOCKER FAILURE")
        }
      } else {
        // ensure mongo is up
        const isMongo = shell.exec('docker ps | grep devops-mongo').code;
        if (isMongo > 0){
          grunt.log.ok('DEPLOYING Mongodb CONTAINER FIRST');
          shell.exec('docker run --name devops-mongo -p 27017:27017 -d mongo');
        }
        const rc = shell.exec('docker run -t -d --name todolist-' + target_env + ' --link devops-mongo:mongo.server -p '
            + ports[target_env]+ ':' + ports[target_env] + ' --env NODE_ENV=' + target_env + ' todolist:' + build_tag).code;
        if (rc > 0){
          grunt.fail.warn("DOCKER FAILURE");
        }
      }
    }

  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'env:all', 'env:prod', 'express:prod', 'wait', 'express-keepalive']);
    }

    if (target === 'debug') {
      return grunt.task.run([
        'clean:server',
        'env:all',
        'concurrent:server',
        'concurrent:debug'
      ]);
    }

    grunt.task.run([
      'clean:server',
      'env:all',
      'env:' + (target || 'dev'),
      'express:dev',
      'wait',
      'express-keepalive'
    ]);
  });

  grunt.registerTask('test', function(target, environ) {
    environ = environ !== undefined ? environ : 'test';
    const reporter = 'terminal';
    const coverage = 'travis';
    if (target === 'server-jenkins') {
      target = 'server';
      reporter = 'junit';
      coverage = 'cobertura';
      grunt.task.run(['env:jenkins']);
    }
    if (target === 'server') {
      return grunt.task.run([
        'clean:mochareports',
        'clean:coverage',
        'env:all',
        'env:'+environ,
        'mochaTest:' + reporter,
        'mochaTest:' + 'html',
        'mochaTest:' + coverage
      ]);
    }

    else grunt.task.run([
      'test:server'
    ]);
  });

  grunt.registerTask('build', [
    'clean',
    'concurrent:dist',
    'newer:jshint',
    'test',
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
