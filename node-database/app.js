/**
 * Created by Administrator on 2017/6/3.
 */
const express = require('express');
const app = express();
const Route = require('./router/route.js');


app.set('view engine','ejs');

app.get('/',Route.showIndex);
app.get('/add',Route.addUser);
app.get('/user',Route.showUser);





app.listen(3000);