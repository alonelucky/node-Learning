/**
 * Created by Administrator on 2017/6/5.
 */
/**
 * Created by Administrator on 2017/6/4.
 */
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const db = require('./db.js');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    postContent:String,
    username:String,
    create_at:Date,
    update_at:Date
});


const Post = mongoose.model('Post',PostSchema);

module.exports = Post;
