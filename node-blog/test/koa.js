/**
 * Created by Administrator on 2017/6/20.
 */
const Koa = require('koa');
const fs = require('fs');

const app = new Koa();

app.use(async (ctx,next)=>{

    console.log(0);
    await fs.readFile('1.txt',function(err,data){
        ctx.response.body=data;
        console.log(2);
    });
    console.log(1);
});



app.listen(3000);