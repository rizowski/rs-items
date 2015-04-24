var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    bunyan = require('bunyan');

chai.use(sinonChai);

describe('Log Manager', function() {
  var logManager;

  beforeEach(function() {
    logManager = require('../src/log-manager');
  });

  it('gets trace logger with name', function() {
    var logger = logManager.getTraceLogger('test');
    expect(logger._level).to.equal(bunyan.INFO);
    expect(logger.streams).to.have.length(1);
    expect(logger.streams[0].type).to.equal('rotating-file');
    expect(logger.fields.name).to.equal('test');
  });

  it('gets error logger with name', function() {
    var logger = logManager.getErrorLogger('error-test');
    expect(logger._level).to.equal(bunyan.ERROR);
    expect(logger.streams).to.have.length(1);
    expect(logger.streams[0].type).to.equal('rotating-file');
    expect(logger.fields.name).to.equal('error-test');
  });
});
