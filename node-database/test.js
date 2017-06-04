/**
 * Created by Administrator on 2017/6/4.
 */
// console.log(Promise);
const MongodbClient = require('mongodb').MongoClient;
const db_url = 'mongodb://localhost:27017/node';

const Promise = require('bluebird');

db_connect = Promise.promisify(MongodbClient.connect);


// console.log(db_connect(db_url).then((db)=>{console.log(db);}));


findOneData = Promise.promisify(db_connect.collection(colName).find(data).toArray);


console.log(findOneData);