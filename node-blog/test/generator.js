/**
 * Created by Administrator on 2017/6/20.
 */

var fs =require('fs');

function* foo(a){
    console.log(a +''+new Date().getTime());
    yield foo2(function(data){
        console.log(data+' '+new Date().getTime());
    });
    yield console.log(1+' '+new Date().getTime());
}


function foo2(cb){
    fs.readFile('1.txt',function(err,data){
        cb(data);
    });
}

var f = foo(5);

console.log('第1次执行'+new Date().getTime())
f.next();
console.log('\n')
console.log('第2次执行'+new Date().getTime())
f.next();
console.log('\n')
console.log('第3次执行'+new Date().getTime())
f.next();
console.log('\n')