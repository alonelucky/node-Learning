/**
 * Created by Administrator on 2017/6/16.
 */
const express = require('express');
const router = express.Router();
const showController = require('./controllers/show');
const mwRouter = require('../routers/mwRouter');


router.get('/',mwRouter.siteViews,showController.show);
router.get('/category/:id',mwRouter.siteViews,showController.category);
router.get('/blog/:id',mwRouter.siteViews,showController.blog);
router.get('/sreach',mwRouter.siteViews,showController.sreach);



module.exports=router;