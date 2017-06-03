/**
 * Created by Administrator on 2017/6/3.
 */
var formidable = require('formidable');
var db = require('../modules/db.js');
var path = require('path');
var fs = require('fs');
var gm = require('gm');



// 展示首页
exports.showIndex = function(req,res){
    res.render('index');
}

// 执行上传图片接受
exports.doUpload = function(req,res){
    var form = formidable.IncomingForm();
    // 上传至临时文件夹
    form.uploadDir = './tmp';
    form.parse(req,function(err,fields,files){
        // 获得原始路径
        var oldPath = files['header-img'].path;
        // 获取文件类型
        var extname = path.extname(files['header-img'].name);
        // 上传路径新命名
        var newname = new Date().getTime() + Math.random()*89999+10000+extname;
        // 获得新路径
        var newPath = './uploads/'+newname;
        // 执行文件移动及重命名操作
        fs.rename(oldPath,newPath,function(err,result){
            // 如果失败则返回错误信息
            if(err){
                console.log(err);
                return;
            }
            // 成功则跳转至处理图片界面
            res.render('chuli',{
                imgPath:newname
            });
        });
    });
}
// 执行图片裁剪
exports.doGM = function(req,res){
    var form = formidable.IncomingForm();
    // 接收前台参数
    form.parse(req,function(err,fields){
        // 获得图片路径
        var imgPath = './uploads/'+fields.imgPath;
        // 最终存放路径
        var headPath = './uploads/head/'+fields.imgPath;
        // 执行裁切操作  参数为  宽 高 左 上
        gm(imgPath)
            .crop(
                fields.imgWidth,
                fields.imgHeight,
                fields.imgLeft,
                fields.imgTop)
            .write(headPath,function(err){
                // 如果失败,则返回失败信息
                if(err){
                    console.log(err);
                    res.end();
                }else{
                    // 如果成功则跳转回首页
                    console.log('处理成功');
                    res.redirect('http://'+req.headers.host);
                }
            });
    });
}