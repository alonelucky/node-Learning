const key = 'g6xajgpyaytivwuk';	// 我的秘钥
const userID = 'UF16F0DB04' ;	// 我的ID
const url = 'https://api.seniverse.com/v3/weather/now.json?';	// 定义url

const https = require('https');
// 获得加密模块
const crypto = require('crypto');
// 定义时间戳
var times = Math.floor(new Date().getTime()/1000);

var keyTimes = 'ts='+times+'&ttl=300&uid='+userID;

console.log('keyTimes是'+keyTimes);

var sig = crypto.createHmac('sha1',key).update('keyTimes').digest('base64');

console.log('加密后的签名'+sig);


var myurl = url +'&location=beijing&'+keyTimes+'&key='+key;

https.get(myurl,function(res){
	res.on('data',function(data){
		console.log(data.toString());
	});
});


