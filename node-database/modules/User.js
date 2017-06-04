/**
 * Created by Administrator on 2017/6/4.
 */
const mongoose = require('mongoose');
const db = require('./db.js');
mongoose.Promise = require('bluebird'); // mongoose的promise使用bluebird代替

// 创建user集合结构
var userSchema = mongoose.Schema({
    username:String,
    password:String,
    age:Number,
    nick:String,
    description:String,
    create_date:Date,
    update_date:Date
});


// 建立user模型
var user = mongoose.model('user',userSchema);

module.exports = user;

