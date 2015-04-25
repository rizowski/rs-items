var rest = require('rest');
var jsonExtension = ".json";

function ItemQuery() {
	var self = this;

	self.getItemSetUrl = function(itemIds){
    	return "http://us.api.rsapi.net/ge/item/" + itemIds + jsonExtension;
  	};

	self.query = function(items, options){
		var itemSet = items.length > 1 ? items.join(",") : items;
		self.getJSONObject(getResponse(getItemSetUrl(itemSet)));
	};						

	self.getRsItemGraphData = function(itemId){
    	var graphUrl = "http://services.runescape.com/m=itemdb_rs/api/graph/",
     		item = itemId + jsonExtension,
    		response = self.getResponse(graphUrl + item),
   	   		responseData = self.getJSONObject(response),
      		daily = responseData.daily,
     		graphData = [],
    		dailyKeys = Object.keys(daily);

	    for(var i = 0; i < dailyKeys.length; i++){
	    	var key = dailyKeys[i];
    	 	graphData.push({date: new Date(key*1).format('MM/dd/yyyy hh:mm'), price: daily[key]});
  	 	 }
    	graphData.sort(function(a, b){
   	   		return new Date(a.date) - new Date(b.date);
    	});
    	return graphData;
	};

	self.getResponse = function(url, options){
		var httpResponse = null;
		try{
			rest(url).then(function (response){
				console.log('response: ', response);
				httpResponse = response;
			});
		} catch(error) {
			if(!httpResponse) throw "Null Response";
		};
		return httpResponse;
	};

	self.getJSONObject = function(response){
		return JSON.parse(response);
	};
};