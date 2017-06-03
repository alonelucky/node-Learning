/**
 * Created by Administrator on 2017/6/3.
 */
var express = require('express');

var Router = require('./router/router.js');

var app = express();

// 业务逻辑
app.set('view engine','ejs');

// 路由设置
app.use(express.static('./uploads'));
app.use(express.static('./public'));

app.get('/',Router.showIndex);
app.post('/up',Router.doUpload);
app.post('/dogm',Router.doGM);
// 监听端口
app.listen(3000);