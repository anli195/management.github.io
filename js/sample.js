/**
 * Created by lx on 2017/2/8.
 */
$(function(){
//  $("#sampleInformation").on("click",function(){
//      $(".loading").show();
//      $.ajax({
//          type  : "get",
//          url   :"sample/sample.html",
//          aysnc  : true,
//          success : function(data){
//              $("#content").html(data);
//              content();
//              $("#addInformation").on("click",function(){
//                  $(".content_information").hide();
//                  $(".content_add").show();
//              });
//          },
//          error   : function(){
//              alert("网络不稳定，请重新刷新页面");
//          }
//      }).done(function(){
//          $(".loading").hide();
//      });
//  });
        //更改数据
            var sample = "";
            var determine;
            $.ajax({
          	    type:"get",
          	    url:"http://localhost:82/sample.json",
                dataType : "jsonp",
                jsonpCallback : "one",
          	    async:true,
          	    success : function (data){
          		    sample = data .sample;
                    //添加数据
          		    $.each(sample,function(i){
                        if(i > 7){
                            return false;
                        }
          			    var html = '<tr id="' + sample[i].id + '"><td><input type="checkbox"></td><td>'
          					     + sample[i].num + '</td><td>'
          					     + sample[i].name + '</td><td>'
          					     + sample[i].type + '</td><td>'
          					     + sample[i].dates + '</td><td>'
          					     + sample[i].build
          					     + '</td><td><em class="operation"></em><div class="operate"><span>编辑</span><i>删除</i></div></td></tr>';
          			    $("#content table tbody").append(html);
          		    });
          		    content();
          	    },
          	    error   : function (){
          		    alert("页面加载失败");
                }
            });
            //添加信息
            $("#addInformation").on("click",function(){
                $(".content_information").hide();
                $(".content_add").show();
                $("select").formSelect();
                determine = "add";
            });
            //操作
            $("table tbody").on("click",".operation",function(e){
                e.stopPropagation();
                $(this).siblings().show();
            });
            $(document).on("click",function(){
                $(".operate").hide();
            });
            //编辑
            $("table tbody").on("click",".operate span",function(){
                $(".content_information").hide();
                $(".content_add").show();
                $("select").formSelect();
                determine = "edit";
                $("#sampleId").val($(this).parents("tr").prop("id"));
            });
            //删除
            $("table tbody").on("click",".operate i",function(){
                var $id = $(this).parents("tr").prop("id");
                $.each(sample,function(i){
                    if($id == sample[i].id){
                        sample.splice(i,1);
                        return false;
                    }
                });
                //return sample;
                //$("#wholeTitle dd a:eq(0)").trigger("click");
                $("#content table tbody").html("");
                $.each(sample,function(i){
                    if(i > 7){
                        return false;
                    }
                    var html = '<tr id="' + sample[i].id + '"><td><input type="checkbox"></td><td>'
                        + sample[i].num + '</td><td>'
                        + sample[i].name + '</td><td>'
                        + sample[i].type + '</td><td>'
                        + sample[i].dates + '</td><td>'
                        + sample[i].build
                        + '</td><td><em class="operation"></em><div class="operate"><span>编辑</span><i>删除</i></div></td></tr>';
                    $("#content table tbody").append(html);
                });
                //table的奇数行变色
                $("table tr:odd td").addClass("curr");
            });
            //添加页面的确定
            $(".determine").on("click",function(){
                var regNum = /^\d{11}$/;
                var regId = /^\d{5}$/;
                var flag1 = false;
                var flag2 = false;
                var sampleInfo = {
                    id    : $("#sampleId").val(),
                    num   : $("#sampleNumber").val(),
                    name  : $("#sampleUser").val(),
                    type  : $("#sampleType").val(),
                    dates : $("#sampleDate").text(),
                    build : "是"
                };
                if($("#sampleUser").val() == ""){
                	$(".prompt").fadeIn(1000).fadeOut(2000).children("span").text("请正确输入用户姓名");
                    return false;
                }
                console.log(sampleInfo.dates)
                if(sampleInfo.dates == "请选择日期"){
                	$(".prompt").fadeIn(1000).fadeOut(2000).children("span").text("请选择收样日期");
                    return false;
                }
                if(regNum.test(sampleInfo.num)){
                    flag1 = true;
                }else{
                    $(".prompt").fadeIn(1000).fadeOut(2000).children("span").text("请正确输入11位数的样品编号");
                    return false;
                }
                if(regId.test(sampleInfo.id)){
                    flag2 = true;
                }else{
                    $(".prompt").fadeIn(1000).fadeOut(2000).children("span").text("请正确输入5位数的用户ID");
                    return false;
                }
                if(flag1 && flag2){
                    if(determine == "edit"){
                        $.each(sample,function(i){
                            if(sampleInfo.id == sample[i].id){
                                sample[i].id == sampleInfo.id;
                                sample[i].num == sampleInfo.num;
                                sample[i].name == sampleInfo.name;
                                sample[i].type == sampleInfo.type;
                                sample[i].dates == sampleInfo.dates;
                                return false;
                            }
                        });
                    }else{
                    	$.each(sample,function(j){
                    		if(sample[j].id == sampleInfo.id){
                    			$(".prompt").fadeIn(1000).fadeOut(2000).children("span").text("该ID重复，请重新输入");
                    			return false;
                    		}
                    	});
                    	sample.unshift(sampleInfo);
	                    $("#content table tbody").html("");
	                    $.each(sample,function(i){
	                        if(i > 7){
	                            return false;
	                        }
	                        var html = '<tr id="' + sample[i].id + '"><td><input type="checkbox"></td><td>'
	                            + sample[i].num + '</td><td>'
	                            + sample[i].name + '</td><td>'
	                            + sample[i].type + '</td><td>'
	                            + sample[i].dates + '</td><td>'
	                            + sample[i].build
	                            + '</td><td><em class="operation"></em><div class="operate"><span>编辑</span><i>删除</i></div></td></tr>';
	                        $("#content table tbody").append(html);
	                    });
                    }
                    //table的奇数行变色
                    $("table tr:odd td").addClass("curr");
                    $(".content_information").show();
                    $(".content_add").hide();
                    $("#sampleId").val("");
                    $("#sampleNumber").val("");
                    $("#sampleUser").val("");
                    $("#sampleType").val("阴性");
                    $("#sampleDate").text("请选择日期");
                    $("#sampleCollection").text("请选择日期");
                }
            });
            //添加页面的取消
            $(".cancel").on("click",function(){
                $(".content_information").show();
                $(".content_add").hide();
            });
            //全屏与退出全屏
            $("#screen").on("click",function(){
                $(this).toggleClass("curr");
                $("#content").toggleClass("main");
                $(".footer").toggleClass("foot");
          	    if($(this).text() == "全屏"){
          		    $(this).prop("title","退出全屏");
          	    }else{
          		    $(this).prop("title","全屏");
          	    }
            });
            var num = 1;
            //首页
            $("#homePage").on("click",function(){
				$("#content table tbody").html("");
                $.each(sample,function(i){
                    if(i > 7){
                        return false;
                    }
      			    var html = '<tr id="' + sample[i].id + '"><td><input type="checkbox"></td><td>'
      					     + sample[i].num + '</td><td>'
      					     + sample[i].name + '</td><td>'
      					     + sample[i].type + '</td><td>'
      					     + sample[i].dates + '</td><td>'
      					     + sample[i].build
      					     + '</td><td><em class="operation"></em><div class="operate"><span>编辑</span><i>删除</i></div></td></tr>';
      			    $("#content table tbody").append(html);
      		    });
      		    num = 1
            });
            //上一页
            $("#prev").on("click",function(){
                if(num == 1) return;
                num -= 1;
                $("#content table tbody").html("");
                $.each(sample,function(i){
                        if(i >= (num-1)*8 && i < num*8){
                        var html = '<tr id="' + sample[i].id + '"><td><input type="checkbox"></td><td>'
                            + sample[i].num + '</td><td>'
                            + sample[i].name + '</td><td>'
                            + sample[i].type + '</td><td>'
                            + sample[i].dates + '</td><td>'
                            + sample[i].build
                            + '</td><td><em class="operation"></em><div class="operate"><span>编辑</span><i>删除</i></div></td></tr>';
                        $("#content table tbody").append(html);
                    }

                });
            });
            //下一页
            $("#next").on("click",function(){
                if(num == Math.ceil(sample.length/8)) return
                num += 1;
                $("#content table tbody").html("");
                $.each(sample,function(i){
                    if(i >= (num-1)*8 && i < num*8){
                        console.log(num)
                        var html = '<tr id="' + sample[i].id + '"><td><input type="checkbox"></td><td>'
                            + sample[i].num + '</td><td>'
                            + sample[i].name + '</td><td>'
                            + sample[i].type + '</td><td>'
                            + sample[i].dates + '</td><td>'
                            + sample[i].build
                            + '</td><td><em class="operation"></em><div class="operate"><span>编辑</span><i>删除</i></div></td></tr>';
                        $("#content table tbody").append(html);
                    }

                });
            });
            //尾页
            $("#shadowe").on("click",function(){
                num = Math.ceil(sample.length/8);
                $("#content table tbody").html("");
                $.each(sample,function(i){
                    if(i >= (num-1)*8 && i < num*8){
                        console.log(num)
                        var html = '<tr id="' + sample[i].id + '"><td><input type="checkbox"></td><td>'
                            + sample[i].num + '</td><td>'
                            + sample[i].name + '</td><td>'
                            + sample[i].type + '</td><td>'
                            + sample[i].dates + '</td><td>'
                            + sample[i].build
                            + '</td><td><em class="operation"></em><div class="operate"><span>编辑</span><i>删除</i></div></td></tr>';
                        $("#content table tbody").append(html);
                    }
                });
            });
            //删除
            $("#delInformation").on("click",function(){
            	var num = 0;
            	$("tbody input").each(function(){
            		if($(this).prop("checked")){
            			var id = $(this).parents("tr").prop("id");
            			$.each(sample,function(j){
            				if(sample[j].id = id){
            					sample.splice(j,1);
            					num++;
            					return false;
            				}
            			});
            		}
            	})
            	if(num == 0){
            		alert("您没有选择内容");
            		return;
            	}
            	if(confirm("您确定删除" + num + "项")){
            		$("#content table tbody").html("");
            		$.each(sample,function(i){
	                    if(i > 7){
	                        return false;
	                    }
	                    var html = '<tr id="' + sample[i].id + '"><td><input type="checkbox"></td><td>'
	                        + sample[i].num + '</td><td>'
	                        + sample[i].name + '</td><td>'
	                        + sample[i].type + '</td><td>'
	                        + sample[i].dates + '</td><td>'
	                        + sample[i].build
	                        + '</td><td><em class="operation"></em><div class="operate"><span>编辑</span><i>删除</i></div></td></tr>';
	                    $("#content table tbody").append(html);
	                });
            	}
            	
            });
            //查找
            $("#search").on("click",function(){

                $("#content table tbody").html("");
                $.each(sample,function(i){
                    if(i > 7){
                        return false;
                    }
                    var html = '<tr id=""' + sample[i].id + '"><td><input type="checkbox"></td><td>'
                        + sample[i].num + '</td><td>'
                        + sample[i].name + '</td><td>'
                        + sample[i].type + '</td><td>'
                        + sample[i].dates + '</td><td>'
                        + sample[i].build
                        + '</td><td><em class="operation"></em><div class="operate"><span>编辑</span><i>删除</i></div></td></tr>';
                    $("#content table tbody").append(html);
                });

          	    var flag = true;
          	    $("#content table tbody tr td").removeClass("color").children("input").prop("checked",false);

                var sampleInfo = {
                    sampleNum : $("#sampleNum").val(),
                    sampleName : $("#sampleName").val()
                };
                var $this = sampleInfo.sampleNum;
          	    if($("#sampleNum").val() == ""){
          		    $("#content table tbody").html("");
          		    $.each(sample,function(i){
          			    var html = '<tr id="' + sample[i].id + '"><td><input type="checkbox"></td><td>'
          					     + sample[i].num + '</td><td>'
          					     + sample[i].name + '</td><td>'
          					     + sample[i].type + '</td><td>'
                                 + sample[i].dates + '</td><td>'
          					     + sample[i].build
          					     + '</td><td><em class="operation"></em><div class="operate"><span>编辑</span><i>删除</i></div></td></tr>';
          			    $("#content table tbody").append(html);
          		    });
          	    }else{
          		    var $html = '';
          		    $.each($("#content table tbody tr"), function() {
          			    if($this == $(this).children().eq(1).text()){
          				    flag = false;
                            var $id = $(this).prop("id");
          				    $("#content table tbody tr").remove();
          				    var html ="<tr id='" + $id + "'>" + $(this).html() + "</tr>";
          				    $html += html;
          			    }
          		    });
          		    $("#content table tbody").append($html);
                    $.each($("#content table tbody tr"), function() {
                        if(sampleInfo.sampleName == $(this).children().eq(2).text()){
                            $("#content table tbody tr").remove();
                            var $id = $(this).prop("id");
                            var html ="<tr id='" + $id + "'>" + $(this).html() + "</tr>";
                            $("#content table tbody").append(html);
                        }
                    });
          		    if(flag){
          			    var html = '<tr><td colspan="7">您输入的样品编码无效</td></tr>';
          			    $("#content table tbody").html(html);
      			    }
          	    }
          	    //table的奇数行变色
          	    $("table tbody tr td").removeClass("curr");
				$("table tbody tr:even td").addClass("curr");
            });

        $(document).on("keydown",function(e){
            if(e.keyCode == 13){
                $("#search").trigger("click");
            }
        });


//  $("#userInformation").on("click",function(){
//      $(".loading").show();
//      $.ajax({
//          type  : "get",
//          url   :"sample/user.html",
//          aysnc  : true,
//          success : function(data){
//              $("#content").html(data);
//              content();
//              $("#addUser").on("click",function(){
//                  $(".content_information").hide();
//                  $(".content_add").show();
//              });
//              $("#addTo").on("click",function(){
//                  $(".content_information").show();
//                  $(".content_add").hide();
//              });
//              $("#cancel").on("click",function(){
//                  $(".content_add input").val("");
//              });
//          },
//          error   : function(){
//              alert("网络不稳定，请重新刷新页面");
//          }
//      }).done(function(){
//          $(".loading").hide();
//      });
//  });
	
//          

    $("#libraryInformation").on("click",function(){
        $(".loading").show();
        $.ajax({
            type  : "get",
            url   :"experiment/library.html",
            aysnc  : true,
            success : function(data){
                $("#content").html(data);
                content();
            },
            error   : function(){
                alert("网络不稳定，请重新刷新页面");
            }
        }).done(function(){
            $(".loading").hide();
        });
    });
    $("#kitManagement").on("click",function(){
        $(".loading").show();
        $.ajax({
            type  : "get",
            url   :"experiment/kit.html",
            aysnc  : true,
            success : function(data){
                $("#content").html(data);
                content();
            },
            error   : function(){
                alert("网络不稳定，请重新刷新页面");
            }
        }).done(function(){
            $(".loading").hide();
        });
    });
    $("#reportManagement").on("click",function(){
        $(".loading").show();
        $.ajax({
            type  : "get",
            url   :"presentation/report.html",
            aysnc  : true,
            success : function(data){
                $("#content").html(data);
                content();
            },
            error   : function(){
                alert("网络不稳定，请重新刷新页面");
            }
        }).done(function(){
            $(".loading").hide();
        });
    });
    $("#dataStatistics").on("click",function(){
        $(".loading").show();
        $.ajax({
            type  : "get",
            url   :"presentation/data.html",
            aysnc  : true,
            success : function(data){
                $("#content").html(data);
                content();
            },
            error   : function(){
                alert("网络不稳定，请重新刷新页面");
            }
        }).done(function(){
            $(".loading").hide();
        });
    });
    $("#user").on("click",function(){
        $(".loading").show();
        $.ajax({
            type  : "get",
            url   :"system/user.html",
            aysnc  : true,
            success : function(data){
                $("#content").html(data);
                content();
            },
            error   : function(){
                alert("网络不稳定，请重新刷新页面");
            }
        }).done(function(){
            $(".loading").hide();
        });
    });
    $("#department").on("click",function(){
        $(".loading").show();
        $.ajax({
            type  : "get",
            url   :"system/department.html",
            aysnc  : true,
            success : function(data){
                $("#content").html(data);
                content();
            },
            error   : function(){
                alert("网络不稳定，请重新刷新页面");
            }
        }).done(function(){
            $(".loading").hide();
        });
    });
    $("#role").on("click",function(){
        $(".loading").show();
        $.ajax({
            type  : "get",
            url   :"system/role.html",
            aysnc  : true,
            success : function(data){
                $("#content").html(data);
                content();
            },
            error   : function(){
                alert("网络不稳定，请重新刷新页面");
            }
        }).done(function(){
            $(".loading").hide();
        });
    });
    $("#jurisdiction").on("click",function(){
        $(".loading").show();
        $.ajax({
            type  : "get",
            url   :"system/jurisdiction.html",
            aysnc  : true,
            success : function(data){
                $("#content").html(data);
                content();
            },
            error   : function(){
                alert("网络不稳定，请重新刷新页面");
            }
        }).done(function(){
            $(".loading").hide();
        });
    });





})


