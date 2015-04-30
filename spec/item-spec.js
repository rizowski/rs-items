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
      comparisonObj,
      rsApiObj;
    beforeEach(function () {
      comparisonObj = {
        id: 1,
        name: "name",
        description: "hello",
        icon: "icon",
        type: "death",
        isMembers: true,
        buyLimit: 5,
        currentTrend: trends.neutral,
        todaysTrend: trends.neutral,
        days30Trend: trends.neutral,
        days90Trend: trends.neutral,
        days180Trend: trends.neutral,

        currentPrice: 5,
        todaysChange: 6,
        days30Change: 7,
        days90Change: 8,
        days180Change: 9
      };
      rsApiObj = {
        id: 1,
        name: "name",
        icon: "hello",
        type: "death",
        members: true,
        prices: {
          current: {
            price: 5,
            trend: trends.neutral
          },
          today: {
            price: 6,
            trend: trends.neutral
          },
          days30: {
            change: 7,
            trend: trends.neutral
          },
          days90: {
            change: 8,
            trend: trends.neutral
          },
          days180: {
            change: 9,
            trend: trends.neutral
          }
        }
      }
    });

    describe("parseItem()", function () {
      it("sets properties for a db item", function () {
        var newItem = item.parseItem(comparisonObj);

        expect(newItem.id).to.equal(comparisonObj.id);
        expect(newItem.name).to.equal(comparisonObj.name);
        expect(newItem.description).to.equal(comparisonObj.description);
        expect(newItem.icon).to.equal(comparisonObj.icon);
        expect(newItem.type).to.equal(comparisonObj.type);
        expect(newItem.isMembers).to.equal(comparisonObj.isMembers);
        expect(newItem.buyLimit).to.equal(comparisonObj.buyLimit);
        expect(newItem.currentTrend).to.equal(comparisonObj.currentTrend);
        expect(newItem.todaysTrend).to.equal(comparisonObj.todaysTrend);
        expect(newItem.days30Trend).to.equal(comparisonObj.days30Trend);
        expect(newItem.days90Trend).to.equal(comparisonObj.days90Trend);
        expect(newItem.days180Trend).to.equal(comparisonObj.days180Trend);
        expect(newItem.currentPrice).to.equal(comparisonObj.currentPrice);
        expect(newItem.todaysChange).to.equal(comparisonObj.todaysChange);
        expect(newItem.days30Change).to.equal(comparisonObj.days30Change);
        expect(newItem.days90Change).to.equal(comparisonObj.days90Change);
        expect(newItem.days180Change).to.equal(comparisonObj.days180Change);
      });

      it("sets properties for an rs item", function () {
        var newItem = item.parseItem(rsApiObj);

        expect(newItem.id).to.equal(rsApiObj.id);
        expect(newItem.name).to.equal(rsApiObj.name);
        expect(newItem.description).to.equal(rsApiObj.description);
        expect(newItem.icon).to.equal(rsApiObj.icon);
        expect(newItem.type).to.equal(rsApiObj.type);
        expect(newItem.isMembers).to.equal(rsApiObj.members);

        expect(newItem.currentTrend).to.equal(rsApiObj.prices.current.trend);
        expect(newItem.todaysTrend).to.equal(rsApiObj.prices.today.trend);
        expect(newItem.days30Trend).to.equal(rsApiObj.prices.days30.trend);
        expect(newItem.days90Trend).to.equal(rsApiObj.prices.days90.trend);
        expect(newItem.days180Trend).to.equal(rsApiObj.prices.days180.trend);

        expect(newItem.currentPrice).to.equal(5);
        expect(newItem.todaysChange).to.equal(6);
        expect(newItem.days30Change).to.equal(7);
        expect(newItem.days90Change).to.equal(8);
        expect(newItem.days180Change).to.equal(9);
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
