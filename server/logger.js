import internalLogger from 'bunyan';
import fs from 'fs';
import path from 'path';

const logPath = path.resolve(__dirname, '../logs');

const checkLogFolderExists = () => {
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

export default createLogger;
