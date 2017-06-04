/**
 * Created by Administrator on 2017/6/4.
 */
const formidable = require('formidable');
const User = require('../modules/user.js');

// 向外暴露函数
exports.showIndexPage = showIndexPage;
exports.showLoginPage = showLoginPage;
exports.showSignPage = showSignPage;
exports.doLogin = doLogin;
exports.doSign = doSign;
exports.doLogout = doLogout;



// 展示首页
function showIndexPage(req,res){
    console.log(req.session.login);
    res.render('index',{
        loged:req.session.login,
        username:req.session.username
    });
}
// 展示登录页
function showLoginPage(req,res){
    res.render('login');
}
// ajax处理登录请求
function doLogin(req,res){

}
// 展示注册页
function showSignPage(req,res){
    res.render('sign');
}
// ajax处理注册请求
function doSign(req,res){
   var form = formidable.IncomingForm();
    form.parse(req,function(err,fields){
        //首先验证用户名是否存在
       User.find({username:fields.username},function(err,data){
           if(data.length!=0){
               res.send({err:-1,msg:'当前用户名已被注册'});
               return;
           }
           User.create(fields,function(err){
               req.session.login='1';
               req.session.username=fields.username;
               res.send({err:1,msg:'注册成功'});
           });
       });

    });
}

function doLogout(req,res){
    req.session.login='-1';
    res.send('1');
}