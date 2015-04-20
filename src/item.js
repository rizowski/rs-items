var parser = require('./parser'),
  mongoose = require('mongoose');

var itemObj = {};

itemObj.getSchema = function () {
  return mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    icon: String,
    type: String,
    isMembers: Boolean,
    buyLimit: Number,

    currentTrend: String,
    todaysTrend: String,
    days30Trend: String,
    days90Trend: String,
    days180Trend: String,
    currentPrice: Number,
    todaysChange: Number,
    days30Change: Number,
    days90Change: Number,
    days180Change: Number
  });
};

itemObj.parseItem = function (item) {
  var prices = item.prices;
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    icon: item.icon,
    type: item.type,

    isMembers: item.members || item.isMembers,
    buyLimit: item.buyLimit || 0,

    currentTrend: prices ? prices.current.trend : item.currentTrend,
    todaysTrend: prices ? prices.today.trend : item.todaysTrend,
    days30Trend: prices ? prices.days30.trend : item.days30Trend,
    days90Trend: prices ? prices.days90.trend : item.days90Trend,
    days180Trend: prices ? prices.days180.trend : item.days180Trend,

    currentPrice: prices ? parser.removeSymbols(prices.current.price) : item.currentPrice,
    todaysChange: prices ? parser.removeSymbols(prices.today.price) : item.todaysChange,
    days30Change: prices ? parser.removeSymbols(prices.days30.change) : item.days30Change,
    days90Change: prices ? parser.removeSymbols(prices.days90.change) : item.days90Change,
    days180Change: prices ? parser.removeSymbols(prices.days180.change) : item.days180Change
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
