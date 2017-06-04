const mongoose = require('mongoose');

mongoose.Promise = require('bluebird'); // mongoose的promise使用bluebird代替

// 定义基本信息
mongoose.connect('mongodb://localhost/node');
// 创建连接
var db = mongoose.connection;
// 数据库连接信息
db.on('error',console.error.bind(console,'connection error : '));
db.once('open',function(err){
    console.log('数据库开启');
});

module.exports = db;
