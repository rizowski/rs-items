var rest = require('rest');
var jsonExtension = ".json";
function ItemQuery() {
  
  var self = this;
  var getItemSetUrl = function(itemIds){
    return "http://us.api.rsapi.net/ge/item/" + itemIds + jsonExtension;
  };
  
  var getGraphUrl = function(){
    return "http://services.runescape.com/m=itemdb_rs/api/graph/";
  };
  
  self.getJSONObject = function(response){
    return JSON.parse(response);
  };

  self.query = function(items, options){
	  var itemSet = items.join(",");
	  self.getJSONObject(self.getResponse(getItemSetUrl(itemSet)));
  };						

  self.getRsItemGraphData = function(itemId){
    var item = itemId + jsonExtension,
    	  response = self.getResponse(getGraphUrl + item),
   	   	responseData = self.getJSONObject(response),
      	daily = responseData.daily,
    	  graphData = [],
    	  dailyKeys = Object.keys(daily);
		
	  for(var i = 0; i < dailyKeys.length; i++){
	    var key = dailyKeys[i];
    	graphData.push(
        {
          date: new Date(parseInt(key)).format('MM/dd/yyyy hh:mm'), 
          price: daily[key]
        });
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
	    } catch(e) {
		    if(!httpResponse) throw "Null Response";
	    }
    return httpResponse;
	};
  
  
  Date.prototype.format = function(format) //author: meizz
  {
    var o = {
      "M+" : this.getMonth()+1, //month
      "d+" : this.getDate(),    //day
      "h+" : this.getHours(),   //hour
      "m+" : this.getMinutes(), //minute
      "s+" : this.getSeconds(), //second
      "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
      "S" : this.getMilliseconds() //millisecond
    };

    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
      (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)if(new RegExp("("+ k +")").test(format))
      format = format.replace(RegExp.$1,
        RegExp.$1.length==1 ? o[k] :
          ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
  };
};