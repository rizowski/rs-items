// import createLogger from '../../logger';
import _ from 'lodash';

// let logger = createLogger('parser');
const parser = {};
let logger = {
  warn: () =>{},
  log: () =>{},
  info: () =>{},
  error: () =>{}
};

/**
 * Removes + and % symbols from a string
 *
 * @param {string} payload
 * @returns {Number}
 */
parser.removeSymbols = function (payload) {
  if (typeof payload !== 'string') {
    logger.warn('removeSymbols', payload, 'is not a string');
    payload = payload.toString();
  }
  if (/\+/.test(payload)) {
    payload = parser.replace(payload, '+', '');
  }
  if (/\%/.test(payload)) {
    payload = parser.replace(payload, '%', '');
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
  if (typeof payload !== 'string') {
    logger.warn('replace', payload, 'is not a string');
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
  var pattern = /\d*\.?,?\d*[kmb]?/,
    dotPattern = /\d*\.?\d*/,
    comPattern = /\d*\,?\d*/,
    price = pattern.exec(payload).toString(),
    actual = null;

  if (price.match(',')) {
    actual = comPattern.exec(price).toString();
    let array = actual.split(',');
    let thousands = array[0];
    let hundreds = Number(array[1]);
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

export default parser;
