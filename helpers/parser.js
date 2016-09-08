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

function positiveOrNegative(payload){
  if(/[-|+]/.test(payload)){
    return /\+/.test(payload) ? 1 : -1
  }
  return 1;
}

function parseLetter(payload){
  let result = 0;
  return _.reduce();
  if(/[k]/.test(payload)){
    const result = num.exec(payload);
    let number = Number(result[0]);
    result = number * valueMap.k;
  } else if(/[m]/.test(payload)){
    let number = Number(num.exec(payload)[0]);
    result = number * valueMap.m;
  } else if(/[b]/.test(payload)){
    let number = Number(num.exec(payload)[0]);
    result = number * valueMap.b;
  } else if(/[t]/.test(payload)){
    let number = Number(num.exec(payload)[0]);
    result = number * valueMap.t;
  }
  return result;
}

function parsePercent(){

}

function parseComma(){

}

const parser = {
  normalizePrice(payload){
    if(typeof payload === 'number'){
      return payload;
    }
    const multiplier = positiveOrNegative(payload);
    let result = 0;
    if(/[kmbt]/.test(payload)){
      result = parseLetter(payload);
    } else if(/,/.test(payload)){

    } else if(/%/.test(payload)){

    }
    return result * multiplier;
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
