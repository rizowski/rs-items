var request = require('request'),
  http = require('http'),
  log = require('./log-manager')('query');

function Querier() {
  var self = this,
    baseUrl = "services.runescape.com",
    rsItemUrlString = "http://services.runescape.com/m=itemdb_rs/api/catalogue/detail.json?item=",
    rsGraphUrlString = "http://services.runescape.com/m=itemdb_rs/api/graph/",
    rsApiUrlString = "http://us.api.rsapi.net/ge/item/",
    jsonExtension = ".json";

  var options = {
    hostname: baseUrl,
    port: 80,
    method: 'GET',
    headers: {
      'Accept': '*/*'
    }
  };

  /**
   * Gets the url for Runescapes Api
   * 
   * @param Number RS Item Id
   */
  function rsItemUrl(id) {
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
    if (itemIds.join) {
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
  function getResponse(url, callback) {
    //    options.path = url;
    log.info('Querying at ', url);
    //    setTimeout(function () {
    //      http.request(options, function (res) {
    //        console.log(res);
    //        //      var response = JSON.parse(res.toString());
    //        //      callback(null, null, response);
    //      });
    //    }, 1000);

    request(url, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        log.info("got data for ", url);
        var json;
        try {
          json = JSON.parse(body);
        } catch (error) {
          log.error(body);
        }
          
        callback(error, response, json);
      } else {
        log.error(error);
        callback(error, response);
      }
    });

  }

  self.getResponse = getResponse;
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

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1,(this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
};

module.exports = Querier;
