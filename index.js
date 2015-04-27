'use-strict';
var DB = require('./src/dbManager'),
  item = require('./src/item'),
  _ = require('lodash');
var db = new DB();

//This class should just run the opperations of querying the objects and requesting previous history if none is provided.

db.findAll(item.model, function (models) {
  _.each(models, function (item) {
    console.log(item.id, item.name);
  });
});


//var dbItem = item.createItem({
//  "icon": "http://services.runescape.com/m=itemdb_rs/4800_obj_sprite.gif?id=4798",
//  "icon_large": "http://services.runescape.com/m=itemdb_rs/4800_obj_big.gif?id=4798",
//  "id": 4798,
//  "type": "Ammo",
//  "typeIcon": "http://www.runescape.com/img/categories/Ammo",
//  "name": "Adamant brutt",
//  "description": "Blunt adamantite arrow...ouch",
//  "current": {
//    "trend": "neutral",
//    "price": 241
//  },
//  "today": {
//    "trend": "neutral",
//    "price": 0
//  },
//  "members": "true",
//  "day30": {
//    "trend": "positive",
//    "change": "+1.0%"
//  },
//  "day90": {
//    "trend": "negative",
//    "change": "-0.0%"
//  },
//  "day180": {
//    "trend": "positive",
//    "change": "+1.0%"
//  }
//});
//console.log(dbItem.toString());
//delete dbItem["_id"];
//db.save(item.model, dbItem);
