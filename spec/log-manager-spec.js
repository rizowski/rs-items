'use-strict';
/* global describe, before, beforeEach, after, afterEach, it*/
var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    bunyan = require('bunyan');

chai.use(sinonChai);

describe('Log Manager', function() {
  var log,
    loggerName = "testLogger";

  beforeEach(function() {
    log = require('../src/log-manager')(loggerName);
  });

  it("creates a folder", function(){
    
  });

  it('gets trace logger with name', function() {
    expect(log._level).to.equal(bunyan.INFO);
    expect(log.streams).to.have.length(3);
    expect(log.streams[0].type).to.equal('rotating-file');
    expect(log.fields.name).to.equal(loggerName);
  });
});
