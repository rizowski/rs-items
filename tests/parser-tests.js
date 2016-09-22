'use strict';

let parser = require('../helpers/parser');
let expect = require('chai').expect;

describe('parser tests', ()=>{
  describe('numbers', () =>{
    it('handles numbers', () =>{
      const num = 386;
      const result = parser.normalizePrice(num);
      expect(result).to.equal(386);
    });

    it('handles negative numbers', () =>{
      const num = -386;
      const result = parser.normalizePrice(num);
      expect(result).to.equal(-386);
    });

    it('handles negative numbers without spaces', () =>{
      const num = '-5';
      const result = parser.normalizePrice(num);
      expect(result).to.equal(-5);
    });

    it('handles positive numbers without spaces', () =>{
      const num = '+5';
      const result = parser.normalizePrice(num);
      expect(result).to.equal(5);
    });

    it('handles negative numbers with spaces', () =>{
      const num = '- 5';
      const result = parser.normalizePrice(num);
      expect(result).to.equal(-5);
    });

    it('handles positive numbers with spaces', () =>{
      const num = '+ 5';
      const result = parser.normalizePrice(num);
      expect(result).to.equal(5);
    });
  });

  describe('percentages', () =>{
    it('handles percentages', () =>{
      const num = '10%';
      const result = parser.normalizePrice(num);
      expect(result).to.equal(0.1);
    });

    it('handles under tenths percentages', () =>{
      const num = '-9.0%';
      const result = parser.normalizePrice(num);
      expect(result).to.equal(-0.09);
    })

    it('handles percentages with + signs', () =>{
      const num = '+20.0%';
      const result = parser.normalizePrice(num);
      expect(result).to.equal(0.2)
    });

    it('handles percentages with - signs', () =>{
      const num = '-31.0%';
      const result = parser.normalizePrice(num);
      expect(result).to.equal(-0.31);
    });

    it('handles percentages with - signs and a space', () =>{
      const num = '- 44.0%';
      const result = parser.normalizePrice(num);
      expect(result).to.equal(-0.44);
    });
  });

  describe('letters', () =>{
    it('handles k numbers', () =>{
      const num = '4k';
      const result = parser.normalizePrice(num);
      expect(result).to.equal(4000);
    });

    it('handles b numbers', () =>{
      const num = '3b';
      const result = parser.normalizePrice(num);
      expect(result).to.equal(3000000000);
    });

    it('handles m numbers', () =>{
      const num = '5m';
      const result = parser.normalizePrice(num);
      expect(result).to.equal(5000000);
    });

    it('handles t numbers', () =>{
      const num = '6t';
      const result = parser.normalizePrice(num);
      expect(result).to.equal(6000000000000);
    });

    it('handles x.yl ex) 5.8m', () =>{
      const num = '5.8m';
      const result = parser.normalizePrice(num);
      expect(result).to.equal(5800000);
    })
  });

  describe('symbols', () =>{
    it('handes numbers with commas', () =>{
      const num = '4,000';
      const result = parser.normalizePrice(num);
      expect(result).to.equal(4000);
    });

    it('handles k with comma', () =>{
      const num = '4,000k';
      const result = parser.normalizePrice(num);
      expect(result).to.equal(4000);
    });
  });
})
