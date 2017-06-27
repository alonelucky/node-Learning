/**
 * Created by Administrator on 2017/6/21.
 */
const userModel = require('../../modules/data').user;
const categoryModel = require('../../modules/data').category;
const postModel = require('../../modules/data').post;
const crypto = require('crypto');

module.exports.api=api;
module.exports.login=login;
module.exports.sign=sign;
module.exports.logout=logout;
module.exports.addPost=addPost;
module.exports.addCategory=addCategory;
module.exports.removeCategory=removeCategory;
module.exports.removePost=removePost;
module.exports.updatePost=updatePost;

// 对传入的对象增加创建时间属性
function addTimeObj(oldObj){

    let now = new Date().getTime();
    let obj = {create_at:now};

    return Object.assign(oldObj,obj);
}

// 定义返回信息
var reMessage = {
    code : 0,
    msg:''
}
// api主接口(仅用作测试)
function api(req,res){
    res.send('api接口');
}

// 登录逻辑
function login(req,res){

    let postUsername = req.body.username;
    let postPassword = req.body.password;
    // 对传入密码加密
    let hashPassword = crypto.createHmac('sha1',postUsername).update(postPassword).digest('hex');

    userModel.findOne({username:postUsername})
        .then((data)=>{
            // 没有返回数据则输出没有注册
            if(!data){
                reMessage.code='1005';
                reMessage.msg='当前用户名未注册';
                res.send(reMessage);
                return;
            }
            // 密码不匹配
            if(data.password!=hashPassword){
                reMessage.code='1006';
                reMessage.msg='用户名或密码错误';
                res.send(reMessage);
                return;
            }
            // 登录成功
            let userInfo={
                userID:data._id,
                username:data.username
            }
            req.session.userInfo=userInfo;
            req.session.login=true;
            reMessage.msg='登录成功';
            reMessage.code=0;
            res.send(reMessage);
        });
}

// 注册逻辑
function sign(req,res){

    let postUsername = req.body.username;
    let postPassword = req.body.password;
    // 对传入密码加密
    let hashPassword = crypto.createHmac('sha1',postUsername).update(postPassword).digest('hex');
    // 增加新建时间属性
    let userObj = {
        username:postUsername,
        password:hashPassword
    }
    // 增加用户注册时间
    let userInfo = addTimeObj(userObj);

    // 创建用户
    userModel.create(userInfo,function(err,reslut){
        // 注册失败
        if(err){
            reMessage.code='1001';
            reMessage.msg='注册失败,请联系管理员';
            res.send(reMessage);
            return;
        }
        // 注册成功
        let userInfo={
            userID:reslut._id,
            username:reslut.username
        }
        req.session.userInfo=userInfo;
        req.session.login=true;
        reMessage.msg='注册成功';
        reMessage.code=0;
        res.send(reMessage);
    });
}

// 登出逻辑实现
function logout(req,res){
    req.session.login=false;
    reMessage.msg='退出成功';
    reMessage.code=0;
    res.send(reMessage);
}

// 增加文章
function addPost(req,res){

    // 拿到session中的用户信息
    let authorObj = {author: req.session.userInfo.userID};
    // 增加到数据中
    let postData = Object.assign(req.body,authorObj);
    // 添加新数据
    postModel.create(postData)
        .then((result)=>{
            if(!result){
                reMessage.msg='文章保存错误';
                reMessage.code=2003;
                res.send(reMessage);
                return;
            }

            categoryModel.findByIdAndUpdate(req.body.category)
                .then((cate)=>{
                    cate.posts.push(result._id);
                    cate.save();
                });
            reMessage.msg='文章发表成功';
            reMessage.code=0;
            res.send(reMessage);
        });
}

// 增加分类
function addCategory(req,res){

    // 获取到分类名称
    let catName = req.body.category;

    // 使用async await优化异步代码
    (async function (){

        // 查找匹配的分类名称
        let reslut = await categoryModel.findOne({name:catName});

        // 如果存在则直接返回,不保存
        if(reslut){
            reMessage.msg='当前分类已存在';
            reMessage.code=2001;
            res.send(reMessage);
            return;
        }

        // 如果不存在,则保存
        let newCate = await categoryModel.create({name:catName});

        // 如果返回值为空,则返回保存失败
        if(!newCate){
            reMessage.msg='分类添加失败';
            reMessage.code=2002;
            res.send(reMessage);
            return;
        }

        reMessage.msg='分类创建成功';
        reMessage.code=0;
        res.send(reMessage);
    })();
}


//删除分类
function removeCategory(req,res) {
    // 根据ID查找并删除
    categoryModel.findByIdAndRemove(req.body.id,function(err,data){
        if(err){
            reMessage.msg='分类删除失败';
            reMessage.code=2007;
            res.send(reMessage);
            return;
        }
        reMessage.msg='分类删除成功';
        reMessage.code=0;
        res.send(reMessage);
    });
}

// 删除文章
function removePost(req,res){

    let id = req.body.id;
    // 根据ID查找删除
    postModel.findByIdAndRemove(id,function(err,data){
        if(err){
            reMessage.msg='文章删除失败';
            reMessage.code=2005;
            res.send(reMessage);
            return;
        }
        // 查找到当前文章的分类,移除分类中保存的该文章信息
        categoryModel.findByIdAndUpdate(data.category)
            .then((cate)=>{
                let index = cate.posts.indexOf(id);
                cate.posts.splice(index,1);
                cate.save();
            });
        reMessage.msg='文章删除成功';
        reMessage.code=0;
        res.send(reMessage);
    });
}

// 更新文章
function updatePost(req,res){

    (async function(){
        // 获取传入的文章ID
        let postID = req.body.postID;
        // 获取当前文章的分类
        let postNewCategory = req.body.category;
        // 去除多余的参数
        delete req.body.postID;
        // 根据id获取当前文章原来的category
        let postOldData = await postModel.findById(postID);
        // 如果分类没有修改则直接更新
        if(postOldData.category==postNewCategory){
            postOldData.update(req.body,function(err,data){
                if(err){
                    reMessage.msg='文章更新失败';
                    reMessage.code=2004;
                    res.send(reMessage);
                    return;
                }

                reMessage.msg='文章更新成功';
                reMessage.code=0;
                res.send(reMessage);
            });

        }else{
            // 如果分类更改则
            // 获取到当前文章的分类,移除分类中保存的该文章信息
            categoryModel.findByIdAndUpdate(postOldData.category)
                .then((cate)=>{
                    // 获取当前文章在分类中的位置
                    let index = cate.posts.indexOf(postID);
                    // 从旧的分类数组中移除该项
                    cate.posts.splice(index,1);
                    // 保存分类更新
                    cate.save();
                });
            // 获取当前更新的分类向其中插入文章
            categoryModel.findByIdAndUpdate(postNewCategory)
                .then((cate)=>{
                    // 向新分类的数组中增加该文章
                    cate.posts.push(postID);
                    cate.save();
                });
            // 再进行文章更新
            postOldData.update(req.body,function(err,data){
                if(err){
                    reMessage.msg='文章更新失败';
                    reMessage.code=2004;
                    res.send(reMessage);
                    return;
                }
                reMessage.msg='文章更新成功';
                reMessage.code=0;
                res.send(reMessage);
            });
        }

    })();
}
