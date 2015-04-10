var Item = require("../src/item");

describe("item", function () {
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
            price: "5",
            trend: trends.neutral
          },
          today: {
            price: "6",
            trend: trends.neutral
          },
          days30: {
            change: "7",
            trend: trends.neutral
          },
          days90: {
            change: "8",
            trend: trends.neutral
          },
          days180: {
            change: "9",
            trend: trends.neutral
          }
        }
      }
    });

    it("sets properties for a db item", function () {
      var item = new Item(comparisonObj);

      expect(item.id).toBe(comparisonObj.id);
      expect(item.name).toBe(comparisonObj.name);
      expect(item.description).toBe(comparisonObj.description);
      expect(item.icon).toBe(comparisonObj.icon);
      expect(item.type).toBe(comparisonObj.type);
      expect(item.isMembers).toBe(comparisonObj.isMembers);
      expect(item.buyLimit).toBe(comparisonObj.buyLimit);
      expect(item.currentTrend).toBe(comparisonObj.currentTrend);
      expect(item.todaysTrend).toBe(comparisonObj.todaysTrend);
      expect(item.days30Trend).toBe(comparisonObj.days30Trend);
      expect(item.days90Trend).toBe(comparisonObj.days90Trend);
      expect(item.days180Trend).toBe(comparisonObj.days180Trend);
      expect(item.currentPrice).toBe(comparisonObj.currentPrice);
      expect(item.todaysChange).toBe(comparisonObj.todaysChange);
      expect(item.days30Change).toBe(comparisonObj.days30Change);
      expect(item.days90Change).toBe(comparisonObj.days90Change);
      expect(item.days180Change).toBe(comparisonObj.days180Change);
    });

    it("sets properties for an rs item", function () {
      var item = new Item(rsApiObj);

      expect(item.id).toBe(rsApiObj.id);
      expect(item.name).toBe(rsApiObj.name);
      expect(item.description).toBe(rsApiObj.description);
      expect(item.icon).toBe(rsApiObj.icon);
      expect(item.type).toBe(rsApiObj.type);
      expect(item.isMembers).toBe(rsApiObj.members);

      expect(item.currentTrend).toBe(rsApiObj.prices.current.trend);
      expect(item.todaysTrend).toBe(rsApiObj.prices.today.trend);
      expect(item.days30Trend).toBe(rsApiObj.prices.days30.trend);
      expect(item.days90Trend).toBe(rsApiObj.prices.days90.trend);
      expect(item.days180Trend).toBe(rsApiObj.prices.days180.trend);

      expect(item.currentPrice).toBe(5);
      expect(item.todaysChange).toBe(6);
      expect(item.days30Change).toBe(7);
      expect(item.days90Change).toBe(8);
      expect(item.days180Change).toBe(9);
    })
  });
});
