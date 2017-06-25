/**
 * Created by Administrator on 2017/6/16.
 */
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://127.0.0.1/blog');

const DB = mongoose.connection;

DB.once('open',function(err){
    if(err){
        console.log('数据库连接失败,请检查配置');
    }
    console.log(' 数据库连接成功 '+ __filename);
});

module.exports.db=DB;
module.exports.Schema=mongoose.Schema;

