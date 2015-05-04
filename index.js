'use-strict';
var DB = require('./src/db-manager'),
  Query = require('./src/query'),
  item = require('./src/item'),
  _ = require('lodash');

var db = new DB();
var query = new Query();

//This class should just run the opperations of querying the objects and requesting previous history if none is provided.

//db.findAll(item.model, function (models) {
//  _.each(models, function (item) {
//    console.log(item.id, item.name);
//  });
//});

//var items = [2361, 4798, 449, 556, 9075, 565, 1923, 4456, 1921, 1925, 1927, 1783, 1929, 2, 562, 434, 267, 2481, 257, 3000, 453, 564, 6693, 11848, 560, 4716, 557, 1931, 554, 2357, 444, 217, 2485, 207, 3051, 440, 1935, 1993, 563, 558, 2359, 447, 561, 1933, 7936, 15270, 383, 2363, 1303, 1093, 451, 385, 2355, 442, 1761, 2353, 361, 4753, 229, 227, 555, 1048, 1619, 1603, 1623, 1607, 1605, 1621, 1601, 1617, 1609, 1625, 6571, 6573, 1613, 1611, 1631, 1615, 1627, 1629, 559, 1937, 1436, 532, 436, 438, 2349, 1079, 221, 29492, 52, 314, 53, 9192, 1511, 1519, 6211, 6333, 3438, 3440, 1521, 3444, 1517, 6213, 6332, 3448, 1513, 12583, 12581, 29635, 29556, 10808, 10810, 2862, 5303, 5302, 5295, 5300, 5297, 209, 259, 11866];
//var requestcount = 0;
//var timeouts = {};
//_.each(items, function (id, index) {
//    timeouts[id] = setTimeout(function () {
//      var url = query.rsItemUrl(id);
//      query.getResponse(url, function (err, response, body) {
//        if (body) {
//          var newItem = item.parse(body);
//          //    var historyUrl = query.graphUrl(newItem.id);
//          //    query.getResponse(historyUrl, function(error, rsp, b){
//          //      
//          //    });
//          db.save(item.model, newItem);
//        }
//      });
//    }, 750*index);
//});

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
