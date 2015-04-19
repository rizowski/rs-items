var proxy = require("proxyquire"),
  item;

describe("item", function () {
  var mock;
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

    describe("parseItem()", function(){
      it("sets properties for a db item", function () {
        var newItem = item.parseItem(comparisonObj);

        expect(newItem.id).toBe(comparisonObj.id);
        expect(newItem.name).toBe(comparisonObj.name);
        expect(newItem.description).toBe(comparisonObj.description);
        expect(newItem.icon).toBe(comparisonObj.icon);
        expect(newItem.type).toBe(comparisonObj.type);
        expect(newItem.isMembers).toBe(comparisonObj.isMembers);
        expect(newItem.buyLimit).toBe(comparisonObj.buyLimit);
        expect(newItem.currentTrend).toBe(comparisonObj.currentTrend);
        expect(newItem.todaysTrend).toBe(comparisonObj.todaysTrend);
        expect(newItem.days30Trend).toBe(comparisonObj.days30Trend);
        expect(newItem.days90Trend).toBe(comparisonObj.days90Trend);
        expect(newItem.days180Trend).toBe(comparisonObj.days180Trend);
        expect(newItem.currentPrice).toBe(comparisonObj.currentPrice);
        expect(newItem.todaysChange).toBe(comparisonObj.todaysChange);
        expect(newItem.days30Change).toBe(comparisonObj.days30Change);
        expect(newItem.days90Change).toBe(comparisonObj.days90Change);
        expect(newItem.days180Change).toBe(comparisonObj.days180Change);
      });

      it("sets properties for an rs item", function () {
        var newItem = item.parseItem(rsApiObj);

        expect(newItem.id).toBe(rsApiObj.id);
        expect(newItem.name).toBe(rsApiObj.name);
        expect(newItem.description).toBe(rsApiObj.description);
        expect(newItem.icon).toBe(rsApiObj.icon);
        expect(newItem.type).toBe(rsApiObj.type);
        expect(newItem.isMembers).toBe(rsApiObj.members);

        expect(newItem.currentTrend).toBe(rsApiObj.prices.current.trend);
        expect(newItem.todaysTrend).toBe(rsApiObj.prices.today.trend);
        expect(newItem.days30Trend).toBe(rsApiObj.prices.days30.trend);
        expect(newItem.days90Trend).toBe(rsApiObj.prices.days90.trend);
        expect(newItem.days180Trend).toBe(rsApiObj.prices.days180.trend);

        expect(newItem.currentPrice).toBe(5);
        expect(newItem.todaysChange).toBe(6);
        expect(newItem.days30Change).toBe(7);
        expect(newItem.days90Change).toBe(8);
        expect(newItem.days180Change).toBe(9);
      });
    });

    describe("getSchema()", function () {
      beforeEach(function () {
        spyOn(mock.mongoose, "Schema");
      });

      it("calls mongoose's Schema method", function () {
        item.getSchema();
        expect(mock.mongoose.Schema).toHaveBeenCalled();
      });
    });
  });
});
