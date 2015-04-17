var parser = require('./parser'),
  mongoose = require('mongoose');

function Item(obj) {
  var self = this;

  self.update = function (item) {
    var prices = item.prices;

    self.id = item.id;
    self.name = item.name;
    self.description = item.description;
    self.icon = item.icon;
    self.type = item.type;

    self.isMembers = item.members || item.isMembers;
    self.buyLimit = item.buyLimit || 0;

    self.currentTrend = prices ? prices.current.trend : item.currentTrend;
    self.todaysTrend = prices ? prices.today.trend : item.todaysTrend;
    self.days30Trend = prices ? prices.days30.trend : item.days30Trend;
    self.days90Trend = prices ? prices.days90.trend : item.days90Trend;
    self.days180Trend = prices ? prices.days180.trend : item.days180Trend;

    self.currentPrice = prices ? parser.removeSymbols(prices.current.price) : item.currentPrice;
    self.todaysChange = prices ? parser.removeSymbols(prices.today.price) : item.todaysChange;
    self.days30Change = prices ? parser.removeSymbols(prices.days30.change) : item.days30Change;
    self.days90Change = prices ? parser.removeSymbols(prices.days90.change) : item.days90Change;
    self.days180Change = prices ? parser.removeSymbols(prices.days180.change) : item.days180Change;
    return self;
  }

  self.getSchema = function () {
    return mongoose.Schema({
      id: self.id,
      name: self.name,
      description: self.description,
      icon: self.icon,
      type: self.type,
      isMembers: self.isMembers,
      buyLimit: self.buyLimit,

      currentTrend: self.currentTrend,
      todaysTrend: self.todaysTrend,
      days30Trend: self.days30Trend,
      days90Trend: self.days90Trend,
      days180Trend: self.days180Trend,
      currentPrice: self.currentPrice,
      todaysChange: self.todaysChange,
      days30Change: self.days30Change,
      days90Change: self.days90Change,
      days180Change: self.days180Change
    });
  }

  self.update(obj);
}

module.exports = Item;
