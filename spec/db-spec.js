'use-strict';
/* global describe, before, beforeEach, after, afterEach, it*/
var proxy = require('proxyquire'),
  chai = require('chai'),
  expect = chai.expect,
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  log = require('../src/log-manager')('dbSpec');

chai.use(sinonChai);

describe("DB Manager", function () {
  var db,
    mock,
    loggerStub;

  before(function () {
    loggerStub = sinon.stub(log, "info", function(){
      
    });

    mock = {
      'mongoose': {
        connect: function (url) {
          return url;
        },
        connection: {
          on: function () {},
          once: function () {}
        }
      },
    };
    var DB = proxy("../src/db-manager", mock);
    db = new DB();
  });

  after(function () {
    loggerStub.restore();
  });

  describe("object validation", function () {
    before(function () {
      var configMock = {
        mongoose: mock.mongoose,
        '../config': {
          db: {
            name: "db",
            server: "ip",
            port: 5,
            credentials: {
              username: "bob",
              password: "notSecure"
            }
          }
        }
      };
      var DB = proxy("../src/db-manager", configMock);
      db = new DB();
    });

    it("connects to the correct url", function () {
      expect(db.connectionUrl).to.equal('mongodb://bob:notSecure@ip:5/db');
    });
  });

  describe("db functions", function () {
    var Model, model;
    beforeEach(function () {
      var returnsModel = function(){
        return Model;
      };
      Model = {
        where: returnsModel,
        find: returnsModel,
        save: returnsModel,
        update: returnsModel,
        remove: returnsModel,
        setOptions: returnsModel
      };

      model = {
        _id: "",
        name: "modelName",
        toObject: function(){ return model;}
      };
    });

    describe("find()", function () {
      it("calls Model.find", function () {
        var spy = sinon.spy(Model, 'find');
        db.find({}, Model);
        expect(spy).to.have.been.called;
      });
    });

    describe("save()", function () {
      it("calls Model.save", function () {
        var spy = sinon.spy(Model, 'update');
        db.save(Model, model);
        expect(spy).to.have.been.called;
      });
    });

    describe("remove()", function () {
      it("calls Model.find", function () {
        var spy = sinon.spy(Model, 'remove');
        db.remove({}, Model);
        expect(spy).to.have.been.called;
      });
    });
  });
});
