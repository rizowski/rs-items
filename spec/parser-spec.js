var parser = require('../src/parser'),
    chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    sinonChai = require('sinon-chai');

describe("parser", function () {
  describe("removeSymbols()", function () {
    var spy = {};

    before(function() {
      spy = sinon.spy(parser, "price");
    });

    it("removes +", function () {
      var result = parser.removeSymbols("+5");
      expect(result).to.equal(5);
    });

    it("removes % and multiplies number by .01", function () {
      var result = parser.removeSymbols("5%");
      expect(result).to.equal(0.05);
    });

    it("calls price", function () {
      // var spy = sinon.spy(parser, "price");
      parser.removeSymbols("+5");
      expect(spy).to.have.been.called;
    });

    it("parses % and returns without calling price", function () {
      // var spy = sinon.spy(parser, "price");
      parser.removeSymbols("5%");
      expect(spy).to.have.been.called;
    });
  });

  describe("replace()", function () {
    it("throws if first argument is not a string", function () {
      expect(parser.replace).to.throw(TypeError, "First argument is not a string");
    });

    it("removes +", function () {
      var result = parser.replace("+4", "+", "");
      expect(result).to.equal("4");
    });

    it("removes %", function () {
      var result = parser.replace("4%", "%", "");
      expect(result).to.equal("4");
    });
  });

  describe("price()", function () {
    it("parses k", function () {
      var result = parser.price("4.5k");
      expect(result).to.equal(4500);
    });

    it("parses m", function () {
      var result = parser.price("4.5m");
      expect(result).to.equal(4500000);
    });

    it("parses b", function () {
      var result = parser.price("4.5b");
      expect(result).to.equal(4500000000);
    });

    it("parses ,", function () {
      var result = parser.price("4,500");
      expect(result).to.equal(4500);
    });

    it("converts strings to numbers", function () {
      var result = parser.price("5");
      expect(result).to.equal(5);
    });
  });
});
