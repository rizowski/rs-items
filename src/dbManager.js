function RsDb(settings) {
  var self = this,
    key = settings.key,
    dbName = settings.db || "runescape",
    baseUrl = settings.baseUrl || "https://api.mongolab.com/api/1/",
    urls = settings.urls || {
      collections: baseUrl + "databases/" + dbName + "/collections",
    };

  self.queryUrls = {
    collections: {
      url: urls.collections,
      type: "GET"
    },
    items: {
      url: urls.collections + "/items",
      type: "GET"
    }
  };

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
    return JSON.parse(UrlFetchApp.fetch(self.queryUrls.items.url + "/" + id["$oid"] + key, options));
  };

  self.test = function () {
    //self.remove({"$oid" : "5516f9bbe4b0ca8be58f977a"});
    //self.save(self.queryUrls.items, [{id: 2, name: "Cannon ball"}, {id: 222, name: "Gold Bar"}, {id: 33, name: "Gold ball"}]);
    self.find(self.queryUrls.items, {
      id: 222
    });
  }
}



function run_() {
  var thing = new RsDb();
  thing.test();
}
