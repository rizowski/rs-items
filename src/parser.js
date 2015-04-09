function Parser(){
  var self = this;
 
  /**
   * Removes + and % symbols from a string
   * @param {string} payload
   * @return {number}
   */
  self.removeSymbols = function(payload) {
    if(typeof payload !== "string") throw new TypeError("Argument is not a string");
    if (payload.contains("+")) {
        payload = self.replace(payload, "+", "");
    }
    if (payload.contains("%")) {
        payload = self.replace(payload, "%", "");
        return payload * .01;
    }
    return self.price(payload);
  };
  
  /**
   * Removes any symbol and replaces it with what ever you want
   *
   * @param {string} payload
   * @param {string} symbol
   * @param {string} replace
   * @return {string} returns the new string with replaced values
   */
  self.replace = function(payload, symbol, replace) {
    if(typeof payload !== "string") throw new TypeError("First argument is not a string");
    return payload.replace(symbol, replace);
  };
  
  /**
   * Takes in a price and adds extra zeros or turns the string into a number
   * Input that it can parse: $305 $5,000 2.5k 3.2m 1.3b
   * @param {string} payload
   * @return {number} Returns the formatted number
   */
  self.price = function(payload) {
    var pattern = new RegExp(/\d*\.?,?\d*[kmb]?/),
        dotPattern = new RegExp(/\d*\.?\d*/),
        comPattern = new RegExp(/\d*\,?\d*/),
        price = new String(pattern.exec(payload)),
        actual = null;

    if (price.match(",")) {
      actual = new String(comPattern.exec(price));
      var array = actual.split(","),
          thousands = array[0],
          hundreds = array[1] * 1;
      thousands = thousands * 1000;  
      actual = thousands + hundreds;
    } else if (price.match("k")) {
      actual = dotPattern.exec(price);
      actual = actual * 1000;
    } else if (price.match("m")) {
      actual = dotPattern.exec(price);
      actual = actual * 1000000;
    } else if (price.match("b")) {
      actual = dotPattern.exec(price);
      actual = actual * 1000000000;
    } else {
      actual = price * 1;
    }
    return actual;
  };

}

String.prototype.contains = String.prototype.contains || function (item, caseSensitive) {
  if(caseSensitive)
    return (this.indexOf(item) > -1);
  return (this.toUpperCase().indexOf(item.toUpperCase()) > -1);
};

module.exports = Parser;