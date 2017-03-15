/**
 * Created by lx on 2017/2/7.
 */
$(function(){

    $("#wholeTitle dt").on("click",function(){
        $(this).toggleClass("curr").children("i").toggleClass("curr").parent().siblings("dt").removeClass("curr").children("i").removeClass("curr");
        $(this).next("dd").stop(true,false).slideToggle().siblings("dd").slideUp();
        if($(this).index() == 0){
            $(this).children("em").toggleClass("sample_curr");
            $(this).siblings("dt").children("em").removeClass("experiment_curr");
            $(this).siblings("dt").children("em").removeClass("presentation_curr");
            $(this).siblings("dt").children("em").removeClass("system_curr");
        }
        if($(this).index() == 2){
            $(this).children("em").toggleClass("experiment_curr");
            $(this).siblings("dt").children("em").removeClass("sample_curr");
            $(this).siblings("dt").children("em").removeClass("presentation_curr");
            $(this).siblings("dt").children("em").removeClass("system_curr");
        }
        if($(this).index() == 4){
            $(this).children("em").toggleClass("presentation_curr");
            $(this).siblings("dt").children("em").removeClass("experiment_curr");
            $(this).siblings("dt").children("em").removeClass("sample_curr");
            $(this).siblings("dt").children("em").removeClass("system_curr");
        }
        if($(this).index() == 6){
            $(this).children("em").toggleClass("system_curr");
            $(this).siblings("dt").children("em").removeClass("experiment_curr");
            $(this).siblings("dt").children("em").removeClass("presentation_curr");
            $(this).siblings("dt").children("em").removeClass("sample_curr");
        }
    })
    $("#wholeTitle dt:first").trigger("click");

    $("#wholeTitle dd a").on("click",function(){
        $(this).addClass("curr").siblings().removeClass("curr").parent().siblings("dd").children("a").removeClass("curr")
    })

    $("#wholeTitle dd a").on("click",function(){
        //加载页面显示
        $(".loading").show();
        var url = $(this).attr("data");
        $("#content").load(url,function (){
            //加载页面隐藏
            $(".loading").hide();
        });
    });
    $("#wholeTitle dd a:eq(0)").trigger("click");





})




