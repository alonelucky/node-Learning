/**Created by Administrator on 2017/6/4. */

// 引用自建文件暴露的两个数据模块
const db = require('./db.js').db;
const Schema = require('./db.js').Schema;

// 创建User集合结构
const UerSchema = new Schema({
    username:String,
    password:String,
    nick:String,
    email:String,
    hobby:Array,
    create_at:Date,
    update_at:Date
});

// 创建User模型
const User = db.model('User',UerSchema);

// 向外暴露User模型
module.exports = User;