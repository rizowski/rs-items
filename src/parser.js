'use-strict';
var parser = {},
  logger = require('./log-manager')('parser');

/**
 * Removes + and % symbols from a string
 *
 * @param {string} payload
 * @returns {Number}
 */
parser.removeSymbols = function (payload) {
  if (typeof payload !== "string") {
    payload = payload.toString();
  }
  if (payload.contains("+")) {
    payload = parser.replace(payload, "+", "");
  }
  if (payload.contains("%")) {
    payload = parser.replace(payload, "%", "");
    return payload * 0.01;
  }
  return parser.price(payload);
};

/**
 * Removes any symbol and replaces it with what ever you want
 *
 * @param {string} payload
 * @param {string} symbol
 * @param {string} replace
 * @returns {string} returns the new string with replaced values
 */

parser.replace = function (payload, symbol, replace) {
  if (typeof payload !== "string") {
    payload = payload.toString();
  };
  return payload.replace(symbol, replace);
};

/**
 * Takes in a price and adds extra zeros or turns the string into a number
 * Input that it can parse: $305 $5,000 2.5k 3.2m 1.3b
 * 
 * @param {string} payload
 * @returns {Number} Returns the formatted number
 */
parser.price = function (payload) {
  var pattern = new RegExp(/\d*\.?,?\d*[kmb]?/),
    dotPattern = new RegExp(/\d*\.?\d*/),
    comPattern = new RegExp(/\d*\,?\d*/),
    price = pattern.exec(payload).toString(),
    actual = null;

  if (price.match(',')) {
    actual = comPattern.exec(price).toString();
    var array = actual.split(','),
      thousands = array[0],
      hundreds = Number(array[1]);
    thousands = thousands * 1000;
    actual = thousands + hundreds;
  } else if (price.match('k')) {
    actual = dotPattern.exec(price);
    actual = actual * 1000;
  } else if (price.match('m')) {
    actual = dotPattern.exec(price);
    actual = actual * 1000000;
  } else if (price.match('b')) {
    actual = dotPattern.exec(price);
    actual = actual * 1000000000;
  } else {
    actual = Number(price);
  }
  return actual;
};

String.prototype.contains = String.prototype.contains || function (item, caseSensitive) {
  if (caseSensitive)
    return (this.indexOf(item) > -1);
  return (this.toUpperCase().indexOf(item.toUpperCase()) > -1);
};

module.exports = parser;
