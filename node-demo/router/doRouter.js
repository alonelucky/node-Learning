/**
 * Created by Administrator on 2017/6/6.
 */
// 引入数据模块
const User = require('../modules/user.js');     // 引入用户模型
const PostModel = require('../modules/post.js').Post;     // 引入文章模型
const crypto = require('crypto');   // 引入加密模块
const formidable = require('formidable');   // 表单处理模块

exports.login = doLogin;    // 处理登录逻辑
exports.sign = doSign;      // 处理注册逻辑
exports.logout = doLogout;  // 处理登出逻辑
exports.postTo = doPost;     // 发表文章逻辑
exports.userSettings = doUserSettings;  // 用户设置界面

// ajax处理注册请求
function doSign(req,res){
    var form = formidable.IncomingForm();
    form.parse(req,function(err,fields){
        //首先验证用户名是否存在
        var formUsername = fields.username;
        var formpassword = fields.password;
        User.find({username:formUsername},function(err,data){
            if(data.length!=0){
                res.end({err:-1,msg:'当前用户名已被注册'});
                return;
            }
            var hashPW = crypto.createHmac('sha1',formUsername).update(formpassword).digest('hex');
            User.create({username:formUsername,password:hashPW,create_at:new Date().getTime()},function(err){
                req.session.login='1';
                req.session.username=fields.username;
                res.send({err:1,msg:'注册成功'});
            });
        });

    });
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
                res.send({err:'-1',msg:'用户名或密码错误'});
                return;
            }else{
                // 相同即登陆成功,记录session
                req.session.login='1';
                req.session.username=formUsername;
                console.log('登录成功');
                res.send({err:'1',msg:'登录成功'});
            }
        });
    });
}
// 用户登出
function doLogout(req,res){
    req.session.login='-1';
    req.session.username='';
    res.end('1');
}
// 发布心情
function doPost(req,res){
    if(req.session.login!='1'){
        res.redirect(req.protocol+'://'+req.headers.host);
        return;
    }
    var form = formidable.IncomingForm();
    form.parse(req,function(err,fields){
        data = {postContent:fields.postContent,username:req.session.username,create_at:new Date().getTime()}
        PostModel.create(data,function(err){
            if(err){
                res.send({err:-1,msg:'发表失败,请联系管理员'});
                return;
            }
            console.log('保存文档');
            res.send({err:1,msg:'发表成功'});
        });
    });
}

// 用户修改
function doUserSettings(req,res){
    // 判断当前是否登录,且用户是否为当前用户
    if( !(req.session.login=='1') ){
        res.redirect(req.protocol+'://'+req.headers.host);
        return;
    }
    var form = formidable.IncomingForm();

    form.parse(req,function(err,fields){
        console.log(fields);
        User.findOne({username:req.session.username},function(err,obj){
            if(err){
                res.end({err:-1,msg:'保存错误'});
                return;
            }

            obj._doc.nick = req.query.nick;
            obj.save();
        });
    });
}