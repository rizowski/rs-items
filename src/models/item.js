'use strict';
const _ = require('lodash');
const parser = require('../parser');

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
