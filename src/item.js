'use-strict';
var parser = require('./parser'),
  mongoose = require('mongoose');

var itemObj = {};

itemObj.getSchema = function () {
  return mongoose.Schema({
    id: Number,
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    name: String,
    description: String,
    icon: String,
    type: String,
    isMembers: Boolean,
    buyLimit: Number,

    today: {
      trend: String,
      amountChanged: Number,
      price: Number
    },
    days30: {
      trend: String,
      amountChanged: Number
    },
    days90: {
      trend: String,
      amountChanged: Number
    },
    days180: {
      trend: String,
      amountChanged: Number
    },

    history: Array
  });
};

itemObj.parseItem = function (item) {
  var prices = item.prices,
    rsItem = !!prices;
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    icon: item.icon,
    type: item.type,

    isMembers: item.members || item.isMembers,
    buyLimit: item.buyLimit || 0,

    today: {
      trend: rsItem ? prices.today.trend : item.today.trend,
      amountChanged: rsItem ? parser.removeSymbols(prices.today.price) : item.today.amountChanged,
      price: rsItem ? parser.removeSymbols(prices.current.price) : item.today.price
    },
    days30: {
      trend: rsItem ? prices.days30.trend : item.days30.trend,
      amountChanged: rsItem ? parser.removeSymbols(prices.days30.change) : item.days30.amountChanged
    },
    days90: {
      trend: rsItem ? prices.days90.trend : item.days90.trend,
      amountChanged: rsItem ? parser.removeSymbols(prices.days90.change) : item.days90.amountChanged
    },
    days180: {
      trend: rsItem ? prices.days180.trend : item.days180.trend,
      amountChanged: rsItem ? parser.removeSymbols(prices.days180.change) : item.days180.amountChanged
    },

    history: !!item.history ? item.history : []
  };
};

itemObj.model = function () {
  var itemSchema = itemObj.getSchema();
  return mongoose.model('Item', itemSchema);
}();

itemObj.createItem = function (item) {
  var parsedItem = itemObj.parseItem(item);
  var newItem = new itemObj.model(parsedItem);
  return newItem;
}

module.exports = itemObj;
