'use-strict';
/* global describe, before, beforeEach, after, afterEach, it*/
var proxy = require('proxyquire'),
  chai = require('chai'),
  expect = chai.expect,
  sinon = require('sinon'),
  sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe("item", function () {
  var mock, item;
  beforeEach(function () {
    mock = {
      './parser': {
        removeSymbols: function (i) {
          return i;
        }
      },
      'mongoose': {
        Schema: function (obj) {
          obj.post = function () {};
          return obj;
        },
        model: function () {
          return {};
        }
      }
    };
    item = proxy("../src/item", mock);
  });
  describe("new", function () {
    var trends = {
      positive: "positive",
      neutral: "neutral",
      negative: "negative"
    },
      comparisonObj;
    beforeEach(function () {
      comparisonObj = {
        id: 1,
        name: "name",
        description: "something",
        icon: "icon",
        type: "death",
        isMembers: true,
        buyLimit: 0,
        today: {
          price: 5,
          amountChanged: 6,
          trend: trends.neutral
        },
        days30: {
          trend: trends.neutral,
          amountChanged: 7
        },
        days90: {
          trend: trends.neutral,
          amountChanged: 8
        },
        days180: {
          trend: trends.neutral,
          amountChanged: 9
        },
        history: []
      };
    });

    describe("parseItem()", function () {
      it("sets properties for a db item", function () {
        var dbItem = {
          id: 1,
          name: "name",
          description: "something",
          icon: "icon",
          type: "death",
          isMembers: true,
          today: {
            price: 5,
            amountChanged: 6,
            trend: trends.neutral
          },
          days30: {
            trend: trends.neutral,
            amountChanged: 7
          },
          days90: {
            trend: trends.neutral,
            amountChanged: 8
          },
          days180: {
            trend: trends.neutral,
            amountChanged: 9
          },
          history: ["hello"]
        };
        comparisonObj.history = ["hello"];
        var newItem = item.parseItem(dbItem);

        expect(newItem).to.deep.equal(comparisonObj);
      });

      it("sets properties for an rs item", function () {
        var rsApiObj = {
          id: 1,
          name: "name",
          description: "something",
          icon: "icon",
          type: "death",
          members: true,
          current: {
            price: 5,
            trend: trends.neutral
          },
          today: {
            price: 6,
            trend: trends.neutral
          },
          day30: {
            change: 7,
            trend: trends.neutral
          },
          day90: {
            change: 8,
            trend: trends.neutral
          },
          day180: {
            change: 9,
            trend: trends.neutral
          }
        };
        var newItem = item.parseItem(rsApiObj);

        expect(newItem).to.deep.equal(comparisonObj);
      });
    });

    describe("getSchema()", function () {
      it("calls mongoose's Schema method", function () {
        var spy = sinon.spy(mock.mongoose, "Schema");
        item.getSchema();
        expect(spy).to.have.been.called;
      });
    });
  });
});
