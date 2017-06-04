/**
 * Created by Administrator on 2017/6/3.
 */

const User = require('../modules/User.js');

// 此处展示所有向外的函数
exports.showIndex = showIndex;
exports.addUser = addUser;
exports.showUser = showUser;


// 展示首页
function showIndex(req,res){

    User.find({},function(err,data){
        res.render('index',{
            users:data
        })
    });


}

function addUser(req,res){
    console.log(req.query);

    var user = new User({
        username:req.query.username,
        password:req.query.password
    });

    user.save();

    res.end();
}

function showUser(req,res){
    console.log(req.query.username);

    User.findOne({username:req.query.username},function(err,result){
        res.render('user',{
            user:result._doc
        })
    });
}