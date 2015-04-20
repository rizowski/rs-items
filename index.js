var DB = require('./src/dbManager'),
  item = require('./src/item'),
  _ = require('lodash');
var db = new DB();

db.findAll(item.model, function (models) {
  _.each(models, function (item) {
    console.log(item.id);
  })
});
