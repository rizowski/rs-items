var rest = require("rest"),
  mongoose = require('mongoose'),
  _ = require('lodash');

function RsDb(key) {
  var self = this;
  self.settings = {};
  self.settings.dbName = "runescape";
  self.settings.baseUrl = "https://api.mongolab.com/api/1/";
  self.settings.urls = {
    collections: self.settings.baseUrl + "databases/" + self.settings.dbName + "/collections",
    items: self.settings.baseUrl + "databases/" + self.settings.dbName + "/collections/items"
  };
  _.defaults(self.settings, key);


  //encodeURI will need to be used

  self.get = function (url, settings) {
    var options = {
      method: "GET",
      contentType: "application/json"
    };

    return JSON.parse(UrlFetchApp.fetch(url.url + key, options));
  };

  self.find = function (url, queryObj) {
    var options = {
      method: "GET",
      escaping: false
    }
    var fullurl = url.url + key + "&q=" + JSON.stringify(queryObj) + "&fo=true";
    fullurl = encodeURI(fullurl);
    return JSON.parse(UrlFetchApp.fetch(fullurl, options));
  }

  self.save = function (url, payload, singleId) {
    var options = {
      method: "PUT",
      contentType: "application/json",
      payload: JSON.stringify(payload)
    };
    var additional = "";
    if (singleId) {
      var obj = JSON.stringify({
        id: singleId
      });
      additional = "&q=" + obj;
      additional = encodeURI(additional);
    }
    return JSON.parse(UrlFetchApp.fetch(url.url + key + "&u=true" + additional, options));
  };

  self.remove = function (id) {
    var options = {
      method: "DELETE",
      contentType: "application/json"
    };
    return JSON.parse(UrlFetchApp.fetch(self.settings.urls.items + "/" + id["$oid"] + key, options));
  };
}

module.exports = RsDb;
