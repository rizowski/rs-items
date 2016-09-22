'use strict';
const _ = require('lodash');
const D = require('decimal.js');

const letterMap = {
  k: new D('1000'),
  m: new D('1000000'),
  b: new D('1000000000'),
  t: new D('1000000000000')
};

const zeroCounts = {
  k: 3,
  m: 6,
  b: 9,
  t: 12
};

const num = /[-]?\d+([.]?\d?\d?)?/;
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
  const polarity = isNegative ? new D('-1') : new D('1');
  const letter = hasLetters && letters.exec(payload)[0];

  let split = [];
  let multiplier = 1;
  let parsed = null;

  if(hasComma && !hasDecimal){
    split = payload.split(',');
  } else if(!hasComma && hasDecimal){
    split = payload.split('.');
  }

  if(isPercentage){
    const percent = new D('0.01');
    let result = num.exec(payload);
    let percentage = new D(result[0]);
    parsed = percentage.mul(percent).toNumber();
  } else {
    if(hasComma && hasLetters && !hasDecimal){
      // is thousands 33,000k
      let thousands = new D(split[0]).mul(1000);
      let numberWOLetters = _.without(split[1].split(''), 'k', 'm', 'b', 't').join('');
      let hundreds = new D(numberWOLetters);
      parsed = thousands.add(hundreds).toNumber();
    } else if(hasComma && !hasLetters && !hasDecimal){
      // 4,000
      let thousands = new D(split[0]).mul(1000);
      let hundreds = new D(split[1]);
      parsed = thousands.add(hundreds).toNumber();
    } else if(!hasComma && hasLetters && !hasDecimal){
      // large number 34b
      parsed = multiLetter(payload);
    } else if(!hasComma && hasLetters && hasDecimal){
      let result = num.exec(payload)[0];
      let deci = new D(result);
      parsed = deci.mul(letterMap[letter]).toNumber();
    } else if (!hasComma && !hasLetters && !hasDecimal){
      parsed = new D(payload.split('+').join('')).toNumber();
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
    letter,
    hasZeros,
    split
  }
}

const parser = {
  normalizePrice(payload){
    const result = interpolate(payload);
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
