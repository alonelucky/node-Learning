/**
 * Created by Administrator on 2017/6/16.
 */
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const swig = require('swig');
const mongoStore = require('connect-mongo')(session);

// 自定义模块
const mongodb = require('./modules/mdb');
const adminRoute = require('./routers/admin');
const apiRoute = require('./routers/api');
const showRoute = require('./routers/showFront');
const mwRouter = require('./routers/mwRouter');
const app = express();

// 设置模板引擎缓存
swig.setDefaults({
    cache:false,
    tagControls: ['<%', '%>']
});
// 设置模板引擎读取引擎
app.engine('html',swig.renderFile);
// 设置模板引擎文件
app.set('view engine','html');
// 设置模板存放路径
// app.set('views', __dirname + '/views');

// 处理静态资源(上线后交由nginx处理)
app.use(express.static('public'));

// 使用session中间件处理用户登录,结合connect-mongo实现会话保持
app.use(session({
    secret: 'mySelftName',
    store: new mongoStore({
        url:'mongodb://localhost/blog',
        collection:'sessions'
    })
}));

// 使用bodyParser中间件处理post请求
app.use(bodyParser());

// 设置路由
app.use('/',mwRouter.admin,mwRouter.siteViews,showRoute);
app.use('/api',apiRoute);
app.use('/admin',mwRouter.check_user_loged,adminRoute);


// 没有路由匹配的情况下,匹配404
app.use(function(req,res){
    res.send('404页面');
});
// 监听端口
app.listen(3000);
console.log('当前程序运行在3000端口');