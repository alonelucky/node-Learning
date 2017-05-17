var koa = require('koa');
var fs = require('fs');
var https = require('https');
// 创建微信链接模块并引入
var wechatConnect = require('./wechat/wechat');


var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx224ce11fc64665ba&secret=1a37d106e0fb0e8fe4474bd5c18de805';
var accessTokenFilePath = 'wechat/access_token';
// 定义微信公众号的基础信息(该公众号为测试公众号)
var config = {
	wechat:{
		appID : 'wx224ce11fc64665ba',
		appsecret : '1a37d106e0fb0e8fe4474bd5c18de805',
		token : 'imooctest'
	}
}

// 实例化一个app
var app = new koa();

// 调用微信连接模块
app.use(wechatConnect(config.wechat));

// 利用https模块发起get请求,获得access_token并单独保存在文件中
https.get(url,function(res){
	res.on('data',function(data){
		access_token = data.toString();
		fs.writeFile(accessTokenFilePath,access_token);
	});
});

// 定义该配置监听的端口
app.listen(80);
console.log('服务启动 80');