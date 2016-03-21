import Promise from 'bluebird';
import mongojs from 'mongojs';

Promise.promisifyAll([
  mongojs,
  require('mongojs/lib/collection'),
  require('mongojs/lib/database'),
  require('mongojs/lib/cursor')
]);

let connection = mongojs(process.env.MONGO_URI);

export default () => connection;
