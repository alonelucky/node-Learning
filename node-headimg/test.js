/**
 * Created by Administrator on 2017/6/3.
 */
var gm  = require('gm');

gm('./uploads/1.png')
    .crop(10,20,50,60)
    .write('./uploads/head/2.2.png',function(err){
        console.log(err);
    });