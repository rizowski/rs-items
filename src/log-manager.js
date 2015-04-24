var internalLogger = require('bunyan'),
    fs = require('fs');

function LogManager() {
  var self = this,
      logPath = __dirname+'/../logs',
      checkLogFolderExists;

  /**
  * Gets a new rotating file logger with the provided name
  * @param {String} name - The name of the logger, usually the name of the class performing the logging
  * @returns {Logger}: A bunyan logger for logging info on a rotating file
  */
  self.getTraceLogger = function(loggerName) {
    checkLogFolderExists('trace');

    return internalLogger.createLogger({
      name: loggerName,
      streams: [{
        type: 'rotating-file',
        path: logPath + '/trace.log',
        period: '1d',
        count: 10
      }]
    });
  }

  /**
  * Gets a new rotating file logger with the provided name for error logging
  * @param {String} name - The name of the logger, usually the name of the class performing the logging
  * @returns {Logger}: A bunyan logger for logging errors on a rotating file
  */
  self.getErrorLogger = function(loggerName) {
    checkLogFolderExists('error');
    // fs.open(logPath+'/error.log', 'a+', function(err, fd) {});

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

  checkLogFolderExists = function(logName) {
    try {
      fs.mkdirSync(logPath);
    }
    catch (e) {
      console.log('Folder', logPath, "already exists.");
    }
  }
}

module.exports = LogManager;
