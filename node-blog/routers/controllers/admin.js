/**
 * Created by Administrator on 2017/6/21.
 */
const categoryModel = require('../../modules/data').category;
const postModel = require('../../modules/data').post;

// 展示网站后台首页
function admin(req,res){
    res.render('admin/index',{
        login:req.session.login,
        userInfo:req.session.userInfo
    });
}

// 增加文章页面
function addPost(req,res){

    categoryModel.find({})
        .then((data)=>{
            res.render('admin/addpost',{
                categories:data
            });
        });
}

// 输出list界面及调用数据
function list(req,res){

    // 如果传入值为cat则输出分类列表
    if(req.query.uri=='cat'){

        // 使用async await优化代码流程
        let catData = async function(){
            // 查询并获取数据
            let data = await categoryModel.find({});
            // 将数据输出到页面
            res.render('admin/list',{
                title:'分类列表',
                fields:['分类名称','文章数','创建日期'],
                datas:data
            });
        }
        catData();

        return;
    }

    // 获取博客信息
    postModel.find({})
        .populate({path:'author',select:'username'})
        .populate({path:'category',select:'name'})
        .then((data)=>{
            res.render('admin/posts-list',{
                login:req.session.login,
                userInfo:req.session.userInfo,
                fields:['标题','作者','分类','发表时间'],
                datas:data
            });
        });
}

// 编辑文章页面
function editor(req,res){

    console.log(req.params.id);

    let doEditor = async function () {

        let cate = await categoryModel.find({});

        let post = await postModel.findById(req.params.id).populate('category','name');

        res.render('admin/editor',{
            title:'编辑文章',
            categories:cate,
            post:post
        });
    }
    doEditor();
}



exports.admin=admin;
exports.editor=editor;
exports.addPost=addPost;
exports.list=list;