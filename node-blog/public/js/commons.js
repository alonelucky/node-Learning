/**
 * Created by Administrator on 2017/6/21.
 */
$(document).ready(function(){
    // 注册密码简单验证
    $('#signModal input[type=password]').on('keyup',function(){
        var inputPassword =  $('#signModal input[type=password]');
        if(inputPassword.eq(0).val()!=inputPassword.eq(1).val()){
            $('#signModal .tips').text('两次密码不一致');
        }else{
            $('#signModal .tips').text('');
        }
    });
    // 登录ajax
    $('#loginBtn').on('click',function(){
        console.log($('#login').serialize());
        $.ajax({
            url:'/api/login',
            data:$('#loginForm').serialize(),
            method:'post',
            success:function(data){
                console.log(data);
                if(!data.code){
                    window.location.href='/';
                }
            }
        });
    });
    // 注册ajax提交
    $('#signBtn').on('click',function(){
        $.ajax({
            url:'/api/sign',
            data:$('#signForm').serialize(),
            method:'post',
            success:function(data){
                console.log(data);
                if(!data.code){
                    window.location.href='/';
                }
            }
        });
    });

    // 登出处理
    $('#logout').on('click',function(){
        $.ajax({
            url:'/api/logout',
            method:'post',
            success:function(data){
                console.log(data);
                if(!data.code){
                    window.location.href='/';
                }
            }
        });
    });
});