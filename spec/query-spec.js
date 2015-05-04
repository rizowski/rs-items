/// <reference path="../typings/mocha/mocha.d.ts"/>
'use-strict';
var proxy = require('proxyquire'),
  chai = require('chai'),
  expect = chai.expect,
  sinon = require('sinon'),
  sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe("Querier", function(){
  var mock;
  before(function(){
    mock = {
      'log-manager':{
        
      }
    };
  });

  describe('RsItemUrl()', function(){
    var query;
    beforeEach(function(){
      var Query = require('../src/query');
      query = new Query();
    });

    it('returns the correct url', function(){
      var url = query.rsItemUrl(2);
      expect(url).to.equal("http://services.runescape.com/m=itemdb_rs/api/catalogue/detail.json?item=2");
    });
  });
  
  describe('RsApiUrl()', function(){
    var query;
    beforeEach(function(){
      var Query = require('../src/query');
      query = new Query();
    });

    it('returns the correct url with one id', function(){
      var url = query.rsApiUrl(2);
      expect(url).to.equal('http://us.api.rsapi.net/ge/item/2.json');
    });
    
    it('returns the correct url with multiple ids', function(){
      var url = query.rsApiUrl([2,3]);
      expect(url).to.equal('http://us.api.rsapi.net/ge/item/2,3.json');
    });
  });
  
  describe("GraphUrl()", function(){
    var query;
    beforeEach(function(){
      var Query = require('../src/query');
      query = new Query();
    });

    it('returns the corect url', function(){
      var url = query.graphUrl(2);
      expect(url).to.equal('http://services.runescape.com/m=itemdb_rs/api/graph/2.json');
    });
  });

  describe('getResponse()', function(){
    
  });

  describe("queryItemData()", function(){
    
  });
  
  describe("queryGraphData()", function(){
    
  });
});