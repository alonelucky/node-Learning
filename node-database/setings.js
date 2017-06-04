/**
 * Created by Administrator on 2017/6/3.
 */

const fs = require('fs');

var key = new Date().getTime()+''+parseInt(Math.random()*8999999+1000000);

const crypto = require('crypto');

var data = crypto.createHash('md5').update(key).digest('hex');

fs.writeFile('./.env',data,(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log('专属秘钥创建成功');
});