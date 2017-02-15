'use strict';
const http = require('http');

const parser = require('./build/parser');
const query = require('./build/query');

const funcs = {
  getItemData(params, ctx, cb){
    console.log(params);
    return query.getItem(params.id)
      .then((data) => cb(null, data))
      .catch(e => cb(e));
  }
};

module.exports = funcs;
