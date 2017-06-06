/**
 * Created by Administrator on 2017/6/4.
 */
const formidable = require('formidable');
const form = formidable.IncomingForm();
const User = require('../modules/user.js');
const Post = require('../modules/post.js');

// 向外暴露路由函数函数
exports.Test = Test;

function Test(req,res){
    Post.findAllAndNum(1,function(data){
        console.log(data);
    });
    res.end();
}
