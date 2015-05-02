/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/node/bunyan.d.ts"/>
'use-strict';

var internalLogger = require('bunyan'),
  fs = require('fs'),
  checkLogFolderExists,
  logPath = __dirname + '/../logs';

checkLogFolderExists = function () {
  try {
    fs.mkdirSync(logPath);
  } catch (e) {
    //console.log('Folder', logPath, "already exists.");
  }
};

/**
 * Creates a logger with two rotating files for logging. Error and trace.
 * @param {String} name - The name of the logger, usually the name of the class performing the logging
 * @returns {Logger}: A bunyan logger for logging errors on a rotating file
 */
function createLogger(loggerName) {
  checkLogFolderExists();

  return internalLogger.createLogger({
    name: loggerName,
    streams: [
      {
        type: 'rotating-file',
        path: logPath + '/trace.log',
        period: '1d',
        count: 10
      },
      {
        type: 'rotating-file',
        path: logPath + '/error.log',
        period: '1d',
        level: internalLogger.ERROR,
        count: 10
      },
      {
        stream: process.stdout
      }]
  });
}

module.exports = createLogger;
