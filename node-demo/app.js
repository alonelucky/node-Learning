/**
 * Created by Administrator on 2017/6/4.
 */
const express = require('express');
const app = express();
const router = require('./router/router.js');
const session = require('express-session');

// 设置模板引擎
app.set('view engine','ejs');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

//静态资源
app.use(express.static('./public'));


// 准确路由
app.get('/',router.showIndexPage);  // 展示首页
app.get('/login',router.showLoginPage);  // 展示登录页
app.post('/logincheck',router.doLogin);  // ajax登录
app.get('/sign',router.showSignPage);  // 展示注册页
app.post('/signcheck',router.doSign);  // ajax注册
app.post('/logout',router.doLogout);  // 登出页面





// 监听端口
app.listen(3000);