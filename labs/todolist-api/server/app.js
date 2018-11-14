/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express');
const config = require('./config/environment');



// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
const app = express();
const server = require('http').createServer(app);
require('./config/express')(app);

if (config.mocks && config.mocks.api) {
  //add stubs if needed
  require('./mocks/mock-routes')(app);
} else {
  const mongoose = require('mongoose');
  // Connect to database
  mongoose.connect(config.mongo.uri, config.mongo.options);
  mongoose.connection.on('error', function(err) {
      console.error('MongoDB connection error: ' + err);
      process.exit(-1);
    }
  );
  require('./routes')(app);
}

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
