'use strict';
const http = require('http');
const request = require('request');
const Promise = require('bluebird');
const _ = require('lodash');

const parser = require('./helpers/parser');
const query = require('./helpers/query');

const funcs = {
  getItemData(params, ctx, cb){
    console.log(params);
    return query.getItem(params.id)
      .then((data) => cb(null, data))
      .catch(e => cb(e));
  }
};

module.exports = funcs;
