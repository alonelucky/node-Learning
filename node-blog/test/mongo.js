/**
 * Created by Administrator on 2017/6/22.
 */
const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost/test';

// 创建数据库连接
mongoose.connect(dbUrl,(err)=>{
    if(err){
        console.log('数据库连接失败');
        return;
    }
    console.log('数据库连接成功');
});


// 创建一个人物数据结构
let personSchema = mongoose.Schema({
        _id:Number,
        name:String,
        post:[{
            type:Number,
            ref:'postModel'
        }]
});

console.log(mongoose.Schema.ObjectId);
// 根据结构生成人物模型
let personModel = mongoose.model('person',personSchema);

let ObjectId = mongoose.Types.ObjectId;

// 创建一个文章数据结构
let postSchema = mongoose.Schema({
        _id:Number,
        title:String,
        author:{
            type:Number,
            ref:'personModel'
        },
        content:String
});

// 创建文章模型
let postModel = mongoose.model('post',postSchema);

// let postsid = [new ObjectId,new ObjectId,new ObjectId];
// let peopleid = [new ObjectId,new ObjectId,new ObjectId];
//
// let people = [
//     {_id:645463546354,name:'xiaoyiyu',post:1231321321},
//     {_id:645463546355,name:'yeyulong',post:1231321323},
//     {_id:645463546356,name:'xiaqiubo',post:1231321322}];
// let posts = [
//     {_id:1231321321,title:'1标题',content:'1内容',author:645463546354},
//     {_id:1231321322,title:'2标题',content:'2内容',author:645463546356},
//     {_id:1231321323,title:'3标题',content:'3内容',author:645463546355}];


// personModel.create(people,function(err,data){
//     console.log(data);
// });

// postModel.create(posts,function(err,data){
//     console.log(data);
// });

//
postModel.find({})
    .populate('people')
    .exec((err,data)=>{
        console.log(data)
    });
