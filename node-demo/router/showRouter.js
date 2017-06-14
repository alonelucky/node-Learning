/**
 * Created by Administrator on 2017/6/6.
 */
const UserModel = require('../modules/user.js');
const PostModel = require('../modules/post.js');
const Post = PostModel.Post;
const formidable = require('formidable');   // 表单处理模块

exports.index = showIndexPage;      // 展示首页
exports.login = showLoginPage;      // 展示登录页面
exports.sign = showSignPage;        // 展示登录页面
exports.userSettings = showUserSettings;    // 展示用户设置界面
exports.postJson = showPostJson;    // 展示用户设置界面


// 展示首页
function showIndexPage(req,res){
    // 判断是否是登录用户进行的操作
    if(req.session.login!='1'){
        res.send('当前用户没有登录');
        return;
    }
    // 返回数据总条数和第一页数据
    PostModel.findAllAndNum(1,function(arr){
        res.send('这是首页数据'+arr);
    })
}

// 展示登录页
function showLoginPage(req,res){
    // 判断是否是登录用户进行的操作
    if(req.session.login=='1'){
        res.redirect(req.protocol+'://'+req.headers.host);
        return;
    }
    res.render('login');
}

// 展示注册页
function showSignPage(req,res){
    // 判断是否是登录用户进行的操作
    if(req.session.login=='1'){
        res.redirect(req.protocol+'://'+req.headers.host);
        return;
    }
    res.render('sign');
}

// 用户设置
function showUserSettings(req,res){
    // 判断当前是否登录,且用户是否为当前用户
    if(req.session.login!='1'){
        res.redirect(req.protocol+'://'+req.headers.host);
        return;
    }

    var userID = req.params.id;

    UserModel.findById(userID,function(err,data){
        console.log(err);
        res.send(data);
    });

}

function showPostJson(req,res){
    // 判断是否是登录用户进行的操作
    if(req.session.login!='1'){
        res.redirect(req.protocol+'://'+req.headers.host);
        return;
    }

    var paged = req.query.paged;
    PostModel.findAllAndNum(paged,function(arr){
        res.send(arr[1]);
    })

}