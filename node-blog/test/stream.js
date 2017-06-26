/**
 * Created by Administrator on 2017/6/26.
 */
const fs =require('fs');


let create1 = fs.createWriteStream('a.txt');
let create2 = fs.createReadStream('1.txt');

create1.write('我是第一次写入的\n');


create2.pipe(create1);
