/**
 * Created by Administrator on 2017/6/20.
 */
const fs = require('fs');
const async = require('async');
const fsPro = Promise.promisifyAll(require('fs'));

fsPro.readFile('1.txt');
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



