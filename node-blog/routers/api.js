/**
 * Created by Administrator on 2017/6/16.
 */
const express = require('express');
const router = express.Router();
const apiController = require('./controllers/api');
const mwRouter = require('../routers/mwRouter');
//
router.get('/',apiController.api);
router.post('/login',mwRouter.check_user_form,apiController.login);
router.post('/sign',mwRouter.check_user_form,mwRouter.check_username_signed,apiController.sign);
router.all('/logout',mwRouter.check_user_loged,apiController.logout);
router.all('/addpost',apiController.addPost);
router.all('/addcategory',apiController.addCategory);
router.all('/removecategory',apiController.removeCategory);
router.all('/updatecategory',apiController.updateCategory);
router.all('/removepost',apiController.removePost);
router.all('/updatepost',apiController.updatePost);


module.exports=router;