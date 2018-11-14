'use strict';

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  //  TODO change this to the new service in the OpenShift namespace
  mongo: {
    uri: 'mongodb://username:password@' + process.env.MONGODB_SERVICE_HOST + ':' + process.env.MONGODB_SERVICE_PORT + '/todolist',
  },
  mocks: {
    // api: true
    api: false
  },
  seedDB: true
};
