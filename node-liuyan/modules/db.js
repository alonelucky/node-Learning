/**
 * Created by Administrator on 2017/6/1.
 */
const MongodbClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const Assert = require('assert');

const db_url = 'mongodb://127.0.0.1:27017/liuyan';

// 封装连接数据库的函数
function db_connect(callback){
    MongodbClient.connect(db_url,function(err,db){
        // 如果错误,则直接返回
        if(err){
            console.log('数据库连接错误');
            console.log(err);
            db.close();
            return;
        }
        // 利用回调函数,返回db对象
        callback(db);
        db.close();
    });
}


// 封装增加留言函数
// 参数设置:
// 1. 集合名称
// 2. 新增数据json
// 3. 回调函数
exports.addLiuyan = function(colName,data,callback){
    db_connect(function(db){
        db.collection(colName).insertMany([data],function(err,result){
            if(err){
                console.log('数据增加错误');
                console.log(err);
                db.close();
                return;
            }
            callback(result);
            db.close();
        });
    });
}

// 封装查询函数
// 参数设置:
// 1. 集合名称
// 2. 查询参数(json)
// 3. 分页设置({page:,pageNum:})
// 4. 回调函数
exports.findLiuyan = function(colName,data,args,callback){
    db_connect(function(db){

        // 获得传入参数
        var skipItems = parseInt(args.pageNum*(args.page-1));
        var limitNum = parseInt(args.pageNum);

        // 对传入参数进行处理,如果没有,则原始赋值
        if( args.sortMethod || args.sortName ){
            var sortName = args.sortName;
            var sortMethod = args.sortMethod;
        }else{
            var sortName = 'key';
            var sortMethod = -1;
        }

        // 执行查询
        db.collection(colName).find(data).skip(skipItems).limit(limitNum).sort({sortName:sortMethod}).toArray(function(err,data){
            if(err){
                console.log('数据查询错误');
                console.log(err);
                return;
            }
            callback(data);
        });

    });
}

// 返回当前集合的文档数
exports.itemsCount = function(colName,callback){
    db_connect(function(db){
        db.collection(colName).count(function(err,data){
            callback(data);
        });
    });
}

// 根据_id查询指定文档
exports.itemDetails = function(colName,id,callback){
    var Oid = ObjectID(id);

    db_connect(function(db){
        db.collection(colName).find({'_id':Oid}).toArray(function(err,data){

            if(err){
                console.log('数据查询错误');
                db.close();
                return;
            }

            callback(data);
        });
    });
}