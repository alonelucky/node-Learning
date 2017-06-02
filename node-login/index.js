const express = require('express');
const session = require('express-session');
const app = express();

// 自定义模块引用
const Router = require('./router/route.js');

app.set('view engine','ejs');

app.use(express.static('./public'));
app.use(session({
	secret:'keyboard cat',
	resave: false,
	saveUninitialized: true
}));

// 首页
app.get('/',Router.showIndex);

// 登录
app.get('/login',Router.userLoginPage);
app.post('/login',Router.userLogin);

// 注册
app.get('/sign',Router.userSignPage);
app.post('/sign',Router.userSign);

// 登出
app.all('/logout',Router.userLogout);


app.listen(3000);