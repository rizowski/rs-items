'use-strict';
var mongoose = require('mongoose'),
  _ = require('lodash'),
  settings = require('../config'),
  log = require('./log-manager');

function RsDb() {
  if (_.isUndefined(settings.db.credentials))
    throw new TypeError("Username and password are not provided in the config {username: , password}");

  var self = this,
    db = mongoose.connection,
    setup;

  setup = function () {
    self.types = {
      item: "item",
      quest: "quest"
    };
    self.connectionUrl = 'mongodb://' + settings.db.credentials.username + ":" + settings.db.credentials.password + "@" + settings.db.server + ":" + settings.db.port + "/" + settings.db.name;

    mongoose.connect(self.connectionUrl);

    db.on("error", console.error.bind(console, 'connection error:'));
    db.once("open", function (next) {
      console.log("Connected.");
    });
  };

  self.save = function (model) {
    model.save(function (err, model) {
      if (err) return log.error(err);
    });
  };

  self.findAll = function (Model, callback) {
    Model.find(function (err, models) {
      if (err) return log.error(err);
      callback(models);
    });
  };

  self.find = function (findBy, Model, callback) {
    Model.find(findBy, function (err, model) {
      if (err) return log.error(err);
      callback(model);
    });
  };

  self.remove = function (findBy, Model, callback) {
    Model.remove(findBy, function (err) {
      if (err) return log.error(err);
      callback();
    });
  };


  setup();
}

module.exports = RsDb;
