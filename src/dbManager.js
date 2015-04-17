var rest = require("rest"),
  mongoose = require('mongoose'),
  _ = require('lodash');

function RsDb(credentials) {
  if (_.isUndefined(credentials))
    throw new TypeError("Username and password are not provided {username: , password}");
  var self = this;
  self.settings = {};
  self.settings.dbName = "runescape";
  self.settings.baseUrl = "https://api.mongolab.com/api/1/";
  self.settings.urls = {
    collections: self.settings.baseUrl + "databases/" + self.settings.dbName + "/collections",
    items: self.settings.baseUrl + "databases/" + self.settings.dbName + "/collections/items"
  };

  mongoose.connect('mongodb://' + credentials.username + ":" + credentials.password + "@ds055680.mongolab.com:55680/" + self.settings.dbName);
}

module.exports = RsDb;
