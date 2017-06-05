/**
 * Created by Administrator on 2017/6/5.
 */
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/node');

const db = mongoose.connection;

db.once('open',function(err){
    console.log('数据库连接成功');
});

var Schema = mongoose.Schema;
module.exports.db = db;
module.exports.Schema= Schema;
