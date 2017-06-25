/**
 * Created by Administrator on 2017/6/16.
 */
// 使用express的路由模块
const express = require('express');
const router = express.Router();
// 引入自定义的控制器实现视图和数据的绑定输出
const adminController = require('./controllers/admin');
const mwRouter = require('../routers/mwRouter');



router.get('/',adminController.admin);
router.get('/editor/:id',adminController.editor);
router.get('/addpost',adminController.addPost);
router.get('/list',adminController.list);



// 向外输出对象
module.exports=router;