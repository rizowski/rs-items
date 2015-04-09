var Item = require("../src/item"),
  parser = require("../src/parser");

describe("item", function(){
  ddescribe("new", function(){
    var trends = {
      positive: "positive",
      neutral: "neutral",
      negative: "negative"
    }
    beforeEach(function(){

    });

    it("sets properties with no defaults", function(){
      var item = new Item({
        id: 1,
        name: "name",
        description: "hello",
        icon: "icon",
        type: "death",
        isMember: true,
        buyLimit: 5,
        currentTrend: trends.neutral,
        todaysTrend: trends.neutral,
        days30Trend: trends.neutral,
        days90Trend: trends.neutral,
        days180Trend: trends.neutral,

        currentPrice: 5,
        todaysChange: 5,
        days30Change: 5,
        days90Change: 5,
        days180Change: 5
      });

      expect(item).toBe({
        id: 1,
        name: "name",
        description: "hello",
        icon: "icon",
        type: "death",
        isMember: true,
        buyLimit: 5,
        currentTrend: trends.neutral,
        todaysTrend: trends.neutral,
        days30Trend: trends.neutral,
        days90Trend: trends.neutral,
        days180Trend: trends.neutral,

        currentPrice: 5,
        todaysChange: 5,
        days30Change: 5,
        days90Change: 5,
        days180Change: 5
      });
    })
  });
});