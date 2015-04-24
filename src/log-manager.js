var internalLogger = require('bunyan'),
    fs = require('fs'),
    checkLogFolderExists,
    logPath = __dirname + '/../logs';

var LogManager = {
  /**
  * Gets a new rotating file logger with the provided name
  * @param {String} name - The name of the logger, usually the name of the class performing the logging
  * @returns {Logger}: A bunyan logger for logging info on a rotating file
  */
  getTraceLogger: function(loggerName) {
    checkLogFolderExists();

    return internalLogger.createLogger({
      name: loggerName,
      streams: [{
        type: 'rotating-file',
        path: logPath + '/trace.log',
        period: '1d',
        count: 10
      }]
    });
  },

  /**
  * Gets a new rotating file logger with the provided name for error logging
  * @param {String} name - The name of the logger, usually the name of the class performing the logging
  * @returns {Logger}: A bunyan logger for logging errors on a rotating file
  */
  getErrorLogger: function(loggerName) {
    checkLogFolderExists();

    return internalLogger.createLogger({
      name: loggerName,
      streams: [{
        type: 'rotating-file',
        path: logPath + '/error.log',
        period: '1d',
        level: internalLogger.ERROR,
        count: 10
      }]
    });
  }
};

checkLogFolderExists = function() {
  try {
    fs.mkdirSync(logPath);
  } catch (e) {
    console.log('Folder', logPath, "already exists.");
  }
};

module.exports = LogManager;
