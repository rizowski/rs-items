var proxy = require("proxyquire");

describe("DB Manager", function () {
  var db,
    mock;
  beforeEach(function () {
    mock = {
      'mongoose': {
        connect: function () {}
      }
    };
    DB = proxy("../src/dbManager", mock);
    db = new DB({});
  });

  it("has default settings if nothing is provided", function () {
    var defaultSettings = {
      dbName: "runescape",
      baseUrl: "https://api.mongolab.com/api/1/",
      urls: {
        collections: "https://api.mongolab.com/api/1/databases/runescape/collections",
        items: "https://api.mongolab.com/api/1/databases/runescape/collections/items"
      }
    };

    expect(db.settings.dbName).toBe(defaultSettings.dbName);
    expect(db.settings.baseUrl).toBe(defaultSettings.baseUrl);
    expect(db.settings.urls.collections).toBe(defaultSettings.urls.collections);
    expect(db.settings.urls.items).toBe(defaultSettings.urls.items);
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
