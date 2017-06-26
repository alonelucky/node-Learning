/**
 * Created by Administrator on 2017/6/21.
 */
const postModel = require('../../modules/data').post;
const categoryModel = require('../../modules/data').category;



function show(req,res){

    // 执行查询并返回文章数据
    let postFind = async function (){

        // 获取到10篇博客
        let postList = await postModel.find({}).populate('category').limit(10);
        // 获取5篇最新文章
        let newPosts = await postModel.find({}).sort({_id:-1}).limit(5);
        // 获取所有分类
        let cateItem = await categoryModel.find({});
        res.render('index',{
            title:'首页',
            blogName:'小码农博客',
            navItems:cateItem.slice(0,4),
            login:req.session.login,
            userInfo:req.session.userInfo,
            blogs:postList,
            newBlogs:newPosts,
            categories:cateItem
        });
    }
    postFind();
}

function category(req,res){
    res.render('category');
}

function blog(req,res){
    
    res.render('single');
}

function sreach(req,res){
    res.render('sreach');
}


module.exports.show=show;
module.exports.category=category;
module.exports.blog=blog;
module.exports.sreach=sreach;