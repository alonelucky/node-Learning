const formidable = require('formidable');
const db = require('../modules/db.js');
const crypto = require('crypto');
const secret_key = '';

_hash = function(str){
	return crypto.createHmac('sha256',secret_key).update(str).digest('hex');
}

// 展示首页
exports.showIndex = function(req,res){

	if(req.session.login=='1'){
		msg='已经登录';
	}else{
		msg='尚未登录';
	}

	res.render('index',{message:msg});
}

// 用户注册,处理post请求
exports.userSign = function(req,res){
	var form = formidable.IncomingForm();

	form.parse(req,function(err,fields){
		// console.log(fields);
		var username = fields.username;
		var password = fields.password;

		// 用当前用户名和数据库进行比较
		db.findUser('users',{'username':username},function(data){
			// 如果返回数据为空,则进行下一步
			if( data[0] != null ){
				console.log('当前用户已存在,不可以注册');
				res.end('当前用户已存在,不可以注册');
				return;
			}

			// 加密密码
			var hashpassword = _hash(password);

			// 将数据存入数据库
			db.dataSave('users',{'username':username,'password':hashpassword},function(result){
				// console.log(result);
				res.end('注册成功');
			});
		});

	});
}
// 用户注册界面,处理get请求
exports.userSignPage = function(req,res){
	res.render('sign');
}

// 用户登录界面
exports.userLoginPage = function(req,res){
	// 如果用户已经登录则直接跳回首页
	if(req.session.login=='1'){
		res.redirect('http://'+req.headers.host);
	}else{
		res.render('login');
	}

}
// 用户登录判断
exports.userLogin = function(req,res){

	var form = formidable.IncomingForm();
	form.parse(req,function(err,fields){
		var username = fields.username;
		var password = fields.password;

		db.findUser('users',{'username':username},function(data){
			if(data[0]==null){
				res.end('当前用户不存在,请注册');
				return;
			}
			// 对加密的密码和当前密码进行对比
			var db_password = data[0].password;

			if( db_password != _hash(password) ){
				res.end('用户名/密码错误');
				return;
			}

			// 正确则将登录信息写入session
			req.session.login = '1';

			res.send('登录成功');
		});
	});
}

exports.userLogout = function(req,res){
	req.session.login = '-1';
	res.end('登出成功');
}