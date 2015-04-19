var rest = require("rest"),
  mongoose = require('mongoose'),
  _ = require('lodash');

function RsDb(credentials) {
  if (_.isUndefined(credentials))
    throw new TypeError("Username and password are not provided {username: , password}");
  var self = this,
    db = mongoose.connection,
    setup = function () {
      self.types = {
        item: "item",
        quest: "quest"
      }
      self.settings = {};
      self.settings.dbName = "runescape";
      self.settings.baseUrl = "https://api.mongolab.com/api/1/";
      self.settings.urls = {
        collections: self.settings.baseUrl + "databases/" + self.settings.dbName + "/collections",
        items: self.settings.baseUrl + "databases/" + self.settings.dbName + "/collections/items"
      };
      mongoose.connect('mongodb://' + credentials.username + ":" + credentials.password + "@ds055680.mongolab.com:55680/" + self.settings.dbName);

      db.on("error", console.error.bind(console, 'connection error:'));
      db.once("open", function (next) {
        console.log("Connected.");
      });
    };

  self.save = function (type, schema) {
    var thing = mongoose.model(type, schema);

  }


  setup();
}

module.exports = RsDb;
