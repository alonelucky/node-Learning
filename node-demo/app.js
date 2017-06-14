/**
    * Created by Administrator on 2017/6/4.
*/
const express = require('express');
const app = express();
const session = require('express-session');

// 引入路由函数
const showRouter = require('./router/showRouter.js');
const doRouter = require('./router/doRouter.js');
const router = require('./router/router.js');

// 设置模板引擎
app.set('view engine','ejs');

// 使用session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

// 静态资源路由
// app.use(express.static('./public'));

// 路由展示,前台相关
app.get('/',showRouter.index);           // 展示首页

app.get('/login',showRouter.login);      // 展示登录页
app.post('/logincheck',doRouter.login);  // 登录逻辑

app.get('/sign',showRouter.sign);        // 展示注册页
app.post('/signcheck',doRouter.sign);    // 注册逻辑

app.post('/logout',doRouter.logout);     // 登出页面

app.post('/post',doRouter.postTo);       // 发布心情
app.get('/showposts',showRouter.postJson);       // 心情展示

// 路由展示,后台相关
app.get('/user/:id',showRouter.userSettings);       // 个人信息
app.post('/user/:id',doRouter.userSettings);    // 个人信息保存

// 测试函数路由
app.get('/test',router.Test);      // 测试路由


// 监听端口
app.listen(3000);