const MongoClient = require('mongodb').MongoClient;
const db_url = 'mongodb://127.0.0.1:27017/login';

// 封装数据库连接函数
_dbConnect = function(callback){
	MongoClient.connect(db_url,function(err,db){
		if(err){
			console.log('数据库连接错误');
			console.log(err);
			db.close();
			return;
		}

		callback(db);
	});
}

// 保存数据
exports.dataSave = function(colName,data,callback){
	_dbConnect(function(db){
		db.collection(colName).insertMany([data],function(err,result){
			if(err){
				console.log(' 数据保存错误 '+ __dirname);
				console.log(err);
				db.close();
				return;
			}

			callback(result);
			db.close();
		});
	});
}

// 取出指定用户信息
exports.findUser = function(colName,data,callback){
	_dbConnect(function(db){
		db.collection(colName).find(data).toArray(function(err,data){

			if(err){
				console.log('用户查询错误' + __dirname);
				console.log(err);
				db.close();
				return;
			}

			callback(data);
			db.close();
		});
	});
}
