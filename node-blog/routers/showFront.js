/**
 * Created by Administrator on 2017/6/16.
 */
const express = require('express');
const router = express.Router();
const showController = require('./controllers/show');


router.get('/',showController.show);
router.get('/category',showController.category);
router.get('/blog',showController.blog);
router.get('/sreach',showController.sreach);



module.exports=router;