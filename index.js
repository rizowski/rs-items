'use-strict';
var DB = require('./src/dbManager'),
  item = require('./src/item'),
  _ = require('lodash');
var db = new DB();

//This class should just run the opperations of querying the objects and requesting previous history if none is provided.

db.findAll(item.model, function (models) {
  _.each(models, function (item) {
    console.log(item.id);
  });
});
