/*------------------------------------------------------
    Author : www.webthemez.com
    License: Commons Attribution 3.0
    http://creativecommons.org/licenses/by/3.0/
---------------------------------------------------------  */

(function ($) {
    "use strict";
    var mainApp = {

        initFunction: function () {
            /*MENU 
             ------------------------------------*/
            $('#main-menu').metisMenu();

            $(window).bind("load resize", function () {
                if ($(this).width() < 768) {
                    $('div.sidebar-collapse').addClass('collapse')
                } else {
                    $('div.sidebar-collapse').removeClass('collapse')
                }
            });

        }

    }
    // Initializing ///

    $(document).ready(function () {
        mainApp.initFunction(); 
		$("#sideNav").click(function(){
			if($(this).hasClass('closed')){
				$('.navbar-side').animate({left: '0px'});
				$(this).removeClass('closed');
				$('#page-wrapper').animate({'margin-left' : '260px'});
				
			}
			else{
			    $(this).addClass('closed');
				$('.navbar-side').animate({left: '-260px'});
				$('#page-wrapper').animate({'margin-left' : '0px'}); 
			}
		});
    });

    // 增加分类的ajax操作
    $('#addCategory').on('click',function(){
        $.ajax({
            url:'/api/addcategory',
            data:$('#addCategoryForm').serialize(),
            method:'post',
            success:function(msg){
                if(!msg.code){
                    setTimeout(window.location.reload(),500);
                }
            }
        });
    });

    // 删除分类
    $('.deleteCategory').on('click',function(){
        let self = $(this);
        $.ajax({
            url:'/api/removecategory',
            data:{id:self.data('id')},
            method:'post',
            success:function(msg){
                if(!msg.code){
                    setTimeout(window.location.reload(),500);
                }
            }
        });

    });

    // 发布文章
    $('#addPost').on('click',function(){
        $.ajax({
            url:'/api/addpost',
            data:$('#addPostForm').serialize(),
            method:'post',
            success:function(msg){
                console.log(msg)
            }
        });
    });


    // 删除文章
    $('.deletePost').on('click',function(){
        let id = $(this).data('id');
        $.ajax({
            url:'/api/removepost',
            data:{id:id},
            method:'post',
            success:function(msg){
                if(!msg.code){
                    setTimeout(window.location.reload(),500);
                }
            }
        });
    });

    // 更新文章
    $('#updatePost').on('click',function(){
        $.ajax({
            url:'/api/updatepost',
            data:$('#updatePostForm').serialize(),
            method:'post',
            success:function(msg){
                if(!msg.code){
                    setTimeout(window.location.reload(),500);
                }
            }
        });
    });

}(jQuery));
