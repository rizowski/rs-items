'use-strict';
var parser = require('./parser'),
  mongoose = require('mongoose'),
  log = require('./log-manager')('item');

var itemObj = {};

/**
 * Gets the Item Schema for mongoose
 *
 * @returns ItemSchema
 */
function getSchema() {
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
}

itemObj.getSchema = getSchema;

/**
 * Parses either a RS API Item or a local DB Item
 *
 * @param {Object} item
 * @returns {Object} parsedItem
 */
function parse(item) {
  var isRsItem = !!item.current;
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
      amountChanged: isRsItem ? item.today.price : item.today.amountChanged,
      price: isRsItem ? item.current.price : item.today.price
    },
    days30: {
      trend: isRsItem ? item.day30.trend : item.days30.trend,
      amountChanged: isRsItem ? parser.removeSymbols(item.day30.change) : item.days30.amountChanged
    },
    days90: {
      trend: isRsItem ? item.day90.trend : item.days90.trend,
      amountChanged: isRsItem ? parser.removeSymbols(item.day90.change) : item.days90.amountChanged
    },
    days180: {
      trend: isRsItem ? item.day180.trend : item.days180.trend,
      amountChanged: isRsItem ? parser.removeSymbols(item.day180.change) : item.days180.amountChanged
    },

    history: !!item.history ? item.history : []
  };
}

itemObj.parseItem = parse;

/**
 * Returns the Mongoose Model object for Item
 *
 * @returns {Object} Mongoose Model Object
 */
function model() {
  var itemSchema = itemObj.getSchema();
  setEventHooks(itemSchema);
  return mongoose.model('Item', itemSchema);
}

itemObj.model = model();

/**
 * Creates an item object
 *
 * @param {string} item - Rs API Object or Db Item
 * @returns {Object} Mongoose Item object
 */
function create(item) {
  var parsedItem = itemObj.parseItem(item);
  var newItem = new itemObj.model(parsedItem);
  return newItem.toObject();
}

itemObj.createItem = create;

//Private
function setEventHooks(schema) {
  schema.post('update', function () {
    log.info("Item updated to db");
  });

  schema.post('save', function (doc) {
    log.info(doc.id, doc.name, 'Saved to the db');
  });

  schema.post('remove', function (doc) {
    log.info(doc.id, 'Removed from the db');
  });

  schema.post('validate', function (doc) {
    log.info(doc._id, "has been validated (but not saved yet)");
  });
}

module.exports = itemObj;
