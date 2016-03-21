import parser from '../../server/parser';
import { expect } from 'chai';
import sinon from 'sinon';

describe('parser', function () {
  describe('removeSymbols()', function () {
    it('removes +', function () {
      var result = parser.removeSymbols('+5');
      expect(result).to.equal(5);
    });

    it('removes % and multiplies number by .01', function () {
      var result = parser.removeSymbols('5%');
      expect(result).to.equal(0.05);
    });
  });

  describe('replace()', function () {
    it('removes +', function () {
      var result = parser.replace('+4', '+', '');
      expect(result).to.equal('4');
    });

    it('removes %', function () {
      var result = parser.replace('4%', '%', '');
      expect(result).to.equal('4');
    });
  });

  describe('price()', function () {
    it('parses k', function () {
      var result = parser.price('4.5k');
      expect(result).to.equal(4500);
    });

    it('parses m', function () {
      var result = parser.price('4.5m');
      expect(result).to.equal(4500000);
    });

    it('parses b', function () {
      var result = parser.price('4.5b');
      expect(result).to.equal(4500000000);
    });

    it('parses ,', function () {
      var result = parser.price('4,500');
      expect(result).to.equal(4500);
    });

    it('converts strings to numbers', function () {
      var result = parser.price('5');
      expect(result).to.equal(5);
    });
  });
});
