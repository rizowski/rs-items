'use strict';
let http = require('http');
let request = require('request');
let Promise = require('bluebird');
let _ = require('lodash');

let parser = require('./helpers/parser');
let query = require('./helpers/query');

/*
[
  {
    "itemId": "2",
    "result": {
      "item": {
        "icon": "http://services.runescape.com/m=itemdb_rs/5304_obj_sprite.gif?id=2",
        "icon_large": "http://services.runescape.com/m=itemdb_rs/5304_obj_big.gif?id=2",
        "id": 2,
        "type": "Ammo",
        "typeIcon": "http://www.runescape.com/img/categories/Ammo",
        "name": "Cannonball",
        "description": "Ammo for the Dwarf Cannon.",
        "current": {
          "trend": "neutral",
          "price": 496
        },
        "today": {
          "trend": "negative",
          "price": "- 5"
        },
        "members": "true",
        "day30": {
          "trend": "negative",
          "change": "-8.0%"
        },
        "day90": {
          "trend": "positive",
          "change": "+3.0%"
        },
        "day180": {
          "trend": "positive",
          "change": "+13.0%"
        }
      }
    }
  },
  {
    "itemId": "440",
    "result": {
      "item": {
        "icon": "http://services.runescape.com/m=itemdb_rs/5304_obj_sprite.gif?id=440",
        "icon_large": "http://services.runescape.com/m=itemdb_rs/5304_obj_big.gif?id=440",
        "id": 440,
        "type": "Mining and Smithing",
        "typeIcon": "http://www.runescape.com/img/categories/Mining and Smithing",
        "name": "Iron ore",
        "description": "Can be smelted into an iron bar. Used in Smithing (15).",
        "current": {
          "trend": "neutral",
          "price": 389
        },
        "today": {
          "trend": "negative",
          "price": "- 5"
        },
        "members": "false",
        "day30": {
          "trend": "positive",
          "change": "+17.0%"
        },
        "day90": {
          "trend": "positive",
          "change": "+10.0%"
        },
        "day180": {
          "trend": "positive",
          "change": "+12.0%"
        }
      }
    }
  }
]
*/

let funcs = {
  getItemsData: function(items, context, cb){
    console.log('starting request ' + items);
    return Promise.map(items, itemId => query.getItem(itemId))
      .then((data) => cb(null, data))
      .catch(e => cb(e));
  },
  getItemData(itemId, ctx, cb){
    console.log(itemId, ctx);
    return query.getItem(itemId)
      .then((data) => cb(null, data))
      .catch(e => cb(e));
  }
}
funcs.getItemsData(['2'], null, console.log)

module.exports = funcs;
