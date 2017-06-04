/**
 * Created by Administrator on 2017/6/4.
 */
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/node');

const db = mongoose.connection;

db.once('open',function(err){
    console.log('数据库连接成功');
});

const Schema = mongoose.Schema;

const UerSchema = new Schema({
    username:String,
    password:String,
    nick:String,
    email:String,
    create_at:Date,
    update_at:Date
});


const User = mongoose.model('User',UerSchema);

module.exports = User;
