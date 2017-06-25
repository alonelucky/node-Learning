/**
 * Created by Administrator on 2017/6/21.
 */
$(document).ready(function(){

    $('#signModal input[type=password]').on('keyup',function(){
        var inputPassword =  $('#signModal input[type=password]');
        if(inputPassword.eq(0).val()!=inputPassword.eq(1).val()){
            $('#signModal .tips').text('两次密码不一致');
        }else{
            $('#signModal .tips').text('');
        }
    });

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