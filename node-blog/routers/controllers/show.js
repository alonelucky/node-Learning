/**
 * Created by Administrator on 2017/6/21.
 */
const md = require('markdown').markdown;
const postModel = require('../../modules/data').post;
const categoryModel = require('../../modules/data').category;
const app = require('express')();



function show(req,res){
    // 执行查询并返回文章数据
    (async function (){
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
    })();
}

function category(req,res){

    // 获取传入的分类id
    let id = req.params.id;

    (async function(){
        // 获取到当前分类下的所有文章
        let category = await categoryModel.findById(id).populate('posts');
        // 获取5篇最新文章
        let newPosts = await postModel.find({}).sort({_id:-1}).limit(5);
        // 获取所有分类
        let cateItem = await categoryModel.find({});
        // 输出到页面
        res.render('category',{
            category:category,
            newBlogs:newPosts,
            categories:cateItem
        });
    })();
}

function blog(req,res){
    // 获取传入的博文id
    let id = req.params.id;

    (async function(){
        // 获取当前博文信息
        let blog = await postModel.findById(id).populate('category','name').populate('author');
        // 获取5篇最新文章
        let newPosts = await postModel.find({}).sort({_id:-1}).limit(5);
        // 获取所有分类
        let cateItem = await categoryModel.find({});
        // 渲染数据到页面
        res.render('single',{
            blog:blog,
            newBlogs:newPosts,
            categories:cateItem
        });
    })();
}


function sreach(req,res){
    res.render('sreach');
}

module.exports.show=show;
module.exports.category=category;
module.exports.blog=blog;
module.exports.sreach=sreach;