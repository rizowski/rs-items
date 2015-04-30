'use-strict';
var parser = require('./parser'),
  mongoose = require('mongoose'),
  log = require('./log-manager'),
  trace = log.getTraceLogger("item"),
  error = log.getErrorLogger("item");

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
  var rsItem = !!item.current;
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    icon: item.icon,
    type: item.type,

    isMembers: item.members || item.isMembers,
    buyLimit: item.buyLimit || 0,

    today: {
      trend: item.today.trend,
      amountChanged: rsItem ? item.today.price : item.today.amountChanged,
      price: rsItem ? item.current.price : item.today.price
    },
    days30: {
      trend: rsItem ? item.day30.trend : item.days30.trend,
      amountChanged: rsItem ? parser.removeSymbols(item.day30.change) : item.days30.amountChanged
    },
    days90: {
      trend: rsItem ? item.day90.trend : item.days90.trend,
      amountChanged: rsItem ? parser.removeSymbols(item.day90.change) : item.days90.amountChanged
    },
    days180: {
      trend: rsItem ? item.day180.trend : item.days180.trend,
      amountChanged: rsItem ? parser.removeSymbols(item.day180.change) : item.days180.amountChanged
    },

    history: !!item.history ? item.history : []
  };
};

itemObj.model = function () {
  var itemSchema = itemObj.getSchema();
  setEventHooks(itemSchema);
  return mongoose.model('Item', itemSchema);
} ();

itemObj.createItem = function (item) {
  var parsedItem = itemObj.parseItem(item);
  var newItem = new itemObj.model(parsedItem);
  return newItem;
};

//Private
function setEventHooks(schema) {
  schema.post('update', function () {
    trace.info("Item updated to db");
  });

  schema.post('save', function (doc) {
    trace.info(doc.id, doc.name, 'Saved to the db');
  });

  schema.post('remove', function (doc) {
    trace.info(doc.id, 'Removed from the db');
  });

  schema.post('validate', function (doc) {
    console.log('%s has been validated (but not saved yet)', doc._id);
  });
}

module.exports = itemObj;
