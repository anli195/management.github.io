$.ajax({
    type:"get",
	url:"http://127.0.0.1:82/sample.json",
    dataType : "jsonp",
    jsonpCallback : "one",
	async:true,
	success : function (data){
		var user = data.user;
		$.each(user,function(i){
			var html = '<tr><td><input type="checkbox"></td><td>' 
					 + user[i].num + '</td><td>' 
					 + user[i].name + '</td><td>' 
					 + user[i].type + '</td><td>' 
					 + user[i].build + '</td><td>' 
					 + user[i].dates 
					 + '</td><td><em class="operation"></em><div class="operate"><span>编辑</span><i>删除</i></div></td></tr>';
			$("#content table tbody").append(html);
		})
		content();
	},
	error   : function (){
		alert("页面加载失败");
	}
});