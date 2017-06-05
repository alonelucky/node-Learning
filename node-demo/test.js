/**
 * Created by Administrator on 2017/6/5.
 */
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/node');

const db = mongoose.connection;

db.once('open',function(err){
    console.log('数据库连接成功');
});

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:String,
    password:String,
    age:Number,
    create_at:Date
});

userSchema.methods.findIdbyUsername=function(){
    return this._id;
}

var userModel = db.model('User',userSchema);








var postScema = new Schema({
    content:String,
    author:String,
    comments:Number,
    create_at:Date
});

var postModel = db.model('Post',postScema);

var postA = new postModel({author:'xiaoli'});


// postA.save();

//var user = new userModel({name:'xiaoli'});
//
//user.password= '212131';
//user.save();

var user = userModel.find({});

user.select('name age');

user.sort({name:'1'});

user.limit(5);

user.skip(0);

user.exec(function(err,a){
    console.log(a);
});


// db.close();