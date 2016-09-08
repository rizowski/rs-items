'use strict';
const _ = require('lodash');
const d = require('decimal');

const valueMap = {
  k: 1000,
  m: 1000000,
  b: 1000000000,
  t: 1000000000000
};

const num = /\d+(\.?\d?\d?)?/;
const shorts = /[kmbt]/;

function isPercentage(payload){
  return /[%]/.test(payload);
}

function getMultiplier(payload){
  console.log('#multiplier', payload)
  let isNegative = /[-]/.test(payload);
  if(isPercentage(payload)){
    console.log('percentage');
    return isNegative ? d('-0.01') : d('0.01');
  }
  const regexResult = shorts.exec(payload);
  let wholeVal = isNegative ? d('-1') : d('1');
  if(regexResult){
    console.log('found letter');
    const lookUpVal = regexResult[0];
    const multiplier = valueMap[lookUpVal];
    return multiplier ? d.mul(multiplier, wholeVal) : wholeVal;
  }
  return wholeVal;
}

function parsePrice(payload){
  console.log('#parsePrice', payload);
  if(typeof payload === 'number'){
    return payload;
  }
  payload = payload.split(' ').join('').split(',').join('');
  const multiplier = getMultiplier(payload);
  console.log('multiplier result', multiplier.toNumber());
  const numberResult = num.exec(payload);
  if(!numberResult){
    throw new Error('No price found!!');
  }
  console.log('regexResult', numberResult[0]);
  const number = d(numberResult[0]);
  let result = number.mul(multiplier).toNumber();
  console.log('number', number.toNumber(), multiplier.toNumber(), result);
  return result;
}

const parser = {
  normalizePrice(payload){
    return parsePrice(payload);
    // if(typeof payload === 'number'){
    //   return payload;
    // }
    // const multiplier = positiveOrNegative(payload);
    // let result = 0;
    // if(/[kmbt]/.test(payload)){
    //   result = parseLetter(payload);
    // } else if(/,/.test(payload)){
    //
    // } else if(/%/.test(payload)){
    //
    // }
    // return result * multiplier;
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
