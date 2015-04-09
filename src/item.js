var parser = require('parser');

function Item(obj){
  var self = this;

  self.update = function(item){
    self.id = item.id;
    self.name = item.name;
    self.description = item.description;
    self.icon = item.icon;
    self.type = item.type;

    self.isMembers = item.members || item.isMembers;
    self.buyLimit = item.buyLimit || 0;
    
    self.currentTrend = item.prices.current.trend || item.currentTrend;
    self.todaysTrend = item.prices.today.trend || item.todaysTrend;
    self.days30Trend = item.prices.days30.trend || item.days30Trend;
    self.days90Trend = item.prices.days90.trend || item.days90Trend;
    self.days180Trend = item.prices.days180.trend || item.days180Trend;

    self.currentPrice = parser.removeSymbols(item.prices.current.price || item.currentPrice);
    self.todaysChange = parser.removeSymbols(item.prices.today.price || item.todaysChange);
    self.days30Change = parser.removeSymbols(item.prices.days30.change || item.days30Change);
    self.days90Change = parser.removeSymbols(item.prices.days90.change || item.days90Change);
    self.days180Change = parser.removeSymbols(item.prices.days180.change || item.days180Change);
  }

  update(obj);
}

module.exports = Item;