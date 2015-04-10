var Parser = require('../src/parser');
describe("parser", function(){
  var p;

  beforeEach(function(){
    p = new Parser();
  });

  describe("removeSymbols()", function(){
    it("removes +", function(){
      var result = p.removeSymbols("+5");
      expect(result).toBe(5);
    });

    it("removes % and multiplies number by .01", function(){
      var result = p.removeSymbols("5%");
      expect(result).toBe(0.05);
    });

    it("calls price", function(){
      spyOn(p, "price");
      p.removeSymbols("+5");
      expect(p.price).toHaveBeenCalled();
    });

    it("parses % and returns without calling price", function(){
      spyOn(p, "price");
      p.removeSymbols("5%");
      expect(p.price).not.toHaveBeenCalled();
    });
  });

  describe("replace()", function(){
    it("throws if first argument is not a string", function(){
      expect(p.replace).toThrowError(TypeError, "First argument is not a string");
    });

    it("removes +", function(){
      var result = p.replace("+4", "+", "");
      expect(result).toBe("4");
    });

    it("removes %", function(){
      var result = p.replace("4%", "%", "");
      expect(result).toBe("4");
    });
  });

  describe("price()", function(){
    it("parses k", function(){
      var result = p.price("4.5k");
      expect(result).toBe(4500);
    });

    it("parses m", function(){
      var result = p.price("4.5m");
      expect(result).toBe(4500000);
    });

    it("parses b", function(){
      var result = p.price("4.5b");
      expect(result).toBe(4500000000);
    });

    it("parses ,", function(){
      var result = p.price("4,500");
      expect(result).toBe(4500);
    });

    it("converts strings to numbers", function(){
      var result = p.price("5");
      expect(result).toBe(5);
    });
  });
});
