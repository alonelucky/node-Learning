var sha1 = require('sha1');
var http = require('http');
var getRawBody = require('raw-body');
var xml2js = require('xml2js');



function accessToken(){
	console.log('调用模块函数');
}

// 创建模块
module.exports = function (options) {
	// 返回genretor函数,用以调用该函数
	return function *(next){
		var that = this;
		// 获取传入参数及定义的token
		// console.log(this.query);
		var token = options.token;
		var signature = this.query.signature;
		var nonce = this.query.nonce;
		var timestamp = this.query.timestamp;
		var echostr = this.query.echostr;
		// 对字段 token/时间戳/验证信息 排序拼接
		var str = [token,timestamp,nonce].sort().join('');
		// 加密字段
		var sha = sha1(str);
		if( this.method == 'GET' ){
			// 比较加密字段与传入的signature
			if( sha === signature ){
				// 正确则返回
				this.body = echostr + '';
			}else{
				// 错误返回 wrong
				this.body = 'wrong';
			}
		}else if( this.method == 'POST' ){
			if( sha !== signature ){
				this.body = 'wrong';
				return false;
			}
			var xmlData = yield getRawBody(this.req,{
				length:this.length,
				limit:'1mb',
				encoding:this.charset
			});

			xml2js.parseString(xmlData.toString(),function(err,res){
				msg = res.xml;
			});

			console.log(msg);
			if(msg.MsgType == 'event'){
				var now = new Date().getTime();
				if( msg.Event == 'subscribe' ){
					that.status = 200;
					that.type = 'application/xml';
					that.body = '<xml><ToUserName><![CDATA['+ msg.FromUserName +']]></ToUserName><FromUserName><![CDATA['+ ToUserName +']]></FromUserName><CreateTime>'+ now +'</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[测试成功]]></Content></xml>';

					return;
				}

			}

			if(msg.MsgType == 'text'){
				var now = new Date().getTime();
				if( msg.Content == '123' ){
					this.status = 200;
					this.type = 'application/xml';
					this.body = '<xml><ToUserName><![CDATA['+ msg.FromUserName +']]></ToUserName><FromUserName><![CDATA['+ msg.ToUserName +']]></FromUserName><CreateTime>'+ now +'</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[文本测试成功]]></Content></xml>';

					return;
				}

			}


		}
		console.log('微信连接成功');
	}
}