function content() {
    //刷新页面时先调用一次时间方法
    nowTime();
    //时间方法
    function nowTime() {
        //获取当前时间
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var day = today.getDate();
        var oday = today.getDay();
        //修改星期后面的数字
        var myDay = ["日", "一", "二", "三", "四", "五", "六"];
        //新的日期
        var hour = today.getHours();
        //获取现在的时间（时）
        var minute = today.getMinutes();
        //获取现在的时间（分）
        var second = today.getSeconds();
        //获取现在的时间（秒）
        $("#data em").html(year + "-" + month + "-" + day);
        $("#data span").html("星期" + myDay[oday]);
        $("#data i").html(hour + ":" + minute + ":" + second);
    };

    //1秒刷新一次时间
    setInterval(nowTime, 1000);

    //table的奇数行变色
    $("table tr:odd td").addClass("curr");
    //刷新时让所有的checkbox全部取消选中
    $("input:checkbox").prop("checked", false);
    //全选
    $("#check").on("click", function () {
        if ($(this).prop("checked")) {
            $("input:checkbox").prop("checked", "checked");
        } else {
            $("input:checkbox").prop("checked", false);
        }
    })

    //checkbox的点击事件
    $("input:checkbox").not("#check").on("click", function () {
        var num = 0;
        $("input:checkbox").not("#check").each(function () {
            if ($(this).prop("checked")) {
                num++;
            }
        });
        if (num >= ($("input:checkbox").length - 1)) {
            $("#check").prop("checked", true);
        } else {
            $("#check").prop("checked", false);
        }
    });
}


























