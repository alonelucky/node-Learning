/**
 * Created by Administrator on 17-5-31.
 */
const express = require('express');
const app = express();

// 引用自定义模块
const Router = require('./controller/router.js');

// 设置模板引擎
app.set('view engine','ejs');
// 静态化静态资源
app.use(express.static('./public'));


//设置首页路由
app.get('/',Router.showIndexPage);

// 留言提交路由
app.post('/liuyansave',Router.liuyanSave);


// 页码查询
app.get('/page/:paged',Router.liuyanPage);

// 页码查询
app.get('/liuyan/:id',Router.liuyanDetail);

app.listen(3000);