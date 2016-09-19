'use strict';
const _ = require('lodash');
const d = require('decimal');

const letterMap = {
  k: d('1000'),
  m: d('1000000'),
  b: d('1000000000'),
  t: d('1000000000000')
};

const zeroCounts = {
  k: 3,
  m: 6,
  b: 9,
  t: 12
};

const num = /\d+([.]?\d?\d?)?/;
const letters = /[kmbt]/;
const comma = /[,]/;
const zero = /[0]/;
const decimal = /[.]/;

function multiLetter(string){
  const letter = letters.exec(string)[0];
  const number = num.exec(string)[0];
  return letterMap[letter].mul(number).toNumber();
}

function interpolate(payload){
  if(typeof payload === 'number'){
    return { parsed: payload };
  }
  payload = payload.split(' ').join('');
  const isNegative = /[-]/.test(payload);
  const hasComma = comma.test(payload);
  const hasDecimal = decimal.test(payload);
  const isPercentage = /[%]/.test(payload) && !hasComma;
  const hasLetters = letters.test(payload);
  const hasZeros = zero.test(payload);
  const polarity = isNegative ? d('-1') : d('1');

  let split = [];
  let multiplier = 1;
  let letter;
  let parsed = null;

  if(hasComma && !hasDecimal){
    split = payload.split(',');
  } else if(!hasComma && hasDecimal){
    split = payload.split('.');
  }

  if(hasLetters){
    let result = letters.exec(payload);
    letter = result[0];
  }

  if(isPercentage){
    const percent = d('0.01');
    let result = num.exec(payload);
    let percentage = d(result[0]);
    parsed = percentage.mul(percent).mul(polarity).toNumber();
  } else {
    if(hasComma && hasLetters && !hasDecimal){
      // is thousands 33,000k
      let thousands = d(split[0]).mul(1000);
      let numberWOLetters = _.without(split[1].split(''), 'k', 'm', 'b', 't').join('');
      let hundreds = d(numberWOLetters);
      parsed = thousands.add(hundreds).toNumber();
    } else if(hasComma && !hasLetters && !hasDecimal){
      // 4,000
      let thousands = d(split[0]).mul(1000);
      let hundreds = d(split[1]);
      parsed = thousands.add(hundreds).toNumber();
    } else if(!hasComma && hasLetters && !hasDecimal){
      // large number 34b
      parsed = multiLetter(payload);
    } else if (!hasComma && !hasLetters && !hasDecimal){
      parsed = d(payload).toNumber();
    } else {
      throw new Error('edgeCase not found');
    }
  }

  return {
    raw: payload,
    parsed,
    isNegative,
    isPercentage,
    hasComma,
    hasDecimal,
    hasLetters,
    hasZeros,
    split
  }
}

const parser = {
  normalizePrice(payload){
    const result = interpolate(payload);
    console.log(result);
    return result.parsed;
  },
  removeSymbols(string) {
    let payload = '';
    if(_.includes(string, '+')) {
      payload = string.replace('+', '').trim();
    }
    if (_.includes(string, '%')) {
      payload = string.replace('%', '');
      return payload * .01;
    }
    return payload;
  }
};

module.exports = parser;
