import parser from '../parser';

function getDayPrice(item, days){
  let isRsItem = !!item.current;
  let day = item[days];
  return {
    trend: isRsItem ? day.trend : day.trend,
    amountChanged: isRsItem ? parser.removeSymbols(day.change) : day.amountChanged
  };
}

export default (item) =>{ // eslint-disable-line
  var isRsItem = !!item.current;
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    icon: item.icon,
    type: item.type,

    isMembers: item.members || item.isMembers,
    buyLimit: item.buyLimit || 0,

    today: {
      trend: item.today.trend,
      amountChanged: isRsItem ? item.today.price : item.today.amountChanged,
      price: isRsItem ? item.current.price : item.today.price
    },
    days30: getDayPrice(item, 'day30'),
    days90: getDayPrice(item, 'day90'),
    days180: getDayPrice(item, 'day180'),

    history: !!item.history ? item.history : []
  };
};
