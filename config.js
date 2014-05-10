'use strict';

var fs = require('fs');

var globalConfig = {
  root: __dirname,
  port: process.env.PORT || 3000
};

module.exports = function() {
  switch(process.env.NODE_ENV) {
    case 'development':
      return globalConfig;
    case 'production':
      return globalConfig;
    default:
      return globalConfig;
  }
};
