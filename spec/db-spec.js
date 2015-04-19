var proxy = require("proxyquire");

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
    expect(db.connectionUrl).toBe('mongodb://bob:notSecure@ip:5/db');
  });

  describe("db functions", function () {
    var Model;
    beforeEach(function () {
      Model = {
        find: function () {},
        save: function () {},
        remove: function () {}
      }
      spyOn(Model, "find");
      spyOn(Model, "save");
      spyOn(Model, "remove");
    });

    describe("find()", function () {
      it("calls Model.find", function () {
        db.find({}, Model);
        expect(Model.find).toHaveBeenCalled();
      });
    });

    describe("save()", function () {
      it("calls Model.save", function () {
        db.save(Model);
        expect(Model.save).toHaveBeenCalled();
      });
    });

    describe("remove()", function () {
      it("calls Model.find", function () {
        db.remove({}, Model);
        expect(Model.remove).toHaveBeenCalled();
      });
    });
  });
});
