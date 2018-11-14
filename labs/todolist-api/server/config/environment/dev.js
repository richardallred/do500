'use strict';

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://username:password@' + process.env.MONGODB_SERVICE_HOST + ':' + process.env.MONGODB_SERVICE_PORT + '/todolist',
  },
  seedDB: true,
  port: process.env.PORT || 9000
};
