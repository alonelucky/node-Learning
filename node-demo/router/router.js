/**
 * Created by Administrator on 2017/6/4.
 */
const formidable = require('formidable');
const User = require('../modules/user.js');
const Post = require('../modules/post.js');
const crypto = require('crypto');

// 向外暴露函数
exports.showIndexPage = showIndexPage;
exports.showLoginPage = showLoginPage;
exports.showSignPage = showSignPage;
exports.doLogin = doLogin;
exports.doSign = doSign;
exports.doLogout = doLogout;
exports.doPost = doPost;
exports.showUserSettings = showUserSettings;
exports.doUserSettings = doUserSettings;



// 展示首页
function showIndexPage(req,res){
    // console.log(req.session.login);
    Post.find({},function(err,obj){
        if(err){
            return;
        }
        res.render('index',{
            loged:req.session.login,
            username:req.session.username,
            posts:obj
        });
    });
}
// 展示登录页
function showLoginPage(req,res){
    // console.log(req);
    if(req.session.login=='1'){
        res.redirect('http://'+req.headers.host);
    }
    res.render('login');
}
// ajax处理登录请求
function doLogin(req,res){
    var form = formidable.IncomingForm();
    form.parse(req,function(err,fields){
        var formUsername = fields.username;
        var formPassword = fields.password;
        User.find({'username':formUsername},function(err,obj){
            // 判断当前用户名是否注册
            // console.log(obj);
            if(obj.length==0){
                res.send({err:-1,msg:'当前用户尚未注册'});
                return;
            }
            // 查找用户名得到密码,并对比
            var userPW = obj[0]._doc.password;
            var formHPW = crypto.createHmac('sha1',formUsername).update(formPassword).digest('hex');
            // 如果不相同,则返回错误信息
            if(userPW != formHPW){
                res.send({err:-1,msg:'用户名或密码错误'});
                return;
            }else{
                // 相同即登陆成功,记录session
                req.session.login='1';
                req.session.username=formUsername;
                res.send({err:1,msg:'登录成功'});
            }
        });
    });
}
// 展示注册页
function showSignPage(req,res){
    if(req.session.login=='1'){
        res.redirect('http://'+req.headers.host);
    }
    res.render('sign');
}
// ajax处理注册请求
function doSign(req,res){
   var form = formidable.IncomingForm();
    form.parse(req,function(err,fields){
        //首先验证用户名是否存在
        var formUsername = fields.username;
        var formpassword = fields.password;
       User.find({username:formUsername},function(err,data){
           if(data.length!=0){
               res.send({err:-1,msg:'当前用户名已被注册'});
               return;
           }
           var hashPW = crypto.createHmac('sha1',formUsername).update(formpassword).digest('hex');
           User.create({username:formUsername,password:hashPW},function(err){
               req.session.login='1';
               req.session.username=fields.username;
               res.send({err:1,msg:'注册成功'});
           });
       });

    });
}
// 用户登出
function doLogout(req,res){
    req.session.login='-1';
    res.send('1');
}
// 发布心情
function doPost(req,res){
    if(req.session.login!='1'){
        res.redirect('http://'+req.headers.host);
        return;
    }
    var form = formidable.IncomingForm();
    form.parse(req,function(err,fields){
        data = {postContent:fields.postContent,username:req.session.username}
        Post.create(data,function(err){
            if(err){
                res.send({err:-1,msg:'发表失败,请联系管理员'});
                return;
            }
            res.send({err:1,msg:'发表成功'});
        });

    });
}
// 用户设置
function showUserSettings(req,res){
    // 判断当前是否登录,且用户是否为当前用户
    if( !(req.session.login=='1' || req.session.username==req.query.username) ){
        res.redirect('http://'+req.headers.host);
        return;
    }
    res.render('usersetting',{
        loged : req.session.login,
        username: req.session.username
    });
}

// 用户修改
function doUserSettings(req,res){
    if(req.session.login!='1'){
        res.redirect('http://'+req.headers.host);
        return;
    }
    res.render('usersetting',{
        loged : req.session.login,
        username: req.session.username
    });
}