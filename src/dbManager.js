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
    trace = log.getTraceLogger("DbManager"),
    error = log.getErrorLogger("DbManager"),
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
      trace.info("Connected to", settings.db.server, settings.db.port);
    });
  };

  self.save = function (Model, model) {
    Model.findOneAndUpdate({
        _id: model._id
      },
      model, {
        upsert: true
      },
      function (err, savedModel) {
        if (err) return error.error(err);
        model.updatedAt = new Date();
        model.save();
      });
  };

  self.findAll = function (Model, callback) {
    Model.find(function (err, models) {
      if (err) return error.error(err);
      trace.info("Finding all of type:", Model.modelName);
      callback(models);
    });
  };

  self.find = function (findBy, Model, callback) {
    Model.find(findBy, function (err, model) {
      if (err) return error.error(err);
      trace.info("Finding:", findBy, "on type:", Model.modelName);
      callback(model);
    });
  };

  self.remove = function (findBy, Model, callback) {
    Model.remove(findBy, function (err) {
      if (err) return error.error(err);
      trace.remove("Removing:", findBy, "on type:", Model.modelName);
      callback();
    });
  };

  setup();
}

module.exports = RsDb;
