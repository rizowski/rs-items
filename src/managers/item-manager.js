import Bluebird from 'bluebird';
import { getItem } from '../clients/runescape';

const manager = {
  getItem(id){
    return Bluebird.delay(5000)
      .then(() => getItem(id));
  },
  getItems(ids){
    return Bluebird.map(ids, manager.getItem, { concurrency: 1 });
  }
};

export default manager;
