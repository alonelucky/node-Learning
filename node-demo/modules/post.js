/**
 * Created by Administrator on 2017/6/5.
 */
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


// 引用自建文件暴露的两个数据模块
const db = require('./db.js').db;
const Schema = require('./db.js').Schema;

// 创建Post集合结构
const PostSchema = new Schema({
    postContent:String,
    username:String,
    create_at:Date,
    update_at:Date
});

// 创建Post模型
const Post = db.model('Post',PostSchema);

// 向外暴露Psot模型
module.exports.Post = Post;

// 时间倒序每页12个并返回总条数
exports.findAllAndNum = function(paged,callback) {
    Promise.all([
        Post.find({}).count().exec(),
        Post.find({}).sort({create_at: -1}).limit(12).skip((paged-1)*12).exec()
    ]).then(function (arr) {
        callback(arr);
    });
}

