var proxy = require('proxyquire'),
chai = require('chai'),
expect = chai.expect,
sinon = require('sinon'),
sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe("DB Manager", function () {
  var db,
  mock;
  beforeEach(function () {
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
    DB = proxy("../src/dbManager", mock);
    db = new DB();
  });

  it("connects to the correct url", function () {
    expect(db.connectionUrl).to.equal('mongodb://bob:notSecure@ip:5/db');
  });

  describe("db functions", function () {
    var Model;
    beforeEach(function () {
      Model = {
        find: function () {},
        save: function () {},
        remove: function () {}
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
        var spy = sinon.spy(Model, 'save');
        db.save(Model);
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
