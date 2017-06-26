/**
 * Created by Administrator on 2017/6/16.
 */
const db = require('./mdb.js').db;
const Schema = require('./mdb.js').Schema;

// 创建User集合结构
const userSchema = new Schema({
    username:String,
    password:String,
    email:String,
    create_at:String,
});

// 生成用户模型
const userModel = db.model('user',userSchema);

// 创建post集合结构
const postSchema = new Schema({
    title:String,
    author:{
        type:Schema.ObjectId,
        ref: 'user'
    },
    content:{
        type:String,
        ref:'comment'
    },
    summary:String,
    category:{
        type:Schema.ObjectId,
        ref:'category'
    },
    status:Boolean,
    comment_status:Boolean,
    create_at:String,
    update_at:{
        type:Date,
        default:Date.now
    }
});

// 生成用户模型
const postModel = db.model('post',postSchema);

// 为模型增加新的方法,根据页码查询
postModel.findByPage=function(paged,callback){
    let query =  postModel.find({});
    query.limit(10);
    query.skip(10*(paged-1));
    query.exec();
    query.then(callback)
}

// 增加分类
const categorySchema = new Schema({
    name:String,
    posts:[{type:Schema.ObjectId,ref:'post'}]
});

const categoryModel = db.model('category',categorySchema);

// 增加站点设置项
const optionSchema = new Schema({
    name:String,
    value:Number
});

const optionModel = db.model('option',optionSchema);

// 向外输出用户模型
module.exports.user = userModel;
module.exports.post = postModel;
module.exports.category = categoryModel;
module.exports.option = optionModel;


