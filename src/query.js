var rest = require('rest');
//  log = require('log-manager')('query');

function Querier() {
  var self = this,
  rsItemUrlString = "http://services.runescape.com/m=itemdb_rs/api/catalogue/detail.json?item=",
  rsGraphUrlString = "http://services.runescape.com/m=itemdb_rs/api/graph/",
  rsApiUrlString = "http://us.api.rsapi.net/ge/item/",
  jsonExtension = ".json";

  /**
   * Gets the url for Runescapes Api
   * 
   * @param Number RS Item Id
   */
  function rsItemUrl(id){
    return rsItemUrlString + id;
  }

  self.rsItemUrl = rsItemUrl;

  /**
   * Gets the url for the RsApi.net Api
   * 
   * @param Array item Ids
   */
  function rsApiUrl(itemIds) {
    var itemSet;
    if(itemIds.join){
      itemSet = itemIds.join(',');
    } else {
      itemSet = itemIds;
    }
    return rsApiUrlString + itemSet + jsonExtension;
  }

  self.rsApiUrl = rsApiUrl;

  /**
   * Gets the graphing data from the Runescape Api
   * 
   * @param Number item Id
   */
  function graphUrl(id) {
    return rsGraphUrlString + id + jsonExtension;
  }

  self.graphUrl = graphUrl;

  /**
   * Executes the Query operation
   * 
   * @param Number Item Id
   */
  function queryItemData(id) {
    var url = self.rsItemUrl(id);
    var response = self.getResponse(url);
    return JSON.parse(response);
  }

  self.query = queryItemData;

  /**
   * Queries for the item Graph data
   * 
   * @param Number ItemId
   */
  self.queryGraphData = function (itemId) {
    var graphUrl = self.graphUrl(itemId);
    var response = self.getResponse(graphUrl),
      responseData = JSON.parse(response),
      daily = responseData.daily,
      graphData = [],
      dailyKeys = Object.keys(daily);

    for (var i = 0; i < dailyKeys.length; i++) {
      var key = dailyKeys[i];
      graphData.push({
        date: new Date(parseInt(key)).format('MM/dd/yyyy hh:mm'),
        price: daily[key]
      });
    }

    graphData.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });

    return graphData;
  };

  /**
   * Queries a given url
   * 
   * @param string Url
   */
  self.getResponse = function (url) {
    console.log(url);
//    log.info('Querying at ', url);
    return rest(url) // This may need furthur investigation to allow for advanced options
      .then(function (response) {
        console.log('response: ', response);
      });
  };
};

Date.prototype.format = function (format) //author: meizz
{
  var o = {
    "M+": this.getMonth() + 1, //month
    "d+": this.getDate(), //day
    "h+": this.getHours(), //hour
    "m+": this.getMinutes(), //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    "S": this.getMilliseconds() //millisecond
  };
  
  if(/(y+)/.test(format)){ 
    format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }

  for(var k in o){
    if(new RegExp("("+ k +")").test(format)){
      format = format.replace(RegExp.$1, RegExp.$1.length===1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
    }
  }
  return format;
};

module.exports = Querier;
