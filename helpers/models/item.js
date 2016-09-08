'use strict';
const _ = require('lodash');
const parser = require('../parser');
/*
array.push(rsItem.name);
array.push(rsItem.type);
array.push(rsItem.membersitem);

array.push(rsItem.prices.current.trend);
array.push(removeSymbols_(rsItem.prices.current.price));

array.push(rsItem.prices.today.trend);
array.push(removeSymbols_(rsItem.prices.today.price));

array.push(rsItem.prices.days30.trend);
array.push(removeSymbols_(rsItem.prices.days30.change));

array.push(rsItem.prices.days90.trend);
array.push(removeSymbols_(rsItem.prices.days90.change));

array.push(rsItem.prices.days180.trend);
array.push(removeSymbols_(rsItem.prices.days180.change));

array.push(rsItem.icon);

array.push("");// Consumable type
array.push(new Date());// date updated
*/



const factory = {
  normalize(item){// the result not the item returned from api
    const baseItem = _.omit(item, ['prices', 'members']);
    return _.defaultsDeep({}, {
      members: item.member === 'true',
      current: {
        price: parser.normalizePrice(item.current.price)
      },
      today: {
        price: parser.normalizePrice(item.today.price)
      },
      day30: {
        change: parser.normalizePrice(item.day30.change)
      },
      day90: {
        change: parser.normalizePrice(item.day90.change),
      },
      day180: {
        change: parser.normalizePrice(item.day180.change)
      }
    }, baseItem);
  },
  normalizeMany(items){
    return _(items)
      .map(factory.normalize)
      .value();
  }
};

module.exports = factory;
