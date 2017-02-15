import fetch from 'node-fetch';
let Promise = require('bluebird');
const itemFactory = require('./models/item');

module.exports = {
  getItem(itemId){
    return fetch(`http://services.runescape.com/m=itemdb_rs/api/catalogue/detail.json?item=${itemId}`, { headers: { Accept: 'application/json' } })
      .then((res) => res.json())
      .then((itemJson) => itemFactory.normalize(itemJson));
    // return new Promise((resolve,reject) =>{
    //   request({
    //     method: 'get',
    //     url: ,
    //     json: true
    //   }, (err, response, body) =>{
    //     if(err){
    //       return reject({
    //         statusCode: response.statusCode,
    //         itemId,
    //         result: err
    //       });
    //     }
    //     if(!body){
    //       return reject({
    //         statusCode: response.statusCode,
    //         itemId,
    //         result: 'Body not defined'
    //       });
    //     }
    //     if(body && body.item){
    //       console.log(body.item);
    //       return resolve(itemFactory.normalize(body.item));
    //     }
    //   });
    // })
    // .catch(e =>{
    //   console.error('error', itemId, e.message);
    //   throw e;
    // });
  },
  getCategory(){

  },
  getItemHistory(){

  },
  getGETime(){

  }
}
