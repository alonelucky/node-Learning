/**
 * Created by Administrator on 2017/6/3.
 */
const express = require('express');
const app = express();
const Route = require('./route.js');

app.get('/',Route.showIndex);





app.listen(3000);