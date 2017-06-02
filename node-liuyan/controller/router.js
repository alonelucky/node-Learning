/**
 * Created by Administrator on 2017/6/1.
 */
const formidable = require('formidable');

const db = require('../modules/db.js');

exports.showIndexPage = function (req,res){
    // 传入参数,获取数据,并返回首页视图
    db.findLiuyan('liuyan',{},{page:1,pageNum:10},function(data){
        db.itemsCount('liuyan',function(num){
            res.render('index',{items:data,itemsNum:num});
        });
    });
}

exports.liuyanSave = function(req,res){
    // 创建表单对象
    var form = formidable.IncomingForm();

    // 获取表单传入数据及保存至数据库
    form.parse(req,function(err,items){
        if(err){
            console.log(err);
            res.send({error:-1,msg:'表单提交错误'});
            return;
        }

        // 验证姓名和内容均不可为空
        if( !(items.name&&items.content) ){
            res.send({error:-1,msg:'均不能为空'});
            return;
        }

        // 将获取的数据存入数据库
        var name = items.name;  // 传入的姓名
        var content = items.content; // 传入的内容
        var create_date = new Date().getTime(); // 获取当前时间戳(毫秒数)

        // 存入数据库
        db.addLiuyan('liuyan',{name:name,content:content,create_date:create_date},function(result){
            // 向前台返回结果
            res.send(result);
        });

    });
}

// 留言页面展示
exports.liuyanPage = function(req,res){
    // 获取传入的页码
    var paged = req.params.paged;

    // 如果页码为1 则返回首页
    if(paged==1){
        res.redirect('http://'+req.headers.host);
        return;
    }

    // 根据对应的页码查询并返回数据及视图
    db.findLiuyan('liuyan',{},{page:paged,pageNum:10},function(data){
        db.itemsCount('liuyan',function(num){
            res.render('index',{items:data,itemsNum:num});
        });
    });
}

exports.liuyanDetail = function(req,res){
    // 获取传入的留言ID
    var liuyanId = req.params.id;

    // 调用函数,查询数据并返回视图
    db.itemDetails('liuyan',liuyanId,function(data){
        res.render('liuyan',{item:data});
    });
}