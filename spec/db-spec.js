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
        server: "ip",
        port: 5,
        credentials: {
          username: "bob",
          password: "notSecure"
        },
        db: {
          name: "muhDb"
        }
      }
    };
    DB = proxy("../src/dbManager", mock);
    db = new DB();
  });

  it("connects to the correct url", function () {
    expect(db.connectionUrl).toBe('mongodb://bob:notSecure@ip:5/muhDb');
  });

  describe("GET", function () {

  });

  describe("FIND", function () {

  });

  describe("UPDATE", function () {

  });

  describe("POST", function () {

  });

  describe("DELETE", function () {

  });
});
