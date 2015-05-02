/// <reference path="../typings/node/mongoose.d.ts"/>
'use-strict';
var mongoose = require('mongoose'),
  _ = require('lodash'),
  settings = require('../config'),
  log = require('./log-manager')('dbManager');

function RsDb() {
  if (!settings.db.server)
    throw new Error("Db server is not specified in config.");

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
      log.info("Connected to", settings.db.server, settings.db.port);
    });
  };

  /**
   * Saves a model to the Model construct
   * 
   * @param {Model} Model - Mongoose Model
   * @param {Object} model - Instantiated model document
   * @returns {undefined}
   */
  self.save = function (Model, model) {
    delete model._id;
    model.updatedAt = new Date();
    Model.where({ id: model.id })
      .setOptions({ upsert: true })
      .update(model, function (err, savedModel) {
      if (err) return log.error(err);
    });
  };

  self.findAll = function (Model, callback) {
    Model.find(function (err, models) {
      if (err) return log.error(err);
      log.info("Finding all of type:", Model.modelName);
      callback(models);
    });
  };

  self.find = function (findBy, Model, callback) {
    Model.find(findBy, function (err, model) {
      if (err) return log.error(err);
      log.info("Finding:", findBy, "on type:", Model.modelName);
      callback(model);
    });
  };

  self.remove = function (findBy, Model, callback) {
    Model.remove(findBy, function (err) {
      if (err) return log.error(err);
      log.remove("Removing:", findBy, "on type:", Model.modelName);
      callback();
    });
  };

  setup();
}

module.exports = RsDb;
