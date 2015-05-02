/// <reference path="../typings/node/mongoose.d.ts"/>
'use-strict';
var mongoose = require('mongoose'),
  _ = require('lodash'),
  settings = require('../config'),
  log = require('./log-manager')('dbManager');

function RsDb() {
  if (!settings.db.server){
    throw new Error("Db server is not specified in config.");
  }
  if (!settings.db.port){
    throw new Error("Db server is not specified in config.");
  }
  if(!settings.db.credentials.username){
    throw new Error("username is not specified in config.");
  }
  if(!settings.db.credentials.password){
    throw new Error("password is not specified in config.");
  }

  var self = this,
    db = mongoose.connection,
    setup;

  setup = function () {
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
   */
  function save(Model, model) {
    delete model._id;
    model.updatedAt = new Date();
    Model.where({ id: model.id })
      .setOptions({ upsert: true })
      .update(model, function (err, savedModel) {
      if (err) return log.error(err);
    });
  }

  self.save = save;

  /**
   * Finds all models for a mongoose model
   *
   * @param {Model} Model - Mongoose Model
   * @param {Function} callback
   */
  function findAll(Model, callback) {
    Model.find(function (err, models) {
      if (err) return log.error(err);
      log.info("Finding all of type:", Model.modelName);
      callback(models);
    });
  }
   
  self.findAll = findAll;

  /**
   * Finds a document
   *
   * @param {Object} findBy - Object to search by property {name: 'something'}
   * @param {Object} Model - Mongoose Model
   * @param {Function} callback
   */
  function find(findBy, Model, callback) {
    Model.find(findBy, function (err, model) {
      if (err) return log.error(err);
      log.info("Finding:", findBy, "on type:", Model.modelName);
      callback(model);
    });
  }

  self.find = find;

  /**
   * Removes a document
   *
   * @param {Object} findBy - Object to search by property {name: 'something'}
   * @param {Model} Model - Mongoose Model
   * @param {Function} callback
   */
  function remove(findBy, Model, callback) {
    Model.remove(findBy, function (err) {
      if (err) return log.error(err);
      log.remove("Removing:", findBy, "on type:", Model.modelName);
      callback();
    });
  }

  self.remove = remove;

  setup();
}

module.exports = RsDb;
