var parser = require('../src/parser');
describe("parser", function(){
  describe("removeSymbols()", function(){
    it("removes +", function(){
      var result = parser.removeSymbols("+5");
      expect(result).toBe(5);
    });

    it("removes % and multiplies number by .01", function(){
      var result = parser.removeSymbols("5%");
      expect(result).toBe(0.05);
    });

    it("calls price", function(){
      spyOn(parser, "price");
      parser.removeSymbols("+5");
      expect(parser.price).toHaveBeenCalled();
    });

    it("parses % and returns without calling price", function(){
      spyOn(parser, "price");
      parser.removeSymbols("5%");
      expect(parser.price).not.toHaveBeenCalled();
    });
  });

  describe("replace()", function(){
    it("throws if first argument is not a string", function(){
      expect(parser.replace).toThrowError(TypeError, "First argument is not a string");
    });

    it("removes +", function(){
      var result = parser.replace("+4", "+", "");
      expect(result).toBe("4");
    });

    it("removes %", function(){
      var result = parser.replace("4%", "%", "");
      expect(result).toBe("4");
    });
  });

  describe("price()", function(){
    it("parses k", function(){
      var result = parser.price("4.5k");
      expect(result).toBe(4500);
    });

    it("parses m", function(){
      var result = parser.price("4.5m");
      expect(result).toBe(4500000);
    });

    it("parses b", function(){
      var result = parser.price("4.5b");
      expect(result).toBe(4500000000);
    });

    it("parses ,", function(){
      var result = parser.price("4,500");
      expect(result).toBe(4500);
    });

    it("converts strings to numbers", function(){
      var result = parser.price("5");
      expect(result).toBe(5);
    });
  });
});
