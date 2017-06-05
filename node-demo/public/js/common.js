/**
 * Created by Administrator on 2017/6/5.
 */
// 注册页面ajax实现
$('#sign').on('click',function(){
    var data = $('#signForm').serialize();
    console.log(data);
    $.ajax({
        url:'/signcheck',
        data:data,
        type:'post',
        beforeSend:function(){
            $('#sign').addClass('disabled');
        },
        success:function(data){
            console.log(data);
            $('#sign').removeClass('disabled');
            if(data.err){
                window.location.href='/';
            }
        }
    });
});

// 登录页面
$('#login').on('click',function(){
    var data = $('#loginForm').serialize();
    console.log(data);
    $.ajax({
        url:'/logincheck',
        data:data,
        type:'post',
        beforeSend:function(){
            $('#login').addClass('disabled');
        },
        success:function(data){
            console.log(data);
            $('#login').removeClass('disabled');
            if(data.err=='1'){
                window.location.href='/';
            }
        }
    });
});

// 发布心情
$('#submitPost').on('click',function(){
    $.ajax({
        url:'/post',
        type:'post',
        data:$('#formPost').serialize(),
        beforeSend:function(){
            $(this).addClass('disable');
        },
        success:function(data){
            $(this).removeClass('disable');
            console.log(data);
            if(data.err=='1'){
                window.location.href="/";
            }
        }
    });
});

// 登出逻辑
$('#logout').on('click',function(){
    $.ajax({
        url:'/logout',
        type:'post',
        success:function(data){
            if(data=='1'){
                window.location.href='/';
            }
        }
    })
});

// 用户信息保存
$('#submitUserBtn').on('click',function(){
    $.ajax({
        url:'/user/setting/save',
        type:'post',
        data:$('#userDetailsForm').serialize(),
        beforeSend:function(){
            $('#submitUserBtn').addClass('disable');
        },
        success:function(data){
            $('#submitUserBtn').removeClass('disable');
            console.log(data);
        }
    });
});