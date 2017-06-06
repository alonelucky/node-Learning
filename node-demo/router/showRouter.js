/**
 * Created by Administrator on 2017/6/6.
 */
const User = require('../modules/user.js');
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
        res.render('index',{
            loged:req.session.login,
            username:req.session.username
        });
        return;
    }
    // 返回数据总条数和第一页数据
    PostModel.findAllAndNum(1,function(arr){
        res.render('index',{
            loged:req.session.login,
            username:req.session.username,
            postsNum:arr[0],
            posts:arr[1]
        });
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
    if( !(req.session.login=='1' || req.session.username==req.query.username) ){
        res.redirect(req.protocol+'://'+req.headers.host);
        return;
    }
    // 查找第一条数据并展示
    User.findOne({username:req.query.username},function(err,obj){
        if(err){
            res.render('usersetting',{
                loged : req.session.login,
                username: req.session.username
            });
            return;
        }
        res.render('usersetting',{
            loged : req.session.login,
            username: req.session.username,
            nick:obj._doc.nick,
            items:obj._doc.hobby
        });
    });

}

function showPostJson(req,res){
    // 判断是否是登录用户进行的操作
    if(req.session.login!='1'){
        res.redact(req.protocol+'://'+req.headers.host);
        return;
    }
    var paged = req.query.paged;
    PostModel.findAllAndNum(paged,function(arr){
        res.send(arr[1]);
    })

}