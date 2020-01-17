import fetch from 'node-fetch';
let Bluebird = require('bluebird');
const itemFactory = require('../models/item');

const requestSettings = { headers: { Accept: 'application/json' } };

module.exports = {
  getItem(itemId) {
    return fetch(`http://services.runescape.com/m=itemdb_rs/api/catalogue/detail.json?item=${itemId}`, requestSettings)
      .then((res) => {
        return res.text();
      })
      .then((result) => {
        if(!result) {
          console.log('result null?', typeof result, result)
        }
        return JSON.parse(result);
      })
      .then((json) => itemFactory.normalize(json.item));
  },
  getCategory(category, letter, page = 1) {
    return fetch(`http://services.runescape.com/m=itemdb_rs/api/catalogue/category.json?category=${category}&alpha=${letter}&page=${page}`, requestSettings)
      .then(res => res.json());
  },
  getItemHistory() {

  },
  getItemsByCategory(category, letter, page) {
    return fetch(`http://services.runescape.com/m=itemdb_rs/api/catalogue/items.json?category=${category}&alpha=${letter}&page=${page}`, requestSettings)
      .then(res => res.json());
  },
  getGETime(){

  }
}
