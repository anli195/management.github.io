$(function(){
    var flag = true;
    var state1 = false;
    var state2 = false;
    var reg = /^1[34578]\d{9}$/;    //11位手机号
    var reg1 = /^[a-zA-Z]\w{5,17}$/;    //以字母开头的6-18位密码
    //密码类型转换
    $("#passWord i").click(function(){
        var $input = $(this).siblings("input");
        var $val = $input.val();
        var $parent = $(this).parent();
        if(flag){
            $parent.children("input").remove();
            $parent.append('<input type="text" id="password" value="'+ $val +'" />');
            flag = false;
        }else{
            $parent.children("input").remove();
            $parent.append('<input type="password" id="password" value="'+ $val +'" />');
            flag = true;
        }
    })

    $("#userName input").on({
        focus : function(){
            $(this).siblings("em").hide()
            $(this).parent().removeClass("animated shake")
        },
        blur  : function(){
            if($(this).val() == ""){
                $(this).siblings("em").show();
                $(this).parent().addClass("animated shake");
                $("#loginBtn").fadeIn(1000).fadeOut(2000).text("请输入用户名");
                state1 = false;
            }else {
                state1 = true;
            }
        }
    })


    //密码验证
    $("#passWord").on("focus","input",function(){
        $(this).siblings("em").hide();
        $(this).parent().removeClass("animated shake");
    });
    $("#passWord").on("blur","input",function(){
        if($(this).val() == ""){
            $(this).siblings("em").show();
            $(this).parent().addClass("animated shake");
            $("#loginBtn").fadeIn(1000).fadeOut(2000).text("请输入登录密码");
            state2 = false;
        }else if(reg1.test($(this).val())){
            state2 = true;
        }else{
            $(this).parent().addClass("animated shake");
            $("#loginBtn").fadeIn(1000).fadeOut(2000).text("请输入登录密码");
            state2 = false;
        }
    })


    //提示的点击事件
    $("em").click(function(){
        $(this).siblings("input").focus();
    })

    //刷新页面时对提示语的处理
    var $inputAll = $("input:not(:button)");
    $inputAll.each(function(){
        if($(this).val() == ""){
            $(this).siblings("em").show();
        }else{
            $(this).siblings("em").hide();
        }
    })


    //登录按钮的点击事件
    $("#upBtn").on("click",function(){
        $("input:not(:button)").removeClass("animated shake");
        $("#userName input").focus();
        $("#userName input").blur();

        if(state1){
            $("#passWord input").focus();
            $("#passWord input").blur();
        }

        if(state1 && state2){
            //window.open("006、登录注册/login.html","_self");
            alert("登录成功")
        }
    })

})

