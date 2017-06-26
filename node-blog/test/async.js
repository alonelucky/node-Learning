/**
 * Created by Administrator on 2017/6/20.
 */
const fs = require('fs');
const async = require('async');


function fsPro(filepath){
    return new Promise(function(resolve,reject){
        fs.readFile(filepath,function(err,data){
            if(err){
                reject(err);
            }
            resolve(data);
        });
    });
}


// fsPro.readFile('1.txt');
//async.series({
//    one: function (callback) {
//        fs.readFile('1.txt', function (err, data) {
//            callback(null,data);
//        })
//    },
//    two: function (callback) {
//        fs.readFile('index.html', function (err, data) {
//            callback(null,data);
//        })
//    }
//},function(){
//    console.log(arguments);
//});


//
// (async function(){
//     let atext = await fsPro
// })();

(async function (){
    let t1 = new Date().getTime();
    let d = await fsPro('1.txt');
    let e = await fsPro('2.txt');
    let f = await fsPro('2.txt');
    let g = await fsPro('2.txt');
    let h = await fsPro('2.txt');
    let i = await fsPro('2.txt');
    if(i){
        console.log(d);
        console.log(e);
        console.log(f);
        console.log(g);
        console.log(h);
        console.log(i);
        let t2 = new Date().getTime();
        console.log(t2-t1);
    }
})();

