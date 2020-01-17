'use strict';
const http = require('http');

const itemManager = require('./build/managers/item-manager');

function wrap(handler){
  return function lambdaWrapper(params, ctx, cb){
    return handler(params)
      .then((data) =>{
        return {
          statusCode: 200,
          data
        };
      })
      .catch(e => {
        const printDetails = process.env.DEBUG || process.env.NODE_ENV !== 'production';

        return {
          error: printDetails ? e.stack : e.message
        }
      })
      .then((data) =>{
        if(data.error){
          return cb(new Error(data.error));
        }
        cb(null, data);
      });
  }
}

const funcs = {
  getItemData: wrap((params) => itemManager.getItem(params.id)),
  getItemsData: wrap((params) => itemManager.getItems(params.ids)),
  getCategory: wrap((params) => query.getCategory(params.category, params.letter, params.page)),
  getItemsByCategory: wrap(p => query.getItemsByCategory(p.category, p.letter, p.page)),
};

module.exports = funcs;
